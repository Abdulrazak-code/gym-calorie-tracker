import AsyncStorage from '@react-native-async-storage/async-storage';

const WGER_BASE = 'https://wger.de/api/v2';
const CACHE_KEY = 'wger_exercises_cache';
const CACHE_TIMESTAMP_KEY = 'wger_exercises_cache_timestamp';
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 10000;

export interface WgerExercise {
  id: number;
  name: string;
  category: number;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
  variations: number | null;
}

const WGER_CATEGORY_MAP: Record<number, string> = {
  10: 'Abs',
  8: 'Arms',
  12: 'Back',
  14: 'Calves',
  15: 'Cardio',
  11: 'Chest',
  9: 'Legs',
  13: 'Shoulders',
};

async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function fetchAllExercises(): Promise<WgerExercise[]> {
  let allResults: WgerExercise[] = [];
  let url = `${WGER_BASE}/exercise/?limit=100&language=2`;

  while (url) {
    const response = await fetchWithTimeout(url, FETCH_TIMEOUT_MS);
    if (!response.ok) throw new Error(`WGER API error: ${response.status}`);
    const data = await response.json();
    allResults = allResults.concat(data.results);
    url = data.next;
  }

  return allResults;
}

export async function fetchExercisesFromWger(): Promise<WgerExercise[]> {
  return await fetchAllExercises();
}

export async function getCachedExercises(): Promise<WgerExercise[] | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    const timestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (!cached || !timestamp) return null;

    const age = Date.now() - parseInt(timestamp, 10);
    if (age > CACHE_DURATION_MS) {
      await AsyncStorage.removeItem(CACHE_KEY);
      await AsyncStorage.removeItem(CACHE_TIMESTAMP_KEY);
      return null;
    }

    return JSON.parse(cached);
  } catch {
    return null;
  }
}

export async function cacheExercises(exercises: WgerExercise[]): Promise<void> {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(exercises));
  await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
}

export function mapWgerToAppExercise(wger: WgerExercise) {
  const muscleGroup = WGER_CATEGORY_MAP[wger.category] || 'Arms';

  return {
    key: `wger_${wger.id}`,
    name: wger.name || `Exercise #${wger.id}`,
    met: 4.0,
    muscle: muscleGroup,
    equipment: 'WGER',
    wgerId: wger.id,
  };
}

export async function refreshExerciseCache(): Promise<WgerExercise[]> {
  const exercises = await fetchExercisesFromWger();
  await cacheExercises(exercises);
  return exercises;
}

export async function getExercises(): Promise<WgerExercise[]> {
  const cached = await getCachedExercises();
  if (cached) return cached;

  try {
    const fresh = await refreshExerciseCache();
    return fresh;
  } catch {
    return [];
  }
}

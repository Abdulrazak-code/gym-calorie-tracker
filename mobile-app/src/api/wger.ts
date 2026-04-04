import AsyncStorage from '@react-native-async-storage/async-storage';

const WGER_BASE = 'https://wger.de/api/v2';
const CACHE_KEY = 'wger_exercises_cache';
const CACHE_TIMESTAMP_KEY = 'wger_exercises_cache_timestamp';
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface WgerExercise {
  id: number;
  name: string;
  category: number;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
  variations: number | null;
}

export interface WgerMuscle {
  id: number;
  name: string;
  name_en: string;
  is_front: boolean;
}

const MUSCLE_ID_TO_GROUP: Record<number, string> = {
  1: 'Biceps',
  2: 'Shoulders',
  3: 'Shoulders',
  4: 'Chest',
  5: 'Triceps',
  6: 'Core',
  7: 'Legs',
  8: 'Legs',
  9: 'Back',
  10: 'Legs',
  11: 'Legs',
  12: 'Back',
  13: 'Biceps',
  14: 'Core',
  15: 'Legs',
};

async function fetchAllExercises(): Promise<WgerExercise[]> {
  let allResults: WgerExercise[] = [];
  let url = `${WGER_BASE}/exercise/?limit=100`;

  while (url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`WGER API error: ${response.status}`);
    const data = await response.json();
    allResults = allResults.concat(data.results);
    url = data.next;
  }

  return allResults;
}

async function fetchExerciseNames(exerciseIds: number[]): Promise<Record<number, string>> {
  const names: Record<number, string> = {};
  const batchSize = 20;

  for (let i = 0; i < exerciseIds.length; i += batchSize) {
    const batch = exerciseIds.slice(i, i + batchSize);
    const promises = batch.map(async (id) => {
      try {
        const response = await fetch(`${WGER_BASE}/exercise/${id}/`);
        if (!response.ok) return null;
        const data = await response.json();
        return { id, data };
      } catch {
        return null;
      }
    });

    const results = await Promise.all(promises);
    for (const result of results) {
      if (result?.data?.name) {
        names[result.id] = result.data.name;
      }
    }
  }

  return names;
}

export async function fetchExercisesFromWger(): Promise<WgerExercise[]> {
  const exercises = await fetchAllExercises();

  const exerciseIds = exercises.map((ex) => ex.id);
  const names = await fetchExerciseNames(exerciseIds);

  return exercises.map((ex) => ({
    ...ex,
    name: names[ex.id] || `Exercise #${ex.id}`,
  }));
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
  const primaryMuscle = wger.muscles[0];
  const muscleGroup = MUSCLE_ID_TO_GROUP[primaryMuscle] || 'Other';

  return {
    key: `wger_${wger.id}`,
    name: wger.name,
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

  const fresh = await refreshExerciseCache();
  return fresh;
}

import { Exercise } from '../types';
import { getExercises, mapWgerToAppExercise } from '../api/wger';

export const EXERCISE_LIBRARY: Exercise[] = [
  { key: 'bicep_curl', name: 'Bicep Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'hammer_curl', name: 'Hammer Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'concentration_curl', name: 'Concentration Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'shoulder_press', name: 'Shoulder Press', met: 4.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'lateral_raise', name: 'Lateral Raise', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'front_raise', name: 'Front Raise', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'bent_over_row', name: 'Bent-Over Row', met: 4.5, muscle: 'Back', equipment: 'Dumbbell/Barbell' },
  { key: 'lat_pulldown', name: 'Lat Pulldown', met: 3.5, muscle: 'Back', equipment: 'Machine' },
  { key: 'seated_row', name: 'Seated Row', met: 4.5, muscle: 'Back', equipment: 'Machine' },
  { key: 'chest_press', name: 'Chest Press', met: 4.5, muscle: 'Chest', equipment: 'Dumbbell' },
  { key: 'bench_press', name: 'Bench Press', met: 4.5, muscle: 'Chest', equipment: 'Barbell' },
  { key: 'chest_fly', name: 'Chest Fly', met: 3.5, muscle: 'Chest', equipment: 'Dumbbell' },
  { key: 'tricep_pushdown', name: 'Tricep Pushdown', met: 3.5, muscle: 'Arms', equipment: 'Machine' },
  { key: 'overhead_tricep_extension', name: 'Overhead Tricep Extension', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'squat', name: 'Squat', met: 5.0, muscle: 'Legs', equipment: 'Barbell/Bodyweight' },
  { key: 'deadlift', name: 'Deadlift', met: 5.0, muscle: 'Back', equipment: 'Barbell' },
  { key: 'leg_press', name: 'Leg Press', met: 4.0, muscle: 'Legs', equipment: 'Machine' },
  { key: 'circuit_supersets', name: 'Circuit / Supersets', met: 5.8, muscle: 'Cardio', equipment: 'Any' },
  { key: 'vigorous_lifting', name: 'Vigorous Lifting', met: 6.0, muscle: 'Cardio', equipment: 'Any' },
  { key: 'kettlebell_swings', name: 'Kettlebell Swings', met: 9.8, muscle: 'Cardio', equipment: 'Kettlebell' },
];

export const MUSCLE_GROUP_ORDER = [
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Abs',
  'Calves',
  'Cardio',
];

export interface ExerciseCategory {
  group: string;
  exercises: Exercise[];
}

export function getExercisesByMuscle(muscle: string): Exercise[] {
  return EXERCISE_LIBRARY.filter(ex => ex.muscle === muscle);
}

export function searchExercises(query: string): Exercise[] {
  const q = query.toLowerCase();
  return EXERCISE_LIBRARY.filter(ex =>
    ex.name.toLowerCase().includes(q) || ex.muscle.toLowerCase().includes(q)
  );
}

let _allExercises: Exercise[] | null = null;

export async function getAllExercises(): Promise<Exercise[]> {
  if (_allExercises) return _allExercises;

  const wgerExercises = await getExercises();
  const wgerMapped = wgerExercises.map(mapWgerToAppExercise);

  const combined = [...EXERCISE_LIBRARY, ...wgerMapped];
  const seen = new Set<string>();
  _allExercises = combined.filter(ex => {
    if (seen.has(ex.key)) return false;
    seen.add(ex.key);
    return true;
  });

  return _allExercises;
}

export function searchAllExercises(query: string, allExercises: Exercise[]): Exercise[] {
  const q = query.toLowerCase();
  return allExercises.filter(ex =>
    ex.name.toLowerCase().includes(q) || ex.muscle.toLowerCase().includes(q)
  );
}

export function groupExercisesByCategory(allExercises: Exercise[]): ExerciseCategory[] {
  const groups: Record<string, Exercise[]> = {};

  for (const ex of allExercises) {
    if (!groups[ex.muscle]) groups[ex.muscle] = [];
    groups[ex.muscle].push(ex);
  }

  return MUSCLE_GROUP_ORDER
    .filter(group => groups[group] && groups[group].length > 0)
    .map(group => ({ group, exercises: groups[group] }));
}

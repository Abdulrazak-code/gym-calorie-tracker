import { Exercise } from '../types';

export const EXERCISE_LIBRARY: Exercise[] = [
  { key: 'bicep_curl', name: 'Bicep Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'hammer_curl', name: 'Hammer Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'concentration_curl', name: 'Concentration Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'preacher_curl', name: 'Preacher Curl', met: 3.5, muscle: 'Arms', equipment: 'Barbell' },
  { key: 'incline_curl', name: 'Incline Dumbbell Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'cable_curl', name: 'Cable Curl', met: 3.5, muscle: 'Arms', equipment: 'Machine' },
  { key: 'shoulder_press', name: 'Shoulder Press', met: 4.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'lateral_raise', name: 'Lateral Raise', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'front_raise', name: 'Front Raise', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'upright_row', name: 'Upright Row', met: 4.5, muscle: 'Shoulders', equipment: 'Barbell' },
  { key: 'face_pull', name: 'Face Pull', met: 3.5, muscle: 'Shoulders', equipment: 'Machine' },
  { key: 'reverse_fly', name: 'Reverse Fly', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'bent_over_row', name: 'Bent-Over Row', met: 4.5, muscle: 'Back', equipment: 'Dumbbell/Barbell' },
  { key: 'lat_pulldown', name: 'Lat Pulldown', met: 3.5, muscle: 'Back', equipment: 'Machine' },
  { key: 'seated_row', name: 'Seated Row', met: 4.5, muscle: 'Back', equipment: 'Machine' },
  { key: 'deadlift', name: 'Deadlift', met: 5.0, muscle: 'Back', equipment: 'Barbell' },
  { key: 'pull_up', name: 'Pull-Up', met: 4.5, muscle: 'Back', equipment: 'Bodyweight' },
  { key: 't_bar_row', name: 'T-Bar Row', met: 4.5, muscle: 'Back', equipment: 'Barbell' },
  { key: 'chest_press', name: 'Chest Press', met: 4.5, muscle: 'Chest', equipment: 'Dumbbell' },
  { key: 'bench_press', name: 'Bench Press', met: 4.5, muscle: 'Chest', equipment: 'Barbell' },
  { key: 'chest_fly', name: 'Chest Fly', met: 3.5, muscle: 'Chest', equipment: 'Dumbbell' },
  { key: 'incline_bench_press', name: 'Incline Bench Press', met: 4.5, muscle: 'Chest', equipment: 'Barbell' },
  { key: 'decline_bench_press', name: 'Decline Bench Press', met: 4.5, muscle: 'Chest', equipment: 'Barbell' },
  { key: 'push_up', name: 'Push-Up', met: 4.0, muscle: 'Chest', equipment: 'Bodyweight' },
  { key: 'cable_crossover', name: 'Cable Crossover', met: 3.5, muscle: 'Chest', equipment: 'Machine' },
  { key: 'tricep_pushdown', name: 'Tricep Pushdown', met: 3.5, muscle: 'Arms', equipment: 'Machine' },
  { key: 'overhead_tricep_extension', name: 'Overhead Tricep Extension', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'skull_crusher', name: 'Skull Crusher', met: 3.5, muscle: 'Arms', equipment: 'Barbell' },
  { key: 'dips', name: 'Dips', met: 4.5, muscle: 'Arms', equipment: 'Bodyweight' },
  { key: 'close_grip_bench', name: 'Close Grip Bench Press', met: 4.5, muscle: 'Arms', equipment: 'Barbell' },
  { key: 'squat', name: 'Squat', met: 5.0, muscle: 'Legs', equipment: 'Barbell/Bodyweight' },
  { key: 'leg_press', name: 'Leg Press', met: 4.0, muscle: 'Legs', equipment: 'Machine' },
  { key: 'leg_curl', name: 'Leg Curl', met: 3.5, muscle: 'Legs', equipment: 'Machine' },
  { key: 'leg_extension', name: 'Leg Extension', met: 3.5, muscle: 'Legs', equipment: 'Machine' },
  { key: 'lunges', name: 'Lunges', met: 4.5, muscle: 'Legs', equipment: 'Dumbbell/Bodyweight' },
  { key: 'calf_raise', name: 'Calf Raise', met: 3.0, muscle: 'Calves', equipment: 'Machine/Bodyweight' },
  { key: 'crunches', name: 'Crunches', met: 3.0, muscle: 'Abs', equipment: 'Bodyweight' },
  { key: 'plank', name: 'Plank', met: 3.0, muscle: 'Abs', equipment: 'Bodyweight' },
  { key: 'russian_twist', name: 'Russian Twist', met: 3.5, muscle: 'Abs', equipment: 'Bodyweight' },
  { key: 'hanging_leg_raise', name: 'Hanging Leg Raise', met: 3.5, muscle: 'Abs', equipment: 'Bodyweight' },
  { key: 'circuit_supersets', name: 'Circuit / Supersets', met: 5.8, muscle: 'Cardio', equipment: 'Any' },
  { key: 'vigorous_lifting', name: 'Vigorous Lifting', met: 6.0, muscle: 'Cardio', equipment: 'Any' },
  { key: 'kettlebell_swings', name: 'Kettlebell Swings', met: 9.8, muscle: 'Cardio', equipment: 'Kettlebell' },
  { key: 'jumping_jacks', name: 'Jumping Jacks', met: 7.0, muscle: 'Cardio', equipment: 'Bodyweight' },
  { key: 'jump_rope', name: 'Jump Rope', met: 10.0, muscle: 'Cardio', equipment: 'Bodyweight' },
  { key: 'rowing_machine', name: 'Rowing Machine', met: 7.0, muscle: 'Cardio', equipment: 'Machine' },
  { key: 'stationary_bike', name: 'Stationary Bike', met: 6.0, muscle: 'Cardio', equipment: 'Machine' },
];

export const MUSCLE_GROUP_ORDER = [
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Calves',
  'Abs',
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
  _allExercises = [...EXERCISE_LIBRARY];
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

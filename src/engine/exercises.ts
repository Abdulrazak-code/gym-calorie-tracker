import { Exercise } from '../types';

export const EXERCISE_LIBRARY: Exercise[] = [
  { key: 'bicep_curl', name: 'Bicep Curl', met: 3.5, muscle: 'Biceps', equipment: 'Dumbbell' },
  { key: 'hammer_curl', name: 'Hammer Curl', met: 3.5, muscle: 'Biceps', equipment: 'Dumbbell' },
  { key: 'concentration_curl', name: 'Concentration Curl', met: 3.5, muscle: 'Biceps', equipment: 'Dumbbell' },
  { key: 'shoulder_press', name: 'Shoulder Press', met: 4.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'lateral_raise', name: 'Lateral Raise', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'front_raise', name: 'Front Raise', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'bent_over_row', name: 'Bent-Over Row', met: 4.5, muscle: 'Back', equipment: 'Dumbbell/Barbell' },
  { key: 'lat_pulldown', name: 'Lat Pulldown', met: 3.5, muscle: 'Back', equipment: 'Machine' },
  { key: 'seated_row', name: 'Seated Row', met: 4.5, muscle: 'Back', equipment: 'Machine' },
  { key: 'chest_press', name: 'Chest Press', met: 4.5, muscle: 'Chest', equipment: 'Dumbbell' },
  { key: 'bench_press', name: 'Bench Press', met: 4.5, muscle: 'Chest', equipment: 'Barbell' },
  { key: 'chest_fly', name: 'Chest Fly', met: 3.5, muscle: 'Chest', equipment: 'Dumbbell' },
  { key: 'tricep_pushdown', name: 'Tricep Pushdown', met: 3.5, muscle: 'Triceps', equipment: 'Machine' },
  { key: 'overhead_tricep_extension', name: 'Overhead Tricep Extension', met: 3.5, muscle: 'Triceps', equipment: 'Dumbbell' },
  { key: 'squat', name: 'Squat', met: 5.0, muscle: 'Legs', equipment: 'Barbell/Bodyweight' },
  { key: 'deadlift', name: 'Deadlift', met: 5.0, muscle: 'Legs/Back', equipment: 'Barbell' },
  { key: 'leg_press', name: 'Leg Press', met: 4.0, muscle: 'Legs', equipment: 'Machine' },
  { key: 'circuit_supersets', name: 'Circuit / Supersets', met: 5.8, muscle: 'Full Body', equipment: 'Any' },
  { key: 'vigorous_lifting', name: 'Vigorous Lifting', met: 6.0, muscle: 'Full Body', equipment: 'Any' },
  { key: 'kettlebell_swings', name: 'Kettlebell Swings', met: 9.8, muscle: 'Full Body', equipment: 'Kettlebell' },
];

export const MUSCLE_GROUPS = ['Biceps', 'Shoulders', 'Back', 'Chest', 'Triceps', 'Legs', 'Legs/Back', 'Full Body'];

export function getExercisesByMuscle(muscle: string): Exercise[] {
  return EXERCISE_LIBRARY.filter(ex => ex.muscle === muscle);
}

export function searchExercises(query: string): Exercise[] {
  const q = query.toLowerCase();
  return EXERCISE_LIBRARY.filter(ex =>
    ex.name.toLowerCase().includes(q) || ex.muscle.toLowerCase().includes(q)
  );
}

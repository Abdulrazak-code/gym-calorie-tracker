import { Exercise, WorkoutCategory } from '../types';

export const EXERCISE_LIBRARY: Exercise[] = [
  { key: 'bench_press', name: 'Bench Press', met: 4.5, muscle: 'Chest', equipment: 'Barbell' },
  { key: 'incline_bench_press', name: 'Incline Bench Press', met: 4.5, muscle: 'Chest', equipment: 'Barbell' },
  { key: 'dumbbell_chest_press', name: 'Dumbbell Chest Press', met: 4.5, muscle: 'Chest', equipment: 'Dumbbell' },
  { key: 'chest_fly', name: 'Chest Fly', met: 3.5, muscle: 'Chest', equipment: 'Dumbbell' },
  { key: 'push_up', name: 'Push-Up', met: 4.0, muscle: 'Chest', equipment: 'Bodyweight' },
  { key: 'cable_crossover', name: 'Cable Crossover', met: 3.5, muscle: 'Chest', equipment: 'Machine' },
  { key: 'decline_bench_press', name: 'Decline Bench Press', met: 4.5, muscle: 'Chest', equipment: 'Barbell' },

  { key: 'deadlift', name: 'Deadlift', met: 5.0, muscle: 'Back', equipment: 'Barbell' },
  { key: 'bent_over_row', name: 'Bent-Over Row', met: 4.5, muscle: 'Back', equipment: 'Barbell' },
  { key: 'lat_pulldown', name: 'Lat Pulldown', met: 3.5, muscle: 'Back', equipment: 'Machine' },
  { key: 'seated_row', name: 'Seated Row', met: 4.5, muscle: 'Back', equipment: 'Machine' },
  { key: 'pull_up', name: 'Pull-Up', met: 4.5, muscle: 'Back', equipment: 'Bodyweight' },
  { key: 't_bar_row', name: 'T-Bar Row', met: 4.5, muscle: 'Back', equipment: 'Barbell' },
  { key: 'single_arm_row', name: 'Single Arm Dumbbell Row', met: 4.5, muscle: 'Back', equipment: 'Dumbbell' },

  { key: 'shoulder_press', name: 'Shoulder Press', met: 4.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'lateral_raise', name: 'Lateral Raise', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'front_raise', name: 'Front Raise', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'upright_row', name: 'Upright Row', met: 4.5, muscle: 'Shoulders', equipment: 'Barbell' },
  { key: 'face_pull', name: 'Face Pull', met: 3.5, muscle: 'Shoulders', equipment: 'Machine' },
  { key: 'reverse_fly', name: 'Reverse Fly', met: 3.5, muscle: 'Shoulders', equipment: 'Dumbbell' },
  { key: 'arnold_press', name: 'Arnold Press', met: 4.5, muscle: 'Shoulders', equipment: 'Dumbbell' },

  { key: 'bicep_curl', name: 'Bicep Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'hammer_curl', name: 'Hammer Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'concentration_curl', name: 'Concentration Curl', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'preacher_curl', name: 'Preacher Curl', met: 3.5, muscle: 'Arms', equipment: 'Barbell' },
  { key: 'tricep_pushdown', name: 'Tricep Pushdown', met: 3.5, muscle: 'Arms', equipment: 'Machine' },
  { key: 'overhead_tricep_extension', name: 'Overhead Tricep Extension', met: 3.5, muscle: 'Arms', equipment: 'Dumbbell' },
  { key: 'skull_crusher', name: 'Skull Crusher', met: 3.5, muscle: 'Arms', equipment: 'Barbell' },
  { key: 'dips', name: 'Dips', met: 4.5, muscle: 'Arms', equipment: 'Bodyweight' },
  { key: 'close_grip_bench', name: 'Close Grip Bench Press', met: 4.5, muscle: 'Arms', equipment: 'Barbell' },

  { key: 'squat', name: 'Squat', met: 5.0, muscle: 'Legs', equipment: 'Barbell' },
  { key: 'leg_press', name: 'Leg Press', met: 4.0, muscle: 'Legs', equipment: 'Machine' },
  { key: 'leg_curl', name: 'Leg Curl', met: 3.5, muscle: 'Legs', equipment: 'Machine' },
  { key: 'leg_extension', name: 'Leg Extension', met: 3.5, muscle: 'Legs', equipment: 'Machine' },
  { key: 'lunges', name: 'Lunges', met: 4.5, muscle: 'Legs', equipment: 'Dumbbell' },
  { key: 'romanian_deadlift', name: 'Romanian Deadlift', met: 5.0, muscle: 'Legs', equipment: 'Barbell' },
  { key: 'bulgarian_split_squat', name: 'Bulgarian Split Squat', met: 4.5, muscle: 'Legs', equipment: 'Dumbbell' },

  { key: 'calf_raise', name: 'Calf Raise', met: 3.0, muscle: 'Calves', equipment: 'Machine' },
  { key: 'seated_calf_raise', name: 'Seated Calf Raise', met: 3.0, muscle: 'Calves', equipment: 'Machine' },

  { key: 'crunches', name: 'Crunches', met: 3.0, muscle: 'Abs', equipment: 'Bodyweight' },
  { key: 'plank', name: 'Plank', met: 3.0, muscle: 'Abs', equipment: 'Bodyweight' },
  { key: 'russian_twist', name: 'Russian Twist', met: 3.5, muscle: 'Abs', equipment: 'Bodyweight' },
  { key: 'hanging_leg_raise', name: 'Hanging Leg Raise', met: 3.5, muscle: 'Abs', equipment: 'Bodyweight' },
  { key: 'cable_crunch', name: 'Cable Crunch', met: 3.5, muscle: 'Abs', equipment: 'Machine' },
  { key: 'ab_wheel', name: 'Ab Wheel Rollout', met: 4.0, muscle: 'Abs', equipment: 'Bodyweight' },

  { key: 'hip_thrust', name: 'Hip Thrust', met: 4.5, muscle: 'Glutes', equipment: 'Barbell' },
  { key: 'glute_bridge', name: 'Glute Bridge', met: 3.5, muscle: 'Glutes', equipment: 'Bodyweight' },
  { key: 'cable_kickback', name: 'Cable Kickback', met: 3.0, muscle: 'Glutes', equipment: 'Machine' },
  { key: 'sumo_squat', name: 'Sumo Squat', met: 5.0, muscle: 'Glutes', equipment: 'Dumbbell' },

  { key: 'kettlebell_swings', name: 'Kettlebell Swings', met: 9.8, muscle: 'Full Body', equipment: 'Kettlebell' },
  { key: 'burpees', name: 'Burpees', met: 8.0, muscle: 'Full Body', equipment: 'Bodyweight' },
  { key: 'clean_and_press', name: 'Clean and Press', met: 7.0, muscle: 'Full Body', equipment: 'Barbell' },
  { key: 'thrusters', name: 'Thrusters', met: 7.0, muscle: 'Full Body', equipment: 'Barbell' },
];

export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  {
    key: 'full_body',
    name: 'Full Body Workout',
    icon: 'dumbbell',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['squat', 'bench_press', 'bent_over_row', 'shoulder_press', 'bicep_curl', 'tricep_pushdown', 'deadlift', 'kettlebell_swings'],
  },
  {
    key: 'chest',
    name: 'Chest Workout',
    icon: 'arm-flex',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['bench_press', 'incline_bench_press', 'dumbbell_chest_press', 'chest_fly', 'push_up', 'cable_crossover', 'decline_bench_press'],
  },
  {
    key: 'back',
    name: 'Back Workout',
    icon: 'human-handsdown',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['deadlift', 'bent_over_row', 'lat_pulldown', 'seated_row', 'pull_up', 't_bar_row', 'single_arm_row'],
  },
  {
    key: 'arms',
    name: 'Arm Workout',
    icon: 'arm-flex-outline',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['bicep_curl', 'hammer_curl', 'concentration_curl', 'preacher_curl', 'tricep_pushdown', 'overhead_tricep_extension', 'skull_crusher', 'dips', 'close_grip_bench'],
  },
  {
    key: 'shoulders',
    name: 'Shoulder Workout',
    icon: 'weight-lifter',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['shoulder_press', 'lateral_raise', 'front_raise', 'upright_row', 'face_pull', 'reverse_fly', 'arnold_press'],
  },
  {
    key: 'lower_body',
    name: 'Lower Body Workout',
    icon: 'run',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['squat', 'leg_press', 'leg_curl', 'leg_extension', 'lunges', 'romanian_deadlift', 'bulgarian_split_squat', 'calf_raise', 'seated_calf_raise'],
  },
  {
    key: 'upper_body',
    name: 'Upper Body Workout',
    icon: 'flexible-arm',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['bench_press', 'bent_over_row', 'shoulder_press', 'bicep_curl', 'tricep_pushdown', 'lateral_raise', 'lat_pulldown', 'push_up'],
  },
  {
    key: 'abs',
    name: 'Abs Workout',
    icon: 'target',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['crunches', 'plank', 'russian_twist', 'hanging_leg_raise', 'cable_crunch', 'ab_wheel'],
  },
  {
    key: 'v_taper',
    name: 'V-Taper Workout',
    icon: 'triangle-outline',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['lat_pulldown', 'pull_up', 'seated_row', 'lateral_raise', 'face_pull', 'single_arm_row', 't_bar_row'],
  },
  {
    key: 'butt',
    name: 'Butt Workout',
    icon: 'run-fast',
    iconLib: 'MaterialCommunityIcons',
    exerciseKeys: ['hip_thrust', 'glute_bridge', 'sumo_squat', 'bulgarian_split_squat', 'romanian_deadlift', 'cable_kickback', 'lunges'],
  },
];

export function getExerciseByKey(key: string): Exercise | undefined {
  return EXERCISE_LIBRARY.find(ex => ex.key === key);
}

export function searchExercises(query: string): Exercise[] {
  const q = query.toLowerCase();
  return EXERCISE_LIBRARY.filter(ex =>
    ex.name.toLowerCase().includes(q) || ex.muscle.toLowerCase().includes(q)
  );
}

export function getExercisesForWorkout(workoutKey: string): Exercise[] {
  const category = WORKOUT_CATEGORIES.find(c => c.key === workoutKey);
  if (!category) return [];
  return category.exerciseKeys.map(key => EXERCISE_LIBRARY.find(ex => ex.key === key)).filter(Boolean) as Exercise[];
}

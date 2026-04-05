import axios from 'axios';

const API_BASE = 'http://localhost/api/v1';

export interface ExerciseDBExercise {
  exerciseId: string;
  name: string;
  gifUrl: string;
  targetMuscles: string[];
  bodyParts: string[];
  equipments: string[];
  secondaryMuscles: string[];
  instructions: string[];
}

export interface ExerciseDBResponse {
  success: boolean;
  metadata: {
    totalPages: number;
    totalExercises: number;
    currentPage: number;
    previousPage: string | null;
    nextPage: string | null;
  };
  data: ExerciseDBExercise[];
}

export async function searchExercises(query: string): Promise<ExerciseDBExercise[]> {
  try {
    const response = await axios.get(`${API_BASE}/exercises?search=${encodeURIComponent(query)}&limit=10`);
    return response.data.data || [];
  } catch {
    return [];
  }
}

export async function getExercisesByTargetMuscle(muscle: string): Promise<ExerciseDBExercise[]> {
  try {
    const response = await axios.get(`${API_BASE}/exercises/targetMuscle/${encodeURIComponent(muscle)}`);
    return response.data.data || [];
  } catch {
    return [];
  }
}

export async function getExercisesByBodyPart(bodyPart: string): Promise<ExerciseDBExercise[]> {
  try {
    const response = await axios.get(`${API_BASE}/exercises/bodyPart/${encodeURIComponent(bodyPart)}`);
    return response.data.data || [];
  } catch {
    return [];
  }
}

export async function findExerciseByName(name: string): Promise<ExerciseDBExercise | null> {
  const results = await searchExercises(name);
  return results.length > 0 ? results[0] : null;
}

export const EXERCISE_SEARCH_MAP: Record<string, string> = {
  bench_press: 'barbell bench press',
  incline_bench_press: 'incline bench press',
  dumbbell_chest_press: 'dumbbell bench press',
  chest_fly: 'dumbbell fly',
  push_up: 'push-up',
  cable_crossover: 'cable crossover',
  decline_bench_press: 'decline bench press',
  deadlift: 'barbell deadlift',
  bent_over_row: 'barbell bent over row',
  lat_pulldown: 'lat pulldown',
  seated_row: 'seated cable row',
  pull_up: 'pull-up',
  t_bar_row: 't-bar row',
  single_arm_row: 'one arm dumbbell row',
  shoulder_press: 'dumbbell shoulder press',
  lateral_raise: 'dumbbell lateral raise',
  front_raise: 'dumbbell front raise',
  upright_row: 'barbell upright row',
  face_pull: 'cable face pull',
  reverse_fly: 'reverse fly',
  arnold_press: 'arnold press',
  bicep_curl: 'dumbbell bicep curl',
  hammer_curl: 'dumbbell hammer curl',
  concentration_curl: 'concentration curl',
  preacher_curl: 'preacher curl',
  tricep_pushdown: 'cable tricep pushdown',
  overhead_tricep_extension: 'overhead tricep extension',
  skull_crusher: 'skull crusher',
  dips: 'parallel bar dips',
  close_grip_bench: 'close grip bench press',
  squat: 'barbell squat',
  leg_press: 'leg press',
  leg_curl: 'leg curl',
  leg_extension: 'leg extension',
  lunges: 'dumbbell lunge',
  romanian_deadlift: 'romanian deadlift',
  bulgarian_split_squat: 'bulgarian split squat',
  calf_raise: 'calf raise',
  seated_calf_raise: 'seated calf raise',
  crunches: 'crunch',
  plank: 'plank',
  russian_twist: 'russian twist',
  hanging_leg_raise: 'hanging leg raise',
  cable_crunch: 'cable crunch',
  ab_wheel: 'ab wheel',
  hip_thrust: 'barbell hip thrust',
  glute_bridge: 'glute bridge',
  cable_kickback: 'cable kickback',
  sumo_squat: 'sumo squat',
  kettlebell_swings: 'kettlebell swing',
  burpees: 'burpee',
  clean_and_press: 'clean and press',
  thrusters: 'barbell thruster',
};

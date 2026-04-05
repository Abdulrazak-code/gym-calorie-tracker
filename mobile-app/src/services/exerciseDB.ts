import axios from 'axios';

const API_BASE = 'https://exercisedb.dev/api/v1';

export interface ExerciseDBResponse {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export async function searchExerciseDB(query: string): Promise<ExerciseDBResponse[]> {
  try {
    const response = await axios.get(`${API_BASE}/exercises/name/${query}`);
    return response.data;
  } catch {
    return [];
  }
}

export async function getExerciseByBodyPart(bodyPart: string): Promise<ExerciseDBResponse[]> {
  try {
    const response = await axios.get(`${API_BASE}/exercises/bodyPart/${bodyPart}`);
    return response.data;
  } catch {
    return [];
  }
}

export async function getExerciseById(id: string): Promise<ExerciseDBResponse | null> {
  try {
    const response = await axios.get(`${API_BASE}/exercises/exercise/${id}`);
    return response.data;
  } catch {
    return null;
  }
}

export const EXERCISE_DB_MAP: Record<string, string> = {
  bench_press: '0025',
  incline_bench_press: '1255',
  dumbbell_chest_press: '0293',
  chest_fly: '1256',
  push_up: '0662',
  cable_crossover: '0168',
  decline_bench_press: '0049',
  deadlift: '0032',
  bent_over_row: '0027',
  lat_pulldown: '0028',
  seated_row: '0030',
  pull_up: '0651',
  t_bar_row: '0031',
  single_arm_row: '0033',
  shoulder_press: '0034',
  lateral_raise: '0035',
  front_raise: '0036',
  upright_row: '0037',
  face_pull: '0038',
  reverse_fly: '0039',
  arnold_press: '0040',
  bicep_curl: '0041',
  hammer_curl: '0042',
  concentration_curl: '0043',
  preacher_curl: '0044',
  tricep_pushdown: '0045',
  overhead_tricep_extension: '0046',
  skull_crusher: '0047',
  dips: '0048',
  close_grip_bench: '0050',
  squat: '0051',
  leg_press: '0052',
  leg_curl: '0053',
  leg_extension: '0054',
  lunges: '0055',
  romanian_deadlift: '0056',
  bulgarian_split_squat: '0057',
  calf_raise: '0058',
  seated_calf_raise: '0059',
  crunches: '0060',
  plank: '0061',
  russian_twist: '0062',
  hanging_leg_raise: '0063',
  cable_crunch: '0064',
  ab_wheel: '0065',
  hip_thrust: '0066',
  glute_bridge: '0067',
  cable_kickback: '0068',
  sumo_squat: '0069',
  kettlebell_swings: '0070',
  burpees: '0071',
  clean_and_press: '0072',
  thrusters: '0073',
};

export function getExerciseGifUrl(exerciseKey: string): string | null {
  const id = EXERCISE_DB_MAP[exerciseKey];
  if (!id) return null;
  return `https://v2.exercisedb.dev/image/exercise/${id}.gif`;
}

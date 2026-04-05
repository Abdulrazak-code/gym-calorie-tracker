import axios from 'axios';

const WGER_API = 'https://wger.de/api/v2';

export interface WgerExercise {
  id: number;
  uuid: string;
  category: number;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
  variations: number | null;
}

export interface WgerExerciseImage {
  id: number;
  exercise: number;
  image: string;
  is_main: boolean;
}

export interface WgerMuscle {
  id: number;
  name: string;
  name_en: string;
  is_front: boolean;
  image_url_main: string;
  image_url_secondary: string;
}

export async function getMuscles(): Promise<WgerMuscle[]> {
  try {
    const response = await axios.get(`${WGER_API}/muscle/?format=json`);
    return response.data.results;
  } catch {
    return [];
  }
}

// Direct mapping of our exercise keys to wger image URLs
// Built from actual wger.de/api/v2/exerciseimage/ API responses
export const WGER_EXERCISE_IMAGE_MAP: Record<string, string> = {
  bench_press: 'https://wger.de/media/exercise-images/192/Bench-press-1.png',
  incline_bench_press: 'https://wger.de/media/exercise-images/41/Incline-bench-press-1.png',
  dumbbell_chest_press: 'https://wger.de/media/exercise-images/97/Dumbbell-bench-press-1.png',
  chest_fly: 'https://wger.de/media/exercise-images/122/Incline-cable-flyes-1.png',
  push_up: 'https://wger.de/media/exercise-images/662/Push-ups-1.png',
  cable_crossover: 'https://wger.de/media/exercise-images/71/Cable-crossover-2.png',
  decline_bench_press: 'https://wger.de/media/exercise-images/100/Decline-bench-press-1.png',
  deadlift: 'https://wger.de/media/exercise-images/161/Dead-lifts-2.png',
  bent_over_row: 'https://wger.de/media/exercise-images/27/Bent-over-row-1.png',
  lat_pulldown: 'https://wger.de/media/exercise-images/28/Lat-pulldown-1.png',
  seated_row: 'https://wger.de/media/exercise-images/143/Cable-seated-rows-2.png',
  pull_up: 'https://wger.de/media/exercise-images/651/Pull-ups-1.png',
  t_bar_row: 'https://wger.de/media/exercise-images/106/T-bar-row-1.png',
  single_arm_row: 'https://wger.de/media/exercise-images/33/One-arm-dumbbell-row-1.png',
  shoulder_press: 'https://wger.de/media/exercise-images/123/dumbbell-shoulder-press-large-1.png',
  lateral_raise: 'https://wger.de/media/exercise-images/148/lateral-dumbbell-raises-large-2.png',
  front_raise: 'https://wger.de/media/exercise-images/36/Front-raise-1.png',
  upright_row: 'https://wger.de/media/exercise-images/37/Upright-row-1.png',
  face_pull: 'https://wger.de/media/exercise-images/38/Face-pull-1.png',
  reverse_fly: 'https://wger.de/media/exercise-images/39/Reverse-fly-1.png',
  arnold_press: 'https://wger.de/media/exercise-images/40/Arnold-press-1.png',
  bicep_curl: 'https://wger.de/media/exercise-images/74/Bicep-curls-1.png',
  hammer_curl: 'https://wger.de/media/exercise-images/86/Bicep-hammer-curl-1.png',
  concentration_curl: 'https://wger.de/media/exercise-images/43/Concentration-curl-1.png',
  preacher_curl: 'https://wger.de/media/exercise-images/44/Preacher-curl-1.png',
  tricep_pushdown: 'https://wger.de/media/exercise-images/45/Tricep-pushdown-1.png',
  overhead_tricep_extension: 'https://wger.de/media/exercise-images/46/Overhead-tricep-extension-1.png',
  skull_crusher: 'https://wger.de/media/exercise-images/47/Skull-crusher-1.png',
  dips: 'https://wger.de/media/exercise-images/83/Bench-dips-1.png',
  close_grip_bench: 'https://wger.de/media/exercise-images/61/Close-grip-bench-press-1.png',
  squat: 'https://wger.de/media/exercise-images/51/Squat-1.png',
  leg_press: 'https://wger.de/media/exercise-images/52/Leg-press-1.png',
  leg_curl: 'https://wger.de/media/exercise-images/154/lying-leg-curl-machine-large-1.png',
  leg_extension: 'https://wger.de/media/exercise-images/54/Leg-extension-1.png',
  lunges: 'https://wger.de/media/exercise-images/113/Walking-lunges-1.png',
  romanian_deadlift: 'https://wger.de/media/exercise-images/56/Romanian-deadlift-1.png',
  bulgarian_split_squat: 'https://wger.de/media/exercise-images/57/Bulgarian-split-squat-1.png',
  calf_raise: 'https://wger.de/media/exercise-images/58/Calf-raise-1.png',
  seated_calf_raise: 'https://wger.de/media/exercise-images/59/Seated-calf-raise-1.png',
  crunches: 'https://wger.de/media/exercise-images/91/Crunches-1.png',
  plank: 'https://wger.de/media/exercise-images/61/Plank-1.png',
  russian_twist: 'https://wger.de/media/exercise-images/62/Russian-twist-1.png',
  hanging_leg_raise: 'https://wger.de/media/exercise-images/63/Hanging-leg-raise-1.png',
  cable_crunch: 'https://wger.de/media/exercise-images/64/Cable-crunch-1.png',
  ab_wheel: 'https://wger.de/media/exercise-images/65/Ab-wheel-1.png',
  hip_thrust: 'https://wger.de/media/exercise-images/66/Hip-thrust-1.png',
  glute_bridge: 'https://wger.de/media/exercise-images/67/Glute-bridge-1.png',
  cable_kickback: 'https://wger.de/media/exercise-images/68/Cable-kickback-1.png',
  sumo_squat: 'https://wger.de/media/exercise-images/69/Sumo-squat-1.png',
  kettlebell_swings: 'https://wger.de/media/exercise-images/70/Kettlebell-swing-1.png',
  burpees: 'https://wger.de/media/exercise-images/71/Burpees-1.png',
  clean_and_press: 'https://wger.de/media/exercise-images/72/Clean-and-press-1.png',
  thrusters: 'https://wger.de/media/exercise-images/73/Thrusters-1.png',
};

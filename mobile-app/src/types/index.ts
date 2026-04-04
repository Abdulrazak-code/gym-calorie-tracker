export interface Exercise {
  key: string;
  name: string;
  met: number;
  muscle: string;
  equipment: string;
}

export interface WorkoutCategory {
  key: string;
  name: string;
  icon: string;
  iconLib: 'MaterialCommunityIcons' | 'Ionicons';
  exerciseKeys: string[];
}

export interface UserProfile {
  bodyWeightKg: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  heightCm: number;
}

export interface SetEntry {
  reps: number;
  weight: number;
}

export interface LoggedExercise {
  exerciseKey: string;
  sets: SetEntry[];
  restTimeSec: number;
}

export interface WorkoutSession {
  id: string;
  date: string;
  exercises: LoggedExercise[];
  totalCalories: number;
  activeCalories: number;
  epocCalories: number;
  durationSec: number;
}

export interface CalorieResult {
  exercise: string;
  sets: number;
  reps: number;
  bodyWeightKg: number;
  dumbbellWeightKg: number;
  baseMet: number;
  adjustedMet: number;
  intensity: string;
  durationSec: number;
  activeCal: number;
  epocCal: number;
  totalCal: number;
}

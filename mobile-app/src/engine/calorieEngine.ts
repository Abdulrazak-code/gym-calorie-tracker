import { CalorieResult } from '../types';

export function estimateDuration(sets: number, reps: number, restTime = 75, repTime = 3): number {
  return sets * (reps * repTime) + (sets - 1) * restTime;
}

export function calculate1RM(weight: number, reps: number): number {
  return weight * (1 + reps / 30);
}

export function classifyIntensity(weight: number, reps: number): [string, number] {
  const oneRM = calculate1RM(weight, reps);
  if (oneRM === 0) return ['light', 1.0];
  const pct = weight / oneRM;
  if (pct < 0.40) return ['light', 1.0];
  if (pct < 0.70) return ['moderate', 1.175];
  return ['vigorous', 1.30];
}

export function applyEPOC(calories: number): number {
  return calories * 1.07;
}

export function caloriesBurned(
  exerciseKey: string,
  sets: number,
  reps: number,
  bodyWeightKg: number,
  dumbbellWeightKg: number,
  baseMet: number,
): CalorieResult {
  const durationSec = estimateDuration(sets, reps);
  const durationHours = durationSec / 3600;
  const [intensity, repsMultiplier] = classifyIntensity(dumbbellWeightKg, reps);
  // weightFactor makes heavier weights burn more calories proportionally
  const weightFactor = bodyWeightKg > 0 && dumbbellWeightKg > 0
    ? 1 + (dumbbellWeightKg / bodyWeightKg) * 0.3
    : 1;
  const multiplier = repsMultiplier * weightFactor;
  const adjustedMet = baseMet * multiplier;
  const activeCal = adjustedMet * bodyWeightKg * durationHours;
  const totalCal = applyEPOC(activeCal);
  const epocCal = totalCal - activeCal;

  return {
    exercise: exerciseKey,
    sets,
    reps,
    bodyWeightKg,
    dumbbellWeightKg,
    baseMet,
    adjustedMet,
    intensity,
    durationSec,
    activeCal: Math.round(activeCal * 100) / 100,
    epocCal: Math.round(epocCal * 100) / 100,
    totalCal: Math.round(totalCal * 100) / 100,
  };
}

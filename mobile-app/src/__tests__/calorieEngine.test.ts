import { estimateDuration, calculate1RM, classifyIntensity, applyEPOC, caloriesBurned } from '../engine/calorieEngine';

describe('estimateDuration', () => {
  test('basic 3x10', () => {
    expect(estimateDuration(3, 10)).toBe(240);
  });

  test('4x8', () => {
    expect(estimateDuration(4, 8)).toBe(321);
  });

  test('single set', () => {
    expect(estimateDuration(1, 10)).toBe(30);
  });
});

describe('calculate1RM', () => {
  test('10kg 10reps', () => {
    expect(calculate1RM(10, 10)).toBeCloseTo(13.333, 3);
  });

  test('20kg 10reps', () => {
    expect(calculate1RM(20, 10)).toBeCloseTo(26.667, 3);
  });

  test('zero reps', () => {
    expect(calculate1RM(50, 0)).toBe(50);
  });
});

describe('classifyIntensity', () => {
  test('light', () => {
    const [level, mult] = classifyIntensity(5, 50);
    expect(level).toBe('light');
    expect(mult).toBe(1.0);
  });

  test('moderate', () => {
    const [level, mult] = classifyIntensity(10, 15);
    expect(level).toBe('moderate');
    expect(mult).toBe(1.175);
  });

  test('vigorous', () => {
    const [level, mult] = classifyIntensity(15, 10);
    expect(level).toBe('vigorous');
    expect(mult).toBe(1.30);
  });

  test('zero weight', () => {
    const [level, mult] = classifyIntensity(0, 10);
    expect(level).toBe('light');
    expect(mult).toBe(1.0);
  });
});

describe('applyEPOC', () => {
  test('seven percent', () => {
    expect(applyEPOC(100)).toBe(107);
  });

  test('zero', () => {
    expect(applyEPOC(0)).toBe(0);
  });
});

describe('caloriesBurned', () => {
  test('bicep curl 70kg 10kg 3x10', () => {
    const result = caloriesBurned('bicep_curl', 3, 10, 70, 10, 3.5);
    expect(result.intensity).toBe('vigorous');
    expect(result.durationSec).toBe(240);
    expect(result.totalCal).toBeCloseTo(22.8, 0);
  });

  test('shoulder press 80kg 15kg 3x10', () => {
    const result = caloriesBurned('shoulder_press', 3, 10, 80, 15, 4.5);
    expect(result.intensity).toBe('vigorous');
    expect(result.totalCal).toBeGreaterThan(0);
  });

  test('squat 80kg 60kg 3x10', () => {
    const result = caloriesBurned('squat', 3, 10, 80, 60, 5.0);
    expect(result.intensity).toBe('vigorous');
    expect(result.totalCal).toBeGreaterThan(0);
  });

  test('bent over row', () => {
    const result = caloriesBurned('bent_over_row', 3, 10, 80, 20, 4.5);
    expect(result.totalCal).toBeGreaterThan(0);
  });

  test('chest press', () => {
    const result = caloriesBurned('chest_press', 3, 10, 80, 20, 4.5);
    expect(result.totalCal).toBeGreaterThan(0);
  });

  test('zero dumbbell weight', () => {
    const result = caloriesBurned('bicep_curl', 3, 10, 70, 0, 3.5);
    expect(result.intensity).toBe('light');
    expect(result.totalCal).toBeGreaterThan(0);
  });

  test('more reps burn more', () => {
    const low = caloriesBurned('bicep_curl', 3, 5, 70, 10, 3.5);
    const high = caloriesBurned('bicep_curl', 3, 20, 70, 10, 3.5);
    expect(high.totalCal).toBeGreaterThan(low.totalCal);
  });

  test('more sets burn more', () => {
    const threeSets = caloriesBurned('bicep_curl', 3, 10, 70, 10, 3.5);
    const fiveSets = caloriesBurned('bicep_curl', 5, 10, 70, 10, 3.5);
    expect(fiveSets.totalCal).toBeGreaterThan(threeSets.totalCal);
  });

  test('heavier weight increases intensity', () => {
    const light = caloriesBurned('bicep_curl', 3, 10, 70, 5, 3.5);
    const heavy = caloriesBurned('bicep_curl', 3, 10, 70, 20, 3.5);
    expect(heavy.adjustedMet).toBeGreaterThanOrEqual(light.adjustedMet);
  });
});

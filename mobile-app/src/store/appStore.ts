import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, LoggedExercise, WorkoutSession, SetEntry } from '../types';
import { caloriesBurned } from '../engine/calorieEngine';
import { EXERCISE_LIBRARY } from '../engine/exercises';

const PROFILE_KEY = 'user_profile';
const SESSIONS_KEY = 'workout_sessions';

interface AppState {
  profile: UserProfile | null;
  sessions: WorkoutSession[];
  activeSession: LoggedExercise[];
  isSessionActive: boolean;

  setProfile: (profile: UserProfile) => Promise<void>;
  loadProfile: () => Promise<void>;

  startSession: () => void;
  addExercise: (exerciseKey: string) => void;
  updateExerciseSet: (exerciseIndex: number, setIndex: number, weight: number, reps: number) => void;
  removeExercise: (index: number) => void;
  finishSession: () => WorkoutSession | null;
  cancelSession: () => void;

  loadSessions: () => Promise<void>;
  deleteSession: (id: string) => Promise<void>;

  getLiveCalories: () => { activeCal: number; epocCal: number; totalCal: number; durationSec: number };
}

export const useAppStore = create<AppState>((set, get) => ({
  profile: null,
  sessions: [],
  activeSession: [],
  isSessionActive: false,

  setProfile: async (profile) => {
    set({ profile });
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },

  loadProfile: async () => {
    const data = await AsyncStorage.getItem(PROFILE_KEY);
    if (data) {
      set({ profile: JSON.parse(data) });
    }
  },

  startSession: () => {
    set({ activeSession: [], isSessionActive: true });
  },

  addExercise: (exerciseKey) => {
    const newExercise: LoggedExercise = {
      exerciseKey,
      sets: [{ reps: 10, weight: 10 }],
      restTimeSec: 75,
    };
    set((state) => ({ activeSession: [...state.activeSession, newExercise] }));
  },

  updateExerciseSet: (exerciseIndex, setIndex, weight, reps) => {
    set((state) => {
      const updated = [...state.activeSession];
      const exercise = { ...updated[exerciseIndex] };
      const sets = [...exercise.sets];
      sets[setIndex] = { reps, weight };
      exercise.sets = sets;
      updated[exerciseIndex] = exercise;
      return { activeSession: updated };
    });
  },

  removeExercise: (index) => {
    set((state) => ({
      activeSession: state.activeSession.filter((_, i) => i !== index),
    }));
  },

  finishSession: () => {
    const { activeSession, profile } = get();
    if (!profile || activeSession.length === 0) return null;

    let totalActiveCal = 0;
    let totalDurationSec = 0;

    for (const logged of activeSession) {
      const exercise = EXERCISE_LIBRARY.find((e) => e.key === logged.exerciseKey);
      if (!exercise) continue;

      const totalSets = logged.sets.length;
      const totalReps = logged.sets.reduce((sum, s) => sum + s.reps, 0);
      const avgWeight = logged.sets.reduce((sum, s) => sum + s.weight, 0) / totalSets;

      const result = caloriesBurned(
        logged.exerciseKey,
        totalSets,
        Math.round(totalReps / totalSets),
        profile.bodyWeightKg,
        avgWeight,
        exercise.met,
      );

      totalActiveCal += result.activeCal;
      totalDurationSec += result.durationSec;
    }

    const totalEpocCal = totalActiveCal * 0.07;
    const totalCal = totalActiveCal + totalEpocCal;

    const session: WorkoutSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      exercises: activeSession,
      totalCalories: Math.round(totalCal * 100) / 100,
      activeCalories: Math.round(totalActiveCal * 100) / 100,
      epocCalories: Math.round(totalEpocCal * 100) / 100,
      durationSec: totalDurationSec,
    };

    set((state) => {
      const newSessions = [session, ...state.sessions];
      AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(newSessions));
      return { sessions: newSessions, activeSession: [], isSessionActive: false };
    });

    return session;
  },

  cancelSession: () => {
    set({ activeSession: [], isSessionActive: false });
  },

  loadSessions: async () => {
    const data = await AsyncStorage.getItem(SESSIONS_KEY);
    if (data) {
      set({ sessions: JSON.parse(data) });
    }
  },

  deleteSession: async (id) => {
    set((state) => {
      const newSessions = state.sessions.filter((s) => s.id !== id);
      AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(newSessions));
      return { sessions: newSessions };
    });
  },

  getLiveCalories: () => {
    const { activeSession, profile } = get();
    if (!profile || activeSession.length === 0) {
      return { activeCal: 0, epocCal: 0, totalCal: 0, durationSec: 0 };
    }

    let totalActiveCal = 0;
    let totalDurationSec = 0;

    for (const logged of activeSession) {
      const exercise = EXERCISE_LIBRARY.find((e) => e.key === logged.exerciseKey);
      if (!exercise) continue;

      for (const set of logged.sets) {
        const result = caloriesBurned(
          logged.exerciseKey,
          1,
          set.reps,
          profile.bodyWeightKg,
          set.weight,
          exercise.met,
        );
        totalActiveCal += result.activeCal;
        totalDurationSec += result.durationSec;
      }
      if (logged.sets.length > 1) {
        totalDurationSec += (logged.sets.length - 1) * logged.restTimeSec;
      }
    }

    const epocCal = totalActiveCal * 0.07;
    return {
      activeCal: Math.round(totalActiveCal * 100) / 100,
      epocCal: Math.round(epocCal * 100) / 100,
      totalCal: Math.round((totalActiveCal + epocCal) * 100) / 100,
      durationSec: totalDurationSec,
    };
  },
}));

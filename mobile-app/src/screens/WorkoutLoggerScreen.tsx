import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity, Animated } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appStore';
import { caloriesBurned } from '../engine/calorieEngine';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Button, Badge } from '../components/ui';
import EXERCISE_GIFS from '../data/exerciseGifs';

const SET_TYPE_COLORS: Record<string, string> = {
  warmup: colors.textMuted,
  working: colors.primary,
  drop: colors.warning,
  failure: colors.danger,
};

const SET_TYPE_LABELS: Record<string, string> = {
  warmup: 'W',
  working: '',
  drop: 'D',
  failure: 'F',
};

const REST_PRESETS = [60, 90, 120];

function SetRow({
  exerciseIndex,
  setIndex,
  initialWeight,
  initialReps,
  initialCompleted,
  initialType,
  profile,
  exerciseKey,
  met,
  lastSession,
  onSetComplete,
  onDelete,
  canDelete,
}: {
  exerciseIndex: number;
  setIndex: number;
  initialWeight: number;
  initialReps: number;
  initialCompleted: boolean;
  initialType: 'warmup' | 'working' | 'drop' | 'failure';
  profile: { bodyWeightKg: number };
  exerciseKey: string;
  met: number;
  lastSession: { weight: number; reps: number } | null;
  onSetComplete: () => void;
  onDelete: () => void;
  canDelete: boolean;
}) {
  const updateExerciseSet = useAppStore((s) => s.updateExerciseSet);
  const [weight, setWeight] = useState(initialWeight.toString());
  const [reps, setReps] = useState(initialReps.toString());
  const [completed, setCompleted] = useState(initialCompleted);
  const [setType, setSetType] = useState<'warmup' | 'working' | 'drop' | 'failure'>(initialType);

  const w = parseFloat(weight) || 0;
  const r = parseInt(reps, 10) || 0;
  const result = caloriesBurned(exerciseKey, 1, r, profile.bodyWeightKg, w, met);

  const isPR = lastSession && w >= lastSession.weight && r >= lastSession.reps && (w > lastSession.weight || r > lastSession.reps);

  const handleComplete = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    if (w > 0 && r > 0) {
      updateExerciseSet(exerciseIndex, setIndex, w, r);
    }
    if (newCompleted) {
      onSetComplete();
    }
  };

  const cycleSetType = () => {
    const types: Array<'warmup' | 'working' | 'drop' | 'failure'> = ['working', 'warmup', 'drop', 'failure'];
    const currentIndex = types.indexOf(setType);
    const nextType = types[(currentIndex + 1) % types.length];
    setSetType(nextType);
  };

  const isMatchLast = lastSession && w === lastSession.weight && r === lastSession.reps;

  return (
    <View style={[styles.setRow, completed && styles.setRowCompleted]}>
      <TouchableOpacity style={styles.setTypeBtn} onPress={cycleSetType} activeOpacity={0.7}>
        {SET_TYPE_LABELS[setType] ? (
          <Text style={[styles.setTypeText, { color: SET_TYPE_COLORS[setType] }]}>{SET_TYPE_LABELS[setType]}</Text>
        ) : (
          <View style={[styles.setTypeDot, { backgroundColor: SET_TYPE_COLORS[setType] }]} />
        )}
      </TouchableOpacity>

      <Text style={styles.setNumber}>{setIndex + 1}</Text>

      <View style={styles.inputCell}>
        <TextInput
          style={[styles.weightInput, isMatchLast && styles.inputMatch]}
          value={weight}
          onChangeText={(val) => {
            setWeight(val);
            const parsed = parseFloat(val) || 0;
            updateExerciseSet(exerciseIndex, setIndex, parsed, r);
          }}
          keyboardType="decimal-pad"
          placeholder={lastSession ? `${lastSession.weight}` : '—'}
          placeholderTextColor={colors.textDisabled}
        />
      </View>

      <Text style={styles.inputSeparator}>×</Text>

      <View style={styles.inputCell}>
        <TextInput
          style={[styles.repsInput, isMatchLast && styles.inputMatch]}
          value={reps}
          onChangeText={(val) => {
            setReps(val);
            const parsed = parseInt(val, 10) || 0;
            updateExerciseSet(exerciseIndex, setIndex, w, parsed);
          }}
          keyboardType="number-pad"
          placeholder={lastSession ? `${lastSession.reps}` : '—'}
          placeholderTextColor={colors.textDisabled}
        />
      </View>

      <Text style={styles.setCalories}>{result.totalCal.toFixed(1)}</Text>

      <TouchableOpacity
        style={[styles.completeBtn, completed && styles.completeBtnActive]}
        onPress={handleComplete}
        activeOpacity={0.7}
      >
        <Ionicons
          name={completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={22}
          color={completed ? colors.primary : colors.border}
        />
      </TouchableOpacity>

      {canDelete && (
        <TouchableOpacity style={styles.deleteSetBtn} onPress={onDelete} activeOpacity={0.7}>
          <MaterialCommunityIcons name="minus-circle-outline" size={18} color={colors.danger} />
        </TouchableOpacity>
      )}

      {isPR && (
        <View style={styles.prBadge}>
          <Text style={styles.prBadgeText}>PR</Text>
        </View>
      )}
    </View>
  );
}

export default function WorkoutLoggerScreen({ navigation }: { navigation: any }) {
  const { activeSession, profile, removeExercise, removeExerciseSet, getLiveCalories, findExercise, cancelSession, getLastSessionExercise } = useAppStore();
  const live = getLiveCalories();
  const [headerExpanded, setHeaderExpanded] = useState(false);

  // Animated calorie counter
  const animatedCal = useRef(new Animated.Value(0)).current;
  const [displayCal, setDisplayCal] = useState('0.0');

  useEffect(() => {
    const id = animatedCal.addListener(({ value }) => setDisplayCal(value.toFixed(1)));
    Animated.timing(animatedCal, { toValue: live.totalCal, duration: 500, useNativeDriver: false }).start();
    return () => animatedCal.removeListener(id);
  }, [live.totalCal]);

  // Countdown rest timer
  const [restTarget, setRestTarget] = useState(90);
  const [restRemaining, setRestRemaining] = useState(90);
  const [restActive, setRestActive] = useState(false);

  useEffect(() => {
    if (!restActive) return;
    if (restRemaining <= 0) {
      setRestActive(false);
      return;
    }
    const t = setTimeout(() => setRestRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [restActive, restRemaining]);

  const startRest = (duration: number) => {
    setRestTarget(duration);
    setRestRemaining(duration);
    setRestActive(true);
  };

  const handleSetComplete = () => {
    startRest(restTarget);
  };

  const formatRest = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.calorieHeader}
        onPress={() => setHeaderExpanded(!headerExpanded)}
        activeOpacity={0.8}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.calorieLabel}>Calories Burned</Text>
            <Text style={styles.calorieValue}>{displayCal}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>{Math.floor(live.durationSec / 60)}m {live.durationSec % 60}s</Text>
            </View>
            <Text style={styles.expandIcon}>{headerExpanded ? '↑' : '↓'}</Text>
          </View>
        </View>

        {headerExpanded && (
          <View style={styles.headerExpanded}>
            <View style={styles.expandedRow}>
              <Badge variant="primary">⚡ Active: {live.activeCal.toFixed(1)}</Badge>
              <Badge variant="warning">🌡️ EPOC: {live.epocCal.toFixed(1)}</Badge>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {restActive && (
        <View style={styles.restTimer}>
          <View style={styles.restTimerTop}>
            <Text style={styles.restLabel}>REST</Text>
            <Text style={styles.restValue}>{formatRest(restRemaining)}</Text>
            <TouchableOpacity onPress={() => setRestActive(false)}>
              <Text style={styles.restSkip}>Skip</Text>
            </TouchableOpacity>
          </View>
          {/* mini progress bar */}
          <View style={styles.restProgressBg}>
            <View style={[styles.restProgressFill, { width: `${(restRemaining / restTarget) * 100}%` as any }]} />
          </View>
          <View style={styles.restPresets}>
            {REST_PRESETS.map((p) => (
              <TouchableOpacity key={p} style={styles.restPresetBtn} onPress={() => startRest(p)}>
                <Text style={styles.restPresetText}>{p}s</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <ScrollView style={styles.exerciseList} contentContainerStyle={styles.exerciseListContent}>
        {activeSession.map((logged, exerciseIndex) => {
          const exercise = findExercise(logged.exerciseKey);
          if (!exercise || !profile) return null;
          const lastSession = getLastSessionExercise(logged.exerciseKey);

          return (
            <Card key={exerciseIndex} variant="elevated" style={styles.exerciseCard}>
              <View style={styles.exerciseCardHeader}>
                <View style={styles.exerciseHeaderLeft}>
                  <Image
                    source={EXERCISE_GIFS[logged.exerciseKey]}
                    style={{ width: 48, height: 48, borderRadius: 8 }}
                    contentFit="cover"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.exerciseCardName}>{exercise.name}</Text>
                    <Text style={styles.exerciseCardMuscle}>{exercise.muscle} • {exercise.equipment}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeExercise(exerciseIndex)} style={styles.removeBtn} activeOpacity={0.7}>
                  <MaterialCommunityIcons name="close-circle-outline" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              {lastSession && (
                <View style={styles.lastSession}>
                  <Text style={styles.lastSessionLabel}>Last time</Text>
                  <Text style={styles.lastSessionValue}>{lastSession.weight}kg × {lastSession.reps} reps</Text>
                  <Text style={styles.lastSessionDate}>{new Date(lastSession.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Text>
                </View>
              )}

              <View style={styles.setColumnHeaders}>
                <Text style={styles.setColumnHeaderType}></Text>
                <Text style={styles.setColumnHeaderNum}>#</Text>
                <Text style={styles.setColumnHeader}>kg</Text>
                <Text style={styles.setColumnHeaderSep}></Text>
                <Text style={styles.setColumnHeader}>reps</Text>
                <Text style={styles.setColumnHeaderCal}>kcal</Text>
                <Text style={styles.setColumnHeaderCheck}></Text>
              </View>

              {logged.sets.map((set, setIndex) => (
                <SetRow
                  key={`${exerciseIndex}-${setIndex}`}
                  exerciseIndex={exerciseIndex}
                  setIndex={setIndex}
                  initialWeight={set.weight}
                  initialReps={set.reps}
                  initialCompleted={set.completed}
                  initialType={set.setType}
                  profile={profile}
                  exerciseKey={logged.exerciseKey}
                  met={exercise.met}
                  lastSession={lastSession}
                  onSetComplete={handleSetComplete}
                  onDelete={() => removeExerciseSet(exerciseIndex, setIndex)}
                  canDelete={logged.sets.length > 1}
                />
              ))}

              <Button variant="secondary" size="sm" fullWidth style={styles.addSetBtn} onPress={() => {
                const lastSet = logged.sets[logged.sets.length - 1];
                useAppStore.getState().updateExerciseSet(exerciseIndex, logged.sets.length, lastSet.weight, lastSet.reps);
              }}>
                + Add Set
              </Button>
            </Card>
          );
        })}

        <TouchableOpacity
          style={styles.addExerciseBtn}
          onPress={() => navigation.navigate('ExerciseSelect')}
          activeOpacity={0.7}
        >
          <Text style={styles.addExerciseBtnText}>+ Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          variant="primary"
          size="sm"
          disabled={activeSession.length === 0}
          onPress={() => {
            const session = useAppStore.getState().finishSession();
            if (session) navigation.navigate('Summary', { session });
          }}
          style={{ flex: 1 }}
        >
          Finish
        </Button>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => {
            Alert.alert('Cancel Workout', 'Are you sure? All progress will be lost.', [
              { text: 'No, Keep Going', style: 'cancel' },
              { text: 'Yes, Discard', style: 'destructive', onPress: () => { cancelSession(); navigation.navigate('MainTabs'); } },
            ]);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  calorieHeader: { backgroundColor: colors.surface, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  calorieLabel: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs, textTransform: 'uppercase' as const, letterSpacing: 1 },
  calorieValue: { fontSize: 32, fontWeight: '800', color: colors.primary, letterSpacing: -1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  durationBadge: { backgroundColor: colors.surfaceElevated, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radii.full, borderWidth: 1, borderColor: colors.border },
  durationText: { ...typography.caption, color: colors.textSecondary },
  expandIcon: { fontSize: 16, color: colors.textMuted, padding: spacing.xs },
  headerExpanded: { marginTop: spacing.md },
  expandedRow: { flexDirection: 'row', gap: spacing.sm },
  restTimer: { backgroundColor: colors.primaryMutedStrong, marginHorizontal: spacing.lg, marginTop: spacing.sm, borderRadius: radii.md, padding: spacing.md, borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)' },
  restTimerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
  restLabel: { ...typography.caption, color: colors.primary, textTransform: 'uppercase' as const, letterSpacing: 1, fontWeight: '700' },
  restValue: { fontSize: 28, fontWeight: '800', color: colors.primary, letterSpacing: -1 },
  restSkip: { ...typography.caption, color: colors.textMuted, textDecorationLine: 'underline' },
  restProgressBg: { height: 4, backgroundColor: colors.border, borderRadius: radii.full, marginBottom: spacing.sm, overflow: 'hidden' },
  restProgressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: radii.full },
  restPresets: { flexDirection: 'row', gap: spacing.sm },
  restPresetBtn: { flex: 1, backgroundColor: colors.surface, borderRadius: radii.sm, paddingVertical: spacing.xs, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  restPresetText: { ...typography.caption, color: colors.textSecondary, fontWeight: '600' },
  exerciseList: { flex: 1 },
  exerciseListContent: { padding: spacing.lg, paddingBottom: spacing['4xl'] },
  exerciseCard: { marginBottom: spacing.md },
  exerciseCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  exerciseHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  exerciseCardName: { ...typography.h4, color: colors.text },
  exerciseCardMuscle: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  removeBtn: { width: 32, height: 32, borderRadius: radii.full, backgroundColor: colors.dangerMuted, alignItems: 'center', justifyContent: 'center' },
  removeBtnText: { color: colors.danger, fontSize: 14, fontWeight: '600' },
  lastSession: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.background, borderRadius: radii.sm, padding: spacing.sm, marginBottom: spacing.sm },
  lastSessionLabel: { ...typography.caption, color: colors.textMuted },
  lastSessionValue: { ...typography.caption, color: colors.textSecondary, fontWeight: '600' },
  lastSessionDate: { ...typography.caption, color: colors.textDisabled, marginLeft: 'auto' },
  setColumnHeaders: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, marginBottom: spacing.xs },
  setColumnHeader: { ...typography.caption, color: colors.textMuted, flex: 1, textAlign: 'center' },
  setColumnHeaderType: { width: 28 },
  setColumnHeaderNum: { width: 24, ...typography.caption, color: colors.textMuted, textAlign: 'center' },
  setColumnHeaderSep: { width: 16 },
  setColumnHeaderCal: { width: 44, ...typography.caption, color: colors.textMuted, textAlign: 'center' },
  setColumnHeaderCheck: { width: 32 },
  setRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: radii.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, marginBottom: spacing.xs, borderWidth: 1, borderColor: colors.border },
  setRowCompleted: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  setTypeBtn: { width: 28, alignItems: 'center', justifyContent: 'center' },
  setTypeText: { ...typography.caption, fontWeight: '700' },
  setTypeDot: { width: 8, height: 8, borderRadius: radii.full },
  setNumber: { width: 24, ...typography.label, color: colors.textSecondary, textAlign: 'center', fontWeight: '600' },
  inputCell: { flex: 1 },
  weightInput: { backgroundColor: colors.surface, borderRadius: radii.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.sm, fontSize: 16, color: colors.text, textAlign: 'center', borderWidth: 1, borderColor: colors.border },
  repsInput: { backgroundColor: colors.surface, borderRadius: radii.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.sm, fontSize: 16, color: colors.text, textAlign: 'center', borderWidth: 1, borderColor: colors.border },
  inputMatch: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  inputSeparator: { width: 16, ...typography.caption, color: colors.textMuted, textAlign: 'center' },
  setCalories: { width: 44, ...typography.caption, color: colors.textMuted, textAlign: 'center' },
  completeBtn: { width: 32, height: 32, borderRadius: radii.full, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  completeBtnActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  completeBtnText: { fontSize: 16, color: colors.textMuted, fontWeight: '600' },
  completeBtnTextActive: { color: colors.white },
  deleteSetBtn: { width: 24, height: 24, borderRadius: radii.full, backgroundColor: colors.dangerMuted, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.xs },
  deleteSetText: { color: colors.danger, fontSize: 14, fontWeight: '700', lineHeight: 16 },
  prBadge: { position: 'absolute', right: -8, top: -8, backgroundColor: colors.warning, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radii.full },
  prBadgeText: { ...typography.caption, color: colors.white, fontWeight: '700', fontSize: 10 },
  addSetBtn: { marginTop: spacing.sm },
  addExerciseBtn: { paddingVertical: spacing.lg, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' as const, borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
  addExerciseBtnText: { color: colors.primary, ...typography.button },
  footer: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, gap: spacing.md },
  cancelBtn: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.danger, borderRadius: radii.sm },
  cancelBtnText: { color: colors.danger, ...typography.buttonSm },
});

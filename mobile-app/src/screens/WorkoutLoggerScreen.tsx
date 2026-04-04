import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useAppStore } from '../store/appStore';
import { caloriesBurned } from '../engine/calorieEngine';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Button, Badge } from '../components/ui';

function SetInput({ exerciseIndex, setIndex, initialWeight, initialReps, profile, exerciseKey, met }: {
  exerciseIndex: number;
  setIndex: number;
  initialWeight: number;
  initialReps: number;
  profile: { bodyWeightKg: number };
  exerciseKey: string;
  met: number;
}) {
  const updateExerciseSet = useAppStore((s) => s.updateExerciseSet);
  const [weight, setWeight] = useState(initialWeight.toString());
  const [reps, setReps] = useState(initialReps.toString());

  const w = parseFloat(weight) || 0;
  const r = parseInt(reps, 10) || 0;
  const result = caloriesBurned(exerciseKey, 1, r, profile.bodyWeightKg, w, met);

  return (
    <View style={styles.setRow}>
      <View style={styles.setRowHeader}>
        <Text style={styles.setLabel}>Set {setIndex + 1}</Text>
        <Badge variant="primary">{result.totalCal.toFixed(1)} kcal</Badge>
      </View>

      <View style={styles.inputsRow}>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, w <= 0 && styles.inputLabelWarn]}>Weight (kg)</Text>
          <TextInput
            style={[styles.input, w <= 0 && styles.inputWarn]}
            value={weight}
            onChangeText={(val) => {
              setWeight(val);
              const parsed = parseFloat(val);
              if (!isNaN(parsed) && parsed > 0) {
                updateExerciseSet(exerciseIndex, setIndex, parsed, r);
              }
            }}
            keyboardType="decimal-pad"
            placeholder="e.g. 10"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, r <= 0 && styles.inputLabelWarn]}>Reps</Text>
          <TextInput
            style={[styles.input, r <= 0 && styles.inputWarn]}
            value={reps}
            onChangeText={(val) => {
              setReps(val);
              const parsed = parseInt(val, 10);
              if (!isNaN(parsed) && parsed > 0) {
                updateExerciseSet(exerciseIndex, setIndex, w, parsed);
              }
            }}
            keyboardType="number-pad"
            placeholder="e.g. 10"
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </View>
    </View>
  );
}

export default function WorkoutLoggerScreen({ navigation }: { navigation: any }) {
  const { activeSession, profile, removeExercise, getLiveCalories, findExercise, cancelSession } = useAppStore();
  const live = getLiveCalories();

  return (
    <View style={styles.container}>
      <Card variant="primary" style={styles.calorieHeader}>
        <Text style={styles.calorieLabel}>Total Calories</Text>
        <Text style={styles.calorieValue}>{live.totalCal.toFixed(1)}</Text>
        <View style={styles.calorieRow}>
          <Badge variant="primary">Active: {live.activeCal.toFixed(1)}</Badge>
          <Badge variant="warning">EPOC: {live.epocCal.toFixed(1)}</Badge>
        </View>
        <Text style={styles.durationText}>
          Est. Duration: {Math.floor(live.durationSec / 60)}m {live.durationSec % 60}s
        </Text>
      </Card>

      <ScrollView style={styles.exerciseList} contentContainerStyle={styles.exerciseListContent}>
        {activeSession.map((logged, exerciseIndex) => {
          const exercise = findExercise(logged.exerciseKey);
          if (!exercise || !profile) return null;

          return (
            <Card key={exerciseIndex} variant="elevated" style={styles.exerciseCard}>
              <View style={styles.exerciseCardHeader}>
                <View>
                  <Text style={styles.exerciseCardName}>{exercise.name}</Text>
                  <Text style={styles.exerciseCardMuscle}>{exercise.muscle}</Text>
                </View>
                <Button variant="ghost" size="sm" onPress={() => removeExercise(exerciseIndex)} textStyle={{ color: colors.danger }}>
                  ✕
                </Button>
              </View>

              {logged.sets.map((set, setIndex) => (
                <SetInput
                  key={`${exerciseIndex}-${setIndex}`}
                  exerciseIndex={exerciseIndex}
                  setIndex={setIndex}
                  initialWeight={set.weight}
                  initialReps={set.reps}
                  profile={profile}
                  exerciseKey={logged.exerciseKey}
                  met={exercise.met}
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

        <Button variant="ghost" fullWidth style={styles.addExerciseBtn} onPress={() => navigation.navigate('ExerciseSelect')}>
          + Add Exercise
        </Button>
      </ScrollView>

      <View style={styles.footer}>
        <Button variant="primary" size="lg" fullWidth disabled={activeSession.length === 0} onPress={() => {
          const session = useAppStore.getState().finishSession();
          if (session) navigation.navigate('Summary', { session });
        }}>
          Finish Workout
        </Button>
        <Button variant="ghost" size="md" fullWidth onPress={() => {
          Alert.alert('Cancel Workout', 'Are you sure? All progress will be lost.', [
            { text: 'Continue', style: 'cancel' },
            { text: 'Discard', style: 'destructive', onPress: () => { cancelSession(); navigation.navigate('Home'); } },
          ]);
        }} textStyle={{ color: colors.danger }}>
          Cancel Workout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  calorieHeader: { margin: spacing['2xl'], marginBottom: 0, alignItems: 'center', padding: spacing['2xl'] },
  calorieLabel: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs },
  calorieValue: { fontSize: 52, fontWeight: '800', color: colors.primary, letterSpacing: -1 },
  calorieRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  durationText: { ...typography.caption, color: colors.textMuted, marginTop: spacing.md },
  exerciseList: { flex: 1 },
  exerciseListContent: { padding: spacing['2xl'], paddingBottom: spacing['4xl'] },
  exerciseCard: { marginBottom: spacing.lg },
  exerciseCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
  exerciseCardName: { ...typography.h3, color: colors.text },
  exerciseCardMuscle: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  setRow: { backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  setRowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  setLabel: { ...typography.label, color: colors.textSecondary },
  inputsRow: { flexDirection: 'row', gap: spacing.md },
  inputGroup: { flex: 1 },
  inputLabel: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.xs },
  input: { backgroundColor: colors.background, borderRadius: radii.sm, padding: spacing.md, fontSize: 16, color: colors.text, borderWidth: 1, borderColor: colors.border },
  inputWarn: { borderColor: colors.danger },
  inputLabelWarn: { color: colors.danger },
  addSetBtn: { marginTop: spacing.sm },
  addExerciseBtn: { paddingVertical: spacing.lg, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' },
  footer: { padding: spacing['2xl'], borderTopWidth: 1, borderTopColor: colors.border, gap: spacing.sm },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Share, TouchableOpacity, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { WorkoutSession } from '../types';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Button, Badge, StatCard } from '../components/ui';

export default function SummaryScreen({ route, navigation }: { route: any; navigation: any }) {
  const session: WorkoutSession = route.params.session;
  const findExercise = useAppStore((state) => state.findExercise);
  const restoreSession = useAppStore((state) => state.restoreSession);

  const muscleGroups = new Set<string>();
  for (const logged of session.exercises) {
    const ex = findExercise(logged.exerciseKey);
    if (ex) muscleGroups.add(ex.muscle);
  }

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const exerciseLines = session.exercises.map((logged) => {
      const ex = findExercise(logged.exerciseKey);
      const totalReps = logged.sets.reduce((sum, s) => sum + s.reps, 0);
      const totalSets = logged.sets.length;
      return `  • ${ex?.name || logged.exerciseKey}: ${totalSets} sets x ${Math.round(totalReps / totalSets)} avg reps`;
    }).join('\n');

    const text = `🏋️ Workout Summary\n📅 ${new Date(session.date).toLocaleDateString()}\n\n🔥 Total Calories: ${session.totalCalories.toFixed(1)} kcal\n  Active: ${session.activeCalories.toFixed(1)} | EPOC: ${session.epocCalories.toFixed(1)}\n⏱️ Duration: ${Math.floor(session.durationSec / 60)}m ${session.durationSec % 60}s\n\nExercises:\n${exerciseLines}\n\nMuscle Groups: ${Array.from(muscleGroups).join(', ')}\n\n— Gym Calorie Tracker`;

    try { await Share.share({ message: text }); } catch { /* cancelled */ }
  };

  const handleEditExercise = () => {
    restoreSession(session);
    navigation.reset({
      index: 1,
      routes: [
        { name: 'MainTabs' },
        { name: 'WorkoutLogger' },
      ],
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <LinearGradient
        colors={[colors.primaryMutedStrong, colors.transparent]}
        style={styles.heroGradient}
      />

      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🎉</Text>
        <Text style={styles.title}>Workout Complete</Text>
        <Text style={styles.date}>
          {new Date(session.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard label="Total" value={`${session.totalCalories.toFixed(0)}`} icon="🔥" />
        <StatCard label="Active" value={`${session.activeCalories.toFixed(0)}`} icon="⚡" />
        <StatCard label="EPOC" value={`${session.epocCalories.toFixed(0)}`} icon="🌡️" />
      </View>

      <Card variant="glass" style={styles.durationCard}>
        <Text style={styles.durationLabel}>Session Duration</Text>
        <Text style={styles.durationValue}>{Math.floor(session.durationSec / 60)}m {session.durationSec % 60}s</Text>
      </Card>

      <Text style={styles.sectionTitle}>Exercises</Text>
      {session.exercises.map((logged, index) => {
        const exercise = findExercise(logged.exerciseKey);
        if (!exercise) return null;
        const totalReps = logged.sets.reduce((sum, s) => sum + s.reps, 0);
        const totalSets = logged.sets.length;

        return (
          <Card key={index} variant="elevated" style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <View style={styles.exerciseHeaderLeft}>
                <View style={styles.exerciseNumber}>
                  <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
              </View>
              <Badge variant="primary">{exercise.met} MET</Badge>
            </View>
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseDetail}>{totalSets} sets</Text>
              <Text style={styles.exerciseDetailDot}>•</Text>
              <Text style={styles.exerciseDetail}>{Math.round(totalReps / totalSets)} avg reps</Text>
              <Text style={styles.exerciseDetailDot}>•</Text>
              <Text style={styles.exerciseDetail}>{exercise.muscle}</Text>
            </View>
            <TouchableOpacity style={styles.editExerciseBtn} onPress={handleEditExercise} activeOpacity={0.7}>
              <Text style={styles.editExerciseBtnText}>Edit</Text>
            </TouchableOpacity>
          </Card>
        );
      })}

      <Text style={styles.sectionTitle}>Muscle Groups</Text>
      <View style={styles.muscleTags}>
        {Array.from(muscleGroups).map((muscle) => (
          <Badge key={muscle} variant="primary" style={styles.muscleTag}>{muscle}</Badge>
        ))}
      </View>

      <View style={styles.actions}>
        <Button variant="primary" size="lg" fullWidth onPress={() => navigation.navigate('MainTabs')}>
          Back to Home
        </Button>
        <Button variant="secondary" size="lg" fullWidth onPress={handleShare}>
          Share Workout
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing['4xl'] },
  heroGradient: { position: 'absolute', top: 0, left: 0, right: 0, height: 180 },
  hero: { alignItems: 'center', paddingTop: spacing['3xl'], paddingHorizontal: spacing['2xl'], paddingBottom: spacing['2xl'] },
  heroEmoji: { fontSize: 48, marginBottom: spacing.lg },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.xs },
  date: { ...typography.body, color: colors.textMuted },
  statsGrid: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg, paddingHorizontal: spacing['2xl'] },
  durationCard: { alignItems: 'center', marginHorizontal: spacing['2xl'], marginBottom: spacing['2xl'], padding: spacing.xl },
  durationLabel: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.xs, textTransform: 'uppercase' as const, letterSpacing: 1 },
  durationValue: { ...typography.h2, color: colors.text },
  exercisesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg, paddingHorizontal: spacing['2xl'] },
  sectionTitle: { ...typography.h3, color: colors.text },
  editAllBtn: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  editAllBtnText: { color: colors.primary, ...typography.label },
  exerciseCard: { marginHorizontal: spacing['2xl'], marginBottom: spacing.md },
  exerciseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  exerciseHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  exerciseNumber: { width: 28, height: 28, borderRadius: radii.full, backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center' },
  exerciseNumberText: { ...typography.caption, color: colors.primary, fontWeight: '700' },
  exerciseName: { ...typography.h4, color: colors.text },
  exerciseDetails: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  exerciseDetail: { ...typography.caption, color: colors.textSecondary },
  exerciseDetailDot: { ...typography.caption, color: colors.textMuted },
  editExerciseBtn: { marginTop: spacing.md, paddingVertical: spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radii.sm },
  editExerciseBtnText: { color: colors.primary, ...typography.buttonSm },
  muscleTags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing['2xl'], paddingHorizontal: spacing['2xl'] },
  muscleTag: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  actions: { gap: spacing.md, paddingHorizontal: spacing['2xl'] },
});

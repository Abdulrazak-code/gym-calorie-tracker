import React from 'react';
import { View, Text, StyleSheet, ScrollView, Share } from 'react-native';
import { WorkoutSession } from '../types';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Button, Badge, StatCard } from '../components/ui';

export default function SummaryScreen({ route, navigation }: { route: any; navigation: any }) {
  const session: WorkoutSession = route.params.session;
  const findExercise = useAppStore((state) => state.findExercise);

  const muscleGroups = new Set<string>();
  for (const logged of session.exercises) {
    const ex = findExercise(logged.exerciseKey);
    if (ex) muscleGroups.add(ex.muscle);
  }

  const handleShare = async () => {
    const exerciseLines = session.exercises.map((logged) => {
      const ex = findExercise(logged.exerciseKey);
      const totalReps = logged.sets.reduce((sum, s) => sum + s.reps, 0);
      const totalSets = logged.sets.length;
      return `  • ${ex?.name || logged.exerciseKey}: ${totalSets} sets x ${Math.round(totalReps / totalSets)} avg reps`;
    }).join('\n');

    const text = `🏋️ Workout Summary\n📅 ${new Date(session.date).toLocaleDateString()}\n\n🔥 Total Calories: ${session.totalCalories.toFixed(1)} kcal\n  Active: ${session.activeCalories.toFixed(1)} | EPOC: ${session.epocCalories.toFixed(1)}\n⏱️ Duration: ${Math.floor(session.durationSec / 60)}m ${session.durationSec % 60}s\n\nExercises:\n${exerciseLines}\n\nMuscle Groups: ${Array.from(muscleGroups).join(', ')}\n\n— Gym Calorie Tracker`;

    try { await Share.share({ message: text }); } catch { /* cancelled */ }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Workout Complete 🎉</Text>
      <Text style={styles.date}>
        {new Date(session.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </Text>

      <View style={styles.statsGrid}>
        <StatCard label="Total" value={`${session.totalCalories.toFixed(0)}`} icon="🔥" />
        <StatCard label="Active" value={`${session.activeCalories.toFixed(0)}`} icon="⚡" />
        <StatCard label="EPOC" value={`${session.epocCalories.toFixed(0)}`} icon="🌡️" />
      </View>

      <Card variant="elevated" style={styles.durationCard}>
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
          <Card key={index} variant="glass" style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Badge variant="primary">{exercise.met} MET</Badge>
            </View>
            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseDetail}>{totalSets} sets</Text>
              <Text style={styles.exerciseDetailDot}>•</Text>
              <Text style={styles.exerciseDetail}>{Math.round(totalReps / totalSets)} avg reps</Text>
              <Text style={styles.exerciseDetailDot}>•</Text>
              <Text style={styles.exerciseDetail}>{exercise.muscle}</Text>
            </View>
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
        <Button variant="primary" size="lg" fullWidth onPress={() => navigation.navigate('Home')}>
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
  content: { padding: spacing['2xl'], paddingBottom: spacing['4xl'] },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.xs },
  date: { ...typography.body, color: colors.textMuted, marginBottom: spacing['2xl'] },
  statsGrid: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg },
  durationCard: { alignItems: 'center', marginBottom: spacing['2xl'], padding: spacing.xl },
  durationLabel: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.xs },
  durationValue: { ...typography.h2, color: colors.text },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.lg },
  exerciseCard: { marginBottom: spacing.md },
  exerciseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  exerciseName: { ...typography.h4, color: colors.text },
  exerciseDetails: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  exerciseDetail: { ...typography.caption, color: colors.textSecondary },
  exerciseDetailDot: { ...typography.caption, color: colors.textMuted },
  muscleTags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing['2xl'] },
  muscleTag: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  actions: { gap: spacing.md },
});

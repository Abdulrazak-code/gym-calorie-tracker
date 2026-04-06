import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { WorkoutSession } from '../types';
import { EXERCISE_LIBRARY } from '../engine/exercises';

export default function SummaryScreen({ route, navigation }: { route: any; navigation: any }) {
  const session: WorkoutSession = route.params.session;

  const muscleGroups = new Set<string>();
  for (const logged of session.exercises) {
    const ex = EXERCISE_LIBRARY.find((e) => e.key === logged.exerciseKey);
    if (ex) muscleGroups.add(ex.muscle);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout Summary</Text>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Calories</Text>
          <Text style={styles.statValue}>{session.totalCalories.toFixed(1)}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Active</Text>
          <Text style={styles.statValue}>{session.activeCalories.toFixed(1)}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>EPOC Afterburn</Text>
          <Text style={styles.statValue}>{session.epocCalories.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.durationCard}>
        <Text style={styles.durationLabel}>Session Duration</Text>
        <Text style={styles.durationValue}>
          {Math.floor(session.durationSec / 60)}m {session.durationSec % 60}s
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Exercises</Text>
      {session.exercises.map((logged, index) => {
        const exercise = EXERCISE_LIBRARY.find((e) => e.key === logged.exerciseKey);
        if (!exercise) return null;

        const totalReps = logged.sets.reduce((sum, s) => sum + s.reps, 0);
        const totalSets = logged.sets.length;

        return (
          <View key={index} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetail}>
              {totalSets} sets x {Math.round(totalReps / totalSets)} avg reps
            </Text>
            <Text style={styles.exerciseDetail}>
              Muscle: {exercise.muscle}
            </Text>
          </View>
        );
      })}

      <Text style={styles.sectionTitle}>Muscle Groups Worked</Text>
      <View style={styles.muscleTags}>
        {Array.from(muscleGroups).map((muscle) => (
          <View key={muscle} style={styles.muscleTag}>
            <Text style={styles.muscleTagText}>{muscle}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
        >
          <Text style={styles.actionBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#1a2e1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  statItem: { alignItems: 'center' },
  statLabel: { color: '#888', fontSize: 12, marginBottom: 4 },
  statValue: { color: '#4CAF50', fontSize: 24, fontWeight: 'bold' },
  statDivider: { width: 1, backgroundColor: '#2a4a2a' },
  durationCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  durationLabel: { color: '#888', fontSize: 14, marginBottom: 4 },
  durationValue: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  exerciseCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  exerciseName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  exerciseDetail: { color: '#888', fontSize: 13 },
  muscleTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  muscleTag: {
    backgroundColor: '#1b3a1e',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  muscleTagText: { color: '#4CAF50', fontSize: 14, fontWeight: '600' },
  actions: { marginTop: 16 },
  actionBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  actionBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

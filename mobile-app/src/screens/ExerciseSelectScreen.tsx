import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { WORKOUT_CATEGORIES, getExercisesForWorkout, searchExercises } from '../engine/exercises';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Badge } from '../components/ui';

export default function ExerciseSelectScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const filteredExercises = search.length > 0 ? searchExercises(search) : [];
  const workoutExercises = selectedWorkout ? getExercisesForWorkout(selectedWorkout) : [];
  const selectedCategory = WORKOUT_CATEGORIES.find((c) => c.key === selectedWorkout);

  const handleSelect = (exerciseKey: string) => {
    useAppStore.getState().addExercise(exerciseKey);
    navigation.navigate('WorkoutLogger');
  };

  if (selectedWorkout && selectedCategory) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedWorkout(null)} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {selectedCategory.icon} {selectedCategory.name}
          </Text>
        </View>

        <FlatList
          data={workoutExercises}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Card style={styles.exerciseCard} onPress={() => handleSelect(item.key)} variant="glass">
              <View style={styles.exerciseLeft}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseMeta}>{item.equipment}</Text>
              </View>
              <Badge variant="primary">{item.met} MET</Badge>
            </Card>
          )}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Choose Workout</Text>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text
          style={styles.searchInput}
          onPress={() => {}}
        >
          {search || 'Search exercises...'}
        </Text>
        <TouchableOpacity onPress={() => setSearch('')} style={styles.searchClear}>
          <Text style={styles.searchClearText}>✕</Text>
        </TouchableOpacity>
      </View>

      {search.length > 0 ? (
        filteredExercises.map((ex) => (
          <Card key={ex.key} style={styles.exerciseCard} onPress={() => handleSelect(ex.key)} variant="glass">
            <View>
              <Text style={styles.exerciseName}>{ex.name}</Text>
              <Text style={styles.exerciseMeta}>{ex.muscle} • {ex.equipment}</Text>
            </View>
            <Badge variant="primary">{ex.met} MET</Badge>
          </Card>
        ))
      ) : (
        WORKOUT_CATEGORIES.map((cat) => (
          <Card
            key={cat.key}
            style={styles.workoutCard}
            onPress={() => setSelectedWorkout(cat.key)}
            variant="elevated"
          >
            <View style={styles.workoutLeft}>
              <View style={styles.workoutIconContainer}>
                <Text style={styles.workoutIcon}>{cat.icon}</Text>
              </View>
              <View>
                <Text style={styles.workoutName}>{cat.name}</Text>
                <Text style={styles.workoutCount}>{cat.exerciseKeys.length} exercises</Text>
              </View>
            </View>
            <Text style={styles.chevron}>→</Text>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing['2xl'], paddingBottom: spacing['4xl'] },
  header: { padding: spacing['2xl'], paddingBottom: spacing.lg },
  backBtn: { marginBottom: spacing.md },
  backBtnText: { color: colors.primary, ...typography.label },
  headerTitle: { ...typography.h2, color: colors.text },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing['2xl'] },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: { fontSize: 18, marginRight: spacing.sm },
  searchInput: { flex: 1, ...typography.body, color: colors.text, paddingVertical: spacing.lg },
  searchClear: { padding: spacing.sm },
  searchClearText: { color: colors.textMuted, fontSize: 16 },
  workoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  workoutLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  workoutIconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutIcon: { fontSize: 24 },
  workoutName: { ...typography.h4, color: colors.text },
  workoutCount: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  chevron: { fontSize: 20, color: colors.textMuted },
  exerciseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  exerciseLeft: { flex: 1 },
  exerciseName: { ...typography.h4, color: colors.text, marginBottom: spacing.xs },
  exerciseMeta: { ...typography.caption, color: colors.textMuted },
});

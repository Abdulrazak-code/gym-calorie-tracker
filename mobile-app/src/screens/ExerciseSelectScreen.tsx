import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { WORKOUT_CATEGORIES, getExercisesForWorkout, searchExercises, EXERCISE_LIBRARY } from '../engine/exercises';
import { useAppStore } from '../store/appStore';
import { WorkoutCategory, Exercise } from '../types';

export default function ExerciseSelectScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutCategory | null>(null);

  const filteredExercises = search.length > 0
    ? searchExercises(search)
    : [];

  const workoutExercises = selectedWorkout
    ? getExercisesForWorkout(selectedWorkout.key)
    : [];

  const handleSelect = (exerciseKey: string) => {
    useAppStore.getState().addExercise(exerciseKey);
    navigation.navigate('WorkoutLogger');
  };

  if (selectedWorkout) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedWorkout(null)} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{selectedWorkout.icon} {selectedWorkout.name}</Text>
        </View>

        <FlatList
          data={workoutExercises}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.exerciseItem} onPress={() => handleSelect(item.key)}>
              <View>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseMeta}>{item.equipment}</Text>
              </View>
              <Text style={styles.metBadge}>{item.met} MET</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Workout</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search exercises..."
        placeholderTextColor="#666"
        value={search}
        onChangeText={setSearch}
      />

      {search.length > 0 ? (
        filteredExercises.map((ex) => (
          <TouchableOpacity key={ex.key} style={styles.exerciseItem} onPress={() => handleSelect(ex.key)}>
            <View>
              <Text style={styles.exerciseName}>{ex.name}</Text>
              <Text style={styles.exerciseMeta}>{ex.muscle} • {ex.equipment}</Text>
            </View>
            <Text style={styles.metBadge}>{ex.met} MET</Text>
          </TouchableOpacity>
        ))
      ) : (
        WORKOUT_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={styles.workoutCard}
            onPress={() => setSelectedWorkout(cat)}
          >
            <View style={styles.workoutCardLeft}>
              <Text style={styles.workoutIcon}>{cat.icon}</Text>
              <View>
                <Text style={styles.workoutName}>{cat.name}</Text>
                <Text style={styles.workoutCount}>{cat.exerciseKeys.length} exercises</Text>
              </View>
            </View>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
  header: { marginBottom: 20 },
  backBtn: { marginBottom: 8 },
  backBtnText: { color: '#4CAF50', fontSize: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  searchInput: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 16,
  },
  workoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
  },
  workoutCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  workoutIcon: { fontSize: 28 },
  workoutName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  workoutCount: { fontSize: 13, color: '#888', marginTop: 2 },
  chevron: { fontSize: 20, color: '#666' },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e1e',
  },
  exerciseName: { fontSize: 16, color: '#fff', fontWeight: '600' },
  exerciseMeta: { fontSize: 13, color: '#888', marginTop: 2 },
  metBadge: { fontSize: 13, color: '#4CAF50', backgroundColor: '#1b3a1e', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
});

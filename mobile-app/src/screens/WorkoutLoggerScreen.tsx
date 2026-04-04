import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useAppStore } from '../store/appStore';
import { EXERCISE_LIBRARY } from '../engine/exercises';
import { caloriesBurned } from '../engine/calorieEngine';

export default function WorkoutLoggerScreen({ navigation }: { navigation: any }) {
  const { activeSession, profile, updateExerciseSet, removeExercise, getLiveCalories } = useAppStore();
  const live = getLiveCalories();

  return (
    <View style={styles.container}>
      <View style={styles.calorieHeader}>
        <Text style={styles.calorieLabel}>Total Calories</Text>
        <Text style={styles.calorieValue}>{live.totalCal.toFixed(1)}</Text>
        <View style={styles.calorieRow}>
          <Text style={styles.calorieSub}>Active: {live.activeCal.toFixed(1)}</Text>
          <Text style={styles.calorieSub}>EPOC: {live.epocCal.toFixed(1)}</Text>
        </View>
        <Text style={styles.durationText}>
          Est. Duration: {Math.floor(live.durationSec / 60)}m {live.durationSec % 60}s
        </Text>
      </View>

      <ScrollView style={styles.exerciseList}>
        {activeSession.map((logged, exerciseIndex) => {
          const exercise = EXERCISE_LIBRARY.find((e) => e.key === logged.exerciseKey);
          if (!exercise || !profile) return null;

          return (
            <View key={exerciseIndex} style={styles.exerciseCard}>
              <View style={styles.exerciseCardHeader}>
                <View>
                  <Text style={styles.exerciseCardName}>{exercise.name}</Text>
                  <Text style={styles.exerciseCardMuscle}>{exercise.muscle}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeExercise(exerciseIndex)}
                >
                  <Text style={styles.removeBtnText}>X</Text>
                </TouchableOpacity>
              </View>

              {logged.sets.map((set, setIndex) => {
                const result = caloriesBurned(
                  logged.exerciseKey,
                  1,
                  set.reps,
                  profile.bodyWeightKg,
                  set.weight,
                  exercise.met,
                );

                return (
                  <View key={setIndex} style={styles.setRow}>
                    <Text style={styles.setLabel}>Set {setIndex + 1}</Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Weight (kg)</Text>
                      <TextInput
                        style={styles.input}
                        value={set.weight.toString()}
                        onChangeText={(val) => {
                          const w = parseFloat(val) || 0;
                          updateExerciseSet(exerciseIndex, setIndex, w, set.reps);
                        }}
                        keyboardType="decimal-pad"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Reps</Text>
                      <TextInput
                        style={styles.input}
                        value={set.reps.toString()}
                        onChangeText={(val) => {
                          const r = parseInt(val, 10) || 0;
                          updateExerciseSet(exerciseIndex, setIndex, set.weight, r);
                        }}
                        keyboardType="number-pad"
                      />
                    </View>

                    <Text style={styles.setCalories}>{result.totalCal.toFixed(1)} kcal</Text>
                  </View>
                );
              })}

              <TouchableOpacity
                style={styles.addSetBtn}
                onPress={() => {
                  const lastSet = logged.sets[logged.sets.length - 1];
                  updateExerciseSet(
                    exerciseIndex,
                    logged.sets.length,
                    lastSet.weight,
                    lastSet.reps,
                  );
                }}
              >
                <Text style={styles.addSetBtnText}>+ Add Set</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.addExerciseBtn}
          onPress={() => navigation.navigate('ExerciseSelect')}
        >
          <Text style={styles.addExerciseBtnText}>+ Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.finishBtn}
          onPress={() => {
            const session = useAppStore.getState().finishSession();
            if (session) {
              navigation.navigate('Summary', { session });
            }
          }}
        >
          <Text style={styles.finishBtnText}>Finish Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  calorieHeader: {
    backgroundColor: '#1a2e1a',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
  },
  calorieLabel: { color: '#888', fontSize: 14, marginBottom: 4 },
  calorieValue: { color: '#4CAF50', fontSize: 48, fontWeight: 'bold' },
  calorieRow: { flexDirection: 'row', gap: 24, marginTop: 8 },
  calorieSub: { color: '#aaa', fontSize: 14 },
  durationText: { color: '#888', fontSize: 13, marginTop: 8 },
  exerciseList: { flex: 1, padding: 16 },
  exerciseCard: { backgroundColor: '#1e1e1e', borderRadius: 12, padding: 16, marginBottom: 16 },
  exerciseCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  exerciseCardName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  exerciseCardMuscle: { color: '#888', fontSize: 13, marginTop: 2 },
  removeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#3a1e1e', alignItems: 'center', justifyContent: 'center' },
  removeBtnText: { color: '#ff6b6b', fontSize: 14, fontWeight: 'bold' },
  setRow: { backgroundColor: '#252525', borderRadius: 8, padding: 12, marginBottom: 8 },
  setLabel: { color: '#aaa', fontSize: 13, marginBottom: 8 },
  inputGroup: { marginBottom: 8 },
  inputLabel: { color: '#888', fontSize: 12, marginBottom: 4 },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
  setCalories: { color: '#4CAF50', fontSize: 16, fontWeight: 'bold', textAlign: 'right', marginTop: 4 },
  addSetBtn: { padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 8, marginTop: 8 },
  addSetBtnText: { color: '#aaa', fontSize: 14 },
  addExerciseBtn: { padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#4CAF50', borderRadius: 12, marginBottom: 16 },
  addExerciseBtnText: { color: '#4CAF50', fontSize: 16, fontWeight: 'bold' },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#222' },
  finishBtn: { backgroundColor: '#4CAF50', borderRadius: 12, padding: 18, alignItems: 'center' },
  finishBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

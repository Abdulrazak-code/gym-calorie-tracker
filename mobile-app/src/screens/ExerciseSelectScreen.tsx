import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { getAllExercises, searchAllExercises, groupExercisesByCategory, EXERCISE_LIBRARY, ExerciseCategory } from '../engine/exercises';
import { useAppStore } from '../store/appStore';
import { Exercise } from '../types';

const GROUP_ICONS: Record<string, string> = {
  Chest: '🫁',
  Back: '🔙',
  Shoulders: '🏔️',
  Arms: '💪',
  Legs: '🦵',
  Abs: '🎯',
  Calves: '🦶',
  Cardio: '🫀',
};

export default function ExerciseSelectScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const [allExercises, setAllExercises] = useState<Exercise[]>(EXERCISE_LIBRARY);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  useEffect(() => {
    getAllExercises()
      .then((exercises) => {
        setAllExercises(exercises);
        setCategories(groupExercisesByCategory(exercises));
        setLoading(false);
      })
      .catch(() => {
        setCategories(groupExercisesByCategory(EXERCISE_LIBRARY));
        setLoading(false);
      });
  }, []);

  const filtered = search.length > 0
    ? searchAllExercises(search, allExercises)
    : [];

  const handleSelect = (exerciseKey: string) => {
    useAppStore.getState().addExercise(exerciseKey);
    navigation.navigate('WorkoutLogger');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading exercises...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Exercise</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search exercises..."
        placeholderTextColor="#666"
        value={search}
        onChangeText={setSearch}
      />

      {search.length > 0 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.exerciseItem} onPress={() => handleSelect(item.key)}>
              <View>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseMeta}>{item.muscle} • {item.equipment}</Text>
              </View>
              <Text style={styles.metBadge}>{item.met} MET</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ScrollView style={styles.categoriesList}>
          {categories.map((cat) => {
            const isExpanded = expandedGroup === cat.group;
            return (
              <View key={cat.group} style={styles.categoryCard}>
                <TouchableOpacity
                  style={styles.categoryHeader}
                  onPress={() => setExpandedGroup(isExpanded ? null : cat.group)}
                >
                  <View style={styles.categoryHeaderLeft}>
                    <Text style={styles.categoryIcon}>{GROUP_ICONS[cat.group] || '🏋️'}</Text>
                    <Text style={styles.categoryTitle}>{cat.group}</Text>
                  </View>
                  <View style={styles.categoryHeaderRight}>
                    <Text style={styles.categoryCount}>{cat.exercises.length}</Text>
                    <Text style={[styles.chevron, isExpanded && styles.chevronOpen]}>▼</Text>
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.exerciseList}>
                    {cat.exercises.map((ex) => (
                      <TouchableOpacity
                        key={ex.key}
                        style={styles.exerciseItem}
                        onPress={() => handleSelect(ex.key)}
                      >
                        <View>
                          <Text style={styles.exerciseName}>{ex.name}</Text>
                          <Text style={styles.exerciseMeta}>{ex.equipment}</Text>
                        </View>
                        <Text style={styles.metBadge}>{ex.met} MET</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
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
  categoriesList: { flex: 1 },
  categoryCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  categoryHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  categoryHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  categoryIcon: { fontSize: 24 },
  categoryTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  categoryCount: { fontSize: 14, color: '#888', backgroundColor: '#2a2a2a', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  chevron: { fontSize: 12, color: '#666' },
  chevronOpen: { transform: [{ rotate: '180deg' }] },
  exerciseList: { paddingHorizontal: 16, paddingBottom: 8 },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  exerciseName: { fontSize: 16, color: '#fff', fontWeight: '600' },
  exerciseMeta: { fontSize: 13, color: '#888', marginTop: 2 },
  metBadge: { fontSize: 13, color: '#4CAF50', backgroundColor: '#1b3a1e', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  loadingContainer: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#888', fontSize: 16, marginTop: 16 },
});

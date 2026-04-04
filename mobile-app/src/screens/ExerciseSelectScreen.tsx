import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SectionList, ActivityIndicator } from 'react-native';
import { getAllExercises, searchAllExercises, groupExercisesByMuscle, EXERCISE_LIBRARY } from '../engine/exercises';
import { useAppStore } from '../store/appStore';
import { Exercise } from '../types';

export default function ExerciseSelectScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const [allExercises, setAllExercises] = useState<Exercise[]>(EXERCISE_LIBRARY);
  const [loading, setLoading] = useState(true);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  useEffect(() => {
    getAllExercises()
      .then((exercises) => {
        setAllExercises(exercises);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = search.length > 0
    ? searchAllExercises(search, allExercises)
    : [];

  const groupedData = Object.entries(groupExercisesByMuscle(allExercises))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([title, data]) => ({ title, data }));

  const handleSelect = (exerciseKey: string) => {
    useAppStore.getState().addExercise(exerciseKey);
    navigation.navigate('WorkoutLogger');
  };

  const renderSearchResults = () => (
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
  );

  const renderGrouped = () => (
    <SectionList
      sections={groupedData}
      keyExtractor={(item) => item.key}
      renderSectionHeader={({ section }) => (
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedGroup(expandedGroup === section.title ? null : section.title)}
        >
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionCount}>{section.data.length}</Text>
        </TouchableOpacity>
      )}
      renderItem={({ item }) => {
        if (expandedGroup !== item.muscle && search.length === 0) return null;
        return (
          <TouchableOpacity style={styles.exerciseItem} onPress={() => handleSelect(item.key)}>
            <View>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseMeta}>{item.equipment}</Text>
            </View>
            <Text style={styles.metBadge}>{item.met} MET</Text>
          </TouchableOpacity>
        );
      }}
    />
  );

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

      {search.length > 0 ? renderSearchResults() : renderGrouped()}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  sectionCount: { fontSize: 14, color: '#666', backgroundColor: '#1e1e1e', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
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
  loadingContainer: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#888', fontSize: 16, marginTop: 16 },
});

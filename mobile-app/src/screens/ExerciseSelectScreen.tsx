import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { WORKOUT_CATEGORIES, getExercisesForWorkout, searchExercises } from '../engine/exercises';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Badge } from '../components/ui';
import EXERCISE_GIFS from '../data/exerciseGifs';
import MuscleBodyView from '../components/MuscleBodyView';

const MUSCLE_COLORS: Record<string, string> = {
  Chest: '#3b82f6',
  Back: '#8b5cf6',
  Shoulders: '#ef4444',
  Arms: '#f59e0b',
  Legs: '#06b6d4',
  Calves: '#06b6d4',
  Abs: '#84cc16',
  Glutes: '#f97316',
  'Full Body': '#10b981',
};

const CATEGORY_CONFIG = [
  { key: 'full_body',   gradient: ['#10b981', '#059669'] as [string, string] },
  { key: 'chest',       gradient: ['#3b82f6', '#2563eb'] as [string, string] },
  { key: 'back',        gradient: ['#8b5cf6', '#7c3aed'] as [string, string] },
  { key: 'arms',        gradient: ['#f59e0b', '#d97706'] as [string, string] },
  { key: 'shoulders',   gradient: ['#ef4444', '#dc2626'] as [string, string] },
  { key: 'lower_body',  gradient: ['#06b6d4', '#0891b2'] as [string, string] },
  { key: 'upper_body',  gradient: ['#ec4899', '#db2777'] as [string, string] },
  { key: 'abs',         gradient: ['#84cc16', '#65a30d'] as [string, string] },
  { key: 'v_taper',     gradient: ['#a855f7', '#9333ea'] as [string, string] },
  { key: 'butt',        gradient: ['#f97316', '#ea580c'] as [string, string] },
];

export default function ExerciseSelectScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  const filteredExercises = search.length > 0 ? searchExercises(search) : [];
  const workoutExercises = selectedWorkout ? getExercisesForWorkout(selectedWorkout) : [];
  const selectedCategory = WORKOUT_CATEGORIES.find((c) => c.key === selectedWorkout);
  const categoryConfig = CATEGORY_CONFIG.find((c) => c.key === selectedWorkout);

  const handleSelect = (exerciseKey: string) => {
    useAppStore.getState().addExercise(exerciseKey);
    navigation.navigate('WorkoutLogger');
  };

  if (selectedWorkout && selectedCategory) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[`${categoryConfig?.gradient[0]}33`, colors.background]}
          style={styles.header}
        >
          <TouchableOpacity onPress={() => setSelectedWorkout(null)} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={16} color={colors.primary} />
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.headerRow}>
          <View style={styles.headerIconContainer}>
            <MuscleBodyView categoryKey={selectedWorkout} size={60} color={categoryConfig?.gradient[0] || colors.primary} />
          </View>
            <View style={styles.headerTexts}>
              <Text style={styles.headerTitle}>{selectedCategory.name}</Text>
              <Text style={styles.headerCount}>{selectedCategory.exerciseKeys.length} exercises</Text>
            </View>
          </View>
        </LinearGradient>

        <FlatList
          data={workoutExercises}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Card style={styles.exerciseCard} onPress={() => handleSelect(item.key)} variant="elevated">
              <View style={styles.exerciseLeft}>
                <Image
                  source={EXERCISE_GIFS[item.key]}
                  style={styles.exerciseGif}
                  contentFit="cover"
                />
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <View style={{ backgroundColor: `${MUSCLE_COLORS[item.muscle] || '#6b7280'}22`, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 }}>
                      <Text style={{ fontSize: 11, fontWeight: '600', color: MUSCLE_COLORS[item.muscle] || '#6b7280' }}>{item.muscle}</Text>
                    </View>
                    <Text style={styles.exerciseMeta}>{item.equipment}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.exerciseRight}>
                <TouchableOpacity
                  style={styles.howToBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    navigation.navigate('ExerciseGuide', { exerciseKey: item.key });
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.howToBtnText}>How to</Text>
                </TouchableOpacity>
                <Badge variant="primary">{item.met} MET</Badge>
              </View>
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
        <Ionicons name="search" size={18} color={colors.textMuted} style={{ marginRight: spacing.sm }} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search exercises..."
          placeholderTextColor={colors.textMuted}
          ref={inputRef}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} style={styles.searchClear}>
            <Text style={styles.searchClearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {search.length > 0 ? (
        filteredExercises.length > 0 ? (
          filteredExercises.map((ex) => (
            <Card key={ex.key} style={styles.exerciseCard} onPress={() => handleSelect(ex.key)} variant="elevated">
              <View style={styles.exerciseLeft}>
                <Image
                  source={EXERCISE_GIFS[ex.key]}
                  style={styles.exerciseGif}
                  contentFit="cover"
                />
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <View style={{ backgroundColor: `${MUSCLE_COLORS[ex.muscle] || '#6b7280'}22`, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 }}>
                      <Text style={{ fontSize: 11, fontWeight: '600', color: MUSCLE_COLORS[ex.muscle] || '#6b7280' }}>{ex.muscle}</Text>
                    </View>
                    <Text style={styles.exerciseMeta}>{ex.equipment}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.exerciseRight}>
                <TouchableOpacity
                  style={styles.howToBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    navigation.navigate('ExerciseGuide', { exerciseKey: ex.key });
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.howToBtnText}>How to</Text>
                </TouchableOpacity>
                <Badge variant="primary">{ex.met} MET</Badge>
              </View>
            </Card>
          ))
        ) : (
          <Card variant="glass" style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No exercises found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </Card>
        )
      ) : (
        <View style={styles.grid}>
          {WORKOUT_CATEGORIES.map((cat) => {
            const config = CATEGORY_CONFIG.find((c) => c.key === cat.key);
            const color = config?.gradient[0] || colors.primary;
            const exercises = getExercisesForWorkout(cat.key);
            const muscles = [...new Set(exercises.map((e) => e.muscle))];
            const visibleMuscles = muscles.slice(0, 3);
            const overflow = muscles.length - visibleMuscles.length;
            const muscleLabel = visibleMuscles.join(' · ') + (overflow > 0 ? ` +${overflow}` : '');
            const pillColor = muscles.length === 1 ? MUSCLE_COLORS[muscles[0]] || color : color;
            return (
              <TouchableOpacity key={cat.key} style={styles.gridCard} onPress={() => setSelectedWorkout(cat.key)} activeOpacity={0.75}>
                <LinearGradient
                  colors={[`${color}28`, `${color}08`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gridGradientFill}
                >
                  {/* Coloured top accent bar */}
                  <View style={[styles.gridAccentBar, { backgroundColor: color }]} />
                  <View style={styles.gridCardInner}>
                    <View style={styles.gridIconContainer}>
                      <MuscleBodyView categoryKey={cat.key} size={52} color={color} />
                    </View>
                    <View style={styles.gridCardText}>
                      <Text style={styles.gridName}>{cat.name.replace(' Workout', '')}</Text>
                      <Text style={[styles.gridCount, { color }]}>{cat.exerciseKeys.length} exercises</Text>
                      <View style={[styles.gridMusclePill, { backgroundColor: `${pillColor}22` }]}>
                        <Text style={[styles.gridMuscleText, { color: pillColor }]}>{muscleLabel}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing['2xl'], paddingBottom: spacing['4xl'] },
  header: { padding: spacing['2xl'], paddingBottom: spacing.lg },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.lg, alignSelf: 'flex-start' },
  backBtnText: { color: colors.primary, ...typography.label },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  headerIconContainer: { width: 60, height: 60, borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center' },
  headerTexts: { flex: 1 },
  headerTitle: { ...typography.h2, color: colors.text },
  headerCount: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  listContent: { paddingHorizontal: spacing['2xl'], paddingBottom: spacing['4xl'] },
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gridCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    minHeight: 125,
  },
  gridGradientFill: {
    flex: 1,
  },
  gridAccentBar: {
    height: 3,
    width: '100%',
    borderRadius: radii.full,
  },
  gridCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    flex: 1,
  },
  gridCardText: {
    flex: 1,
  },
  gridIconContainer: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  gridName: { ...typography.label, color: colors.text, marginBottom: spacing.xs },
  gridCount: { fontSize: 11, fontWeight: '600', marginBottom: spacing.xs },
  gridMusclePill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 99, alignSelf: 'flex-start' },
  gridMuscleText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.2 },
  exerciseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  exerciseLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: spacing.md },
  exerciseGif: { width: 52, height: 52, borderRadius: radii.md, backgroundColor: colors.surface },
  exerciseInfo: { flex: 1 },
  exerciseName: { ...typography.h4, color: colors.text, marginBottom: spacing.xs },
  exerciseMeta: { ...typography.caption, color: colors.textMuted },
  exerciseRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  howToBtn: { backgroundColor: colors.accentMuted, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radii.sm },
  howToBtnText: { ...typography.caption, color: colors.accent, fontWeight: '600' },
  emptyCard: { alignItems: 'center', padding: spacing['3xl'] },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.lg },
  emptyText: { ...typography.h4, color: colors.text, marginBottom: spacing.sm },
  emptySubtext: { ...typography.bodySm, color: colors.textMuted },
});

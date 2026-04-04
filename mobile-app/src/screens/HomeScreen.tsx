import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Button, StatCard } from '../components/ui';

function getThisWeekStats(sessions: any[]) {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const weekSessions = sessions.filter((s) => new Date(s.date) >= weekStart);
  const totalCal = weekSessions.reduce((sum, s) => sum + s.totalCalories, 0);
  const totalDuration = weekSessions.reduce((sum, s) => sum + s.durationSec, 0);

  return {
    totalCal: Math.round(totalCal * 10) / 10,
    totalWorkouts: weekSessions.length,
    totalMinutes: Math.round(totalDuration / 60),
  };
}

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { profile, sessions, loadProfile, loadSessions } = useAppStore();

  useEffect(() => {
    loadProfile();
    loadSessions();
  }, []);

  const handleStartWorkout = () => {
    if (!profile) {
      navigation.navigate('Profile');
      return;
    }
    useAppStore.getState().startSession();
    navigation.navigate('ExerciseSelect');
  };

  const weekStats = getThisWeekStats(sessions);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.title}>Gym Calorie Tracker</Text>
        </View>
        {profile && (
          <TouchableOpacity style={styles.profileBadge} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.profileText}>{profile.bodyWeightKg} kg</Text>
          </TouchableOpacity>
        )}
      </View>

      <Button variant="primary" size="lg" fullWidth onPress={handleStartWorkout} style={styles.startBtn}>
        Start Workout
      </Button>

      {sessions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.statsRow}>
            <StatCard label="Calories" value={`${weekStats.totalCal}`} icon="🔥" />
            <StatCard label="Workouts" value={`${weekStats.totalWorkouts}`} icon="💪" />
            <StatCard label="Minutes" value={`${weekStats.totalMinutes}`} icon="⏱️" />
          </View>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          {sessions.length > 3 && (
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          )}
        </View>
        {sessions.length === 0 ? (
          <Card variant="glass" style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🏋️</Text>
            <Text style={styles.emptyText}>No workouts yet</Text>
            <Text style={styles.emptySubtext}>Start your first workout to begin tracking</Text>
          </Card>
        ) : (
          sessions.slice(0, 3).map((item: any) => (
            <Card
              key={item.id}
              variant="elevated"
              style={styles.sessionCard}
              onPress={() => navigation.navigate('Summary', { session: item })}
            >
              <View style={styles.sessionRow}>
                <View>
                  <Text style={styles.sessionDate}>
                    {new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </Text>
                  <Text style={styles.sessionCalories}>{item.totalCalories.toFixed(1)} kcal</Text>
                  <Text style={styles.sessionMeta}>
                    {item.exercises.length} exercises • {Math.floor(item.durationSec / 60)}m {item.durationSec % 60}s
                  </Text>
                </View>
                <Text style={styles.sessionArrow}>→</Text>
              </View>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing['2xl'], paddingBottom: spacing['4xl'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing['2xl'] },
  greeting: { ...typography.body, color: colors.textMuted, marginBottom: spacing.xs },
  title: { ...typography.h2, color: colors.text },
  profileBadge: { backgroundColor: colors.surface, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.full, borderWidth: 1, borderColor: colors.border },
  profileText: { color: colors.primary, ...typography.label },
  startBtn: { marginBottom: spacing['2xl'] },
  section: { marginBottom: spacing['2xl'] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.lg },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  seeAll: { ...typography.label, color: colors.primary },
  emptyCard: { alignItems: 'center', padding: spacing['3xl'] },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.lg },
  emptyText: { ...typography.h4, color: colors.text, marginBottom: spacing.sm },
  emptySubtext: { ...typography.bodySm, color: colors.textMuted },
  sessionCard: { marginBottom: spacing.md },
  sessionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sessionDate: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.xs },
  sessionCalories: { ...typography.h2, color: colors.primary, marginBottom: spacing.xs },
  sessionMeta: { ...typography.bodySm, color: colors.textSecondary },
  sessionArrow: { fontSize: 20, color: colors.textMuted },
});

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
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

function ProgressRing({ done, goal = 5 }: { done: number; goal?: number }) {
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(done / goal, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#27272a" strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#10b981"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#fafafa' }}>{done}</Text>
        <Text style={{ fontSize: 10, color: '#6b7280' }}>/{goal}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { profile, sessions, loadProfile, loadSessions } = useAppStore();

  useEffect(() => {
    loadProfile();
    loadSessions();
  }, []);

  const handleStartWorkout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Welcome back{profile?.nickname ? `, ${profile.nickname}` : ''} 👋</Text>
          <Text style={styles.title}>Gym Calorie Tracker</Text>
        </View>
        {profile && (
          <TouchableOpacity style={styles.profileBadge} onPress={() => navigation.navigate('Profile')}>
            <View style={styles.profileDot} />
            <Text style={styles.profileText}>{profile.nickname || profile.bodyWeightKg + ' kg'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View style={styles.heroContent}>
          <View>
            <Text style={styles.heroLabel}>Ready to train?</Text>
            <Text style={styles.heroTitle}>Start your workout</Text>
          </View>
          <TouchableOpacity style={styles.heroButton} onPress={handleStartWorkout} activeOpacity={0.85}>
            <Text style={styles.heroButtonText}>Begin</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.white} style={{ marginLeft: spacing.xs }} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {sessions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <ProgressRing done={weekStats.totalWorkouts} />
            <View style={{ flex: 1, gap: 8 }}>
              <StatCard label="Calories" value={`${weekStats.totalCal}`} icon="🔥" />
              <StatCard label="Minutes" value={`${weekStats.totalMinutes}`} icon="⏱️" />
            </View>
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
                <View style={styles.sessionLeft}>
                  <View style={styles.sessionIcon}>
                    <MaterialCommunityIcons name="dumbbell" size={22} color={colors.primary} />
                  </View>
                  <View style={styles.sessionInfo}>
                    <Text style={styles.sessionDate}>
                      {new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Text>
                    <Text style={styles.sessionCalories}>{item.totalCalories.toFixed(1)} kcal</Text>
                    <Text style={styles.sessionMeta}>
                      {item.exercises.length} exercises • {Math.floor(item.durationSec / 60)}m
                    </Text>
                  </View>
                </View>
                <View style={styles.sessionArrow}>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </View>
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
  content: { padding: spacing.xl, paddingBottom: spacing['4xl'] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing['2xl'] },
  headerLeft: { flex: 1 },
  greeting: { ...typography.label, color: colors.textMuted, marginBottom: spacing.xs },
  title: { ...typography.h2, color: colors.text },
  profileBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.full, borderWidth: 1, borderColor: colors.border, gap: spacing.xs },
  profileDot: { width: 8, height: 8, borderRadius: radii.full, backgroundColor: colors.primary },
  profileText: { color: colors.textSecondary, ...typography.label },
  heroCard: { borderRadius: radii.xl, marginBottom: spacing['2xl'], overflow: 'hidden' as const },
  heroContent: { padding: spacing['2xl'], flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroLabel: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: spacing.xs, fontWeight: '500' },
  heroTitle: { fontSize: 22, color: colors.white, fontWeight: '800', letterSpacing: -0.5 },
  heroButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: radii.full },
  heroButtonText: { color: colors.white, ...typography.button },
  heroButtonArrow: { color: colors.white, fontSize: 18, marginLeft: spacing.xs },
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
  sessionLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  sessionIcon: { width: 44, height: 44, borderRadius: radii.md, backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center' },
  sessionInfo: { flex: 1 },
  sessionDate: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.xs },
  sessionCalories: { ...typography.h4, color: colors.primary, marginBottom: spacing.xs },
  sessionMeta: { ...typography.bodySm, color: colors.textSecondary },
  sessionArrow: { width: 32, height: 32, borderRadius: radii.full, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
});

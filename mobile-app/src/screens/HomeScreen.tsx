import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Card, StatCard } from '../components/ui';

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
          cx={size / 2} cy={size / 2} r={radius}
          stroke="#10b981" strokeWidth={strokeWidth} fill="none"
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
    <View style={styles.root}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>
              {profile?.nickname ? `Hey, ${profile.nickname} 👋` : 'Welcome 👋'}
            </Text>
            <Text style={styles.title}>Your Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('Profile')} activeOpacity={0.8}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>
                {profile?.nickname ? profile.nickname.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Hero card */}
        <LinearGradient
          colors={['#0d9488', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroDecoration} />
          <View style={styles.heroContent}>
            <View style={styles.heroLeft}>
              <Text style={styles.heroLabel}>READY TO TRAIN?</Text>
              <Text style={styles.heroTitle}>Start a{'\n'}Workout</Text>
            </View>
            <TouchableOpacity style={styles.heroButton} onPress={handleStartWorkout} activeOpacity={0.85}>
              <MaterialCommunityIcons name="dumbbell" size={26} color={colors.white} />
              <Text style={styles.heroButtonText}>Begin</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* This Week */}
        {sessions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <View style={styles.weekRow}>
              <Card variant="glass" style={styles.ringCard}>
                <ProgressRing done={weekStats.totalWorkouts} />
                <Text style={styles.ringLabel}>Workouts</Text>
              </Card>
              <View style={styles.statsCol}>
                <StatCard label="Calories" value={`${weekStats.totalCal}`} iconName="fire" iconColor="#ef4444" unit="kcal" />
                <StatCard label="Minutes" value={`${weekStats.totalMinutes}`} iconName="timer-outline" iconColor={colors.primary} unit="min" />
              </View>
            </View>
          </View>
        )}

        {/* Recent Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            {sessions.length > 3 && (
              <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.seeAllBtn}>
                <Text style={styles.seeAll}>See all</Text>
                <Ionicons name="chevron-forward" size={14} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          {sessions.length === 0 ? (
            <Card variant="glass" style={styles.emptyCard}>
              <View style={styles.emptyIconContainer}>
                <MaterialCommunityIcons name="dumbbell" size={36} color={colors.primary} />
              </View>
              <Text style={styles.emptyText}>No workouts yet</Text>
              <Text style={styles.emptySubtext}>Tap the button above to start your first workout</Text>
            </Card>
          ) : (
            sessions.slice(0, 3).map((item: any, index: number) => (
              <TouchableOpacity
                key={item.id}
                style={styles.sessionCard}
                onPress={() => navigation.navigate('Summary', { session: item })}
                activeOpacity={0.75}
              >
                <View style={[styles.sessionAccent, { backgroundColor: index === 0 ? colors.primary : index === 1 ? colors.accent : colors.warning }]} />
                <View style={styles.sessionIcon}>
                  <MaterialCommunityIcons name="dumbbell" size={20} color={colors.primary} />
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionDate}>
                    {new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </Text>
                  <Text style={styles.sessionMeta}>
                    {item.exercises.length} exercises • {Math.floor(item.durationSec / 60)}m
                  </Text>
                </View>
                <View style={styles.sessionRight}>
                  <Text style={styles.sessionCalories}>{item.totalCalories.toFixed(0)}</Text>
                  <Text style={styles.sessionKcal}>kcal</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: spacing.sm }} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleStartWorkout} activeOpacity={0.85}>
        <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.fabGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <MaterialCommunityIcons name="plus" size={28} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  content: { padding: spacing.xl, paddingBottom: 100 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing['2xl'] },
  headerLeft: { flex: 1 },
  greeting: { fontSize: 13, color: colors.textMuted, marginBottom: 2, fontWeight: '500' },
  title: { ...typography.h2, color: colors.text },

  profileBtn: {},
  profileAvatar: { width: 42, height: 42, borderRadius: radii.full, backgroundColor: colors.primaryMuted, borderWidth: 2, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { fontSize: 17, fontWeight: '800', color: colors.primary },

  heroCard: { borderRadius: radii.xl, marginBottom: spacing['2xl'], overflow: 'hidden', minHeight: 120 },
  heroDecoration: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.06)', top: -40, right: -30 },
  heroContent: { padding: spacing['2xl'], flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroLeft: {},
  heroLabel: { fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: '700', letterSpacing: 1.5, marginBottom: spacing.xs },
  heroTitle: { fontSize: 26, color: colors.white, fontWeight: '800', letterSpacing: -0.5, lineHeight: 30 },
  heroButton: { backgroundColor: 'rgba(255,255,255,0.18)', paddingHorizontal: spacing.xl, paddingVertical: spacing.lg, borderRadius: radii.xl, alignItems: 'center', gap: spacing.xs, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  heroButtonText: { color: colors.white, fontSize: 13, fontWeight: '700' },

  section: { marginBottom: spacing['2xl'] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  sectionTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.lg },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAll: { fontSize: 13, color: colors.primary, fontWeight: '600' },

  weekRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'stretch' },
  ringCard: { alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.xl, paddingHorizontal: spacing.lg, minWidth: 100 },
  ringLabel: { fontSize: 11, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  statsCol: { flex: 1, gap: spacing.md },

  emptyCard: { alignItems: 'center', paddingVertical: spacing['4xl'], paddingHorizontal: spacing['2xl'] },
  emptyIconContainer: { width: 72, height: 72, borderRadius: radii.full, backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  emptyText: { ...typography.h4, color: colors.text, marginBottom: spacing.sm },
  emptySubtext: { ...typography.bodySm, color: colors.textMuted, textAlign: 'center' },

  sessionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceElevated, borderRadius: radii.lg, marginBottom: spacing.md, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  sessionAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderTopLeftRadius: radii.lg, borderBottomLeftRadius: radii.lg },
  sessionIcon: { width: 40, height: 40, borderRadius: radii.md, backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  sessionInfo: { flex: 1 },
  sessionDate: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 3 },
  sessionMeta: { ...typography.caption, color: colors.textMuted },
  sessionRight: { alignItems: 'flex-end' },
  sessionCalories: { fontSize: 18, fontWeight: '800', color: colors.primary, letterSpacing: -0.5 },
  sessionKcal: { fontSize: 10, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },

  fab: { position: 'absolute', bottom: spacing['2xl'], right: spacing['2xl'], borderRadius: radii.full, ...{ shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 } },
  fabGradient: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
});

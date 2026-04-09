import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Badge } from '../components/ui';

function getWeeklyTotals(sessions: any[]) {
  const now = new Date();
  const weeks: { label: string; total: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() - i * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const label = weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const total = sessions
      .filter((s) => { const d = new Date(s.date); return d >= weekStart && d < weekEnd; })
      .reduce((sum, s) => sum + s.totalCalories, 0);

    weeks.push({ label, total: Math.round(total * 10) / 10 });
  }

  return weeks;
}

const SESSION_ACCENT_COLORS = ['#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#f97316', '#84cc16'];

export default function HistoryScreen({ navigation }: { navigation: any }) {
  const { sessions, loadSessions, deleteSession } = useAppStore();

  React.useEffect(() => { loadSessions(); }, []);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Workout', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteSession(id) },
    ]);
  };

  const weeklyData = getWeeklyTotals(sessions);
  const totalThisWeek = weeklyData[weeklyData.length - 1]?.total || 0;
  const maxWeekly = Math.max(...weeklyData.map((w) => w.total), 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>History</Text>

      {sessions.length === 0 ? (
        <Card variant="glass" style={styles.emptyCard}>
          <View style={styles.emptyIconContainer}>
            <MaterialCommunityIcons name="clipboard-list-outline" size={36} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyText}>No past workouts</Text>
          <Text style={styles.emptySubtext}>Complete a workout to see your history here</Text>
        </Card>
      ) : (
        <>
          {/* This week summary */}
          <LinearGradient colors={['#0d9488', '#059669']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.weeklySummary}>
            <View style={styles.weeklyDecoration} />
            <Text style={styles.weeklyLabel}>THIS WEEK</Text>
            <Text style={styles.weeklyValue}>{totalThisWeek.toFixed(0)}</Text>
            <Text style={styles.weeklyUnit}>kcal burned</Text>
          </LinearGradient>

          {/* 7-week chart */}
          <Card variant="elevated" style={styles.chartCard}>
            <Text style={styles.chartTitle}>7-Week Trend</Text>
            <View style={styles.barsContainer}>
              {weeklyData.map((week, i) => {
                const barHeight = week.total > 0 ? Math.max((week.total / maxWeekly) * 100, 6) : 4;
                const isCurrentWeek = i === weeklyData.length - 1;
                return (
                  <View key={i} style={styles.barWrapper}>
                    {week.total > 0 && (
                      <Text style={[styles.barValue, isCurrentWeek && { color: colors.primary }]}>
                        {week.total > 999 ? `${(week.total / 1000).toFixed(1)}k` : week.total.toFixed(0)}
                      </Text>
                    )}
                    <LinearGradient
                      colors={isCurrentWeek
                        ? [colors.primary, colors.primaryDark]
                        : week.total > 0
                          ? ['rgba(16,185,129,0.4)', 'rgba(16,185,129,0.15)']
                          : [colors.border, colors.border]}
                      style={[styles.bar, { height: barHeight }]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                    />
                    <Text style={[styles.barLabel, isCurrentWeek && { color: colors.primary, fontWeight: '700' }]}>{week.label}</Text>
                  </View>
                );
              })}
            </View>
          </Card>

          {/* Sessions list */}
          <View style={styles.sessionsList}>
            <Text style={styles.sectionTitle}>All Workouts</Text>
            <FlatList
              data={sessions}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => {
                const accent = SESSION_ACCENT_COLORS[index % SESSION_ACCENT_COLORS.length];
                return (
                  <TouchableOpacity
                    style={styles.sessionCard}
                    onPress={() => navigation.navigate('Summary', { session: item })}
                    activeOpacity={0.75}
                  >
                    <View style={[styles.sessionAccent, { backgroundColor: accent }]} />
                    <View style={[styles.sessionIconWrap, { backgroundColor: `${accent}18` }]}>
                      <MaterialCommunityIcons name="dumbbell" size={20} color={accent} />
                    </View>
                    <View style={styles.sessionTexts}>
                      <Text style={styles.sessionDate}>
                        {new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                      </Text>
                      <View style={styles.sessionBadges}>
                        <Badge variant="default">{item.exercises.length} exercises</Badge>
                        <Badge variant="default">{Math.floor(item.durationSec / 60)}m {item.durationSec % 60}s</Badge>
                      </View>
                    </View>
                    <View style={styles.sessionRight}>
                      <Text style={[styles.sessionCalories, { color: accent }]}>{item.totalCalories.toFixed(0)}</Text>
                      <Text style={styles.sessionKcal}>kcal</Text>
                    </View>
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                      <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.danger} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: spacing['4xl'] },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing['2xl'] },

  emptyCard: { alignItems: 'center', paddingVertical: spacing['4xl'], paddingHorizontal: spacing['2xl'], marginTop: spacing['2xl'] },
  emptyIconContainer: { width: 72, height: 72, borderRadius: radii.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  emptyText: { ...typography.h4, color: colors.text, marginBottom: spacing.sm },
  emptySubtext: { ...typography.bodySm, color: colors.textMuted, textAlign: 'center' },

  weeklySummary: { borderRadius: radii.xl, padding: spacing['2xl'], marginBottom: spacing.xl, overflow: 'hidden', alignItems: 'center' },
  weeklyDecoration: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', top: -80, right: -60 },
  weeklyLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: '700', letterSpacing: 1.5, marginBottom: spacing.xs },
  weeklyValue: { fontSize: 52, fontWeight: '900', color: colors.white, letterSpacing: -2, lineHeight: 56 },
  weeklyUnit: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: '500', marginTop: 2 },

  chartCard: { marginBottom: spacing['2xl'], padding: spacing.xl },
  chartTitle: { ...typography.label, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.lg, textTransform: 'uppercase', letterSpacing: 0.5 },
  barsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 130, paddingHorizontal: spacing.xs },
  barWrapper: { alignItems: 'center', flex: 1 },
  bar: { width: 22, borderRadius: radii.sm, minHeight: 4 },
  barValue: { ...typography.caption, color: colors.textMuted, marginBottom: 4, fontSize: 9 },
  barLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.sm, fontSize: 9 },

  sectionTitle: { ...typography.h4, color: colors.text, marginBottom: spacing.lg },
  sessionsList: {},
  sessionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceElevated, borderRadius: radii.lg, marginBottom: spacing.md, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', gap: spacing.md },
  sessionAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3 },
  sessionIconWrap: { width: 42, height: 42, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  sessionTexts: { flex: 1 },
  sessionDate: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 5 },
  sessionBadges: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  sessionRight: { alignItems: 'flex-end', flexShrink: 0 },
  sessionCalories: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  sessionKcal: { fontSize: 10, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  deleteBtn: { padding: spacing.xs, flexShrink: 0 },
});

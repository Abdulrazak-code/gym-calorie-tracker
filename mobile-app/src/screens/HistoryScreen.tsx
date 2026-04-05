import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Button, Badge } from '../components/ui';

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

export default function HistoryScreen({ navigation }: { navigation: any }) {
  const { sessions, loadSessions, deleteSession } = useAppStore();

  React.useEffect(() => { loadSessions(); }, []);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Workout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteSession(id) },
    ]);
  };

  const weeklyData = getWeeklyTotals(sessions);
  const totalThisWeek = weeklyData[weeklyData.length - 1]?.total || 0;
  const maxWeekly = Math.max(...weeklyData.map((w) => w.total), 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>History</Text>

      {sessions.length > 0 && (
        <>
          <LinearGradient
            colors={[colors.primaryMutedStrong, colors.transparent]}
            style={styles.weeklyGradient}
          />
          <Card variant="glass" style={styles.weeklySummary}>
            <Text style={styles.weeklyLabel}>This Week</Text>
            <Text style={styles.weeklyValue}>{totalThisWeek.toFixed(1)} kcal</Text>
          </Card>

          <Card variant="elevated" style={styles.chartCard}>
            <Text style={styles.chartTitle}>7-Week Trend</Text>
            <View style={styles.barsContainer}>
              {weeklyData.map((week, i) => {
                const barHeight = week.total > 0 ? Math.max((week.total / maxWeekly) * 100, 4) : 0;
                const isCurrentWeek = i === weeklyData.length - 1;
                return (
                  <View key={i} style={styles.barWrapper}>
                    <Text style={[styles.barValue, week.total > 0 && { color: colors.primary }]}>{week.total > 0 ? week.total.toFixed(0) : ''}</Text>
                    <LinearGradient
                      colors={isCurrentWeek ? [colors.primary, colors.primaryDark] : week.total > 0 ? [colors.primaryMutedStrong, colors.primaryMuted] : [colors.border, colors.border]}
                      style={[styles.bar, { height: barHeight }]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                    />
                    <Text style={[styles.barLabel, isCurrentWeek && { color: colors.primary }]}>{week.label}</Text>
                  </View>
                );
              })}
            </View>
          </Card>
        </>
      )}

      {sessions.length === 0 ? (
        <Card variant="glass" style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>📋</Text>
          <Text style={styles.emptyText}>No past workouts</Text>
          <Text style={styles.emptySubtext}>Complete a workout to see your history</Text>
        </Card>
      ) : (
        <View style={styles.sessionsList}>
          <Text style={styles.sectionTitle}>All Workouts</Text>
          <FlatList
            data={sessions}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Card
                variant="elevated"
                style={styles.sessionCard}
                onPress={() => navigation.navigate('Summary', { session: item })}
              >
                <View style={styles.sessionInfo}>
                  <View style={styles.sessionHeader}>
                    <View style={styles.sessionIcon}>
                      <Text style={styles.sessionIconText}>🏋️</Text>
                    </View>
                    <View style={styles.sessionTexts}>
                      <Text style={styles.sessionDate}>
                        {new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </Text>
                      <Text style={styles.sessionCalories}>{item.totalCalories.toFixed(1)} kcal</Text>
                    </View>
                  </View>
                  <View style={styles.sessionMetaRow}>
                    <Badge variant="default">{item.exercises.length} exercises</Badge>
                    <Badge variant="default">{Math.floor(item.durationSec / 60)}m {item.durationSec % 60}s</Badge>
                  </View>
                </View>
                <Button variant="ghost" size="sm" onPress={() => handleDelete(item.id)} textStyle={{ color: colors.danger }}>
                  Del
                </Button>
              </Card>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing['2xl'], paddingBottom: spacing['4xl'] },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing['2xl'] },
  weeklyGradient: { position: 'absolute', top: 80, left: 0, right: 0, height: 120 },
  weeklySummary: { alignItems: 'center', marginBottom: spacing.lg, padding: spacing['2xl'] },
  weeklyLabel: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs, textTransform: 'uppercase' as const, letterSpacing: 1 },
  weeklyValue: { fontSize: 40, fontWeight: '900', color: colors.primary, letterSpacing: -1.5 },
  chartCard: { marginBottom: spacing['2xl'], padding: spacing.lg },
  chartTitle: { ...typography.h4, color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  barsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 140, paddingHorizontal: spacing.sm },
  barWrapper: { alignItems: 'center', flex: 1 },
  bar: { width: 24, borderRadius: radii.sm },
  barValue: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.xs },
  barLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.sm },
  emptyCard: { alignItems: 'center', padding: spacing['3xl'] },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.lg },
  emptyText: { ...typography.h4, color: colors.text, marginBottom: spacing.sm },
  emptySubtext: { ...typography.bodySm, color: colors.textMuted },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.lg },
  sessionsList: { marginTop: spacing.lg },
  sessionCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md, padding: spacing.lg },
  sessionInfo: { flex: 1 },
  sessionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.sm },
  sessionIcon: { width: 40, height: 40, borderRadius: radii.md, backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center' },
  sessionIconText: { fontSize: 18 },
  sessionTexts: { flex: 1 },
  sessionDate: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.xs },
  sessionCalories: { ...typography.h4, color: colors.primary },
  sessionMetaRow: { flexDirection: 'row', gap: spacing.sm },
});

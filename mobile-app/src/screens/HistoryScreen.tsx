import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useAppStore } from '../store/appStore';

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
      .filter((s) => {
        const d = new Date(s.date);
        return d >= weekStart && d < weekEnd;
      })
      .reduce((sum, s) => sum + s.totalCalories, 0);

    weeks.push({ label, total: Math.round(total * 10) / 10 });
  }

  return weeks;
}

export default function HistoryScreen({ navigation }: { navigation: any }) {
  const { sessions, loadSessions, deleteSession } = useAppStore();

  React.useEffect(() => {
    loadSessions();
  }, []);

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout History</Text>

      {sessions.length > 0 && (
        <>
          <View style={styles.weeklySummary}>
            <Text style={styles.weeklyLabel}>This Week</Text>
            <Text style={styles.weeklyValue}>{totalThisWeek.toFixed(1)} kcal</Text>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Weekly Calories</Text>
            <View style={styles.chartContainer}>
              <View style={styles.barsContainer}>
                {weeklyData.map((week, i) => {
                  const barHeight = week.total > 0 ? Math.max((week.total / maxWeekly) * 120, 4) : 0;
                  return (
                    <View key={i} style={styles.barWrapper}>
                      <Text style={styles.barValue}>{week.total > 0 ? week.total.toFixed(0) : ''}</Text>
                      <View style={[styles.bar, { height: barHeight, backgroundColor: week.total > 0 ? '#4CAF50' : '#333' }]} />
                      <Text style={styles.barLabel}>{week.label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </>
      )}

      {sessions.length === 0 ? (
        <Text style={styles.emptyText}>No past workouts.</Text>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.sessionCard}
              onPress={() => navigation.navigate('Summary', { session: item })}
            >
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionDate}>
                  {new Date(item.date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
                <Text style={styles.sessionCalories}>
                  {item.totalCalories.toFixed(1)} kcal
                </Text>
                <Text style={styles.sessionMeta}>
                  {item.exercises.length} exercises • {Math.floor(item.durationSec / 60)}m {item.durationSec % 60}s
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteBtnText}>Del</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
  weeklySummary: {
    backgroundColor: '#1a2e1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  weeklyLabel: { color: '#888', fontSize: 14, marginBottom: 4 },
  weeklyValue: { color: '#4CAF50', fontSize: 28, fontWeight: 'bold' },
  chartCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  chartTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  chartContainer: { padding: 8 },
  barsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 160 },
  barWrapper: { alignItems: 'center', flex: 1 },
  bar: { width: 24, borderRadius: 4, marginBottom: 4 },
  barValue: { color: '#4CAF50', fontSize: 10, marginBottom: 4 },
  barLabel: { color: '#888', fontSize: 9, marginTop: 4 },
  emptyText: { color: '#666', fontSize: 16, textAlign: 'center', marginTop: 40 },
  sessionCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  sessionInfo: { flex: 1 },
  sessionDate: { color: '#aaa', fontSize: 14, marginBottom: 4 },
  sessionCalories: { color: '#4CAF50', fontSize: 22, fontWeight: 'bold' },
  sessionMeta: { color: '#888', fontSize: 13, marginTop: 4 },
  deleteBtn: {
    backgroundColor: '#3a1e1e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteBtnText: { color: '#ff6b6b', fontSize: 12, fontWeight: 'bold' },
});

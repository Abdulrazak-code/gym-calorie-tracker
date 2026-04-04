import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useAppStore } from '../store/appStore';

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gym Calorie Tracker</Text>
        {profile && (
          <View style={styles.profileBadge}>
            <Text style={styles.profileText}>{profile.bodyWeightKg} kg</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.startBtn} onPress={handleStartWorkout}>
        <Text style={styles.startBtnText}>Start Workout</Text>
      </TouchableOpacity>

      {sessions.length > 0 && (
        <View style={styles.weekCard}>
          <Text style={styles.weekLabel}>This Week</Text>
          <View style={styles.weekStats}>
            <View style={styles.weekStat}>
              <Text style={styles.weekStatValue}>{weekStats.totalCal}</Text>
              <Text style={styles.weekStatLabel}>kcal</Text>
            </View>
            <View style={styles.weekDivider} />
            <View style={styles.weekStat}>
              <Text style={styles.weekStatValue}>{weekStats.totalWorkouts}</Text>
              <Text style={styles.weekStatLabel}>workouts</Text>
            </View>
            <View style={styles.weekDivider} />
            <View style={styles.weekStat}>
              <Text style={styles.weekStatValue}>{weekStats.totalMinutes}</Text>
              <Text style={styles.weekStatLabel}>minutes</Text>
            </View>
          </View>
        </View>
      )}

      <Text style={styles.sectionTitle}>Recent Workouts</Text>
      {sessions.length === 0 ? (
        <Text style={styles.emptyText}>No workouts yet. Start your first one!</Text>
      ) : (
        <FlatList
          data={sessions.slice(0, 3)}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.sessionCard}
              onPress={() => navigation.navigate('Summary', { session: item })}
            >
              <Text style={styles.sessionDate}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
              <Text style={styles.sessionCalories}>
                {item.totalCalories.toFixed(1)} kcal
              </Text>
              <Text style={styles.sessionExercises}>
                {item.exercises.length} exercise{item.exercises.length !== 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.profileBtn}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.profileBtnText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', flex: 1 },
  profileBadge: { backgroundColor: '#1e1e1e', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  profileText: { color: '#4CAF50', fontSize: 14, fontWeight: 'bold' },
  startBtn: { backgroundColor: '#4CAF50', borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 32 },
  startBtnText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  weekCard: { backgroundColor: '#1e1e1e', borderRadius: 12, padding: 16, marginBottom: 24 },
  weekLabel: { color: '#888', fontSize: 14, marginBottom: 12, textAlign: 'center' },
  weekStats: { flexDirection: 'row', justifyContent: 'space-around' },
  weekStat: { alignItems: 'center' },
  weekStatValue: { color: '#4CAF50', fontSize: 28, fontWeight: 'bold' },
  weekStatLabel: { color: '#888', fontSize: 12, marginTop: 2 },
  weekDivider: { width: 1, backgroundColor: '#333' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  emptyText: { color: '#666', fontSize: 16, textAlign: 'center', marginTop: 40 },
  sessionCard: { backgroundColor: '#1e1e1e', borderRadius: 12, padding: 16, marginBottom: 12 },
  sessionDate: { color: '#aaa', fontSize: 14, marginBottom: 4 },
  sessionCalories: { color: '#4CAF50', fontSize: 24, fontWeight: 'bold' },
  sessionExercises: { color: '#888', fontSize: 14, marginTop: 4 },
  profileBtn: { marginTop: 24, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 12 },
  profileBtnText: { color: '#aaa', fontSize: 16 },
});

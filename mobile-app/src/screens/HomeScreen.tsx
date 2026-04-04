import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useAppStore } from '../store/appStore';

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

  return (
    <View style={styles.container}>
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

      <Text style={styles.sectionTitle}>Recent Workouts</Text>
      {sessions.length === 0 ? (
        <Text style={styles.emptyText}>No workouts yet. Start your first one!</Text>
      ) : (
        <FlatList
          data={sessions.slice(0, 3)}
          keyExtractor={(item) => item.id}
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
    </View>
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
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  emptyText: { color: '#666', fontSize: 16, textAlign: 'center', marginTop: 40 },
  sessionCard: { backgroundColor: '#1e1e1e', borderRadius: 12, padding: 16, marginBottom: 12 },
  sessionDate: { color: '#aaa', fontSize: 14, marginBottom: 4 },
  sessionCalories: { color: '#4CAF50', fontSize: 24, fontWeight: 'bold' },
  sessionExercises: { color: '#888', fontSize: 14, marginTop: 4 },
  profileBtn: { marginTop: 24, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 12 },
  profileBtnText: { color: '#aaa', fontSize: 16 },
});

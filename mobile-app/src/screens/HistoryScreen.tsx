import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useAppStore } from '../store/appStore';

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>

      {sessions.length === 0 ? (
        <Text style={styles.emptyText}>No past workouts.</Text>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
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

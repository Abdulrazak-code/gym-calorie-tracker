import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAppStore } from '../store/appStore';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const { profile, setProfile, loadProfile } = useAppStore();

  const [weight, setWeight] = React.useState(profile ? profile.bodyWeightKg.toString() : '');
  const [age, setAge] = React.useState(profile ? profile.age.toString() : '');
  const [gender, setGender] = React.useState<'male' | 'female' | 'other'>(profile?.gender || 'male');
  const [height, setHeight] = React.useState(profile ? profile.heightCm.toString() : '');

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setWeight(profile.bodyWeightKg.toString());
      setAge(profile.age.toString());
      setGender(profile.gender);
      setHeight(profile.heightCm.toString());
    }
  }, [profile]);

  const handleSave = async () => {
    const weightNum = parseFloat(weight);
    const ageNum = parseInt(age, 10);
    const heightNum = parseFloat(height);

    if (!weightNum || !ageNum || !heightNum) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    await setProfile({
      bodyWeightKg: weightNum,
      age: ageNum,
      gender,
      heightCm: heightNum,
    });

    Alert.alert('Success', 'Profile saved!');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Setup</Text>

      <Text style={styles.label}>Body Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
        placeholder="e.g. 70"
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
        placeholder="e.g. 25"
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderRow}>
        {(['male', 'female', 'other'] as const).map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
            onPress={() => setGender(g)}
          >
            <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="decimal-pad"
        placeholder="e.g. 175"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 32 },
  label: { fontSize: 14, color: '#aaa', marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
  genderRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  genderBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  genderBtnActive: { borderColor: '#4CAF50', backgroundColor: '#1b3a1e' },
  genderText: { color: '#aaa', fontSize: 16 },
  genderTextActive: { color: '#4CAF50', fontWeight: 'bold' },
  saveBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 32,
  },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Button, Input } from '../components/ui';

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

    if (!weightNum || weightNum <= 0) {
      Alert.alert('Invalid Weight', 'Please enter a valid body weight greater than 0 kg');
      return;
    }
    if (!ageNum || ageNum <= 0 || ageNum > 120) {
      Alert.alert('Invalid Age', 'Please enter a valid age between 1 and 120');
      return;
    }
    if (!heightNum || heightNum <= 0) {
      Alert.alert('Invalid Height', 'Please enter a valid height greater than 0 cm');
      return;
    }

    await setProfile({ bodyWeightKg: weightNum, age: ageNum, gender, heightCm: heightNum });
    Alert.alert('Success', 'Profile saved!');
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Update your body metrics for accurate calorie calculations</Text>

      <View style={styles.form}>
        <Input label="Body Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="decimal-pad" placeholder="e.g. 70" />
        <Input label="Age" value={age} onChangeText={setAge} keyboardType="number-pad" placeholder="e.g. 25" />
        <Input label="Height (cm)" value={height} onChangeText={setHeight} keyboardType="decimal-pad" placeholder="e.g. 175" />

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

        <View style={styles.spacer} />
        <Button variant="primary" size="lg" fullWidth onPress={handleSave}>
          Save Profile
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing['2xl'], paddingBottom: spacing['4xl'] },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary, marginBottom: spacing['2xl'] },
  form: { flex: 1 },
  label: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.sm, marginTop: spacing.md },
  genderRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  genderBtn: { flex: 1, padding: spacing.lg, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center' },
  genderBtnActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  genderText: { color: colors.textSecondary, fontSize: 15 },
  genderTextActive: { color: colors.primary, fontWeight: '600' },
  spacer: { height: spacing['2xl'] },
});

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Button, Input } from '../components/ui';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const { profile, setProfile, loadProfile } = useAppStore();

  const [nickname, setNickname] = React.useState(profile ? profile.nickname || '' : '');
  const [weight, setWeight] = React.useState(profile ? profile.bodyWeightKg.toString() : '');
  const [age, setAge] = React.useState(profile ? profile.age.toString() : '');
  const [gender, setGender] = React.useState<'male' | 'female' | 'other'>(profile?.gender || 'male');
  const [heightUnit, setHeightUnit] = React.useState<'cm' | 'ft'>('cm');
  const [height, setHeight] = React.useState(profile ? (profile.heightCm / 30.48).toFixed(2) : '');

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname || '');
      setWeight(profile.bodyWeightKg.toString());
      setAge(profile.age.toString());
      setGender(profile.gender);
      setHeightUnit('cm');
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
      Alert.alert('Invalid Height', 'Please enter a valid height greater than 0');
      return;
    }

    const heightCm = heightUnit === 'ft' ? heightNum * 30.48 : heightNum;

    await setProfile({ nickname, bodyWeightKg: weightNum, age: ageNum, gender, heightCm });
    Alert.alert('Success', 'Profile saved!');
    navigation.navigate('MainTabs');
  };

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" enableOnAndroid={true} extraScrollHeight={20} enableAutomaticScroll={true}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Update your body metrics for accurate calorie calculations</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile?.nickname || 'Set your name'}</Text>
          {profile && (
            <Text style={styles.profileMeta}>Age {profile.age} • {profile.bodyWeightKg}kg • {profile.heightCm}cm</Text>
          )}
        </View>
      </View>

      <View style={styles.form}>
        <Input label="Nickname" value={nickname} onChangeText={setNickname} placeholder="e.g. Razak" autoCapitalize="words" />
        <Input label="Body Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="decimal-pad" placeholder="e.g. 70" />
        <Input label="Age" value={age} onChangeText={setAge} keyboardType="number-pad" placeholder="e.g. 25" />

        <View style={styles.heightSection}>
          <View style={styles.heightHeader}>
            <Text style={styles.label}>Height</Text>
            <View style={styles.unitToggle}>
              <TouchableOpacity
                style={[styles.unitBtn, heightUnit === 'cm' && styles.unitBtnActive]}
                onPress={() => {
                  if (heightUnit === 'ft') {
                    const ft = parseFloat(height);
                    setHeightUnit('cm');
                    setHeight(height !== '' && !isNaN(ft) ? (ft * 30.48).toFixed(1) : '');
                  }
                }}
              >
                <Text style={[styles.unitBtnText, heightUnit === 'cm' && styles.unitBtnTextActive]}>cm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.unitBtn, heightUnit === 'ft' && styles.unitBtnActive]}
                onPress={() => {
                  if (heightUnit === 'cm') {
                    const cm = parseFloat(height);
                    setHeightUnit('ft');
                    setHeight(height !== '' && !isNaN(cm) ? (cm / 30.48).toFixed(2) : '');
                  }
                }}
              >
                <Text style={[styles.unitBtnText, heightUnit === 'ft' && styles.unitBtnTextActive]}>ft</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Input
            value={height}
            onChangeText={setHeight}
            keyboardType="decimal-pad"
            placeholder={heightUnit === 'cm' ? 'e.g. 175' : 'e.g. 5.75'}
          />
          {heightUnit === 'ft' && (
            <Text style={styles.heightHint}>
              5'6" = 5.5 ft • 5'9" = 5.75 ft • 6'0" = 6.0 ft
            </Text>
          )}
        </View>

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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing['2xl'], paddingBottom: spacing['4xl'] },
  header: { marginBottom: spacing['2xl'] },
  title: { ...typography.h1, color: colors.text, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textSecondary },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.xl, marginBottom: spacing['2xl'], borderWidth: 1, borderColor: colors.border },
  profileIcon: { width: 56, height: 56, borderRadius: radii.full, backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center', marginRight: spacing.lg },
  profileIconText: { fontSize: 24 },
  profileInfo: { flex: 1 },
  profileName: { ...typography.h4, color: colors.text, marginBottom: spacing.xs },
  profileMeta: { ...typography.caption, color: colors.textMuted },
  form: { flex: 1 },
  label: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.sm, marginTop: spacing.md },
  heightSection: { marginBottom: spacing.lg },
  heightHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  unitToggle: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radii.sm, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  unitBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  unitBtnActive: { backgroundColor: colors.primary },
  unitBtnText: { ...typography.caption, color: colors.textSecondary },
  unitBtnTextActive: { color: colors.white },
  heightHint: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  genderRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  genderBtn: { flex: 1, padding: spacing.lg, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center' },
  genderBtnActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  genderText: { color: colors.textSecondary, fontSize: 15 },
  genderTextActive: { color: colors.primary, fontWeight: '600' },
  spacer: { height: spacing['2xl'] },
});

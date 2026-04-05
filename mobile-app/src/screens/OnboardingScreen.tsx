import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../store/appStore';
import { colors, spacing, radii, typography } from '../theme';
import { Button, Input } from '../components/ui';

const { width } = Dimensions.get('window');

const slides = [
  { title: 'Track Every Rep', subtitle: 'Enter weight, sets, and reps — see calories update live as you lift.', emoji: '🏋️' },
  { title: 'Real Science', subtitle: 'Uses MET values, Epley 1RM formula, and EPOC afterburn for accurate estimates.', emoji: '🔬' },
  { title: 'See Your Progress', subtitle: 'Review past workouts and track your weekly calorie burn trends.', emoji: '📊' },
];

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');

  const handleFinish = async () => {
    const weightNum = parseFloat(weight);
    const ageNum = parseInt(age, 10);
    const heightNum = parseFloat(height);
    if (!weightNum || !ageNum || !heightNum) return;

    const heightCm = heightUnit === 'ft' ? heightNum * 30.48 : heightNum;

    await useAppStore.getState().setProfile({
      nickname, bodyWeightKg: weightNum, age: ageNum, gender, heightCm,
    });
    navigation.replace('Home');
  };

  const slide = slides[step];

  if (step < slides.length) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.primaryMutedStrong, colors.transparent]}
          style={styles.glow}
        />
        <View style={styles.slideContent}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{slide.emoji}</Text>
          </View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>

        <Button variant="primary" size="lg" fullWidth onPress={() => setStep(step + 1)}>
          {step === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Set Up Your Profile</Text>
        <Text style={styles.formSubtitle}>We need a few details to calculate your calorie burn accurately</Text>
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
                  const cm = parseFloat(height);
                  if (!isNaN(cm)) {
                    setHeightUnit('cm');
                    setHeight(cm.toString());
                  }
                }}
              >
                <Text style={[styles.unitBtnText, heightUnit === 'cm' && styles.unitBtnTextActive]}>cm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.unitBtn, heightUnit === 'ft' && styles.unitBtnActive]}
                onPress={() => {
                  const cm = parseFloat(height);
                  if (!isNaN(cm)) {
                    setHeightUnit('ft');
                    setHeight((cm / 30.48).toFixed(2));
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
        <Button variant="primary" size="lg" fullWidth onPress={handleFinish} disabled={!weight || !age || !height}>
          Start Tracking
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing['2xl'], justifyContent: 'center' },
  glow: { position: 'absolute', top: -100, left: -100, right: -100, height: 300, borderRadius: radii.full },
  slideContent: { alignItems: 'center', marginBottom: spacing['4xl'] },
  emojiContainer: { width: 120, height: 120, borderRadius: radii.full, backgroundColor: colors.primaryMuted, alignItems: 'center', justifyContent: 'center', marginBottom: spacing['3xl'] },
  emoji: { fontSize: 56 },
  title: { ...typography.h1, color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  subtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center', lineHeight: 26, maxWidth: width * 0.8 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing['3xl'] },
  dot: { width: 8, height: 8, borderRadius: radii.full, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 24 },
  formHeader: { marginBottom: spacing['3xl'] },
  formTitle: { ...typography.h1, color: colors.text, textAlign: 'center', marginBottom: spacing.sm },
  formSubtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
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

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
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
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');

  const handleFinish = async () => {
    const weightNum = parseFloat(weight);
    const ageNum = parseInt(age, 10);
    const heightNum = parseFloat(height);
    if (!weightNum || !ageNum || !heightNum) return;

    await useAppStore.getState().setProfile({
      bodyWeightKg: weightNum, age: ageNum, gender, heightCm: heightNum,
    });
    navigation.replace('Home');
  };

  const slide = slides[step];

  if (step < slides.length) {
    return (
      <View style={styles.container}>
        <View style={styles.slideContent}>
          <Text style={styles.emoji}>{slide.emoji}</Text>
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
      <Text style={styles.formTitle}>Set Up Your Profile</Text>

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
      <Button variant="primary" size="lg" fullWidth onPress={handleFinish} disabled={!weight || !age || !height}>
        Start Tracking
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing['2xl'], justifyContent: 'center' },
  slideContent: { alignItems: 'center', marginBottom: spacing['4xl'] },
  emoji: { fontSize: 72, marginBottom: spacing['3xl'] },
  title: { ...typography.h1, color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  subtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'center', lineHeight: 26, maxWidth: width * 0.8 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing['3xl'] },
  dot: { width: 8, height: 8, borderRadius: radii.full, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 24 },
  formTitle: { ...typography.h1, color: colors.text, textAlign: 'center', marginBottom: spacing['3xl'] },
  label: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.sm, marginTop: spacing.md },
  genderRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  genderBtn: { flex: 1, padding: spacing.lg, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center' },
  genderBtnActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  genderText: { color: colors.textSecondary, fontSize: 15 },
  genderTextActive: { color: colors.primary, fontWeight: '600' },
  spacer: { height: spacing['2xl'] },
});

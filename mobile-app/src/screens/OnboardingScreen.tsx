import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useAppStore } from '../store/appStore';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Track Every Rep',
    subtitle: 'Enter weight, sets, and reps — see calories update live as you lift.',
    emoji: '🏋️',
  },
  {
    title: 'Real Science',
    subtitle: 'Uses MET values, Epley 1RM formula, and EPOC afterburn for accurate estimates.',
    emoji: '🔬',
  },
  {
    title: 'See Your Progress',
    subtitle: 'Review past workouts and track your weekly calorie burn trends.',
    emoji: '📊',
  },
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
      bodyWeightKg: weightNum,
      age: ageNum,
      gender,
      heightCm: heightNum,
    });

    navigation.replace('Home');
  };

  const slide = slides[step];

  if (step < slides.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>{slide.emoji}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => setStep(step + 1)}
        >
          <Text style={styles.nextBtnText}>
            {step === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Set Up Your Profile</Text>

      <Text style={styles.label}>Body Weight (kg)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
        placeholder="e.g. 70"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
        placeholder="e.g. 25"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="decimal-pad"
        placeholder="e.g. 175"
        placeholderTextColor="#666"
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

      <TouchableOpacity
        style={[styles.nextBtn, (!weight || !age || !height) && styles.nextBtnDisabled]}
        onPress={handleFinish}
        disabled={!weight || !age || !height}
      >
        <Text style={styles.nextBtnText}>Start Tracking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 40, justifyContent: 'center' },
  emoji: { fontSize: 80, textAlign: 'center', marginBottom: 32 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 16 },
  subtitle: { fontSize: 18, color: '#aaa', textAlign: 'center', lineHeight: 28, marginBottom: 40 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 40 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#333' },
  dotActive: { backgroundColor: '#4CAF50', width: 24 },
  nextBtn: { backgroundColor: '#4CAF50', borderRadius: 16, padding: 20, alignItems: 'center' },
  nextBtnDisabled: { opacity: 0.5 },
  nextBtnText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  formTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 32 },
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
});

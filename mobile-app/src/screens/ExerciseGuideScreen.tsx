import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { getExerciseGuide } from '../data/exerciseGuides';
import EXERCISE_GIFS, { EXERCISE_VERIFIED_NAMES } from '../data/exerciseGifs';
import { colors, spacing, radii, typography } from '../theme';
import { Card, Badge } from '../components/ui';

export default function ExerciseGuideScreen({ route }: { route: any }) {
  const { exerciseKey } = route.params;
  const guide = getExerciseGuide(exerciseKey);
  const [gifError, setGifError] = useState(false);

  const localGif = EXERCISE_GIFS[exerciseKey] || null;

  if (!guide) {
    return (
      <View style={styles.container}>
        <Card variant="glass" style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>📖</Text>
          <Text style={styles.emptyText}>No guide available</Text>
          <Text style={styles.emptySubtext}>Instructions for this exercise are coming soon</Text>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero GIF Section */}
      <View style={styles.heroSection}>
        {localGif && !gifError ? (
          <>
            <Image
              source={localGif}
              style={styles.heroGif}
              contentFit="contain"
              onError={() => setGifError(true)}
            />
            <LinearGradient
              colors={['transparent', 'rgba(9,9,11,0.95)']}
              style={styles.heroGradient}
            />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>{EXERCISE_VERIFIED_NAMES[exerciseKey] || guide.name}</Text>
              <View style={styles.heroBadges}>
                <Badge variant="primary">{guide.muscle}</Badge>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.heroPlaceholder}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.heroPlaceholderText}>Loading animation...</Text>
          </View>
        )}
      </View>

      {/* Quick Info Strip */}
      <View style={styles.infoStrip}>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>🎯</Text>
          <Text style={styles.infoLabel}>Focus</Text>
          <Text style={styles.infoValue}>{guide.muscle}</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>📋</Text>
          <Text style={styles.infoLabel}>Steps</Text>
          <Text style={styles.infoValue}>{guide.steps.length}</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoLabel}>Tips</Text>
          <Text style={styles.infoValue}>{guide.tips.length}</Text>
        </View>
      </View>

      {/* Steps Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How To Do It</Text>
        <Card variant="elevated" style={styles.stepsCard}>
          {guide.steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepCircleText}>{index + 1}</Text>
              </View>
              <View style={styles.stepLine}>
                {index < guide.steps.length - 1 && <View style={styles.stepLineInner} />}
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </Card>
      </View>

      {/* Pro Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pro Tips</Text>
        <Card variant="primary" style={styles.tipsCard}>
          {guide.tips.map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <Text style={styles.tipIcon}>✓</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </Card>
      </View>

      {/* Common Mistakes Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Mistakes</Text>
        <Card variant="elevated" style={styles.mistakesCard}>
          {guide.mistakes.map((mistake, index) => (
            <View key={index} style={styles.mistakeRow}>
              <Text style={styles.mistakeIcon}>✕</Text>
              <Text style={styles.mistakeText}>{mistake}</Text>
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing['4xl'] },

  // Hero Section
  heroSection: { width: '100%', height: 280, backgroundColor: colors.surface, position: 'relative' },
  heroGif: { width: '100%', height: '100%' },
  heroGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 140 },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing['2xl'], paddingBottom: spacing.lg },
  heroTitle: { ...typography.h2, color: colors.white, marginBottom: spacing.sm },
  heroBadges: { flexDirection: 'row', gap: spacing.sm },
  heroPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heroPlaceholderText: { ...typography.caption, color: colors.textMuted, marginTop: spacing.md },

  // Info Strip
  infoStrip: { flexDirection: 'row', backgroundColor: colors.surface, margin: spacing.lg, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border },
  infoItem: { flex: 1, alignItems: 'center', paddingVertical: spacing.lg },
  infoIcon: { fontSize: 18, marginBottom: spacing.xs },
  infoLabel: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.xs },
  infoValue: { ...typography.h4, color: colors.primary },
  infoDivider: { width: 1, backgroundColor: colors.border },

  // Sections
  section: { paddingHorizontal: spacing['2xl'], marginBottom: spacing['2xl'] },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.lg },

  // Steps Card
  stepsCard: { padding: spacing.lg, paddingLeft: spacing.xl },
  stepRow: { flexDirection: 'row', marginBottom: spacing.lg },
  stepCircle: { width: 32, height: 32, borderRadius: radii.full, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 },
  stepCircleText: { ...typography.caption, color: colors.white, fontWeight: '800', fontSize: 14 },
  stepLine: { width: 2, marginLeft: 15, flexShrink: 0 },
  stepLineInner: { width: 2, flex: 1, backgroundColor: colors.primaryMuted, marginTop: spacing.md, marginBottom: spacing.md },
  stepText: { ...typography.body, color: colors.textSecondary, flex: 1, lineHeight: 22, paddingLeft: spacing.md, paddingTop: spacing.xs },

  // Tips Card
  tipsCard: { padding: spacing.lg },
  tipRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md, alignItems: 'flex-start' },
  tipIcon: { color: colors.primary, fontSize: 18, fontWeight: '700', marginTop: 2, flexShrink: 0 },
  tipText: { ...typography.body, color: colors.textSecondary, flex: 1, lineHeight: 22 },

  // Mistakes Card
  mistakesCard: { padding: spacing.lg, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)', backgroundColor: colors.dangerMuted },
  mistakeRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md, alignItems: 'flex-start' },
  mistakeIcon: { color: colors.danger, fontSize: 18, fontWeight: '700', marginTop: 2, flexShrink: 0 },
  mistakeText: { ...typography.body, color: colors.textSecondary, flex: 1, lineHeight: 22 },

  // Empty State
  emptyCard: { alignItems: 'center', padding: spacing['3xl'], marginTop: spacing['4xl'], marginHorizontal: spacing['2xl'] },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.lg },
  emptyText: { ...typography.h4, color: colors.text, marginBottom: spacing.sm },
  emptySubtext: { ...typography.bodySm, color: colors.textMuted, textAlign: 'center' },
});

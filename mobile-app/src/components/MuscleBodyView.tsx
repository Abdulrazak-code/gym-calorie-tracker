import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BodyHighlighter from 'react-native-body-highlighter';
import type { ExtendedBodyPart, Slug } from 'react-native-body-highlighter';
import { colors, spacing, radii } from '../theme';

const MUSCLE_MAP: Record<string, Slug[]> = {
  full_body: ['chest', 'biceps', 'triceps', 'trapezius', 'abs', 'obliques', 'quadriceps', 'hamstring', 'calves', 'upper-back', 'gluteal', 'lower-back', 'forearm', 'deltoids'],
  chest: ['chest', 'triceps', 'deltoids'],
  back: ['upper-back', 'trapezius', 'biceps', 'lower-back'],
  arms: ['biceps', 'triceps', 'forearm'],
  shoulders: ['deltoids', 'trapezius'],
  lower_body: ['quadriceps', 'hamstring', 'calves', 'gluteal'],
  upper_body: ['chest', 'biceps', 'triceps', 'deltoids', 'trapezius', 'upper-back', 'forearm'],
  abs: ['abs', 'obliques'],
  v_taper: ['upper-back', 'deltoids', 'trapezius'],
  butt: ['gluteal', 'hamstring'],
};

export default function MuscleBodyView({ categoryKey, size = 100, color = colors.primary }: { categoryKey: string; size?: number; color?: string }) {
  const slugs = MUSCLE_MAP[categoryKey] || [];

  if (slugs.length === 0) {
    return (
      <View style={[styles.container, { width: size, height: size, backgroundColor: `${color}15` }]}>
        <Text style={[styles.emoji, { fontSize: size * 0.45 }]}>🏋️</Text>
      </View>
    );
  }

  const data: ExtendedBodyPart[] = slugs.map((slug) => ({
    slug,
    color,
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <BodyHighlighter
        side="front"
        scale={0.85}
        border="none"
        data={data}
        defaultFill={`${color}12`}
        defaultStroke={`${color}22`}
        defaultStrokeWidth={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', borderRadius: radii.md, overflow: 'hidden' },
  emoji: { lineHeight: 1 },
});

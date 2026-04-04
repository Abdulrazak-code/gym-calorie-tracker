import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { colors } from '../../theme';

const BODY_OUTLINE = '#3a3a3f';
const BODY_FILL = '#1c1c1f';

interface HumanBodyProps {
  muscleGroup: string;
  size?: number;
}

export default function HumanBody({ muscleGroup, size = 120 }: HumanBodyProps) {
  const highlight = colors.primary;

  const muscles: Record<string, React.ReactNode> = {
    full_body: (
      <>
        <Path d="M60 20 C65 20 68 24 68 28 C68 32 65 36 60 36 C55 36 52 32 52 28 C52 24 55 20 60 20Z" fill={highlight} opacity={0.6} />
        <Path d="M50 40 L70 40 L72 55 L68 80 L65 100 L55 100 L52 80 L48 55Z" fill={highlight} opacity={0.4} />
        <Path d="M48 42 L35 55 L32 70 L38 72 L42 58 L48 48Z" fill={highlight} opacity={0.5} />
        <Path d="M72 42 L85 55 L88 70 L82 72 L78 58 L72 48Z" fill={highlight} opacity={0.5} />
        <Path d="M55 100 L50 115 L55 118 L58 105Z" fill={highlight} opacity={0.4} />
        <Path d="M65 100 L70 115 L65 118 L62 105Z" fill={highlight} opacity={0.4} />
      </>
    ),
    chest: (
      <Path d="M50 42 L60 42 L60 58 L50 58Z M60 42 L70 42 L70 58 L60 58Z" fill={highlight} opacity={0.5} />
    ),
    back: (
      <>
        <Path d="M48 42 L60 42 L60 70 L50 70 L45 55Z" fill={highlight} opacity={0.5} />
        <Path d="M60 42 L72 42 L75 55 L70 70 L60 70Z" fill={highlight} opacity={0.5} />
      </>
    ),
    arms: (
      <>
        <Path d="M48 42 L35 55 L32 70 L38 72 L42 58 L48 48Z" fill={highlight} opacity={0.6} />
        <Path d="M72 42 L85 55 L88 70 L82 72 L78 58 L72 48Z" fill={highlight} opacity={0.6} />
      </>
    ),
    shoulders: (
      <>
        <Path d="M48 40 L42 48 L44 52 L50 44Z" fill={highlight} opacity={0.6} />
        <Path d="M72 40 L78 48 L76 52 L70 44Z" fill={highlight} opacity={0.6} />
        <Path d="M50 40 L60 40 L60 46 L50 46Z" fill={highlight} opacity={0.4} />
        <Path d="M60 40 L70 40 L70 46 L60 46Z" fill={highlight} opacity={0.4} />
      </>
    ),
    lower_body: (
      <>
        <Path d="M52 75 L58 75 L60 95 L55 100 L50 95Z" fill={highlight} opacity={0.5} />
        <Path d="M62 75 L68 75 L70 95 L65 100 L60 95Z" fill={highlight} opacity={0.5} />
        <Path d="M50 100 L45 115 L50 118 L55 105Z" fill={highlight} opacity={0.4} />
        <Path d="M70 100 L75 115 L70 118 L65 105Z" fill={highlight} opacity={0.4} />
      </>
    ),
    upper_body: (
      <>
        <Path d="M50 42 L60 42 L60 58 L50 58Z M60 42 L70 42 L70 58 L60 58Z" fill={highlight} opacity={0.4} />
        <Path d="M48 42 L35 55 L32 70 L38 72 L42 58 L48 48Z" fill={highlight} opacity={0.4} />
        <Path d="M72 42 L85 55 L88 70 L82 72 L78 58 L72 48Z" fill={highlight} opacity={0.4} />
        <Path d="M48 40 L42 48 L44 52 L50 44Z" fill={highlight} opacity={0.4} />
        <Path d="M72 40 L78 48 L76 52 L70 44Z" fill={highlight} opacity={0.4} />
      </>
    ),
    abs: (
      <>
        <Path d="M55 58 L60 58 L60 64 L55 64Z" fill={highlight} opacity={0.5} />
        <Path d="M60 58 L65 58 L65 64 L60 64Z" fill={highlight} opacity={0.5} />
        <Path d="M55 64 L60 64 L60 70 L55 70Z" fill={highlight} opacity={0.5} />
        <Path d="M60 64 L65 64 L65 70 L60 70Z" fill={highlight} opacity={0.5} />
        <Path d="M55 70 L60 70 L60 76 L55 76Z" fill={highlight} opacity={0.5} />
        <Path d="M60 70 L65 70 L65 76 L60 76Z" fill={highlight} opacity={0.5} />
      </>
    ),
    v_taper: (
      <>
        <Path d="M48 42 L60 42 L60 55 L50 65 L45 55Z" fill={highlight} opacity={0.5} />
        <Path d="M60 42 L72 42 L75 55 L70 65 L60 55Z" fill={highlight} opacity={0.5} />
        <Path d="M48 40 L42 48 L44 52 L50 44Z" fill={highlight} opacity={0.4} />
        <Path d="M72 40 L78 48 L76 52 L70 44Z" fill={highlight} opacity={0.4} />
      </>
    ),
    butt: (
      <>
        <Path d="M52 75 L58 75 L60 85 L55 88 L50 85Z" fill={highlight} opacity={0.6} />
        <Path d="M62 75 L68 75 L70 85 L65 88 L60 85Z" fill={highlight} opacity={0.6} />
        <Path d="M52 75 L58 75 L60 95 L55 100 L50 95Z" fill={highlight} opacity={0.3} />
        <Path d="M62 75 L68 75 L70 95 L65 100 L60 95Z" fill={highlight} opacity={0.3} />
      </>
    ),
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 120 130">
        <G>
          {/* Body outline */}
          <Circle cx="60" cy="28" r="16" fill={BODY_FILL} stroke={BODY_OUTLINE} strokeWidth="1.5" />
          <Path d="M50 48 L70 48 L72 65 L68 85 L65 105 L55 105 L52 85 L48 65Z" fill={BODY_FILL} stroke={BODY_OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
          <Path d="M48 50 L35 62 L32 78 L38 80 L42 65 L48 55Z" fill={BODY_FILL} stroke={BODY_OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
          <Path d="M72 50 L85 62 L88 78 L82 80 L78 65 L72 55Z" fill={BODY_FILL} stroke={BODY_OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
          <Path d="M55 105 L50 120 L55 123 L58 110Z" fill={BODY_FILL} stroke={BODY_OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />
          <Path d="M65 105 L70 120 L65 123 L62 110Z" fill={BODY_FILL} stroke={BODY_OUTLINE} strokeWidth="1.5" strokeLinejoin="round" />

          {/* Highlighted muscles */}
          {muscles[muscleGroup] || muscles.full_body}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});

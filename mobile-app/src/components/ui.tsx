import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii, typography, shadows } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'primary' | 'glass' | 'bordered' | 'premium';
}

export function Card({ children, style, onPress, variant = 'default' }: CardProps) {
  const variantStyles: Record<string, ViewStyle> = {
    default: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    elevated: { backgroundColor: colors.surfaceElevated, ...shadows.md },
    primary: { backgroundColor: colors.primaryMuted, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)' },
    glass: { backgroundColor: 'rgba(22, 22, 26, 0.85)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
    bordered: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' as const },
    premium: { backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.borderLight, ...shadows.lg },
  };

  if (onPress) {
    return (
      <TouchableOpacity style={[styles.card, variantStyles[variant], style]} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.card, variantStyles[variant], style]}>{children}</View>;
}

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: string;
  iconLib?: 'MaterialCommunityIcons' | 'Ionicons';
}

export function Button({ children, onPress, variant = 'primary', size = 'md', fullWidth, disabled, style, textStyle, iconName, iconLib = 'MaterialCommunityIcons' }: ButtonProps) {
  const gradientColors = variant === 'primary'
    ? [colors.primary, colors.primaryDark] as [string, string]
    : undefined;

  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: colors.transparent },
    secondary: { backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.border },
    ghost: { backgroundColor: colors.transparent },
    danger: { backgroundColor: colors.dangerMuted, borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)' },
  };

  const variantTextStyles: Record<string, TextStyle> = {
    primary: { color: colors.white },
    secondary: { color: colors.text },
    ghost: { color: colors.primary },
    danger: { color: colors.danger },
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radii.sm },
    md: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, borderRadius: radii.md },
    lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing['2xl'], borderRadius: radii.lg },
  };

  const sizeTextStyles: Record<string, TextStyle> = {
    sm: { ...typography.buttonSm },
    md: { ...typography.button },
    lg: { ...typography.button, fontSize: 17 },
  };

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;
  const iconColor = variantTextStyles[variant].color as string;

  const buttonContent = (
    <View style={styles.buttonInner}>
      {iconName && iconLib === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons name={iconName as any} size={iconSize} color={iconColor} style={{ marginRight: spacing.sm }} />
      )}
      {iconName && iconLib === 'Ionicons' && (
        <Ionicons name={iconName as any} size={iconSize} color={iconColor} style={{ marginRight: spacing.sm }} />
      )}
      <Text style={[sizeTextStyles[size], variantTextStyles[variant], textStyle, disabled && { opacity: 0.5 }]}>{children}</Text>
    </View>
  );

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.buttonFull,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {gradientColors && !disabled ? (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientFill}
        >
          {buttonContent}
        </LinearGradient>
      ) : (
        buttonContent
      )}
    </TouchableOpacity>
  );
}

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={[styles.inputLabel, focused && styles.inputLabelFocused]}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, focused && styles.inputFocused, style]}
        placeholderTextColor={colors.textMuted}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {error && <Text style={styles.inputErrorText}>{error}</Text>}
    </View>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'danger' | 'warning' | 'accent';
  style?: ViewStyle;
}

export function Badge({ children, variant = 'default', style }: BadgeProps) {
  const variantStyles: Record<string, ViewStyle> = {
    default: { backgroundColor: colors.surfaceHover },
    primary: { backgroundColor: colors.primaryMuted },
    danger: { backgroundColor: colors.dangerMuted },
    warning: { backgroundColor: colors.warningMuted },
    accent: { backgroundColor: colors.accentMuted },
  };

  const variantTextStyles: Record<string, TextStyle> = {
    default: { color: colors.textMuted },
    primary: { color: colors.primary },
    danger: { color: colors.danger },
    warning: { color: colors.warning },
    accent: { color: colors.accent },
  };

  return (
    <View style={[styles.badge, variantStyles[variant], style]}>
      <Text style={[styles.badgeText, variantTextStyles[variant]]}>{children}</Text>
    </View>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  iconName?: string;
  iconColor?: string;
  unit?: string;
}

export function StatCard({ label, value, iconName, iconColor = colors.primary, unit }: StatCardProps) {
  return (
    <Card variant="glass" style={styles.statCard}>
      {iconName && (
        <View style={[styles.statIconContainer, { backgroundColor: `${iconColor}18` }]}>
          <MaterialCommunityIcons name={iconName as any} size={20} color={iconColor} />
        </View>
      )}
      <Text style={[styles.statValue, { color: iconColor ?? colors.primary }]}>
        {value}
        {unit && <Text style={styles.statUnit}> {unit}</Text>}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radii.lg, padding: spacing.lg },
  button: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' as const },
  buttonInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  buttonFull: { width: '100%' },
  buttonDisabled: { opacity: 0.45 },
  gradientFill: { alignItems: 'center', justifyContent: 'center', width: '100%', paddingVertical: spacing.lg, paddingHorizontal: spacing['2xl'], borderRadius: radii.lg },
  inputContainer: { marginBottom: spacing.lg },
  inputLabel: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.sm },
  inputLabelFocused: { color: colors.primary },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1.5,
    borderColor: colors.border,
    lineHeight: 22,
  },
  inputFocused: { borderColor: colors.primary, backgroundColor: colors.surfaceElevated },
  inputError: { borderColor: colors.danger },
  inputErrorText: { ...typography.caption, color: colors.danger, marginTop: spacing.xs },
  badge: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radii.full, alignSelf: 'flex-start' },
  badgeText: { ...typography.caption, fontWeight: '600' as const },
  statCard: { alignItems: 'center', padding: spacing.xl, flex: 1 },
  statIconContainer: { width: 36, height: 36, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  statValue: { ...typography.h3, textAlign: 'center', letterSpacing: -0.5 },
  statUnit: { fontSize: 13, fontWeight: '500' },
  statLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs, textAlign: 'center', letterSpacing: 0.3, textTransform: 'uppercase' as const },
});

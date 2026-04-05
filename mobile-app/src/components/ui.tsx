import React from 'react';
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
import { colors, spacing, radii, typography, shadows } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'primary' | 'glass' | 'bordered';
}

export function Card({ children, style, onPress, variant = 'default' }: CardProps) {
  const variantStyles: Record<string, ViewStyle> = {
    default: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    elevated: { backgroundColor: colors.surfaceElevated, ...shadows.md },
    primary: { backgroundColor: colors.primaryMuted, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)' },
    glass: { backgroundColor: 'rgba(22, 22, 26, 0.7)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)' },
    bordered: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' as const },
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
}

export function Button({ children, onPress, variant = 'primary', size = 'md', fullWidth, disabled, style, textStyle }: ButtonProps) {
  const gradientColors = variant === 'primary'
    ? [colors.primary, colors.primaryDark] as [string, string]
    : undefined;

  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: colors.transparent },
    secondary: { backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.border },
    ghost: { backgroundColor: colors.transparent },
    danger: { backgroundColor: colors.dangerMuted },
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

  const buttonContent = (
    <Text style={[sizeTextStyles[size], variantTextStyles[variant], textStyle, disabled && { opacity: 0.5 }]}>{children}</Text>
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
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.textMuted}
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
  icon?: string;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card variant="glass" style={styles.statCard}>
      {icon && <Text style={styles.statIcon}>{icon}</Text>}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radii.lg, padding: spacing.lg },
  button: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' as const },
  buttonFull: { width: '100%' },
  buttonDisabled: { opacity: 0.5 },
  gradientFill: { alignItems: 'center', justifyContent: 'center', width: '100%', paddingVertical: spacing.lg, paddingHorizontal: spacing['2xl'], borderRadius: radii.lg },
  inputContainer: { marginBottom: spacing.lg },
  inputLabel: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.lg,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputError: { borderColor: colors.danger },
  inputErrorText: { ...typography.caption, color: colors.danger, marginTop: spacing.xs },
  badge: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radii.full, alignSelf: 'flex-start' },
  badgeText: { ...typography.caption, fontWeight: '600' as const },
  statCard: { alignItems: 'center', padding: spacing.xl, minWidth: 100, flex: 1 },
  statIcon: { fontSize: 24, marginBottom: spacing.sm },
  statValue: { ...typography.h3, color: colors.primary, textAlign: 'center' },
  statLabel: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs, textAlign: 'center' },
});

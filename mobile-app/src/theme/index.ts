export const colors = {
  background: '#0a0a0b',
  surface: '#141416',
  surfaceElevated: '#1c1c1f',
  surfaceHover: '#242428',
  border: '#2a2a2e',
  borderLight: '#3a3a3f',

  primary: '#22c55e',
  primaryMuted: 'rgba(34, 197, 94, 0.12)',
  primaryDark: '#16a34a',

  danger: '#ef4444',
  dangerMuted: 'rgba(239, 68, 68, 0.12)',

  warning: '#f59e0b',
  warningMuted: 'rgba(245, 158, 11, 0.12)',

  text: '#fafafa',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  textDisabled: '#52525b',

  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '700' as const, letterSpacing: -0.3 },
  h3: { fontSize: 20, fontWeight: '600' as const },
  h4: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodySm: { fontSize: 13, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '500' as const },
  label: { fontSize: 14, fontWeight: '500' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
  buttonSm: { fontSize: 14, fontWeight: '600' as const },
};

export const shadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 8 },
};

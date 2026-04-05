export const colors = {
  background: '#09090b',
  backgroundSecondary: '#111114',
  surface: '#16161a',
  surfaceElevated: '#1c1c21',
  surfaceHover: '#222228',
  border: '#27272a',
  borderLight: '#3f3f46',

  primary: '#10b981',
  primaryLight: '#34d399',
  primaryDark: '#059669',
  primaryMuted: 'rgba(16, 185, 129, 0.1)',
  primaryMutedStrong: 'rgba(16, 185, 129, 0.15)',
  primaryGlow: 'rgba(16, 185, 129, 0.25)',

  accent: '#8b5cf6',
  accentMuted: 'rgba(139, 92, 246, 0.1)',

  danger: '#ef4444',
  dangerMuted: 'rgba(239, 68, 68, 0.1)',

  warning: '#f59e0b',
  warningMuted: 'rgba(245, 158, 11, 0.1)',

  text: '#fafafa',
  textSecondary: '#a1a1aa',
  textMuted: '#6b7280',
  textDisabled: '#4b5563',

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
  xl: 24,
  '2xl': 32,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 30, fontWeight: '800' as const, letterSpacing: -0.8, lineHeight: 36 },
  h2: { fontSize: 24, fontWeight: '700' as const, letterSpacing: -0.5, lineHeight: 30 },
  h3: { fontSize: 20, fontWeight: '700' as const, letterSpacing: -0.3, lineHeight: 26 },
  h4: { fontSize: 17, fontWeight: '600' as const, lineHeight: 22 },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  bodySm: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  caption: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
  label: { fontSize: 14, fontWeight: '500' as const, lineHeight: 18 },
  button: { fontSize: 16, fontWeight: '700' as const, letterSpacing: -0.2 },
  buttonSm: { fontSize: 14, fontWeight: '600' as const },
  hero: { fontSize: 48, fontWeight: '900' as const, letterSpacing: -2, lineHeight: 48 },
  heroSm: { fontSize: 36, fontWeight: '800' as const, letterSpacing: -1, lineHeight: 40 },
};

export const shadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 4 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 8 },
  glow: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 4 },
};

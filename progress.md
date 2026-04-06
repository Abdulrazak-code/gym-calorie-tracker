# Gym Calorie Tracker — Progress Log

## Project Overview
A real-time calorie burn tracker for strength training that calculates calories based on actual weight lifted and reps performed — not time spent at the gym.

## Current Status
✅ Phase 0 — Python Calorie Engine (Complete)
✅ Phase 1 — Core App Skeleton (Complete)
✅ Phase 2 — WGER API Integration (Complete)
✅ Phase 3 — Complete UI Redesign (Complete)
✅ Phase 4 — Exercise GIFs & Body Highlighter (Complete)
✅ Phase 5 — Workout Logger Enhancements (Complete)
✅ Phase 6 — Exercise Guides (Complete)
✅ Phase 7 — 16 New Exercises Added (Complete)

---

## What We've Done

### Phase 0 — Python Calorie Engine ✅
- `engine/calorie_engine.py` — MET table (20 exercises), Epley 1RM, intensity classification, EPOC
- `engine/test_calorie_engine.py` — 23 unit tests, all passing
- Validated: bicep curl (70kg, 10kg, 3x10) → 22.8 kcal with EPOC

### Phase 1 — React Native App Skeleton ✅
- 7 screens: Home, Profile, Exercise Select, Workout Logger, Summary, History, Exercise Guide
- Zustand state management with AsyncStorage persistence
- TypeScript port of calorie engine (1:1 match with Python)
- Live calorie counter that updates per-set

### Phase 2 — WGER API Integration ✅
- `src/api/wger.ts` — Fetches 896+ exercises from wger.de
- Local caching with AsyncStorage (7-day TTL)
- Muscle group mapping (WGER IDs → app-friendly groups)
- Dynamic exercise loading in ExerciseSelectScreen

### Phase 3 — Complete UI Redesign ✅
- **Theme**: Refined dark palette with emerald green primary, accent purple, gradient support
- **UI Components**: Card (5 variants), Button (gradient primary), Badge, StatCard, Input
- **HomeScreen**: Gradient hero card, SVG progress ring, week stats, recent workout cards
- **OnboardingScreen**: Modern slides with emoji containers, profile setup form
- **ProfileScreen**: Clean form layout, nickname field, height unit toggle (cm/ft)
- **ExerciseSelectScreen**: 2-column grid with gradient cards, accent bars, muscle body highlighter, GIF thumbnails
- **WorkoutLoggerScreen**: Animated calorie counter, collapsible header, set table layout, compact footer
- **SummaryScreen**: Celebration hero, stats grid, exercise list, muscle group tags
- **HistoryScreen**: Weekly summary, 7-week gradient bar chart, workout list with delete

### Phase 4 — Exercise GIFs & Body Highlighter ✅
- **86 exercise GIFs** downloaded from ExerciseDB API (7.9 MB total)
- All GIFs verified and corrected (30 re-downloaded with correct exercises)
- `react-native-body-highlighter` integrated for dynamic muscle group visualization
- Each workout category shows a mini body with targeted muscles highlighted
- GIFs bundled locally — **100% offline, no internet needed**

### Phase 5 — Workout Logger Enhancements ✅
- **Animated calorie counter** with smooth transitions
- **Countdown rest timer** with presets (60s, 90s, 120s) and progress bar
- **Set type indicators** — Warmup (W), Working (dot), Drop (D), Failure (F)
- **PR badge** — Auto-detected when beating previous best
- **Last session reference** — Shows previous weight/reps as ghost placeholder
- **Delete individual sets** — × button on each set
- **Set completion checkmarks** — Green highlight on completed sets

### Phase 6 — Exercise Guides ✅
- **69 exercise guides** with step-by-step instructions, pro tips, common mistakes
- Hero GIF with gradient overlay and exercise name
- Quick info strip (Focus, Steps, Tips)
- Timeline-style step list with connected circles
- Color-coded tips (green) and mistakes (red) cards
- "How to" button on every exercise card in selection screen

### Phase 7 — 16 New Dumbbell Exercises ✅
- Added to library: dumbbell_incline_press, dumbbell_decline_press, dumbbell_deadlift, dumbbell_pullover, dumbbell_upright_row, dumbbell_scott_press, dumbbell_skull_crusher, dumbbell_incline_curl, dumbbell_step_up, dumbbell_romanian_deadlift, dumbbell_side_bend, mountain_climber, dumbbell_sumo_deadlift, dumbbell_kickback, dumbbell_squat, dumbbell_burpee
- Added to respective workout categories
- All have GIFs and instruction guides

---

## App Size
- **Exercise GIFs**: 7.9 MB (86 files)
- **Source code + assets**: ~1.5 MB
- **Estimated APK (Android)**: ~30-35 MB
- **Estimated IPA (iOS)**: ~35-45 MB
- **100% offline** — no internet required

---

## Test Results
- Python: 23/23 passing
- TypeScript: 21/21 passing
- TypeScript type check: ✅ Clean

---

## Key Decisions
- Python for the calorie engine (validated before UI)
- MET values from 2024 Compendium of Physical Activities
- Epley formula for 1RM estimation
- EPOC afterburn fixed at 7%
- Monorepo structure (engine + mobile-app)
- Zustand for state management (simple, lightweight)
- AsyncStorage for persistence (offline-first, no server needed)
- ExerciseDB API for GIFs (downloaded once, bundled locally)
- react-native-body-highlighter for muscle visualization
- expo-image for animated GIF playback

---

## Repository
- GitHub: https://github.com/Abdulrazak-code/gym-calorie-tracker
- Branch: main

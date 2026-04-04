# Gym Calorie Tracker — Progress Log

## Project Overview
A real-time calorie burn tracker for strength training that calculates calories based on actual weight lifted and reps performed — not time spent at the gym.

## Current Status
✅ Phase 0 — Python Calorie Engine (Complete)
✅ Phase 1 — Core App Skeleton (Complete)
✅ Phase 2 — WGER API Integration (Complete)
🔧 Code Review Fixes (Complete)

---

## What We've Done

### Phase 0 — Python Calorie Engine ✅
- `engine/calorie_engine.py` — MET table (20 exercises), Epley 1RM, intensity classification, EPOC
- `engine/test_calorie_engine.py` — 23 unit tests, all passing
- Validated: bicep curl (70kg, 10kg, 3x10) → 22.8 kcal with EPOC

### Phase 1 — React Native App Skeleton ✅
- 6 screens: Home, Profile, Exercise Select, Workout Logger, Summary, History
- Zustand state management with AsyncStorage persistence
- TypeScript port of calorie engine (1:1 match with Python)
- Live calorie counter that updates per-set
- Dark theme throughout

### Phase 2 — WGER API Integration ✅
- `src/api/wger.ts` — Fetches 896+ exercises from wger.de
- Local caching with AsyncStorage (7-day TTL)
- Muscle group mapping (WGER IDs → app-friendly groups)
- Dynamic exercise loading in ExerciseSelectScreen
- Search across all exercises (local + WGER)

### Code Review Fixes ✅
1. **TypeScript tests** — 21 Jest tests for calorieEngine.ts (mirrors Python tests)
2. **finishSession() per-set calculation** — Now matches live calorie counter exactly
3. **Input validation** — Rejects zero/negative weight and reps, shows warning styling
4. **README** — Full documentation with setup instructions, formula explanation, project structure
5. **app.json theme** — Changed from "light" to "dark" to match app
6. **Cancel confirmation** — Alert dialog before discarding workout
7. **progress.md** — Updated to reflect current status

---

## What's Next
### Phase 3 — Charts & Progress Graphs
- Victory Native for weekly calorie history
- Progress trends over time

### Phase 4 — Polish
- Smooth animations on calorie counter
- Haptic feedback on rep input
- Share workout summary (screenshot)
- App icon and splash screen
- Onboarding flow for new users

### Phase 5 — Launch (Optional)
- TestFlight / Internal Testing
- App Store / Play Store submission

### Phase 6 — AI Camera Mode (Future)
- MediaPipe pose estimation
- Auto rep counting
- Exercise recognition

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
- WGER API for exercise library (free, unlimited, cached locally)
- Zustand for state management (simple, lightweight)
- AsyncStorage for persistence (offline-first, no server needed)

---

## Repository
- GitHub: https://github.com/Abdulrazak-code/gym-calorie-tracker
- Branch: main

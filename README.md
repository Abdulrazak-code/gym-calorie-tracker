# Gym Calorie Tracker

A real-time calorie burn tracker for strength training that calculates calories based on **actual weight lifted × reps × sets** — not just time spent at the gym.

## How It Works

Most fitness apps estimate calories from duration alone. This app uses the physics of lifting:

1. **Duration estimation** — `sets × (reps × 3s) + (sets - 1) × 75s rest`
2. **MET lookup** — exercise intensity value from the 2024 Compendium of Physical Activities
3. **Epley 1RM formula** — classifies your effort as light / moderate / vigorous based on dumbbell weight
4. **Calorie calculation** — `MET × body_weight_kg × duration_hours`
5. **EPOC afterburn** — adds 7% for post-workout metabolism boost

### Example
> 70kg person | Bicep Curl | 10kg dumbbell | 3 sets × 10 reps → **~22.8 kcal**

---

## Installation

### Mobile App (React Native / Expo)

```bash
cd mobile-app
npm install
npx expo start
```

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator (Mac only)
- Scan the QR code with the Expo Go app on your phone

**Requirements:** Node.js 18+, Expo CLI (`npm install -g expo`)

### Python Calorie Engine

```bash
cd engine
pip install -r requirements.txt
python calorie_engine.py
```

**Run tests:**
```bash
cd engine
python -m pytest test_calorie_engine.py -v
```

---

## Project Structure

```
gym-calorie-tracker/
├── engine/                        # Python calorie engine (validated first)
│   ├── calorie_engine.py          # MET table, Epley 1RM, EPOC formula
│   ├── test_calorie_engine.py     # 23 unit tests
│   └── requirements.txt
│
└── mobile-app/                    # React Native app
    ├── App.tsx                    # Navigation + first-launch detection
    ├── src/
    │   ├── api/wger.ts            # WGER exercise API (896+ exercises, 7-day cache)
    │   ├── engine/
    │   │   ├── calorieEngine.ts   # TypeScript port of Python engine
    │   │   └── exercises.ts       # Exercise library + WGER integration
    │   ├── screens/
    │   │   ├── OnboardingScreen   # First-launch intro + profile setup
    │   │   ├── HomeScreen         # Dashboard, weekly stats, recent workouts
    │   │   ├── ProfileScreen      # Body weight, age, gender, height
    │   │   ├── ExerciseSelectScreen # Browse/search 896+ exercises by muscle
    │   │   ├── WorkoutLoggerScreen  # Live calorie counter, sets/reps/weight
    │   │   ├── SummaryScreen      # Post-workout breakdown + share
    │   │   └── HistoryScreen      # Past sessions + 7-week bar chart
    │   ├── store/appStore.ts      # Zustand state management
    │   └── types/index.ts         # TypeScript interfaces
    └── src/__tests__/
        └── calorieEngine.test.ts  # 21 Jest unit tests
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile Framework | React Native + Expo |
| Language | TypeScript (strict mode) |
| State Management | Zustand |
| Persistence | AsyncStorage (offline-first) |
| Exercise Library | WGER API + local cache |
| Calorie Engine | Custom MET + Epley formula |
| Python Engine | Pure Python 3 |
| Testing | pytest (Python) + Jest (TypeScript) |

---

## Test Results

```bash
# Python
cd engine && python -m pytest -v
# 23/23 passing ✅

# TypeScript
cd mobile-app && npm test
# 21/21 passing ✅
```

---

## Roadmap

- ✅ Phase 0 — Python calorie engine (validated)
- ✅ Phase 1 — Core React Native app
- ✅ Phase 2 — WGER API exercise library (896+ exercises)
- ✅ Phase 3 — Charts & workout history
- ✅ Phase 4 — Polish, onboarding, share
- ⏳ Phase 5 — App Store / Play Store launch
- 🔮 Phase 6 — AI Camera Mode (MediaPipe pose estimation, auto rep counting)

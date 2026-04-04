# 🏋️ Gym Calorie Tracker

A real-time calorie burn tracker for strength training. Calculates calories based on **actual weight lifted × reps × sets** — not just time spent at the gym.

## How It Works

Most fitness apps estimate calories from **duration** alone. This app uses a scientifically-grounded formula:

1. **Duration estimation** — `sets × (reps × 3s) + (sets - 1) × 75s rest`
2. **MET lookup** — Each exercise has a Metabolic Equivalent value from the 2024 Compendium of Physical Activities
3. **Intensity adjustment** — Epley 1RM formula classifies effort as light/moderate/vigorous, adjusting MET accordingly
4. **Calorie calculation** — `MET × body_weight_kg × duration_hours`
5. **EPOC afterburn** — +7% for post-exercise oxygen consumption

### Example

> 70kg person, Bicep Curl, 10kg dumbbell, 3×10 reps
>
> Duration: 240s | 1RM: 13.3kg | 75% → Vigorous → MET: 4.55
>
> Active: 21.3 kcal | With EPOC: **22.8 kcal**

Lift 20kg instead → intensity goes up → more calories burned.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native (Expo) |
| Language | TypeScript |
| State | Zustand |
| Storage | AsyncStorage |
| Navigation | React Navigation |
| Exercise Data | WGER API (cached locally) |
| Calorie Engine | Custom TypeScript module |

## Project Structure

```
├── engine/                    # Python calorie engine (Phase 0)
│   ├── calorie_engine.py      # Core formula implementation
│   ├── test_calorie_engine.py # 23 unit tests
│   └── requirements.txt
├── mobile-app/                # React Native app (Phase 1+)
│   ├── src/
│   │   ├── api/wger.ts        # WGER API service with caching
│   │   ├── engine/            # TypeScript calorie engine
│   │   ├── screens/           # App screens
│   │   ├── store/             # Zustand state management
│   │   └── types/             # TypeScript interfaces
│   └── src/__tests__/         # Jest tests
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.10+ (for the calorie engine tests)
- Expo Go app on your phone (for mobile testing)

### Mobile App

```bash
cd mobile-app
npm install
npx expo start
```

Then scan the QR code with Expo Go on your phone, or press `w` for web.

### Python Calorie Engine

```bash
cd engine
pip install -r requirements.txt
python -m pytest test_calorie_engine.py -v
```

### TypeScript Tests

```bash
cd mobile-app
npx jest
```

## Screens

1. **Home** — Dashboard with "Start Workout" and recent sessions
2. **Profile** — Body weight, age, gender, height setup
3. **Exercise Select** — Browse/search 896+ exercises from WGER API (cached)
4. **Workout Logger** — Enter sets/reps/weight with **live calorie counter**
5. **Summary** — Full session breakdown (active + EPOC calories, duration, muscles)
6. **History** — Past workouts with delete option

## Development Phases

- [x] Phase 0 — Validate calorie formula (Python)
- [x] Phase 1 — Core app skeleton (6 screens)
- [x] Phase 2 — WGER API integration (896+ exercises, cached)
- [ ] Phase 3 — Charts & progress graphs
- [ ] Phase 4 — Polish (animations, haptics, sharing)
- [ ] Phase 5 — Launch
- [ ] Phase 6 — AI Camera Mode (optional)

## License

MIT

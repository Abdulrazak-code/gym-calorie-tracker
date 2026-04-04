# Gym Calorie Tracker — Progress Log
## Project Overview
A real-time calorie burn tracker for strength training that calculates calories based on actual weight lifted and reps performed — not time spent at the gym.
## Current Status
Phase 0 — Python Calorie Engine (In Progress)
---
## What We've Done
### 1. Project Planning
- Read and analyzed the master document (GYM-CALORIE-TRACKER-MASTER.md)
- Reviewed all 6 phases of the development roadmap
- Defined the core formula: MET + Epley 1RM + EPOC afterburn
### 2. Phase 0 — Detailed Planning
- Designed the complete Python calorie engine architecture
- Defined 5 core functions: estimate_duration, calculate_1rm, classify_intensity, apply_epoc, calories_burned
- Created MET_TABLE with all 20 exercises from the master document
- Designed comprehensive test suite with 15+ unit tests
- Validated the expected output: bicep curl (70kg, 10kg, 3x10) → ~22.8 kcal with EPOC
### 3. Files Created
| File | Status | Purpose |
|------|--------|---------|
| requirements.txt | Created | Contains pytest |
| calorie_engine.py | Pending | Core calculation module |
| test_calorie_engine.py | Pending | Unit tests |
### 4. Environment Setup
- Python 3.14.3 available
- pip 25.3 available
- pytest needs to be installed
- Project directory created: C:\Users\razak\Documents\gym-calorie-tracker\
---
## What's Next
### Immediate Next Steps
1. Create calorie_engine.py with MET_TABLE and all 5 functions
2. Create test_calorie_engine.py with full test suite
3. Install pytest: pip install pytest
4. Run tests: python -m pytest -v
5. Validate the bicep curl example matches ~22.8 kcal
### After Phase 0 Validation
- Move to Phase 1: React Native app skeleton
- Set up Expo project
- Build profile screen, exercise browser, workout logger
- Connect UI to the validated calorie engine
---
## Key Decisions Made
- Python for the calorie engine (validated before UI)
- MET values from 2024 Compendium of Physical Activities
- Epley formula for 1RM estimation
- EPOC afterburn fixed at 7%
- Intensity thresholds: light (<40%), moderate (40-70%), vigorous (>70%)
- Multipliers: 1.0, 1.175, 1.30
---
## Reference
- Master Document: C:\Users\razak\Downloads\GYM-CALORIE-TRACKER-MASTER.md
- Project Directory: C:\Users\razak\Documents\gym-calorie-tracker\
---
Save this as PROGRESS.md in C:\Users\razak\Documents\gym-calorie-tracker\.
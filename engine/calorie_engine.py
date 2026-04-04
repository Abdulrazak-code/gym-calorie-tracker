MET_TABLE = {
    "bicep_curl": {"met": 3.5, "muscle": "Biceps", "equipment": "Dumbbell"},
    "hammer_curl": {"met": 3.5, "muscle": "Biceps", "equipment": "Dumbbell"},
    "concentration_curl": {"met": 3.5, "muscle": "Biceps", "equipment": "Dumbbell"},
    "shoulder_press": {"met": 4.5, "muscle": "Shoulders", "equipment": "Dumbbell"},
    "lateral_raise": {"met": 3.5, "muscle": "Shoulders", "equipment": "Dumbbell"},
    "front_raise": {"met": 3.5, "muscle": "Shoulders", "equipment": "Dumbbell"},
    "bent_over_row": {"met": 4.5, "muscle": "Back", "equipment": "Dumbbell/Barbell"},
    "lat_pulldown": {"met": 3.5, "muscle": "Back", "equipment": "Machine"},
    "seated_row": {"met": 4.5, "muscle": "Back", "equipment": "Machine"},
    "chest_press": {"met": 4.5, "muscle": "Chest", "equipment": "Dumbbell"},
    "bench_press": {"met": 4.5, "muscle": "Chest", "equipment": "Barbell"},
    "chest_fly": {"met": 3.5, "muscle": "Chest", "equipment": "Dumbbell"},
    "tricep_pushdown": {"met": 3.5, "muscle": "Triceps", "equipment": "Machine"},
    "overhead_tricep_extension": {"met": 3.5, "muscle": "Triceps", "equipment": "Dumbbell"},
    "squat": {"met": 5.0, "muscle": "Legs", "equipment": "Barbell/Bodyweight"},
    "deadlift": {"met": 5.0, "muscle": "Legs/Back", "equipment": "Barbell"},
    "leg_press": {"met": 4.0, "muscle": "Legs", "equipment": "Machine"},
    "circuit_supersets": {"met": 5.8, "muscle": "Full Body", "equipment": "Any"},
    "vigorous_lifting": {"met": 6.0, "muscle": "Full Body", "equipment": "Any"},
    "kettlebell_swings": {"met": 9.8, "muscle": "Full Body", "equipment": "Kettlebell"},
}
def estimate_duration(sets, reps, rest_time=75, rep_time=3):
    """Returns estimated session duration in seconds."""
    return sets * (reps * rep_time) + (sets - 1) * rest_time
def calculate_1rm(weight, reps):
    """Epley formula: 1RM = weight * (1 + reps/30)"""
    return weight * (1 + reps / 30)
def classify_intensity(weight, reps):
    """Returns intensity level and MET multiplier."""
    one_rm = calculate_1rm(weight, reps)
    if one_rm == 0:
        return "light", 1.0
    pct = weight / one_rm
    if pct < 0.40:
        return "light", 1.0
    elif pct < 0.70:
        return "moderate", 1.175
    else:
        return "vigorous", 1.30
def apply_epoc(calories):
    """Add 7% EPOC afterburn."""
    return calories * 1.07
def calories_burned(exercise_key, sets, reps, body_weight_kg, dumbbell_weight_kg):
    """Main calculation function.
    Returns dict with active_cal, epoc_cal, total_cal, duration_sec, intensity, adjusted_met.
    """
    if exercise_key not in MET_TABLE:
        raise ValueError(f"Unknown exercise: {exercise_key}")
    exercise = MET_TABLE[exercise_key]
    base_met = exercise["met"]
    duration_sec = estimate_duration(sets, reps)
    duration_hours = duration_sec / 3600
    intensity, multiplier = classify_intensity(dumbbell_weight_kg, reps)
    adjusted_met = base_met * multiplier
    active_cal = adjusted_met * body_weight_kg * duration_hours
    total_cal = apply_epoc(active_cal)
    epoc_cal = total_cal - active_cal
    return {
        "exercise": exercise_key,
        "sets": sets,
        "reps": reps,
        "body_weight_kg": body_weight_kg,
        "dumbbell_weight_kg": dumbbell_weight_kg,
        "base_met": base_met,
        "adjusted_met": adjusted_met,
        "intensity": intensity,
        "duration_sec": duration_sec,
        "active_cal": round(active_cal, 2),
        "epoc_cal": round(epoc_cal, 2),
        "total_cal": round(total_cal, 2),
    }
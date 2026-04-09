import pytest
from calorie_engine import (
    MET_TABLE,
    estimate_duration,
    calculate_1rm,
    classify_intensity,
    apply_epoc,
    calories_burned,
)
class TestEstimateDuration:
    def test_basic_3x10(self):
        assert estimate_duration(3, 10) == 240
    def test_4x8(self):
        assert estimate_duration(4, 8) == 321
    def test_single_set(self):
        assert estimate_duration(1, 10) == 30
class TestCalculate1RM:
    def test_10kg_10reps(self):
        assert calculate_1rm(10, 10) == pytest.approx(13.333, rel=1e-3)
    def test_20kg_10reps(self):
        assert calculate_1rm(20, 10) == pytest.approx(26.667, rel=1e-3)
    def test_zero_reps(self):
        assert calculate_1rm(50, 0) == 50
class TestClassifyIntensity:
    def test_light(self):
        level, mult = classify_intensity(5, 50)
        assert level == "light"
        assert mult == 1.0
    def test_moderate(self):
        level, mult = classify_intensity(10, 15)
        assert level == "moderate"
        assert mult == 1.175
    def test_vigorous(self):
        level, mult = classify_intensity(15, 10)
        assert level == "vigorous"
        assert mult == 1.30
    def test_zero_weight(self):
        level, mult = classify_intensity(0, 10)
        assert level == "light"
        assert mult == 1.0
class TestApplyEpoc:
    def test_seven_percent(self):
        assert apply_epoc(100) == 107
    def test_zero(self):
        assert apply_epoc(0) == 0
class TestCaloriesBurned:
    def test_bicep_curl_70kg_10kg_3x10(self):
        result = calories_burned("bicep_curl", 3, 10, 70, 10)
        assert result["intensity"] == "vigorous"
        assert result["duration_sec"] == 240
        assert result["total_cal"] == pytest.approx(22.8, abs=0.5)
    def test_shoulder_press_80kg_15kg_3x10(self):
        result = calories_burned("shoulder_press", 3, 10, 80, 15)
        assert result["intensity"] == "vigorous"
        assert result["total_cal"] > 0
    def test_squat_80kg_60kg_3x10(self):
        result = calories_burned("squat", 3, 10, 80, 60)
        assert result["intensity"] == "vigorous"
        assert result["total_cal"] > 0
    def test_bent_over_row(self):
        result = calories_burned("bent_over_row", 3, 10, 80, 20)
        assert result["total_cal"] > 0
    def test_chest_press(self):
        result = calories_burned("chest_press", 3, 10, 80, 20)
        assert result["total_cal"] > 0
    def test_zero_dumbbell_weight(self):
        result = calories_burned("bicep_curl", 3, 10, 70, 0)
        assert result["intensity"] == "light"
        assert result["total_cal"] > 0
    def test_unknown_exercise_raises(self):
        with pytest.raises(ValueError):
            calories_burned("nonexistent_exercise", 3, 10, 70, 10)
    def test_more_reps_burn_more(self):
        low = calories_burned("bicep_curl", 3, 5, 70, 10)
        high = calories_burned("bicep_curl", 3, 20, 70, 10)
        assert high["total_cal"] > low["total_cal"]
    def test_more_sets_burn_more(self):
        three_sets = calories_burned("bicep_curl", 3, 10, 70, 10)
        five_sets = calories_burned("bicep_curl", 5, 10, 70, 10)
        assert five_sets["total_cal"] > three_sets["total_cal"]
class TestMetTable:
    def test_has_20_exercises(self):
        assert len(MET_TABLE) == 20
    def test_all_have_required_fields(self):
        for key, val in MET_TABLE.items():
            assert "met" in val
            assert "muscle" in val
            assert "equipment" in val
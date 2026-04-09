export interface ExerciseGuide {
  key: string;
  name: string;
  muscle: string;
  animationFile?: string;
  steps: string[];
  tips: string[];
  mistakes: string[];
}

export const EXERCISE_GUIDES: ExerciseGuide[] = [
  {
    key: 'bench_press',
    name: 'Bench Press',
    muscle: 'Chest',
    animationFile: 'bench_press.json',
    steps: [
      'Lie flat on the bench with your eyes directly under the bar',
      'Grip the bar slightly wider than shoulder-width apart',
      'Plant your feet flat on the floor, shoulder-width apart',
      'Unrack the bar and hold it directly over your chest with arms extended',
      'Lower the bar slowly to your mid-chest while keeping your elbows at a 45° angle',
      'Press the bar back up explosively to the starting position',
      'Repeat for desired reps',
    ],
    tips: [
      'Keep your shoulder blades squeezed together throughout the movement',
      'Maintain a slight arch in your lower back',
      'Drive through your legs for extra stability',
    ],
    mistakes: [
      'Bouncing the bar off your chest',
      'Flaring elbows out to 90° (puts stress on shoulders)',
      'Lifting your hips off the bench',
    ],
  },
  {
    key: 'incline_bench_press',
    name: 'Incline Bench Press',
    muscle: 'Chest',
    steps: [
      'Set the bench to a 30-45° incline',
      'Lie back with your feet flat on the floor',
      'Grip the bar slightly wider than shoulder-width',
      'Unrack and hold the bar over your upper chest',
      'Lower the bar to your upper chest with control',
      'Press back up to full arm extension',
    ],
    tips: [
      'A 30° incline targets the upper chest more effectively than 45°',
      'Keep your lower back in contact with the bench',
    ],
    mistakes: [
      'Setting the incline too high (turns into a shoulder press)',
      'Flaring elbows too wide',
    ],
  },
  {
    key: 'dumbbell_chest_press',
    name: 'Dumbbell Chest Press',
    muscle: 'Chest',
    steps: [
      'Lie flat on a bench holding dumbbells at chest level',
      'Plant your feet firmly on the floor',
      'Press the dumbbells up until your arms are fully extended',
      'Lower the dumbbells slowly until you feel a stretch in your chest',
      'Press back up, bringing the dumbbells together at the top',
    ],
    tips: [
      'Dumbbells allow a greater range of motion than a barbell',
      'Keep your wrists straight and aligned with your forearms',
    ],
    mistakes: [
      'Letting the dumbbells drift too far apart at the bottom',
      'Locking out elbows aggressively at the top',
    ],
  },
  {
    key: 'chest_fly',
    name: 'Chest Fly',
    muscle: 'Chest',
    steps: [
      'Lie on a flat bench holding dumbbells above your chest with palms facing each other',
      'Keep a slight bend in your elbows throughout the movement',
      'Lower the dumbbells out to the sides in a wide arc until you feel a stretch',
      'Bring the dumbbells back together above your chest using your chest muscles',
    ],
    tips: [
      'Think of hugging a large tree — maintain the arc motion',
      'Use lighter weight to focus on the stretch and squeeze',
    ],
    mistakes: [
      'Using too much weight and turning it into a press',
      'Straightening arms completely (puts stress on elbows)',
    ],
  },
  {
    key: 'push_up',
    name: 'Push-Up',
    muscle: 'Chest',
    steps: [
      'Start in a plank position with hands slightly wider than shoulder-width',
      'Keep your body in a straight line from head to heels',
      'Lower your chest toward the floor by bending your elbows',
      'Push back up to the starting position',
    ],
    tips: [
      'Engage your core and glutes to maintain a straight body line',
      'Go as deep as your mobility allows for full range of motion',
    ],
    mistakes: [
      'Sagging hips or piking hips up',
      'Half reps — go all the way down',
    ],
  },
  {
    key: 'cable_crossover',
    name: 'Cable Crossover',
    muscle: 'Chest',
    steps: [
      'Stand in the center of a cable machine with handles at shoulder height',
      'Step forward slightly with one foot for stability',
      'With a slight bend in your elbows, bring the handles together in front of you',
      'Squeeze your chest at the center, then slowly return to the starting position',
    ],
    tips: [
      'Focus on the squeeze at the center of the movement',
      'Keep your torso stable — don\'t lean forward excessively',
    ],
    mistakes: [
      'Using momentum to swing the weight',
      'Setting the cables too high or too low for the target area',
    ],
  },
  {
    key: 'decline_bench_press',
    name: 'Decline Bench Press',
    muscle: 'Chest',
    steps: [
      'Set the bench to a decline angle and secure your legs',
      'Lie back and grip the bar slightly wider than shoulder-width',
      'Unrack and lower the bar to your lower chest',
      'Press the bar back up to full extension',
    ],
    tips: [
      'The decline angle targets the lower chest fibers',
      'Keep your head stable on the bench throughout',
    ],
    mistakes: [
      'Bouncing the bar off your lower chest',
      'Gripping too narrow (shifts focus to triceps)',
    ],
  },
  {
    key: 'deadlift',
    name: 'Deadlift',
    muscle: 'Back',
    steps: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend at the hips and knees to grip the bar just outside your legs',
      'Set your back flat, chest up, and shoulders slightly in front of the bar',
      'Drive through your heels and extend your hips and knees simultaneously',
      'Stand tall with shoulders back at the top',
      'Lower the bar by pushing your hips back first, then bending your knees',
    ],
    tips: [
      'Keep the bar close to your body throughout the movement',
      'Brace your core like you\'re about to be punched',
      'Think of pushing the floor away, not pulling the bar up',
    ],
    mistakes: [
      'Rounding your lower back (dangerous for spine)',
      'Starting with hips too low (turns into a squat)',
      'Jerking the bar off the floor',
    ],
  },
  {
    key: 'bent_over_row',
    name: 'Bent-Over Row',
    muscle: 'Back',
    steps: [
      'Stand with feet shoulder-width apart, holding a barbell with an overhand grip',
      'Hinge at the hips until your torso is nearly parallel to the floor',
      'Keep your back flat and core engaged',
      'Pull the bar to your lower chest/upper abdomen',
      'Squeeze your shoulder blades together at the top',
      'Lower the bar with control to the starting position',
    ],
    tips: [
      'Think of pulling with your elbows, not your hands',
      'Keep your neck neutral — look at the floor a few feet ahead',
    ],
    mistakes: [
      'Using momentum by swinging the torso',
      'Rounding the lower back',
    ],
  },
  {
    key: 'lat_pulldown',
    name: 'Lat Pulldown',
    muscle: 'Back',
    steps: [
      'Sit at the lat pulldown machine and secure your thighs under the pads',
      'Grip the bar wider than shoulder-width with an overhand grip',
      'Pull the bar down to your upper chest while leaning slightly back',
      'Squeeze your lats at the bottom of the movement',
      'Slowly return the bar to the starting position',
    ],
    tips: [
      'Initiate the movement by driving your elbows down and back',
      'Don\'t pull the bar behind your neck (risk of shoulder injury)',
    ],
    mistakes: [
      'Pulling the bar behind the neck',
      'Using too much body weight to swing the bar down',
    ],
  },
  {
    key: 'seated_row',
    name: 'Seated Row',
    muscle: 'Back',
    steps: [
      'Sit at the cable row machine with feet on the platform',
      'Grab the handle with both hands and sit upright',
      'Pull the handle toward your lower abdomen',
      'Squeeze your shoulder blades together',
      'Slowly extend your arms back to the starting position',
    ],
    tips: [
      'Keep your chest up and shoulders back throughout',
      'Focus on pulling with your back, not your arms',
    ],
    mistakes: [
      'Rounding your back at the start of the movement',
      'Using momentum by rocking back and forth',
    ],
  },
  {
    key: 'pull_up',
    name: 'Pull-Up',
    muscle: 'Back',
    steps: [
      'Hang from a pull-up bar with hands slightly wider than shoulder-width',
      'Engage your core and pull your shoulder blades down and back',
      'Pull yourself up until your chin clears the bar',
      'Lower yourself with control to a full hang',
    ],
    tips: [
      'If you can\'t do a full pull-up, use assisted bands or a machine',
      'Focus on driving your elbows down to your sides',
    ],
    mistakes: [
      'Kipping or swinging to get up',
      'Not going to a full hang at the bottom',
    ],
  },
  {
    key: 't_bar_row',
    name: 'T-Bar Row',
    muscle: 'Back',
    steps: [
      'Straddle the T-bar with feet shoulder-width apart',
      'Bend at the hips and grip the handles',
      'Keep your back flat and chest up',
      'Pull the weight toward your chest',
      'Lower with control to the starting position',
    ],
    tips: [
      'Keep the weight close to your body',
      'Squeeze your back muscles at the top',
    ],
    mistakes: [
      'Standing too upright (reduces back engagement)',
      'Using momentum to lift the weight',
    ],
  },
  {
    key: 'single_arm_row',
    name: 'Single Arm Dumbbell Row',
    muscle: 'Back',
    steps: [
      'Place one knee and hand on a bench for support',
      'Hold a dumbbell in the free hand with arm extended',
      'Pull the dumbbell up toward your hip, keeping your elbow close to your body',
      'Squeeze your back at the top',
      'Lower the dumbbell with control',
    ],
    tips: [
      'Keep your torso parallel to the bench',
      'Pull toward your hip, not your chest',
    ],
    mistakes: [
      'Rotating your torso to lift the weight',
      'Pulling the dumbbell out to the side instead of toward the hip',
    ],
  },
  {
    key: 'shoulder_press',
    name: 'Shoulder Press',
    muscle: 'Shoulders',
    steps: [
      'Sit on a bench with back support or stand with feet shoulder-width apart',
      'Hold dumbbells at shoulder height with palms facing forward',
      'Press the dumbbells overhead until arms are fully extended',
      'Lower the dumbbells back to shoulder height with control',
    ],
    tips: [
      'Don\'t arch your lower back excessively',
      'Keep your core tight throughout the movement',
    ],
    mistakes: [
      'Arching the back too much',
      'Not lowering the dumbbells to full range of motion',
    ],
  },
  {
    key: 'lateral_raise',
    name: 'Lateral Raise',
    muscle: 'Shoulders',
    steps: [
      'Stand holding dumbbells at your sides with a slight bend in your elbows',
      'Raise the dumbbells out to the sides until they reach shoulder height',
      'Pause briefly at the top',
      'Lower the dumbbells with control',
    ],
    tips: [
      'Lead with your elbows, not your hands',
      'Use light weight — this exercise is about form, not heavy weight',
    ],
    mistakes: [
      'Using momentum by swinging the body',
      'Raising the dumbbells above shoulder height',
    ],
  },
  {
    key: 'front_raise',
    name: 'Front Raise',
    muscle: 'Shoulders',
    steps: [
      'Stand holding dumbbells in front of your thighs',
      'With a slight bend in your elbows, raise one or both dumbbells in front of you',
      'Lift until your arms are parallel to the floor',
      'Lower with control',
    ],
    tips: [
      'Keep your core engaged to prevent leaning back',
      'Alternate arms to maintain balance',
    ],
    mistakes: [
      'Swinging the weight up using momentum',
      'Raising the weights above shoulder height',
    ],
  },
  {
    key: 'upright_row',
    name: 'Upright Row',
    muscle: 'Shoulders',
    steps: [
      'Stand holding a barbell or dumbbells in front of your thighs',
      'Pull the weight straight up along your body, leading with your elbows',
      'Raise until the weight reaches chest height',
      'Lower with control',
    ],
    tips: [
      'Keep the weight close to your body',
      'Use a grip width that feels comfortable on your shoulders',
    ],
    mistakes: [
      'Pulling the weight too high (can cause shoulder impingement)',
      'Using a grip that\'s too narrow',
    ],
  },
  {
    key: 'face_pull',
    name: 'Face Pull',
    muscle: 'Shoulders',
    steps: [
      'Set a cable machine to upper chest height with a rope attachment',
      'Grab the rope with both hands and step back to create tension',
      'Pull the rope toward your face, separating the ends as you pull',
      'Squeeze your rear delts and upper back at the end',
      'Return with control',
    ],
    tips: [
      'Focus on external rotation at the end of the movement',
      'Great exercise for shoulder health and posture',
    ],
    mistakes: [
      'Pulling too heavy and using momentum',
      'Not separating the rope ends at the end',
    ],
  },
  {
    key: 'reverse_fly',
    name: 'Reverse Fly',
    muscle: 'Shoulders',
    steps: [
      'Sit on a bench and lean forward, or use a reverse fly machine',
      'Hold dumbbells with arms hanging down and a slight bend in elbows',
      'Raise the dumbbells out to the sides until arms are parallel to the floor',
      'Squeeze your shoulder blades together',
      'Lower with control',
    ],
    tips: [
      'Think of spreading your arms wide, not just lifting',
      'Use light weight for best results',
    ],
    mistakes: [
      'Using too much weight and turning it into a row',
      'Not maintaining the slight bend in elbows',
    ],
  },
  {
    key: 'arnold_press',
    name: 'Arnold Press',
    muscle: 'Shoulders',
    steps: [
      'Sit on a bench holding dumbbells at chest level with palms facing you',
      'As you press up, rotate your palms to face forward',
      'Fully extend your arms overhead',
      'Reverse the motion — rotate palms back toward you as you lower',
    ],
    tips: [
      'The rotation hits all three heads of the deltoid',
      'Keep the movement smooth and controlled',
    ],
    mistakes: [
      'Rushing the rotation',
      'Using momentum from the lower body',
    ],
  },
  {
    key: 'bicep_curl',
    name: 'Bicep Curl',
    muscle: 'Arms',
    steps: [
      'Stand holding dumbbells at your sides with palms facing forward',
      'Keep your elbows close to your torso',
      'Curl the weights up toward your shoulders',
      'Squeeze your biceps at the top',
      'Lower with control to the starting position',
    ],
    tips: [
      'Keep your upper arms completely still',
      'Focus on the mind-muscle connection with your biceps',
    ],
    mistakes: [
      'Swinging the body to lift the weight',
      'Letting your elbows drift forward',
    ],
  },
  {
    key: 'hammer_curl',
    name: 'Hammer Curl',
    muscle: 'Arms',
    steps: [
      'Stand holding dumbbells at your sides with palms facing each other (neutral grip)',
      'Keep your elbows close to your torso',
      'Curl the weights up while maintaining the neutral grip',
      'Lower with control',
    ],
    tips: [
      'Targets the brachialis and brachioradialis in addition to biceps',
      'Great for building arm thickness',
    ],
    mistakes: [
      'Rotating the wrists during the curl',
      'Swinging the body for momentum',
    ],
  },
  {
    key: 'concentration_curl',
    name: 'Concentration Curl',
    muscle: 'Arms',
    steps: [
      'Sit on a bench with legs spread',
      'Rest your elbow against the inside of your thigh',
      'Curl the dumbbell up toward your shoulder',
      'Squeeze at the top and lower slowly',
    ],
    tips: [
      'One of the best exercises for bicep peak development',
      'The thigh support prevents cheating',
    ],
    mistakes: [
      'Lifting your elbow off your thigh',
      'Using momentum',
    ],
  },
  {
    key: 'preacher_curl',
    name: 'Preacher Curl',
    muscle: 'Arms',
    steps: [
      'Sit at a preacher bench with your upper arms resting on the pad',
      'Hold a barbell or dumbbell with an underhand grip',
      'Curl the weight up until your biceps are fully contracted',
      'Lower slowly until your arms are nearly straight',
    ],
    tips: [
      'The pad prevents cheating and isolates the biceps',
      'Focus on the stretch at the bottom',
    ],
    mistakes: [
      'Lifting your upper arms off the pad',
      'Not going to full extension at the bottom',
    ],
  },
  {
    key: 'tricep_pushdown',
    name: 'Tricep Pushdown',
    muscle: 'Arms',
    steps: [
      'Stand at a cable machine with a straight bar or rope attachment',
      'Grip the attachment with palms facing down',
      'Keep your elbows tucked at your sides',
      'Push the bar/rope down until your arms are fully extended',
      'Squeeze your triceps at the bottom',
      'Return with control',
    ],
    tips: [
      'Keep your upper arms completely still',
      'With a rope, pull the ends apart at the bottom for extra contraction',
    ],
    mistakes: [
      'Leaning forward and using body weight',
      'Letting your elbows flare out',
    ],
  },
  {
    key: 'overhead_tricep_extension',
    name: 'Overhead Tricep Extension',
    muscle: 'Arms',
    steps: [
      'Sit or stand holding a dumbbell with both hands overhead',
      'Lower the dumbbell behind your head by bending your elbows',
      'Keep your upper arms close to your head',
      'Extend your arms back to the starting position',
    ],
    tips: [
      'Great stretch on the long head of the triceps',
      'Keep your elbows pointing forward, not flaring out',
    ],
    mistakes: [
      'Flaring elbows out to the sides',
      'Using too much weight and compromising form',
    ],
  },
  {
    key: 'skull_crusher',
    name: 'Skull Crusher',
    muscle: 'Arms',
    steps: [
      'Lie on a bench holding an EZ bar or dumbbells above your chest',
      'Lower the weight toward your forehead by bending your elbows',
      'Keep your upper arms perpendicular to the floor',
      'Extend your arms back to the starting position',
    ],
    tips: [
      'Lower the weight slightly behind your head for better stretch',
      'Use an EZ bar to reduce wrist strain',
    ],
    mistakes: [
      'Moving your upper arms (should stay still)',
      'Lowering the weight too fast toward your face',
    ],
  },
  {
    key: 'dips',
    name: 'Dips',
    muscle: 'Arms',
    steps: [
      'Grip the parallel bars and lift yourself up with arms extended',
      'Lower your body by bending your elbows until your shoulders are below your elbows',
      'Lean slightly forward for chest emphasis, stay upright for triceps',
      'Push back up to the starting position',
    ],
    tips: [
      'Add weight with a belt once bodyweight becomes easy',
      'Keep your shoulders down, not shrugged',
    ],
    mistakes: [
      'Going too deep and stressing the shoulder joint',
      'Flaring elbows out too wide',
    ],
  },
  {
    key: 'close_grip_bench',
    name: 'Close Grip Bench Press',
    muscle: 'Arms',
    steps: [
      'Lie on a flat bench with a narrow grip on the bar (shoulder-width or closer)',
      'Unrack and hold the bar over your chest',
      'Lower the bar to your lower chest, keeping elbows close to your body',
      'Press back up, focusing on tricep engagement',
    ],
    tips: [
      'One of the best mass builders for triceps',
      'Keep elbows tucked — don\'t let them flare out',
    ],
    mistakes: [
      'Grip too narrow (puts stress on wrists)',
      'Flaring elbows out (reduces tricep activation)',
    ],
  },
  {
    key: 'squat',
    name: 'Squat',
    muscle: 'Legs',
    steps: [
      'Position the bar on your upper back (not your neck)',
      'Stand with feet shoulder-width apart, toes slightly pointed out',
      'Brace your core and push your hips back',
      'Bend your knees and lower until your thighs are at least parallel to the floor',
      'Keep your chest up and knees tracking over your toes',
      'Drive through your heels to stand back up',
    ],
    tips: [
      'Look at a spot on the floor about 6 feet ahead to keep your neck neutral',
      'Depth matters — aim for thighs parallel or below',
      'Push your knees out, don\'t let them cave in',
    ],
    mistakes: [
      'Knees caving inward (valgus collapse)',
      'Rounding the lower back (butt wink)',
      'Rising up on your toes',
    ],
  },
  {
    key: 'leg_press',
    name: 'Leg Press',
    muscle: 'Legs',
    steps: [
      'Sit in the leg press machine with your back flat against the pad',
      'Place your feet shoulder-width apart on the platform',
      'Release the safety handles and lower the weight by bending your knees',
      'Lower until your knees are at about 90°',
      'Push through your heels to extend your legs',
    ],
    tips: [
      'Foot placement matters: higher on platform = more glutes/hamstrings, lower = more quads',
      'Never lock out your knees at the top',
    ],
    mistakes: [
      'Lifting your hips off the seat',
      'Locking out knees at the top (dangerous)',
    ],
  },
  {
    key: 'leg_curl',
    name: 'Leg Curl',
    muscle: 'Legs',
    steps: [
      'Lie face down on the leg curl machine',
      'Position the pad just above your heels',
      'Curl your legs up toward your glutes',
      'Squeeze your hamstrings at the top',
      'Lower with control',
    ],
    tips: [
      'Keep your hips pressed into the pad',
      'Focus on the contraction at the top',
    ],
    mistakes: [
      'Lifting your hips off the pad',
      'Using momentum to swing the weight',
    ],
  },
  {
    key: 'leg_extension',
    name: 'Leg Extension',
    muscle: 'Legs',
    steps: [
      'Sit on the leg extension machine with your back against the pad',
      'Position the pad just above your ankles',
      'Extend your legs until they are straight',
      'Squeeze your quads at the top',
      'Lower with control',
    ],
    tips: [
      'Great warm-up exercise before squats',
      'Hold the contraction at the top for 1-2 seconds',
    ],
    mistakes: [
      'Using momentum to kick the weight up',
      'Going too heavy (puts stress on knees)',
    ],
  },
  {
    key: 'lunges',
    name: 'Lunges',
    muscle: 'Legs',
    steps: [
      'Stand holding dumbbells at your sides',
      'Step forward with one leg and lower your hips',
      'Lower until both knees are bent at about 90°',
      'Your back knee should nearly touch the floor',
      'Push through your front foot to return to standing',
      'Alternate legs',
    ],
    tips: [
      'Keep your torso upright',
      'Your front knee should stay over your ankle, not past your toes',
    ],
    mistakes: [
      'Stepping too short (knee goes past toes)',
      'Letting the front knee cave inward',
    ],
  },
  {
    key: 'romanian_deadlift',
    name: 'Romanian Deadlift',
    muscle: 'Legs',
    steps: [
      'Stand holding a barbell at hip level with an overhand grip',
      'Keep a slight bend in your knees',
      'Push your hips back and lower the bar along your legs',
      'Lower until you feel a deep stretch in your hamstrings',
      'Drive your hips forward to return to the starting position',
    ],
    tips: [
      'Think of closing a car door with your butt',
      'The bar should stay in contact with your legs throughout',
    ],
    mistakes: [
      'Rounding the lower back',
      'Turning it into a regular deadlift by bending knees too much',
    ],
  },
  {
    key: 'bulgarian_split_squat',
    name: 'Bulgarian Split Squat',
    muscle: 'Legs',
    steps: [
      'Stand facing away from a bench, holding dumbbells',
      'Place one foot behind you on the bench',
      'Lower your back knee toward the floor',
      'Keep your front knee over your ankle',
      'Push through your front foot to return to standing',
    ],
    tips: [
      'Lean slightly forward for more glute activation',
      'Stay upright for more quad focus',
    ],
    mistakes: [
      'Letting the front knee cave inward',
      'Placing the front foot too close to the bench',
    ],
  },
  {
    key: 'calf_raise',
    name: 'Calf Raise',
    muscle: 'Calves',
    steps: [
      'Stand on a calf raise machine or holding dumbbells',
      'Rise up onto your toes as high as possible',
      'Squeeze your calves at the top',
      'Lower slowly below parallel for a full stretch',
    ],
    tips: [
      'Pause at the top and bottom for maximum effect',
      'Do them slowly — calves respond well to time under tension',
    ],
    mistakes: [
      'Bouncing at the bottom',
      'Not going through full range of motion',
    ],
  },
  {
    key: 'seated_calf_raise',
    name: 'Seated Calf Raise',
    muscle: 'Calves',
    steps: [
      'Sit on a seated calf raise machine with the pad on your thighs',
      'Place the balls of your feet on the platform',
      'Raise up onto your toes as high as possible',
      'Lower slowly below parallel',
    ],
    tips: [
      'Seated calf raises target the soleus muscle (deeper calf muscle)',
      'Hold the stretch at the bottom for 2 seconds',
    ],
    mistakes: [
      'Not going through full range of motion',
      'Using too much weight and bouncing',
    ],
  },
  {
    key: 'crunches',
    name: 'Crunches',
    muscle: 'Abs',
    steps: [
      'Lie on your back with knees bent and feet flat on the floor',
      'Place your hands behind your head or across your chest',
      'Curl your shoulders off the floor by contracting your abs',
      'Pause at the top, then lower with control',
    ],
    tips: [
      'Don\'t pull on your neck',
      'Focus on curling your ribcage toward your pelvis',
    ],
    mistakes: [
      'Pulling on the neck with your hands',
      'Lifting your entire back off the floor (turns into a sit-up)',
    ],
  },
  {
    key: 'plank',
    name: 'Plank',
    muscle: 'Abs',
    steps: [
      'Start in a forearm plank position with elbows under shoulders',
      'Keep your body in a straight line from head to heels',
      'Engage your core, glutes, and quads',
      'Hold for the desired time',
    ],
    tips: [
      'Breathe steadily — don\'t hold your breath',
      'Squeeze your glutes to prevent your hips from sagging',
    ],
    mistakes: [
      'Letting hips sag or pike up',
      'Holding your breath',
    ],
  },
  {
    key: 'russian_twist',
    name: 'Russian Twist',
    muscle: 'Abs',
    steps: [
      'Sit on the floor with knees bent and lean back slightly',
      'Hold a weight or clasp your hands together',
      'Rotate your torso to one side, then to the other',
      'Keep your core engaged throughout',
    ],
    tips: [
      'Lift your feet off the floor for more difficulty',
      'Follow your hands with your eyes for full rotation',
    ],
    mistakes: [
      'Rushing through the movement',
      'Not rotating through the full range',
    ],
  },
  {
    key: 'hanging_leg_raise',
    name: 'Hanging Leg Raise',
    muscle: 'Abs',
    steps: [
      'Hang from a pull-up bar with arms fully extended',
      'Keeping your legs straight (or slightly bent), raise them until parallel to the floor',
      'Squeeze your abs at the top',
      'Lower with control',
    ],
    tips: [
      'Bend your knees if straight-leg raises are too difficult',
      'Avoid swinging — use a controlled motion',
    ],
    mistakes: [
      'Using momentum to swing the legs up',
      'Not lowering with control',
    ],
  },
  {
    key: 'cable_crunch',
    name: 'Cable Crunch',
    muscle: 'Abs',
    steps: [
      'Kneel below a high pulley with a rope attachment',
      'Hold the rope behind your head or at your forehead',
      'Crunch down by contracting your abs, bringing your elbows toward your knees',
      'Squeeze at the bottom, then return with control',
    ],
    tips: [
      'Don\'t use your hips — keep them stationary',
      'Focus on curling your ribcage down',
    ],
    mistakes: [
      'Using hip flexors instead of abs',
      'Pulling with your arms instead of crunching',
    ],
  },
  {
    key: 'ab_wheel',
    name: 'Ab Wheel Rollout',
    muscle: 'Abs',
    steps: [
      'Kneel on the floor holding an ab wheel',
      'Slowly roll the wheel forward, extending your body',
      'Go as far as you can while maintaining a flat back',
      'Pull yourself back to the starting position using your abs',
    ],
    tips: [
      'Start with a limited range and gradually increase',
      'Keep your core tight throughout — don\'t let your back sag',
    ],
    mistakes: [
      'Letting your lower back sag (dangerous)',
      'Rolling out too far before you have the strength',
    ],
  },
  {
    key: 'hip_thrust',
    name: 'Hip Thrust',
    muscle: 'Glutes',
    steps: [
      'Sit on the ground with your upper back against a bench',
      'Roll a barbell over your hips (use a pad for comfort)',
      'Plant your feet flat on the floor, shoulder-width apart',
      'Drive through your heels and thrust your hips up',
      'Squeeze your glutes at the top',
      'Lower with control',
    ],
    tips: [
      'Tuck your chin to your chest to keep your spine neutral',
      'Pause at the top for maximum glute contraction',
    ],
    mistakes: [
      'Hyperextending the lower back at the top',
      'Pushing through the toes instead of heels',
    ],
  },
  {
    key: 'glute_bridge',
    name: 'Glute Bridge',
    muscle: 'Glutes',
    steps: [
      'Lie on your back with knees bent and feet flat on the floor',
      'Drive through your heels and lift your hips off the ground',
      'Squeeze your glutes at the top',
      'Lower with control',
    ],
    tips: [
      'Great warm-up exercise before heavy lower body work',
      'Hold the top position for 2-3 seconds',
    ],
    mistakes: [
      'Pushing through the toes instead of heels',
      'Arching the lower back instead of using glutes',
    ],
  },
  {
    key: 'cable_kickback',
    name: 'Cable Kickback',
    muscle: 'Glutes',
    steps: [
      'Attach an ankle cuff to a low cable pulley',
      'Face the machine and hold on for support',
      'Kick your leg straight back, squeezing your glute',
      'Return with control',
    ],
    tips: [
      'Keep your torso stable — don\'t lean forward',
      'Focus on the glute squeeze, not the weight',
    ],
    mistakes: [
      'Arching the lower back',
      'Using momentum to swing the leg',
    ],
  },
  {
    key: 'sumo_squat',
    name: 'Sumo Squat',
    muscle: 'Glutes',
    steps: [
      'Stand with feet wider than shoulder-width, toes pointed out',
      'Hold a dumbbell or kettlebell with both hands',
      'Lower into a squat, keeping your knees tracking over your toes',
      'Drive through your heels to stand back up',
    ],
    tips: [
      'The wide stance targets inner thighs and glutes more',
      'Keep your chest up and back straight',
    ],
    mistakes: [
      'Letting knees cave inward',
      'Rounding the lower back',
    ],
  },
  {
    key: 'kettlebell_swings',
    name: 'Kettlebell Swings',
    muscle: 'Full Body',
    steps: [
      'Stand with feet shoulder-width apart, kettlebell on the floor in front',
      'Hinge at the hips and grab the kettlebell with both hands',
      'Swing the kettlebell back between your legs',
      'Drive your hips forward explosively to swing the kettlebell to chest height',
      'Let the kettlebell swing back down and repeat',
    ],
    tips: [
      'The power comes from your hips, not your arms',
      'Keep your arms loose — they\'re just ropes',
    ],
    mistakes: [
      'Using arms to lift the kettlebell (should be hip-driven)',
      'Squatting instead of hinging',
    ],
  },
  {
    key: 'burpees',
    name: 'Burpees',
    muscle: 'Full Body',
    steps: [
      'Stand with feet shoulder-width apart',
      'Drop into a squat and place your hands on the floor',
      'Jump your feet back into a plank position',
      'Do a push-up (optional)',
      'Jump your feet back to your hands',
      'Explode up into a jump with arms overhead',
    ],
    tips: [
      'Move as fast as possible while maintaining good form',
      'Land softly on the jump to protect your joints',
    ],
    mistakes: [
      'Sagging hips during the plank',
      'Not jumping all the way up',
    ],
  },
  {
    key: 'clean_and_press',
    name: 'Clean and Press',
    muscle: 'Full Body',
    steps: [
      'Stand with feet hip-width apart, barbell on the floor',
      'Grip the bar and pull explosively, shrugging your shoulders',
      'Drop under the bar and catch it at shoulder height',
      'Stand up fully, then press the bar overhead',
      'Lower the bar back to your shoulders, then to the floor',
    ],
    tips: [
      'This is a technical lift — start light and focus on form',
      'The clean and press works nearly every muscle in the body',
    ],
    mistakes: [
      'Pulling with arms instead of legs and hips',
      'Not getting under the bar fast enough',
    ],
  },
  {
    key: 'thrusters',
    name: 'Thrusters',
    muscle: 'Full Body',
    steps: [
      'Hold dumbbells or a barbell at shoulder height',
      'Perform a full squat',
      'As you stand up, use the momentum to press the weight overhead',
      'Lower the weight back to your shoulders and repeat',
    ],
    tips: [
      'The squat and press should be one fluid motion',
      'Great metabolic conditioning exercise',
    ],
    mistakes: [
      'Pressing before standing up fully',
      'Not squatting deep enough',
    ],
  },
  {
    key: 'dumbbell_incline_press',
    name: 'Dumbbell Incline Press',
    muscle: 'Chest',
    steps: [
      'Set the bench to a 30-45° incline',
      'Lie back holding dumbbells at shoulder height',
      'Press the dumbbells up until your arms are fully extended',
      'Lower the dumbbells slowly until you feel a stretch in your upper chest',
      'Press back up, bringing the dumbbells together at the top',
    ],
    tips: [
      'A 30° incline targets the upper chest more effectively than 45°',
      'Keep your lower back in contact with the bench',
    ],
    mistakes: [
      'Setting the incline too high (turns into a shoulder press)',
      'Flaring elbows too wide',
    ],
  },
  {
    key: 'dumbbell_decline_press',
    name: 'Dumbbell Decline Press',
    muscle: 'Chest',
    steps: [
      'Set the bench to a decline angle and secure your legs',
      'Lie back holding dumbbells at chest level',
      'Press the dumbbells up until your arms are fully extended',
      'Lower the dumbbells slowly to your lower chest',
      'Press back up to the starting position',
    ],
    tips: [
      'The decline angle targets the lower chest fibers',
      'Keep your head stable on the bench throughout',
    ],
    mistakes: [
      'Bouncing the dumbbells off your lower chest',
      'Gripping too narrow (shifts focus to triceps)',
    ],
  },
  {
    key: 'dumbbell_deadlift',
    name: 'Dumbbell Deadlift',
    muscle: 'Back',
    steps: [
      'Stand with feet hip-width apart, dumbbells in front of your thighs',
      'Bend at the hips and knees to lower the dumbbells toward the floor',
      'Keep your back flat and chest up',
      'Drive through your heels and extend your hips and knees simultaneously',
      'Stand tall with shoulders back at the top',
    ],
    tips: [
      'Keep the dumbbells close to your body throughout the movement',
      'Brace your core like you\'re about to be punched',
    ],
    mistakes: [
      'Rounding your lower back (dangerous for spine)',
      'Starting with hips too low (turns into a squat)',
    ],
  },
  {
    key: 'dumbbell_pullover',
    name: 'Dumbbell Pullover',
    muscle: 'Back',
    steps: [
      'Lie perpendicular across a bench with only your upper back supported',
      'Hold a dumbbell with both hands above your chest',
      'Lower the dumbbell behind your head in a wide arc',
      'Feel the stretch in your lats and chest',
      'Pull the dumbbell back to the starting position',
    ],
    tips: [
      'Keep a slight bend in your elbows throughout',
      'Focus on the stretch in your lats',
    ],
    mistakes: [
      'Using too much weight and losing control',
      'Straightening arms completely (puts stress on elbows)',
    ],
  },
  {
    key: 'dumbbell_upright_row',
    name: 'Dumbbell Upright Row',
    muscle: 'Shoulders',
    steps: [
      'Stand holding dumbbells in front of your thighs with palms facing your body',
      'Pull the dumbbells straight up along your body, leading with your elbows',
      'Raise until the dumbbells reach chest height',
      'Lower with control to the starting position',
    ],
    tips: [
      'Keep the dumbbells close to your body',
      'Use a grip width that feels comfortable on your shoulders',
    ],
    mistakes: [
      'Pulling the dumbbells too high (can cause shoulder impingement)',
      'Using momentum to swing the weight up',
    ],
  },
  {
    key: 'dumbbell_scott_press',
    name: 'Dumbbell Scott Press',
    muscle: 'Shoulders',
    steps: [
      'Sit on a bench holding dumbbells at shoulder height with palms facing each other',
      'Press the dumbbells up while rotating your palms to face forward',
      'Fully extend your arms overhead',
      'Reverse the motion as you lower the dumbbells back to shoulder height',
    ],
    tips: [
      'The rotation hits all three heads of the deltoid',
      'Keep the movement smooth and controlled',
    ],
    mistakes: [
      'Rushing the rotation',
      'Using momentum from the lower body',
    ],
  },
  {
    key: 'dumbbell_skull_crusher',
    name: 'Dumbbell Skull Crusher',
    muscle: 'Arms',
    steps: [
      'Lie on a bench holding dumbbells above your chest with arms extended',
      'Lower the dumbbells toward your forehead by bending your elbows',
      'Keep your upper arms perpendicular to the floor',
      'Extend your arms back to the starting position',
    ],
    tips: [
      'Lower the dumbbells slightly behind your head for better stretch',
      'Use lighter weight to maintain proper form',
    ],
    mistakes: [
      'Moving your upper arms (should stay still)',
      'Lowering the dumbbells too fast toward your face',
    ],
  },
  {
    key: 'dumbbell_incline_curl',
    name: 'Dumbbell Incline Curl',
    muscle: 'Arms',
    steps: [
      'Set the bench to a 45-60° incline',
      'Lie back holding dumbbells with arms hanging straight down',
      'Curl the dumbbells up toward your shoulders',
      'Squeeze your biceps at the top',
      'Lower with control to the starting position',
    ],
    tips: [
      'The incline position provides a greater stretch on the biceps',
      'Keep your elbows stationary throughout the movement',
    ],
    mistakes: [
      'Swinging the body to lift the weight',
      'Letting your elbows drift forward',
    ],
  },
  {
    key: 'dumbbell_step_up',
    name: 'Dumbbell Step-Up',
    muscle: 'Legs',
    steps: [
      'Stand in front of a bench or box holding dumbbells at your sides',
      'Step up onto the bench with one foot, driving through your heel',
      'Bring your other foot up to meet it',
      'Step back down with the same foot, then the other',
      'Alternate legs',
    ],
    tips: [
      'Keep your torso upright throughout the movement',
      'Drive through your heel, not your toes',
    ],
    mistakes: [
      'Pushing off the back foot (reduces quad engagement)',
      'Using a bench that\'s too high',
    ],
  },
  {
    key: 'dumbbell_romanian_deadlift',
    name: 'Dumbbell Romanian Deadlift',
    muscle: 'Legs',
    steps: [
      'Stand holding dumbbells at hip level with an overhand grip',
      'Keep a slight bend in your knees',
      'Push your hips back and lower the dumbbells along your legs',
      'Lower until you feel a deep stretch in your hamstrings',
      'Drive your hips forward to return to the starting position',
    ],
    tips: [
      'Think of closing a car door with your butt',
      'The dumbbells should stay in contact with your legs throughout',
    ],
    mistakes: [
      'Rounding the lower back',
      'Turning it into a regular deadlift by bending knees too much',
    ],
  },
  {
    key: 'dumbbell_side_bend',
    name: 'Dumbbell Side Bend',
    muscle: 'Abs',
    steps: [
      'Stand holding a dumbbell in one hand at your side',
      'Bend to the side holding the dumbbell, lowering it toward your knee',
      'Return to the starting position using your obliques',
      'Complete all reps on one side, then switch',
    ],
    tips: [
      'Keep the movement controlled and slow',
      'Focus on squeezing your obliques on the way up',
    ],
    mistakes: [
      'Bending forward or backward instead of purely to the side',
      'Using momentum to swing the weight',
    ],
  },
  {
    key: 'mountain_climber',
    name: 'Mountain Climber',
    muscle: 'Abs',
    steps: [
      'Start in a plank position with arms fully extended',
      'Drive one knee toward your chest',
      'Quickly switch legs, bringing the other knee forward',
      'Continue alternating legs at a rapid pace',
      'Keep your core engaged and hips level throughout',
    ],
    tips: [
      'Keep your hips low and level — don\'t pike them up',
      'Move as fast as possible while maintaining good form',
    ],
    mistakes: [
      'Letting your hips rise too high',
      'Not bringing your knee all the way to your chest',
    ],
  },
  {
    key: 'dumbbell_sumo_deadlift',
    name: 'Dumbbell Sumo Deadlift',
    muscle: 'Glutes',
    steps: [
      'Stand with feet wider than shoulder-width, toes pointed out',
      'Hold a dumbbell with both hands between your legs',
      'Lower into a squat by bending your knees and pushing your hips back',
      'Drive through your heels to stand back up, squeezing your glutes at the top',
    ],
    tips: [
      'The wide stance targets inner thighs and glutes more',
      'Keep your chest up and back straight',
    ],
    mistakes: [
      'Letting knees cave inward',
      'Rounding the lower back',
    ],
  },
  {
    key: 'dumbbell_kickback',
    name: 'Dumbbell Standing Kickback',
    muscle: 'Glutes',
    steps: [
      'Stand holding dumbbells or leaning on a support',
      'Keeping your leg straight, kick one leg straight back',
      'Squeeze your glute at the top of the movement',
      'Return with control to the starting position',
      'Complete all reps on one side, then switch',
    ],
    tips: [
      'Keep your torso stable — don\'t lean forward',
      'Focus on the glute squeeze, not the weight',
    ],
    mistakes: [
      'Arching the lower back',
      'Using momentum to swing the leg',
    ],
  },
  {
    key: 'dumbbell_squat',
    name: 'Dumbbell Squat',
    muscle: 'Full Body',
    steps: [
      'Stand with feet shoulder-width apart holding dumbbells at your sides or at shoulder height',
      'Brace your core and push your hips back',
      'Bend your knees and lower until your thighs are at least parallel to the floor',
      'Keep your chest up and knees tracking over your toes',
      'Drive through your heels to stand back up',
    ],
    tips: [
      'Look at a spot on the floor about 6 feet ahead to keep your neck neutral',
      'Depth matters — aim for thighs parallel or below',
    ],
    mistakes: [
      'Knees caving inward (valgus collapse)',
      'Rounding the lower back (butt wink)',
    ],
  },
  {
    key: 'dumbbell_burpee',
    name: 'Dumbbell Burpee',
    muscle: 'Full Body',
    steps: [
      'Stand holding dumbbells at your sides',
      'Drop into a squat and place the dumbbells on the floor',
      'Jump your feet back into a plank position',
      'Do a push-up (optional)',
      'Jump your feet back to your hands',
      'Explode up into a jump with dumbbells overhead',
    ],
    tips: [
      'Move as fast as possible while maintaining good form',
      'Land softly on the jump to protect your joints',
    ],
    mistakes: [
      'Sagging hips during the plank',
      'Not jumping all the way up',
    ],
  },
];

export function getExerciseGuide(key: string): ExerciseGuide | undefined {
  return EXERCISE_GUIDES.find((g) => g.key === key);
}

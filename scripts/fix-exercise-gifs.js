const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost/api/v1';
const OUTPUT_DIR = path.join(__dirname, '..', 'mobile-app', 'assets', 'exercise-gifs');

// Corrected mapping with exact exercise names to search for
const EXERCISE_CORRECTIONS = {
  bench_press: { search: 'barbell bench press', name: 'Bench Press (Close Grip) - Barbell', focus: 'Triceps, Chest, Shoulders', equipment: 'Barbell, Flat Bench' },
  incline_bench_press: { search: 'incline bench press', name: 'Incline Bench Press - Barbell', focus: 'Upper Chest, Shoulders, Triceps', equipment: 'Barbell, Incline Bench' },
  dumbbell_chest_press: { search: 'dumbbell bench press', name: 'Dumbbell Chest Press', focus: 'Chest, Shoulders, Triceps', equipment: 'Dumbbells, Flat Bench' },
  chest_fly: { search: 'dumbbell fly', name: 'Dumbbell Chest Fly', focus: 'Chest, Shoulders', equipment: 'Dumbbells' },
  push_up: { search: 'push-up', name: 'Push-Up', focus: 'Chest, Shoulders, Triceps', equipment: 'Body Weight' },
  cable_crossover: { search: 'cable crossover', name: 'Cable Crossover', focus: 'Chest', equipment: 'Cable Machine' },
  decline_bench_press: { search: 'decline bench press', name: 'Decline Bench Press', focus: 'Lower Chest, Triceps', equipment: 'Barbell, Decline Bench' },
  deadlift: { search: 'barbell deadlift', name: 'Deadlift - Barbell', focus: 'Back, Glutes, Hamstrings', equipment: 'Barbell' },
  bent_over_row: { search: 'barbell bent over row', name: 'Bent-Over Row - Barbell', focus: 'Back, Traps, Biceps', equipment: 'Barbell' },
  lat_pulldown: { search: 'lat pulldown', name: 'Lat Pulldown', focus: 'Back, Biceps', equipment: 'Cable Machine' },
  seated_row: { search: 'seated cable row', name: 'Seated Cable Row', focus: 'Back, Biceps', equipment: 'Cable Machine' },
  pull_up: { search: 'pull-up', name: 'Pull-Up', focus: 'Back, Biceps', equipment: 'Pull-Up Bar' },
  t_bar_row: { search: 't-bar row', name: 'T-Bar Row', focus: 'Back, Biceps', equipment: 'T-Bar, Plates' },
  single_arm_row: { search: 'one arm dumbbell row', name: 'One-Arm Dumbbell Row', focus: 'Back, Biceps', equipment: 'Dumbbell, Bench' },
  shoulder_press: { search: 'dumbbell shoulder press', name: 'Dumbbell Shoulder Press', focus: 'Shoulders, Triceps', equipment: 'Dumbbells' },
  lateral_raise: { search: 'dumbbell lateral raise', name: 'Lateral Raise - Dumbbell', focus: 'Shoulders', equipment: 'Dumbbells' },
  front_raise: { search: 'dumbbell front raise', name: 'Front Raise - Dumbbell', focus: 'Shoulders', equipment: 'Dumbbells' },
  upright_row: { search: 'barbell upright row', name: 'Upright Row - Barbell', focus: 'Shoulders, Traps', equipment: 'Barbell' },
  face_pull: { search: 'cable face pull', name: 'Face Pull - Cable', focus: 'Rear Delts, Traps', equipment: 'Cable Machine, Rope' },
  reverse_fly: { search: 'reverse fly', name: 'Reverse Fly - Dumbbell', focus: 'Rear Delts, Upper Back', equipment: 'Dumbbells' },
  arnold_press: { search: 'arnold press', name: 'Arnold Press', focus: 'Shoulders, Triceps', equipment: 'Dumbbells' },
  bicep_curl: { search: 'dumbbell bicep curl', name: 'Bicep Curl - Dumbbell', focus: 'Biceps', equipment: 'Dumbbells' },
  hammer_curl: { search: 'hammer curl', name: 'Hammer Curl', focus: 'Biceps, Forearms', equipment: 'Dumbbells' },
  concentration_curl: { search: 'concentration curl', name: 'Concentration Curl', focus: 'Biceps', equipment: 'Dumbbell' },
  preacher_curl: { search: 'preacher curl', name: 'Preacher Curl', focus: 'Biceps', equipment: 'Preacher Bench, Barbell' },
  tricep_pushdown: { search: 'tricep pushdown', name: 'Tricep Pushdown - Cable', focus: 'Triceps', equipment: 'Cable Machine' },
  overhead_tricep_extension: { search: 'overhead tricep extension', name: 'Overhead Tricep Extension', focus: 'Triceps', equipment: 'Dumbbell or Cable' },
  skull_crusher: { search: 'skull crusher', name: 'Skull Crusher', focus: 'Triceps', equipment: 'EZ Bar, Flat Bench' },
  dips: { search: 'dips', name: 'Dips', focus: 'Chest, Triceps, Shoulders', equipment: 'Parallel Bars' },
  close_grip_bench: { search: 'close grip bench', name: 'Close Grip Bench Press', focus: 'Triceps, Chest', equipment: 'Barbell, Flat Bench' },
  squat: { search: 'barbell squat', name: 'Barbell Squat', focus: 'Quads, Glutes, Hamstrings', equipment: 'Barbell, Rack' },
  leg_press: { search: 'leg press', name: 'Leg Press', focus: 'Quads, Glutes', equipment: 'Leg Press Machine' },
  leg_curl: { search: 'leg curl', name: 'Leg Curl', focus: 'Hamstrings', equipment: 'Leg Curl Machine' },
  leg_extension: { search: 'leg extension', name: 'Leg Extension', focus: 'Quads', equipment: 'Leg Extension Machine' },
  lunges: { search: 'dumbbell lunge', name: 'Dumbbell Lunge', focus: 'Quads, Glutes, Hamstrings', equipment: 'Dumbbells' },
  romanian_deadlift: { search: 'romanian deadlift', name: 'Romanian Deadlift', focus: 'Hamstrings, Glutes, Lower Back', equipment: 'Barbell' },
  bulgarian_split_squat: { search: 'bulgarian split squat', name: 'Bulgarian Split Squat', focus: 'Quads, Glutes', equipment: 'Dumbbells, Bench' },
  calf_raise: { search: 'calf raise', name: 'Calf Raise', focus: 'Calves', equipment: 'Calf Raise Machine' },
  seated_calf_raise: { search: 'seated calf raise', name: 'Seated Calf Raise', focus: 'Calves (Soleus)', equipment: 'Seated Calf Machine' },
  crunches: { search: 'crunch', name: 'Crunches', focus: 'Abs', equipment: 'Body Weight' },
  plank: { search: 'plank', name: 'Plank', focus: 'Core, Abs', equipment: 'Body Weight' },
  russian_twist: { search: 'russian twist', name: 'Russian Twist', focus: 'Obliques, Core', equipment: 'Body Weight or Medicine Ball' },
  hanging_leg_raise: { search: 'hanging leg raise', name: 'Hanging Leg Raise', focus: 'Lower Abs, Hip Flexors', equipment: 'Pull-Up Bar' },
  cable_crunch: { search: 'cable crunch', name: 'Cable Crunch', focus: 'Abs', equipment: 'Cable Machine, Rope' },
  ab_wheel: { search: 'ab wheel', name: 'Ab Wheel Rollout', focus: 'Core, Abs', equipment: 'Ab Wheel' },
  hip_thrust: { search: 'hip thrust', name: 'Hip Thrust', focus: 'Glutes, Hamstrings', equipment: 'Barbell, Bench' },
  glute_bridge: { search: 'glute bridge', name: 'Glute Bridge', focus: 'Glutes, Hamstrings', equipment: 'Body Weight or Barbell' },
  cable_kickback: { search: 'cable kickback', name: 'Cable Kickback', focus: 'Glutes', equipment: 'Cable Machine' },
  sumo_squat: { search: 'sumo squat', name: 'Sumo Squat', focus: 'Inner Thighs, Glutes', equipment: 'Dumbbell or Kettlebell' },
  kettlebell_swings: { search: 'kettlebell swing', name: 'Kettlebell Swing', focus: 'Glutes, Hamstrings, Core', equipment: 'Kettlebell' },
  burpees: { search: 'burpee', name: 'Burpee', focus: 'Full Body', equipment: 'Body Weight' },
  clean_and_press: { search: 'clean and press', name: 'Clean and Press', focus: 'Full Body', equipment: 'Barbell' },
  thrusters: { search: 'thruster', name: 'Thruster', focus: 'Full Body', equipment: 'Barbell or Dumbbells' },
};

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      let data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(Buffer.concat(data).toString());
          resolve(json);
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(outputPath);
    protocol.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(1);
        resolve(sizeKB);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function searchExercises(query) {
  try {
    const response = await httpGet(`${API_BASE}/exercises?search=${encodeURIComponent(query)}&limit=10`);
    return response.data || [];
  } catch (err) {
    console.error(`  ❌ Search failed: ${err.message}`);
    return [];
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const mapping = {};
  let totalSize = 0;
  let successCount = 0;
  let failCount = 0;

  const entries = Object.entries(EXERCISE_CORRECTIONS);

  for (const [key, config] of entries) {
    console.log(`\n📥 [${successCount + failCount + 1}/${entries.length}] ${key}`);
    console.log(`   🔍 Searching: "${config.search}"`);

    const results = await searchExercises(config.search);

    if (results.length === 0) {
      console.log(`  ⚠️  No results found`);
      failCount++;
      continue;
    }

    // Find the best match
    let exercise = results[0];
    const searchTerms = config.search.toLowerCase().split(' ');
    for (const result of results) {
      const nameLower = result.name.toLowerCase();
      const matchesAll = searchTerms.every(term => nameLower.includes(term));
      if (matchesAll) {
        exercise = result;
        break;
      }
    }

    const gifUrl = exercise.gifUrl;
    if (!gifUrl) {
      console.log(`  ⚠️  No GIF URL for "${exercise.name}"`);
      failCount++;
      continue;
    }

    const filename = `${key}.gif`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    console.log(`  🎬 Found: "${exercise.name}"`);

    const sizeKB = await downloadGif(gifUrl, outputPath);

    if (sizeKB) {
      console.log(`  ✅ Saved: ${filename} (${sizeKB} KB)`);
      mapping[key] = {
        filename,
        sizeKB: parseFloat(sizeKB),
        exerciseName: config.name,
        focusArea: config.focus,
        equipment: config.equipment,
        targetMuscles: exercise.targetMuscles,
        bodyParts: exercise.bodyParts,
        gifUrl,
      };
      totalSize += parseFloat(sizeKB);
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ SUCCESS: ${successCount} exercises downloaded`);
  console.log(`❌ FAILED:  ${failCount} exercises`);
  console.log(`📦 TOTAL SIZE: ${(totalSize / 1024).toFixed(2)} MB`);
  console.log('='.repeat(60));

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
  console.log('\n💾 Mapping saved to mapping.json');

  // Generate HTML
  generateHtml(mapping);
}

async function downloadGif(url, outputPath) {
  try {
    return await downloadFile(url, outputPath);
  } catch (err) {
    console.error(`  ❌ Download failed: ${err.message}`);
    return null;
  }
}

function generateHtml(mapping) {
  const exercises = Object.entries(mapping).map(([key, data]) => ({
    key,
    name: data.exerciseName,
    focusArea: data.focusArea,
    equipment: data.equipment,
    gifPath: data.filename,
    targetMuscles: data.targetMuscles,
  }));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercise GIF Verification - Corrected</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #09090b; color: #fafafa; font-family: system-ui, -apple-system, sans-serif; padding: 20px; }
        h1 { text-align: center; margin-bottom: 8px; font-size: 28px; }
        .subtitle { text-align: center; color: #6b7280; margin-bottom: 24px; font-size: 14px; }
        .controls { text-align: center; margin-bottom: 24px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .controls input { background: #16161a; border: 1px solid #27272a; color: #fff; padding: 10px 14px; border-radius: 8px; width: 280px; font-size: 14px; }
        .controls button { background: #10b981; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; }
        .controls button:hover { opacity: 0.85; }
        .controls button.danger { background: #ef4444; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; max-width: 1400px; margin: 0 auto; }
        .card { background: #111114; border-radius: 16px; overflow: hidden; border: 2px solid #27272a; transition: all 0.2s; }
        .card:hover { border-color: #3f3f46; }
        .card.wrong { border-color: #ef4444; background: #1a0a0a; }
        .card img { width: 100%; height: 240px; object-fit: contain; background: #ffffff; display: block; }
        .card-info { padding: 16px; }
        .card-key { font-size: 11px; color: #6b7280; font-family: 'SF Mono', monospace; letter-spacing: 0.5px; }
        .card-name { font-size: 16px; font-weight: 700; margin-top: 6px; color: #fafafa; }
        .card-focus { font-size: 13px; color: #10b981; margin-top: 6px; font-weight: 500; }
        .card-equip { font-size: 12px; color: #8b5cf6; margin-top: 4px; }
        .card-actions { display: flex; gap: 8px; margin-top: 12px; }
        .card-actions button { flex: 1; padding: 8px; border: 1px solid #27272a; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; background: transparent; transition: all 0.15s; }
        .btn-ok { color: #10b981; }
        .btn-ok:hover, .btn-ok.active { background: #10b981; color: #fff; border-color: #10b981; }
        .btn-wrong { color: #ef4444; }
        .btn-wrong:hover, .btn-wrong.active { background: #ef4444; color: #fff; border-color: #ef4444; }
        .summary { text-align: center; margin: 24px auto; padding: 16px 24px; background: #111114; border-radius: 12px; display: inline-flex; gap: 24px; }
        .summary-wrap { text-align: center; }
        .summary span { font-size: 14px; }
        .summary .count { font-weight: 700; font-size: 18px; }
        .count-ok { color: #10b981; }
        .count-wrong { color: #ef4444; }
    </style>
</head>
<body>
    <h1>🏋️ Exercise GIF Verification</h1>
    <p class="subtitle">Review each animated GIF. Click ❌ if it doesn't match the exercise name.</p>
    
    <div class="controls">
        <input type="text" id="search" placeholder="Search by name or key..." oninput="filterCards()">
        <button onclick="showAll()">Show All</button>
        <button onclick="showWrong()" class="danger">Show Only Wrong</button>
        <button onclick="exportResults()">📋 Export Results</button>
    </div>

    <div class="summary-wrap">
        <div class="summary" id="summary"></div>
    </div>
    <div class="grid" id="grid"></div>

    <script>
        const exercises = ${JSON.stringify(exercises, null, 4)};
        const wrong = new Set();

        function render(filter = '', onlyWrong = false) {
            const grid = document.getElementById('grid');
            grid.innerHTML = '';
            const lower = filter.toLowerCase();

            exercises.forEach(ex => {
                if (filter && !ex.key.includes(lower) && !ex.name.toLowerCase().includes(lower)) return;
                if (onlyWrong && !wrong.has(ex.key)) return;

                const card = document.createElement('div');
                card.className = 'card' + (wrong.has(ex.key) ? ' wrong' : '');
                card.innerHTML = \`
                    <img src="../mobile-app/assets/exercise-gifs/\${ex.gifPath}" alt="\${ex.name}" loading="lazy">
                    <div class="card-info">
                        <div class="card-key">\${ex.key}</div>
                        <div class="card-name">\${ex.name}</div>
                        <div class="card-focus">🎯 Focus: \${ex.focusArea}</div>
                        <div class="card-equip">🏋️ Equipment: \${ex.equipment}</div>
                        <div class="card-actions">
                            <button class="btn-ok \${!wrong.has(ex.key) ? 'active' : ''}" onclick="markOk('\${ex.key}')">✅ Correct</button>
                            <button class="btn-wrong \${wrong.has(ex.key) ? 'active' : ''}" onclick="markWrong('\${ex.key}')">❌ Wrong</button>
                        </div>
                    </div>
                \`;
                grid.appendChild(card);
            });

            updateSummary();
        }

        function markOk(key) { wrong.delete(key); render(document.getElementById('search').value); }
        function markWrong(key) { wrong.add(key); render(document.getElementById('search').value); }

        function updateSummary() {
            document.getElementById('summary').innerHTML = \`
                <span class="count-ok"><span class="count">\${exercises.length - wrong.size}</span> ✅ Correct</span>
                <span class="count-wrong"><span class="count">\${wrong.size}</span> ❌ Wrong</span>
                <span><span class="count">\${exercises.length}</span> 📦 Total</span>
            \`;
        }

        function filterCards() { render(document.getElementById('search').value); }
        function showAll() { document.getElementById('search').value = ''; render(); }
        function showWrong() { render(document.getElementById('search').value, true); }

        function exportResults() {
            const wrongList = [...wrong].map(k => {
                const ex = exercises.find(e => e.key === k);
                return { key: k, currentName: ex.name, focusArea: ex.focusArea, equipment: ex.equipment };
            });
            const text = 'WRONG GIFS TO FIX:\\n' + JSON.stringify(wrongList, null, 2);
            navigator.clipboard.writeText(text).then(() => alert('Copied wrong exercises to clipboard!'));
        }

        render();
    </script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'verify-gifs.html'), html);
  console.log('✅ Generated verify-gifs.html');
}

main().catch(console.error);

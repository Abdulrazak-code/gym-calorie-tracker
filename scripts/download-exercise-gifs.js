const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const API_BASE = 'http://localhost/api/v1';
const OUTPUT_DIR = path.join(__dirname, '..', 'mobile-app', 'assets', 'exercise-gifs');

const EXERCISE_SEARCH_MAP = {
  bench_press: 'barbell bench press',
  incline_bench_press: 'incline bench press',
  dumbbell_chest_press: 'dumbbell bench press',
  chest_fly: 'dumbbell fly',
  push_up: 'push-up',
  cable_crossover: 'cable crossover',
  decline_bench_press: 'decline bench press',
  deadlift: 'barbell deadlift',
  bent_over_row: 'barbell bent over row',
  lat_pulldown: 'lat pulldown',
  seated_row: 'seated cable row',
  pull_up: 'pull-up',
  t_bar_row: 't-bar row',
  single_arm_row: 'one arm dumbbell row',
  shoulder_press: 'dumbbell shoulder press',
  lateral_raise: 'dumbbell lateral raise',
  front_raise: 'dumbbell front raise',
  upright_row: 'barbell upright row',
  face_pull: 'cable face pull',
  reverse_fly: 'reverse fly',
  arnold_press: 'arnold press',
  bicep_curl: 'dumbbell bicep curl',
  hammer_curl: 'dumbbell hammer curl',
  concentration_curl: 'concentration curl',
  preacher_curl: 'preacher curl',
  tricep_pushdown: 'cable tricep pushdown',
  overhead_tricep_extension: 'overhead tricep extension',
  skull_crusher: 'skull crusher',
  dips: 'parallel bar dips',
  close_grip_bench: 'close grip bench press',
  squat: 'barbell squat',
  leg_press: 'leg press',
  leg_curl: 'leg curl',
  leg_extension: 'leg extension',
  lunges: 'dumbbell lunge',
  romanian_deadlift: 'romanian deadlift',
  bulgarian_split_squat: 'bulgarian split squat',
  calf_raise: 'calf raise',
  seated_calf_raise: 'seated calf raise',
  crunches: 'crunch',
  plank: 'plank',
  russian_twist: 'russian twist',
  hanging_leg_raise: 'hanging leg raise',
  cable_crunch: 'cable crunch',
  ab_wheel: 'ab wheel',
  hip_thrust: 'barbell hip thrust',
  glute_bridge: 'glute bridge',
  cable_kickback: 'cable kickback',
  sumo_squat: 'sumo squat',
  kettlebell_swings: 'kettlebell swing',
  burpees: 'burpee',
  clean_and_press: 'clean and press',
  thrusters: 'barbell thruster',
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
        } catch (e) {
          reject(e);
        }
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
    const response = await httpGet(`${API_BASE}/exercises?search=${encodeURIComponent(query)}&limit=5`);
    return response.data || [];
  } catch (err) {
    console.error(`  ❌ Search failed for "${query}": ${err.message}`);
    return [];
  }
}

async function downloadGif(url, outputPath) {
  try {
    const sizeKB = await downloadFile(url, outputPath);
    return sizeKB;
  } catch (err) {
    console.error(`  ❌ Download failed: ${err.message}`);
    return null;
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

  const entries = Object.entries(EXERCISE_SEARCH_MAP);

  for (const [key, searchTerm] of entries) {
    console.log(`\n📥 [${successCount + failCount + 1}/${entries.length}] ${key} → "${searchTerm}"`);

    const results = await searchExercises(searchTerm);

    if (results.length === 0) {
      console.log(`  ⚠️  No results found`);
      failCount++;
      continue;
    }

    const exercise = results[0];
    const gifUrl = exercise.gifUrl;

    if (!gifUrl) {
      console.log(`  ⚠️  No GIF URL for "${exercise.name}"`);
      failCount++;
      continue;
    }

    const filename = `${key}.gif`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    console.log(`  🎬 Found: "${exercise.name}"`);
    console.log(`  🔗 ${gifUrl}`);

    const sizeKB = await downloadGif(gifUrl, outputPath);

    if (sizeKB) {
      console.log(`  ✅ Saved: ${filename} (${sizeKB} KB)`);
      mapping[key] = {
        filename,
        sizeKB: parseFloat(sizeKB),
        exerciseName: exercise.name,
        targetMuscles: exercise.targetMuscles,
        bodyParts: exercise.bodyParts,
        equipments: exercise.equipments,
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
  console.log(`📁 OUTPUT: ${OUTPUT_DIR}`);
  console.log('='.repeat(60));

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
  console.log('\n💾 Mapping saved to mapping.json');
}

main().catch(console.error);

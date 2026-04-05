const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost/api/v1';
const OUTPUT_DIR = path.join(__dirname, '..', 'mobile-app', 'assets', 'exercise-gifs');

// Exact search terms from the verification report
const FIXES = {
  // WRONG (26)
  bench_press: 'barbell bench press',
  incline_bench_press: 'barbell incline bench press',
  dumbbell_chest_press: 'dumbbell bench press',
  chest_fly: 'dumbbell fly',
  push_up: 'push-up',
  cable_crossover: 'cable crossover',
  decline_bench_press: 'barbell decline bench press',
  deadlift: 'barbell deadlift',
  seated_row: 'cable seated row',
  pull_up: 'pull-up',
  front_raise: 'dumbbell front raise',
  face_pull: 'cable face pull',
  reverse_fly: 'dumbbell reverse fly',
  arnold_press: 'arnold press',
  bicep_curl: 'dumbbell bicep curl',
  hammer_curl: 'hammer curl',
  concentration_curl: 'concentration curl',
  cable_crunch: 'cable crunch',
  dips: 'tricep dips',
  squat: 'barbell squat',
  leg_press: 'leg press',
  leg_extension: 'leg extension',
  lunges: 'dumbbell lunge',
  calf_raise: 'standing calf raise',
  seated_calf_raise: 'seated calf raise',
  plank: 'plank',
  // MISMATCH (4)
  sumo_squat: 'sumo squat',
  kettlebell_swings: 'kettlebell swing',
  single_arm_row: 'dumbbell one arm row',
  cable_kickback: 'cable glute kickback',
};

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      let data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(data).toString())); }
        catch (e) { reject(e); }
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
        resolve((fs.statSync(outputPath).size / 1024).toFixed(1));
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
    console.error(`  API Error: ${err.message}`);
    return [];
  }
}

async function main() {
  const entries = Object.entries(FIXES);
  let success = 0;
  let fail = 0;
  let totalSize = 0;

  console.log(`\n🔧 Fixing ${entries.length} exercise GIFs...\n`);

  for (const [key, searchTerm] of entries) {
    console.log(`[${success + fail + 1}/${entries.length}] ${key} → "${searchTerm}"`);
    
    const results = await searchExercises(searchTerm);
    
    if (results.length === 0) {
      console.log(`  ❌ No results found\n`);
      fail++;
      continue;
    }

    // Find best match - look for exact term match
    let exercise = results[0];
    const terms = searchTerm.toLowerCase().split(' ');
    for (const result of results) {
      const nameLower = result.name.toLowerCase();
      if (terms.every(t => nameLower.includes(t))) {
        exercise = result;
        break;
      }
    }

    const gifUrl = exercise.gifUrl;
    if (!gifUrl) {
      console.log(`  ❌ No GIF URL for "${exercise.name}"\n`);
      fail++;
      continue;
    }

    const filename = `${key}.gif`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    console.log(`  🎬 Found: "${exercise.name}"`);

    try {
      const sizeKB = await downloadFile(gifUrl, outputPath);
      console.log(`  ✅ Saved: ${filename} (${sizeKB} KB)\n`);
      totalSize += parseFloat(sizeKB);
      success++;
    } catch (err) {
      console.log(`  ❌ Download failed: ${err.message}\n`);
      fail++;
    }
  }

  console.log('='.repeat(60));
  console.log(`✅ Fixed: ${success}`);
  console.log(`❌ Failed: ${fail}`);
  console.log(`📦 Total: ${(totalSize / 1024).toFixed(2)} MB`);
  console.log('='.repeat(60));

  // Update mapping.json
  const mappingPath = path.join(OUTPUT_DIR, 'mapping.json');
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  
  entries.forEach(([key]) => {
    if (mapping[key]) {
      mapping[key].autoMismatch = false;
    }
  });
  
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log('\n💾 Updated mapping.json');
}

main().catch(console.error);

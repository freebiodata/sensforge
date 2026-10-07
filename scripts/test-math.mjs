#!/usr/bin/env node
/**
 * Verification tests for SensForge math.
 * Runs the same formulas the browser tools ship, checks known-good values.
 * Usage: node scripts/test-math.mjs
 */

let pass = 0, fail = 0;
const ok = (name, cond, detail = '') => {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name} ${detail}`); }
};
const closeTo = (a, b, tol) => Math.abs(a - b) <= tol;

const cm360 = (sens, dpi, yaw) => (360 / (sens * dpi * yaw)) * 2.54;
const edpi = (sens, dpi) => sens * dpi;
const convert = (sA, dA, yA, dB, yB) => (sA * dA * yA) / (dB * yB);
const hFov = (vFov, aspect) => (2 * Math.atan(Math.tan((vFov * Math.PI) / 180 / 2) * aspect) * 180) / Math.PI;
const matchFactor = (hA, hB) =>
  Math.tan((hA * Math.PI) / 360) / Math.tan((hB * Math.PI) / 360);

const YAW = { cs2: 0.022, valorant: 0.07, apex: 0.022, ow2: 0.0066, fortnite: 0.005555, r6: 0.00572958 };

console.log('SensForge math tests\n');

console.log('cm/360:');
// CS2 2.0 sens @800 DPI = 360/(2*800*0.022)*2.54 = 25.98 cm
ok('CS2 2.0@800 = 25.98 cm', closeTo(cm360(2, 800, YAW.cs2), 25.98, 0.02), `got ${cm360(2, 800, YAW.cs2)}`);
ok('CS2 1.0@800 = 52.0 cm', closeTo(cm360(1, 800, YAW.cs2), 51.95, 0.05), `got ${cm360(1, 800, YAW.cs2)}`);
// Valorant 0.4 @800 → 360/(0.4*800*0.07)*2.54 = 360/22.4*2.54 = 40.82
ok('Valorant 0.4@800 = 40.8 cm', closeTo(cm360(0.4, 800, YAW.valorant), 40.82, 0.05));
// OW2 5 @800 → 360/(5*800*0.0066)*2.54 = 360/26.4*2.54 = 34.64
ok('OW2 5.0@800 = 34.6 cm', closeTo(cm360(5, 800, YAW.ow2), 34.64, 0.05));

console.log('\neDPI:');
ok('0.35 @ 800 = 280', edpi(0.35, 800) === 280);
ok('0.5 @ 1600 = 800', edpi(0.5, 1600) === 800);

console.log('\nConversions (cm/360 preserved):');
const cs2ToVal = convert(2.0, 800, YAW.cs2, 800, YAW.valorant);
ok('CS2 2.0 → Val ≈ 0.629', closeTo(cs2ToVal, 0.6286, 0.0005), `got ${cs2ToVal}`);
ok('CS2 2.0 → Val preserves cm/360',
  closeTo(cm360(2, 800, YAW.cs2), cm360(cs2ToVal, 800, YAW.valorant), 0.01));
const owToVal = convert(5.0, 800, YAW.ow2, 800, YAW.valorant);
ok('OW2 5.0 → Val ≈ 0.471', closeTo(owToVal, 0.4714, 0.0005), `got ${owToVal}`);
const fnToCs = convert(8.0, 800, YAW.fortnite, 800, YAW.cs2);
ok('Fortnite 8.0 → CS2 ≈ 2.02', closeTo(fnToCs, 2.0202, 0.001), `got ${fnToCs}`);
// DPI change: 800 → 1600 halves sensitivity
const dpiChange = convert(2.0, 800, YAW.cs2, 1600, YAW.cs2);
ok('DPI 800→1600 halves sens (2.0 → 1.0)', closeTo(dpiChange, 1.0, 1e-9), `got ${dpiChange}`);
// Round trip
const roundTrip = convert(convert(1.5, 800, YAW.cs2, 800, YAW.valorant), 800, YAW.valorant, 800, YAW.cs2);
ok('Round trip CS2→Val→CS2 ≈ 1.5', closeTo(roundTrip, 1.5, 1e-9), `got ${roundTrip}`);

console.log('\nFOV maths:');
// vertical 103 at 16:9 → hFOV ≈ 131.79
ok('vFOV 103 @16:9 ≈ 131.79° hFOV', closeTo(hFov(103, 16 / 9), 131.79, 0.05), `got ${hFov(103, 16 / 9)}`);
// From the FOV reference page: vFOV 90 @16:9 = 121.28
ok('vFOV 90 @16:9 ≈ 121.28° hFOV', closeTo(hFov(90, 16 / 9), 121.28, 0.05), `got ${hFov(90, 16 / 9)}`);
ok('vFOV 60 @16:9 ≈ 91.49° hFOV', closeTo(hFov(60, 16 / 9), 91.49, 0.05), `got ${hFov(60, 16 / 9)}`);
ok('vFOV 90 @4:3 = 106.26° hFOV', closeTo(hFov(90, 4 / 3), 106.26, 0.05), `got ${hFov(90, 4 / 3)}`);
ok('vFOV 70 @21:9 ≈ 117.06°', closeTo(hFov(70, 21 / 9), 117.06, 0.05), `got ${hFov(70, 21 / 9)}`);

console.log('\nMonitor-match factor:');
// 16:9 → 4:3: tan(h43/2)/tan(h169/2) = 0.75 → m_yaw 0.022 × 0.75 = 0.0165 (classic CS convention)
const mf = matchFactor(hFov(103, 4 / 3), hFov(103, 16 / 9));
ok('match factor 16:9→4:3 @vFOV103 = 0.75', closeTo(mf, 0.75, 0.005), `got ${mf}`);
ok('m_yaw check: 0.022 × 0.75 ≈ 0.0165', closeTo(0.022 * mf, 0.0165, 0.0005));

console.log('\nDPI measurement model:');
// 800 DPI: 30cm drag = 30/2.54 in * 800 = 9448 count → DPI = counts / inches
const counts = 9448, inches = 30 / 2.54;
ok('counts/inches recovers 800', closeTo(counts / inches, 800, 5), `got ${counts / inches}`);

console.log('\nSanity bands:');
ok('CS2 examples ordered: 2.0 sens < 1.0 sens cm/360', cm360(2, 800, 0.022) < cm360(1, 800, 0.022));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

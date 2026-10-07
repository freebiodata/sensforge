#!/usr/bin/env node
/**
 * DOM smoke test: loads built pages in jsdom, bundles+executes page module scripts
 * via esbuild, and verifies each tool computes and renders a result.
 */
import { JSDOM } from 'jsdom';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execSync } from 'node:child_process';

const CACHE = '.dom-test-cache';
if (!existsSync(CACHE)) mkdirSync(CACHE, { recursive: true });

let pass = 0, fail = 0;
const ok = (name, cond, detail = '') => {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name} ${detail}`); }
};

function bundleScript(srcPath, outName) {
  const out = join(CACHE, outName);
  execSync(
    `npx esbuild "${srcPath}" --bundle --format=iife --outfile="${out}" --log-level=error`,
    { stdio: 'pipe' },
  );
  return readFileSync(out, 'utf-8');
}

async function loadPage(path) {
  const html = readFileSync(path, 'utf-8');
  const dom = new JSDOM(html, {
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    url: 'https://sensforge.top/',
  });
  const { window } = dom;
  // stubs
  if (!window.crypto || !window.crypto.getRandomValues) {
    try {
      Object.defineProperty(window, 'crypto', {
        value: {
          getRandomValues: (arr) => {
            for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 4294967296);
            return arr;
          },
        },
        configurable: true,
      });
    } catch { /* ignore */ }
  }
  window.HTMLCanvasElement.prototype.getContext = function () {
    return {
      clearRect() {}, fillRect() {}, fillStyle: '', beginPath() {}, fill() {},
      moveTo() {}, lineTo() {}, stroke() {}, arc() {}, closePath() {}, save() {}, restore() {},
      translate() {}, rotate() {}, measureText: () => ({ width: 0 }), fillText() {},
    };
  };
  const scripts = [...window.document.querySelectorAll('script[src]')];
  let i = 0;
  for (const s of scripts) {
    const src = s.getAttribute('src').replace(/^\//, 'dist/');
    try {
      const code = bundleScript(src, `bundle-${path.replace(/[^a-z0-9]/gi, '_')}-${i++}.js`);
      window.eval(code);
    } catch (e) {
      console.log(`    (script skipped: ${src}: ${e.message.slice(0, 80)})`);
    }
  }
  // inline scripts: modules + plain inline scripts (Astro renders define:vars as plain inline)
  const inline = [...window.document.querySelectorAll('script:not([src]):not([type="application/ld+json"])')];
  for (const s of inline) {
    try {
      window.eval(s.textContent);
    } catch (e) {
      console.log(`    (inline script skipped: ${e.message.slice(0, 80)})`);
    }
  }
  return dom;
}

console.log('SensForge DOM smoke tests\n');

// ---------------------------------------------------------------- converter
{
  const dom = await loadPage('dist/sensitivity-converter/index.html');
  const doc = dom.window.document;
  const val = (id) => doc.getElementById(id)?.textContent ?? '';
  console.log('sensitivity-converter:');
  const resultVal = val('result-value');
  ok('default conversion computed (CS2 2.0 → Valorant ≈ 0.629)', /^0\.6/.test(resultVal), `got "${resultVal}"`);
  const cm = val('out-cm360');
  ok('cm/360 ≈ 26.0', cm.startsWith('26.0'), `got "${cm}"`);
  const dst = doc.getElementById('dst-game');
  dst.value = 'apex';
  dst.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
  ok('changing target game updates caption', val('result-caption').includes('Apex'), `caption: "${val('result-caption')}"`);

  // swap button: CS2→Val converted to back-conversion
  const swap = doc.getElementById('swap-btn');
  swap.click();
  ok('swap flips from/to games', doc.getElementById('src-game').value === 'apex' || doc.getElementById('dst-game').value === 'cs2',
    `src=${doc.getElementById('src-game').value} dst=${doc.getElementById('dst-game').value}`);

  // invalid input handling
  const sensInput = doc.getElementById('src-sens');
  sensInput.value = '-5';
  sensInput.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  ok('invalid sens marks field invalid', sensInput.closest('.field').classList.contains('invalid'));
  ok('invalid sens clears result', doc.getElementById('result-body').hidden === true);
}

// ---------------------------------------------------------------- edpi
{
  const dom = await loadPage('dist/edpi-calculator/index.html');
  const doc = dom.window.document;
  const val = (id) => doc.getElementById(id)?.textContent ?? '';
  console.log('\nedpi-calculator:');
  ok('default eDPI = 280 (0.35×800)', val('result-value') === '280', `got "${val('result-value')}"`);
  const sens = doc.getElementById('sens');
  sens.value = '0.5';
  sens.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  ok('recomputes on input (0.5×800=400)', val('result-value') === '400', `got "${val('result-value')}"`);
}

// ---------------------------------------------------------------- cm360
{
  const dom = await loadPage('dist/cm-360-calculator/index.html');
  const doc = dom.window.document;
  const val = (id) => doc.getElementById(id)?.textContent ?? '';
  console.log('\ncm-360-calculator:');
  ok('default CS2 2.0@800 = 26.0 cm', val('result-value').startsWith('26.0'), `got "${val('result-value')}"`);
  ok('eDPI shown = 1600', val('out-edpi') === '1600', `got "${val('out-edpi')}"`);
  ok('pad coverage label present', val('out-pad').length > 0);
}

// ---------------------------------------------------------------- fov
{
  const dom = await loadPage('dist/fov-calculator/index.html');
  const doc = dom.window.document;
  const val = (id) => doc.getElementById(id)?.textContent ?? '';
  console.log('\nfov-calculator:');
  ok('match factor 0.7500 for 16:9→4:3', val('match-factor') === '0.7500', `got "${val('match-factor')}"`);
  ok('stretch shows 1.333×', val('stretch-out').startsWith('1.333'), `got "${val('stretch-out')}"`);
  ok('hFOV src ≈ 131.8', val('out-h-src').startsWith('131.8'), `got "${val('out-h-src')}"`);
}

// ---------------------------------------------------------------- randomizer
{
  const dom = await loadPage('dist/sens-randomizer/index.html');
  const doc = dom.window.document;
  const val = (id) => doc.getElementById(id)?.textContent ?? '';
  console.log('\nsens-randomizer:');
  const rollBtn = doc.getElementById('roll-btn');
  rollBtn.click();
  const rolled = val('roll-value');
  const num = parseFloat(rolled);
  ok('roll produces a value in ±5% band (0.3325–0.3675)', num >= 0.3325 && num <= 0.3675, `got "${rolled}"`);
  ok('history captures the roll', val('history').includes('•'), `history "${val('history')}"`);
}

// ---------------------------------------------------------------- crosshair
{
  const dom = await loadPage('dist/crosshair-generator/index.html');
  const doc = dom.window.document;
  const val = (id) => doc.getElementById(id)?.value ?? doc.getElementById(id)?.textContent ?? '';
  console.log('\ncrosshair-generator:');
  ok('values textarea populated', val('values-out').includes('Gap'), `got "${val('values-out')}"`);
  const gap = doc.getElementById('gap');
  gap.value = '10';
  gap.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  ok('gap slider updates readout', val('gap-val') === '10', `got "${val('gap-val')}"`);
}

// ---------------------------------------------------------------- game page
{
  const dom = await loadPage('dist/games/cs2/index.html');
  const doc = dom.window.document;
  const val = (id) => doc.getElementById(id)?.textContent ?? '';
  console.log('\ngames/cs2:');
  ok('default conversion (CS2 2.0 → Valorant 0.629)', val('g-value').startsWith('0.6'), `got "${val('g-value')}"`);
  ok('cm/360 = 26.0', val('g-cm').startsWith('26.0'), `got "${val('g-cm')}"`);
  const target = doc.getElementById('g-target');
  target.value = 'overwatch2';
  target.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  const ow = parseFloat(val('g-value'));
  ok('CS2 2.0 → OW2 ≈ 6.67', ow > 6.6 && ow < 6.7, `got "${val('g-value')}"`);
}

// ---------------------------------------------------------------- pair page
{
  const dom = await loadPage('dist/valorant-to-cs2-sensitivity/index.html');
  const doc = dom.window.document;
  const val = (id) => doc.getElementById(id)?.textContent ?? '';
  console.log('\nvalorant-to-cs2-sensitivity:');
  const sens = doc.getElementById('p-sens');
  sens.value = '0.4';
  sens.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  const cs2 = parseFloat(val('p-value'));
  ok('0.4 Valorant → CS2 ≈ 1.273', Math.abs(cs2 - 1.273) < 0.005, `got "${val('p-value')}"`);
  ok('cm/360 ≈ 40.8', val('p-cm').startsWith('40.8'), `got "${val('p-cm')}"`);
  // swap direction
  doc.getElementById('p-swap').click();
  ok('swap changes input label', doc.getElementById('p-label').textContent.includes('CS2'), `label "${doc.getElementById('p-label').textContent}"`);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

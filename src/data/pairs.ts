/**
 * Conversion-pair pages ("Valorant to CS2", "CS2 to Valorant", ...).
 *
 * Curated, not programmatic mass-generation: every pair below has documented
 * search demand (Google Autocomplete research run 2026-10-07, worker-02/03)
 * and unique content — different input systems, direction-specific tables,
 * pair-specific caveats. No template-swapped filler.
 */

export interface PairPage {
  slug: string;
  fromId: string;
  toId: string;
  fromName: string;
  toName: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  /** unique content blocks rendered as H2 sections */
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
  /** slugs of related pair pages */
  related: string[];
  /** example source values for the table */
  tableValues: number[];
  /** default value in the converter */
  defaultValue: number;
}

export const pairPages: PairPage[] = [
  {
    slug: 'valorant-to-cs2-sensitivity',
    fromId: 'valorant',
    toId: 'cs2',
    fromName: 'Valorant',
    toName: 'CS2',
    title: 'Valorant to CS2 Sensitivity Converter — 1:1 cm/360',
    description:
      'Convert your Valorant sensitivity to CS2 exactly: same cm/360, worked conversion table for every sens value, and the reverse direction. Free, instant.',
    h1: 'Valorant to CS2 Sensitivity Converter',
    intro: [
      'Same muscle memory, new game: convert your Valorant sensitivity to an exact CS2 match — with a full worked table for every common sens value, and reverse conversion built in.',
    ],
    sections: [
      {
        heading: 'Why the numbers differ so much',
        body: 'Both games rotate the camera <code>sensitivity × yaw</code> degrees per mouse count. Valorant\'s yaw is <strong>0.07</strong>; CS2\'s is <strong>0.022</strong> (its documented <code>m_yaw</code> default). Because CS2 rotates less per count, it needs a bigger slider number for the same physical hand movement — hence the ≈ 3.18× ratio. The <a href="/guides/cm-360-explained/">cm/360 guide</a> explains the underlying model, and the <a href="/methodology/">methodology page</a> lists the sources for both constants.',
      },
      {
        heading: 'Playing 4:3 stretched in CS2?',
        body: 'Stretched resolution changes on-screen feel, not the rotation maths. If you use <code>m_yaw 0.0165</code> (the 4:3 stretched convention), multiply the converted CS2 value by 0.022/0.0165 ≈ 1.333 — or keep the default <code>m_yaw 0.022</code> and use the value as shown. See the <a href="/fov-calculator/">FOV calculator</a> for the screen-space factor.',
      },
    ],
    faq: [
      {
        q: 'What sensitivity in CS2 matches 0.4 in Valorant?',
        a: '0.4 Valorant converts to <strong>1.273</strong> in CS2 (at the same mouse DPI). Both give a cm/360 of about 40.8 cm at 800 DPI. Type your own value in the converter above for your exact number.',
      },
      {
        q: 'Does this work if I play on 4:3 stretched in CS2?',
        a: 'Stretched resolution changes on-screen feel, not the rotation maths. If you use <code>m_yaw 0.0165</code> (the 4:3 stretched convention), multiply the converted CS2 value by 0.022/0.0165 ≈ 1.333 — or keep the default <code>m_yaw 0.022</code> and use the value as shown.',
      },
      {
        q: 'Should I convert with different DPI on each game?',
        a: 'Use the full converter on the <a href="/sensitivity-converter/">sensitivity converter page</a> — it accepts a separate target DPI and handles the maths. This page assumes the same DPI both sides (800 in the table).',
      },
      {
        q: 'Is the conversion exact?',
        a: 'Yes for rotation: both games use fixed yaw constants (Valorant 0.07, CS2 m_yaw 0.022), so the conversion is deterministic. What can still differ: field of view, weapon-specific scope behaviour and movement-scaled accuracy — adjust visually after converting.',
      },
      {
        q: 'How do I go the other way (CS2 to Valorant)?',
        a: 'Use the <a href="/cs2-to-valorant-sensitivity/">CS2 to Valorant converter</a>, or click "Switch direction" in the tool above.',
      },
    ],
    related: ['cs2-to-valorant-sensitivity', 'valorant-to-overwatch-2-sensitivity', 'apex-to-valorant-sensitivity'],
    tableValues: [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5],
    defaultValue: 0.35,
  },
  {
    slug: 'cs2-to-valorant-sensitivity',
    fromId: 'cs2',
    toId: 'valorant',
    fromName: 'CS2',
    toName: 'Valorant',
    title: 'CS2 to Valorant Sensitivity Converter — Exact Yaw Maths',
    description:
      'Convert CS2 sensitivity to Valorant with exact yaw maths (0.022 → 0.07). Worked table, cm/360 preserved, reverse included. Free, in-browser.',
    h1: 'CS2 to Valorant Sensitivity Converter',
    intro: [
      'Moving from CS2 to Valorant? Convert your slider value so your physical turn distance — cm/360 — is preserved exactly. The two games rotate at different rates (0.022 vs 0.07 degrees per mouse count), so the numbers never look similar; the table below fixes that in one glance.',
    ],
    sections: [
      {
        heading: 'What carries over, and what does not',
        body: 'Rotation rate carries over exactly — that is what this conversion matches. What does not: Valorant locks its FOV at 103 horizontal, so a CS2 player coming from 4:3 stretched or unusual FOVs will notice the world looks different (motion appears faster at higher FOV). Aim consistency is unaffected once your cm/360 matches; the on-screen difference fades after a few matches.',
      },
      {
        heading: 'Aiming style differences to expect',
        body: 'CS2 rewards precise, low-frequency flicks — few bullets, high damage. Valorant\'s longer TTK and abilities layer more tracking and strafe-aim onto the same core mechanic. Your converted sensitivity is the right starting point for both; resist the urge to change sens again during your first week while adapting.',
      },
    ],
    faq: [
      {
        q: 'What is 1.0 CS2 sensitivity in Valorant?',
        a: 'CS2 1.0 converts to <strong>0.314</strong> in Valorant at the same DPI (both ≈ 52.0 cm/360 at 800 DPI). A common pair: CS2 2.0 at 800 DPI ↔ Valorant 0.629.',
      },
      {
        q: 'Why is my Valorant number smaller than my CS2 number?',
        a: 'Valorant rotates more per mouse count (yaw 0.07 vs CS2\'s 0.022), so it needs a smaller slider number for the same physical turn. Multiply CS2 values by 0.022 ÷ 0.07 ≈ 0.314.',
      },
      {
        q: 'Can I keep using my CS2 DPI and mouse?',
        a: 'Yes — keep the DPI identical on both sides and the table applies directly. If you change mice mid-migration, use the <a href="/sensitivity-converter/">full converter</a> which takes separate source and target DPI.',
      },
      {
        q: 'Do I need to change anything for Valorant scopes?',
        a: 'No — convert the hipfire value (that is what every converter matches), then adjust Valorant\'s per-scope multipliers to taste. They are preference settings, not part of the cross-game rotation maths.',
      },
      {
        q: 'How do I go the other way (Valorant to CS2)?',
        a: 'Use the <a href="/valorant-to-cs2-sensitivity/">Valorant to CS2 converter</a>, or click "Switch direction" in the tool above.',
      },
    ],
    related: ['valorant-to-cs2-sensitivity', 'valorant-to-overwatch-2-sensitivity', 'fortnite-to-cs2-sensitivity'],
    tableValues: [0.5, 0.7, 1.0, 1.3, 1.5, 2.0, 2.5, 3.0],
    defaultValue: 2.0,
  },
  {
    slug: 'valorant-to-overwatch-2-sensitivity',
    fromId: 'valorant',
    toId: 'overwatch2',
    fromName: 'Valorant',
    toName: 'Overwatch 2',
    title: 'Valorant to Overwatch 2 Sensitivity Converter | SensForge',
    description:
      'Convert Valorant sensitivity to Overwatch 2 exactly (yaw 0.07 → 0.0066). Worked table, cm/360 preserved, scope notes included. Free converter.',
    h1: 'Valorant to Overwatch 2 Sensitivity Converter',
    intro: [
      'Overwatch 2\'s slider values look big next to Valorant\'s — a Valorant 0.35 is around Overwatch 6.67 — because Overwatch rotates far less per mouse count (yaw 0.0066 vs 0.07). This converter matches your physical cm/360 exactly, so your flick timing transfers even though the numbers look worlds apart.',
    ],
    sections: [
      {
        heading: 'Overwatch 2 specifics that affect feel',
        body: 'Overwatch 2 lets you set per-hero and scoped sensitivities, and its default FOV (103 horizontal) happens to match Valorant\'s fixed value — a happy coincidence that makes the transition smoother than most cross-game moves. Set your global value from the table, leave hero overrides alone initially, and give it a week before adjusting anything.',
      },
      {
        heading: 'Why players convert with the same DPI first',
        body: 'Staying on your Valorant DPI removes a variable: one number changes instead of two. If you later move to a different DPI, the <a href="/sensitivity-converter/">full converter</a> handles source/target DPI separately, and the <a href="/edpi-calculator/">eDPI calculator</a> shows exactly how DPI and sens trade off.',
      },
    ],
    faq: [
      {
        q: 'What is 0.35 Valorant sensitivity in Overwatch 2?',
        a: '0.35 Valorant ≈ <strong>3.71</strong> in Overwatch 2 at the same DPI (both ≈ 46.7 cm/360 at 800 DPI). The table above converts every common Valorant value.',
      },
      {
        q: 'Why is my Overwatch number so much bigger?',
        a: 'Overwatch\'s yaw (0.0066) is about ten times smaller than Valorant\'s (0.07), so it needs a roughly 10.6× larger slider number for the same physical turn.',
      },
      {
        q: 'Should I set per-hero sensitivities in Overwatch?',
        a: 'Most players start with the global value only. The common exception is setting a different scope sensitivity for Widowmaker/Ashe-style scopes — tune those by feel after converting your base value.',
      },
      {
        q: 'Does 103 FOV in both games mean identical on-screen movement?',
        a: 'Same FOV, same aspect ratio means very similar screen-space motion at the same cm/360 — one of the closest cross-game matches available. Confirm you play both at the same aspect ratio to keep it that way.',
      },
    ],
    related: ['cs2-to-valorant-sensitivity', 'valorant-to-cs2-sensitivity', 'marvel-rivals-to-overwatch-2-sensitivity'],
    tableValues: [0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5],
    defaultValue: 0.35,
  },
  {
    slug: 'fortnite-to-cs2-sensitivity',
    fromId: 'fortnite',
    toId: 'cs2',
    fromName: 'Fortnite',
    toName: 'CS2',
    title: 'Fortnite to CS2 Sensitivity Converter (X%) | SensForge',
    description:
      'Convert Fortnite X% sensitivity to CS2 values exactly. Handles the percentage system (yaw 0.005555 per 1%), worked table, cm/360 maths. Free tool.',
    h1: 'Fortnite to CS2 Sensitivity Converter',
    intro: [
      'Fortnite measures sensitivity in percent (1–100), CS2 in a decimal slider — converting needs the percentage maths, which this tool handles: Fortnite 7% ≈ CS2 1.77 at the same DPI. It also applies to KovaK\'s and Aim Lab, which use the same percentage convention as Fortnite.',
    ],
    sections: [
      {
        heading: 'The percentage system, explained once',
        body: 'Each 1% of Fortnite sensitivity equals a yaw of <strong>0.005555</strong> degrees per mouse count. So Fortnite 7% = 7 × 0.005555 = 0.03889° per count, which is about 77% more rotation per count than CS2 at sensitivity 1.0. That single fact drives every Fortnite↔CS2 conversion: multiply by 0.005555 ÷ 0.022 ≈ 0.2525.',
      },
      {
        heading: 'X, Y and build/edit: which value to convert',
        body: 'Convert your <strong>X (horizontal)</strong> percentage — that is the aim value all converters match. Leave the Y slider and the separate build/edit multipliers for in-game tuning; they are personal preference and are not part of the cross-game rotation maths.',
      },
    ],
    faq: [
      {
        q: 'What is 7% Fortnite sensitivity in CS2?',
        a: 'Fortnite 7% ≈ <strong>1.768</strong> in CS2 at the same DPI (≈ 29.7 cm/360 at 800 DPI). See the full row set in the table above; type any percentage into the converter for exact values.',
      },
      {
        q: 'How do I know which Fortnite value to use if my X and Y differ?',
        a: 'Use the X value (horizontal). Aim conversions target horizontal rotation; the Y slider is a comfort setting you can tune afterwards.',
      },
      {
        q: 'Does this work for Fortnite\'s controller settings?',
        a: 'No — controller sensitivity is a different system (stick response curves, aim assist). These conversions apply to mouse input; the numbers assume a mouse with raw input.',
      },
      {
        q: 'Why is my CS2 number roughly a quarter of my Fortnite percentage?',
        a: 'Because the per-1% yaw (0.005555) is about a quarter of CS2\'s yaw (0.022) — the ratio 0.2525 is the whole conversion for equal DPI. DPI changes scale it from there.',
      },
    ],
    related: ['cs2-to-valorant-sensitivity', 'valorant-to-cs2-sensitivity', 'cs2-to-valorant-sensitivity'],
    tableValues: [4, 5, 6, 7, 8, 9, 10, 12],
    defaultValue: 7,
  },
  {
    slug: 'apex-to-valorant-sensitivity',
    fromId: 'apex',
    toId: 'valorant',
    fromName: 'Apex Legends',
    toName: 'Valorant',
    title: 'Apex Legends to Valorant Sensitivity Converter | SensForge',
    description:
      'Convert Apex Legends sensitivity to Valorant exactly (both via yaw maths). Worked table, cm/360 matched, ADS notes included. Free, in-browser.',
    h1: 'Apex Legends to Valorant Sensitivity Converter',
    intro: [
      'Apex and Valorant feel nothing alike — Apex is tracking-heavy with a separate ADS scale; Valorant is precision-first with a fixed FOV — but the rotation maths between them is simple: Apex 1.5 ≈ Valorant 0.471 at the same DPI. Match your cm/360 first, then adapt your technique.',
    ],
    sections: [
      {
        heading: 'ADS is not part of this conversion',
        body: 'Apex\'s ADS sensitivity uses its own multiplier scale (per optic) layered on top of hipfire. This converter matches <strong>hipfire</strong> turn distance — the only apples-to-apples number between games. Set Apex ADS to taste separately; most players scale it with optic zoom.',
      },
      {
        heading: 'From tracking to precision: adjusting technique',
        body: 'Apex players moving to Valorant commonly feel their sens is "too fast" in the first days — not because the conversion is wrong, but because Valorant targets change direction less and demand precise first bullets. Keep the converted value for two weeks; the perception settles as your crosshair habits change.',
      },
    ],
    faq: [
      {
        q: 'What is 1.5 Apex sensitivity in Valorant?',
        a: 'Apex 1.5 ≈ <strong>0.471</strong> in Valorant at the same DPI (≈ 34.6 cm/360 at 800 DPI). Full table above; converter takes any value.',
      },
      {
        q: 'Is Apex sensitivity the same as CS2?',
        a: 'Yes for hipfire — both use yaw 0.022, so Apex values transfer to CS2 1:1 at the same DPI. From there, CS2→Valorant follows the usual 0.314 ratio.',
      },
      {
        q: 'Do I need to convert my Apex ADS values too?',
        a: 'No — ADS scales are game-specific and not part of cross-game maths. Convert the hipfire value, then rebuild ADS preferences in Valorant\'s scope settings (they were always personal).',
      },
      {
        q: 'My Apex FOV is 110 — does that change the conversion?',
        a: 'No. FOV changes how motion appears on screen, not the rotation rate. Your cm/360 holds at any FOV; see the <a href="/fov-calculator/">FOV calculator</a> for how FOV and aspect interact.',
      },
    ],
    related: ['valorant-to-cs2-sensitivity', 'valorant-to-overwatch-2-sensitivity', 'cs2-to-valorant-sensitivity'],
    tableValues: [0.8, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 3.5],
    defaultValue: 1.5,
  },
  {
    slug: 'marvel-rivals-to-overwatch-2-sensitivity',
    fromId: 'marvel-rivals',
    toId: 'overwatch2',
    fromName: 'Marvel Rivals',
    toName: 'Overwatch 2',
    title: 'Marvel Rivals to Overwatch 2 Sensitivity Converter',
    description:
      'Convert Marvel Rivals sensitivity to Overwatch 2 exactly. Yaw maths (0.022 → 0.0066), worked table, hero-tuning notes. Free, no sign-up.',
    h1: 'Marvel Rivals to Overwatch 2 Sensitivity Converter',
    intro: [
      'Marvel Rivals and Overwatch 2 share a genre, not a number scale: Rivals 2.0 converts to about Overwatch 6.67 at the same DPI. This page matches your rotation exactly so the hero-pool transition starts from equal footing.',
    ],
    sections: [
      {
        heading: 'Two hero shooters, one conversion',
        body: 'The games sit on different engines (UE5 vs Overwatch\'s own) with different FOV defaults — Rivals exposes a FOV slider, Overwatch sets 103 horizontal on PC. Match sensitivity first via the table, then set FOV to your preference in Rivals; Overwatch\'s fixed 103 means "FOV feel" differences remain even after conversion. That is expected, not an error.',
      },
      {
        heading: 'Hero-specific values stay personal',
        body: 'Neither game needs per-hero sensitivities to feel right. Set the global value from this conversion, play a full session, and only add per-hero overrides if a specific pick still feels off — that is a preference layer on top of correct maths.',
      },
    ],
    faq: [
      {
        q: 'What is 2.0 Marvel Rivals sensitivity in Overwatch 2?',
        a: 'Rivals 2.0 ≈ <strong>6.67</strong> in Overwatch 2 at the same DPI (≈ 34.6 cm/360 at 800 DPI). The table covers common Rivals values.',
      },
      {
        q: 'Do Marvel Rivals and Overwatch sensitivity scales match at all?',
        a: 'No direct match: Rivals uses yaw 0.022, Overwatch 0.0066 — a ~3.33× difference. The conversion normalises for that so your physical turn distance is identical.',
      },
      {
        q: 'Should I convert my Marvel Rivals crosshair too?',
        a: 'Crosshairs are game-specific (Rivals uses share codes). You can rebuild a similar look with the <a href="/crosshair-generator/">crosshair generator</a>, which maps your design to both games\' settings.',
      },
    ],
    related: ['valorant-to-overwatch-2-sensitivity', 'valorant-to-cs2-sensitivity', 'cs2-to-valorant-sensitivity'],
    tableValues: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0],
    defaultValue: 2.0,
  },
];

export const pairBySlug = Object.fromEntries(pairPages.map((p) => [p.slug, p]));

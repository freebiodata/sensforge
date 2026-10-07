/**
 * Per-game page content for /games/[slug]/.
 *
 * Every claim here must be verifiable:
 * - yaw values come from src/data/games.ts (sourced, confidence-labelled)
 * - game facts (input systems, FOV behaviour) are drawn from the
 *   research run 2026-10-07 (worker-01/02/03) or game documentation.
 * Copy is written per game: no template-swapped filler.
 */

export interface GamePage {
  slug: string;
  gameId: string;
  /** display name for titles/links */
  name: string;
  title: string; // <= 60 chars, includes brand
  description: string; // <= 155 chars
  h1: string;
  intro: string[]; // unique paragraphs, 1-3
  facts: { label: string; value: string }[]; // key facts table
  tableFrom: { label: string; values: number[] }; // sens values shown in conversion table
  targets: string[]; // gameIds of the 3 conversion targets
  faq: { q: string; a: string }[];
  relatedGames: string[]; // slugs
}

export const gamePages: GamePage[] = [
  {
    slug: 'cs2',
    gameId: 'cs2',
    name: 'Counter-Strike 2',
    title: 'CS2 Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert your CS2 sensitivity to Valorant, Apex, Overwatch 2 and more. cm/360 and eDPI included, m_yaw 0.022 maths, free converter.',
    h1: 'CS2 Sensitivity Converter & Calculator',
    intro: [
      'Counter-Strike 2 is the reference point for sensitivity maths: its documented console variable <code>m_yaw</code> defaults to <code>0.022</code> degrees of rotation per mouse count, making CS2 conversions the most reliable in the genre. If you know your CS2 sensitivity, you already have the most solid number to convert from.',
      'Use the table below for instant conversions to Valorant, Apex Legends and Overwatch 2 at the same DPI, or open the full converter to handle different mice and more games.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.022 (documented m_yaw default, confirmed)' },
      { label: 'Typical sensitivity range', value: '0.4 – 3.5 (slider value)' },
      { label: 'Common pro cm/360 zone', value: '~40 – 60 cm at typical DPI' },
      { label: '4:3 stretched convention', value: 'm_yaw 0.0165 for uniform x/y screen speed' },
      { label: 'Config variable', value: 'sensitivity <value> in console' },
    ],
    tableFrom: { label: 'CS2 sens', values: [0.5, 0.7, 1.0, 1.3, 1.5, 2.0, 2.5] },
    targets: ['valorant', 'apex', 'overwatch2'],
    faq: [
      {
        q: 'What is a good CS2 sensitivity?',
        a: 'Competitive players most commonly sit between 0.7 and 1.5 at 800 DPI (roughly 35–75 cm/360). Anything in that band can reach pro level, 1.0–1.3 at 800 DPI is the crowded middle. Use the converter to check exactly where your current setting lands before changing anything.',
      },
      {
        q: 'How do I convert CS2 sensitivity to Valorant?',
        a: 'Multiply your CS2 sensitivity by 0.022 ÷ 0.07: CS2 1.0 equals Valorant 0.314 at the same DPI. The table above does this for common values; the <a href="/sensitivity-converter/">converter</a> handles any number, including different DPI.',
      },
      {
        q: 'Does changing resolution or 4:3 stretched affect my CS2 sensitivity?',
        a: 'Rotation maths does not change: your cm/360 is identical at any resolution with raw input on. Stretched aspect ratios change how motion appears on screen (and are why some players set <code>m_yaw 0.0165</code>), but the physical turn distance stays the same. See the <a href="/fov-calculator/">FOV calculator</a> for the screen-space match factor.',
      },
      {
        q: 'Why is my CS2 number bigger than my Valorant number?',
        a: 'Because CS2 rotates less per mouse count (0.022 vs 0.07 degrees). Smaller rotation per count means the slider value must be larger for the same physical turn, roughly 3.18× larger.',
      },
      {
        q: 'What about my scope sensitivity (AWP)?',
        a: 'CS2 scoped sensitivity uses <code>zoom_sensitivity_ratio</code> (default 1.0, meaning scoped turn distance scales with zoom). Convert your hipfire value first, then tune the zoom ratio to taste; most players leave it near default.',
      },
    ],
    relatedGames: ['valorant', 'apex-legends', 'overwatch-2'],
  },
  {
    slug: 'valorant',
    gameId: 'valorant',
    name: 'Valorant',
    title: 'Valorant Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert your Valorant sensitivity to CS2, Apex, Overwatch 2 and more, exact cm/360 matching with yaw 0.07 maths. Free, no sign-up.',
    h1: 'Valorant Sensitivity Converter & Calculator',
    intro: [
      'Valorant converts mouse movement to rotation with a yaw constant of <code>0.07</code> (over three times CS2\'s rate), which is why Valorant slider values like <code>0.35</code> correspond to CS2 numbers around <code>1.11</code>. The game also fixes its field of view at 103 horizontal, so once your cm/360 matches, your feel carries over with fewer variables than most shooters.',
      'Convert with the table below (same DPI assumed), or use the full converter for any value, any DPI and 13 games.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.07 (widely corroborated)' },
      { label: 'Typical sensitivity range', value: '0.1 – 1.0 (slider value)' },
      { label: 'FOV', value: 'Fixed 103 horizontal, not user-adjustable' },
      { label: 'Common pro cm/360 zone', value: '~30 – 55 cm at typical DPI' },
      { label: 'Scope settings', value: 'Per-scope multipliers separate; tune after converting hipfire' },
    ],
    tableFrom: { label: 'Valorant sens', values: [0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5] },
    targets: ['cs2', 'apex', 'overwatch2'],
    faq: [
      {
        q: 'What is a good Valorant sensitivity?',
        a: 'Most competitive players use 0.2–0.5 at 800 DPI (roughly 30–55 cm/360). 0.3–0.4 at 800 DPI is the most common zone. Lower favours precision and flick stability; higher favours fast clearing. Pick from the band, then keep it stable for weeks before judging.',
      },
      {
        q: 'How do I convert Valorant sensitivity to CS2?',
        a: 'Multiply by 0.07 ÷ 0.022 ≈ 3.182: Valorant 0.35 becomes CS2 1.11 at the same DPI. There is a dedicated <a href="/valorant-to-cs2-sensitivity/">Valorant to CS2 conversion page</a> with a full table and reverse conversion.',
      },
      {
        q: 'Does Valorant have a fixed FOV?',
        a: 'Yes, 103 horizontal, with no user setting. That means FOV never confuses cross-game conversions the way it can in Apex or Overwatch. Your only variables are sensitivity, DPI and scope multipliers.',
      },
      {
        q: 'Should I use raw input in Valorant?',
        a: 'Valorant uses raw input by default and has no "mouse acceleration" toggle to worry about at the game level, but check Windows settings anyway (see the <a href="/dpi-analyzer/">DPI analyzer</a> checklist), because OS-level acceleration breaks the maths for every game.',
      },
      {
        q: 'How do I convert my scope sensitivity?',
        a: 'Convert your hipfire value first (that is what all converters match), then adjust scope multipliers in Valorant\'s settings to taste. Scope values are personal preference and are not part of the cross-game rotation maths.',
      },
    ],
    relatedGames: ['cs2', 'apex-legends', 'marvel-rivals'],
  },
  {
    slug: 'overwatch-2',
    gameId: 'overwatch2',
    name: 'Overwatch 2',
    title: 'Overwatch 2 Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert Overwatch 2 sensitivity to Valorant, CS2, Apex and more. Yaw 0.0066 maths, cm/360 and eDPI included. Free in-browser tool.',
    h1: 'Overwatch 2 Sensitivity Converter & Calculator',
    intro: [
      'Overwatch 2 uses a small yaw constant (<code>0.0066</code>), which is why its slider values look large, <code>5.0</code> in Overwatch 2 is close to <code>1.57</code> in CS2 at the same DPI. The game keeps hero-specific and scope sensitivities separate, so convert your base hipfire value first and tune the rest in-game.',
      'The table below converts common Overwatch 2 values to Valorant, CS2 and Apex Legends at equal DPI.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.0066 (confirmed, incl. KovaaK Sensitivity Matcher)' },
      { label: 'Typical sensitivity range', value: '2 – 12 (slider value)' },
      { label: 'FOV', value: 'User-adjustable per hero category; default 103 horizontal' },
      { label: 'Common pro cm/360 zone', value: '~25 – 45 cm at typical DPI' },
      { label: 'Notes', value: 'Separate scoped/hero sensitivities exist, Tune after converting base value' },
    ],
    tableFrom: { label: 'OW2 sens', values: [4, 5, 6, 7, 8, 10, 12] },
    targets: ['valorant', 'cs2', 'apex'],
    faq: [
      {
        q: 'What is a good Overwatch 2 sensitivity?',
        a: 'Hitscan players commonly use 4–8 at 800 DPI (roughly 25–50 cm/360); projectile and tank players often go slightly higher. The game\'s huge hero variety means there is no single "correct" value, pick a cm/360 you like and convert it consistently.',
      },
      {
        q: 'How do I convert OW2 sensitivity to CS2 or Valorant?',
        a: 'Both conversions follow <code>target = OW2 × 0.0066 ÷ target_yaw</code>. For example, OW2 5.0 ≈ CS2 1.50 ≈ Valorant 0.471 at the same DPI. Use the table above or the <a href="/sensitivity-converter/">full converter</a> for other values.',
      },
      {
        q: 'Why does Overwatch 2 feel different from other games even after converting?',
        a: 'Overwatch has strong movement acceleration, generous hitboxes and hero-specific tuning. The converted value gives you an identical rotation rate; the difference you feel after that is game design, not maths.',
      },
      {
        q: 'Do I need to set per-hero sensitivities?',
        a: 'Only if you want to. Most players set one global value via the slider and convert that. Per-hero overrides are for players who deliberately want different feel on specific heroes.',
      },
    ],
    relatedGames: ['valorant', 'cs2', 'apex-legends'],
  },
  {
    slug: 'apex-legends',
    gameId: 'apex',
    name: 'Apex Legends',
    title: 'Apex Legends Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert Apex Legends sensitivity to Valorant, CS2, Overwatch 2 and more. Source-engine yaw maths with cm/360 and eDPI. Free tool.',
    h1: 'Apex Legends Sensitivity Converter & Calculator',
    intro: [
      'Apex Legends runs on a Source-family engine and shares CS2\'s yaw constant (<code>0.022</code>), so CS2↔Apex conversions are effectively 1:1; the same slider value works in both games for the same physical feel. Apex adds a separate ADS sensitivity scale, which you tune after matching hipfire, and its FOV slider (70–110) multiplies perceived speed.',
      'The table converts common Apex values to Valorant, CS2 and Overwatch 2 at identical DPI.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.022 (Source-family, confirmed)' },
      { label: 'Typical sensitivity range', value: '0.6 – 4.0 (slider value)' },
      { label: 'FOV', value: 'Adjustable 70–110; separate ADS sensitivity scale exists' },
      { label: 'CS2 equivalence', value: '1:1, same yaw constant as CS2' },
      { label: 'Notes', value: 'Convert hipfire first, then tune ADS multiplier per-scope' },
    ],
    tableFrom: { label: 'Apex sens', values: [0.8, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0] },
    targets: ['valorant', 'cs2', 'overwatch2'],
    faq: [
      {
        q: 'Is Apex sensitivity the same as CS2?',
        a: 'For hipfire rotation, yes: both use yaw 0.022, so identical slider values give identical physical turn distances (at the same DPI). Apex\'s ADS system is the difference: it uses its own multiplier scale which CS2 does not have.',
      },
      {
        q: 'How do I convert Apex sensitivity to Valorant?',
        a: 'Multiply by 0.022 ÷ 0.07: Apex 1.5 becomes Valorant 0.471 at the same DPI. See the table above or use the <a href="/sensitivity-converter/">converter</a> for exact values and different DPI.',
      },
      {
        q: 'What is a good Apex sensitivity?',
        a: 'Most players sit between 1.0 and 2.0 at 800 DPI (roughly 30–60 cm/360). Tracking-heavy playstyle favours the slower end; aggressive movement players often prefer faster. Set it once from your preferred cm/360 and leave it.',
      },
      {
        q: 'Should I change my Apex FOV with sensitivity?',
        a: 'FOV changes how fast motion appears, not your rotation maths. If you switch from 90 to 110 FOV and feel "too fast", that is perception. Keep your cm/360 and give it a few sessions before adjusting. See the <a href="/fov-calculator/">FOV calculator</a> for how FOV and aspect interact.',
      },
    ],
    relatedGames: ['cs2', 'valorant', 'overwatch-2'],
  },
  {
    slug: 'fortnite',
    gameId: 'fortnite',
    name: 'Fortnite',
    title: 'Fortnite Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert Fortnite sensitivity (X% scale) to CS2, Valorant, Overwatch 2 and more. Percentage-system maths with cm/360. Free converter.',
    h1: 'Fortnite Sensitivity Converter & Calculator',
    intro: [
      'Fortnite is the odd one out: sensitivity is a percentage from 1–100 rather than a multiplier, each point equal to a yaw of <code>0.005555</code> degrees per mouse count. The game also splits X and Y axes, and applies separate build and edit multipliers, convert your X value first, then handle build/edit feel in-game.',
      'The table converts common Fortnite X% values to CS2, Valorant and Overwatch 2 at equal DPI. Note that Fortnite percentages look larger than CS2 numbers for the same feel, the yaw constants explain why.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.005555 per 1% (widely corroborated)' },
      { label: 'Input system', value: 'Percentage scale, 1–100; separate X / Y sliders' },
      { label: 'Typical sensitivity range', value: '4 – 15 (% value)' },
      { label: 'Build/edit multipliers', value: 'Separate 1.0–2.0× scales for building and editing' },
      { label: 'Notes', value: 'Convert the X value; leave Y and multipliers for in-game tuning' },
    ],
    tableFrom: { label: 'Fortnite X%', values: [4, 5, 6, 7, 8, 10, 12] },
    targets: ['cs2', 'valorant', 'overwatch2'],
    faq: [
      {
        q: 'How does Fortnite sensitivity conversion work with percentages?',
        a: 'Each 1% equals yaw 0.005555, so the full multiplier for value X is X × 0.005555 degrees per count. Conversion to another game multiplies by (0.005555 ÷ target_yaw): Fortnite 7% ≈ CS2 1.768 ≈ Valorant 0.556 at the same DPI.',
      },
      {
        q: 'What is a good Fortnite sensitivity?',
        a: 'Most players use 5–10% at 800 DPI (roughly 25–45 cm/360). Building-heavy play favours slightly higher values for fast edits; aim-heavy play favours lower. Convert once, then keep your cm/360 for cross-game consistency.',
      },
      {
        q: 'What should my build and edit multipliers be?',
        a: 'They are personal: start at 1.0× and increase only if your 90s or edits feel sluggish. The multipliers change structure-placement speed only. They do not affect aim rotation, so they are not part of the cross-game conversion.',
      },
      {
        q: 'Why is my Fortnite number (e.g. 7) so different from my CS2 number (e.g. 1.8)?',
        a: 'Because Fortnite is measured in percent and converted through a tiny yaw (0.005555) while CS2 uses 0.022 per unit. The ratio 0.005555 ÷ 0.022 ≈ 0.2525 is why you multiply Fortnite percentages by ~0.25 to get CS2 values.',
      },
    ],
    relatedGames: ['valorant', 'cs2', 'apex-legends'],
  },
  {
    slug: 'marvel-rivals',
    gameId: 'marvel-rivals',
    name: 'Marvel Rivals',
    title: 'Marvel Rivals Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert Marvel Rivals sensitivity to Valorant, Overwatch 2, CS2 and more. Yaw 0.022 maths with cm/360 and eDPI. Free, no sign-up.',
    h1: 'Marvel Rivals Sensitivity Converter & Calculator',
    intro: [
      'Marvel Rivals launched into the hero-shooter mainstream with strong crosshair-customisation demand, and it converts cleanly too. Its Unreal Engine 5 build uses a yaw of <code>0.022</code>, matching CS2 and Apex, so conversions between those games are 1:1 at the same DPI.',
      'The table converts common Marvel Rivals values to Valorant, Overwatch 2 and CS2. Most players arrive from Overwatch or Valorant, both directions are covered by the converter.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.022 (corroborated community sources, UE5)' },
      { label: 'Typical sensitivity range', value: '0.5 – 5 (slider value)' },
      { label: 'CS2 / Apex equivalence', value: '1:1, same yaw constant' },
      { label: 'Notes', value: 'Crosshair codes are the common way to share settings' },
    ],
    tableFrom: { label: 'Rivals sens', values: [1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0] },
    targets: ['valorant', 'overwatch2', 'cs2'],
    faq: [
      {
        q: 'How do I convert Marvel Rivals sensitivity to Valorant or Overwatch?',
        a: 'Use the same yaw model as everything else: multiply by 0.022 ÷ target_yaw. Rivals 2.0 ≈ Valorant 0.629 ≈ Overwatch 2 6.67 at the same DPI. The table above has common values; the <a href="/sensitivity-converter/">converter</a> handles any number.',
      },
      {
        q: 'Is Marvel Rivals sensitivity the same as CS2?',
        a: 'Hipfire rotation: yes. Both use yaw 0.022, so the numbers match 1:1 at equal DPI. Hero-specific feel still differs thanks to movement and projectile design.',
      },
      {
        q: 'What is a good Marvel Rivals sensitivity?',
        a: 'The game mixes dive heroes and ranged hitscan; most players settle around 2.0 at 800 DPI (roughly 45 cm/360) as a balanced starting point, then tune within about ±25% after a week of play.',
      },
    ],
    relatedGames: ['overwatch-2', 'valorant', 'cs2'],
  },
  {
    slug: 'rainbow-six-siege',
    gameId: 'r6',
    name: 'Rainbow Six Siege',
    title: 'Rainbow Six Siege Sensitivity Converter | SensForge',
    description:
      'Convert Rainbow Six Siege sensitivity to CS2, Valorant, Apex and more. Includes per-scope multiplier reference and cm/360 maths. Free tool.',
    h1: 'Rainbow Six Siege Sensitivity Converter & Calculator',
    intro: [
      'Rainbow Six Siege has the most complex sensitivity model in mainstream shooters: one hipfire value plus per-scope multipliers for every optic (1x through 12x). Siege\'s yaw constant is about <code>0.00573</code>, and its slider values are large by convention (most players use single or double digits).',
      'Convert your hipfire value with the table below, then check the scope multiplier reference before fine-tuning each optic.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.00572958 (corroborated, KovaaK source)' },
      { label: 'Typical sensitivity range', value: '4 – 20 (slider value)' },
      { label: 'Scope multipliers', value: 'Per-optic: 1x=1.0, 1.5x=0.667, 2x=0.5, 2.5x=0.4, 3x=0.333, 4x=0.25' },
      { label: 'Notes', value: 'Convert hipfire first; scope values tuned per-optic after' },
    ],
    tableFrom: { label: 'R6 sens', values: [5, 6, 8, 10, 12, 15, 20] },
    targets: ['cs2', 'valorant', 'apex'],
    faq: [
      {
        q: 'How do I convert my Siege sensitivity to CS2?',
        a: 'Multiply by 0.00572958 ÷ 0.022 ≈ 0.26: Siege 10 becomes CS2 2.605 at the same DPI. Common conversions run through the table above; for arbitrary values use the <a href="/sensitivity-converter/">full converter</a>.',
      },
      {
        q: 'What are the best scope multipliers in Siege?',
        a: 'The classic "unified" set scales with zoom: 1x=1.0, 1.5x=0.667, 2x=0.5, 2.5x=0.4, 3x=0.333, 4x=0.25 (5x and 12x continue the pattern). This keeps the on-screen speed of your aim roughly constant across optics. Many players run exactly this; others tune specific optics by feel.',
      },
      {
        q: 'Why is my Siege number so much bigger than my CS2 number?',
        a: 'Siege rotates far less per mouse count (yaw ≈ 0.00573 vs CS2\'s 0.022), so it needs a much larger slider value for the same physical turn; the ratio is about 3.84×.',
      },
      {
        q: 'Does ADS change the rotation maths?',
        a: 'ADS sensitivity multiplies your hipfire rotation by the scope multiplier and the zoom factor. The conversion tools match hipfire turn distance; scope feel is then a per-optic tuning choice using the reference above.',
      },
    ],
    relatedGames: ['cs2', 'valorant', 'apex-legends'],
  },
  {
    slug: 'deadlock',
    gameId: 'deadlock',
    name: 'Deadlock',
    title: 'Deadlock Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert Deadlock sensitivity to CS2, Valorant, Overwatch 2 and more. Source 2 yaw maths with cm/360 and eDPI. Early-mover tool, free.',
    h1: 'Deadlock Sensitivity Converter & Calculator',
    intro: [
      'Deadlock (Valve\'s third-person shooter-MOBA) runs on Source 2 and converges on the same yaw family as CS2 (<code>0.022</code>), though third-person camera framing means "feel" transfers less perfectly than between first-person titles. Treat the converted value as your exact rotation match and the feel as something to confirm in a few matches.',
      'The table converts common Deadlock values to Valorant, CS2 and Overwatch 2 at equal DPI.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.022 (corroborated; Source 2 family)' },
      { label: 'Typical sensitivity range', value: '0.5 – 4 (slider value)' },
      { label: 'CS2 equivalence', value: 'Same yaw family, numbers match closely' },
      { label: 'Notes', value: 'Third-person camera: verify feel in-game after converting' },
    ],
    tableFrom: { label: 'Deadlock sens', values: [0.8, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5] },
    targets: ['valorant', 'cs2', 'overwatch2'],
    faq: [
      {
        q: 'How do I convert my CS2 sensitivity to Deadlock?',
        a: 'Because both use the 0.022 yaw family, CS2 and Deadlock slider values are close to 1:1 at the same DPI, start by trying your CS2 number directly, then fine-tune. Use the <a href="/sensitivity-converter/">converter</a> to generate exact values against any target.',
      },
      {
        q: 'Why does Deadlock feel different even with a matched sensitivity?',
        a: 'It is a third-person game with a wider camera offset and different aim-down-sights behaviour. Rotation rate is matched by the maths; spatial reading takes a session or two to adapt. Judge after a full play session, not a warm-up.',
      },
      {
        q: 'What is a good Deadlock sensitivity?',
        a: 'The emerging community convention sits around 1.0–2.0 at 800 DPI, similar to tactical shooters. Pick your cross-game cm/360 and keep it; Deadlock aim is tracking-heavy with abilities mixed in.',
      },
    ],
    relatedGames: ['cs2', 'valorant', 'overwatch-2'],
  },
  {
    slug: 'escape-from-tarkov',
    gameId: 'tarkov',
    name: 'Escape from Tarkov',
    title: 'Escape from Tarkov Sensitivity Converter | SensForge',
    description:
      'Convert Escape from Tarkov sensitivity to CS2, Valorant, Apex and more. Yaw maths flagged single-source, honest accuracy labels included.',
    h1: 'Escape from Tarkov Sensitivity Converter & Calculator',
    intro: [
      'Tarkov\'s yaw constant (<code>0.113636</code>) is high, which is why Tarkov sensitivity values are small decimals, <code>0.5</code> in Tarkov converts to around <code>2.58</code> in CS2 at the same DPI. One honesty note: Tarkov\'s constant traces to a single technical source in our records, so treat converted values as strong starting points and confirm in a raid.',
      'The table converts common Tarkov values to CS2, Valorant and Apex at equal DPI.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.113636 (single-source, see methodology)' },
      { label: 'Typical sensitivity range', value: '0.2 – 1.0 (slider value)' },
      { label: 'Notes', value: 'Tarkov also applies aim-punch and weapon weight effects; converted value = pure rotation match' },
      { label: 'Confidence', value: 'Lower than CS2/Valorant, verify feel in-game' },
    ],
    tableFrom: { label: 'Tarkov sens', values: [0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.0] },
    targets: ['cs2', 'valorant', 'apex'],
    faq: [
      {
        q: 'How accurate is Tarkov sensitivity conversion?',
        a: 'Directional, not perfect. The 0.113636 constant is single-sourced in our records (labelled on the <a href="/methodology/">methodology page</a>), and Tarkov layers weight, stance and aim-punch modifiers on top. Convert as a starting point, then spend one raid fine-tuning ±5%.',
      },
      {
        q: 'How do I convert Tarkov sensitivity to CS2?',
        a: 'Multiply by 0.113636 ÷ 0.022 ≈ 5.165: Tarkov 0.5 becomes CS2 ~2.58 at the same DPI. Or use the <a href="/sensitivity-converter/">converter</a> with Tarkov selected as the source.',
      },
      {
        q: 'Why is my Tarkov number so small?',
        a: 'Tarkov rotates a lot per mouse count (yaw 0.1136), so small slider values produce large rotations. The slider range and its decimals are just a scale, your cm/360 is the number to compare with other games.',
      },
    ],
    relatedGames: ['cs2', 'valorant', 'apex-legends'],
  },
  {
    slug: 'the-finals',
    gameId: 'thefinals',
    name: 'The Finals',
    title: 'The Finals Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert The Finals sensitivity to CS2, Valorant, Overwatch 2 and more. Yaw 0.0066 maths with cm/360 matching. Free, in-browser.',
    h1: 'The Finals Sensitivity Converter & Calculator',
    intro: [
      'The Finals (Embark Studios, Unreal Engine 5) uses a yaw of <code>0.0066</code>, the same value family as Overwatch 2 and Call of Duty. That makes Overwatch 2 ↔ The Finals conversions effectively 1:1 at the same DPI, a useful bridge for players arriving from hero shooters.',
      'The table converts common The Finals values to CS2, Valorant and Overwatch 2 at equal DPI.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.0066 (corroborated, UE5)' },
      { label: 'Typical sensitivity range', value: '2 – 15 (slider value)' },
      { label: 'Overwatch 2 equivalence', value: 'Same yaw family, close to 1:1' },
      { label: 'Notes', value: 'Includes separate ADS zoom sensitivity settings' },
    ],
    tableFrom: { label: 'Finals sens', values: [4, 5, 6, 8, 10, 12, 15] },
    targets: ['cs2', 'valorant', 'overwatch2'],
    faq: [
      {
        q: 'How do I convert The Finals sensitivity to CS2?',
        a: 'Multiply by 0.0066 ÷ 0.022 = 0.3: The Finals 10 becomes CS2 3.0 at the same DPI. The table above covers common values; the <a href="/sensitivity-converter/">converter</a> handles arbitrary numbers and different DPI.',
      },
      {
        q: 'Is The Finals sensitivity the same as Overwatch 2?',
        a: 'Both games use yaw 0.0066, so equal slider values give equal physical rotation at the same DPI. Your Overwatch number is a directly usable starting point.',
      },
      {
        q: 'What is a good The Finals sensitivity?',
        a: 'The game moves fast, light builds and destruction fights reward turning speed. Common values run 6–10 at 800 DPI (roughly 40–70 cm/360). Start there and confirm with a week of play.',
      },
    ],
    relatedGames: ['overwatch-2', 'cs2', 'valorant'],
  },
  {
    slug: 'halo-infinite',
    gameId: 'halo-infinite',
    name: 'Halo Infinite',
    title: 'Halo Infinite Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert Halo Infinite sensitivity to CS2, Valorant, Apex and more. Yaw 0.0225 maths with cm/360 and eDPI. Free converter, no sign-up.',
    h1: 'Halo Infinite Sensitivity Converter & Calculator',
    intro: [
      'Halo Infinite\'s yaw sits at <code>0.0225</code>, very close to the Source-family 0.022, so CS2 and Apex conversions are within a few percent of direct values. The game splits horizontal, vertical and acceleration settings, giving you fine control once your base value is matched.',
      'The table converts common Halo Infinite values to CS2, Valorant and Apex at equal DPI.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.0225 (corroborated, KovaaK presets)' },
      { label: 'Typical sensitivity range', value: '0.5 – 4 (slider value)' },
      { label: 'CS2 comparison', value: 'With close constants, values run ~2.3% higher than CS2 for the same feel' },
      { label: 'Notes', value: 'Separate look acceleration setting can mask small differences, check it is off before judging' },
    ],
    tableFrom: { label: 'Halo sens', values: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0] },
    targets: ['cs2', 'valorant', 'apex'],
    faq: [
      {
        q: 'How do I convert Halo Infinite sensitivity to CS2?',
        a: 'Multiply by 0.0225 ÷ 0.022 ≈ 1.023, nearly 1:1. Halo 1.5 becomes CS2 ~1.53 at the same DPI. Use the <a href="/sensitivity-converter/">converter</a> for exact numbers.',
      },
      {
        q: 'Should I use look acceleration in Halo Infinite?',
        a: 'Competitive convention is to leave it off (0) for consistent rotation. With acceleration on, your effective sensitivity changes with mouse speed, which invalidates cm/360 comparisons, like OS-level mouse acceleration.',
      },
      {
        q: 'What is a good Halo Infinite sensitivity?',
        a: 'Common settings run 1.5–2.5 at 800 DPI (roughly 30–55 cm/360). Halo\'s long TTK rewards tracking stability, so a slightly slower value than twitch shooters often works well.',
      },
    ],
    relatedGames: ['cs2', 'apex-legends', 'valorant'],
  },
  {
    slug: 'destiny-2',
    gameId: 'destiny2',
    name: 'Destiny 2',
    title: 'Destiny 2 Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert Destiny 2 sensitivity to CS2, Valorant, Overwatch 2 and more. Yaw 0.0066 maths with cm/360 matching. Free, in-browser tool.',
    h1: 'Destiny 2 Sensitivity Converter & Calculator',
    intro: [
      'Destiny 2 uses a yaw of <code>0.0066</code>, shared with Overwatch 2, CoD and The Finals, so conversions within that family are effectively 1:1 at the same DPI. As a PvE-first game with PvP modes, most players convert in from a competitive shooter and adapt to Destiny\'s sci-fi movement.',
      'The table converts common Destiny 2 values to CS2, Valorant and Overwatch 2 at equal DPI.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.0066 (corroborated, Tiger engine family)' },
      { label: 'Typical sensitivity range', value: '2 – 12 (slider value)' },
      { label: 'Overwatch 2 equivalence', value: 'Same yaw, values transfer directly at equal DPI' },
      { label: 'Notes', value: 'Separate ADS multiplier settings apply per weapon zoom' },
    ],
    tableFrom: { label: 'D2 sens', values: [3, 4, 5, 6, 8, 10, 12] },
    targets: ['cs2', 'valorant', 'overwatch2'],
    faq: [
      {
        q: 'How do I convert Destiny 2 sensitivity to CS2 or Valorant?',
        a: 'Multiply by 0.0066 ÷ target_yaw: D2 5 becomes CS2 1.5 or Valorant 0.471 at the same DPI. The table above has common values; the <a href="/sensitivity-converter/">converter</a> covers everything else.',
      },
      {
        q: 'What is a good Destiny 2 sensitivity?',
        a: 'Most players use 4–8 at 800 DPI (roughly 30–60 cm/360). Crucible players often prefer the lower end for sniper precision; PvE players drift higher for add-clearing speed.',
      },
      {
        q: 'Does Destiny 2 have mouse acceleration?',
        a: 'At the OS level, yes it can, always confirm "Enhance pointer precision" is off (see the <a href="/dpi-analyzer/">DPI analyzer</a> checklist). In-game, sensitivity behaves as a pure multiplier, so cm/360 maths holds once the OS is clean.',
      },
    ],
    relatedGames: ['overwatch-2', 'cs2', 'the-finals'],
  },
  {
    slug: 'call-of-duty',
    gameId: 'cod',
    name: 'Call of Duty',
    title: 'Call of Duty Sensitivity Converter & Calculator | SensForge',
    description:
      'Convert Call of Duty (Warzone / MW) sensitivity to CS2, Valorant, Overwatch 2 and more. Yaw 0.0066 maths with cm/360. Free converter, no sign-up.',
    h1: 'Call of Duty Sensitivity Converter & Calculator',
    intro: [
      'Call of Duty (across Warzone and the Modern Warfare titles) uses a yaw of <code>0.0066</code>, the same family as Overwatch 2 and The Finals. That makes Overwatch↔CoD conversions near 1:1 at the same DPI, a handy bridge for players moving between the two biggest six-v-six and battle-royale crowds.',
      'The table converts common CoD values to CS2, Valorant and Overwatch 2 at equal DPI. Note Warzone and MW mainline titles share the same engine family, so one converted value covers both.',
    ],
    facts: [
      { label: 'Yaw constant', value: '0.0066 (corroborated, IW engine family)' },
      { label: 'Typical sensitivity range', value: '3 – 12 (slider value)' },
      { label: 'Overwatch 2 equivalence', value: 'Same yaw, values transfer directly at equal DPI' },
      { label: 'Notes', value: 'Separate ADS sensitivity multiplier exists, convert hipfire first' },
    ],
    tableFrom: { label: 'CoD sens', values: [4, 5, 6, 7, 8, 10, 12] },
    targets: ['cs2', 'valorant', 'overwatch2'],
    faq: [
      {
        q: 'How do I convert my Warzone sensitivity to CS2?',
        a: 'Multiply by 0.0066 ÷ 0.022 = 0.3: CoD 6 becomes CS2 1.8 at the same DPI. Use the <a href="/sensitivity-converter/">full converter</a> for exact values and different DPI; the table above covers common ones.',
      },
      {
        q: 'Do Warzone and Modern Warfare use the same sensitivity scale?',
        a: 'Yes: both run on the same IW engine family with yaw 0.0066. A converted value works across recent CoD titles, though check each game\'s own ADS multiplier settings before playing.',
      },
      {
        q: 'What is a good CoD sensitivity?',
        a: 'Most players sit between 5 and 9 at 800 DPI (roughly 30–50 cm/360). Warzone tracking favours the middle of that range; close-quarters MW play sometimes goes faster.',
      },
      {
        q: 'Why is my CoD number close to my Overwatch number?',
        a: 'Same yaw constant (0.0066). Equal slider values produce equal physical rotation at the same DPI, so Overwatch and CoD players can copy numbers directly between them.',
      },
    ],
    relatedGames: ['overwatch-2', 'the-finals', 'destiny-2'],
  },
];

export const gamePageBySlug = Object.fromEntries(gamePages.map((g) => [g.slug, g]));

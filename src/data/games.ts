/**
 * Game data for SensForge converters.
 *
 * yaw = degrees of camera rotation per mouse count (the constant every in-game
 * sensitivity slider multiplies). Conversion: sensA × DPI_A × yawA = sensB × DPI_B × yawB
 *
 * Sources for yaw values (accessed 2026-10-07):
 * - Valve documented m_yaw default (CS2/CS:GO = 0.022) — game's own cvar
 * - DCPROSENS complete yaw reference (cross-referenced 2+ independent sources):
 *   https://dcprosens.com/blog/complete-fps-yaw-value-reference/
 * - veronicalynn0528/fps-sensitivity-formulas (MIT reference tables)
 * Each entry carries a confidence field: "confirmed" | "corroborated" | "single-source".
 *
 * cm360 = 360 / (sens × DPI × yaw) × 2.54   (distance in cm for a full 360°)
 * eDPI  = sens × DPI
 */

export type GameId =
  | 'valorant'
  | 'cs2'
  | 'apex'
  | 'overwatch2'
  | 'fortnite'
  | 'r6'
  | 'cod'
  | 'marvel-rivals'
  | 'thefinals'
  | 'destiny2'
  | 'halo-infinite'
  | 'deadlock'
  | 'tarkov';

export interface Game {
  id: GameId;
  name: string;
  short: string;
  yaw: number;
  confidence: 'confirmed' | 'corroborated' | 'single-source';
  yawNote: string;
  /** range hint for showing typical values in UI copy */
  typicalSens: string;
  defaultSens: number;
  sensDecimals: number;
}

/** Canonical order used in dropdowns — most searched first. */
export const games: Game[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    short: 'VAL',
    yaw: 0.07,
    confidence: 'confirmed',
    yawNote: 'Widely corroborated constant',
    typicalSens: '0.1 – 1.0',
    defaultSens: 0.35,
    sensDecimals: 3,
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    short: 'CS2',
    yaw: 0.022,
    confidence: 'confirmed',
    yawNote: "Valve's documented m_yaw default",
    typicalSens: '0.4 – 3.5',
    defaultSens: 2.0,
    sensDecimals: 3,
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    short: 'APEX',
    yaw: 0.022,
    confidence: 'confirmed',
    yawNote: 'Same Source-family constant as CS2',
    typicalSens: '0.6 – 4.0',
    defaultSens: 1.5,
    sensDecimals: 3,
  },
  {
    id: 'overwatch2',
    name: 'Overwatch 2',
    short: 'OW2',
    yaw: 0.0066,
    confidence: 'confirmed',
    yawNote: 'Confirmed incl. KovaaK Sensitivity Matcher',
    typicalSens: '2 – 12',
    defaultSens: 5,
    sensDecimals: 2,
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    short: 'FN',
    yaw: 0.005555,
    confidence: 'confirmed',
    yawNote: 'Widely corroborated (UE5)',
    typicalSens: '3 – 15',
    defaultSens: 8,
    sensDecimals: 2,
  },
  {
    id: 'r6',
    name: 'Rainbow Six Siege',
    short: 'R6',
    yaw: 0.00572958,
    confidence: 'corroborated',
    yawNote: 'KovaaK Sensitivity Matcher source',
    typicalSens: '4 – 20',
    defaultSens: 10,
    sensDecimals: 2,
  },
  {
    id: 'cod',
    name: 'Call of Duty (Warzone / MW)',
    short: 'COD',
    yaw: 0.0066,
    confidence: 'corroborated',
    yawNote: 'IW engine family, cross-checked',
    typicalSens: '3 – 12',
    defaultSens: 6,
    sensDecimals: 2,
  },
  {
    id: 'marvel-rivals',
    name: 'Marvel Rivals',
    short: 'MR',
    yaw: 0.022,
    confidence: 'corroborated',
    yawNote: 'Cross-referenced community sources (UE5)',
    typicalSens: '0.5 – 5',
    defaultSens: 2,
    sensDecimals: 3,
  },
  {
    id: 'thefinals',
    name: 'The Finals',
    short: 'FIN',
    yaw: 0.0066,
    confidence: 'corroborated',
    yawNote: 'Cross-referenced community sources (UE5)',
    typicalSens: '2 – 15',
    defaultSens: 8,
    sensDecimals: 2,
  },
  {
    id: 'destiny2',
    name: 'Destiny 2',
    short: 'D2',
    yaw: 0.0066,
    confidence: 'corroborated',
    yawNote: 'Tiger engine family, cross-referenced',
    typicalSens: '2 – 12',
    defaultSens: 5,
    sensDecimals: 2,
  },
  {
    id: 'halo-infinite',
    name: 'Halo Infinite',
    short: 'HALO',
    yaw: 0.0225,
    confidence: 'corroborated',
    yawNote: 'Via KovaaK preset yaw profiles',
    typicalSens: '0.5 – 4',
    defaultSens: 1.5,
    sensDecimals: 3,
  },
  {
    id: 'deadlock',
    name: 'Deadlock',
    short: 'DL',
    yaw: 0.022,
    confidence: 'corroborated',
    yawNote: 'Sources converge (Source 2 family)',
    typicalSens: '0.5 – 4',
    defaultSens: 1.8,
    sensDecimals: 3,
  },
  {
    id: 'tarkov',
    name: 'Escape from Tarkov',
    short: 'EFT',
    yaw: 0.113636,
    confidence: 'single-source',
    yawNote: 'Single technical source — treat as a starting point',
    typicalSens: '0.2 – 1.0',
    defaultSens: 0.5,
    sensDecimals: 3,
  },
];

export const gameById = Object.fromEntries(games.map((g) => [g.id, g])) as Record<
  GameId,
  Game
>;

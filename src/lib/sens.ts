/**
 * Core sensitivity math for SensForge tools.
 * All formulas are pure functions, unit-tested in scripts/test-math.mjs.
 *
 * Model: a game's camera rotates `sens × yaw` degrees per mouse count.
 * Physical consistency ("same aim") is achieved by holding cm/360 constant:
 *
 *   cm360 = 360 / (sens × DPI × yaw) × 2.54        [cm per full turn]
 *   eDPI  = sens × DPI                              [effective dots per inch]
 *
 * Converting A → B at same physical feel:
 *   sensB = (sensA × DPI_A × yawA) / (DPI_B × yawB)
 */

export interface SensState {
  sens: number;
  dpi: number;
  yaw: number;
}

/** cm per 360° turn */
export function cm360({ sens, dpi, yaw }: SensState): number {
  if (!(sens > 0) || !(dpi > 0) || !(yaw > 0)) return NaN;
  return (360 / (sens * dpi * yaw)) * 2.54;
}

/** effective dots per inch */
export function edpi(sens: number, dpi: number): number {
  if (!(sens > 0) || !(dpi > 0)) return NaN;
  return sens * dpi;
}

/** inches per 360° turn */
export function inches360(state: SensState): number {
  const cm = cm360(state);
  return cm / 2.54;
}

/** Convert sensitivity from game A to game B holding cm/360 constant. */
export function convertSens(
  sensA: number,
  dpiA: number,
  yawA: number,
  dpiB: number,
  yawB: number,
): number {
  if (!(sensA > 0) || !(dpiA > 0) || !(dpiB > 0) || !(yawA > 0) || !(yawB > 0)) {
    return NaN;
  }
  return (sensA * dpiA * yawA) / (dpiB * yawB);
}

/** Sens needed to hit a target cm/360 in a game. */
export function sensForCm360(targetCm: number, dpi: number, yaw: number): number {
  if (!(targetCm > 0) || !(dpi > 0) || !(yaw > 0)) return NaN;
  return 360 / ((targetCm / 2.54) * dpi * yaw);
}

/**
 * FOV scaling helper: horizontal FOV of game B that keeps the focal length
 * consistent when viewing angle changes ("monitor distance match" horizontal).
 */
export function fovScaleFactor(
  fovA: number,
  fovB: number,
  aspectA = 16 / 9,
  aspectB = 16 / 9,
): number {
  const hA = degToRad(horizontalFromVertical(fovA, aspectA));
  const hB = degToRad(horizontalFromVertical(fovB, aspectB));
  const tA = Math.tan(hA / 2);
  const tB = Math.tan(hB / 2);
  if (!(tA > 0) || !(tB > 0)) return NaN;
  return tA / tB;
}

/** Convert a vertical FOV (as most games report) to horizontal for aspect ratio. */
export function horizontalFromVertical(vFov: number, aspect = 16 / 9): number {
  const vRad = degToRad(vFov);
  const hRad = 2 * Math.atan(Math.tan(vRad / 2) * aspect);
  return radToDeg(hRad);
}

export function verticalFromHorizontal(hFov: number, aspect = 16 / 9): number {
  const hRad = degToRad(hFov);
  const vRad = 2 * Math.atan(Math.tan(hRad / 2) / aspect);
  return radToDeg(vRad);
}

export function degToRad(d: number): number {
  return (d * Math.PI) / 180;
}

export function radToDeg(r: number): number {
  return (r * 180) / Math.PI;
}

/**
 * FOV cross-conversion assuming a fixed vertical FOV (most modern shooters keep
 * vertical FOV constant across aspect ratios). Returns horizontal FOV.
 */
export function hfovForAspect(vFov: number, aspect: number): number {
  return horizontalFromVertical(vFov, aspect);
}

/**
 * 360° distance in cm converted to "mousepad feel" label used in UI copy.
 */
export function sensTier(cm: number): 'low' | 'medium' | 'high' | 'very-high' {
  if (cm >= 60) return 'low';
  if (cm >= 30) return 'medium';
  if (cm >= 15) return 'high';
  return 'very-high';
}

/**
 * DPI calculator: given mousepad travel for a 360 turn (cm), sensitivity and
 * yaw, solve for the DPI that produces it.
 *   dpi = 360 / (sens × yaw × inches)
 */
export function dpiForCm360(
  targetCm360: number,
  sens: number,
  yaw: number,
): number {
  if (!(targetCm360 > 0) || !(sens > 0) || !(yaw > 0)) return NaN;
  const inches = targetCm360 / 2.54;
  return 360 / (sens * yaw * inches);
}

/**
 * eDPI-normalized "in-game rank" helper for the compare table: lower sens in
 * high-yaw games is normal; the neutral comparison metric is cm/360.
 */
export function normalizeToNeutral(state: SensState): { cm360: number; edpi: number } {
  return { cm360: cm360(state), edpi: edpi(state.sens, state.dpi) };
}

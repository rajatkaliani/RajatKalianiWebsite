import * as THREE from "three";

export const STAGES = {
  idle: [0.0, 0.18] as const,
  rotate: [0.12, 0.32] as const,
  dissolve: [0.28, 0.5] as const,
  fibers: [0.32, 0.62] as const,
  core: [0.55, 0.78] as const,
  labels: [0.74, 0.96] as const,
};

export function stageProgress(p: number, [start, end]: readonly [number, number]) {
  return THREE.MathUtils.clamp((p - start) / (end - start), 0, 1);
}

export function smoothstep(x: number) {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

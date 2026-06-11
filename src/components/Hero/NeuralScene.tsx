"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STAGES, smoothstep, stageProgress } from "./stages";
import { IntelligenceCore } from "./IntelligenceCore";

type Props = {
  scrollProgress: React.RefObject<number>;
  src?: string;
};

const SAMPLE_WIDTH = 220;
const PIXEL_STEP = 2;
const FACE_THRESHOLD = 0.82;
const WORLD_SCALE = 0.018;
const LINE_PAIRS = 260;

function generateFallback(): Float32Array {
  const pts: number[] = [];
  for (let i = 0; i < 4500; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random());
    pts.push(Math.cos(a) * r * 1.9, Math.sin(a) * r * 2.4 + 0.2, (Math.random() - 0.5) * 0.15);
  }
  return new Float32Array(pts);
}

function generateDispersed(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 4.2 + Math.random() * 4.5;
    out[i * 3] = Math.cos(a) * Math.sin(phi) * r;
    out[i * 3 + 1] = Math.sin(a) * Math.sin(phi) * r * 0.7;
    out[i * 3 + 2] = Math.cos(phi) * r * 0.8;
  }
  return out;
}

export function NeuralScene({ scrollProgress, src = "/headshot.png" }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsMatRef = useRef<THREE.PointsMaterial>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const [base, setBase] = useState<Float32Array | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const w = SAMPLE_WIDTH;
      const h = Math.round((img.height / img.width) * w);
      const cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      const ctx = cv.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);
      const pts: number[] = [];
      for (let y = 0; y < h; y += PIXEL_STEP) {
        for (let x = 0; x < w; x += PIXEL_STEP) {
          const i = (y * w + x) * 4;
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / (3 * 255);
          if (brightness < FACE_THRESHOLD && Math.random() < 0.55) {
            pts.push(
              (x - w / 2) * WORLD_SCALE,
              -(y - h / 2) * WORLD_SCALE,
              (Math.random() - 0.5) * 0.12,
            );
          }
        }
      }
      setBase(new Float32Array(pts));
    };
    img.onerror = () => {
      if (!cancelled) setBase(generateFallback());
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  const dispersed = useMemo(() => (base ? generateDispersed(base.length / 3) : null), [base]);
  const positions = useMemo(() => (base ? new Float32Array(base) : null), [base]);
  const pointCount = base ? base.length / 3 : 0;

  const linePairs = useMemo(() => {
    if (!pointCount) return null;
    const pairs = new Uint32Array(LINE_PAIRS * 2);
    for (let i = 0; i < LINE_PAIRS; i++) {
      pairs[i * 2] = Math.floor(Math.random() * pointCount);
      pairs[i * 2 + 1] = Math.floor(Math.random() * pointCount);
    }
    return pairs;
  }, [pointCount]);

  const linePositions = useMemo(
    () => (linePairs ? new Float32Array(LINE_PAIRS * 6) : null),
    [linePairs],
  );

  const pointsGeom = useMemo(() => {
    if (!positions) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  const linesGeom = useMemo(() => {
    if (!linePositions) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  useFrame(({ clock }) => {
    if (!base || !dispersed || !positions || !pointsGeom) return;
    const t = clock.elapsedTime;
    const p = THREE.MathUtils.clamp(scrollProgress.current ?? 0, 0, 1);

    const rotateS = smoothstep(stageProgress(p, STAGES.rotate));
    const dissolveS = smoothstep(stageProgress(p, STAGES.dissolve));
    const fibersS = smoothstep(stageProgress(p, STAGES.fibers));
    const coreS = smoothstep(stageProgress(p, STAGES.core));

    for (let i = 0; i < base.length; i += 3) {
      const drift = Math.sin(t * 0.45 + i * 0.013) * 0.018;
      const bob = Math.cos(t * 0.5 + i * 0.011) * 0.014;
      positions[i] = THREE.MathUtils.lerp(base[i] + drift, dispersed[i], dissolveS);
      positions[i + 1] = THREE.MathUtils.lerp(base[i + 1] + bob, dispersed[i + 1], dissolveS);
      positions[i + 2] = THREE.MathUtils.lerp(base[i + 2], dispersed[i + 2], dissolveS);
    }
    pointsGeom.attributes.position.needsUpdate = true;

    if (linePositions && linePairs && linesGeom) {
      for (let i = 0; i < LINE_PAIRS; i++) {
        const a = linePairs[i * 2] * 3;
        const b = linePairs[i * 2 + 1] * 3;
        const li = i * 6;
        linePositions[li] = positions[a];
        linePositions[li + 1] = positions[a + 1];
        linePositions[li + 2] = positions[a + 2];
        linePositions[li + 3] = positions[b];
        linePositions[li + 4] = positions[b + 1];
        linePositions[li + 5] = positions[b + 2];
      }
      linesGeom.attributes.position.needsUpdate = true;
    }

    if (pointsMatRef.current) {
      pointsMatRef.current.opacity = 0.55 + 0.35 * dissolveS;
      pointsMatRef.current.size = 0.024 + 0.014 * dissolveS;
    }
    if (lineMatRef.current) {
      lineMatRef.current.opacity = 0.26 * fibersS * (1 - 0.55 * coreS);
    }

    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(t * 0.18) * 0.05 + rotateS * 0.7 + dissolveS * 0.5;
      groupRef.current.rotation.x = -0.06 * rotateS + Math.sin(t * 0.12) * 0.02;
    }
  });

  if (!pointsGeom || !linesGeom) return null;

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeom}>
        <pointsMaterial
          ref={pointsMatRef}
          size={0.024}
          color="#FF9A1F"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={linesGeom}>
        <lineBasicMaterial
          ref={lineMatRef}
          color="#FFC45A"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <IntelligenceCore scrollProgress={scrollProgress} />
    </group>
  );
}

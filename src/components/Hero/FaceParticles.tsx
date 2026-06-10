"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  scrollProgress: React.RefObject<number>;
  src?: string;
};

const SAMPLE_WIDTH = 220;
const PIXEL_STEP = 2;
const FACE_THRESHOLD = 0.82;
const WORLD_SCALE = 0.018;

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
    const r = 3.2 + Math.random() * 4.5;
    out[i * 3] = Math.cos(a) * r;
    out[i * 3 + 1] = Math.sin(a) * r * 0.65;
    out[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
  }
  return out;
}

export function FaceParticles({ scrollProgress, src = "/headshot.png" }: Props) {
  const pointsRef = useRef<THREE.Points>(null);
  const [base, setBase] = useState<Float32Array | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const w = SAMPLE_WIDTH;
      const h = Math.round((img.height / img.width) * w);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);

      const pts: number[] = [];
      for (let y = 0; y < h; y += PIXEL_STEP) {
        for (let x = 0; x < w; x += PIXEL_STEP) {
          const i = (y * w + x) * 4;
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / (3 * 255);
          if (brightness < FACE_THRESHOLD && Math.random() < 0.55) {
            const wx = (x - w / 2) * WORLD_SCALE;
            const wy = -(y - h / 2) * WORLD_SCALE;
            const wz = (Math.random() - 0.5) * 0.12;
            pts.push(wx, wy, wz);
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
  const geometry = useMemo(() => {
    if (!base) return null;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(base.slice(), 3));
    return geo;
  }, [base]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !base || !dispersed || !geometry) return;
    const t = clock.elapsedTime;
    const p = THREE.MathUtils.clamp(scrollProgress.current ?? 0, 0, 1);
    const ease = p * p * (3 - 2 * p);
    const arr = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < base.length; i += 3) {
      const drift = Math.sin(t * 0.45 + i * 0.013) * 0.018;
      const bob = Math.cos(t * 0.5 + i * 0.011) * 0.014;
      arr[i] = THREE.MathUtils.lerp(base[i] + drift, dispersed[i], ease);
      arr[i + 1] = THREE.MathUtils.lerp(base[i + 1] + bob, dispersed[i + 1], ease);
      arr[i + 2] = THREE.MathUtils.lerp(base[i + 2], dispersed[i + 2], ease);
    }
    geometry.attributes.position.needsUpdate = true;

    const rotY = Math.sin(t * 0.15) * 0.04 + ease * 0.35;
    pointsRef.current.rotation.y = rotY;
  });

  if (!geometry) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.028}
        color="#FF9A1F"
        transparent
        opacity={0.78}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

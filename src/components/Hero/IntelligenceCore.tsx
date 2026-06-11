"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STAGES, smoothstep, stageProgress } from "./stages";

type Props = { scrollProgress: React.RefObject<number> };

export function IntelligenceCore({ scrollProgress }: Props) {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null);
  const haloMat = useRef<THREE.MeshBasicMaterial>(null);
  const outerMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = THREE.MathUtils.clamp(scrollProgress.current ?? 0, 0, 1);
    const cs = smoothstep(stageProgress(p, STAGES.core));
    const pulse = 1 + Math.sin(t * 1.8) * 0.06 * cs;

    if (coreRef.current) coreRef.current.scale.setScalar(cs * 0.42 * pulse);
    if (haloRef.current) haloRef.current.scale.setScalar(cs * 1.05 * pulse);
    if (outerRef.current) outerRef.current.scale.setScalar(cs * 1.9 * pulse);
    if (coreMat.current) coreMat.current.opacity = cs;
    if (haloMat.current) haloMat.current.opacity = cs * 0.55;
    if (outerMat.current) outerMat.current.opacity = cs * 0.18;
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          ref={outerMat}
          color="#FFB547"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          ref={haloMat}
          color="#FFC45A"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          ref={coreMat}
          color="#FFFFFF"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

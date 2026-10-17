"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import { Component, useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { CanvasTexture, Group, InstancedMesh, MeshBasicMaterial, Object3D, SRGBColorSpace } from "three";
import { useTheme } from "./ThemeProvider";

type KeyboardProps = {
  ready: boolean;
  onAssembled: () => void;
  keyStroke: { key: string; id: number } | null;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  hoverX: MotionValue<number>;
  hoverY: MotionValue<number>;
  scroll: MotionValue<number>;
};

type Tone = "frame" | "deck" | "key" | "muted" | "accent";

type Piece = {
  position: [number, number, number];
  size: [number, number, number];
  tone: Tone;
  delay: number;
  kind: "case" | "key";
  keyLabel?: string;
};

function createPieces(): Piece[] {
  const pieces: Piece[] = [
    { position: [0, 0, -0.18], size: [4.45, 1.82, 0.34], tone: "frame", delay: 0, kind: "case" },
    { position: [0, 0, 0.025], size: [4.18, 1.55, 0.07], tone: "deck", delay: 0.17, kind: "case" },
  ];

  const rows = [
    { y: 0.55, labels: "qwertyuiop", first: -1.755 },
    { y: 0.18, labels: "asdfghjkl;'", first: -1.95 },
    { y: -0.19, labels: "zxcvbnm,.", first: -1.56 },
  ];
  rows.forEach((row, rowIndex) => {
    for (let column = 0; column < row.labels.length; column++) {
      pieces.push({
        position: [row.first + column * 0.39, row.y, 0.18],
        size: [0.335, 0.29, 0.16],
        tone: rowIndex === 0 && column === 0 ? "accent" : (column + rowIndex) % 7 === 0 ? "muted" : "key",
        delay: 0.38 + rowIndex * 0.14 + column * 0.018,
        kind: "key",
        keyLabel: row.labels[column],
      });
    }
  });
  [-1.55, -1.15, -0.75].forEach((x, index) => {
    pieces.push({ position: [x, -0.57, 0.18], size: [0.335, 0.29, 0.16], tone: "muted", delay: 0.78 + index * 0.045, kind: "key", keyLabel: ["ctrl", "alt", "fn"][index] });
  });
  pieces.push({ position: [0.3, -0.57, 0.18], size: [1.55, 0.29, 0.16], tone: "key", delay: 0.91, kind: "key", keyLabel: " " });
  [1.4, 1.79].forEach((x, index) => {
    pieces.push({ position: [x, -0.57, 0.18], size: [0.335, 0.29, 0.16], tone: index === 1 ? "accent" : "muted", delay: 0.92 + index * 0.05, kind: "key", keyLabel: ["cmd", "enter"][index] });
  });
  return pieces;
}

const PIECES = createPieces();

function makeKeyLabels(dark: boolean) {
  const labels = new Map<string, CanvasTexture>();
  for (const piece of PIECES) {
    const label = piece.keyLabel;
    if (!label || label === " " || labels.has(label)) continue;
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (!context) continue;
    context.fillStyle = dark ? "#122a3a" : "#24445a";
    context.font = `600 ${label.length > 1 ? 38 : 74}px Arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(label, 64, 68);
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    labels.set(label, texture);
  }
  return labels;
}

function hash(value: number) {
  const result = Math.sin(value * 127.1) * 43758.5453;
  return result - Math.floor(result);
}

function departure(piece: Piece, scrollExit: number) {
  const start = piece.kind === "key" ? 0 : 0.24;
  const end = piece.kind === "key" ? 0.78 : 1;
  const t = Math.min(1, Math.max(0, (scrollExit - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

const ASH = PIECES.flatMap((piece, pieceIndex) =>
  Array.from({ length: piece.kind === "case" ? 26 : 7 }, (_, particleIndex) => {
    const seed = pieceIndex * 32 + particleIndex;
    const target: [number, number, number] = [
      piece.position[0] + (hash(seed + 0.1) - 0.5) * piece.size[0],
      piece.position[1] + (hash(seed + 0.2) - 0.5) * piece.size[1],
      piece.position[2] + (hash(seed + 0.3) - 0.5) * piece.size[2],
    ];
    const origin: [number, number, number] = [
      target[0] + (hash(seed + 0.4) - 0.5) * 1.6,
      target[1] + (hash(seed + 0.5) - 0.5) * 1.9,
      target[2] + (hash(seed + 0.6) - 0.5) * 1.8,
    ];
    const wind: [number, number, number] = [
      1.1 + hash(seed + 0.9) * 1.8,
      0.4 + (hash(seed + 1.0) - 0.5) * 2.2,
      (hash(seed + 1.1) - 0.5) * 1.7,
    ];
    return { pieceIndex, target, origin, wind, delay: piece.delay * 0.45 + hash(seed + 0.7) * 0.25, size: 0.55 + hash(seed + 0.8) * 0.9 };
  }),
);

function Keyboard({ ready, onAssembled, keyStroke, pointerX, pointerY, hoverX, hoverY, scroll, dragPitch, dragYaw, dark, still, visible, compact }: KeyboardProps & {
  dragPitch: MotionValue<number>;
  dragYaw: MotionValue<number>;
  dark: boolean;
  still: boolean;
  visible: boolean;
  compact: boolean;
}) {
  const root = useRef<Group>(null);
  const pieces = useRef<({
    position: { set: (x: number, y: number, z: number) => unknown };
    rotation: { set: (x: number, y: number, z: number) => unknown };
    scale: { setScalar: (value: number) => unknown };
  } | null)[]>([]);
  const materials = useRef<({ emissiveIntensity: number } | null)[]>([]);
  const ash = useRef<InstancedMesh>(null);
  const ashMaterial = useRef<MeshBasicMaterial>(null);
  const fragment = useMemo(() => new Object3D(), []);
  const startedAt = useRef<number | null>(null);
  const assembledNotified = useRef(false);
  const lastStrokeId = useRef(0);
  const strokeAt = useRef(-1);
  const keyLabels = useMemo(() => makeKeyLabels(dark), [dark]);

  useEffect(() => () => keyLabels.forEach((texture) => texture.dispose()), [keyLabels]);
  const idleFrame = useRef<number | null>(null);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!visible && idleFrame.current !== null) {
      window.clearTimeout(idleFrame.current);
      idleFrame.current = null;
    }
    return () => {
      if (idleFrame.current !== null) window.clearTimeout(idleFrame.current);
      idleFrame.current = null;
    };
  }, [visible]);

  useEffect(() => {
    if (ready && visible) invalidate();
  }, [ready, visible, keyStroke, invalidate]);

  useEffect(() => {
    const unsubs = [pointerX, pointerY, hoverX, hoverY, scroll, dragPitch, dragYaw].map((value) => value.on("change", invalidate));
    return () => unsubs.forEach((unsubscribe) => unsubscribe());
  }, [pointerX, pointerY, hoverX, hoverY, scroll, dragPitch, dragYaw, invalidate]);

  const colors: Record<Tone, string> = dark
    ? { frame: "#314b61", deck: "#183249", key: "#a6c0d2", muted: "#6f8ba1", accent: "#dcecf5" }
    : { frame: "#456982", deck: "#b7cad5", key: "#e5eef2", muted: "#aac0ce", accent: "#315f86" };

  useFrame(({ clock }, delta) => {
    if (!root.current) return;
    if (ready && startedAt.current === null) startedAt.current = clock.elapsedTime;
    const elapsed = startedAt.current === null ? 0 : clock.elapsedTime - startedAt.current;
    if (ready && !assembledNotified.current && (still || elapsed >= 2.4)) {
      assembledNotified.current = true;
      onAssembled();
    }
    if (keyStroke && keyStroke.id !== lastStrokeId.current) {
      lastStrokeId.current = keyStroke.id;
      strokeAt.current = clock.elapsedTime;
    }
    const scrollExit = still ? 0 : Math.min(1, Math.max(0, (scroll.get() - 0.09) / 0.56));
    const pointerLocalX = (hoverX.get() - (compact ? 3 : 5.3)) * (compact ? 0.22 : 0.38);
    const pointerLocalY = -(hoverY.get() - (compact ? -3.8 : -0.35)) * (compact ? 0.48 : 0.31);

    PIECES.forEach((piece, index) => {
      const part = pieces.current[index];
      if (!part) return;
      const t = still ? 1 : Math.min(1, Math.max(0, (elapsed - 0.28 - piece.delay) / 1.05));
      const formed = t * t * (3 - 2 * t);
      const exit = departure(piece, scrollExit);
      const distance = Math.hypot((pointerLocalX - piece.position[0]) / 0.43, (pointerLocalY - piece.position[1]) / 0.38);
      const hover = piece.kind === "key" && !still ? Math.pow(Math.max(0, 1 - distance / 1.55), 2) * (1 - exit) : 0;
      const strokeAge = clock.elapsedTime - strokeAt.current;
      const press = piece.keyLabel === keyStroke?.key && strokeAge >= 0 && strokeAge < 0.24
        ? Math.sin(Math.PI * strokeAge / 0.24) * (1 - exit) : 0;
      const dance = piece.kind === "key" && !still ? Math.sin(clock.elapsedTime * 1.75 + index * 0.57) : 0;
      const pulse = 1 + dance * 0.024 + hover * 0.075 - press * 0.075;

      part.position.set(
        piece.position[0] + exit * (hash(index + 3.1) - 0.5) * 0.15,
        piece.position[1] + (1 - formed) * 0.13 + dance * 0.013 * formed * (1 - exit),
        piece.position[2] + (1 - formed) * 0.2 + dance * 0.022 * formed * (1 - exit) + hover * 0.16 - press * 0.105 + exit * 0.18,
      );
      part.scale.setScalar(Math.max(0.001, formed * (1 - exit) * pulse));
      part.rotation.set(
        (1 - formed) * Math.sin(index * 1.9) * 0.25 + exit * 0.1,
        (1 - formed) * Math.cos(index * 2.3) * 0.28 + exit * 0.12,
        (1 - formed) * Math.sin(index * 1.4) * 0.2,
      );
      const material = materials.current[index];
      if (material) material.emissiveIntensity = piece.kind === "key" ? (piece.tone === "accent" ? 0.1 : 0.025) + hover * 0.45 + press * 1.15 : 0;
    });

    if (ash.current && ashMaterial.current && !still) {
      const appear = Math.min(1, Math.max(0, elapsed / 0.3));
      const dissolve = Math.min(1, Math.max(0, (elapsed - 1.25) / 1.1));
      const formationOpacity = 0.7 * appear * (1 - dissolve);
      ashMaterial.current.opacity = Math.max(formationOpacity, scrollExit > 0 && scrollExit < 1 ? 0.8 : 0);
      ash.current.visible = ashMaterial.current.opacity > 0.005;
      if (ash.current.visible) {
        ASH.forEach((particle, index) => {
          const t = Math.min(1, Math.max(0, (elapsed - particle.delay) / 1.45));
          const gather = t * t * (3 - 2 * t);
          const exit = departure(PIECES[particle.pieceIndex], scrollExit);
          const drift = (1 - gather) * 0.12 + exit * (1 - exit) * 0.2;
          fragment.position.set(
            particle.origin[0] + (particle.target[0] - particle.origin[0]) * gather + particle.wind[0] * exit + Math.sin(elapsed * 2.2 + index) * drift,
            particle.origin[1] + (particle.target[1] - particle.origin[1]) * gather + particle.wind[1] * exit + Math.cos(elapsed * 1.7 + index) * drift,
            particle.origin[2] + (particle.target[2] - particle.origin[2]) * gather + particle.wind[2] * exit,
          );
          fragment.rotation.set(elapsed * 0.7 + index, elapsed * 0.4 + index * 0.7, 0);
          const formationDust = formationOpacity > 0 ? 1 - gather * 0.55 : 0;
          fragment.scale.setScalar(particle.size * Math.max(formationDust, Math.sin(Math.PI * exit)));
          fragment.updateMatrix();
          ash.current!.setMatrixAt(index, fragment.matrix);
        });
        ash.current.instanceMatrix.needsUpdate = true;
      }
    }

    const ease = 1 - Math.exp(-Math.min(delta, 0.05) * 4);
    const targetX = -0.48 + dragPitch.get() + (still ? 0 : pointerY.get() / 9) * 0.06;
    const targetY = -0.25 + dragYaw.get() + (still ? 0 : pointerX.get() / 12) * 0.09 + scroll.get() * 0.08;
    root.current.rotation.x += (targetX - root.current.rotation.x) * ease;
    root.current.rotation.y += (targetY - root.current.rotation.y) * ease;

    if (!still && ready && visible) {
      const settling = Math.abs(targetX - root.current.rotation.x) > 0.002 || Math.abs(targetY - root.current.rotation.y) > 0.002;
      if (elapsed < 3 || settling || clock.elapsedTime - strokeAt.current < 0.28) {
        invalidate();
      } else if (scrollExit < 0.98 && idleFrame.current === null) {
        idleFrame.current = window.setTimeout(() => {
          idleFrame.current = null;
          invalidate();
        }, compact ? 50 : 33);
      }
    }
  });

  return (
    <group ref={root} rotation={[-0.48, -0.25, 0]} scale={compact ? 0.82 : 1}>
      {PIECES.map((piece, index) => (
        <group key={index} ref={(node) => { pieces.current[index] = node; }} position={piece.position} scale={still ? 1 : 0.001}>
          <RoundedBox args={piece.size} radius={piece.kind === "case" ? 0.1 : 0.035} smoothness={3}>
            <meshPhysicalMaterial
              ref={(node) => { materials.current[index] = node; }}
              color={colors[piece.tone]}
              emissive={dark ? "#8dbbd8" : "#315f86"}
              emissiveIntensity={0}
              metalness={piece.kind === "case" ? 0.33 : 0.17}
              roughness={piece.kind === "case" ? 0.3 : 0.38}
              clearcoat={0.65}
            />
          </RoundedBox>
          {piece.keyLabel && piece.keyLabel !== " " && keyLabels.has(piece.keyLabel) && (
            <mesh position={[0, 0, piece.size[2] / 2 + 0.008]}>
              <planeGeometry args={[piece.keyLabel.length > 1 ? 0.25 : 0.18, 0.18]} />
              <meshBasicMaterial map={keyLabels.get(piece.keyLabel) as never} transparent depthWrite={false} toneMapped={false} />
            </mesh>
          )}
        </group>
      ))}
      <instancedMesh ref={ash} args={[undefined, undefined, ASH.length]} visible={!still} frustumCulled={false}>
        <icosahedronGeometry args={[0.035, 0]} />
        <meshBasicMaterial ref={ashMaterial} color={dark ? "#9aaebb" : "#708b9b"} transparent opacity={0} depthWrite={false} />
      </instancedMesh>
    </group>
  );
}

class SculptureBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function HeroSculpture({ ready, onAssembled, keyStroke, pointerX, pointerY, hoverX, hoverY, scroll }: KeyboardProps) {
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [compact, setCompact] = useState(false);
  const dragPitch = useMotionValue(0);
  const dragYaw = useMotionValue(0);
  const dragPosition = useRef({ x: 0, y: 0 });
  const dragStart = useRef<{ pointerId: number; mode: "move" | "rotate"; x: number; y: number; offsetX: number; offsetY: number; pitch: number; yaw: number; minX: number; maxX: number; minY: number; maxY: number } | null>(null);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!ready || (event.pointerType === "mouse" && event.button !== 0 && event.button !== 2)) return;
    const mode = event.shiftKey || event.button === 2 ? "rotate" : "move";
    const keyboard = event.currentTarget;
    const frame = keyboard.closest(".hero-frame");
    if (!frame) return;
    const bounds = keyboard.getBoundingClientRect();
    const frameBounds = frame.getBoundingClientRect();
    const baseLeft = bounds.left - dragPosition.current.x;
    const baseTop = bounds.top - dragPosition.current.y;
    dragStart.current = {
      pointerId: event.pointerId, mode, x: event.clientX, y: event.clientY,
      offsetX: dragPosition.current.x, offsetY: dragPosition.current.y,
      pitch: dragPitch.get(), yaw: dragYaw.get(),
      minX: frameBounds.left - baseLeft, maxX: frameBounds.right - baseLeft - bounds.width,
      minY: frameBounds.top - baseTop, maxY: frameBounds.bottom - baseTop - bounds.height,
    };
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    const keyboard = event.currentTarget;
    if (start.mode === "rotate") {
      const bounds = keyboard.getBoundingClientRect();
      dragYaw.set(Math.max(-0.9, Math.min(0.9, start.yaw + (event.clientX - start.x) / bounds.width * 2.2)));
      dragPitch.set(Math.max(-0.55, Math.min(0.55, start.pitch + (event.clientY - start.y) / bounds.height * 1.4)));
      return;
    }
    const x = Math.max(start.minX, Math.min(start.maxX, start.offsetX + event.clientX - start.x));
    const y = Math.max(start.minY, Math.min(start.maxY, start.offsetY + event.clientY - start.y));
    dragPosition.current = { x, y };
    const device = keyboard.parentElement;
    device?.style.setProperty("--keyboard-drag-x", `${x}px`);
    device?.style.setProperty("--keyboard-drag-y", `${y}px`);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current?.pointerId !== event.pointerId) return;
    dragStart.current = null;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  useEffect(() => {
    const device = container.current?.parentElement;
    return () => {
      device?.style.removeProperty("--keyboard-drag-x");
      device?.style.removeProperty("--keyboard-drag-y");
    };
  }, []);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div ref={container} className="hero-sculpture" aria-hidden="true" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onContextMenu={(event) => event.preventDefault()}>
      <SculptureBoundary>
        <Canvas
          camera={{ position: [0, 0, 6.1], fov: 34, near: 0.1, far: 30 }}
          dpr={compact ? 1 : [1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          frameloop={visible ? "demand" : "never"}
          fallback={null}
        >
          <ambientLight intensity={1.25} />
          <directionalLight position={[3, 5, 6]} intensity={3.2} color="#ffffff" />
          <directionalLight position={[-4, -2, 1]} intensity={1.5} color={resolvedTheme === "dark" ? "#7baed9" : "#89a8c0"} />
          <Keyboard ready={ready} onAssembled={onAssembled} keyStroke={keyStroke} pointerX={pointerX} pointerY={pointerY} hoverX={hoverX} hoverY={hoverY} scroll={scroll} dragPitch={dragPitch} dragYaw={dragYaw} dark={resolvedTheme === "dark"} still={!!reduceMotion} visible={visible} compact={compact} />
        </Canvas>
      </SculptureBoundary>
    </div>
  );
}

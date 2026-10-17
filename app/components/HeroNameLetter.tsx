"use client";

import { useEffect, useId, useRef, useState } from "react";

type Cell = { x: number; y: number; width: number; height: number };
type Shape = { width: number; height: number; bleedX: number; bleedY: number; baseline: number; fontSize: number; fontWeight: string; fontFamily: string; cells: Cell[] };

export default function HeroNameLetter({ letter, reducedMotion }: { letter: string; reducedMotion: boolean }) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [shape, setShape] = useState<Shape | null>(null);
  const [failed, setFailed] = useState(false);
  const id = useId().replace(/:/g, "");
  const maskId = `hero-glyph-${id}`;
  const surfaceId = `hero-surface-${id}`;

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    const measure = measureRef.current;
    if (!measure) return;

    const build = () => {
      if (cancelled || window.matchMedia("(max-width: 750px)").matches) return;
      const contentWidth = Math.ceil(measure.offsetWidth);
      const contentHeight = Math.ceil(measure.offsetHeight);
      if (!contentWidth || !contentHeight) return;
      const style = getComputedStyle(measure);
      const fontSize = parseFloat(style.fontSize);
      const bleedX = Math.ceil(fontSize * .13);
      const bleedY = Math.ceil(fontSize * .05);
      const width = contentWidth + bleedX * 2;
      const height = contentHeight + bleedY * 2;
      const tile = Math.max(6, Math.round(fontSize / 14));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) { setFailed(true); return; }

      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      context.textBaseline = "alphabetic";
      context.fillStyle = "#fff";
      const metrics = context.measureText(letter);
      const baseline = bleedY + (contentHeight + metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
      context.fillText(letter, bleedX, baseline);
      const pixels = context.getImageData(0, 0, width, height).data;
      const cells: Cell[] = [];

      for (let y = 0; y < height; y += tile) {
        for (let x = 0; x < width; x += tile) {
          let filled = 0;
          let sampled = 0;
          for (let py = y; py < Math.min(y + tile, height); py += 2) {
            for (let px = x; px < Math.min(x + tile, width); px += 2) {
              sampled++;
              if (pixels[(py * width + px) * 4 + 3] > 100) filled++;
            }
          }
          if (filled / sampled < .13) continue;
          cells.push({
            x, y,
            width: Math.min(tile, width - x),
            height: Math.min(tile, height - y),
          });
        }
      }
      setShape({ width, height, bleedX, bleedY, baseline, fontSize, fontWeight: style.fontWeight, fontFamily: style.fontFamily, cells });
    };

    void document.fonts.ready.then(build).catch(() => setFailed(true));
    const observer = new ResizeObserver(build);
    observer.observe(measure);
    return () => { cancelled = true; observer.disconnect(); };
  }, [letter, reducedMotion]);

  const showPlain = reducedMotion || failed || !shape;
  return (
    <span className={`hero-letter${letter === "." ? " hero-period" : ""}`} data-simple={showPlain}>
      <span ref={measureRef} className="hero-letter-measure">{letter}</span>
      <span className="hero-letter-plain">{letter}</span>
      {!showPlain && shape && (
        <svg className="hero-letter-svg" viewBox={`0 0 ${shape.width} ${shape.height}`} style={{ left: -shape.bleedX, top: -shape.bleedY, width: shape.width, height: shape.height }} aria-hidden="true">
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={shape.width} height={shape.height}>
              <rect width={shape.width} height={shape.height} fill="black" />
              <text x={shape.bleedX} y={shape.baseline} fontSize={shape.fontSize} fontWeight={shape.fontWeight} fontFamily={shape.fontFamily} fill="white">{letter}</text>
            </mask>
            <linearGradient id={surfaceId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" className="hero-block-light" />
              <stop offset="55%" className="hero-block-mid" />
              <stop offset="100%" className="hero-block-dark" />
            </linearGradient>
          </defs>
          <g className="hero-letter-built" mask={`url(#${maskId})`}>
            {shape.cells.map((cell, index) => (
              <rect key={index} x={cell.x} y={cell.y} width={cell.width} height={cell.height} fill={`url(#${surfaceId})`} className="hero-letter-cell" />
            ))}
          </g>
        </svg>
      )}
    </span>
  );
}

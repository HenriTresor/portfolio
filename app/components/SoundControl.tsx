"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const TARGET_VOLUME = 0.28;
const MUTE_STORAGE_KEY = "portfolio-music-muted";

export default function SoundControl() {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const frameRef = useRef<number | null>(null);
  const wantsSound = useRef(true);
  const startingRef = useRef(false);
  const [enabled, setEnabled] = useState(true);

  const fadeTo = useCallback((audio: HTMLAudioElement, volume: number, duration: number, after?: () => void) => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    const from = audio.volume;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = progress * progress * (3 - 2 * progress);
      audio.volume = from + (volume - from) * eased;
      if (progress < 1) frameRef.current = window.requestAnimationFrame(tick);
      else {
        frameRef.current = null;
        after?.();
      }
    };
    frameRef.current = window.requestAnimationFrame(tick);
  }, []);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !wantsSound.current || startingRef.current) return;
    if (!audio.paused) {
      fadeTo(audio, TARGET_VOLUME, 650);
      return;
    }
    startingRef.current = true;
    audio.volume = 0;
    try {
      await audio.play();
      if (wantsSound.current) fadeTo(audio, TARGET_VOLUME, 850);
      else audio.pause();
    } catch {
      // Autoplay may be blocked; the first visitor interaction retries playback.
    } finally {
      startingRef.current = false;
    }
  }, [fadeTo]);

  useEffect(() => {
    try {
      wantsSound.current = window.localStorage.getItem(MUTE_STORAGE_KEY) !== "true";
    } catch {
      wantsSound.current = true;
    }
    setEnabled(wantsSound.current);
    if (wantsSound.current) void startPlayback();

    const unlock = () => {
      if (wantsSound.current && audioRef.current?.paused) void startPlayback();
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      startingRef.current = false;
      audioRef.current?.pause();
    };
  }, [startPlayback]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    wantsSound.current = !wantsSound.current;
    const next = wantsSound.current;
    setEnabled(next);
    try { window.localStorage.setItem(MUTE_STORAGE_KEY, String(!next)); } catch {}
    if (!next) {
      if (audio.paused) return;
      fadeTo(audio, 0, 350, () => {
        if (!wantsSound.current) audio.pause();
      });
      return;
    }
    void startPlayback();
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient-loop.wav" preload="auto" loop />
      <button
        type="button"
        className={"sound-control" + (enabled ? " is-playing" : "")}
        aria-pressed={enabled}
        aria-label={enabled ? t("portfolio.sound.mute") : t("portfolio.sound.play")}
        onClick={toggle}
      >
        <span className="sound-control-bars" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>{enabled ? t("portfolio.sound.on") : t("portfolio.sound.off")}</span>
      </button>
    </>
  );
}

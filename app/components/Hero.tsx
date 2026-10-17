"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import HeroNameLetter from "./HeroNameLetter";
import { useTranslation } from "react-i18next";

const HeroSculpture = dynamic(() => import("./HeroSculpture"), { ssr: false });
const HERO_NAME = "Henri Tresor.";
type KeyStroke = { key: string; id: number };

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const nameWrapRef = useRef<HTMLDivElement>(null);
  const [showSculpture, setShowSculpture] = useState<boolean | null>(null);
  const [keyboardAssembled, setKeyboardAssembled] = useState(false);
  const [assemblyTimedOut, setAssemblyTimedOut] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [typedLineCount, setTypedLineCount] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [screenOpened, setScreenOpened] = useState(false);
  const [phrasePhase, setPhrasePhase] = useState<"typing" | "holding" | "erasing">("typing");
  const strokeId = useRef(0);
  const [keyStroke, setKeyStroke] = useState<KeyStroke | null>(null);
  const reduceMotion = useReducedMotion();
  const typingPrefix = t("portfolio.hero.typingPrefix");
  const phrase0 = t("portfolio.hero.typingPhrases.0");
  const phrase1 = t("portfolio.hero.typingPhrases.1");
  const phrase2 = t("portfolio.hero.typingPhrases.2");
  const phrases = [phrase0, phrase1, phrase2];
  const currentPhrase = phrases[phraseIndex];

  useEffect(() => {
    if (!ready || showSculpture !== true || keyboardAssembled) return;
    const timer = window.setTimeout(() => setAssemblyTimedOut(true), 8000);
    return () => window.clearTimeout(timer);
  }, [ready, showSculpture, keyboardAssembled]);

  useEffect(() => {
    if (!ready || showSculpture === null) return;
    if (reduceMotion) {
      setTypedCount(HERO_NAME.length);
      return;
    }
    if (showSculpture && !keyboardAssembled && !assemblyTimedOut) return;
    setTypingStarted(true);
    let step = 0;
    let timer: number;
    const typeNext = () => {
      if (step >= HERO_NAME.length) {
        setKeyStroke(null);
        return;
      }
      const key = HERO_NAME[step].toLowerCase();
      step += 1;
      setTypedCount(step);
      strokeId.current += 1;
      setKeyStroke({ key, id: strokeId.current });
      const pause = key === " " ? 280 : key === "." ? 320 : 105 + (step % 3) * 32;
      timer = window.setTimeout(typeNext, pause);
    };
    timer = window.setTimeout(typeNext, 260);
    return () => window.clearTimeout(timer);
  }, [ready, reduceMotion, showSculpture, keyboardAssembled, assemblyTimedOut]);

  useEffect(() => {
    setPhraseIndex(0);
    setTypedLineCount(0);
    setPhrasePhase("typing");
  }, [phrase0, phrase1, phrase2]);

  useEffect(() => {
    if (!ready || reduceMotion || !screenOpened) return;
    let timer: number;

    if (phrasePhase === "typing") {
      if (typedLineCount >= currentPhrase.length) {
        setPhrasePhase("holding");
        return;
      }
      timer = window.setTimeout(() => {
        const character = currentPhrase[typedLineCount];
        setTypedLineCount((count) => count + 1);
        strokeId.current += 1;
        setKeyStroke({
          key: character.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          id: strokeId.current,
        });
      }, typedLineCount === 0 ? 540 : currentPhrase[typedLineCount] === " " ? 105 : 75 + typedLineCount % 3 * 18);
    } else if (phrasePhase === "holding") {
      timer = window.setTimeout(() => setPhrasePhase("erasing"), 1850);
    } else if (typedLineCount > 0) {
      timer = window.setTimeout(() => setTypedLineCount((count) => count - 1), 38);
    } else {
      timer = window.setTimeout(() => {
        setPhraseIndex((index) => (index + 1) % phrases.length);
        setPhrasePhase("typing");
      }, 250);
    }

    return () => window.clearTimeout(timer);
  }, [ready, reduceMotion, screenOpened, phrasePhase, typedLineCount, currentPhrase, phrase0, phrase1, phrase2]);

  const typedName = reduceMotion ? HERO_NAME : HERO_NAME.slice(0, typedCount);
  const firstLine = typedName.slice(0, 5);
  const lastLine = typedName.length > 6 ? typedName.slice(6) : "";
  const isTyping = !reduceMotion && typingStarted && typedCount < HERO_NAME.length;
  const nameDone = reduceMotion || typedCount === HERO_NAME.length;
  const visiblePhrase = reduceMotion ? phrase0 : currentPhrase.slice(0, typedLineCount);
  const showLineCaret = !reduceMotion && nameDone;
  const nameLetters = (value: string, offset = 0) => Array.from(value, (letter, index) => (
    <HeroNameLetter key={offset + index} letter={letter} reducedMotion={Boolean(reduceMotion)} />
  ));

  useEffect(() => {
    if (!nameDone) return;
    if (reduceMotion) {
      setScreenOpened(true);
      return;
    }
    const timer = window.setTimeout(() => setScreenOpened(true), 1800);
    return () => window.clearTimeout(timer);
  }, [nameDone, reduceMotion]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1025px)");
    const update = () => setShowSculpture(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const hoverX = useMotionValue(100);
  const hoverY = useMotionValue(100);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.78], [1, 1, 0.45, 0]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.14, 0.38, 0.55], [1, 1, 0.5, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const firstNameX = useTransform(scrollYProgress, [0, 0.28], ["0%", "-10%"]);
  const lastNameX = useTransform(scrollYProgress, [0, 0.28], ["0%", "10%"]);

  useEffect(() => {
    const wrap = nameWrapRef.current;
    const lastLine = wrap?.querySelector<HTMLElement>(".hero-last");
    const measure = wrap?.querySelector<HTMLElement>(".hero-last .hero-name-measure");
    if (!wrap || !lastLine || !measure) return;

    const fitSurname = () => {
      const available = window.innerWidth - lastLine.getBoundingClientRect().left - Math.max(20, window.innerWidth * .05);
      const fontSize = parseFloat(getComputedStyle(measure).fontSize);
      const naturalWidth = measure.getBoundingClientRect().width + fontSize * .13;
      if (naturalWidth > 0) {
        wrap.style.setProperty("--surname-scale", Math.min(1, Math.max(.45, available / naturalWidth)).toFixed(3));
      }
    };
    const observer = new ResizeObserver(fitSurname);
    observer.observe(measure);
    window.addEventListener("resize", fitSurname);
    void document.fonts.ready.then(fitSurname);
    fitSurname();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fitSurname);
    };
  }, []);

  const movePointer = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 24;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 18;
    pointerX.set(x);
    pointerY.set(y);
    hoverX.set(x);
    hoverY.set((event.clientY / window.innerHeight - 0.5) * 18);
  };

  return (
    <section id="hero" ref={ref} className="hero-scene" aria-label={t("portfolio.hero.aria")} onPointerMove={movePointer} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); hoverX.set(100); hoverY.set(100); }}>
      <motion.div className="hero-frame" style={reduceMotion ? undefined : { opacity: heroOpacity }}>
        <motion.div className="hero-edge hero-edge-top" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: reduceMotion || ready ? 1 : 0 }} transition={{ duration: 0.7, delay: 0.85 }}>
          <span>{t("portfolio.hero.location")}</span>
        </motion.div>

        <motion.div className="hero-act hero-act-one" style={reduceMotion ? undefined : { y: contentY }}>
          <motion.div className="hero-copy" style={reduceMotion ? undefined : { opacity: nameOpacity }}>
          <motion.div ref={nameWrapRef} className="hero-name-wrap notranslate" translate="no" data-complete={nameDone} initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }} animate={reduceMotion || ready ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }} transition={{ duration: 1.05, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="hero-name" aria-label="Henri Tresor">
              <motion.span className="hero-first" style={reduceMotion ? undefined : { x: firstNameX }} aria-hidden="true">
                <span className="hero-name-measure">Henri</span>
                <span className="hero-name-ink">{nameLetters(firstLine)}{isTyping && typedCount < 6 && <span className="hero-name-caret" />}</span>
              </motion.span>
              <motion.span className="hero-last" style={reduceMotion ? undefined : { x: lastNameX }} aria-hidden="true">
                <span className="hero-name-measure">Tresor.</span>
                <span className="hero-name-ink">{nameLetters(lastLine, 5)}{isTyping && typedCount >= 6 && <span className="hero-name-caret" />}</span>
              </motion.span>
            </h1>
          </motion.div>
          </motion.div>
          <div className="hero-device">
            <motion.div className="hero-monitor" initial={reduceMotion ? false : { opacity: 0, y: 24, scale: .96 }} animate={reduceMotion || nameDone ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: .96 }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}>
              <div className="hero-terminal" data-phase={phrasePhase}>
                <span className="hero-screen-camera" aria-hidden="true" />
                <div className="hero-screen-glass" data-on={nameDone}>
                  {nameDone && !screenOpened && !reduceMotion ? (
                    <div className="hero-screen-boot" role="status">
                      <span className="hero-boot-signal" aria-hidden="true" />
                      <p>{t("portfolio.hero.booting")}</p>
                      <span className="hero-boot-track" aria-hidden="true"><span /></span>
                    </div>
                  ) : (
                    <div className="hero-terminal-body" aria-label={typingPrefix + " " + currentPhrase}>
                      <p className="hero-screen-prefix">{typingPrefix}</p>
                      <p className="hero-screen-active" aria-hidden="true">{visiblePhrase}{showLineCaret && <span className="hero-type-caret" />}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="hero-monitor-neck" aria-hidden="true" />
              <div className="hero-monitor-foot" aria-hidden="true" />
            </motion.div>
            {showSculpture && <HeroSculpture ready={ready} onAssembled={() => setKeyboardAssembled(true)} keyStroke={keyStroke} pointerX={pointerX} pointerY={pointerY} hoverX={hoverX} hoverY={hoverY} scroll={scrollYProgress} />}
            {showSculpture && (
              <details className="hero-keyboard-guide">
                <summary aria-label={t("portfolio.hero.keyboardGuide.label")}>?</summary>
                <div className="hero-keyboard-guide-panel">
                  <p>{t("portfolio.hero.keyboardGuide.move")}</p>
                  <p>{t("portfolio.hero.keyboardGuide.rotate")}</p>
                  <p>{t("portfolio.hero.keyboardGuide.hover")}</p>
                </div>
              </details>
            )}
          </div>
        </motion.div>

        <motion.div className="hero-edge hero-edge-bottom" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: reduceMotion || ready ? 1 : 0 }} transition={{ duration: 0.7, delay: 1 }}>
          <span>{t("portfolio.hero.scroll")} <span aria-hidden="true">↓</span></span>
        </motion.div>
        <motion.div className="hero-progress" style={reduceMotion ? undefined : { scaleX: scrollYProgress }} />
      </motion.div>
    </section>
  );
}

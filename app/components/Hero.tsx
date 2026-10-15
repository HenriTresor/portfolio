"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const HeroSculpture = dynamic(() => import("./HeroSculpture"), { ssr: false });
const HERO_NAME = "Henri Tresor.";
type KeyStroke = { key: string; id: number };

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const [showSculpture, setShowSculpture] = useState<boolean | null>(null);
  const [keyboardAssembled, setKeyboardAssembled] = useState(false);
  const [assemblyTimedOut, setAssemblyTimedOut] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [keyStroke, setKeyStroke] = useState<KeyStroke | null>(null);
  const reduceMotion = useReducedMotion();

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
      setKeyStroke({ key, id: step });
      const pause = key === " " ? 280 : key === "." ? 320 : 105 + (step % 3) * 32;
      timer = window.setTimeout(typeNext, pause);
    };
    timer = window.setTimeout(typeNext, 260);
    return () => window.clearTimeout(timer);
  }, [ready, reduceMotion, showSculpture, keyboardAssembled, assemblyTimedOut]);

  const typedName = reduceMotion ? HERO_NAME : HERO_NAME.slice(0, typedCount);
  const firstLine = typedName.slice(0, 5);
  const lastLine = typedName.length > 6 ? typedName.slice(6) : "";
  const isTyping = !reduceMotion && typingStarted && typedCount < HERO_NAME.length;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 751px)");
    const update = () => setShowSculpture(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const hoverX = useMotionValue(100);
  const hoverY = useMotionValue(100);
  const nameX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const nameY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.78, 1], [1, 1, 0.12, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const firstNameX = useTransform(scrollYProgress, [0, 0.28], ["0%", "-10%"]);
  const lastNameX = useTransform(scrollYProgress, [0, 0.28], ["0%", "10%"]);

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

  const revealName = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--reveal-x", event.clientX - bounds.left + "px");
    event.currentTarget.style.setProperty("--reveal-y", event.clientY - bounds.top + "px");
  };

  return (
    <section id="hero" ref={ref} className="hero-scene" aria-label={t("portfolio.hero.aria")} onPointerMove={movePointer} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); hoverX.set(100); hoverY.set(100); }}>
      <motion.div className="hero-frame" style={reduceMotion ? undefined : { opacity: heroOpacity }}>
        {showSculpture && <HeroSculpture ready={ready} onAssembled={() => setKeyboardAssembled(true)} keyStroke={keyStroke} pointerX={pointerX} pointerY={pointerY} hoverX={hoverX} hoverY={hoverY} scroll={scrollYProgress} />}
        <motion.div className="hero-edge hero-edge-top" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: reduceMotion || ready ? 1 : 0 }} transition={{ duration: 0.7, delay: 0.85 }}>
          <span>{t("portfolio.hero.location")}</span>
        </motion.div>

        <motion.div className="hero-act hero-act-one" style={reduceMotion ? undefined : { y: contentY }}>
          <motion.p className="hero-overline" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={reduceMotion || ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.65, delay: 0.12 }}>{t("hero.badge")}</motion.p>
          <motion.div className="hero-name-wrap notranslate" translate="no" style={reduceMotion ? undefined : { x: nameX, y: nameY }} initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }} animate={reduceMotion || ready ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }} transition={{ duration: 1.05, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} onPointerMove={revealName}>
            <h1 className="hero-name" aria-label="Henri Tresor">
              <motion.span className="hero-first" style={reduceMotion ? undefined : { x: firstNameX }} aria-hidden="true">
                <span className="hero-name-measure">Henri</span>
                <span className="hero-name-ink">{firstLine}{isTyping && typedCount < 6 && <span className="hero-name-caret" />}</span>
              </motion.span>
              <motion.span className="hero-last" style={reduceMotion ? undefined : { x: lastNameX }} aria-hidden="true">
                <span className="hero-name-measure">Tresor.</span>
                <span className="hero-name-ink">{lastLine.replace(".", "")}{lastLine.endsWith(".") && <span className="hero-period">.</span>}{isTyping && typedCount >= 6 && <span className="hero-name-caret" />}</span>
              </motion.span>
            </h1>
            <div className="hero-name hero-name-reveal" aria-hidden="true">
              <motion.span className="hero-first" style={reduceMotion ? undefined : { x: firstNameX }}>
                <span className="hero-name-measure">Henri</span><span className="hero-name-ink">{firstLine}</span>
              </motion.span>
              <motion.span className="hero-last" style={reduceMotion ? undefined : { x: lastNameX }}>
                <span className="hero-name-measure">Tresor.</span><span className="hero-name-ink">{lastLine.replace(".", "")}{lastLine.endsWith(".") && <span className="hero-period">.</span>}</span>
              </motion.span>
            </div>
          </motion.div>
          <motion.div className="hero-intro-bottom" initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={reduceMotion || ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }} transition={{ duration: 0.7, delay: 0.7 }}>
            <p>{t("portfolio.hero.line1")}<br />{t("portfolio.hero.line2")}</p>
            <div className="hero-actions">
              <motion.a href="#projects" className="hero-primary-link" whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: .97 }}>{t("hero.cta.viewWork")} <span aria-hidden="true">↗</span></motion.a>
              <motion.a href="/contact" className="hero-secondary-link" whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: .97 }}>{t("hero.cta.letsTalk")} <span aria-hidden="true">↗</span></motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="hero-edge hero-edge-bottom" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: reduceMotion || ready ? 1 : 0 }} transition={{ duration: 0.7, delay: 1 }}>
          <span>{t("portfolio.hero.scroll")} <span aria-hidden="true">↓</span></span>
        </motion.div>
        <motion.div className="hero-progress" style={reduceMotion ? undefined : { scaleX: scrollYProgress }} />
      </motion.div>
    </section>
  );
}

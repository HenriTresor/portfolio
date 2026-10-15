"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";

export default function AboutMe() {
  const { t } = useTranslation();
  const chapters = t("portfolio.about.chapters", { returnObjects: true }) as { label: string; title: string; text: string }[];
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.12, 0.85], [0, 1]);

  return (
    <div ref={ref} className="portfolio-section about-section">
      <div className="about-story">
        <ScrollReveal className="about-sticky">
          <p className="eyebrow">{t("portfolio.about.eyebrow")}</p>
          <h2 className="editorial-heading">{t("portfolio.about.heading1")}<br />{t("portfolio.about.heading2")}<br /><em>{t("portfolio.about.headingAccent")}</em></h2>
        </ScrollReveal>
        <div className="about-chapters">
          <ScrollReveal className="about-lead">
            <p>{t("portfolio.about.lead")}</p>
          </ScrollReveal>
          <div className="chapter-track">
            <motion.span className="chapter-progress" style={reduceMotion ? undefined : { scaleY: lineScale }} />
            {chapters.map((chapter, index) => (
              <ScrollReveal as="article" className="about-chapter" key={chapter.label}>
                <span className="chapter-number">0{index + 1} / {chapter.label}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="section-actions">
            <a href="/contact" className="editorial-link">{t("about.cta.workTogether")} <span aria-hidden="true">↗</span></a>
            <a href="/cv" className="editorial-link muted-link">{t("about.cta.viewResume")} <span aria-hidden="true">↗</span></a>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}


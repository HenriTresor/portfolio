"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";

export default function TechStackOptimized() {
  const { t } = useTranslation();
  const groups = t("portfolio.practice.groups", { returnObjects: true }) as { title: string; note: string; items: string[] }[];
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="portfolio-section skills-section">
      <div className="skills-layout">
        <ScrollReveal className="skills-heading">
          <span className="eyebrow">{t("portfolio.practice.eyebrow")}</span>
          <h2 className="editorial-heading">{t("portfolio.practice.heading1")}<br />{t("portfolio.practice.heading2")} <em>{t("portfolio.practice.headingAccent")}</em></h2>
          <p>{t("portfolio.practice.intro")}</p>
        </ScrollReveal>
        <div className="practice-list">
          {groups.map((group, index) => {
            const isActive = active === index;
            return (
              <motion.article
                key={group.title}
                className={"practice-item" + (isActive ? " is-active" : "")}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <button type="button" className="practice-trigger" aria-expanded={isActive} aria-controls={"practice-panel-" + index} onClick={() => setActive(index)}>
                  <span className="practice-number">0{index + 1}</span>
                  <span className="practice-title">{group.title}</span>
                  <ArrowUpRight className="practice-arrow" aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={"practice-panel-" + index}
                      className="practice-panel"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{group.note}</p>
                      <div className="practice-tools">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

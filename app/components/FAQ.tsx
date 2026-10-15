"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";

type FAQItem = { question: string; answer: string };

export default function FAQ() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as FAQItem[];
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="portfolio-section faq-section">
      <ScrollReveal className="faq-heading"><span className="eyebrow">{t("portfolio.faq.eyebrow")}</span><h2 className="editorial-heading">{t("portfolio.faq.heading")}<span className="hero-period">.</span></h2></ScrollReveal>
      <div className="faq-questions">
        {items.map((item, index) => <ScrollReveal className={"faq-question" + (open === index ? " is-open" : "")} key={item.question}>
          <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}><span>{item.question}</span><span className="faq-icon" aria-hidden="true">{open === index ? "−" : "+"}</span></button>
          <AnimatePresence initial={false}>{open === index && <motion.div id={"faq-answer-" + index} key="answer" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.26 }} className="faq-answer"><p>{item.answer}</p></motion.div>}</AnimatePresence>
        </ScrollReveal>)}
      </div>
      <ScrollReveal className="faq-contact"><a href="/contact">{t("portfolio.faq.contactPrompt")} <span>{t("portfolio.faq.contactAction")} <span aria-hidden="true">↗</span></span></a></ScrollReveal>
    </div>
  );
}
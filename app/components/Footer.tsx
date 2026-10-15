"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const email = "shimwamanahenritresor@gmail.com";

export default function Footer() {
  const { t } = useTranslation();
  const links = [
    { label: t("portfolio.footer.navWork"), href: "/#projects" },
    { label: t("portfolio.footer.navAbout"), href: "/#about" },
    { label: t("portfolio.footer.navContact"), href: "/contact" },
  ];
  const reduceMotion = useReducedMotion();
  const moveGlow = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--footer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--footer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <footer className="portfolio-footer" onPointerMove={moveGlow}>
      <div className="footer-aura" aria-hidden="true" />
      <div className="footer-inner">
        <span className="footer-label">{t("portfolio.footer.label")}</span>
        <div className="footer-main">
          <motion.p className="footer-prompt" initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>{t("portfolio.footer.prompt")}</motion.p>
          <motion.a href={`mailto:${email}`} className="footer-cta" initial={reduceMotion ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>
            <span className="footer-cta-text">{t("portfolio.footer.cta")}<span>.</span></span>
            <span className="footer-cta-icon"><ArrowUpRight aria-hidden="true" /></span>
          </motion.a>
          <motion.div className="footer-contact-row" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .55, delay: .3 }}>
            <span>{t("portfolio.footer.underText")}</span>
            <a href={`mailto:${email}`}>{email}</a>
          </motion.div>
        </div>
        <motion.div className="footer-bottom" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .6 }}>
          <nav aria-label={t("portfolio.menu.title")}>{links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</nav>
          <div className="footer-social"><a href="https://github.com/henritresor" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/henritresor" target="_blank" rel="noreferrer">LinkedIn</a><a href="/cv">CV</a></div>
          <span className="footer-copyright notranslate" translate="no">{"\u00A9"} {new Date().getFullYear()} <span className="fixed-name" aria-hidden="true" /><span className="sr-only" translate="no">Henri Tresor</span></span>
        </motion.div>
      </div>
    </footer>
  );
}

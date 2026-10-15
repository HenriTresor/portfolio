"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const projectTypeIds = [
  "web-app", "mobile-app", "website", "ecommerce",
  "consulting", "ai-integration", "other",
];

export default function ContactPage() {
  const { t } = useTranslation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const typeLabels = t("portfolio.contact.types", { returnObjects: true }) as string[];

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.portfolioPageReady = "true";
    window.dispatchEvent(new Event("portfolio:page-ready"));
    return () => { delete root.dataset.portfolioPageReady; };
  }, []);

  const toggleProjectType = (id: string) => {
    setSelectedTypes((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <main className="contact-page">
      <div className="contact-page-inner">
        <div className="contact-intro">
          <span className="contact-eyebrow">{t("portfolio.contact.eyebrow")}</span>
          <h1>{t("portfolio.contact.heading")}</h1>
          <p>{t("portfolio.contact.intro")}</p>
          <div className="contact-details">
            <span>{t("portfolio.contact.location")}</span>
            <a href="mailto:shimwamanahenritresor@gmail.com">
              {t("portfolio.contact.emailLabel")} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <motion.form
          className="contact-form"
          action="https://formsubmit.co/shimwamanahenritresor@gmail.com"
          method="POST"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New portfolio inquiry" />
          <input type="hidden" name="_next" value="/?success=true" />
          <div className="contact-field-pair">
            <label className="contact-field">
              <span>{t("portfolio.contact.name")}</span>
              <input name="name" autoComplete="name" placeholder={t("portfolio.contact.namePlaceholder")} required />
            </label>
            <label className="contact-field">
              <span>{t("portfolio.contact.email")}</span>
              <input name="email" type="email" autoComplete="email" placeholder={t("portfolio.contact.emailPlaceholder")} required />
            </label>
          </div>
          <fieldset className="contact-types">
            <legend>{t("portfolio.contact.type")}</legend>
            <p>{t("portfolio.contact.typeHint")}</p>
            <div className="contact-type-options">
              {projectTypeIds.map((id, index) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selectedTypes.includes(id)}
                  className={selectedTypes.includes(id) ? "selected" : ""}
                  onClick={() => toggleProjectType(id)}
                >
                  {typeLabels[index]}
                </button>
              ))}
            </div>
          </fieldset>
          <input type="hidden" name="project_types" value={selectedTypes.join(", ")} />
          <label className="contact-field">
            <span>{t("portfolio.contact.message")}</span>
            <textarea name="message" placeholder={t("portfolio.contact.messagePlaceholder")} rows={5} required />
          </label>
          <label className="contact-consent">
            <input type="checkbox" required />
            <span>{t("portfolio.contact.consent")}</span>
          </label>
          <button className="contact-submit" type="submit">
            {t("portfolio.contact.submit")} <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </motion.form>
      </div>
    </main>
  );
}
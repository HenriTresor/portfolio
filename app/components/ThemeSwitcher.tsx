"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeProvider";

const themes = [
  { value: "light", icon: Sun, labelKey: "portfolio.theme.light" },
  { value: "dark", icon: Moon, labelKey: "portfolio.theme.dark" },
  { value: "system", icon: Monitor, labelKey: "portfolio.theme.system" },
] as const;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-1 p-1 backdrop-blur-sm rounded-lg switcher-bg" role="group" aria-label={t("portfolio.theme.label")}>
      {themes.map(({ value, icon: Icon, labelKey }) => (
        <motion.button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-label={t(labelKey)}
          aria-pressed={theme === value}
          title={t(labelKey)}
          className="relative px-3 py-2 rounded-md text-sm font-medium text-theme"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === value && <span className="absolute inset-0 rounded-md bg-[var(--foreground)]/10" aria-hidden="true" />}
          <Icon className="relative z-10 w-4 h-4" aria-hidden="true" />
        </motion.button>
      ))}
    </div>
  );
}
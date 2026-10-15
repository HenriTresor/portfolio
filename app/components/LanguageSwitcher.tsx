"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'rw', name: 'Kinyarwanda' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(lang => lang.code === (i18n.resolvedLanguage || i18n.language).split('-')[0]) || languages[0];

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover-light transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:block text-theme">{currentLanguage.name}</span>
                <span className="text-lg sm:hidden">{currentLanguage.code.toUpperCase()}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full mt-2 right-0 glass rounded-xl p-2 min-w-[160px] border border-white/10"
                    >
                        {languages.map((lang) => (
                            <motion.button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${lang.code === currentLanguage.code
                                    ? 'bg-[var(--accent)]/10 accent-theme'
                                    : 'hover-light'
                                    }`}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-lg">{lang.code.toUpperCase()}</span>
                                <span className="text-sm font-medium text-theme">{lang.name}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

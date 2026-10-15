"use client";

import { useEffect } from 'react';
import i18n from '../../lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const syncLanguage = (language: string) => {
            document.documentElement.lang = language.split('-')[0];
            document.title = i18n.t("portfolio.meta.title", { lng: language });
        };
        syncLanguage(i18n.resolvedLanguage || i18n.language || 'en');
        i18n.on('languageChanged', syncLanguage);
        return () => { i18n.off('languageChanged', syncLanguage); };
    }, []);

    return <>{children}</>;
}
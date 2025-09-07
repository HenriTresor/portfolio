"use client";

import { useEffect } from 'react';
import '../../lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialize i18n on client side
    }, []);

    return <>{children}</>;
}

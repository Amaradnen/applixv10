"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import frDict from '@/dictionaries/fr.json';
import enDict from '@/dictionaries/en.json';

type Locale = 'fr' | 'en';

type Dictionary = typeof frDict;

const dictionaries: Record<Locale, Dictionary> = {
    fr: frDict,
    en: enDict,
};

interface I18NContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Dictionary;
}

const I18NContext = createContext<I18NContextType | undefined>(undefined);

export function I18NProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('fr');

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        if (typeof window !== 'undefined') {
            localStorage.setItem('locale', newLocale);
        }
    };

    const value: I18NContextType = {
        locale,
        setLocale,
        t: dictionaries[locale],
    };

    return <I18NContext.Provider value={value}>{children}</I18NContext.Provider>;
}

export function useI18N() {
    const context = useContext(I18NContext);
    if (!context) {
        throw new Error('useI18N must be used within I18NProvider');
    }
    return context;
}

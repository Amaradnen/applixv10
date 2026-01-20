"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { NextIntlClientProvider } from 'next-intl';
import { useStudioStore } from "../app/nfc-studio/store/useStudioStore";

// Load messages dynamically helps avoid bundle bloat (though for small apps importing directly is fine)
import frMessages from '../messages/fr.json';
import enMessages from '../messages/en.json';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/nfc-studio");
    const { language, setLanguage } = useStudioStore();
    const [messages, setMessages] = useState(frMessages);

    // Sync messages with language
    useEffect(() => {
        setMessages(language === 'en' ? enMessages : frMessages);

        // Ensure cookie is set for consistency
        document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000`;
    }, [language]);

    // Hydration fix: ensures store has loaded language from localStorage
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        // If localStorage had a language, it will be in the store already due to persist
    }, []);

    if (!mounted) return null; // Prevent hydration mismatch

    return (
        <NextIntlClientProvider locale={language} messages={messages}>
            <Navbar />
            <main className={isStudio ? "pt-24" : "pt-28 pb-10 px-4 min-h-[calc(100vh-160px)]"}>
                {children}
            </main>
            {!isStudio && <Footer />}
        </NextIntlClientProvider>
    );
}

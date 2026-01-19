"use client";

import React from "react";
import StepIndicator from "./StepIndicator";
import { useStudioStore } from "../store/useStudioStore";
import { Globe, ShoppingCart } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function StudioLayout({
    controls,
    preview
}: {
    controls: React.ReactNode;
    preview: React.ReactNode;
}) {
    const { language, toggleLanguage, cart } = useStudioStore();

    return (
        <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto animate-fade-in-up p-4 md:p-8 bg-gradient-to-br from-[#0a0a0a] via-[#000] to-[#0a0a0a] rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gg-gold/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg bg-black border border-white/10">
                        <img src="/assets/logo.jpg" alt="APPLIX Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight font-display text-white leading-none">
                            APPLIX
                        </h1>
                        <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">
                            NFC Studio
                        </p>
                    </div>
                </Link>

                <StepIndicator />

                <div className="flex items-center gap-2">
                    {/* Language Toggle */}
                    <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                        <button
                            onClick={() => language !== 'fr' && toggleLanguage()}
                            className={clsx(
                                "px-3 py-1 text-xs font-bold rounded-full transition",
                                language === 'fr' ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white"
                            )}
                        >
                            FR
                        </button>
                        <button
                            onClick={() => language !== 'en' && toggleLanguage()}
                            className={clsx(
                                "px-3 py-1 text-xs font-bold rounded-full transition",
                                language === 'en' ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white"
                            )}
                        >
                            EN
                        </button>
                    </div>
                    <Link
                        href="/nfc-studio/cart"
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold text-white transition-all"
                    >
                        <span>Panier</span>
                        {cart && cart.items.length > 0 && (
                            <span className="bg-gg-gold text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.items.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Main Grid: Controls Left, Preview Right */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative min-h-[600px]">
                {/* Controls Column */}
                <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
                    {controls}
                </div>

                {/* Preview Column */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                    {/* Sticky preview on desktop */}
                    <div className="lg:sticky lg:top-32">
                        {preview}
                    </div>
                </div>
            </div>
        </div>
    );
}

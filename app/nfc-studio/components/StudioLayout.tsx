"use client";

import React from "react";
import StepIndicator from "./StepIndicator";
import StudioHeader from "./StudioHeader";
import { useStudioStore } from "../store/useStudioStore";
import { Globe, ShoppingCart } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

import { useTranslations } from 'next-intl';

export default function StudioLayout({
    controls,
    preview
}: {
    controls: React.ReactNode;
    preview: React.ReactNode;
}) {
    const { language, toggleLanguage, cart } = useStudioStore();
    const t = useTranslations('nav');

    return (
        <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto animate-fade-in-up p-4 md:p-8 bg-gradient-to-br from-[#0a0a0a] via-[#000] to-[#0a0a0a] rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gg-gold/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Top Bar - Replaced by StudioHeader */}
            <StudioHeader />

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

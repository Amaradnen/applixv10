"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import StepIndicator from "./StepIndicator";
import { useStudioStore } from "../store/useStudioStore";
import { useTranslations } from 'next-intl';

export default function StudioHeader() {
    const { language, toggleLanguage, cart } = useStudioStore();
    const t = useTranslations('nav');

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 border-b border-white/10 pb-6 relative z-10 w-full mb-8 pt-4">

            <StepIndicator />


        </div>
    );
}

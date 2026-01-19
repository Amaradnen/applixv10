"use client";

import React from "react";
import { useStudioStore } from "../store/useStudioStore";
import clsx from "clsx";
import { Check } from "lucide-react";

export default function StepIndicator() {
    const { step, setStep } = useStudioStore();

    const steps = [
        { number: 1, label: "Design Carte" },
        { number: 2, label: "Profil Digital" },
        { number: 3, label: "Commande" }
    ];

    return (
        <div className="flex items-center gap-3">
            {steps.map((s, idx) => (
                <React.Fragment key={s.number}>
                    <button
                        onClick={() => setStep(s.number as 1 | 2 | 3)}
                        className={clsx(
                            "flex items-center gap-2 text-xs font-bold transition-all",
                            step === s.number ? "text-gg-gold" : "text-white/40 hover:text-white/60"
                        )}
                    >
                        <div className={clsx(
                            "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                            step === s.number
                                ? "bg-gg-gold text-black shadow-lg shadow-gg-gold/30"
                                : step > s.number
                                    ? "bg-green-500 text-white"
                                    : "bg-white/10 text-white/40"
                        )}>
                            {step > s.number ? <Check size={14} /> : s.number}
                        </div>
                        <span className="hidden md:inline">{s.label}</span>
                    </button>
                    {idx < steps.length - 1 && (
                        <div className={clsx(
                            "w-8 h-px transition-colors",
                            step > s.number ? "bg-green-500" : "bg-white/10"
                        )} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

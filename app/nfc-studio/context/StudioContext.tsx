"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type StudioStep = 1 | 2 | 3;

export type CardMaterial =
    | "metal-black" | "metal-gold" | "metal-silver"
    | "pvc-white" | "pvc-black"
    | "wood-bamboo" | "carbon-fiber";

export type CardTemplate =
    | "minimal" | "luxury" | "bold" | "modern" | "qr-focus"
    | "signature" | "monogram" | "diagonal" | "chip-focus" | "logo-top"
    | "kiki" | "geometric" | "classic" | "future" | "centered";

export interface CardFrontState {
    material: CardMaterial;
    template: CardTemplate;
    texts: {
        name: string;
        title: string;
        company: string;
        website?: string;
    };
    logoUrl?: string; // Data URL
    backgroundUrl?: string;
    signature: {
        enabled: boolean;
        type: "text" | "draw" | "upload";
        value: string; // Font name or Data URL
    };
    layout: "minimal" | "centered" | "custom";
}

export interface CardBackState {
    text: string;
    qrEnabled: boolean;
    qrUrl: string; // The content of said QR
    logoEnabled: boolean;
    smallLogoUrl?: string;
    backgroundUrl?: string;
    texts: {
        email?: string;
        phone?: string;
        address?: string;
        website?: string;
    };
}

export interface SocialLink {
    id: string;
    type: "instagram" | "linkedin" | "website" | "whatsapp" | "email" | "other" | "tiktok" | "youtube" | "calendly" | "map" | "phone";
    url: string;
    label: string;
    active: boolean;
}

export interface ProfileState {
    name: string;
    bio: string;
    location?: string;
    avatar?: string;
    cover?: string;
    links: SocialLink[];
    theme: "dark" | "light" | "gold" | "blue" | "custom";
}

export interface CheckoutState {
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    shipping: {
        address: string;
        city: string;
        zip: string;
        country: string;
        method: "standard" | "express" | "pickup";
    };
    payment: {
        method: "card" | "cod" | "crypto";
    };
    promoCode?: string;
    discount?: number;
}

interface StudioContextType {
    step: StudioStep;
    setStep: (step: StudioStep) => void;

    cardFront: CardFrontState;
    updateCardFront: (updates: Partial<CardFrontState>) => void;
    updateCardFrontText: (key: keyof CardFrontState["texts"], value: string) => void;

    cardBack: CardBackState;
    updateCardBack: (updates: Partial<CardBackState>) => void;

    activeSide: 'front' | 'back';
    setActiveSide: (side: 'front' | 'back') => void;

    profile: ProfileState;
    updateProfile: (updates: Partial<ProfileState>) => void;

    checkout: CheckoutState;
    updateCheckout: (updates: Partial<CheckoutState>) => void;

    cartTotal: number;
}

const defaultCardFront: CardFrontState = {
    material: "metal-black",
    template: "minimal",
    texts: {
        name: "ALEX MARTIN",
        title: "FOUNDER & CEO",
        company: "APPLIX VISION",
        website: "applix.com",
    },
    signature: { enabled: false, type: "text", value: "" },
    layout: "minimal"
};

const defaultCardBack: CardBackState = {
    text: "Scannez pour connecter",
    qrEnabled: true,
    qrUrl: "https://applix.me/alex",
    logoEnabled: true,
    texts: {
        email: "contact@applix.com",
        phone: "+33 6 12 34 56 78",
        address: "Paris, France",
        website: "applix.com"
    }
};

const defaultProfile: ProfileState = {
    name: "Alex Martin",
    bio: "Founder at Applix Vision.",
    links: [],
    theme: "dark"
};

const defaultCheckout: CheckoutState = {
    customer: { firstName: "", lastName: "", email: "", phone: "" },
    shipping: { address: "", city: "", zip: "", country: "France", method: "standard" },
    payment: { method: "card" },
    promoCode: "",
    discount: 0
};

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export function StudioProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<StudioStep>(1);
    const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');

    const [cardFront, setCardFront] = useState<CardFrontState>(defaultCardFront);
    const [cardBack, setCardBack] = useState<CardBackState>(defaultCardBack);
    const [profile, setProfile] = useState<ProfileState>(defaultProfile);
    const [checkout, setCheckout] = useState<CheckoutState>(defaultCheckout);

    useEffect(() => {
        setMounted(true);
        // Load from localStorage if present
        const savedFront = localStorage.getItem("applix_card_front_v3");
        if (savedFront) setCardFront(JSON.parse(savedFront));

        const savedBack = localStorage.getItem("applix_card_back_v3");
        if (savedBack) setCardBack(JSON.parse(savedBack));

        const savedProfile = localStorage.getItem("applix_profile_v3");
        if (savedProfile) setProfile(JSON.parse(savedProfile));
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("applix_card_front_v3", JSON.stringify(cardFront));
            localStorage.setItem("applix_card_back_v3", JSON.stringify(cardBack));
            localStorage.setItem("applix_profile_v3", JSON.stringify(profile));
        }
    }, [cardFront, cardBack, profile, mounted]);

    const updateCardFront = (updates: Partial<CardFrontState>) => setCardFront(prev => ({ ...prev, ...updates }));
    const updateCardBack = (updates: Partial<CardBackState>) => setCardBack(prev => ({ ...prev, ...updates }));

    const updateCardFrontText = (key: keyof CardFrontState["texts"], value: string) =>
        setCardFront(prev => ({ ...prev, texts: { ...prev.texts, [key]: value } }));

    const updateProfile = (updates: Partial<ProfileState>) => setProfile(prev => ({ ...prev, ...updates }));

    const updateCheckout = (updates: Partial<CheckoutState>) => setCheckout(prev => ({
        ...prev,
        ...updates,
        shipping: { ...prev.shipping, ...(updates.shipping || {}) },
        customer: { ...prev.customer, ...(updates.customer || {}) },
        payment: { ...prev.payment, ...(updates.payment || {}) }
    }));

    const getPrice = () => {
        let base = 99;
        if (cardFront.material.includes("metal")) base = 129;
        if (cardFront.material.includes("gold")) base = 149;
        if (cardFront.material.includes("pvc")) base = 49;
        if (checkout.shipping.method === 'express') base += 15;
        if (checkout.shipping.method === 'pickup') base -= 5;

        if (checkout.discount) {
            base = Math.round(base * (1 - checkout.discount));
        }

        return base;
    };

    return (
        <StudioContext.Provider value={{
            step, setStep,
            cardFront, updateCardFront, updateCardFrontText,
            cardBack, updateCardBack,
            activeSide, setActiveSide,
            profile, updateProfile,
            checkout, updateCheckout,
            cartTotal: getPrice()
        }}>
            {children}
        </StudioContext.Provider>
    );
}

export function useStudio() {
    const context = useContext(StudioContext);
    if (context === undefined) {
        throw new Error("useStudio must be used within a StudioProvider");
    }
    return context;
}

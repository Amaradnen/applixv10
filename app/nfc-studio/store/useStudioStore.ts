import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================
// Types (from existing StudioContext)
// ============================================

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
    logoUrl?: string;
    backgroundUrl?: string;
    overlayUrl?: string;
    overlayOpacity?: number;
    layout: "minimal" | "centered" | "custom";
}

export interface CardBackState {
    text: string;
    qrEnabled: boolean;
    qrUrl: string;
    logoEnabled: boolean;
    smallLogoUrl?: string;
    backgroundUrl?: string;
    overlayUrl?: string;
    overlayOpacity?: number;
    signatureEnabled?: boolean;
    signatureType?: "text" | "draw" | "upload";
    signatureValue?: string;
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

export interface CartItem {
    id: string;
    type: "card" | "profile";
    name: string;
    price: number;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
}

// ============================================
// Store Interface
// ============================================

interface StudioStore {
    // Card State
    cardFront: CardFrontState;
    cardBack: CardBackState;
    activeSide: 'front' | 'back';

    // Profile State
    profile: ProfileState;

    // Cart & Checkout
    cart: CartState;
    checkout: CheckoutState;

    // UI State
    step: 1 | 2 | 3;
    language: 'fr' | 'en';

    // Actions - Card
    updateCardFront: (updates: Partial<CardFrontState>) => void;
    updateCardFrontText: (key: keyof CardFrontState["texts"], value: string) => void;
    updateCardBack: (updates: Partial<CardBackState>) => void;
    updateCardBackText: (key: keyof CardBackState["texts"], value: string) => void;
    updateCardBackInvitationText: (text: string) => void;
    setActiveSide: (side: 'front' | 'back') => void;

    // Actions - Profile
    updateProfile: (updates: Partial<ProfileState>) => void;

    // Actions - Cart
    addToCart: (item: Omit<CartItem, 'id'>) => void;
    removeFromCart: (id: string) => void;
    updateCartQuantity: (id: string, quantity: number) => void;
    calculateCartTotal: () => void;

    // Actions - Checkout
    updateCheckout: (updates: Partial<CheckoutState>) => void;

    // Actions - Navigation
    setStep: (step: 1 | 2 | 3) => void;

    // Actions - Language
    toggleLanguage: () => void;
    setLanguage: (lang: 'fr' | 'en') => void;
}

// ============================================
// Default States
// ============================================

const defaultCardFront: CardFrontState = {
    material: "metal-black",
    template: "minimal",
    texts: {
        name: "ALEX MARTIN",
        title: "FOUNDER & CEO",
        company: "APPLIX VISION",
        website: "applix.com",
    },
    layout: "minimal"
};

const defaultCardBack: CardBackState = {
    text: "Scannez pour connecter",
    qrEnabled: true,
    qrUrl: "https://applix.me/alex",
    logoEnabled: true,
    signatureEnabled: false,
    signatureType: "text",
    signatureValue: "",
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

const defaultCart: CartState = {
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0
};

// ============================================
// Zustand Store with Persistence
// ============================================

export const useStudioStore = create<StudioStore>()(
    persist(
        (set, get) => ({
            // Initial State
            cardFront: defaultCardFront,
            cardBack: defaultCardBack,
            activeSide: 'front',
            profile: defaultProfile,
            cart: defaultCart,
            checkout: defaultCheckout,
            step: 1,
            language: 'fr',

            // Card Actions
            updateCardFront: (updates) =>
                set((state) => ({
                    cardFront: { ...state.cardFront, ...updates }
                })),

            updateCardFrontText: (key, value) =>
                set((state) => ({
                    cardFront: {
                        ...state.cardFront,
                        texts: { ...state.cardFront.texts, [key]: value }
                    }
                })),

            updateCardBack: (updates) =>
                set((state) => ({
                    cardBack: { ...state.cardBack, ...updates }
                })),

            updateCardBackText: (key, value) =>
                set((state) => ({
                    cardBack: {
                        ...state.cardBack,
                        texts: { ...state.cardBack.texts, [key]: value }
                    }
                })),

            updateCardBackInvitationText: (text) =>
                set((state) => ({
                    cardBack: { ...state.cardBack, text }
                })),

            setActiveSide: (side) => set({ activeSide: side }),

            // Profile Actions
            updateProfile: (updates) =>
                set((state) => ({
                    profile: { ...state.profile, ...updates }
                })),

            // Cart Actions
            addToCart: (item) =>
                set((state) => {
                    const newItem: CartItem = {
                        ...item,
                        id: `cart-${Date.now()}`
                    };
                    const newState = {
                        cart: {
                            ...state.cart,
                            items: [...state.cart.items, newItem]
                        }
                    };
                    // Recalculate totals
                    get().calculateCartTotal();
                    return newState;
                }),

            removeFromCart: (id) =>
                set((state) => {
                    const newState = {
                        cart: {
                            ...state.cart,
                            items: state.cart.items.filter(item => item.id !== id)
                        }
                    };
                    get().calculateCartTotal();
                    return newState;
                }),

            updateCartQuantity: (id, quantity) =>
                set((state) => {
                    const newState = {
                        cart: {
                            ...state.cart,
                            items: state.cart.items.map(item =>
                                item.id === id ? { ...item, quantity } : item
                            )
                        }
                    };
                    get().calculateCartTotal();
                    return newState;
                }),

            calculateCartTotal: () =>
                set((state) => {
                    const subtotal = state.cart.items.reduce(
                        (sum, item) => sum + (item.price * item.quantity),
                        0
                    );

                    let shipping = 0;
                    if (state.checkout.shipping.method === 'express') shipping = 15;
                    if (state.checkout.shipping.method === 'pickup') shipping = -5;

                    let total = subtotal + shipping;
                    if (state.checkout.discount) {
                        total = Math.round(total * (1 - state.checkout.discount));
                    }

                    return {
                        cart: {
                            ...state.cart,
                            subtotal,
                            shipping,
                            total
                        }
                    };
                }),

            // Checkout Actions
            updateCheckout: (updates) =>
                set((state) => ({
                    checkout: {
                        ...state.checkout,
                        ...updates,
                        shipping: { ...state.checkout.shipping, ...(updates.shipping || {}) },
                        customer: { ...state.checkout.customer, ...(updates.customer || {}) },
                        payment: { ...state.checkout.payment, ...(updates.payment || {}) }
                    }
                })),

            // Navigation
            setStep: (step) => set({ step }),

            // Language Actions
            toggleLanguage: () =>
                set((state) => {
                    const newLang = state.language === 'fr' ? 'en' : 'fr';
                    // Set cookie for persistence
                    if (typeof document !== 'undefined') {
                        document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
                    }
                    return { language: newLang };
                }),

            setLanguage: (lang) => {
                // Set cookie for persistence
                if (typeof document !== 'undefined') {
                    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
                }
                set({ language: lang });
            },
        }),
        {
            name: 'nfc-studio-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                cardFront: state.cardFront,
                cardBack: state.cardBack,
                profile: state.profile,
                cart: state.cart,
                checkout: state.checkout,
            }),
        }
    )
);

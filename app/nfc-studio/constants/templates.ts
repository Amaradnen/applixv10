import { CardMaterial, CardTemplate } from '../context/StudioContext';

export interface CardTemplateConfig {
    id: string;
    name: string;
    material: CardMaterial;
    materialLabel?: string;
    template: CardTemplate;
    description: string;
    frontLayout: 'minimal' | 'centered' | 'corner' | 'bold' | 'signature' | 'chip-focus';
    backLayout: 'qr-center' | 'qr-right' | 'qr-left';
}

export const CARD_TEMPLATES: CardTemplateConfig[] = [
    {
        id: 'pvc-minimal',
        name: 'PVC • Minimal Clean',
        material: 'pvc-black',
        materialLabel: 'PVC Premium',
        template: 'minimal',
        description: 'Design épuré et minimaliste',
        frontLayout: 'minimal',
        backLayout: 'qr-center'
    },
    {
        id: 'pvc-bold',
        name: 'PVC • Bold Title',
        material: 'pvc-black',
        materialLabel: 'PVC Premium',
        template: 'bold',
        description: 'Typographie audacieuse',
        frontLayout: 'bold',
        backLayout: 'qr-center'
    },
    {
        id: 'pvc-center',
        name: 'PVC • Center Modern',
        material: 'pvc-black',
        materialLabel: 'PVC Premium',
        template: 'centered',
        description: 'Design centré moderne',
        frontLayout: 'centered',
        backLayout: 'qr-center'
    },
    {
        id: 'metal-monogram',
        name: 'Metal Black • Monogram Lux',
        material: 'metal-black',
        materialLabel: 'Metal Noir',
        template: 'monogram',
        description: 'Luxe et élégance',
        frontLayout: 'signature', // Fallback to handle layout if 'monogram' not explicitly defined in some switch cases
        backLayout: 'qr-right'
    },
    {
        id: 'bamboo-corner',
        name: 'Bamboo • Eco Corner',
        material: 'wood-bamboo',
        materialLabel: 'Bamboo Naturel',
        template: 'diagonal',
        description: 'Naturel et éco-responsable',
        frontLayout: 'corner',
        backLayout: 'qr-left'
    },
    {
        id: 'silver-center',
        name: 'Silver • Center Tech',
        material: 'metal-silver',
        materialLabel: 'Silver Edition',
        template: 'chip-focus',
        description: 'Technologie et brillance',
        frontLayout: 'chip-focus',
        backLayout: 'qr-center'
    },
    {
        id: 'metal-minimal-pro',
        name: 'Metal Black • Minimal Pro',
        material: 'metal-black',
        materialLabel: 'Metal Noir',
        template: 'minimal',
        description: 'Professionnel et sobre',
        frontLayout: 'minimal',
        backLayout: 'qr-center'
    },
    {
        id: 'gold-signature',
        name: 'Gold • Signature',
        material: 'metal-gold',
        materialLabel: 'Or Edition',
        template: 'signature',
        description: 'Signature exclusive',
        frontLayout: 'signature',
        backLayout: 'qr-right'
    }
];

export const PROFILE_THEMES = [
    {
        id: 'creator',
        name: 'Créateur',
        description: 'Design moderne pour créateurs de contenu',
        colors: {
            primary: '#E3B52E',
            background: '#000000',
            text: '#FFFFFF',
            accent: '#CFA31D'
        }
    },
    {
        id: 'business',
        name: 'Business',
        description: 'Design professionnel et élégant',
        colors: {
            primary: '#1E40AF',
            background: '#F5F5F5',
            text: '#111111',
            accent: '#3B82F6'
        }
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Design épuré et minimaliste',
        colors: {
            primary: '#000000',
            background: '#FFFFFF',
            text: '#000000',
            accent: '#666666'
        }
    },
    {
        id: 'elegant',
        name: 'Élégant',
        description: 'Design raffiné avec touches dorées',
        colors: {
            primary: '#B8860B',
            background: '#1A1A1A',
            text: '#F4F4F4',
            accent: '#DAA520'
        }
    },
    {
        id: 'modern',
        name: 'Moderne',
        description: 'Design contemporain et dynamique',
        colors: {
            primary: '#8B5CF6',
            background: '#0F172A',
            text: '#F1F5F9',
            accent: '#A78BFA'
        }
    },
    {
        id: 'classic',
        name: 'Classique',
        description: 'Design intemporel et sobre',
        colors: {
            primary: '#374151',
            background: '#F9FAFB',
            text: '#111827',
            accent: '#6B7280'
        }
    }
];

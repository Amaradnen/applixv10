import { CardMaterial, CardTemplate } from '../context/StudioContext';

export interface CardTemplateConfig {
    id: string;
    name: string;
    material: CardMaterial;
    template: CardTemplate;
    description: string;
    frontLayout: 'minimal' | 'centered' | 'corner' | 'bold' | 'signature' | 'chip-focus';
    backLayout: 'qr-center' | 'qr-right' | 'qr-left';
}

export const CARD_TEMPLATES: CardTemplateConfig[] = [
    {
        id: 'black-minimal',
        name: 'Black Minimal',
        material: 'metal-black',
        template: 'minimal',
        description: 'Design épuré et minimaliste sur métal noir',
        frontLayout: 'minimal',
        backLayout: 'qr-center'
    },
    {
        id: 'black-bold',
        name: 'Black Bold',
        material: 'metal-black',
        template: 'bold',
        description: 'Typographie audacieuse sur métal noir',
        frontLayout: 'bold',
        backLayout: 'qr-center'
    },
    {
        id: 'black-signature',
        name: 'Black Signature',
        material: 'metal-black',
        template: 'signature',
        description: 'Design centré sur la signature',
        frontLayout: 'signature',
        backLayout: 'qr-right'
    },
    {
        id: 'black-corner',
        name: 'Black Corner',
        material: 'metal-black',
        template: 'diagonal',
        description: 'Éléments alignés en coin',
        frontLayout: 'corner',
        backLayout: 'qr-left'
    },
    {
        id: 'black-chip-focus',
        name: 'Black Chip Focus',
        material: 'metal-black',
        template: 'chip-focus',
        description: 'Design centré sur la puce NFC',
        frontLayout: 'chip-focus',
        backLayout: 'qr-center'
    },
    {
        id: 'gold-luxury',
        name: 'Gold Luxury',
        material: 'metal-gold',
        template: 'luxury',
        description: 'Design premium sur métal doré',
        frontLayout: 'centered',
        backLayout: 'qr-center'
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

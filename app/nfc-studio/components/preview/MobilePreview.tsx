"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { useStudioStore, SocialLink } from "../../store/useStudioStore";
import { Phone, Mail, Globe, MapPin, Instagram, Linkedin, Youtube, Video, Calendar, QrCode } from "lucide-react";
import { PROFILE_THEMES } from "../../constants/templates";
import clsx from "clsx";

export default function MobilePreview() {
    const { profile } = useStudioStore();

    const getIcon = (type: SocialLink['type']) => {
        switch (type) {
            case 'instagram': return <Instagram size={18} />;
            case 'linkedin': return <Linkedin size={18} />;
            case 'website': return <Globe size={18} />;
            case 'email': return <Mail size={18} />;
            case 'whatsapp': return <Phone size={18} />;
            case 'youtube': return <Youtube size={18} />;
            case 'tiktok': return <Video size={18} />;
            case 'calendly': return <Calendar size={18} />;
            case 'map': return <MapPin size={18} />;
            default: return <Globe size={18} />;
        }
    };

    const currentTheme = PROFILE_THEMES.find(t => t.id === profile.theme) || PROFILE_THEMES[0];

    const getButtonClasses = () => {
        if (currentTheme.id === 'minimal' || currentTheme.id === 'classic') {
            return "bg-gray-100 hover:bg-gray-200 text-black border-black/5";
        }
        return `bg-white/10 hover:bg-white/20 border-white/10`;
    };


    const renderLinks = () => {
        if (profile.links.length === 0) {
            return (
                <div className="text-center py-8 opacity-30 text-[10px] uppercase font-bold tracking-widest border-2 border-dashed border-current rounded-xl mx-6">
                    Ajoutez vos liens
                </div>
            );
        }

        const layout = profile.layout || 'list';

        // GRID LAYOUT
        if (layout === 'grid') {
            return (
                <div className="grid grid-cols-3 gap-3 px-6 pb-10">
                    {profile.links.filter(l => l.active).map(link => (
                        <a
                            key={link.id}
                            href={formatLink(link)}
                            target="_blank"
                            rel="noreferrer"
                            className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition active:scale-95 border border-white/10 backdrop-blur-md shadow-lg"
                            style={{
                                backgroundColor: currentTheme.id === 'minimal' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                                color: currentTheme.colors.text
                            }}
                        >
                            <div className="p-3 rounded-full bg-white/10">
                                {getIcon(link.type)}
                            </div>
                            <span className="text-[10px] font-bold truncate w-full text-center px-2">{link.label}</span>
                        </a>
                    ))}
                </div>
            );
        }

        // CARDS LAYOUT
        if (layout === 'cards') {
            return (
                <div className="space-y-3 px-6 pb-10">
                    {profile.links.filter(l => l.active).map(link => (
                        <a
                            key={link.id}
                            href={formatLink(link)}
                            target="_blank"
                            rel="noreferrer"
                            className="block w-full p-4 rounded-2xl transition active:scale-[0.98] border border-white/10 backdrop-blur-lg shadow-lg relative overflow-hidden group"
                            style={{
                                backgroundColor: currentTheme.id === 'minimal' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.08)',
                                color: currentTheme.colors.text
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-current">
                                    {getIcon(link.type)}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <h3 className="text-xs font-bold leading-tight">{link.label}</h3>
                                    <p className="text-[10px] opacity-60 truncate">{link.type.toUpperCase()}</p>
                                </div>
                                <ArrowRightIcon size={14} className="opacity-50" />
                            </div>
                        </a>
                    ))}
                </div>
            );
        }

        // LIST LAYOUT (Classic)
        return (
            <div className="mt-8 px-6 space-y-3 pb-10">
                {profile.links.filter(l => l.active).map(link => (
                    <a
                        key={link.id}
                        href={formatLink(link)}
                        target="_blank"
                        rel="noreferrer"
                        className={clsx("block w-full py-4 px-4 rounded-xl flex items-center gap-4 transition active:scale-[0.98] border shadow-sm", getButtonClasses())}
                        style={{ color: currentTheme.colors.text }}
                    >
                        {getIcon(link.type)}
                        <span className="text-xs font-bold flex-1 text-left">{link.label}</span>
                        <ArrowRightIcon size={14} className="opacity-50" />
                    </a>
                ))}
            </div>
        );
    };

    const formatLink = (link: SocialLink) => {
        let href = link.url;
        if (link.type === 'email' && !href.startsWith('mailto:')) href = `mailto:${href}`;
        else if (link.type === 'phone' && !href.startsWith('tel:')) href = `tel:${href}`;
        else if (!href.startsWith('http') && link.type !== 'email' && link.type !== 'phone') href = `https://${href}`;
        return href;
    }

    return (
        <div className="relative w-[300px] h-[600px] md:w-[340px] md:h-[680px] bg-black rounded-[3rem] border-8 border-[#1a1a1a] shadow-2xl overflow-hidden mx-auto ring-1 ring-white/10">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20 flex justify-center items-end pb-1">
                <div className="w-12 h-1 bg-black/50 rounded-full" />
            </div>

            {/* Screen Content */}
            <div
                className="w-full h-full overflow-y-auto no-scrollbar"
                style={{
                    backgroundColor: currentTheme.colors.background,
                    color: currentTheme.colors.text,
                    backgroundImage: currentTheme.id === 'luxury'
                        ? 'radial-gradient(circle at top right, rgba(255,215,0,0.15), transparent 40%)'
                        : undefined
                }}
            >

                {/* Cover Photo Area */}
                <div className="h-40 w-full relative">
                    {profile.cover ? (
                        <div className="w-full h-full relative">
                            <img src={profile.cover} className="w-full h-full object-cover" alt="Cover" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/50" />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/20" />
                    )}
                </div>

                {/* Profile Header */}
                <div className="px-6 -mt-16 relative z-10 text-center mb-8">
                    <div className="w-28 h-28 rounded-full border-4 border-[#1a1a1a] mx-auto overflow-hidden bg-gray-800 shadow-2xl relative group">
                        {profile.avatar ? (
                            <img src={profile.avatar} className="w-full h-full object-cover" alt="Avatar" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-black text-white/20 bg-white/5">
                                {profile.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <h2 className="mt-4 text-2xl font-bold font-display tracking-tight">{profile.name}</h2>
                    <p className="text-sm opacity-60 mt-2 max-w-[240px] mx-auto leading-relaxed font-medium">{profile.bio}</p>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-3 mt-6">
                        <button
                            className="flex-1 py-3 rounded-xl text-xs font-bold transition active:scale-95 shadow-lg max-w-[160px] uppercase tracking-wider"
                            style={{
                                backgroundColor: currentTheme.colors.primary,
                                color: currentTheme.colors.background
                            }}
                        >
                            Save Contact
                        </button>
                        <button
                            className={clsx("w-10 h-10 flex items-center justify-center rounded-xl transition active:scale-95 border backdrop-blur-md", getButtonClasses())}
                            style={{ color: currentTheme.colors.text }}
                        >
                            <QrCode size={18} />
                        </button>
                    </div>
                </div>

                {/* Links Container */}
                {renderLinks()}

                {/* Branding Footer */}
                <div className="pb-8 text-center mt-auto">
                    <div className="flex items-center justify-center gap-1.5 opacity-30">
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase">APPLIX</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

function ArrowRightIcon({ size, className }: { size?: number, className?: string }) {
    return (
        <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}

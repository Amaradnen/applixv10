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

    return (
        <div className="relative w-[300px] h-[600px] md:w-[340px] md:h-[680px] bg-black rounded-[3rem] border-8 border-[#1a1a1a] shadow-2xl overflow-hidden mx-auto">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20 flex justify-center items-end pb-1">
                <div className="w-12 h-1 bg-black/50 rounded-full" />
            </div>

            {/* Screen Content */}
            <div
                className="w-full h-full overflow-y-auto no-scrollbar"
                style={{
                    backgroundColor: currentTheme.colors.background,
                    color: currentTheme.colors.text
                }}
            >

                {/* Cover Photo Area */}
                <div className="h-32 w-full bg-gradient-to-b from-white/10 to-transparent relative">
                    {profile.cover && <img src={profile.cover} className="w-full h-full object-cover" alt="Cover" />}
                </div>

                {/* Profile Header */}
                <div className="px-6 -mt-12 relative z-10 text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-transparent mx-auto overflow-hidden bg-gray-800 shadow-xl relative group">
                        {profile.avatar ? (
                            <img src={profile.avatar} className="w-full h-full object-cover" alt="Avatar" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white/20 bg-white/5">
                                {profile.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <h2 className="mt-4 text-xl font-bold font-display">{profile.name}</h2>
                    <p className="text-xs opacity-60 mt-1 max-w-[200px] mx-auto leading-relaxed">{profile.bio}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3 mt-6 px-6">
                    <button
                        className="flex-1 py-3 rounded-full text-xs font-bold transition active:scale-95 shadow-lg"
                        style={{
                            backgroundColor: currentTheme.colors.primary,
                            color: currentTheme.colors.background
                        }}
                    >
                        Save Contact
                    </button>
                    <button
                        className={clsx("w-10 h-10 flex items-center justify-center rounded-full transition active:scale-95 border", getButtonClasses())}
                        style={{ color: currentTheme.colors.text }}
                    >
                        <QrCode size={18} />
                    </button>
                </div>

                {/* Social Links */}
                <div className="mt-8 px-6 space-y-3 pb-10">
                    {profile.links.length === 0 && (
                        <div className="text-center py-8 opacity-30 text-[10px] uppercase font-bold tracking-widest border-2 border-dashed border-current rounded-xl">
                            Ajoutez vos liens
                        </div>
                    )}

                    {profile.links.filter(l => l.active).map(link => {
                        let href = link.url;
                        if (link.type === 'email' && !href.startsWith('mailto:')) href = `mailto:${href}`;
                        else if (link.type === 'phone' && !href.startsWith('tel:')) href = `tel:${href}`;
                        else if (!href.startsWith('http') && link.type !== 'email' && link.type !== 'phone') href = `https://${href}`;

                        return (
                            <a
                                key={link.id}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className={clsx("block w-full py-4 px-4 rounded-xl flex items-center gap-4 transition active:scale-[0.98] border shadow-sm", getButtonClasses())}
                                style={{ color: currentTheme.colors.text }}
                            >
                                {getIcon(link.type)}
                                <span className="text-xs font-bold flex-1">{link.label}</span>
                                <ArrowRightIcon size={14} className="opacity-50" />
                            </a>
                        );
                    })}
                </div>

                {/* Branding Footer */}
                <div className="pb-8 text-center">
                    <p className="text-[9px] opacity-30 font-bold tracking-widest uppercase">Powered by APPLIX</p>
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

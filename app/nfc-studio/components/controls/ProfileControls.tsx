"use client";

import React, { useState, useRef } from "react";
import { useStudioStore, SocialLink } from "../../store/useStudioStore";
import { ArrowLeft, ArrowRight, Plus, Trash2, ChevronUp, ChevronDown, Check, Upload, User, Link as LinkIcon } from "lucide-react";
import clsx from "clsx";
import { PROFILE_THEMES } from "../../constants/templates";

export default function ProfileControls() {
    const { profile, updateProfile, cardFront, setStep } = useStudioStore();
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [newLinkType, setNewLinkType] = useState<SocialLink['type']>('instagram');
    const [newLinkUrl, setNewLinkUrl] = useState('');
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const [newLinkLabel, setNewLinkLabel] = useState('');
    const linkIdCounter = useRef(1000);

    // Update label preference when type changes
    React.useEffect(() => {
        setNewLinkLabel(newLinkType.charAt(0).toUpperCase() + newLinkType.slice(1));
    }, [newLinkType]);

    const handleAddLink = () => {
        if (!newLinkUrl) return;

        let formattedUrl = newLinkUrl;
        // Smart URL formatting
        if (newLinkType === 'email' && !formattedUrl.startsWith('mailto:')) {
            formattedUrl = `mailto:${formattedUrl}`;
        } else if (newLinkType === 'phone' && !formattedUrl.startsWith('tel:')) {
            formattedUrl = `tel:${formattedUrl}`;
        } else if (newLinkType === 'whatsapp' && !formattedUrl.startsWith('https://wa.me/')) {
            // Basic cleanup for whatsapp
            const number = formattedUrl.replace(/[^\d]/g, '');
            formattedUrl = `https://wa.me/${number}`;
        } else if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://') && newLinkType !== 'email' && newLinkType !== 'phone') {
            formattedUrl = `https://${formattedUrl}`;
        }

        const newLink: SocialLink = {
            id: `link-${linkIdCounter.current++}`,
            type: newLinkType,
            url: formattedUrl,
            label: newLinkLabel || newLinkType.charAt(0).toUpperCase() + newLinkType.slice(1),
            active: true
        };
        updateProfile({ links: [...profile.links, newLink] });
        setNewLinkUrl('');
        setNewLinkLabel(newLinkType.charAt(0).toUpperCase() + newLinkType.slice(1));
        setIsAddingLink(false);
    };

    const removeLink = (id: string) => {
        updateProfile({ links: profile.links.filter(l => l.id !== id) });
    };

    const moveLink = (index: number, direction: 'up' | 'down') => {
        const newLinks = [...profile.links];
        if (direction === 'up' && index > 0) {
            [newLinks[index], newLinks[index - 1]] = [newLinks[index - 1], newLinks[index]];
        } else if (direction === 'down' && index < newLinks.length - 1) {
            [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
        }
        updateProfile({ links: newLinks });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result && typeof ev.target.result === 'string') {
                    if (type === 'avatar') updateProfile({ avatar: ev.target.result });
                    if (type === 'cover') updateProfile({ cover: ev.target.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const syncFromCard = () => {
        updateProfile({ name: cardFront.texts.name, bio: cardFront.texts.title });
    };

    return (
        <div className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl h-full flex flex-col">
            <button onClick={() => setStep(1)} className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition w-fit">
                <ArrowLeft size={12} /> Retour au Design
            </button>

            <div>
                <h2 className="text-xl font-bold font-display text-white mb-1">Profil Digital</h2>
                <p className="text-xs text-white/50">L&apos;expérience qui s&apos;ouvre sur le téléphone.</p>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">

                {/* Theme & Avatar & Cover */}
                <section className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-2">
                        Apparence
                    </label>

                    {/* Cover Upload */}
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/20 bg-white/5 group mb-4">
                        {profile.cover ? (
                            <img src={profile.cover} className="w-full h-full object-cover" alt="Cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 text-xs uppercase font-bold tracking-widest">
                                Ajouter une couverture
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer" onClick={() => coverInputRef.current?.click()}>
                            <div className="flex flex-col items-center gap-2 text-white">
                                <Upload size={20} />
                                <span className="text-xs font-bold">Changer Cover</span>
                            </div>
                        </div>
                        {profile.cover && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateProfile({ cover: undefined });
                                }}
                                className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition"
                            >
                                Supprimer
                            </button>
                        )}
                        <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} />
                    </div>

                    <div className="flex gap-4">
                        <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-white/20 bg-white/5">
                                {profile.avatar ? (
                                    <img src={profile.avatar} className="w-full h-full object-cover" alt="Avatar" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20"><User /></div>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                <Upload size={14} className="text-white" />
                            </div>
                            <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'avatar')} />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                {PROFILE_THEMES.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => updateProfile({ theme: theme.id as any })}
                                        className={clsx(
                                            "h-10 rounded border flex flex-col items-center justify-center transition-all p-1",
                                            profile.theme === theme.id
                                                ? "border-gg-gold ring-1 ring-gg-gold/50"
                                                : "border-white/10 hover:border-white/30"
                                        )}
                                        style={{ background: theme.colors.background }}
                                    >
                                        {profile.theme === theme.id && <Check size={12} style={{ color: theme.colors.text }} />}
                                        <span className="text-[8px] font-bold mt-0.5" style={{ color: theme.colors.text }}>{theme.name}</span>
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-white/40">Thème de la page</p>
                        </div>
                    </div>
                </section>

                {/* Info Fields */}
                <section className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/50">Infos de base</label>
                        <button onClick={syncFromCard} className="text-[10px] text-gg-gold hover:underline">Sync avec Carte</button>
                    </div>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition placeholder:text-white/20"
                        placeholder="Nom complet"
                    />
                    <textarea
                        value={profile.bio}
                        onChange={(e) => updateProfile({ bio: e.target.value })}
                        rows={2}
                        className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-gg-gold/50 outline-none transition resize-none placeholder:text-white/20"
                        placeholder="Bio courte ou Titre..."
                    />
                </section>

                {/* Links Manager */}
                <section>
                    <div className="flex justify-between items-end mb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-2">
                            <LinkIcon size={14} /> Vos Liens
                        </label>
                        {!isAddingLink && (
                            <button
                                onClick={() => setIsAddingLink(true)}
                                className="text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded flex items-center gap-1 transition"
                            >
                                <Plus size={12} /> Ajouter
                            </button>
                        )}
                    </div>

                    {isAddingLink && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 animate-in fade-in zoom-in-95 duration-200">
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                {['instagram', 'linkedin', 'website', 'whatsapp', 'email', 'youtube', 'tiktok', 'phone', 'facebook'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setNewLinkType(type as any)}
                                        className={clsx(
                                            "text-[9px] uppercase font-bold py-2 rounded border transition-all truncate px-1",
                                            newLinkType === type
                                                ? "bg-gg-gold text-black border-gg-gold"
                                                : "bg-black/40 text-white/50 border-white/5 hover:bg-white/10"
                                        )}
                                        title={type}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <div className="space-y-2 mb-3">
                                <input
                                    type="text"
                                    value={newLinkLabel}
                                    onChange={(e) => setNewLinkLabel(e.target.value)}
                                    placeholder="Titre du lien (ex: Mon Email)"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-white/30 outline-none"
                                />
                                <input
                                    autoFocus
                                    type="text"
                                    value={newLinkUrl}
                                    onChange={(e) => setNewLinkUrl(e.target.value)}
                                    placeholder={`URL pour ${newLinkType}...`}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-white/30 outline-none"
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleAddLink} className="flex-1 bg-white text-black text-xs font-bold py-2 rounded-lg hover:bg-gray-200 transition">Ajouter</button>
                                <button onClick={() => setIsAddingLink(false)} className="px-3 text-white/40 hover:text-white text-xs">Annuler</button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        {profile.links.map((link, idx) => (
                            <div key={link.id} className="group flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl hover:border-white/20 transition-colors">
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => moveLink(idx, 'up')} disabled={idx === 0} className="text-white/20 hover:text-white disabled:opacity-0"><ChevronUp size={12} /></button>
                                    <button onClick={() => moveLink(idx, 'down')} disabled={idx === profile.links.length - 1} className="text-white/20 hover:text-white disabled:opacity-0"><ChevronDown size={12} /></button>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-white flex items-center gap-2">
                                        {link.label}
                                        <span className="text-[10px] font-normal opacity-50 capitalize">({link.type})</span>
                                    </div>
                                    <div className="text-[10px] text-white/40 truncate">{link.url}</div>
                                </div>
                                <button onClick={() => removeLink(link.id)} className="p-2 text-white/20 hover:text-red-400 transition hover:bg-red-400/10 rounded-lg">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                        {profile.links.length === 0 && !isAddingLink && (
                            <div className="text-center py-6 text-white/20 text-xs italic border border-dashed border-white/10 rounded-xl">
                                Aucun lien configuré.
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <div className="pt-4 border-t border-white/5 mt-auto">
                <button
                    onClick={() => setStep(3)}
                    className="w-full h-14 bg-white text-black font-black text-sm uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                    Terminer & Commander <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}

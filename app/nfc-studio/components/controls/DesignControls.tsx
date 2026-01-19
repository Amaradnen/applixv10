"use client";

import React, { useState, useRef } from "react";
import { useStudioStore } from "../../store/useStudioStore";
import { CreditCard, PenTool, Layout, Upload, X, Grid, Sparkles, Image as ImageIcon } from "lucide-react";
import clsx from "clsx";
import FileUploader from "../ui/FileUploader";
import SignaturePad from "./SignaturePad";
import { CARD_TEMPLATES } from "../../constants/templates";

export default function DesignControls() {
    const {
        cardFront,
        updateCardFront,
        updateCardFrontText,
        cardBack,
        updateCardBack,
        activeSide,
        setActiveSide,
        setStep
    } = useStudioStore();

    const [overlayOpacity, setOverlayOpacity] = useState(100);
    const rectoOverlayInputRef = useRef<HTMLInputElement>(null);
    const versoOverlayInputRef = useRef<HTMLInputElement>(null);

    // Use templates from constants
    const presets = CARD_TEMPLATES.slice(0, 6);

    const handleFileUpload = (file: File, callback: (dataUrl: string) => void) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result && typeof e.target.result === 'string') {
                callback(e.target.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleOverlayUpload = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file, (dataUrl) => {
                if (side === 'front') {
                    updateCardFront({ overlayUrl: dataUrl, overlayOpacity });
                } else {
                    updateCardBack({ overlayUrl: dataUrl, overlayOpacity });
                }
            });
        }
    };

    const handleAiAutoDesign = () => {
        const randomIndex = Math.floor(Math.random() * presets.length);
        const randomPreset = presets[randomIndex];
        updateCardFront({
            material: randomPreset.material as any,
            template: randomPreset.template as any,
            texts: { ...cardFront.texts, name: "AI GENERATED", title: "VISIONARY" }
        });
    };

    return (
        <div className="bg-[#0B0B0B] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl h-full flex flex-col">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold font-display text-white mb-1">Design Studio</h2>
                    <p className="text-xs text-white/50">Configurez votre carte unique.</p>
                </div>
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setActiveSide('front')}
                        className={clsx("px-3 py-1 text-xs font-bold rounded transition", activeSide === 'front' ? "bg-white text-black" : "text-white/40")}
                    >Recto</button>
                    <button
                        onClick={() => setActiveSide('back')}
                        className={clsx("px-3 py-1 text-xs font-bold rounded transition", activeSide === 'back' ? "bg-white text-black" : "text-white/40")}
                    >Verso</button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8">

                {/* RECTO CONTROLS */}
                {activeSide === 'front' && (
                    <>
                        <section>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-2">
                                    <Grid size={14} /> Presets & IA
                                </label>
                                <button
                                    onClick={handleAiAutoDesign}
                                    className="text-[10px] font-black text-black bg-gradient-to-r from-purple-400 to-pink-400 px-3 py-1.5 rounded-lg border border-white/20 animate-pulse flex items-center gap-1 hover:scale-105 transition"
                                >
                                    <Sparkles size={10} /> IA AUTO-DESIGN
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {presets.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => updateCardFront({ material: p.material as any, template: p.template as any })}
                                        className={clsx(
                                            "text-left p-3 rounded-xl border transition-all text-xs hover:bg-white/5 group",
                                            cardFront.material === p.material && cardFront.template === p.template
                                                ? "border-gg-gold bg-gg-gold/5 ring-1 ring-gg-gold/20"
                                                : "border-white/10"
                                        )}
                                    >
                                        <div className="font-bold text-white group-hover:text-gg-gold transition-colors">{p.name}</div>
                                        <div className="text-[10px] text-white/40">{p.material.replace('-', ' ')}</div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="bg-gg-gold/10 border border-gg-gold/20 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <div className="text-gg-gold mt-0.5">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v-4" />
                                        <path d="M12 8h.01" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gg-gold mb-1">Édition Directe</div>
                                    <div className="text-[11px] text-white/60 leading-relaxed">
                                        Cliquez directement sur le texte de la carte (nom, titre, entreprise) pour le modifier.
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <FileUploader
                                label="Logo"
                                currentFile={cardFront.logoUrl}
                                onUploadComplete={(url) => updateCardFront({ logoUrl: url })}
                                accept="image/*"
                                maxSize={5}
                            />
                        </section>

                        <section>
                            <FileUploader
                                label="Fond Recto"
                                currentFile={cardFront.backgroundUrl}
                                onUploadComplete={(url) => updateCardFront({ backgroundUrl: url })}
                                accept="image/*"
                                maxSize={5}
                            />
                        </section>

                        <section>
                            <label className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2">
                                <ImageIcon size={14} /> Design Overlay (Recto)
                            </label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => rectoOverlayInputRef.current?.click()}
                                        className="flex-1 h-10 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-xs text-white/50 hover:text-white hover:border-white/50 transition"
                                    >
                                        {cardFront.overlayUrl ? "Changer Overlay" : "Ajouter Overlay"}
                                    </button>
                                    {cardFront.overlayUrl && (
                                        <button
                                            onClick={() => updateCardFront({ overlayUrl: undefined })}
                                            className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                    <input
                                        type="file"
                                        ref={rectoOverlayInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleOverlayUpload(e, 'front')}
                                    />
                                </div>
                                {cardFront.overlayUrl && (
                                    <div>
                                        <label className="text-[10px] text-white/40 mb-1 block">Opacité: {overlayOpacity}%</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={overlayOpacity}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                setOverlayOpacity(val);
                                                updateCardFront({ overlayOpacity: val });
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                )}

                {/* VERSO CONTROLS */}
                {activeSide === 'back' && (
                    <section className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                            <div className="bg-gg-gold/10 border border-gg-gold/20 rounded-xl p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="text-gg-gold mt-0.5">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gg-gold mb-1">Édition Directe - Verso</div>
                                        <div className="text-[11px] text-white/60 leading-relaxed">
                                            Cliquez sur le texte du verso (email, téléphone, adresse, texte d&apos;invitation) pour le modifier directement.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <FileUploader
                                    label="Fond Verso"
                                    currentFile={cardBack.backgroundUrl}
                                    onUploadComplete={(url) => updateCardBack({ backgroundUrl: url })}
                                    accept="image/*"
                                    maxSize={5}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2">
                                    <ImageIcon size={14} /> Design Overlay (Verso)
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => versoOverlayInputRef.current?.click()}
                                        className="flex-1 h-10 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-xs text-white/50 hover:text-white hover:border-white/50 transition"
                                    >
                                        {cardBack.overlayUrl ? "Changer Overlay" : "Ajouter Overlay"}
                                    </button>
                                    {cardBack.overlayUrl && (
                                        <button
                                            onClick={() => updateCardBack({ overlayUrl: undefined })}
                                            className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                    <input
                                        type="file"
                                        ref={versoOverlayInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleOverlayUpload(e, 'back')}
                                    />
                                </div>
                            </div>

                            {/* Signature Section - VERSO ONLY */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-2">
                                        <PenTool size={14} /> Signature (Verso uniquement)
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-white/60 uppercase">{cardBack.signatureEnabled ? "ON" : "OFF"}</span>
                                        <button
                                            onClick={() => updateCardBack({ signatureEnabled: !cardBack.signatureEnabled })}
                                            className={clsx("w-8 h-4 rounded-full relative transition-colors", cardBack.signatureEnabled ? "bg-gg-gold" : "bg-white/20")}
                                        >
                                            <div className={clsx("absolute top-0.5 w-3 h-3 rounded-full bg-black transition-all", cardBack.signatureEnabled ? "left-4.5" : "left-0.5")} />
                                        </button>
                                    </div>
                                </div>
                                {cardBack.signatureEnabled && (
                                    <div className="space-y-3 mt-3">
                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                onClick={() => updateCardBack({ signatureType: 'text' })}
                                                className={clsx("p-2 rounded border text-xs font-bold text-white transition", cardBack.signatureType === 'text' ? "bg-white/10 border-gg-gold" : "border-white/10")}
                                            >
                                                Texte
                                            </button>
                                            <button
                                                onClick={() => updateCardBack({ signatureType: 'draw' })}
                                                className={clsx("p-2 rounded border text-xs font-bold text-white transition", cardBack.signatureType === 'draw' ? "bg-white/10 border-gg-gold" : "border-white/10")}
                                            >
                                                Dessiner
                                            </button>
                                            <button
                                                onClick={() => updateCardBack({ signatureType: 'upload' })}
                                                className={clsx("p-2 rounded border text-xs font-bold text-white transition", cardBack.signatureType === 'upload' ? "bg-white/10 border-gg-gold" : "border-white/10")}
                                            >
                                                Image
                                            </button>
                                        </div>

                                        {cardBack.signatureType === 'draw' && (
                                            <SignaturePad
                                                currentSignature={cardBack.signatureValue}
                                                onSave={(dataURL) => updateCardBack({ signatureValue: dataURL })}
                                            />
                                        )}

                                        {cardBack.signatureType === 'upload' && (
                                            <FileUploader
                                                label="Signature Image"
                                                currentFile={cardBack.signatureValue}
                                                onUploadComplete={(url) => updateCardBack({ signatureValue: url })}
                                                accept="image/*"
                                                maxSize={2}
                                            />
                                        )}

                                        {cardBack.signatureType === 'text' && (
                                            <input
                                                type="text"
                                                value={cardBack.signatureValue || ''}
                                                onChange={(e) => updateCardBack({ signatureValue: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white placeholder:text-white/30"
                                                placeholder="Votre signature"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* QR Code */}
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-white">QR Code</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateCardBack({ qrEnabled: !cardBack.qrEnabled })}
                                        className={clsx("w-8 h-4 rounded-full relative transition-colors", cardBack.qrEnabled ? "bg-green-500" : "bg-white/20")}
                                    >
                                        <div className={clsx("absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all", cardBack.qrEnabled ? "left-4.5" : "left-0.5")} />
                                    </button>
                                </div>
                            </div>

                            {cardBack.qrEnabled && (
                                <input
                                    type="url"
                                    value={cardBack.qrUrl}
                                    onChange={(e) => updateCardBack({ qrUrl: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-sm text-white placeholder:text-white/30"
                                    placeholder="https://applix.me/votre-profil"
                                />
                            )}

                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-white">Petit Logo</span>
                                <button
                                    onClick={() => updateCardBack({ logoEnabled: !cardBack.logoEnabled })}
                                    className={clsx("w-8 h-4 rounded-full relative transition-colors", cardBack.logoEnabled ? "bg-green-500" : "bg-white/20")}
                                >
                                    <div className={clsx("absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all", cardBack.logoEnabled ? "left-4.5" : "left-0.5")} />
                                </button>
                            </div>
                        </div>
                        <div className="text-center text-xs text-white/30 italic">
                            La puce NFC est intégrée au centre.
                        </div>
                    </section>
                )}

            </div>

            <div className="pt-4 border-t border-white/5 mt-auto">
                <button
                    onClick={() => setStep(2)}
                    className="w-full h-14 bg-white text-black font-black text-sm uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                    Continuer <span className="text-xs opacity-50">(Profil)</span>
                </button>
            </div>
        </div>
    );
}

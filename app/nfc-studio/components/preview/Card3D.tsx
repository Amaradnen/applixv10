"use client";

import React, { useState, useEffect } from "react";
import { useStudioStore } from "../../store/useStudioStore";
import { motion } from "framer-motion";
import { RefreshCw, Wifi, Hexagon, Nfc } from "lucide-react";
import clsx from "clsx";
import QRCode from 'react-qr-code';

export default function Card3D() {
    const { cardFront, cardBack, activeSide, setActiveSide, updateCardFrontText, updateCardBackText, updateCardBackInvitationText, updateCardFront } = useStudioStore();
    const [mounted, setMounted] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-full h-[400px] flex items-center justify-center">
                <div className="animate-pulse w-[320px] h-[200px] bg-white/5 rounded-xl" />
            </div>
        );
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 25;
        const y = (e.clientY - rect.top - rect.height / 2) / 25;
        setTilt({ x: -y, y: x });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    const getMaterialClass = () => {
        switch (cardFront.material) {
            case 'metal-black': return "bg-gradient-to-br from-gray-800 via-[#111] to-black border border-white/10";
            case 'metal-gold': return "bg-gradient-to-br from-[#F7D66A] via-[#E3B52E] to-[#CFA31D] border border-[#F7D66A]/20";
            case 'metal-silver': return "bg-gradient-to-br from-[#E0E0E0] via-[#C0C0C0] to-[#A0A0A0] border border-white/20";
            case 'pvc-white': return "bg-white text-black border border-gray-200";
            case 'pvc-black': return "bg-black border border-white/10";
            case 'wood-bamboo': return "bg-[#D2B48C] border border-[#8B4513]/20";
            case 'carbon-fiber': return "bg-gradient-to-br from-[#2C2C2C] via-[#1A1A1A] to-black border border-white/5";
            default: return "bg-[#111] border border-white/10";
        }
    };

    const getTextColor = () => {
        if (cardFront.material === 'pvc-white' || cardFront.material === 'metal-silver' || cardFront.material === 'wood-bamboo') return 'text-black';
        return 'text-white';
    };

    return (
        <div className="perspective-1000 w-full h-[500px] flex flex-col items-center justify-center gap-8">

            <motion.div
                className="relative w-[340px] h-[215px] md:w-[420px] md:h-[265px] preserve-3d cursor-pointer"
                animate={{
                    rotateY: activeSide === 'back' ? 180 : 0,
                    rotateX: tilt.x,
                    rotateZ: 0
                }}
                style={{ transformStyle: "preserve-3d" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* FRONT FACE */}
                <div className={clsx(
                    "absolute inset-0 rounded-2xl p-8 flex flex-col justify-between shadow-2xl overflow-hidden",
                    !cardFront.backgroundUrl && getMaterialClass(),
                    getTextColor()
                )} style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                    {/* Front Background Image */}
                    {cardFront.backgroundUrl && (
                        <div className="absolute inset-0 z-0">
                            <img src={cardFront.backgroundUrl} className="w-full h-full object-cover opacity-90" alt="Card Background" />
                            <div className="absolute inset-0 bg-black/30" />
                        </div>
                    )}

                    {/* Front Overlay */}
                    {cardFront.overlayUrl && (
                        <div className="absolute inset-0 z-[1]" style={{ opacity: (cardFront.overlayOpacity || 100) / 100 }}>
                            <img src={cardFront.overlayUrl} className="w-full h-full object-cover" alt="Overlay" />
                        </div>
                    )}

                    {/* Logo / Chip */}
                    <div className="flex justify-between items-start relative z-10">
                        {cardFront.logoUrl ? (
                            <img src={cardFront.logoUrl} className="h-10 object-contain" alt="Logo" />
                        ) : (
                            <div className="flex items-center gap-2 opacity-50">
                                <Hexagon size={24} />
                                <span
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardFront({ brandName: e.currentTarget.textContent || 'APPLIX' })}
                                    className="font-bold tracking-widest text-xs outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-1 cursor-text"
                                >
                                    {cardFront.brandName || 'APPLIX'}
                                </span>
                            </div>
                        )}
                        <div className="opacity-40">
                            <Nfc size={24} />
                        </div>
                    </div>

                    {/* Content - Template-based layout */}
                    <div className="space-y-1 relative z-10">
                        {cardFront.template === 'centered' ? (
                            <div className="text-center mt-4">
                                {cardFront.logoUrl && <img src={cardFront.logoUrl} className="h-16 mx-auto mb-4 object-contain" alt="Logo" />}
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardFrontText('name', e.currentTarget.textContent || '')}
                                    className="text-lg font-bold font-display tracking-widest uppercase outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-1 cursor-text"
                                >
                                    {cardFront.texts.name}
                                </div>
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardFrontText('title', e.currentTarget.textContent || '')}
                                    className="text-[10px] opacity-60 tracking-widest uppercase outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-1 cursor-text"
                                >
                                    {cardFront.texts.title}
                                </div>
                            </div>
                        ) : cardFront.template === 'bold' ? (
                            <>
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardFrontText('name', e.currentTarget.textContent || '')}
                                    className="text-2xl font-black font-display tracking-wider uppercase outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-1 cursor-text"
                                >
                                    {cardFront.texts.name}
                                </div>
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardFrontText('title', e.currentTarget.textContent || '')}
                                    className="text-xs opacity-70 tracking-widest uppercase outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-1 cursor-text font-bold"
                                >
                                    {cardFront.texts.title}
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardFrontText('name', e.currentTarget.textContent || '')}
                                    className="text-xl font-bold font-display tracking-widest uppercase outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-1 cursor-text"
                                >
                                    {cardFront.texts.name}
                                </div>
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardFrontText('title', e.currentTarget.textContent || '')}
                                    className="text-[10px] opacity-60 tracking-widest uppercase outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-1 cursor-text"
                                >
                                    {cardFront.texts.title}
                                </div>
                                {cardFront.texts.company && (
                                    <div
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => updateCardFrontText('company', e.currentTarget.textContent || '')}
                                        className="text-[10px] opacity-60 font-bold uppercase mt-2 outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-1 cursor-text"
                                    >
                                        {cardFront.texts.company}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 rounded-2xl pointer-events-none z-20" />
                </div>

                {/* BACK FACE */}
                <div className={clsx(
                    "absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center shadow-2xl overflow-hidden",
                    !cardBack.backgroundUrl && getMaterialClass(),
                    getTextColor()
                )} style={{ transform: "rotateY(180deg)", backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>

                    {/* Back Background Image */}
                    {cardBack.backgroundUrl && (
                        <div className="absolute inset-0 z-0">
                            <img src={cardBack.backgroundUrl} className="w-full h-full object-cover opacity-90" alt="Card Back Background" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    )}

                    {/* Back Overlay */}
                    {cardBack.overlayUrl && (
                        <div className="absolute inset-0 z-[1]" style={{ opacity: (cardBack.overlayOpacity || 100) / 100 }}>
                            <img src={cardBack.overlayUrl} className="w-full h-full object-cover" alt="Overlay" />
                        </div>
                    )}

                    {/* QR Code - Top Right & Smaller */}
                    {cardBack.qrEnabled && (
                        <div className="absolute top-6 right-6 w-12 h-12 bg-white p-1 rounded-md flex items-center justify-center z-20 shadow-lg">
                            <QRCode
                                value={cardBack.qrUrl}
                                size={40}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="M"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    )}

                    <div className="relative z-10 flex flex-col items-center space-y-3">

                        {/* Verso Contact Info */}
                        <div className="text-center space-y-1 text-[10px] opacity-60">
                            {cardBack.texts.email && (
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardBackText('email', e.currentTarget.textContent || '')}
                                    className="outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-2 py-1 cursor-text"
                                >
                                    {cardBack.texts.email}
                                </div>
                            )}
                            {cardBack.texts.phone && (
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardBackText('phone', e.currentTarget.textContent || '')}
                                    className="outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-2 py-1 cursor-text"
                                >
                                    {cardBack.texts.phone}
                                </div>
                            )}
                            {cardBack.texts.address && (
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardBackText('address', e.currentTarget.textContent || '')}
                                    className="outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-2 py-1 cursor-text"
                                >
                                    {cardBack.texts.address}
                                </div>
                            )}
                            {cardBack.texts.website && (
                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => updateCardBackText('website', e.currentTarget.textContent || '')}
                                    className="font-bold outline-none focus:ring-2 focus:ring-gg-gold/50 rounded px-2 py-1 cursor-text"
                                >
                                    {cardBack.texts.website}
                                </div>
                            )}
                        </div>

                        {/* Signature - VERSO ONLY */}
                        {cardBack.signatureEnabled && (cardBack.signatureValue || cardBack.signatureLabel) && (
                            <div className="mt-4 flex flex-col items-center">
                                {cardBack.signatureValue && (
                                    <>
                                        {cardBack.signatureType === 'text' && (
                                            <div className="font-script text-2xl opacity-90 rotate-[-5deg]" style={{ fontFamily: 'cursive' }}>
                                                {cardBack.signatureValue}
                                            </div>
                                        )}
                                        {(cardBack.signatureType === 'draw' || cardBack.signatureType === 'upload') && (
                                            <img src={cardBack.signatureValue} className="h-14 object-contain rotate-[-2deg] opacity-90 drop-shadow-sm invert" alt="Signature" style={{ filter: 'invert(1) brightness(2)' }} />
                                        )}
                                    </>
                                )}
                                {cardBack.signatureLabel && (
                                    <div className="font-serif italic text-sm text-white/90 mt-1 tracking-wide drop-shadow-md pb-2">
                                        {cardBack.signatureLabel}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-2 opacity-40 mt-2">
                            <Wifi size={16} className="rotate-90" />
                        </div>

                        {cardBack.logoEnabled && cardFront.logoUrl && (
                            <div className="mt-2 opacity-50">
                                <img src={cardFront.logoUrl} className="h-6 object-contain grayscale" alt="Small Logo" />
                            </div>
                        )}
                    </div>

                </div>
            </motion.div>

            {/* Controls */}
            <button
                onClick={() => setActiveSide(activeSide === 'front' ? 'back' : 'front')}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition backdrop-blur-md border border-white/10"
            >
                <RefreshCw size={16} className={clsx("transition-transform duration-500", activeSide === 'back' && "rotate-180")} />
                {activeSide === 'back' ? "Voir Recto" : "Voir Verso"}
            </button>

            <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                Design Interactif • Cliquez pour éditer
            </div>
        </div>
    );
}

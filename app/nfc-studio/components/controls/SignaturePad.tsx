"use client";

import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Trash2, Check, PenTool } from 'lucide-react';
import clsx from 'clsx';

interface SignaturePadProps {
    onSave: (dataURL: string) => void;
    onClear?: () => void;
    currentSignature?: string;
}

export default function SignaturePad({ onSave, onClear, currentSignature }: SignaturePadProps) {
    const sigPad = useRef<SignatureCanvas>(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [color, setColor] = useState('#000000');

    const clear = () => {
        sigPad.current?.clear();
        setIsEmpty(true);
    };

    const save = () => {
        if (sigPad.current && !sigPad.current.isEmpty()) {
            const dataURL = sigPad.current.toDataURL('image/png');
            onSave(dataURL);
        }
    };

    const handleBegin = () => {
        setIsEmpty(false);
    };

    return (
        <div className="space-y-3">
            {/* Controls */}
            {/* Controls */}
            <div className="flex items-center justify-between gap-4 p-1">
                {/* Stroke Width */}
                <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10">
                    {[1, 3, 5].map((w) => (
                        <button
                            key={w}
                            onClick={() => setStrokeWidth(w)}
                            className={clsx(
                                "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                strokeWidth === w ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white"
                            )}
                            title={`${w}px`}
                        >
                            <div className="bg-current rounded-full" style={{ width: w * 1.5, height: w * 1.5 }} />
                        </button>
                    ))}
                </div>

                {/* Colors */}
                <div className="flex items-center gap-2">
                    {['#000000', '#0000FF', '#FF0000', '#008000'].map((c) => (
                        <button
                            key={c}
                            onClick={() => setColor(c)}
                            className={clsx(
                                "w-6 h-6 rounded-full border-2 transition-all hover:scale-110",
                                color === c ? "border-gg-gold scale-110 shadow-[0_0_10px_rgba(227,181,46,0.5)]" : "border-white/10 opacity-70 hover:opacity-100"
                            )}
                            style={{ backgroundColor: c }}
                            title={c}
                        />
                    ))}
                    {/* Custom Picker Wrapper */}
                    <div className="relative w-6 h-6 rounded-full border-2 border-white/10 overflow-hidden ml-1 opacity-70 hover:opacity-100 transition">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer p-0 border-0"
                            title="Custom Color"
                        />
                    </div>
                </div>
            </div>

            {/* Canvas */}
            <div className="relative border border-white/20 rounded-xl overflow-hidden bg-white">
                <SignatureCanvas
                    ref={sigPad}
                    canvasProps={{
                        className: 'w-full h-32',
                        style: { touchAction: 'none' }
                    }}
                    backgroundColor="white"
                    penColor={color}
                    minWidth={strokeWidth * 0.5}
                    maxWidth={strokeWidth * 1.5}
                    onBegin={handleBegin}
                />

                {isEmpty && !currentSignature && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <PenTool size={16} />
                            <span>Dessinez votre signature ici</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={clear}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition text-sm font-bold"
                >
                    <Trash2 size={14} />
                    Effacer
                </button>
                <button
                    onClick={save}
                    disabled={isEmpty}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gg-gold hover:bg-[#CFA31D] text-black rounded-lg transition text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Check size={14} />
                    Sauvegarder
                </button>
            </div>

            {/* Current Signature Preview */}
            {currentSignature && (
                <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-white/50 mb-2">Signature actuelle :</p>
                        <img
                            src={currentSignature}
                            alt="Current signature"
                            className="h-12 object-contain bg-white rounded px-2 py-1"
                        />
                    </div>
                    {onClear && (
                        <button
                            onClick={onClear}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition"
                            title="Supprimer la signature"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

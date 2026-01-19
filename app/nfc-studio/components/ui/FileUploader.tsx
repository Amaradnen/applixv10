"use client";

import React, { useRef, useState, DragEvent } from 'react';
import { Upload, X, Check, Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface FileUploaderProps {
    onUploadComplete: (url: string) => void;
    accept?: string;
    maxSize?: number; // in MB
    currentFile?: string;
    label?: string;
    className?: string;
}

export default function FileUploader({
    onUploadComplete,
    accept = "image/*",
    maxSize = 5,
    currentFile,
    label = "Upload File",
    className
}: FileUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(currentFile || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        setError(null);

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            setError(`File too large. Max ${maxSize}MB allowed.`);
            return;
        }

        // Create data URL and use it directly (no API upload needed)
        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            setPreview(dataUrl);
            onUploadComplete(dataUrl); // Use data URL directly
            setIsUploading(false);
        };
        reader.onerror = () => {
            setError('Failed to read file');
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleRemove = () => {
        setPreview(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        onUploadComplete(''); // Notify parent that file is removed
    };

    return (
        <div className={clsx("space-y-2", className)}>
            {label && (
                <label className="text-xs font-bold uppercase tracking-wider text-white/50">
                    {label}
                </label>
            )}

            <div
                className={clsx(
                    "relative border-2 border-dashed rounded-xl transition-all",
                    isDragging ? "border-gg-gold bg-gg-gold/10" : "border-white/20 hover:border-white/40",
                    isUploading && "opacity-50 pointer-events-none"
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {preview ? (
                    <div className="relative group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 rounded-xl">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                            >
                                <Upload size={16} className="text-white" />
                            </button>
                            <button
                                onClick={handleRemove}
                                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition"
                            >
                                <X size={16} className="text-white" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex flex-col items-center justify-center p-8 cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-8 h-8 text-gg-gold animate-spin mb-2" />
                                <p className="text-xs text-white/50">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 text-white/30 mb-2" />
                                <p className="text-xs text-white/50 mb-1">
                                    Drag & drop or click to upload
                                </p>
                                <p className="text-[10px] text-white/30">
                                    Max {maxSize}MB • PNG, JPG, WEBP, SVG
                                </p>
                            </>
                        )}
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileInput}
                    className="hidden"
                />
            </div>

            {error && (
                <div className="text-xs text-red-400 flex items-center gap-1">
                    <X size={12} />
                    {error}
                </div>
            )}
        </div>
    );
}

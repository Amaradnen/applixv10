"use client";

export default function NfcStudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-[#050505] text-white">
            {children}
        </main>
    );
}

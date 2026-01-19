"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/nfc-studio");

    if (isStudio) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="pt-28 pb-10 px-4 min-h-[calc(100vh-160px)]">{children}</main>
            <Footer />
        </>
    );
}

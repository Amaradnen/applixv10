"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStudioStore } from "../app/nfc-studio/store/useStudioStore";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/ai-app", label: "IA App (v2)" },
  { href: "/products", label: "Produits" },
  { href: "/academy", label: "Academy" },
  { href: "/nfc-studio", label: "NFC Studio" },
  { href: "/hub", label: "Hub" }
];

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, cart } = useStudioStore();

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/assets/logo.jpg" alt="APPLIX Logo" className="h-10 w-auto object-contain" />
          </Link>

          <div className="hidden xl:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
            {nav.map((i) => {
              const active = pathname === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={[
                    "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition",
                    active ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/10"
                  ].join(" ")}
                >
                  {i.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10 text-white">
              <button
                onClick={() => language !== 'fr' && toggleLanguage()}
                className={clsx(
                  "px-3 py-1 text-xs font-bold rounded-full transition",
                  language === 'fr' ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white"
                )}
              >
                FR
              </button>
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className={clsx(
                  "px-3 py-1 text-xs font-bold rounded-full transition",
                  language === 'en' ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white"
                )}
              >
                EN
              </button>
            </div>

            <Link
              href="/nfc-studio/cart"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold text-white transition-all"
            >
              <span>Panier</span>
              {cart && cart.items.length > 0 && (
                <span className="bg-gg-gold text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

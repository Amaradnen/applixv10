"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStudioStore } from "../app/nfc-studio/store/useStudioStore";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";

import { useTranslations } from 'next-intl';

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, cart } = useStudioStore();
  const t = useTranslations('nav');

  const nav = [
    { href: "/", label: t('home') },
    { href: "/studio", label: t('studio') },
    { href: "/ai-app", label: t('aiApp') },
    { href: "/products", label: t('products') },
    { href: "/academy", label: t('academy') },
    { href: "/nfc-studio", label: t('nfcStudio') },
    { href: "/hub", label: t('hub') }
  ];

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg bg-black border border-white/10">
              <img src="/assets/logo.jpg" alt="APPLIX Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-white text-xl tracking-tight">APPLIX</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-gold transition-colors">
                NFC Studio
              </span>
            </div>
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
              <span>{t('cart')}</span>
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

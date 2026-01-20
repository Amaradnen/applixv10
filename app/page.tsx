import Button from "@/components/ui/Button";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-6 mt-2 md:mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest text-white/70">
          <span className="w-2 h-2 rounded-full bg-gold"></span>
          SUITE 7-EN-1 • SANS LOGIN
        </div>

        <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight">
          L&apos;ÉCOSYSTÈME <span className="text-gold">GOLDEN GEMINI</span><br />
          POUR APPLIX
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Site vitrine + app IA + NFC Studio + profils publics + hub + academy. Tout dans le même style.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
          <Button href="/nfc-studio" className="px-8 py-4 rounded-full">Ouvrir APPLIX Studio</Button>
          <Button href="/ai-app" variant="ghost" className="px-8 py-4 rounded-full border-gold">
            Voir SAAS & Agents
          </Button>
        </div>
      </div>

      <div className="mt-14 max-w-7xl mx-auto px-2">
        <HoverEffect items={[
          { title: "1. Creative Studio", description: "Photos, Reels, Sites web, Ads, branding.", link: "/studio" },
          { title: "2. SAAS & Agents", description: "Interface app IA (version 2 préférée).", link: "/ai-app" },
          { title: "3. Produits Digitaux", description: "Ebooks, packs PLR, templates prêts.", link: "/products" },
          { title: "4. Academy", description: "Formations et masterclasses.", link: "/academy" },
          { title: "5. APPLIX STUDIO", description: "Builder carte + profil + lien public.", link: "/nfc-studio" },
          { title: "6. Hub Abonnements", description: "Zone hub (Netflix, Spotify, IA...).", link: "/hub" },
          { title: "7. PACKAGE IA", description: "App IA mobile (Golden Gemini) + chat + images.", link: "/ai-package" }
        ]} />
      </div>


    </div>
  );
}

import { ReactNode } from "react";
import MarketingNav from "@/components/marketing/MarketingNav";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import { I18NProvider } from "@/contexts/I18NContext";

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <I18NProvider>
            <div className="min-h-screen bg-velvet-black text-white">
                <MarketingNav />
                <main className="pt-20">{children}</main>
                <MarketingFooter />
            </div>
        </I18NProvider>
    );
}

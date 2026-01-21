
✅ Ce SKILL.md est propre, et **le script est valide** (pas de virgules finales).

> Ton script initial avait des erreurs JSON (virgules après le dernier élément dans `parts`, `contents`, `responseModalities`), donc ça peut casser.

---

## 2) “Paths” exacts pour templates (à donner à Antigravity)

### A) v0.dev (UI générée)
- v0.dev (home) : :contentReference[oaicite:0]{index=0}  
  👉 Antigravity doit utiliser v0 pour générer : **Landing sections / pricing / dashboards / onboarding**  
  **Prompt v0** → export en code → intégrer dans Next.

> v0 n’a pas un “marketplace URL unique” stable comme Vercel templates. La méthode pro : **prompt → generate → copy code**.

### B) Vercel Templates (projets complets)
- Templates marketplace : `https://vercel.com/templates` :contentReference[oaicite:1]{index=1}  
- Doc “Use a template” (workflow) : `https://vercel.com/docs/getting-started-with-vercel/template` :contentReference[oaicite:2]{index=2}  

**Paths utiles (filtrer)**
- Next.js templates : `https://vercel.com/templates?framework=next.js`
- SaaS templates : `https://vercel.com/templates?use-case=saas`
- E-commerce : `https://vercel.com/templates?use-case=ecommerce`
- Blog : `https://vercel.com/templates?use-case=blog`

### C) shadcn/ui (components + docs)
- Site officiel : `https://ui.shadcn.com/` :contentReference[oaicite:3]{index=3}  
- Docs components.json : `https://ui.shadcn.com/docs/components-json` :contentReference[oaicite:4]{index=4}  
- Registry Directory (pleins de registres) : `https://ui.shadcn.com/docs/directory` :contentReference[oaicite:5]{index=5}  

**Comment Antigravity doit l’utiliser**
- Base design system
- Installer composants via `npx shadcn@latest init` puis `npx shadcn@latest add ...`
- Ajouter des “blocks” via registries (directory)

### D) Aceternity UI (animations premium)
- Components + templates : `https://ui.aceternity.com/` :contentReference[oaicite:6]{index=6}  
- Pricing/licence info : `https://ui.aceternity.com/pricing` :contentReference[oaicite:7]{index=7}  

**Usage**
- Hero animations, cards, hover effects, background beams, etc.  
(Très bon pour “premium” + framer-motion.)

### E) shadcn.com (hub)
- `https://shadcn.com/` :contentReference[oaicite:8]{index=8}

---

## 3) Skill Antigravity : “template-scout” (optionnel mais très utile)
Si tu veux que l’agent fasse **la chasse aux templates** (au lieu de toi), crée un deuxième skill.

Fichier : `.agent/skills/template-scout/SKILL.md`

```md
---
name: template-scout
description: Find, shortlist, and integrate high-quality Next.js templates and UI blocks from Vercel Templates, shadcn/ui, and Aceternity UI for APPLIX pages (marketing + ecommerce + SaaS).
---

# Template Scout

## When to use
- When building new APPLIX sections: AI Package, Digital Products, SaaS Automation, Academy, Hub, Pricing.
- When needing landing sections, pricing tables, onboarding, admin tables, dashboards.

## Sources (official paths)
- Vercel Templates: https://vercel.com/templates
- Vercel template docs: https://vercel.com/docs/getting-started-with-vercel/template
- shadcn/ui: https://ui.shadcn.com/
- shadcn registries: https://ui.shadcn.com/docs/directory
- Aceternity UI: https://ui.aceternity.com/

## Process
1) Select target page type (marketing / ecommerce / dashboard / onboarding).
2) Pull 3–5 candidate templates/blocks from the sources above.
3) Choose 1 primary direction + 1 backup.
4) Integrate into Next.js App Router using shadcn tokens and consistent styling.
5) Ensure build passes: npm run build.

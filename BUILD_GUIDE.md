# APPLIX - Complete Build Guide

## 🎯 Project Status

### ✅ What's been built:
1. **Supabase Integration** - DB, Auth, Storage with full RLS
2. **n8n API Endpoints** - Job events, updates, artifacts with parse error handling
3. **Admin Panel** - Dashboard with KPIs, auth guards
4. **Shopping Cart** - Zustand store + cart page
5. **Checkout Flow** - Multi-step checkout + order success
6. **Marketing Foundation** - Home page, nav, footer, i18n (FR/EN)
7. **Competitor Research** - 5 comprehensive docs for all services

### 📋 What needs to be done:
1. Run Supabase migrations
2. Create first admin user
3. Build remaining admin pages (users, IA jobs, orders, templates, settings)
4. Build marketing service pages (digital-products, saas-automation, academy, hub, templates, pricing, contact)
5. Build case studies & blog
6. SEO optimization

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Already configured in `.env.local`:
- ✅ Supabase URL + Keys
- ✅ API Keys (Gemini, Nano Banana)
- ✅ GitHub & Vercel webhooks

**Add your n8n secret:**
```
N8N_WEBHOOK_SECRET=your-secret-here
```

### 3. Run Supabase Migrations

Go to Supabase Dashboard → SQL Editor and run these in order:

**Migration 1: Initial Schema**
```sql
-- Copy content from supabase/migrations/20260121000001_initial_schema.sql
```

**Migration 2: RLS Policies**
```sql
-- Copy content from supabase/migrations/20260121000002_rls_policies.sql
```

**Migration 3: Storage**
```sql
-- Copy content from supabase/migrations/20260121000003_storage.sql
```

### 4. Create First Admin User

1. Sign up via Supabase Auth UI or your app
2. Get your user ID from Supabase → Authentication → Users
3. Run in SQL Editor:

```sql
INSERT INTO profiles (id, role, full_name)
VALUES 
  ('your-user-id-here', 'admin', 'Your Name');
```

### 5. Run Dev Server
```bash
npm run dev
```

Visit:
- **Home**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- **Cart**: http://localhost:3000/cart
- **Dashboard (preserved)**: http://localhost:3000/app
- **NFC Studio (preserved)**: http://localhost:3000/nfc-studio

---

## 📁 Project Structure

```
applixv10-clean/
├── .env.local                    # Environment variables
├── app/
│   ├── (marketing)/              # Marketing pages with i18n
│   │   ├── layout.tsx            # Marketing nav + footer
│   │   ├── page.tsx              # Home page ✅
│   │   ├── cart/page.tsx         # Shopping cart ✅
│   │   ├── checkout/page.tsx     # Checkout flow ✅
│   │   ├── order/success/        # Order confirmation ✅
│   │   ├── services/             # TODO: Services hub
│   │   ├── digital-products/     # TODO: Product catalog
│   │   ├── saas-automation/      # TODO: Automation agents
│   │   ├── academy/              # TODO: Courses
│   │   ├── hub/                  # TODO: Membership
│   │   ├── templates/            # TODO: Templates
│   │   ├── pricing/              # TODO: Pricing
│   │   ├── contact/              # TODO: Contact
│   │   └── legal/                # TODO: Legal pages
│   ├── admin/                    # Admin panel with auth
│   │   ├── layout.tsx            # Admin sidebar ✅
│   │   ├── page.tsx              # Dashboard with KPIs ✅
│   │   ├── users/                # TODO: User management
│   │   ├── ia/jobs/              # TODO: IA jobs viewer
│   │   ├── orders/               # TODO: Orders management
│   │   ├── nfc/templates/        # TODO: NFC templates CRUD
│   │   └── settings/             # TODO: Settings
│   ├── api/
│   │   └── n8n/                  # n8n integration ✅
│   │       ├── job-event/        # Event logging
│   │       ├── job-update/       # Job updates + artifacts
│   │       └── jobs/             # Fetch pending jobs
│   ├── app/                      # ✅ PRESERVED - Dashboard
│   ├── nfc-studio/               # ✅ PRESERVED
│   ├── ai-package/               # ✅ PRESERVED
│   └── nfc/                      # ✅ PRESERVED
├── lib/
│   ├── supabase/                 # Supabase clients ✅
│   └── auth/                     # Auth helpers ✅
├── store/
│   └── cartStore.ts              # Zustand cart state ✅
├── supabase/
│   └── migrations/               # SQL migrations ✅
├── components/
│   └── marketing/                # Marketing components ✅
├── contexts/
│   └── I18NContext.tsx           # i18n provider ✅
├── dictionaries/                 # FR/EN translations ✅
└── docs/
    └── research/                 # Competitor research ✅
```

---

## 🔌 n8n Integration

### API Endpoints

**1. Log Event**
```bash
POST /api/n8n/job-event
Headers:
  Authorization: Bearer YOUR_N8N_WEBHOOK_SECRET
  Content-Type: application/json

Body:
{
  "job_id": "uuid",
  "event": "processing_started",
  "payload": {"step": 1}
}
```

**2. Update Job + Artifacts**
```bash
POST /api/n8n/job-update
Headers:
  Authorization: Bearer YOUR_N8N_WEBHOOK_SECRET
  Content-Type: application/json

Body:
{
  "job_id": "uuid",
  "status": "executed",
  "artifacts": [
    {
      "type": "cover_design",
      "raw": "{\"title\": \"My Book\"}",  # Raw Gemini response
      "json": {"title": "My Book"}       # Parsed JSON (if parse_ok)
    }
  ]
}
```

**3. Fetch Pending Jobs**
```bash
GET /api/n8n/jobs?interface=EBOOKS&status=approved&limit=10
```

### Parse Error Handling

The system handles Gemini responses that aren't valid JSON:

- `raw`: Always stores the raw text response
- `json`: Stores parsed JSON if valid
- `parse_ok`: Boolean flag indicating parse success

This solves the problem where Gemini sometimes returns explanatory text instead of JSON.

---

## 🛒 Shopping Cart Usage

### Add to Cart
```tsx
"use client";

import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();

  return (
    <button onClick={() => addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      type: product.type
    })}>
      Add to Cart
    </button>
  );
}
```

### Cart State
```tsx
const { 
  items,               // CartItem[]
  addItem,            // (item) => void
  removeItem,         // (id) => void
  updateQuantity,     // (id, qty) => void
  clearCart,          // () => void
  getTotalItems,      // () => number
  getTotalPrice       // () => number
} = useCartStore();
```

---

## 🔐 Admin Auth

All `/admin/*` routes are protected by the layout:

1. Checks if user is logged in
2. Verifies `role` in `profiles` table is `admin` or `staff`
3. Redirects to `/login` or `/` if unauthorized

**To manually check auth:**
```tsx
import { createClient } from '@/lib/supabase/server';

const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  redirect('/login');
}

const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

if (!['admin', 'staff'].includes(profile.role)) {
  redirect('/');
}
```

---

## 🌐 Internationalization (i18n)

### Usage
```tsx
"use client";

import { useI18N } from '@/contexts/I18NContext';

export default function MyComponent() {
  const { t, locale, setLocale } = useI18N();

  return (
    <div>
      <h1>{t.home.hero.title}</h1>
      <button onClick={() => setLocale('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

### Add Translations
Edit `dictionaries/fr.json` and `dictionaries/en.json`:

```json
{
  "my_page": {
    "title": "Mon Titre",
    "subtitle": "Mon Sous-Titre"
  }
}
```

---

## 📊 Database Schema

### Key Tables

**profiles**
- Links to `auth.users`
- `role`: admin | staff | user
- RLS: Users read/write own, admin/staff read all

**applix_jobs**
- n8n workflow jobs
- `parse_ok`: tracks JSON parse success
- RLS: admin/staff full access

**applix_job_artifacts**
- Stores job outputs
- `raw`: text response
- `json`: parsed JSON (if valid)
- `parse_ok`: boolean

**products**
- `type`: physical | digital
- RLS: Public read active, admin CRUD

**orders**
- `status`: pending | paid | shipped | refunded | cancelled
- RLS: Users read/create own, admin full access

**nfc_templates**
- `front_json`, `back_json`: Card designs
- RLS: Public read active, admin manage

**nfc_assets**
- User-uploaded files (logo, background, etc.)
- RLS: Users CRUD own, admin read all

---

## 🎨 Design System

### Color Tokens
```css
--gold: #E3B52E
--gold-light: #FFD700
--gold-dark: #D4AF37
--velvet-black: #0A0A0A
--velvet-gray: #1A1A1A
```

### Utility Classes
- `.glass` - Glass morphism effect
- `.glass-card` - Premium card style
- `.text-gold`, `.bg-gold`, `.bg-gold-light`
- `.gradient-gold` - Gold gradient
- `.animate-fade-in-up` - Fade animation

---

## ✅ Completion Checklist

### Phase 1: Foundation (COMPLETE ✅)
- [x] Supabase client/server modules
- [x] SQL migrations (schema, RLS, storage)
- [x] n8n API endpoints
- [x] Admin layout with auth
- [x] Cart store (Zustand)
- [x] i18n (FR/EN)
- [x] Marketing layout
- [x] Competitor research

### Phase 2: Core Pages (IN PROGRESS)
- [x] Home page
- [x] Cart page
- [x] Checkout page
- [x] Order success page
- [x] Admin dashboard
- [ ] Product catalog
- [ ] Services hub
- [ ] Service detail pages (5)
- [ ] Pricing page
- [ ] Contact page

### Phase 3: Admin CRUD (TODO)
- [ ] Users management
- [ ] IA Jobs viewer
- [ ] Orders management
- [ ] NFC Templates CRUD
- [ ] Settings page

### Phase 4: Content (TODO)
- [ ] Case studies
- [ ] Blog
- [ ] Legal pages

### Phase 5: Polish (TODO)
- [ ] SEO meta tags
- [ ] OG images
- [ ] Sitemap.xml
- [ ] Performance optimization
- [ ] Final testing

---

## 🚨 Important Notes

### Preserved Routes
These routes are **NOT modified** and remain functional:
- ✅ `/app` - Dashboard
- ✅ `/nfc-studio` - NFC Studio
- ✅ `/ai-package` - AI Package
- ✅ `/nfc` - NFC page

### Build Status
```bash
npm run build
```
Should pass with no errors. If errors occur, they're likely:
1. Missing Supabase env vars
2. TypeScript errors in new pages
3. Missing components

---

## 📖 Next Steps (Priority Order)

1. **Run migrations** in Supabase dashboard
2. **Create admin user** in profiles table
3. **Test admin panel** - verify auth works
4. **Build product catalog** at `/digital-products`
5. **Build services pages** following competitor research
6. **Build remaining admin pages** (users, jobs, orders)
7. **Add SEO** to all pages
8. **Final testing** - checkout flow, n8n integration

---

## 🆘 Troubleshooting

### "Supabase client error"
- Check `.env.local` has correct URL and keys
- Restart dev server after env changes

### "Build fails"
- Run `npm install` to ensure all dependencies
- Check for TypeScript errors
- Verify all imports are correct

### "Auth doesn't work"
- Verify migrations ran successfully
- Check user exists in `auth.users`
- Verify profile exists in `profiles` table with correct role

### "Cart not persisting"
- Check browser localStorage
- Clear cache/localStorage and try again

---

## 📞 Support

For questions about:
- **Database**: Check Supabase dashboard logs
- **n8n**: Test with curl commands above
- **Build errors**: Check console for specific errors

---

**Built with:** Next.js 15, TypeScript, Tailwind CSS, Supabase, Zustand, shadcn/ui

**Last Updated:** January 21, 2026

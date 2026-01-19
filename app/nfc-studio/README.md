# NFC Studio Pro

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/nfc-studio`

## 📁 Routes

- `/nfc-studio` - Card Design (Step 1)
- `/nfc-studio/profile` - Digital Profile (Step 2)  
- `/nfc-studio/checkout` - Checkout (Step 3)
- `/nfc-studio/cart` - Shopping Cart

## 🏗️ Architecture

### State Management
- **Zustand Store**: `app/nfc-studio/store/useStudioStore.ts`
- **Persistence**: localStorage (`nfc-studio-storage`)
- **Sections**: 
  - `cardFront` / `cardBack` - Card design state
  - `profile` - Digital profile state
  - `cart` - Shopping cart
  - `checkout` - Checkout flow

### File Structure
```
app/nfc-studio/
├── components/
│   ├── controls/
│   │   ├── DesignControls.tsx
│   │   ├── ProfileControls.tsx
│   │   ├── OrderSummary.tsx
│   │   └── SignaturePad.tsx
│   ├── preview/
│   │   ├── Card3D.tsx
│   │   └── MobilePreview.tsx
│   └── ui/
│       └── FileUploader.tsx
├── store/
│   └── useStudioStore.ts
├── constants/
│   └── templates.ts
└── context/
    └── StudioContext.tsx (legacy)
```

## 📤 Upload Storage

### Development (Local)
- Files saved to: `/public/uploads/`
- Max size: 5MB
- Allowed types: PNG, JPG, WEBP, SVG

### Production (Vercel Blob)
To enable Vercel Blob storage:
1. Install: `npm install @vercel/blob`
2. Update `/api/upload/route.ts`:
```typescript
import { put } from '@vercel/blob';

const blob = await put(filename, file, { 
  access: 'public' 
});
return NextResponse.json({ url: blob.url });
```

## 💳 Payment Demo

### Mock Stripe Integration
- **Create Payment Intent**: `/api/create-payment-intent`
- **Webhook**: `/api/webhook/stripe`

Both endpoints are currently stubs returning mock data.

### To Enable Real Stripe:
1. Install: `npm install stripe`
2. Add env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
3. Update routes with real Stripe SDK calls

## 🎨 Templates

### Card Templates (20+)
- Metal Black: Minimal, Bold, Signature, Corner, Chip Focus
- Metal Gold: Luxury, Monogram, Centered, Modern
- Metal Silver: Professional, Geometric, Classic
- Bamboo: Eco, Nature
- Carbon Fiber: Speed, Tech
- PVC: Light, Dark
- Special: QR Focus, Logo Top, Kiki

### Profile Templates (10+)
- Business, Creator, Real Estate, Clinic
- Restaurant, Portfolio, VIP, Mini Website
- Event, Agency

## 🛠️ Features

### Card Editor
- ✅ Direct on-card editing
- ✅ Recto/Verso flip
- ✅ Material selection (metal, PVC, wood, carbon)
- ✅ Template library (20+ options)
- ✅ Logo upload
- ✅ Background upload
- ✅ Signature pad (draw/upload)
- ✅ QR code generation

### Profile Builder
- ✅ Avatar & cover upload
- ✅ Links manager (add/remove/reorder)
- ✅ Theme switcher
- ✅ Template library (10+ options)

### Checkout
- ✅ Customer information
- ✅ Shipping methods (Standard/Express/Pickup)
- ✅ Payment methods (Card/COD/Crypto)
- ✅ Promo codes
- ✅ Order summary

## 🐛 Troubleshooting

### Hydration Errors
All hydration issues have been fixed:
- ❌ No `Math.random()` in render
- ❌ No `Date.now()` in render
- ✅ Client-side only logic in `useEffect`

### Build Errors
```bash
npm run build
```
Should pass with 0 errors.

### Upload Issues
Check that `/public/uploads/` directory exists and is writable.

## 📝 Development Notes

- **No iframes**: All components are native Next.js
- **Client Components**: Use `"use client"` directive where needed
- **Stable IDs**: Use `useRef` counters, not `Date.now()`
- **Premium UI**: Dark theme + gold accents + glassmorphism

## 🚢 Deployment (Vercel)

1. Set root directory: `applixv10-clean`
2. Environment variables (if using real Stripe/Blob):
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
3. Deploy: `vercel --prod`

## 📚 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **State**: Zustand + localStorage
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Signature**: react-signature-canvas
- **QR Code**: react-qr-code
- **Upload**: Native File API + Next.js Route Handlers

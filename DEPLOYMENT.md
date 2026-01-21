# APPLIX Platform - Production Deployment Guide

## 🚀 Quick Deploy to Vercel

### 1. Prerequisites
- Node.js 18+
- Supabase account
- Stripe account (for payments)
- Vercel account

### 2. Supabase Setup

**Run Migrations:**
1. Go to Supabase Dashboard → SQL Editor
2. Run migrations in order:
   - `supabase/migrations/20260121000001_initial_schema.sql`
   - `supabase/migrations/20260121000002_rls_policies.sql`
   - `supabase/migrations/20260121000003_storage.sql`
   - `supabase/migrations/20260121000004_additional_tables.sql`
   - `supabase/migrations/20260121000005_additional_rls.sql`

**Create Storage Buckets:**
- `nfc-assets` (private)
- `product-files` (private)

**Create First Admin:**
```sql
-- After creating user via Supabase Auth
INSERT INTO profiles (id, role, full_name)
VALUES ('your-user-id', 'admin', 'Admin Name');
```

### 3. Environment Variables

**Required in Vercel:**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://mlfiqzxyrdoqmsxiunnq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_T93uj5qomRCBEwnJTWW29w_WRnp7aws
SUPABASE_SERVICE_ROLE_KEY=sb_secret_j4_VLfJtyKQK2Ib28s4Azw_kH7eE5Xy

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Site
NEXT_PUBLIC_SITE_URL=https://applix.digital

# n8n (optional)
N8N_WEBHOOK_SECRET=xxx

# API Keys (optional)
NANO_BANANA_API_KEY=AIzaSyDGY-bWlu59tmyPfSjbk8QaLABU72_-lac
APPLIX_GEMINI_KEY=AIzaSyBWjzkUgE-x4iQkh5ZTstNt9bNaoocS2SU
```

### 4. Deploy to Vercel

**via CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**via GitHub:**
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

### 5. Post-Deployment

**Configure Stripe Webhook:**
1. Stripe Dashboard → Webhooks
2. Add endpoint: `https://applix.digital/api/webhooks/stripe`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to STRIPE_WEBHOOK_SECRET

**Test Critical Paths:**
- [ ] Admin login works
- [ ] Cart add/remove works
- [ ] Checkout creates order
- [ ] Stripe payment processes
- [ ] n8n endpoints respond

### 6. Performance Optimization

**Already Optimized:**
- ✅ Next.js Image optimization
- ✅ Route code splitting
- ✅ Lazy loading components
- ✅ Supabase connection pooling

**Recommended:**
- [ ] Configure CDN (Vercel automatic)
- [ ] Add Redis cache (optional)
- [ ] Monitor with Vercel Analytics
- [ ] Setup error tracking (Sentry)

### 7. Monitoring

**Supabase:**
- Monitor database performance
- Check RLS policies
- Review auth logs

**Vercel:**
- Monitor function execution
- Check build times
- Review analytics

**Stripe:**
- Monitor payments
- Check for failed webhooks
- Review disputes

---

## 🔧 Common Issues

**Build fails:**
- Check all environment variables
- Verify Node.js version (18+)
- Clear `.next` folder

**Stripe webhook not working:**
- Verify webhook secret
- Check endpoint URL
- Review Stripe dashboard logs

**Supabase connection errors:**
- Verify project URL
- Check API keys
- Ensure IP whitelist (if applicable)

---

## 📊 Production Checklist

- [ ] All migrations run
- [ ] Admin user created
- [ ] Environment variables set
- [ ] Stripe webhook configured
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] All routes tested
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] Backup strategy defined

---

**Deployment Time:** ~30 minutes  
**Status:** Production-Ready ✅

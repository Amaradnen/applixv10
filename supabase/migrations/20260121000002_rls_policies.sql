-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applix_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applix_job_artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applix_job_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfc_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfc_assets ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin or staff
CREATE OR REPLACE FUNCTION public.is_admin_or_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin/staff can view all profiles"
  ON public.profiles FOR SELECT
  USING (is_admin_or_staff());

-- APPLIX Jobs policies
CREATE POLICY "Admin/staff can view all jobs"
  ON public.applix_jobs FOR SELECT
  USING (is_admin_or_staff());

CREATE POLICY "Admin/staff can insert jobs"
  ON public.applix_jobs FOR INSERT
  WITH CHECK (is_admin_or_staff());

CREATE POLICY "Admin/staff can update jobs"
  ON public.applix_jobs FOR UPDATE
  USING (is_admin_or_staff());

CREATE POLICY "Users can view own jobs"
  ON public.applix_jobs FOR SELECT
  USING (auth.uid() = owner_id);

-- APPLIX Job Artifacts policies
CREATE POLICY "Admin/staff can view all artifacts"
  ON public.applix_job_artifacts FOR SELECT
  USING (is_admin_or_staff());

CREATE POLICY "Admin/staff can insert artifacts"
  ON public.applix_job_artifacts FOR INSERT
  WITH CHECK (is_admin_or_staff());

-- APPLIX Job Events policies
CREATE POLICY "Admin/staff can view all events"
  ON public.applix_job_events FOR SELECT
  USING (is_admin_or_staff());

CREATE POLICY "Admin/staff can insert events"
  ON public.applix_job_events FOR INSERT
  WITH CHECK (is_admin_or_staff());

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (active = true);

CREATE POLICY "Admin/staff can view all products"
  ON public.products FOR SELECT
  USING (is_admin_or_staff());

CREATE POLICY "Admin/staff can insert products"
  ON public.products FOR INSERT
  WITH CHECK (is_admin_or_staff());

CREATE POLICY "Admin/staff can update products"
  ON public.products FOR UPDATE
  USING (is_admin_or_staff());

CREATE POLICY "Admin/staff can delete products"
  ON public.products FOR DELETE
  USING (is_admin_or_staff());

-- Orders policies
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin/staff can view all orders"
  ON public.orders FOR SELECT
  USING (is_admin_or_staff());

CREATE POLICY "Admin/staff can update orders"
  ON public.orders FOR UPDATE
  USING (is_admin_or_staff());

-- Order Items policies
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own order items"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin/staff can view all order items"
  ON public.order_items FOR SELECT
  USING (is_admin_or_staff());

-- NFC Templates policies
CREATE POLICY "Anyone can view active templates"
  ON public.nfc_templates FOR SELECT
  USING (active = true);

CREATE POLICY "Admin/staff can manage all templates"
  ON public.nfc_templates FOR ALL
  USING (is_admin_or_staff());

-- NFC Assets policies
CREATE POLICY "Users can view own assets"
  ON public.nfc_assets FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert own assets"
  ON public.nfc_assets FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete own assets"
  ON public.nfc_assets FOR DELETE
  USING (auth.uid() = owner_id);

CREATE POLICY "Admin/staff can view all assets"
  ON public.nfc_assets FOR SELECT
  USING (is_admin_or_staff());

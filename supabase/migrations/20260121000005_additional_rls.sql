-- RLS for additional tables

-- Plans policies (public read active, admin write)
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active plans"
  ON public.plans FOR SELECT
  USING (active = true);

CREATE POLICY "Admin/staff can manage plans"
  ON public.plans FOR ALL
  USING (is_admin_or_staff());

-- Workflow Jobs policies (admin only)
ALTER TABLE public.workflow_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin/staff can view workflow jobs"
  ON public.workflow_jobs FOR SELECT
  USING (is_admin_or_staff());

CREATE POLICY "Admin/staff can manage workflow jobs"
  ON public.workflow_jobs FOR ALL
  USING (is_admin_or_staff());

-- NFC Designs policies (users own, admin all)
ALTER TABLE public.nfc_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own designs"
  ON public.nfc_designs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own designs"
  ON public.nfc_designs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own designs"
  ON public.nfc_designs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own designs"
  ON public.nfc_designs FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admin/staff can view all designs"
  ON public.nfc_designs FOR SELECT
  USING (is_admin_or_staff());

-- AI Messages policies (users own, admin all)
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
  ON public.ai_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own messages"
  ON public.ai_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin/staff can view all messages"
  ON public.ai_messages FOR SELECT
  USING (is_admin_or_staff());

-- Subscriptions policies (users own, admin all)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin/staff can view all subscriptions"
  ON public.subscriptions FOR SELECT
  USING (is_admin_or_staff());

CREATE POLICY "Admin/staff can manage subscriptions"
  ON public.subscriptions FOR ALL
  USING (is_admin_or_staff());

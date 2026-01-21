-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('nfc-assets', 'nfc-assets', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('product-files', 'product-files', false);

-- Storage policies for nfc-assets bucket
CREATE POLICY "Users can upload own nfc assets"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'nfc-assets' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own nfc assets"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'nfc-assets' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own nfc assets"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'nfc-assets' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admin can manage all nfc assets"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'nfc-assets' AND
    public.is_admin_or_staff()
  );

-- Storage policies for product-files bucket
CREATE POLICY "Admin can manage product files"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'product-files' AND
    public.is_admin_or_staff()
  );

CREATE POLICY "Anyone can view product files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-files');

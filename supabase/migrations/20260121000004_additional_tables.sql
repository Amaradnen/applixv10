-- Additional tables for full APPLIX platform

-- Plans table
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  billing_period TEXT DEFAULT 'monthly', -- monthly, yearly
  features JSONB,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflow Jobs table
CREATE TABLE public.workflow_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id TEXT,
  execution_id TEXT,
  workflow_name TEXT,
  status TEXT DEFAULT 'running',
  started_at TIMESTAMP WITH TIME ZONE,
  finished_at TIMESTAMP WITH TIME ZONE,
  error TEXT,
  input_data JSONB,
  output_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NFC Designs table
CREATE TABLE public.nfc_designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  recto_json JSONB NOT NULL,
  verso_json JSONB NOT NULL,
  signature_json JSONB,
  qr_enabled BOOLEAN DEFAULT true,
  qr_position TEXT DEFAULT 'verso', -- recto, verso
  is_ai_generated BOOLEAN DEFAULT false,
  template_id UUID REFERENCES public.nfc_templates(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Messages table
CREATE TABLE public.ai_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID,
  role TEXT NOT NULL, -- user, assistant, system
  content TEXT NOT NULL,
  model TEXT,
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.plans(id),
  status TEXT DEFAULT 'active', -- active, cancelled, expired
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_plans_active ON public.plans(active);
CREATE INDEX idx_workflow_jobs_status ON public.workflow_jobs(status);
CREATE INDEX idx_workflow_jobs_workflow_id ON public.workflow_jobs(workflow_id);
CREATE INDEX idx_nfc_designs_user_id ON public.nfc_designs(user_id);
CREATE INDEX idx_ai_messages_user_id ON public.ai_messages(user_id);
CREATE INDEX idx_ai_messages_conversation_id ON public.ai_messages(conversation_id);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Triggers
CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON public.plans FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_nfc_designs_updated_at BEFORE UPDATE ON public.nfc_designs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

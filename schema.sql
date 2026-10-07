-- =========================================================================
-- LeadPilot AI - Production Relational Database Schema (PostgreSQL / Supabase)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Organizations (Multi-tenant SaaS)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100) DEFAULT 'agency',
    country VARCHAR(100) DEFAULT 'United Kingdom',
    target_countries TEXT[] DEFAULT ARRAY['United Kingdom'],
    target_industries TEXT[] DEFAULT ARRAY['Roofing', 'Construction', 'Real Estate', 'Dental Clinics'],
    ideal_customer_profile TEXT,
    services_offered TEXT[] DEFAULT ARRAY['Web design', 'Google Ads', 'SEO', 'AI WhatsApp automation'],
    preferred_language VARCHAR(50) DEFAULT 'English',
    monthly_lead_target INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Users & Profiles
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'owner', -- 'owner', 'admin', 'member'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

-- 3. Pipeline Stages
CREATE TABLE pipeline_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    key VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL,
    display_order INTEGER NOT NULL,
    color VARCHAR(50) DEFAULT '#ea580c',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, key)
);

-- 4. Leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT,
    website VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    google_rating NUMERIC(3, 2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    
    -- Scoring metrics (0-100)
    lead_score INTEGER DEFAULT 50,
    website_score INTEGER DEFAULT 50,
    digital_presence_score INTEGER DEFAULT 50,
    opportunity_level VARCHAR(20) DEFAULT 'MEDIUM', -- 'HIGH', 'MEDIUM', 'LOW'
    
    -- Feature flags
    has_whatsapp BOOLEAN DEFAULT false,
    has_email BOOLEAN DEFAULT false,
    has_social BOOLEAN DEFAULT false,
    
    -- Pipeline & CRM state
    pipeline_stage VARCHAR(50) DEFAULT 'NEW',
    estimated_value NUMERIC(10, 2) DEFAULT 1500.00,
    notes TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Outreach tracking
    last_contacted_at TIMESTAMPTZ,
    next_follow_up TIMESTAMPTZ,
    follow_up_count INTEGER DEFAULT 0,
    
    -- Metadata
    is_demo BOOLEAN DEFAULT false,
    source VARCHAR(100) DEFAULT 'discovery',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning-fast lead search & filtering
CREATE INDEX idx_leads_org_id ON leads(organization_id);
CREATE INDEX idx_leads_stage ON leads(organization_id, pipeline_stage);
CREATE INDEX idx_leads_score ON leads(organization_id, lead_score DESC);
CREATE INDEX idx_leads_industry ON leads(organization_id, industry);
CREATE INDEX idx_leads_country_city ON leads(organization_id, country, city);

-- 5. Lead Analysis (Website & Digital Presence Audit)
CREATE TABLE lead_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    website_score INTEGER NOT NULL,
    mobile_score INTEGER NOT NULL,
    page_speed_score INTEGER NOT NULL,
    seo_score INTEGER NOT NULL,
    
    strengths TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    weaknesses TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    missed_opportunities TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    recommended_improvements TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    recommended_offer TEXT NOT NULL,
    
    trust_signals JSONB DEFAULT '{}'::jsonb,
    cta_analysis TEXT,
    whatsapp_status VARCHAR(100),
    tech_stack TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    raw_ai_summary TEXT,
    analyzed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analysis_lead_id ON lead_analysis(lead_id);

-- 6. Outreach Messages
CREATE TABLE outreach_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    channel VARCHAR(50) NOT NULL, -- 'email', 'linkedin', 'whatsapp'
    tone VARCHAR(50) DEFAULT 'consultative',
    language VARCHAR(50) DEFAULT 'English',
    subject VARCHAR(255),
    body TEXT NOT NULL,
    service_highlighted VARCHAR(255),
    call_to_action TEXT,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'ready', 'sent'
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Follow Ups
CREATE TABLE follow_ups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    channel VARCHAR(50) DEFAULT 'email',
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'canceled'
    notes TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Activity Log
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    activity_type VARCHAR(100) NOT NULL, -- 'lead_created', 'lead_analyzed', 'message_generated', 'message_sent', 'stage_updated', 'follow_up_scheduled', 'deal_won'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Subscriptions & Usage Limits
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    plan VARCHAR(50) DEFAULT 'free', -- 'free', 'starter', 'pro', 'agency'
    status VARCHAR(50) DEFAULT 'active',
    leads_limit INTEGER DEFAULT 25,
    leads_used_this_month INTEGER DEFAULT 0,
    ai_analyses_limit INTEGER DEFAULT 50,
    ai_analyses_used INTEGER DEFAULT 0,
    billing_period_start TIMESTAMPTZ DEFAULT NOW(),
    billing_period_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row-Level Security (RLS) setup for multi-tenancy
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

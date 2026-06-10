-- PAWLUXURY SCHEMA ADDITIONS FOR MULTI-BRANCH SUPPORT

-- 1. Create Branches Table
CREATE TABLE IF NOT EXISTS public.branches (
    id text PRIMARY KEY, -- 'garden-area', 'police-chowki', 'buddy-kitty', 'wholesale', 'petstep'
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    type text NOT NULL CHECK (type IN ('retail', 'hospital', 'wholesale', 'distribution')),
    address text NOT NULL,
    phone text NOT NULL,
    whatsapp_number text NOT NULL,
    upi_id text NOT NULL,
    bank_name text NOT NULL,
    account_number text NOT NULL,
    ifsc_code text NOT NULL,
    account_name text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Branch Inventory Table (Master product catalog mappings)
CREATE TABLE IF NOT EXISTS public.branch_inventory (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_id text REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
    product_id text REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
    price numeric(10,2), -- Branch specific price (NULL means use master product table price)
    is_featured boolean DEFAULT false NOT NULL,
    is_bestseller boolean DEFAULT false NOT NULL,
    is_available boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(branch_id, product_id)
);

-- 3. Create Branch Managers Table (Profile to Branch mappings)
CREATE TABLE IF NOT EXISTS public.branch_managers (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    branch_id text REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, branch_id)
);

-- 4. Alter Orders & Consultations to support branch mappings
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS branch_id text REFERENCES public.branches(id) ON DELETE SET NULL;
ALTER TABLE public.consultations ADD COLUMN IF NOT EXISTS branch_id text REFERENCES public.branches(id) ON DELETE SET NULL;

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branch_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branch_managers ENABLE ROW LEVEL SECURITY;

-- 6. Add RLS Policies
-- Branches Policies
CREATE POLICY "Allow public read of branches" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Allow admins full access to branches" ON public.branches FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Branch Inventory Policies
CREATE POLICY "Allow public read of branch_inventory" ON public.branch_inventory FOR SELECT USING (true);
CREATE POLICY "Allow admins full access to branch_inventory" ON public.branch_inventory FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);
CREATE POLICY "Allow branch managers to update their own branch_inventory" ON public.branch_inventory FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.branch_managers bm 
        WHERE bm.user_id = auth.uid() AND bm.branch_id = branch_inventory.branch_id
    )
);

-- Branch Managers Policies
CREATE POLICY "Allow branch managers to view their own links" ON public.branch_managers FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Allow admins full access to branch_managers" ON public.branch_managers FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- Orders isolation policy for branch managers
CREATE POLICY "Allow branch managers to view their own branch orders" ON public.orders FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.branch_managers bm 
        WHERE bm.user_id = auth.uid() AND bm.branch_id = orders.branch_id
    )
);
CREATE POLICY "Allow branch managers to update their own branch orders" ON public.orders FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.branch_managers bm 
        WHERE bm.user_id = auth.uid() AND bm.branch_id = orders.branch_id
    )
);

-- Consultations isolation policy for hospital branch managers
CREATE POLICY "Allow hospital managers to view consultations" ON public.consultations FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.branch_managers bm 
        WHERE bm.user_id = auth.uid() AND bm.branch_id = consultations.branch_id
    )
);
CREATE POLICY "Allow hospital managers to update consultations" ON public.consultations FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.branch_managers bm 
        WHERE bm.user_id = auth.uid() AND bm.branch_id = consultations.branch_id
    )
);

-- 7. Performance Optimization Indexes
CREATE INDEX IF NOT EXISTS idx_branch_inventory_branch ON public.branch_inventory(branch_id);
CREATE INDEX IF NOT EXISTS idx_branch_inventory_product ON public.branch_inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_branch_managers_user ON public.branch_managers(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_branch ON public.orders(branch_id);
CREATE INDEX IF NOT EXISTS idx_consultations_branch ON public.consultations(branch_id);

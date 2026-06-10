-- PAWLUXURY PREMIUM ECOSYSTEM PLATFORM SCHEMA
-- Production-grade PostgreSQL database schema for Supabase

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (extends Supabase auth.users)
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text not null,
    full_name text,
    role text not null default 'customer' check (role in ('customer', 'admin', 'staff', 'vet_staff')),
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. ADMINS
create table public.admins (
    id uuid primary key default uuid_generate_v4(),
    username text not null unique,
    email text not null unique,
    active boolean default true not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. STAFF
create table public.staff (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    email text not null unique,
    role text not null check (role in ('veterinarian', 'apothecary_staff', 'support')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. CATEGORIES
create table public.categories (
    id text primary key, -- cat-1, cat-2 etc
    name text not null,
    slug text not null unique,
    description text,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. PRODUCTS
create table public.products (
    id text primary key, -- prod-1, prod-2 etc
    name text not null,
    slug text not null unique,
    description text not null,
    price numeric(10,2) not null,
    sale_price numeric(10,2),
    stock integer not null default 0,
    category_id text references public.categories(id) on delete set null,
    is_featured boolean default false not null,
    rating numeric(2,1) default 5.0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. PRODUCT IMAGES
create table public.product_images (
    id uuid primary key default uuid_generate_v4(),
    product_id text references public.products(id) on delete cascade not null,
    image_url text not null,
    display_order integer default 0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. ADDRESSES
create table public.addresses (
    id text primary key, -- addr-1 etc
    user_id uuid references public.profiles(id) on delete cascade not null,
    full_name text not null,
    phone text not null,
    address_line1 text not null,
    address_line2 text,
    city text not null,
    state text not null,
    postal_code text not null,
    country text not null default 'India',
    is_default boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. ORDERS
create table public.orders (
    id text primary key, -- order-1 etc
    user_id uuid references public.profiles(id) on delete set null,
    user_email text not null,
    status text not null default 'payment_pending' check (status in ('payment_pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_amount numeric(12,2) not null,
    shipping_address jsonb not null,
    payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'pending_verification', 'paid', 'failed')),
    tracking_number text,
    order_notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. ORDER ITEMS
create table public.order_items (
    id text primary key, -- item-1 etc
    order_id text references public.orders(id) on delete cascade not null,
    product_id text references public.products(id) on delete set null,
    product_name text not null,
    product_image text,
    quantity integer not null check (quantity > 0),
    price numeric(10,2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. PAYMENT PROOFS
create table public.payment_proofs (
    id text primary key, -- proof-1 etc
    order_id text references public.orders(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    screenshot_url text not null,
    transaction_id text not null,
    verified_by uuid, -- admin or staff identifier
    verification_notes text,
    verified_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. CONSULTATIONS
create table public.consultations (
    id text primary key, -- cons-1 etc
    user_id uuid references public.profiles(id) on delete set null,
    user_email text not null,
    pet_name text not null,
    pet_type text not null,
    pet_age text not null,
    symptoms text not null,
    status text not null default 'pending' check (status in ('pending', 'scheduled', 'completed', 'cancelled')),
    scheduled_at timestamp with time zone,
    doctor_notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. CONSULTATION SLOTS
create table public.consultation_slots (
    id uuid primary key default uuid_generate_v4(),
    slot_time timestamp with time zone not null,
    is_booked boolean default false not null,
    booked_by uuid references public.profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. WISHLIST
create table public.wishlist (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    product_id text references public.products(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, product_id)
);

-- 14. CART ITEMS
create table public.cart_items (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    product_id text references public.products(id) on delete cascade not null,
    quantity integer not null check (quantity > 0),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, product_id)
);

-- 15. BLOGS
create table public.blogs (
    id text primary key, -- blog-1 etc
    title text not null,
    slug text not null unique,
    content text not null,
    summary text,
    featured_image text,
    author_id text not null,
    author_name text,
    is_published boolean default false not null,
    published_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 16. REVIEWS
create table public.reviews (
    id text primary key, -- rev-1 etc
    product_id text references public.products(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    user_full_name text not null,
    rating integer not null check (rating >= 1 and rating <= 5),
    comment text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 17. BANNERS
create table public.banners (
    id text primary key, -- banner-1 etc
    title text,
    subtitle text,
    image_url text not null,
    link_url text,
    is_active boolean default true not null,
    display_order integer default 0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 18. NOTIFICATIONS
create table public.notifications (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles(id) on delete cascade not null,
    title text not null,
    message text not null,
    is_read boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 19. ACTIVITY LOGS
create table public.activity_logs (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid, -- Reference public.profiles(id) or public.admins(id) or NULL for system
    action text not null, -- e.g. "Stock Updated", "Payment Approved"
    target text not null, -- e.g. "product:prod-1", "order:order-12"
    details text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 20. INVENTORY LOGS
create table public.inventory_logs (
    id uuid primary key default uuid_generate_v4(),
    product_id text references public.products(id) on delete cascade not null,
    change_amount integer not null, -- positive for restock, negative for sale
    reason text not null, -- "Restocked from vendor", "Customer Purchase"
    updated_by uuid, -- public.profiles(id) for administrators
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- ==================================================
-- INDEXES & PERFORMANCE OPTIMIZATION
-- ==================================================
create index idx_products_category on public.products(category_id);
create index idx_products_slug on public.products(slug);
create index idx_orders_user on public.orders(user_id);
create index idx_order_items_order on public.order_items(order_id);
create index idx_payment_proofs_order on public.payment_proofs(order_id);
create index idx_consultations_user on public.consultations(user_id);
create index idx_wishlist_user on public.wishlist(user_id);
create index idx_cart_items_user on public.cart_items(user_id);
create index idx_reviews_product on public.reviews(product_id);
create index idx_blogs_slug on public.blogs(slug);


-- ==================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==================================================

-- Enable RLS on core user-facing tables
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payment_proofs enable row level security;
alter table public.consultations enable row level security;
alter table public.wishlist enable row level security;
alter table public.cart_items enable row level security;
alter table public.notifications enable row level security;

-- PROFILES Policies
create policy "Allow public read of profiles" on public.profiles for select using (true);
create policy "Allow users to update their own profile" on public.profiles for update using (auth.uid() = id);

-- ADDRESSES Policies
create policy "Allow users to view their own addresses" on public.addresses for select using (auth.uid() = user_id);
create policy "Allow users to insert their own addresses" on public.addresses for insert with check (auth.uid() = user_id);
create policy "Allow users to update their own addresses" on public.addresses for update using (auth.uid() = user_id);
create policy "Allow users to delete their own addresses" on public.addresses for delete using (auth.uid() = user_id);

-- ORDERS Policies
create policy "Allow users to view their own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Allow users to insert their own orders" on public.orders for insert with check (auth.uid() = user_id);

-- ORDER ITEMS Policies
create policy "Allow users to view their own order items" on public.order_items for select using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);

-- PAYMENT PROOFS Policies
create policy "Allow users to view their own payment proofs" on public.payment_proofs for select using (auth.uid() = user_id);
create policy "Allow users to upload payment proofs for their orders" on public.payment_proofs for insert with check (auth.uid() = user_id);

-- CONSULTATIONS Policies
create policy "Allow users to view their own consultations" on public.consultations for select using (auth.uid() = user_id);
create policy "Allow users to request consultations" on public.consultations for insert with check (auth.uid() = user_id);

-- WISHLIST Policies
create policy "Allow users to view their own wishlist" on public.wishlist for select using (auth.uid() = user_id);
create policy "Allow users to edit their own wishlist" on public.wishlist for all using (auth.uid() = user_id);

-- CART ITEMS Policies
create policy "Allow users to view their own cart items" on public.cart_items for select using (auth.uid() = user_id);
create policy "Allow users to edit their own cart items" on public.cart_items for all using (auth.uid() = user_id);

-- NOTIFICATIONS Policies
create policy "Allow users to view their own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Allow users to edit their own notifications" on public.notifications for all using (auth.uid() = user_id);

-- ADMIN global overrides (Admins bypass RLS restrictions)
-- In Supabase, this is typically handled by granting full access to roles with bypassRLS or creating specific admin policies.
create policy "Allow admins complete select on orders" on public.orders for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "Allow admins complete update on orders" on public.orders for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "Allow admins complete access on payment proofs" on public.payment_proofs for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "Allow admins complete access on consultations" on public.consultations for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "Allow admins complete access on activity logs" on public.activity_logs for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "Allow admins complete access on inventory logs" on public.inventory_logs for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- 21. SETTINGS Table Definition
create table public.settings (
    id integer primary key default 1,
    whatsapp_number text not null default '+919876543210',
    low_stock_threshold integer not null default 10,
    bank_name text not null default 'HDFC Bank Ltd',
    account_number text not null default '50200062391032',
    ifsc_code text not null default 'HDFC0000104',
    account_name text not null default 'PawLuxury Private Limited',
    upi_id text not null default 'pawluxury@ybl',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint singleton_row check (id = 1)
);

-- Enable RLS on other tables
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.product_images enable row level security;
alter table public.blogs enable row level security;
alter table public.banners enable row level security;
alter table public.reviews enable row level security;
alter table public.activity_logs enable row level security;
alter table public.inventory_logs enable row level security;
alter table public.settings enable row level security;

-- PRODUCTS Policies
create policy "Allow public read of products" on public.products for select using (true);
create policy "Allow admins full access to products" on public.products for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- CATEGORIES Policies
create policy "Allow public read of categories" on public.categories for select using (true);
create policy "Allow admins full access to categories" on public.categories for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- PRODUCT IMAGES Policies
create policy "Allow public read of product_images" on public.product_images for select using (true);
create policy "Allow admins full access to product_images" on public.product_images for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- BLOGS Policies
create policy "Allow public read of published blogs" on public.blogs for select using (is_published = true or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Allow admins full access to blogs" on public.blogs for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- BANNERS Policies
create policy "Allow public read of active banners" on public.banners for select using (is_active = true or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Allow admins full access to banners" on public.banners for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- REVIEWS Policies
create policy "Allow public read of reviews" on public.reviews for select using (true);
create policy "Allow authenticated users to insert reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Allow users to update their own reviews" on public.reviews for update using (auth.uid() = user_id);
create policy "Allow users to delete their own reviews" on public.reviews for delete using (auth.uid() = user_id);
create policy "Allow admins full access to reviews" on public.reviews for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ACTIVITY LOGS Policies
create policy "Allow admins to select activity logs" on public.activity_logs for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "Allow system/users to insert activity logs" on public.activity_logs for insert with check (true);

-- INVENTORY LOGS Policies
create policy "Allow admins to select inventory logs" on public.inventory_logs for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "Allow system/users to insert inventory logs" on public.inventory_logs for insert with check (true);

-- SETTINGS Policies
create policy "Allow public read of settings" on public.settings for select using (true);
create policy "Allow admins full access to settings" on public.settings for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- ORDER ITEMS Policies addition
create policy "Allow users to insert order items for their own orders" on public.order_items for insert with check (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);
create policy "Allow admins full access to order items" on public.order_items for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);


-- ==================================================
-- MULTI-BRANCH ECOSYSTEM SCHEMAS ADDITIONS
-- ==================================================

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

-- 2. Create Branch Inventory Table
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

-- 3. Create Branch Managers Table
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


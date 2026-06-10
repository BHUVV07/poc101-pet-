import { Product, Category, Order, Consultation, Blog, Banner, Address, OrderStatus, PaymentStatus, ConsultationStatus, Branch, BranchInventory } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BLOGS, MOCK_BANNERS, MOCK_BRANCHES, MOCK_BRANCH_INVENTORY } from './mockData';

// Helper to initialize LocalStorage if empty
const initMockDB = () => {
  if (typeof window === 'undefined') return;
  let resetNeeded = false;
  try {
    const storedCats = localStorage.getItem('pawluxury_db_categories');
    if (storedCats) {
      const parsed = JSON.parse(storedCats);
      if (Array.isArray(parsed) && parsed.length < MOCK_CATEGORIES.length) {
        resetNeeded = true;
      }
    } else {
      resetNeeded = true;
    }
    // Also reset if branches are missing
    if (!localStorage.getItem('pawluxury_db_branches')) {
      resetNeeded = true;
    }
  } catch (e) {
    resetNeeded = true;
  }

  if (resetNeeded) {
    localStorage.setItem('pawluxury_db_products', JSON.stringify(MOCK_PRODUCTS));
    localStorage.setItem('pawluxury_db_categories', JSON.stringify(MOCK_CATEGORIES));
    localStorage.setItem('pawluxury_db_blogs', JSON.stringify(MOCK_BLOGS));
    localStorage.setItem('pawluxury_db_banners', JSON.stringify(MOCK_BANNERS));
    localStorage.setItem('pawluxury_db_branches', JSON.stringify(MOCK_BRANCHES));
    localStorage.setItem('pawluxury_db_branch_inventory', JSON.stringify(MOCK_BRANCH_INVENTORY));
  } else {
    if (!localStorage.getItem('pawluxury_db_products')) {
      localStorage.setItem('pawluxury_db_products', JSON.stringify(MOCK_PRODUCTS));
    }
    if (!localStorage.getItem('pawluxury_db_categories')) {
      localStorage.setItem('pawluxury_db_categories', JSON.stringify(MOCK_CATEGORIES));
    }
    if (!localStorage.getItem('pawluxury_db_blogs')) {
      localStorage.setItem('pawluxury_db_blogs', JSON.stringify(MOCK_BLOGS));
    }
    if (!localStorage.getItem('pawluxury_db_banners')) {
      localStorage.setItem('pawluxury_db_banners', JSON.stringify(MOCK_BANNERS));
    }
    if (!localStorage.getItem('pawluxury_db_branches')) {
      localStorage.setItem('pawluxury_db_branches', JSON.stringify(MOCK_BRANCHES));
    }
    if (!localStorage.getItem('pawluxury_db_branch_inventory')) {
      localStorage.setItem('pawluxury_db_branch_inventory', JSON.stringify(MOCK_BRANCH_INVENTORY));
    }
  }
  if (!localStorage.getItem('pawluxury_db_orders')) {
    localStorage.setItem('pawluxury_db_orders', JSON.stringify([]));
  }
  if (!localStorage.getItem('pawluxury_db_consultations')) {
    localStorage.setItem('pawluxury_db_consultations', JSON.stringify([]));
  }
  if (!localStorage.getItem('pawluxury_db_addresses')) {
    localStorage.setItem('pawluxury_db_addresses', JSON.stringify([]));
  }
  if (!localStorage.getItem('pawluxury_db_settings')) {
    localStorage.setItem('pawluxury_db_settings', JSON.stringify({
      whatsappNumber: '+919876543210',
      lowStockThreshold: 10,
      bankName: 'HDFC Bank Ltd',
      accountNumber: '50200062391032',
      ifscCode: 'HDFC0000104',
      accountName: 'PawLuxury Private Limited',
      upiId: 'pawluxury@ybl'
    }));
  }
  if (!localStorage.getItem('pawluxury_db_activity_logs')) {
    localStorage.setItem('pawluxury_db_activity_logs', JSON.stringify([
      {
        id: 'act-1',
        userId: 'mock-admin-999',
        action: 'Database Initialized',
        target: 'System',
        details: 'Mock ledger database configured successfully.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: 'act-2',
        userId: 'mock-admin-999',
        action: 'Banner Activated',
        target: 'banner:banner-1',
        details: 'Hero banner "The New Standard of Pet Luxury" activated.',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
      }
    ]));
  }
  if (!localStorage.getItem('pawluxury_db_inventory_logs')) {
    localStorage.setItem('pawluxury_db_inventory_logs', JSON.stringify([
      {
        id: 'inv-1',
        productId: 'prod-1',
        changeAmount: 12,
        reason: 'Initial catalog stocking',
        updatedBy: 'mock-admin-999',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: 'inv-2',
        productId: 'prod-2',
        changeAmount: 45,
        reason: 'Holistic diet inventory restock',
        updatedBy: 'mock-admin-999',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
      }
    ]));
  }
};

// Initialize Mock DB
if (typeof window !== 'undefined') {
  initMockDB();
}

// Get item from Mock DB helper
const getMockData = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(`pawluxury_db_${key}`);
  return stored ? JSON.parse(stored) : [];
};

// Save items to Mock DB helper
const saveMockData = <T>(key: string, data: T[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`pawluxury_db_${key}`, JSON.stringify(data));
  }
};

export const dbService = {
  // ==========================================
  // CATEGORIES
  // ==========================================
  async getCategories(): Promise<Category[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (!error && data) return data as Category[];
    }
    return getMockData<Category>('categories');
  },

  async createCategory(name: string, description: string, imageUrl: string): Promise<Category> {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      slug,
      description,
      imageUrl,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('categories').insert([{
        name,
        slug,
        description,
        image_url: imageUrl
      }]).select().single();
      if (!error && data) return data as Category;
    }

    const categories = getMockData<Category>('categories');
    categories.push(newCategory);
    saveMockData('categories', categories);
    return newCategory;
  },

  // ==========================================
  // BRANCHES & DIVISION OPERATIONS
  // ==========================================
  async getBranches(): Promise<Branch[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('branches').select('*').order('name');
      if (!error && data) {
        return data.map(b => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          type: b.type,
          address: b.address,
          phone: b.phone,
          whatsappNumber: b.whatsapp_number,
          upiId: b.upi_id,
          bankName: b.bank_name,
          accountNumber: b.account_number,
          ifscCode: b.ifsc_code,
          accountName: b.account_name,
          createdAt: b.created_at
        })) as Branch[];
      }
    }
    return getMockData<Branch>('branches');
  },

  async getBranchById(id: string): Promise<Branch | null> {
    const branches = await this.getBranches();
    return branches.find(b => b.id === id) || null;
  },

  async getBranchBySlug(slug: string): Promise<Branch | null> {
    const branches = await this.getBranches();
    return branches.find(b => b.slug === slug) || null;
  },

  async getBranchInventory(branchId: string): Promise<BranchInventory[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('branch_inventory').select('*').eq('branch_id', branchId);
      if (!error && data) {
        return data.map(bi => ({
          id: bi.id,
          branchId: bi.branch_id,
          productId: bi.product_id,
          stock: bi.stock,
          price: bi.price,
          isFeatured: bi.is_featured,
          isBestseller: bi.is_bestseller,
          isAvailable: bi.is_available,
          createdAt: bi.created_at,
          updatedAt: bi.updated_at
        })) as BranchInventory[];
      }
    }
    const inv = getMockData<BranchInventory>('branch_inventory');
    return inv.filter(bi => bi.branchId === branchId);
  },

  async updateBranchInventoryStock(branchId: string, productId: string, changeAmount: number, reason: string = 'Stock Adjusted'): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { data: current } = await supabase
        .from('branch_inventory')
        .select('stock')
        .eq('branch_id', branchId)
        .eq('product_id', productId)
        .single();
      const currentStock = current ? current.stock : 0;
      const nextStock = Math.max(0, currentStock + changeAmount);
      
      const { error } = await supabase
        .from('branch_inventory')
        .update({ stock: nextStock, updated_at: new Date().toISOString() })
        .eq('branch_id', branchId)
        .eq('product_id', productId);
      
      if (!error) {
        await supabase.from('inventory_logs').insert([{
          product_id: productId,
          change_amount: changeAmount,
          reason: `Branch [${branchId}]: ${reason}`,
          created_at: new Date().toISOString()
        }]);
        return true;
      }
      return false;
    }

    const inv = getMockData<BranchInventory>('branch_inventory');
    const itemIdx = inv.findIndex(bi => bi.branchId === branchId && bi.productId === productId);
    if (itemIdx > -1) {
      inv[itemIdx].stock = Math.max(0, inv[itemIdx].stock + changeAmount);
      inv[itemIdx].isAvailable = inv[itemIdx].stock > 0;
      inv[itemIdx].updatedAt = new Date().toISOString();
      saveMockData('branch_inventory', inv);

      const logs = getMockData<any>('inventory_logs');
      logs.push({
        id: `inv-${Date.now()}`,
        productId,
        changeAmount,
        reason: `Branch [${branchId}]: ${reason}`,
        createdAt: new Date().toISOString()
      });
      saveMockData('inventory_logs', logs);
      return true;
    }
    return false;
  },

  async saveBranchSettings(branchId: string, settings: Partial<Branch>): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from('branches')
        .update({
          address: settings.address,
          phone: settings.phone,
          whatsapp_number: settings.whatsappNumber,
          upi_id: settings.upiId,
          bank_name: settings.bankName,
          account_number: settings.accountNumber,
          ifsc_code: settings.ifscCode,
          account_name: settings.accountName
        })
        .eq('id', branchId);
      return !error;
    }

    const branches = getMockData<Branch>('branches');
    const idx = branches.findIndex(b => b.id === branchId);
    if (idx > -1) {
      branches[idx] = { ...branches[idx], ...settings };
      saveMockData('branches', branches);
      return true;
    }
    return false;
  },

  // ==========================================
  // PRODUCTS
  // ==========================================
  async getProducts(categoryId?: string, search?: string, branchId?: string): Promise<Product[]> {
    if (isSupabaseConfigured() && supabase) {
      if (branchId) {
        const { data: biData } = await supabase
          .from('branch_inventory')
          .select('product_id, stock, price, is_featured, is_bestseller')
          .eq('branch_id', branchId)
          .eq('is_available', true);
        
        if (!biData || biData.length === 0) return [];
        const productIds = biData.map(item => item.product_id);
        
        let query = supabase.from('products').select('*, product_images(image_url)').in('id', productIds);
        if (categoryId) query = query.eq('category_id', categoryId);
        if (search) query = query.ilike('name', `%${search}%`);
        const { data, error } = await query.order('created_at', { ascending: false });
        if (!error && data) {
          return data.map(p => {
            const bi = biData.find(item => item.product_id === p.id);
            return {
              id: p.id,
              name: p.name,
              slug: p.slug,
              description: p.description,
              price: bi?.price || p.price,
              salePrice: p.sale_price,
              stock: bi?.stock || 0,
              categoryId: p.category_id,
              isFeatured: bi?.is_featured || false,
              rating: p.rating,
              images: p.product_images?.map((img: { image_url: string }) => img.image_url) || [],
              createdAt: p.created_at,
              updatedAt: p.updated_at,
              branchId: branchId
            };
          }) as Product[];
        }
      } else {
        let query = supabase.from('products').select('*, product_images(image_url)');
        if (categoryId) query = query.eq('category_id', categoryId);
        if (search) query = query.ilike('name', `%${search}%`);
        const { data, error } = await query.order('created_at', { ascending: false });
        if (!error && data) {
          return data.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: p.price,
            salePrice: p.sale_price,
            stock: p.stock,
            categoryId: p.category_id,
            isFeatured: p.is_featured,
            rating: p.rating,
            images: p.product_images?.map((img: { image_url: string }) => img.image_url) || [],
            createdAt: p.created_at,
            updatedAt: p.updated_at
          })) as Product[];
        }
      }
    }

    let products = getMockData<Product>('products');
    if (branchId) {
      const biList = getMockData<BranchInventory>('branch_inventory');
      const branchBi = biList.filter(bi => bi.branchId === branchId && bi.isAvailable);
      const biMap = new Map(branchBi.map(bi => [bi.productId, bi]));
      products = products
        .filter(p => biMap.has(p.id))
        .map(p => {
          const bi = biMap.get(p.id)!;
          return {
            ...p,
            stock: bi.stock,
            price: bi.price || p.price,
            isFeatured: bi.isFeatured,
            branchId
          };
        });
    }

    if (categoryId) {
      products = products.filter(p => p.categoryId === categoryId);
    }
    if (search) {
      const term = search.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
    }
    return products;
  },

  async getProductBySlug(slug: string, branchId?: string): Promise<Product | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*, product_images(image_url)').eq('slug', slug).single();
      if (!error && data) {
        let branchStock = data.stock;
        let branchPrice = data.price;
        let isFeatured = data.is_featured;

        if (branchId) {
          const { data: bi } = await supabase
            .from('branch_inventory')
            .select('stock, price, is_featured')
            .eq('branch_id', branchId)
            .eq('product_id', data.id)
            .single();
          if (bi) {
            branchStock = bi.stock;
            branchPrice = bi.price || data.price;
            isFeatured = bi.is_featured;
          }
        }

        return {
          id: data.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: branchPrice,
          salePrice: data.sale_price,
          stock: branchStock,
          categoryId: data.category_id,
          isFeatured: isFeatured,
          rating: data.rating,
          images: data.product_images?.map((img: { image_url: string }) => img.image_url) || [],
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          branchId
        } as Product;
      }
    }

    const products = getMockData<Product>('products');
    const p = products.find(p => p.slug === slug) || null;
    if (!p) return null;
    if (branchId) {
      const biList = getMockData<BranchInventory>('branch_inventory');
      const bi = biList.find(b => b.branchId === branchId && b.productId === p.id);
      if (bi) {
        return {
          ...p,
          stock: bi.stock,
          price: bi.price || p.price,
          isFeatured: bi.isFeatured,
          branchId
        };
      }
    }
    return p;
  },

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'slug'>): Promise<Product> {
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug,
      rating: 5.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      const { data: prod, error: prodErr } = await supabase.from('products').insert([{
        name: productData.name,
        slug,
        description: productData.description,
        price: productData.price,
        sale_price: productData.salePrice,
        stock: productData.stock,
        category_id: productData.categoryId,
        is_featured: productData.isFeatured,
      }]).select().single();

      if (!prodErr && prod) {
        // Insert images
        if (productData.images.length > 0) {
          const imageInserts = productData.images.map((url, index) => ({
            product_id: prod.id,
            image_url: url,
            display_order: index
          }));
          await supabase.from('product_images').insert(imageInserts);
        }
        return { ...newProduct, id: prod.id };
      }
    }

    const products = getMockData<Product>('products');
    products.push(newProduct);
    saveMockData('products', products);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('products').update({
        name: updates.name,
        description: updates.description,
        price: updates.price,
        sale_price: updates.salePrice,
        stock: updates.stock,
        category_id: updates.categoryId,
        is_featured: updates.isFeatured,
        updated_at: new Date().toISOString()
      }).eq('id', id);
    }

    const products = getMockData<Product>('products');
    const idx = products.findIndex(p => p.id === id);
    if (idx > -1) {
      products[idx] = { ...products[idx], ...updates, updatedAt: new Date().toISOString() };
      saveMockData('products', products);
      return products[idx];
    }
    throw new Error('Product not found');
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    }

    const products = getMockData<Product>('products');
    const updated = products.filter(p => p.id !== id);
    saveMockData('products', updated);
    return true;
  },

  // ==========================================
  // ADDRESSES
  // ==========================================
  async getAddresses(userId: string): Promise<Address[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('addresses').select('*').eq('user_id', userId);
      if (!error && data) return data as Address[];
    }
    return getMockData<Address>('addresses').filter(a => a.userId === userId);
  },

  async createAddress(addressData: Omit<Address, 'id' | 'createdAt'>): Promise<Address> {
    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('addresses').insert([{
        user_id: addressData.userId,
        full_name: addressData.fullName,
        phone: addressData.phone,
        address_line1: addressData.addressLine1,
        address_line2: addressData.addressLine2,
        city: addressData.city,
        state: addressData.state,
        postal_code: addressData.postalCode,
        country: addressData.country,
        is_default: addressData.isDefault
      }]).select().single();
      if (!error && data) return data as Address;
    }

    const addresses = getMockData<Address>('addresses');
    if (addressData.isDefault) {
      // Set others to false
      addresses.forEach(a => {
        if (a.userId === addressData.userId) a.isDefault = false;
      });
    }
    addresses.push(newAddress);
    saveMockData('addresses', addresses);
    return newAddress;
  },

  // ==========================================
  // ORDERS
  // ==========================================
  async getOrders(userId?: string, branchId?: string): Promise<Order[]> {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('orders').select('*, order_items(*), payment_proofs(*)');
      if (userId) query = query.eq('user_id', userId);
      if (branchId) query = query.eq('branch_id', branchId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data) return data as Order[];
    }

    let orders = getMockData<Order>('orders');
    if (userId) {
      orders = orders.filter(o => o.userId === userId);
    }
    if (branchId) {
      orders = orders.filter(o => o.branchId === branchId);
    }
    return orders;
  },

  async getOrderById(id: string): Promise<Order | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('orders').select('*, order_items(*), payment_proofs(*)').eq('id', id).single();
      if (!error && data) return data as Order;
    }

    const orders = getMockData<Order>('orders');
    return orders.find(o => o.id === id) || null;
  },

  async createOrder(orderData: {
    userId: string | null;
    userEmail?: string;
    totalAmount: number;
    shippingAddress: Address;
    orderNotes: string | null;
    items: { product: Product; quantity: number }[];
    branchId?: string | null;
  }): Promise<Order> {
    const orderId = `order-${Date.now()}`;
    const orderItems = orderData.items.map((item, index) => ({
      id: `item-${orderId}-${index}`,
      orderId,
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0] || null,
      quantity: item.quantity,
      price: item.product.salePrice ?? item.product.price
    }));

    const newOrder: Order = {
      id: orderId,
      userId: orderData.userId,
      userEmail: orderData.userEmail || 'customer@pawluxury.com',
      status: 'payment_pending',
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      paymentStatus: 'unpaid',
      trackingNumber: null,
      orderNotes: orderData.orderNotes,
      items: orderItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      branchId: orderData.branchId || null
    };

    if (isSupabaseConfigured() && supabase) {
      const { data: ord, error: ordErr } = await supabase.from('orders').insert([{
        user_id: orderData.userId,
        user_email: orderData.userEmail || 'customer@pawluxury.com',
        total_amount: orderData.totalAmount,
        shipping_address: orderData.shippingAddress,
        order_notes: orderData.orderNotes,
        status: 'payment_pending',
        payment_status: 'unpaid',
        branch_id: orderData.branchId || null
      }]).select().single();

      if (!ordErr && ord) {
        const itemInserts = orderData.items.map(item => ({
          order_id: ord.id,
          product_id: item.product.id,
          product_name: item.product.name,
          product_image: item.product.images[0] || null,
          quantity: item.quantity,
          price: item.product.salePrice ?? item.product.price
        }));
        await supabase.from('order_items').insert(itemInserts);
        return { ...newOrder, id: ord.id };
      }
    }

    const orders = getMockData<Order>('orders');
    orders.push(newOrder);
    saveMockData('orders', orders);
    return newOrder;
  },

  async uploadPaymentProof(orderId: string, transactionId: string, screenshotUrl: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('payment_proofs').insert([{
        order_id: orderId,
        screenshot_url: screenshotUrl,
        transaction_id: transactionId
      }]);
      if (!error) {
        await supabase.from('orders').update({
          payment_status: 'pending_verification'
        }).eq('id', orderId);
        return true;
      }
    }

    const orders = getMockData<Order>('orders');
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      const proof = {
        id: `proof-${Date.now()}`,
        orderId,
        userId: orders[idx].userId || 'mock-user-123',
        screenshotUrl,
        transactionId,
        verifiedBy: null,
        verificationNotes: null,
        createdAt: new Date().toISOString(),
        verifiedAt: null
      };
      orders[idx].paymentProof = proof;
      orders[idx].paymentStatus = 'pending_verification';
      orders[idx].updatedAt = new Date().toISOString();
      saveMockData('orders', orders);
      return true;
    }
    return false;
  },

  async verifyPayment(orderId: string, approved: boolean, notes?: string, adminId?: string): Promise<boolean> {
    const paymentStatus: PaymentStatus = approved ? 'paid' : 'failed';
    const orderStatus: OrderStatus = approved ? 'processing' : 'payment_pending';

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('orders').update({
        payment_status: paymentStatus,
        status: orderStatus
      }).eq('id', orderId);
      
      if (!error) {
        await supabase.from('payment_proofs').update({
          verified_by: adminId,
          verification_notes: notes || '',
          verified_at: new Date().toISOString()
        }).eq('order_id', orderId);
        return true;
      }
    }

    const orders = getMockData<Order>('orders');
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      orders[idx].paymentStatus = paymentStatus;
      orders[idx].status = orderStatus;
      if (orders[idx].paymentProof) {
        orders[idx].paymentProof = {
          ...orders[idx].paymentProof!,
          verifiedBy: adminId || 'admin-999',
          verificationNotes: notes || '',
          verifiedAt: new Date().toISOString()
        };
      }
      orders[idx].updatedAt = new Date().toISOString();
      saveMockData('orders', orders);
      return true;
    }
    return false;
  },

  async updateOrderStatus(orderId: string, status: OrderStatus, trackingNumber?: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const updates: { status: OrderStatus; updated_at: string; tracking_number?: string } = { status, updated_at: new Date().toISOString() };
      if (trackingNumber) updates.tracking_number = trackingNumber;
      const { error } = await supabase.from('orders').update(updates).eq('id', orderId);
      if (!error) return true;
    }

    const orders = getMockData<Order>('orders');
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      orders[idx].status = status;
      if (trackingNumber) orders[idx].trackingNumber = trackingNumber;
      orders[idx].updatedAt = new Date().toISOString();
      saveMockData('orders', orders);
      return true;
    }
    return false;
  },

  // ==========================================
  // CONSULTATIONS
  // ==========================================
  async getConsultations(userId?: string, branchId?: string): Promise<Consultation[]> {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('consultations').select('*');
      if (userId) query = query.eq('user_id', userId);
      if (branchId) query = query.eq('branch_id', branchId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data) return data as Consultation[];
    }

    let consultations = getMockData<Consultation>('consultations');
    if (userId) {
      consultations = consultations.filter(c => c.userId === userId);
    }
    if (branchId) {
      consultations = consultations.filter(c => c.branchId === branchId);
    }
    return consultations;
  },

  async createConsultation(consultationData: Omit<Consultation, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'scheduledAt' | 'doctorNotes'>): Promise<Consultation> {
    const newConsultation: Consultation = {
      ...consultationData,
      id: `cons-${Date.now()}`,
      status: 'pending',
      scheduledAt: null,
      doctorNotes: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      branchId: consultationData.branchId || 'buddy-kitty'
    };

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('consultations').insert([{
        user_id: consultationData.userId,
        user_email: consultationData.userEmail || 'customer@pawluxury.com',
        pet_name: consultationData.petName,
        pet_type: consultationData.petType,
        pet_age: consultationData.petAge,
        symptoms: consultationData.symptoms,
        status: 'pending',
        branch_id: consultationData.branchId || 'buddy-kitty'
      }]).select().single();
      if (!error && data) return data as Consultation;
    }

    const consultations = getMockData<Consultation>('consultations');
    consultations.push(newConsultation);
    saveMockData('consultations', consultations);
    return newConsultation;
  },

  async updateConsultation(id: string, updates: {
    status: ConsultationStatus;
    scheduledAt?: string | null;
    doctorNotes?: string | null;
  }): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('consultations').update({
        status: updates.status,
        scheduled_at: updates.scheduledAt,
        doctor_notes: updates.doctorNotes,
        updated_at: new Date().toISOString()
      }).eq('id', id);
      if (!error) return true;
    }

    const consultations = getMockData<Consultation>('consultations');
    const idx = consultations.findIndex(c => c.id === id);
    if (idx > -1) {
      consultations[idx] = {
        ...consultations[idx],
        status: updates.status,
        scheduledAt: updates.scheduledAt !== undefined ? updates.scheduledAt : consultations[idx].scheduledAt,
        doctorNotes: updates.doctorNotes !== undefined ? updates.doctorNotes : consultations[idx].doctorNotes,
        updatedAt: new Date().toISOString()
      };
      saveMockData('consultations', consultations);
      return true;
    }
    return false;
  },

  // ==========================================
  // BLOGS
  // ==========================================
  async getBlogs(publishedOnly = true): Promise<Blog[]> {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('blogs').select('*');
      if (publishedOnly) query = query.eq('is_published', true);
      const { data, error } = await query.order('published_at', { ascending: false });
      if (!error && data) return data as Blog[];
    }

    const blogs = getMockData<Blog>('blogs');
    return publishedOnly ? blogs.filter(b => b.isPublished) : blogs;
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
      if (!error && data) return data as Blog;
    }

    const blogs = getMockData<Blog>('blogs');
    return blogs.find(b => b.slug === slug) || null;
  },

  async createBlog(blogData: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'slug'>): Promise<Blog> {
    const slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newBlog: Blog = {
      ...blogData,
      id: `blog-${Date.now()}`,
      slug,
      publishedAt: blogData.isPublished ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('blogs').insert([{
        title: blogData.title,
        slug,
        content: blogData.content,
        summary: blogData.summary,
        featured_image: blogData.featuredImage,
        author_id: blogData.authorId,
        is_published: blogData.isPublished,
        published_at: blogData.isPublished ? new Date().toISOString() : null
      }]).select().single();
      if (!error && data) return data as Blog;
    }

    const blogs = getMockData<Blog>('blogs');
    blogs.push(newBlog);
    saveMockData('blogs', blogs);
    return newBlog;
  },

  async updateBlog(id: string, updates: Partial<Blog>): Promise<Blog> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('blogs').update({
        title: updates.title,
        content: updates.content,
        summary: updates.summary,
        featured_image: updates.featuredImage,
        is_published: updates.isPublished,
        published_at: updates.isPublished ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      }).eq('id', id);
    }

    const blogs = getMockData<Blog>('blogs');
    const idx = blogs.findIndex(b => b.id === id);
    if (idx > -1) {
      const isPublishedChanged = updates.isPublished !== undefined && updates.isPublished !== blogs[idx].isPublished;
      const publishedAt = isPublishedChanged
        ? (updates.isPublished ? new Date().toISOString() : null)
        : blogs[idx].publishedAt;

      blogs[idx] = {
        ...blogs[idx],
        ...updates,
        publishedAt,
        updatedAt: new Date().toISOString()
      };
      saveMockData('blogs', blogs);
      return blogs[idx];
    }
    throw new Error('Blog post not found');
  },

  async deleteBlog(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (!error) return true;
    }

    const blogs = getMockData<Blog>('blogs');
    const updated = blogs.filter(b => b.id !== id);
    saveMockData('blogs', updated);
    return true;
  },

  // ==========================================
  // BANNERS
  // ==========================================
  async getBanners(): Promise<Banner[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('banners').select('*').eq('is_active', true).order('display_order');
      if (!error && data) return data as Banner[];
    }
    return getMockData<Banner>('banners').filter(b => b.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async getAllBanners(): Promise<Banner[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('banners').select('*').order('display_order');
      if (!error && data) return data as Banner[];
    }
    return getMockData<Banner>('banners').sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async createBanner(bannerData: Omit<Banner, 'id' | 'createdAt'>): Promise<Banner> {
    const newBanner: Banner = {
      ...bannerData,
      id: `banner-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('banners').insert([{
        title: bannerData.title,
        subtitle: bannerData.subtitle,
        image_url: bannerData.imageUrl,
        link_url: bannerData.linkUrl,
        is_active: bannerData.isActive,
        display_order: bannerData.displayOrder
      }]).select().single();
      if (!error && data) return data as Banner;
    }

    const banners = getMockData<Banner>('banners');
    banners.push(newBanner);
    saveMockData('banners', banners);
    return newBanner;
  },

  async updateBanner(id: string, updates: Partial<Banner>): Promise<Banner> {
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('banners').update({
        title: updates.title,
        subtitle: updates.subtitle,
        image_url: updates.imageUrl,
        link_url: updates.linkUrl,
        is_active: updates.isActive,
        display_order: updates.displayOrder
      }).eq('id', id);
    }

    const banners = getMockData<Banner>('banners');
    const idx = banners.findIndex(b => b.id === id);
    if (idx > -1) {
      banners[idx] = { ...banners[idx], ...updates };
      saveMockData('banners', banners);
      return banners[idx];
    }
    throw new Error('Banner not found');
  },

  async deleteBanner(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (!error) return true;
    }

    const banners = getMockData<Banner>('banners');
    const updated = banners.filter(b => b.id !== id);
    saveMockData('banners', updated);
    return true;
  },

  // ==========================================
  // CUSTOMERS
  // ==========================================
  async getCustomers(): Promise<any[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('profiles').select('*').eq('role', 'customer');
      if (!error && data) {
        const customers = [];
        for (const prof of data) {
          const { data: ords } = await supabase.from('orders').select('total_amount, payment_status').eq('user_id', prof.id);
          const paidOrders = ords?.filter(o => o.payment_status === 'paid') || [];
          customers.push({
            id: prof.id,
            email: prof.email,
            fullName: prof.full_name,
            role: prof.role,
            avatarUrl: prof.avatar_url,
            totalOrders: ords?.length || 0,
            totalSpent: paidOrders.reduce((sum, o) => sum + Number(o.total_amount), 0),
            createdAt: prof.created_at
          });
        }
        return customers;
      }
    }
    
    const orders = getMockData<Order>('orders');
    const profiles: any[] = [];
    
    const defaultProfile = {
      id: 'mock-user-123',
      email: 'customer@pawluxury.com',
      fullName: 'Alexander Sterling',
      role: 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      createdAt: new Date(Date.now() - 3600000 * 240).toISOString()
    };
    
    profiles.push(defaultProfile);
    
    orders.forEach(o => {
      if (o.userId && !profiles.some(p => p.id === o.userId)) {
        profiles.push({
          id: o.userId,
          email: o.userEmail || 'customer@pawluxury.com',
          fullName: o.shippingAddress.fullName || 'Anonymous Client',
          role: 'customer',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
          createdAt: o.createdAt
        });
      }
    });
    
    return profiles.map(p => {
      const userOrders = orders.filter(o => o.userId === p.id);
      const paidOrders = userOrders.filter(o => o.paymentStatus === 'paid');
      return {
        ...p,
        totalOrders: userOrders.length,
        totalSpent: paidOrders.reduce((sum, o) => sum + o.totalAmount, 0)
      };
    });
  },

  // ==========================================
  // AUDIT & ACTIVITY LOGS
  // ==========================================
  async getActivityLogs(): Promise<any[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return getMockData<any>('activity_logs').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async logActivity(action: string, target: string, details: string, userId?: string): Promise<boolean> {
    const newLog = {
      id: `act-${Date.now()}`,
      userId: userId || 'system',
      action,
      target,
      details,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('activity_logs').insert([{
        user_id: userId || null,
        action,
        target,
        details
      }]);
      if (!error) return true;
    }

    const logs = getMockData<any>('activity_logs');
    logs.push(newLog);
    saveMockData('activity_logs', logs);
    return true;
  },

  // ==========================================
  // INVENTORY LOGS & STOCK
  // ==========================================
  async getInventoryLogs(productId?: string): Promise<any[]> {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('inventory_logs').select('*, products(name)');
      if (productId) query = query.eq('product_id', productId);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data) return data;
    }

    let logs = getMockData<any>('inventory_logs');
    if (productId) {
      logs = logs.filter(l => l.productId === productId);
    }
    const products = getMockData<Product>('products');
    return logs.map(l => {
      const prod = products.find(p => p.id === l.productId);
      return {
        ...l,
        productName: prod ? prod.name : 'Unknown Product'
      };
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async logInventoryChange(productId: string, changeAmount: number, reason: string, updatedBy?: string): Promise<boolean> {
    const newLog = {
      id: `inv-${Date.now()}`,
      productId,
      changeAmount,
      reason,
      updatedBy: updatedBy || 'system',
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('inventory_logs').insert([{
        product_id: productId,
        change_amount: changeAmount,
        reason,
        updated_by: updatedBy || null
      }]);
      if (!error) {
        // Also update products stock
        const { data: currentProd } = await supabase.from('products').select('stock').eq('id', productId).single();
        if (currentProd) {
          const newStock = currentProd.stock + changeAmount;
          await supabase.from('products').update({ stock: newStock }).eq('id', productId);
        }
        return true;
      }
    }

    // Sync mock local storage product stock level
    const products = getMockData<Product>('products');
    const idx = products.findIndex(p => p.id === productId);
    if (idx > -1) {
      products[idx].stock += changeAmount;
      products[idx].updatedAt = new Date().toISOString();
      saveMockData('products', products);
    }

    const logs = getMockData<any>('inventory_logs');
    logs.push(newLog);
    saveMockData('inventory_logs', logs);
    return true;
  },

  // ==========================================
  // CONFIGURATION SETTINGS
  // ==========================================
  async getSettings(): Promise<any> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('settings').select('*').limit(1).single();
      if (!error && data) {
        return {
          whatsappNumber: data.whatsapp_number,
          lowStockThreshold: data.low_stock_threshold,
          bankName: data.bank_name,
          accountNumber: data.account_number,
          ifscCode: data.ifsc_code,
          accountName: data.account_name,
          upiId: data.upi_id
        };
      }
    }
    
    const settings = localStorage.getItem('pawluxury_db_settings');
    return settings ? JSON.parse(settings) : {
      whatsappNumber: '+919876543210',
      lowStockThreshold: 10,
      bankName: 'HDFC Bank Ltd',
      accountNumber: '50200062391032',
      ifscCode: 'HDFC0000104',
      accountName: 'PawLuxury Private Limited',
      upiId: 'pawluxury@ybl'
    };
  },
  async saveSettings(settingsData: any): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('settings').upsert([{
        id: 1,
        whatsapp_number: settingsData.whatsappNumber,
        low_stock_threshold: settingsData.lowStockThreshold,
        bank_name: settingsData.bankName,
        account_number: settingsData.accountNumber,
        ifsc_code: settingsData.ifscCode,
        account_name: settingsData.accountName,
        upi_id: settingsData.upiId,
        updated_at: new Date().toISOString()
      }]);
      if (!error) return true;
    }

    localStorage.setItem('pawluxury_db_settings', JSON.stringify(settingsData));
    return true;
  },

  async uploadFile(bucketName: string, file: File): Promise<string> {
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    if (file.size > maxSize) {
      throw new Error('File size exceeds the 5MB luxury security threshold.');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are permitted.');
    }

    if (isSupabaseConfigured() && supabase) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        throw new Error(`Storage upload failed: ${error.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return publicUrl;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Failed to parse file preview local payload.'));
      };
      reader.readAsDataURL(file);
    });
  }
};

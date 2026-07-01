import { Consultation, Blog, Banner, Address, ConsultationStatus, Branch } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { MOCK_BLOGS, MOCK_BANNERS, MOCK_BRANCHES } from './mockData';

// Helper to initialize LocalStorage if empty
const initMockDB = () => {
  if (typeof window === 'undefined') return;
  let resetNeeded = false;
  try {
    if (!localStorage.getItem('manasavetpharma_db_branches')) {
      resetNeeded = true;
    }
  } catch (e) {
    resetNeeded = true;
  }

  if (resetNeeded) {
    localStorage.setItem('manasavetpharma_db_blogs', JSON.stringify(MOCK_BLOGS));
    localStorage.setItem('manasavetpharma_db_banners', JSON.stringify(MOCK_BANNERS));
    localStorage.setItem('manasavetpharma_db_branches', JSON.stringify(MOCK_BRANCHES));
  } else {
    if (!localStorage.getItem('manasavetpharma_db_blogs')) {
      localStorage.setItem('manasavetpharma_db_blogs', JSON.stringify(MOCK_BLOGS));
    }
    if (!localStorage.getItem('manasavetpharma_db_banners')) {
      localStorage.setItem('manasavetpharma_db_banners', JSON.stringify(MOCK_BANNERS));
    }
    if (!localStorage.getItem('manasavetpharma_db_branches')) {
      localStorage.setItem('manasavetpharma_db_branches', JSON.stringify(MOCK_BRANCHES));
    }
  }
  if (!localStorage.getItem('manasavetpharma_db_consultations')) {
    localStorage.setItem('manasavetpharma_db_consultations', JSON.stringify([]));
  }
  if (!localStorage.getItem('manasavetpharma_db_addresses')) {
    localStorage.setItem('manasavetpharma_db_addresses', JSON.stringify([]));
  }
  if (!localStorage.getItem('manasavetpharma_db_settings')) {
    localStorage.setItem('manasavetpharma_db_settings', JSON.stringify({
      whatsappNumber: '+919876543210',
      bankName: 'HDFC Bank Ltd',
      accountNumber: '50200062391032',
      ifscCode: 'HDFC0000104',
      accountName: 'Manasa Vet Pharma',
      upiId: 'manasavetpharma@ybl'
    }));
  }
  if (!localStorage.getItem('manasavetpharma_db_activity_logs')) {
    localStorage.setItem('manasavetpharma_db_activity_logs', JSON.stringify([
      {
        id: 'act-1',
        userId: 'mock-admin-999',
        action: 'Database Initialized',
        target: 'System',
        details: 'Mock ledger database configured successfully.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
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
  const stored = localStorage.getItem(`manasavetpharma_db_${key}`);
  return stored ? JSON.parse(stored) : [];
};

// Save items to Mock DB helper
const saveMockData = <T>(key: string, data: T[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`manasavetpharma_db_${key}`, JSON.stringify(data));
  }
};

export const dbService = {
  // ==========================================
  // BRANCHES / OUTLETS
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
        }));
      }
    }
    return getMockData<Branch>('branches');
  },

  async getBranchById(id: string): Promise<Branch | null> {
    const list = await this.getBranches();
    return list.find(b => b.id === id) || null;
  },

  async getBranchBySlug(slug: string): Promise<Branch | null> {
    const list = await this.getBranches();
    return list.find(b => b.slug === slug) || null;
  },

  async saveBranchSettings(branchId: string, settings: Partial<Branch>): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('branches').update({
        name: settings.name,
        address: settings.address,
        phone: settings.phone,
        whatsapp_number: settings.whatsappNumber,
        upi_id: settings.upiId,
        bank_name: settings.bankName,
        account_number: settings.accountNumber,
        ifsc_code: settings.ifscCode,
        account_name: settings.accountName
      }).eq('id', branchId);
      if (!error) return true;
    }

    const branches = getMockData<Branch>('branches');
    const idx = branches.findIndex(b => b.id === branchId);
    if (idx !== -1) {
      branches[idx] = { ...branches[idx], ...settings };
      saveMockData('branches', branches);
      return true;
    }
    return false;
  },

  // ==========================================
  // ADDRESSES
  // ==========================================
  async getAddresses(userId: string): Promise<Address[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('addresses').select('*').eq('user_id', userId);
      if (!error && data) {
        return data.map(a => ({
          id: a.id,
          userId: a.user_id,
          fullName: a.full_name,
          phone: a.phone,
          addressLine1: a.address_line_1,
          addressLine2: a.address_line_2,
          city: a.city,
          state: a.state,
          postalCode: a.postal_code,
          country: a.country,
          isDefault: a.is_default,
          createdAt: a.created_at
        }));
      }
    }
    return getMockData<Address>('addresses').filter(a => a.userId === userId);
  },

  async createAddress(addressData: Omit<Address, 'id' | 'createdAt'>): Promise<Address> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('addresses').insert([{
        user_id: addressData.userId,
        full_name: addressData.fullName,
        phone: addressData.phone,
        address_line_1: addressData.addressLine1,
        address_line_2: addressData.addressLine2,
        city: addressData.city,
        state: addressData.state,
        postal_code: addressData.postalCode,
        country: addressData.country,
        is_default: addressData.isDefault
      }]).select().single();

      if (!error && data) {
        return {
          id: data.id,
          userId: data.user_id,
          fullName: data.full_name,
          phone: data.phone,
          addressLine1: data.address_line_1,
          addressLine2: data.address_line_2,
          city: data.city,
          state: data.state,
          postalCode: data.postal_code,
          country: data.country,
          isDefault: data.is_default,
          createdAt: data.created_at
        };
      }
    }

    const addresses = getMockData<Address>('addresses');
    if (addressData.isDefault) {
      addresses.forEach(a => {
        if (a.userId === addressData.userId) a.isDefault = false;
      });
    }
    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    addresses.push(newAddress);
    saveMockData('addresses', addresses);
    return newAddress;
  },

  // ==========================================
  // VET CONSULTATIONS
  // ==========================================
  async getConsultations(userId?: string, branchId?: string): Promise<Consultation[]> {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('consultations').select('*');
      if (userId) query = query.eq('user_id', userId);
      if (branchId) query = query.eq('branch_id', branchId);
      
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data) {
        return data.map(c => ({
          id: c.id,
          userId: c.user_id,
          userEmail: c.user_email,
          petName: c.pet_name,
          petType: c.pet_type,
          petAge: c.pet_age,
          symptoms: c.symptoms,
          status: c.status as ConsultationStatus,
          scheduledAt: c.scheduled_at,
          doctorNotes: c.doctor_notes,
          createdAt: c.created_at,
          updatedAt: c.updated_at,
          branchId: c.branch_id
        }));
      }
    }

    let list = getMockData<Consultation>('consultations');
    if (userId) list = list.filter(c => c.userId === userId);
    if (branchId) list = list.filter(c => c.branchId === branchId);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async createConsultation(consultationData: Omit<Consultation, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'scheduledAt' | 'doctorNotes'>): Promise<Consultation> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('consultations').insert([{
        user_id: consultationData.userId,
        user_email: consultationData.userEmail || 'client@manasavetpharma.com',
        pet_name: consultationData.petName,
        pet_type: consultationData.petType,
        pet_age: consultationData.petAge,
        symptoms: consultationData.symptoms,
        branch_id: consultationData.branchId,
        status: 'pending'
      }]).select().single();

      if (!error && data) {
        return {
          id: data.id,
          userId: data.user_id,
          userEmail: data.user_email,
          petName: data.pet_name,
          petType: data.pet_type,
          petAge: data.pet_age,
          symptoms: data.symptoms,
          status: data.status as ConsultationStatus,
          scheduledAt: data.scheduled_at,
          doctorNotes: data.doctor_notes,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          branchId: data.branch_id
        };
      }
    }

    const list = getMockData<Consultation>('consultations');
    const newConsult: Consultation = {
      ...consultationData,
      id: `cons-${Date.now()}`,
      status: 'pending',
      scheduledAt: null,
      doctorNotes: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.push(newConsult);
    saveMockData('consultations', list);
    return newConsult;
  },

  async updateConsultation(id: string, updates: {
    status?: ConsultationStatus;
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

    const list = getMockData<Consultation>('consultations');
    const idx = list.findIndex(c => c.id === id);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveMockData('consultations', list);
      return true;
    }
    return false;
  },

  // ==========================================
  // EDITORIAL BLOGS
  // ==========================================
  async getBlogs(publishedOnly = true): Promise<Blog[]> {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('blogs').select('*');
      if (publishedOnly) query = query.eq('is_published', true);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && data) {
        return data.map(b => ({
          id: b.id,
          title: b.title,
          slug: b.slug,
          content: b.content,
          summary: b.summary,
          featuredImage: b.featured_image,
          authorId: b.author_id,
          authorName: b.author_name,
          isPublished: b.is_published,
          publishedAt: b.published_at,
          createdAt: b.created_at,
          updatedAt: b.updated_at
        }));
      }
    }
    let list = getMockData<Blog>('blogs');
    if (publishedOnly) list = list.filter(b => b.isPublished);
    return list;
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content,
          summary: data.summary,
          featuredImage: data.featured_image,
          authorId: data.author_id,
          authorName: data.author_name,
          isPublished: data.is_published,
          publishedAt: data.published_at,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };
      }
    }
    const list = getMockData<Blog>('blogs');
    return list.find(b => b.slug === slug) || null;
  },

  async createBlog(blogData: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'slug'>): Promise<Blog> {
    const slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('blogs').insert([{
        title: blogData.title,
        slug,
        content: blogData.content,
        summary: blogData.summary,
        featured_image: blogData.featuredImage,
        author_id: blogData.authorId,
        author_name: blogData.authorName || 'Platform Editor',
        is_published: blogData.isPublished,
        published_at: blogData.isPublished ? new Date().toISOString() : null
      }]).select().single();

      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content,
          summary: data.summary,
          featuredImage: data.featured_image,
          authorId: data.author_id,
          authorName: data.author_name,
          isPublished: data.is_published,
          publishedAt: data.published_at,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };
      }
    }

    const list = getMockData<Blog>('blogs');
    const newBlog: Blog = {
      ...blogData,
      id: `blog-${Date.now()}`,
      slug,
      publishedAt: blogData.isPublished ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.push(newBlog);
    saveMockData('blogs', list);
    return newBlog;
  },

  async updateBlog(id: string, updates: Partial<Blog>): Promise<Blog> {
    if (isSupabaseConfigured() && supabase) {
      const dbUpdates: any = {
        title: updates.title,
        content: updates.content,
        summary: updates.summary,
        featured_image: updates.featuredImage,
        is_published: updates.isPublished,
        updated_at: new Date().toISOString()
      };
      if (updates.isPublished !== undefined) {
        dbUpdates.published_at = updates.isPublished ? new Date().toISOString() : null;
      }
      if (updates.title) {
        dbUpdates.slug = updates.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }

      const { data, error } = await supabase.from('blogs').update(dbUpdates).eq('id', id).select().single();
      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content,
          summary: data.summary,
          featuredImage: data.featured_image,
          authorId: data.author_id,
          authorName: data.author_name,
          isPublished: data.is_published,
          publishedAt: data.published_at,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };
      }
    }

    const list = getMockData<Blog>('blogs');
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) {
      const updatedBlog = {
        ...list[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      if (updates.isPublished !== undefined) {
        updatedBlog.publishedAt = updates.isPublished ? new Date().toISOString() : null;
      }
      if (updates.title) {
        updatedBlog.slug = updates.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      list[idx] = updatedBlog;
      saveMockData('blogs', list);
      return updatedBlog;
    }
    throw new Error('Blog entry not found.');
  },

  async deleteBlog(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (!error) return true;
    }
    const list = getMockData<Blog>('blogs');
    const filtered = list.filter(b => b.id !== id);
    saveMockData('blogs', filtered);
    return true;
  },

  // ==========================================
  // HERO BANNERS
  // ==========================================
  async getBanners(): Promise<Banner[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('banners').select('*').eq('is_active', true).order('display_order');
      if (!error && data) {
        return data.map(b => ({
          id: b.id,
          title: b.title,
          subtitle: b.subtitle,
          imageUrl: b.image_url,
          linkUrl: b.link_url,
          isActive: b.is_active,
          displayOrder: b.display_order,
          createdAt: b.created_at
        }));
      }
    }
    return getMockData<Banner>('banners').filter(b => b.isActive);
  },

  async getAllBanners(): Promise<Banner[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('banners').select('*').order('display_order');
      if (!error && data) {
        return data.map(b => ({
          id: b.id,
          title: b.title,
          subtitle: b.subtitle,
          imageUrl: b.image_url,
          linkUrl: b.link_url,
          isActive: b.is_active,
          displayOrder: b.display_order,
          createdAt: b.created_at
        }));
      }
    }
    return getMockData<Banner>('banners');
  },

  async createBanner(bannerData: Omit<Banner, 'id' | 'createdAt'>): Promise<Banner> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('banners').insert([{
        title: bannerData.title,
        subtitle: bannerData.subtitle,
        image_url: bannerData.imageUrl,
        link_url: bannerData.linkUrl,
        is_active: bannerData.isActive,
        display_order: bannerData.displayOrder
      }]).select().single();

      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          subtitle: data.subtitle,
          imageUrl: data.image_url,
          linkUrl: data.link_url,
          isActive: data.is_active,
          displayOrder: data.display_order,
          createdAt: data.created_at
        };
      }
    }

    const list = getMockData<Banner>('banners');
    const newBanner: Banner = {
      ...bannerData,
      id: `banner-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.push(newBanner);
    saveMockData('banners', list);
    return newBanner;
  },

  async updateBanner(id: string, updates: Partial<Banner>): Promise<Banner> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('banners').update({
        title: updates.title,
        subtitle: updates.subtitle,
        image_url: updates.imageUrl,
        link_url: updates.linkUrl,
        is_active: updates.isActive,
        display_order: updates.displayOrder
      }).eq('id', id).select().single();

      if (!error && data) {
        return {
          id: data.id,
          title: data.title,
          subtitle: data.subtitle,
          imageUrl: data.image_url,
          linkUrl: data.link_url,
          isActive: data.is_active,
          displayOrder: data.display_order,
          createdAt: data.created_at
        };
      }
    }

    const list = getMockData<Banner>('banners');
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      saveMockData('banners', list);
      return list[idx];
    }
    throw new Error('Banner not found.');
  },

  async deleteBanner(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (!error) return true;
    }
    const list = getMockData<Banner>('banners');
    const filtered = list.filter(b => b.id !== id);
    saveMockData('banners', filtered);
    return true;
  },

  // ==========================================
  // CUSTOMERS / USERS LIST
  // ==========================================
  async getCustomers(): Promise<any[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('profiles').select('*').eq('role', 'customer');
      if (!error && data) {
        return data.map(prof => ({
          id: prof.id,
          email: prof.email,
          fullName: prof.full_name,
          role: prof.role,
          avatarUrl: prof.avatar_url,
          totalOrders: 0,
          totalSpent: 0,
          createdAt: prof.created_at
        }));
      }
    }
    
    return [
      {
        id: 'mock-user-123',
        email: 'customer@manasavetpharma.com',
        fullName: 'Alexander Sterling',
        role: 'customer',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        totalOrders: 0,
        totalSpent: 0,
        createdAt: new Date(Date.now() - 3600000 * 240).toISOString()
      }
    ];
  },

  // ==========================================
  // AUDIT & ACTIVITY LOGS
  // ==========================================
  async getActivityLogs(): Promise<any[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        return data.map(log => ({
          id: log.id,
          userId: log.user_id,
          action: log.action,
          target: log.target,
          details: log.details,
          createdAt: log.created_at
        }));
      }
    }
    return getMockData<any>('activity_logs').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async logActivity(action: string, target: string, details: string, userId?: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('activity_logs').insert([{
        user_id: userId || null,
        action,
        target,
        details
      }]);
      if (!error) return true;
    }

    const list = getMockData<any>('activity_logs');
    list.push({
      id: `act-${Date.now()}`,
      userId: userId || 'anonymous',
      action,
      target,
      details,
      createdAt: new Date().toISOString()
    });
    saveMockData('activity_logs', list);
    return true;
  },

  // ==========================================
  // GENERAL SETTINGS
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
    
    const settings = localStorage.getItem('manasavetpharma_db_settings');
    return settings ? JSON.parse(settings) : {
      whatsappNumber: '+919876543210',
      bankName: 'HDFC Bank Ltd',
      accountNumber: '50200062391032',
      ifscCode: 'HDFC0000104',
      accountName: 'Manasa Vet Pharma',
      upiId: 'manasavetpharma@ybl'
    };
  },

  async saveSettings(settingsData: any): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('settings').upsert([{
        id: 1,
        whatsapp_number: settingsData.whatsappNumber,
        low_stock_threshold: settingsData.lowStockThreshold || 10,
        bank_name: settingsData.bankName,
        account_number: settingsData.accountNumber,
        ifsc_code: settingsData.ifscCode,
        account_name: settingsData.accountName,
        upi_id: settingsData.upiId,
        updated_at: new Date().toISOString()
      }]);
      if (!error) return true;
    }

    localStorage.setItem('manasavetpharma_db_settings', JSON.stringify(settingsData));
    return true;
  },

  // ==========================================
  // FILE STORAGE UPLOAD
  // ==========================================
  async uploadFile(bucketName: string, file: File): Promise<string> {
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    if (file.size > maxSize) {
      throw new Error('File size exceeds the 5MB security threshold.');
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

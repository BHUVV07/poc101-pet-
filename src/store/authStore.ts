import { create } from 'zustand';
import { Profile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthState {
  user: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  initialize: () => Promise<void>;
  login: (email: string, fullName?: string) => Promise<boolean>;
  register: (email: string, fullName: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setDemoRole: (role: UserRole) => void;
}

const DEFAULT_MOCK_USER: Profile = {
  id: 'mock-user-123',
  email: 'customer@pawluxury.com',
  fullName: 'Alexander Sterling',
  role: 'customer',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,  initialize: async () => {
    set({ isLoading: true });
    
    if (isSupabaseConfigured() && supabase) {
      const client = supabase;
      try {
        // Setup state change listener
        client.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            const { data: profile } = await client
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              set({
                user: {
                  id: profile.id,
                  email: profile.email,
                  fullName: profile.full_name,
                  role: profile.role,
                  avatarUrl: profile.avatar_url,
                  createdAt: profile.created_at,
                  updatedAt: profile.updated_at
                },
                isAuthenticated: true,
                isAdmin: profile.role === 'admin',
                isLoading: false
              });
            }
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isAdmin: false,
              isLoading: false
            });
          }
        });

        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          const { data: profile } = await client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            set({
              user: {
                id: profile.id,
                email: profile.email,
                fullName: profile.full_name,
                role: profile.role,
                avatarUrl: profile.avatar_url,
                createdAt: profile.created_at,
                updatedAt: profile.updated_at
              },
              isAuthenticated: true,
              isAdmin: profile.role === 'admin',
              isLoading: false
            });
            return;
          }
        }
      } catch (err) {
        console.error('Supabase auth initialization error, falling back to mock:', err);
      }
    }

    // Local Storage Mock Initialization
    const storedUser = localStorage.getItem('pawluxury_auth_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      set({
        user: parsedUser,
        isAuthenticated: true,
        isAdmin: parsedUser.role === 'admin'
      });
    } else {
      // Default to guest or auto-login with customer for frictionless prototype testing
      localStorage.setItem('pawluxury_auth_user', JSON.stringify(DEFAULT_MOCK_USER));
      set({
        user: DEFAULT_MOCK_USER,
        isAuthenticated: true,
        isAdmin: false
      });
    }
    set({ isLoading: false });
  },
  login: async (email: string, fullName?: string) => {
    set({ isLoading: true });
    if (isSupabaseConfigured() && supabase) {
      const client = supabase;
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email,
          password: 'password123', // Demo password
        });
        if (!error && data.user) {
          await get().initialize();
          return true;
        }
      } catch (err) {
        console.error('Supabase login error, falling back:', err);
      }
    }

    // Mock Login
    const isMockAdmin = email.toLowerCase().includes('admin');
    const mockUser: Profile = {
      id: isMockAdmin ? 'mock-admin-999' : 'mock-user-' + Math.floor(Math.random() * 1000),
      email: email,
      fullName: fullName || (isMockAdmin ? 'Platform Director' : 'Aesthetic Companion'),
      role: isMockAdmin ? 'admin' : 'customer',
      avatarUrl: isMockAdmin 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('pawluxury_auth_user', JSON.stringify(mockUser));
    set({
      user: mockUser,
      isAuthenticated: true,
      isAdmin: mockUser.role === 'admin',
      isLoading: false
    });
    return true;
  },

  register: async (email: string, fullName: string) => {
    set({ isLoading: true });
    if (isSupabaseConfigured() && supabase) {
      const client = supabase;
      try {
        const { data, error } = await client.auth.signUp({
          email,
          password: 'password123',
          options: {
            data: {
              full_name: fullName,
              role: 'customer'
            }
          }
        });
        if (error) throw error;
        if (data.user) {
          // Manual profiles insertion to ensure persistence
          const { error: profileErr } = await client.from('profiles').upsert([{
            id: data.user.id,
            email,
            full_name: fullName,
            role: 'customer',
            avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
          }]);
          if (profileErr) {
            console.error('Failed to create profile row in public.profiles:', profileErr);
          }
          await get().initialize();
          return true;
        }
      } catch (err) {
        console.error('Supabase registration error, falling back to mock:', err);
      }
    }

    // In Mock Mode we register instantly
    const mockUser: Profile = {
      id: 'mock-user-' + Math.floor(Math.random() * 1000),
      email,
      fullName,
      role: 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('pawluxury_auth_user', JSON.stringify(mockUser));
    set({
      user: mockUser,
      isAuthenticated: true,
      isAdmin: false,
      isLoading: false
    });
    return true;
  },

  logout: async () => {
    set({ isLoading: true });
    if (isSupabaseConfigured() && supabase) {
      const client = supabase;
      await client.auth.signOut();
    }
    localStorage.removeItem('pawluxury_auth_user');
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      isLoading: false
    });
  },

  setDemoRole: (role: UserRole) => {
    const currentUser = get().user;
    if (!currentUser) return;
    
    const updated = { ...currentUser, role };
    localStorage.setItem('pawluxury_auth_user', JSON.stringify(updated));
    set({
      user: updated,
      isAdmin: role === 'admin'
    });
  }
}));

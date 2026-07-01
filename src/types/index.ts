export type UserRole = 
  | 'customer' 
  | 'admin' 
  | 'manager_garden_area' 
  | 'manager_police_chowki' 
  | 'manager_hospital' 
  | 'manager_wholesale' 
  | 'manager_petstep';

export interface Profile {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  name: string;
  slug: string;
  type: 'retail' | 'hospital' | 'wholesale' | 'distribution';
  address: string;
  phone: string;
  whatsappNumber: string;
  upiId: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountName: string;
  createdAt: string;
}

export interface BranchManager {
  id: string;
  userId: string;
  branchId: string;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
}

export type ConsultationStatus = 'pending' | 'scheduled' | 'completed' | 'cancelled';

export interface Consultation {
  id: string;
  userId: string | null;
  userEmail?: string;
  petName: string;
  petType: string;
  petAge: string;
  symptoms: string;
  status: ConsultationStatus;
  scheduledAt: string | null;
  doctorNotes: string | null;
  createdAt: string;
  updatedAt: string;
  branchId?: string | null;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string | null;
  featuredImage: string | null;
  authorId: string;
  authorName?: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: string;
  title: string | null;
  subtitle: string | null;
  imageUrl: string;
  linkUrl: string | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

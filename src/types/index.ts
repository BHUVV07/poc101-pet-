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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number | null;
  stock: number;
  categoryId: string | null;
  isFeatured: boolean;
  rating: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  branchId?: string; // Mapped dynamically in shop/categories filters
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

export interface BranchInventory {
  id: string;
  branchId: string;
  productId: string;
  stock: number;
  price: number | null;
  isFeatured: boolean;
  isBestseller: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
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

export type OrderStatus = 'payment_pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'pending_verification' | 'paid' | 'failed';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string | null;
  productName: string;
  productImage: string | null;
  quantity: number;
  price: number;
}

export interface PaymentProof {
  id: string;
  orderId: string;
  userId: string;
  screenshotUrl: string;
  transactionId: string;
  verifiedBy: string | null;
  verificationNotes: string | null;
  createdAt: string;
  verifiedAt: string | null;
}

export interface Order {
  id: string;
  userId: string | null;
  userEmail?: string;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: Address;
  paymentStatus: PaymentStatus;
  trackingNumber: string | null;
  orderNotes: string | null;
  items: OrderItem[];
  paymentProof?: PaymentProof;
  createdAt: string;
  updatedAt: string;
  branchId?: string | null;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
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

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userFullName: string;
  rating: number;
  comment: string;
  createdAt: string;
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

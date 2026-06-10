'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, ChevronRight, Activity, ShieldCheck, HeartHandshake, MessageSquare } from 'lucide-react';
import { dbService } from '../../../services/dbService';
import { Product, Review } from '../../../types';
import { useWishlistStore } from '../../../store/wishlistStore';
import { useUIStore } from '../../../store/uiStore';
import ProductCard from '../../../components/product/ProductCard';

export default function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('narrative');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showNotification } = useUIStore();
  const isFavorite = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    async function loadProductData() {
      setLoading(true);
      const prod = await dbService.getProductBySlug(slug);
      if (prod) {
        setProduct(prod);
        setActiveImageIdx(0);

        // Fetch related products (same category)
        const allProds = await dbService.getProducts(prod.categoryId || undefined);
        setRelatedProducts(allProds.filter(p => p.id !== prod.id).slice(0, 3));

        // Create some premium mock reviews for this product
        const seedReviews: Review[] = [
          {
            id: `rev-${prod.id}-1`,
            productId: prod.id,
            userId: 'usr-1',
            userFullName: 'Margot Vane',
            rating: 5,
            comment: `Absolutely stunning quality. The fabric has a premium weight, and it sits beautifully. You can immediately feel the craftsmanship. Highly recommended for design-conscious owners.`,
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: `rev-${prod.id}-2`,
            productId: prod.id,
            userId: 'usr-2',
            userFullName: 'Vikram Sethi',
            rating: 4,
            comment: `Excellent product that exceeds ordinary pet store standards. The delivery took 3 days, and it arrived in a beautiful linen dust bag. Oliver loves it.`,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        setReviews(seedReviews);
      }
      setLoading(false);
    }
    loadProductData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-text-dark">Creation Not Found</h2>
        <p className="text-text-light text-sm">We could not locate the pet lifestyle piece you are searching for.</p>
        <Link
          href="/shop"
          className="inline-flex rounded-full bg-primary text-brand-bg px-8 py-3 text-sm font-semibold transition-colors"
        >
          Return to Boutique
        </Link>
      </div>
    );
  }

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(`Hi, I am interested in inquiring about the showcase product "${product.name}" at PawLuxury.`);
    const whatsappUrl = `https://wa.me/919876543210?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWishlistToggle = () => {
    const isFav = isInWishlist(product.id);
    toggleWishlist(product.id);
    showNotification(
      isFav ? 'Removed from Wishlist' : 'Saved to Wishlist',
      isFav 
        ? `${product.name} removed from your favorites.`
        : `${product.name} saved to your favorites.`,
      'info'
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-text-light">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-dark font-medium line-clamp-1">{product.name}</span>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Column: Image Slider & Thumbnails */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="aspect-square w-full rounded-lg overflow-hidden bg-surface relative shadow-sm">
            <img
              src={product.images[activeImageIdx] || 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800'}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`h-20 w-20 rounded-md overflow-hidden bg-surface border-2 transition-all cursor-pointer shrink-0 ${
                    activeImageIdx === idx ? 'border-primary' : 'border-transparent opacity-85 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Narrative Specifications and CTA */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-3">
            <span className="text-xs text-secondary uppercase tracking-widest font-bold">
              {product.categoryId === 'cat-1' && 'Gourmet Dining'}
              {product.categoryId === 'cat-2' && 'Haute Couture'}
              {product.categoryId === 'cat-3' && 'Living & Comfort'}
              {product.categoryId === 'cat-4' && 'Wellness & Care'}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-dark leading-tight">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center justify-between border-y border-surface pb-3 pt-2">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4.5 w-4.5 fill-current" />
                <span className="text-sm font-bold text-text-dark">{product.rating.toFixed(1)} / 5.0</span>
                <span className="text-xs text-text-light pl-1">({reviews.length} reviews)</span>
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded">
                Showcase Piece
              </span>
            </div>
          </div>

          <p className="text-sm text-text-light leading-relaxed">
            {product.description}
          </p>

          {/* Stock Alert */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-xs text-amber-500 font-semibold animate-pulse">
              Exclusive Piece: Only {product.stock} units remaining in storage.
            </p>
          )}

          {/* Inquiry Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            {/* WhatsApp Inquiry Button */}
            <button
              onClick={handleWhatsAppInquiry}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-600 py-3.5 px-8 text-sm font-semibold text-white shadow-md transition-all cursor-pointer"
              id="details-whatsapp-enquiry-btn"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              Enquire on WhatsApp
            </button>

            {/* Book Consultation Button */}
            <Link
              href="/consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-surface bg-brand-bg px-8 py-3.5 text-sm font-semibold text-text-dark hover:bg-surface transition-colors cursor-pointer"
            >
              Book Consultation
            </Link>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className={`h-12 w-12 rounded-full border border-surface bg-brand-bg flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                isFavorite ? 'text-red-500 hover:bg-surface' : 'text-text-dark hover:bg-surface'
              }`}
              title="Save to Wishlist"
            >
              <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Luxury assurances */}
          <div className="grid grid-cols-3 gap-4 border-t border-surface/50 pt-6 text-[10px] text-text-light">
            <div className="flex flex-col items-center text-center space-y-1.5">
              <Activity className="h-5 w-5 text-primary" />
              <span>Pedigree Quality Audited</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-1.5">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>Direct Branch Concierge</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-1.5">
              <HeartHandshake className="h-5 w-5 text-primary" />
              <span>Premium Support Desk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="border-t border-surface pt-10">
        <div className="flex border-b border-surface space-x-8">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === 'narrative' ? 'text-primary' : 'text-text-light hover:text-text-dark'
            }`}
          >
            Product Narrative
            {activeTab === 'narrative' && (
              <motion.span layoutId="activeTabLine" className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === 'details' ? 'text-primary' : 'text-text-light hover:text-text-dark'
            }`}
          >
            Craft Details
            {activeTab === 'details' && (
              <motion.span layoutId="activeTabLine" className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === 'reviews' ? 'text-primary' : 'text-text-light hover:text-text-dark'
            }`}
          >
            Reviews ({reviews.length})
            {activeTab === 'reviews' && (
              <motion.span layoutId="activeTabLine" className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />
            )}
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'narrative' && (
            <div className="text-sm text-text-light leading-relaxed max-w-3xl space-y-4">
              <p>
                Each design in our collection is curated to enhance your companion&apos;s daily lifestyle. By blending premium orthopedic support and luxurious fabrics, we manufacture products that maintain structural integrity while looking exquisite in your home.
              </p>
              <p>
                We collaborate with pediatric veterinarians to check angles and textures, ensuring absolute physical safety. Tested across multiple weights, fabrics are hand-finished and delivered in reusable signature protective envelopes.
              </p>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="text-sm text-text-light leading-relaxed max-w-xl">
              <table className="w-full text-left border-collapse text-xs">
                <tbody>
                  <tr className="border-b border-surface/50"><td className="py-2.5 font-bold text-text-dark uppercase">Materials</td><td className="py-2.5">Full-grain calf leather, memory foams, premium linens</td></tr>
                  <tr className="border-b border-surface/50"><td className="py-2.5 font-bold text-text-dark uppercase">Care Guide</td><td className="py-2.5">Dry clean only, leather conditioning every 6 months</td></tr>
                  <tr className="border-b border-surface/50"><td className="py-2.5 font-bold text-text-dark uppercase">Shipping</td><td className="py-2.5">Bespoke home delivery and physical branch collection options available</td></tr>
                  <tr><td className="py-2.5 font-bold text-text-dark uppercase">Customization</td><td className="py-2.5">Bespoke sizing and engraving options are available upon query</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-3xl">
              {reviews.map((rev) => (
                <div key={rev.id} className="space-y-2 border-b border-surface/40 pb-6 last:border-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-text-dark">{rev.userFullName}</h4>
                    <span className="text-[10px] text-text-light">{new Date(rev.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                  </div>
                  <div className="flex text-amber-500 gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-text-light leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-surface pt-16">
          <h3 className="font-serif text-2xl font-bold text-text-dark mb-8 text-center sm:text-left">Complementary Creations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

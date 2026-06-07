'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { dbService } from '../../../services/dbService';
import { Product, Category } from '../../../types';
import { Plus, Pencil, Trash2, X, PlusCircle, MinusCircle, UploadCloud } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';

// Product Form Validation Schema
const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  price: z.coerce.number().min(0, { message: 'Price must be >= 0.' }),
  salePrice: z.coerce.number().nullable().optional(),
  stock: z.coerce.number().int().min(0, { message: 'Stock must be >= 0.' }),
  categoryId: z.string().min(1, { message: 'Please select a category.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  imageUrl: z.string().url({ message: 'Please provide a valid image URL.' }),
  isFeatured: z.boolean().default(false)
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function AdminProducts() {
  const { showNotification } = useUIStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await dbService.uploadFile('products', file);
      setValue('imageUrl', url, { shouldValidate: true });
      showNotification('Upload Success', 'Product image uploaded successfully.', 'success');
    } catch (err: any) {
      console.error(err);
      showNotification('Upload Failed', err.message || 'Could not upload product image.', 'warning');
    } finally {
      setUploading(false);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(productFormSchema)
  });

  useEffect(() => {
    loadProductsAndCategories();
  }, []);

  async function loadProductsAndCategories() {
    setLoading(true);
    const prods = await dbService.getProducts();
    setProducts(prods);

    const cats = await dbService.getCategories();
    setCategories(cats);
    setLoading(false);
  }

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    reset({
      name: '',
      price: 0,
      salePrice: null,
      stock: 5,
      categoryId: categories[0]?.id || '',
      description: '',
      imageUrl: '',
      isFeatured: false
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    reset({
      name: prod.name,
      price: prod.price,
      salePrice: prod.salePrice,
      stock: prod.stock,
      categoryId: prod.categoryId || '',
      description: prod.description,
      imageUrl: prod.images[0] || '',
      isFeatured: prod.isFeatured
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to retire this creation from boutique storage?')) {
      await dbService.deleteProduct(id);
      showNotification('Product Retired', 'Creation was removed from catalog.', 'info');
      loadProductsAndCategories();
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (editingProduct) {
        // Update
        await dbService.updateProduct(editingProduct.id, {
          name: data.name,
          price: data.price,
          salePrice: data.salePrice || null,
          stock: data.stock,
          categoryId: data.categoryId,
          description: data.description,
          images: [data.imageUrl],
          isFeatured: data.isFeatured
        });
        showNotification('Creation Updated', `${data.name} was successfully modified.`, 'success');
      } else {
        // Create
        await dbService.createProduct({
          name: data.name,
          price: data.price,
          salePrice: data.salePrice || null,
          stock: data.stock,
          categoryId: data.categoryId,
          description: data.description,
          images: [data.imageUrl],
          isFeatured: data.isFeatured
        });
        showNotification('Creation Launched', `${data.name} added to catalog.`, 'success');
      }
      setShowModal(false);
      loadProductsAndCategories();
    } catch (err) {
      console.error(err);
      showNotification('Error', 'Could not save product.', 'warning');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header operations */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 font-mono">Creations Catalog</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Manage active boutique product entries and stock thresholds.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary/95 text-brand-bg px-5 py-2 text-xs font-semibold cursor-pointer"
          id="admin-add-product-btn"
        >
          <Plus className="h-4 w-4 text-brand-bg" />
          Add Creation
        </button>
      </div>

      {/* Grid Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-zinc-500 text-xs italic text-center py-12">No products found in database.</p>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono">
                <th className="p-4 uppercase">Item Image</th>
                <th className="p-4 uppercase">Name</th>
                <th className="p-4 uppercase">Category</th>
                <th className="p-4 uppercase">Price (INR)</th>
                <th className="p-4 uppercase">Stock</th>
                <th className="p-4 uppercase">Status</th>
                <th className="p-4 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-zinc-800/10">
                  <td className="p-4 shrink-0">
                    <img
                      src={prod.images[0] || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=100'}
                      alt={prod.name}
                      className="h-10 w-10 object-cover rounded bg-zinc-800 border border-zinc-700"
                    />
                  </td>
                  <td className="p-4 font-semibold text-zinc-100">{prod.name}</td>
                  <td className="p-4 text-zinc-400">
                    {categories.find(c => c.id === prod.categoryId)?.name || 'Unassigned'}
                  </td>
                  <td className="p-4">
                    ₹{prod.price.toLocaleString('en-IN')}
                    {prod.salePrice && <span className="text-[10px] text-amber-500 block">Sale: ₹{prod.salePrice.toLocaleString('en-IN')}</span>}
                  </td>
                  <td className="p-4 font-mono font-bold">
                    <span className={prod.stock <= 5 ? 'text-red-400' : 'text-zinc-300'}>{prod.stock} units</span>
                  </td>
                  <td className="p-4 font-bold">
                    {prod.isFeatured && <span className="bg-primary/20 text-primary border border-primary/50 text-[9px] uppercase font-mono px-2 py-0.5 rounded">Featured</span>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="text-zinc-400 hover:text-zinc-100 transition-colors p-1 cursor-pointer"
                        title="Edit details"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="text-zinc-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CRUD Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-zinc-950/80">
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6 text-xs text-zinc-300 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="font-serif text-lg font-bold text-zinc-100 uppercase tracking-wider">
                {editingProduct ? 'Modify Creation' : 'Register New Creation'}
              </h4>
              <button
                onClick={() => setShowModal(false)}
                className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="admin-product-crud-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Product Name</label>
                  <input
                    type="text"
                    {...register('name')}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                  />
                  {errors.name && <p className="text-[10px] text-red-400 font-semibold">{errors.name.message}</p>}
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Standard Price (INR)</label>
                  <input
                    type="number"
                    {...register('price')}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                  />
                  {errors.price && <p className="text-[10px] text-red-400 font-semibold">{errors.price.message}</p>}
                </div>

                {/* Discount price */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Discount Sale Price (Optional)</label>
                  <input
                    type="number"
                    placeholder="None"
                    {...register('salePrice')}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                  />
                  {errors.salePrice && <p className="text-[10px] text-red-400 font-semibold">{errors.salePrice.message}</p>}
                </div>

                {/* Stock */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Stock Units</label>
                  <input
                    type="number"
                    {...register('stock')}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                  />
                  {errors.stock && <p className="text-[10px] text-red-400 font-semibold">{errors.stock.message}</p>}
                </div>

                {/* Category selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Category Allocation</label>
                  <select
                    {...register('categoryId')}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="text-[10px] text-red-400 font-semibold">{errors.categoryId.message}</p>}
                </div>

                {/* Image URL */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Image Asset Link (Unsplash URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/photo-..."
                      {...register('imageUrl')}
                      className="flex-grow rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                    />
                    <label className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-750 px-3 py-2 rounded text-zinc-300 font-semibold cursor-pointer shrink-0 flex items-center justify-center min-w-[70px]">
                      {uploading ? (
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border border-zinc-500 border-t-primary" />
                      ) : (
                        'Upload'
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  {errors.imageUrl && <p className="text-[10px] text-red-400 font-semibold">{errors.imageUrl.message as string}</p>}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Product Narrative Narrative</label>
                <textarea
                  rows={3}
                  {...register('description')}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                />
                {errors.description && <p className="text-[10px] text-red-400 font-semibold">{errors.description.message}</p>}
              </div>

              {/* Features checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  {...register('isFeatured')}
                  className="h-4 w-4 bg-zinc-950 border border-zinc-800 rounded text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-[10px] font-bold uppercase tracking-wider font-mono text-zinc-300 select-none cursor-pointer">
                  Feature on Homepage Spotlight Slider
                </label>
              </div>

              {/* Form operations */}
              <div className="flex justify-end gap-2 border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded px-4 py-2 border border-zinc-700 text-zinc-300 hover:bg-zinc-850 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-primary text-brand-bg px-6 py-2 font-bold hover:bg-primary/95 cursor-pointer"
                  id="admin-product-submit-btn"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

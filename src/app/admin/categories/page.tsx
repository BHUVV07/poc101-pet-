'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { dbService } from '../../../services/dbService';
import { Category } from '../../../types';
import { Plus, X, FolderTree } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';

const categorySchema = z.object({
  name: z.string().min(3, { message: 'Category name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  imageUrl: z.string().url({ message: 'Please provide a valid image URL.' })
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function AdminCategories() {
  const { showNotification } = useUIStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema)
  });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    const data = await dbService.getCategories();
    setCategories(data);
    setLoading(false);
  }

  const handleOpenAddModal = () => {
    reset({
      name: '',
      description: '',
      imageUrl: ''
    });
    setShowModal(true);
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      await dbService.createCategory(data.name, data.description, data.imageUrl);
      showNotification('Boutique Added', `${data.name} collection created.`, 'success');
      setShowModal(false);
      loadCategories();
    } catch {
      showNotification('Error', 'Could not create category.', 'warning');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 font-mono">Boutique Categories</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Manage active boutique categories and descriptions.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary/95 text-brand-bg px-5 py-2 text-xs font-semibold cursor-pointer"
          id="admin-add-category-btn"
        >
          <Plus className="h-4 w-4 text-brand-bg" />
          Add Category
        </button>
      </div>

      {/* Grid listing */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
        </div>
      ) : categories.length === 0 ? (
        <p className="text-zinc-500 text-xs italic text-center py-12">No categories in database.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex gap-4 p-4 items-center">
              <img
                src={cat.imageUrl || ''}
                alt={cat.name}
                className="h-16 w-16 object-cover rounded bg-zinc-800 border border-zinc-700 shrink-0"
              />
              <div className="space-y-1 min-w-0 flex-1">
                <h4 className="font-serif text-sm font-bold text-zinc-100">{cat.name}</h4>
                <p className="text-[10px] text-zinc-500 font-mono">Slug: {cat.slug}</p>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80">
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6 text-xs text-zinc-300 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="font-serif text-lg font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                <FolderTree className="h-5 w-5 text-primary" />
                Add Category Boutique
              </h4>
              <button
                onClick={() => setShowModal(false)}
                className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="admin-category-crud-form">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Wellness & Apothecary"
                  {...register('name')}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                />
                {errors.name && <p className="text-[10px] text-red-400 font-semibold">{errors.name.message}</p>}
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Image Asset Link (Unsplash URL)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  {...register('imageUrl')}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                />
                {errors.imageUrl && <p className="text-[10px] text-red-400 font-semibold">{errors.imageUrl.message}</p>}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Boutique Narrative description</label>
                <textarea
                  rows={3}
                  placeholder="Detail the target lifestyle items and clinical values housed in this boutique..."
                  {...register('description')}
                  className="w-full rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                />
                {errors.description && <p className="text-[10px] text-red-400 font-semibold">{errors.description.message}</p>}
              </div>

              {/* Buttons */}
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
                  id="admin-category-submit-btn"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

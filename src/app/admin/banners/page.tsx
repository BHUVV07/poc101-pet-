'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../../services/dbService';
import { Banner } from '../../../types';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import { 
  Plus, Edit2, Trash2, Image, SwitchCamera, Check, X,
  Save, Eye, ArrowUp, ArrowDown 
} from 'lucide-react';

export default function BannersAdmin() {
  const { user } = useAuthStore();
  const { showNotification } = useUIStore();

  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Form states
  const [isNew, setIsNew] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await dbService.uploadFile('banners', file);
      setImageUrl(url);
      showNotification('Upload Success', 'Banner image uploaded successfully.', 'success');
    } catch (err: any) {
      console.error(err);
      showNotification('Upload Failed', err.message || 'Could not upload banner image.', 'warning');
    } finally {
      setUploading(false);
    }
  };

  async function loadBanners() {
    setLoading(true);
    const data = await dbService.getAllBanners();
    setBanners(data);
    setLoading(false);
  }

  useEffect(() => {
    loadBanners();
  }, []);

  const handleEditClick = (banner: Banner) => {
    setEditingBanner(banner);
    setIsNew(false);
    setTitle(banner.title || '');
    setSubtitle(banner.subtitle || '');
    setImageUrl(banner.imageUrl);
    setLinkUrl(banner.linkUrl || '');
    setIsActive(banner.isActive);
    setDisplayOrder(banner.displayOrder);
  };

  const handleNewClick = () => {
    setEditingBanner(null);
    setIsNew(true);
    setTitle('');
    setSubtitle('');
    setImageUrl('https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1200');
    setLinkUrl('/shop');
    setIsActive(true);
    setDisplayOrder(banners.length + 1);
  };

  const handleDelete = async (id: string, bannerTitle: string) => {
    if (!confirm(`Are you sure you want to delete banner "${bannerTitle}"?`)) return;

    try {
      await dbService.deleteBanner(id);
      await dbService.logActivity(
        'Banner Deleted',
        `banner:${id}`,
        `Deleted promotional banner slide "${bannerTitle}".`,
        user?.id
      );
      showNotification('Banner Deleted', 'The banner slide has been removed.', 'success');
      loadBanners();
    } catch (err) {
      console.error(err);
      showNotification('Error', 'Could not delete banner.', 'warning');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    setSaving(true);
    try {
      if (isNew) {
        await dbService.createBanner({
          title: title || null,
          subtitle: subtitle || null,
          imageUrl,
          linkUrl: linkUrl || null,
          isActive,
          displayOrder
        });
        await dbService.logActivity(
          'Banner Created',
          'banners',
          `Created new promotional slide: "${title || 'Untitled'}"`,
          user?.id
        );
        showNotification('Banner Created', 'Promo banner initialized.', 'success');
      } else if (editingBanner) {
        await dbService.updateBanner(editingBanner.id, {
          title: title || null,
          subtitle: subtitle || null,
          imageUrl,
          linkUrl: linkUrl || null,
          isActive,
          displayOrder
        });
        await dbService.logActivity(
          'Banner Updated',
          `banner:${editingBanner.id}`,
          `Updated banner metadata for "${title || 'Untitled'}"`,
          user?.id
        );
        showNotification('Banner Updated', 'Promotional layouts updated.', 'success');
      }

      setEditingBanner(null);
      setIsNew(false);
      loadBanners();
    } catch (err) {
      console.error(err);
      showNotification('Error', 'Could not save banner.', 'warning');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-zinc-100">
      <div className="flex justify-between items-center bg-zinc-900/40 p-4 border border-zinc-800 rounded-lg">
        <div className="text-xs text-zinc-500 font-mono">
          Configure sliding layouts for target homepage traffic.
        </div>
        <button
          onClick={handleNewClick}
          className="flex items-center gap-1 px-3.5 py-2 bg-primary text-brand-bg rounded hover:bg-primary/95 text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Slide
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Banners listing cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {banners.map((b) => (
              <div 
                key={b.id} 
                className={`bg-zinc-900 border rounded-lg overflow-hidden flex flex-col md:flex-row ${
                  editingBanner?.id === b.id ? 'border-primary' : 'border-zinc-800'
                }`}
              >
                {/* Visual Image container */}
                <div className="w-full md:w-48 h-32 md:h-auto shrink-0 relative bg-zinc-950">
                  <img src={b.imageUrl} alt="" className="h-full w-full object-cover" />
                  <span className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-bold font-mono border ${
                    b.isActive 
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                      : 'bg-zinc-950 text-zinc-400 border-zinc-850'
                  }`}>
                    {b.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase font-bold text-primary font-mono">Display Order: {b.displayOrder}</span>
                      <span className="text-[9px] text-zinc-500 font-mono">ID: {b.id}</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-zinc-200">{b.title || 'No Headline Title'}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{b.subtitle || 'No subtitle provided.'}</p>
                    {b.linkUrl && (
                      <p className="text-[10px] text-zinc-500 font-mono">Target URL: <code className="text-secondary">{b.linkUrl}</code></p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                    <button
                      onClick={() => handleEditClick(b)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-[10px] font-bold uppercase tracking-wider text-zinc-350 rounded border border-zinc-700 cursor-pointer"
                    >
                      <Edit2 className="h-3 w-3" />
                      Modify
                    </button>
                    <button
                      onClick={() => handleDelete(b.id, b.title || 'Untitled Banner')}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-red-950/40 hover:bg-red-950/70 text-[10px] font-bold uppercase tracking-wider text-red-400 rounded border border-red-900 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form (Add or Edit) */}
        <div>
          {(isNew || editingBanner) ? (
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-300 font-mono flex items-center gap-1.5">
                <Image className="h-4.5 w-4.5 text-primary" />
                {isNew ? 'New Slider Slide' : 'Modify Slide Parameters'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Headline Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter main layout title"
                    className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none"
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Supporting Subtitle</label>
                  <textarea
                    rows={2}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Provide supportive descriptions..."
                    className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Background Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-grow p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none font-mono text-[10px]"
                      required
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
                </div>

                {/* Target link URL */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Target Click URL</label>
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="e.g. /shop, /consultation"
                    className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none font-mono text-[10px]"
                  />
                </div>

                {/* Order & Active */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400">Display Order</label>
                    <input
                      type="number"
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                      className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400">Status Active</label>
                    <div className="flex items-center h-9">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="h-4 w-4 bg-zinc-950 border-zinc-800 rounded text-primary focus:ring-primary accent-primary"
                        id="active-checkbox"
                      />
                      <label htmlFor="active-checkbox" className="ml-2 font-bold text-zinc-300">Visible</label>
                    </div>
                  </div>
                </div>

                {/* Save actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-grow flex items-center justify-center gap-1.5 py-2.5 bg-primary hover:bg-primary/95 text-brand-bg rounded font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Slide'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBanner(null);
                      setIsNew(false);
                    }}
                    className="px-3.5 py-2.5 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 rounded font-semibold text-zinc-300 uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg text-center space-y-2 py-12">
              <Image className="h-8 w-8 text-zinc-650 mx-auto" />
              <h4 className="font-bold text-zinc-350 text-xs">Auditing Coordinates</h4>
              <p className="text-[11px] text-zinc-550 max-w-[200px] mx-auto leading-relaxed">
                Click Modify on any sliding layout or click Add Slide to configure dynamic content settings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../../services/dbService';
import { Blog } from '../../../types';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import { 
  Plus, Edit2, Trash2, BookOpen, Save, FileText, Check, 
  X, Calendar, Clock, RefreshCw, Sparkles 
} from 'lucide-react';

export default function BlogsAdmin() {
  const { user } = useAuthStore();
  const { showNotification } = useUIStore();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Form states
  const [isNew, setIsNew] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await dbService.uploadFile('blogs', file);
      setFeaturedImage(url);
      showNotification('Upload Success', 'Cover image uploaded successfully.', 'success');
    } catch (err: any) {
      console.error(err);
      showNotification('Upload Failed', err.message || 'Could not upload cover image.', 'warning');
    } finally {
      setUploading(false);
    }
  };

  async function loadBlogs() {
    setLoading(true);
    const data = await dbService.getBlogs(false); // Fetch draft and published posts
    setBlogs(data);
    setLoading(false);
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleEditClick = (blog: Blog) => {
    setEditingBlog(blog);
    setIsNew(false);
    setTitle(blog.title);
    setSummary(blog.summary || '');
    setContent(blog.content);
    setFeaturedImage(blog.featuredImage || '');
    setAuthorName(blog.authorName || '');
    setIsPublished(blog.isPublished);
  };

  const handleNewClick = () => {
    setEditingBlog(null);
    setIsNew(true);
    setTitle('');
    setSummary('');
    setContent('');
    setFeaturedImage('https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800');
    setAuthorName('Dr. Evelyn Sterling, DVM');
    setIsPublished(true);
  };

  const handleDelete = async (id: string, blogTitle: string) => {
    if (!confirm(`Are you sure you want to delete article "${blogTitle}"?`)) return;

    try {
      await dbService.deleteBlog(id);
      await dbService.logActivity(
        'Article Deleted',
        `blog:${id}`,
        `Deleted editorial article post "${blogTitle}".`,
        user?.id
      );
      showNotification('Article Removed', 'The blog article has been deleted.', 'success');
      loadBlogs();
    } catch (err) {
      console.error(err);
      showNotification('Error', 'Could not delete blog post.', 'warning');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setSaving(true);
    try {
      if (isNew) {
        await dbService.createBlog({
          title,
          summary: summary || null,
          content,
          featuredImage: featuredImage || null,
          authorId: user?.id || 'admin-999',
          authorName: authorName || 'Staff Writer',
          isPublished
        });
        await dbService.logActivity(
          'Article Created',
          'blogs',
          `Published new article: "${title}"`,
          user?.id
        );
        showNotification('Article Published', 'New blog entry loaded.', 'success');
      } else if (editingBlog) {
        await dbService.updateBlog(editingBlog.id, {
          title,
          summary: summary || null,
          content,
          featuredImage: featuredImage || null,
          authorName: authorName || 'Staff Writer',
          isPublished
        });
        await dbService.logActivity(
          'Article Updated',
          `blog:${editingBlog.id}`,
          `Updated metadata details for "${title}"`,
          user?.id
        );
        showNotification('Article Updated', 'Blog logs compiled.', 'success');
      }

      setEditingBlog(null);
      setIsNew(false);
      loadBlogs();
    } catch (err) {
      console.error(err);
      showNotification('Error', 'Could not save article.', 'warning');
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
          Write and configure educational veterinary columns or style narratives.
        </div>
        <button
          onClick={handleNewClick}
          className="flex items-center gap-1 px-3.5 py-2 bg-primary text-brand-bg rounded hover:bg-primary/95 text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Write Article
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Article listings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {blogs.map((b) => (
              <div 
                key={b.id}
                className={`bg-zinc-900 border rounded-lg overflow-hidden flex flex-col md:flex-row ${
                  editingBlog?.id === b.id ? 'border-primary' : 'border-zinc-800'
                }`}
              >
                {/* Image */}
                <div className="w-full md:w-52 h-36 md:h-auto shrink-0 relative bg-zinc-950">
                  <img src={b.featuredImage || ''} alt="" className="h-full w-full object-cover" />
                  <span className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-bold font-mono border ${
                    b.isPublished 
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                      : 'bg-zinc-950 text-zinc-400 border-zinc-850'
                  }`}>
                    {b.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                      <span>By {b.authorName || 'Staff Writer'}</span>
                      <span>ID: {b.id}</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-zinc-200">{b.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{b.summary}</p>
                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 pt-1">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(b.createdAt).toLocaleDateString('en-IN', { dateStyle: 'short' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                    <button
                      onClick={() => handleEditClick(b)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-[10px] font-bold uppercase tracking-wider text-zinc-350 rounded border border-zinc-700 cursor-pointer"
                    >
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id, b.title)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-red-950/40 hover:bg-red-950/70 text-[10px] font-bold uppercase tracking-wider text-red-400 rounded border border-red-900 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Blog CRUD form */}
        <div>
          {(isNew || editingBlog) ? (
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-300 font-mono flex items-center gap-1.5">
                <FileText className="h-4.5 w-4.5 text-primary" />
                {isNew ? 'Draft New Article' : 'Modify Article Content'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Article Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Holistic Pet Wellness Guide"
                    className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none"
                    required
                  />
                </div>

                {/* Author Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Dr. Evelyn Sterling, DVM"
                    className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none"
                  />
                </div>

                {/* Cover Image URL */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Featured Cover Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-grow p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none font-mono text-[10px]"
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

                {/* Summary */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Short Summary</label>
                  <textarea
                    rows={2}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Give a quick outline of the article..."
                    className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">Body Content (Markdown Supported)</label>
                  <textarea
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write body content here..."
                    className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded text-zinc-150 focus:outline-none font-mono text-[11px]"
                    required
                  />
                </div>

                {/* Publish Toggle */}
                <div className="space-y-1.5">
                  <div className="flex items-center h-8">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="h-4 w-4 bg-zinc-950 border-zinc-800 rounded text-primary focus:ring-primary accent-primary"
                      id="publish-checkbox"
                    />
                    <label htmlFor="publish-checkbox" className="ml-2 font-bold text-zinc-300">Publish immediately</label>
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
                    {saving ? 'Compiling...' : 'Save Post'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlog(null);
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
              <BookOpen className="h-8 w-8 text-zinc-650 mx-auto" />
              <h4 className="font-bold text-zinc-350 text-xs">Editorial Desk</h4>
              <p className="text-[11px] text-zinc-550 max-w-[200px] mx-auto leading-relaxed">
                Click Edit on any article listing or select Write Article to create new drafts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

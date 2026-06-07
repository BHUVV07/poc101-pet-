'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { dbService } from '../../../services/dbService';
import { Blog } from '../../../types';

export default function BlogDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      setLoading(true);
      const data = await dbService.getBlogBySlug(slug);
      setBlog(data);
      setLoading(false);
    }
    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-text-dark">Article Not Found</h2>
        <p className="text-text-light text-sm">We could not locate the editorial article you are looking for.</p>
        <Link
          href="/blog"
          className="inline-flex rounded-full bg-primary text-brand-bg px-8 py-3 text-sm font-semibold transition-colors"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  // Format content paragraphs nicely
  const paragraphs = blog.content.split('\n\n');

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-text-light">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-dark font-medium line-clamp-1">{blog.title}</span>
      </div>

      {/* Back Button */}
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-1 text-xs font-semibold text-text-dark hover:text-primary transition-colors pb-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Gazette
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text-dark leading-tight">
          {blog.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-xs text-text-light border-y border-surface py-3">
          <span className="flex items-center gap-1.5 font-semibold text-text-dark">
            <User className="h-4 w-4 text-primary" />
            {blog.authorName || 'Staff Writer'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(blog.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            4 min read
          </span>
        </div>
      </div>

      {/* Featured Cover Image */}
      {blog.featuredImage && (
        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-surface shadow-sm">
          <img src={blog.featuredImage} alt={blog.title} className="h-full w-full object-cover" />
        </div>
      )}

      {/* Body Content */}
      <div className="prose prose-stone max-w-none text-sm sm:text-base text-text-light leading-relaxed space-y-6">
        {paragraphs.map((p, index) => {
          // Check if paragraph starts with heading tags
          if (p.trim().startsWith('###')) {
            return (
              <h3 key={index} className="font-serif text-xl sm:text-2xl font-bold text-text-dark pt-4">
                {p.replace('###', '').trim()}
              </h3>
            );
          }
          return <p key={index}>{p}</p>;
        })}
      </div>
    </article>
  );
}

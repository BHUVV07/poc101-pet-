'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { dbService } from '../../services/dbService';
import { Blog } from '../../types';

export default function BlogIndex() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      const data = await dbService.getBlogs(true);
      setBlogs(data);
      setLoading(false);
    }
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface border-t-primary" />
      </div>
    );
  }

  const featuredPost = blogs[0];
  const secondaryPosts = blogs.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-secondary">The Gazette</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-dark mt-2">Editorial Narrative</h1>
        <p className="text-sm text-text-light mt-3 leading-relaxed">
          Read expert columns on pediatric pet care, holistic lifestyle design, cellular nutrition, and organic apothecary practices.
        </p>
      </div>

      {/* Featured Post (Big Hero Card) */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-8 items-center bg-surface/20 border border-surface/20 rounded-lg overflow-hidden"
        >
          {/* Cover Image */}
          <div className="w-full lg:w-7/12 aspect-[16/10] bg-surface relative overflow-hidden shrink-0">
            <img
              src={featuredPost.featuredImage || ''}
              alt={featuredPost.title}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
            />
          </div>

          {/* Details */}
          <div className="p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-4 text-xs text-text-light">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(featuredPost.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                4 min read
              </span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-dark hover:text-primary transition-colors">
              <Link href={`/blog/${featuredPost.slug}`}>
                {featuredPost.title}
              </Link>
            </h2>

            <p className="text-sm text-text-light leading-relaxed">
              {featuredPost.summary}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-surface/40">
              <div className="text-xs font-semibold text-text-dark">
                By {featuredPost.authorName || 'Staff Writer'}
              </div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors font-bold uppercase tracking-wider"
                id="blog-featured-read-btn"
              >
                Read Article <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Secondary Posts Grid */}
      {secondaryPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {secondaryPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col bg-brand-bg rounded-lg border border-surface/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="aspect-[16/10] w-full bg-surface overflow-hidden">
                <Link href={`/blog/${post.slug}`}>
                  <img
                    src={post.featuredImage || ''}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-text-light">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      3 min read
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-text-dark line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-text-light leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface/30">
                  <span className="text-[11px] font-semibold text-text-dark">
                    By {post.authorName || 'Staff Writer'}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors font-bold uppercase tracking-wider"
                    id={`blog-grid-btn-${post.slug}`}
                  >
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostFormPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.id as string;
  const isEditing = postId && postId !== "create";

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    image: "",
    published: false,
  });

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchPost();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${postId}`);
      const data = await res.json();
      if (data.success) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/admin/posts/${postId}` : "/api/admin/posts";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin/posts");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Link href="/admin/posts" className="flex items-center gap-2 text-gold hover:text-gold/80 transition">
        <ArrowLeft size={20} />
        Back to Posts
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-white">{isEditing ? "Edit Post" : "Create Post"}</h1>
        <p className="text-slate-400 mt-1">
          {isEditing ? "Update your post content" : "Create a new blog post"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 border border-slate-800 rounded-lg p-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={generateSlug}
            placeholder="Post title"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Slug *</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="post-title-slug"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition"
            required
          />
          <p className="text-xs text-slate-400 mt-1">Auto-generated from title, but you can edit it</p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Brief summary of the post"
            rows={3}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Full post content (supports HTML)"
            rows={10}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition font-mono text-sm"
            required
          />
        </div>

        {/* Category & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-gold focus:outline-none transition"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-4 h-4 rounded border-slate-600 text-gold focus:ring-gold"
          />
          <label htmlFor="published" className="text-sm font-medium text-white cursor-pointer">
            Publish immediately
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-6 border-t border-slate-700">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:brightness-95 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
          </button>
          <Link
            href="/admin/posts"
            className="px-6 py-2 rounded-lg font-semibold border border-slate-700 text-slate-300 hover:border-slate-600 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

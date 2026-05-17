"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit2, Plus } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#C9A84C",
  });

  useEffect(() => {
    fetchCategories();
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
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId("new");
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: "#C9A84C",
    });
  };

  const handleEdit = (category: Category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingId === "new" ? "POST" : "PUT";
      const url = editingId === "new" ? "/api/admin/categories" : `/api/admin/categories/${editingId}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setEditingId(null);
        fetchCategories();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCategories(categories.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <p className="text-slate-400 mt-1">Organize your content</p>
        </div>
        {editingId === null && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:brightness-95 transition"
          >
            <Plus size={20} />
            New Category
          </button>
        )}
      </div>

      {editingId && (
        <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingId === "new" ? "Create Category" : "Edit Category"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={generateSlug}
                placeholder="Category name"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-gold focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="category-slug"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-gold focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Category description"
              rows={3}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-16 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                readOnly
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="submit"
              className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:brightness-95 transition"
            >
              Save Category
            </button>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-6 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-lg">
          <p className="text-slate-400 mb-4">No categories yet</p>
          <button
            onClick={handleAddNew}
            className="inline-block bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:brightness-95 transition"
          >
            Create your first category
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800 border-b border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Color</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-slate-800 transition">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{category.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{category.slug}</td>
                  <td className="px-6 py-4">
                    <div
                      className="w-8 h-8 rounded border border-slate-700"
                      style={{ backgroundColor: category.color }}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-2 text-red-400 hover:bg-red-900/20 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

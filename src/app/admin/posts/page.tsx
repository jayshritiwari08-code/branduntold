"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Edit2, Plus } from "lucide-react";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Posts</h1>
          <p className="text-slate-400 mt-1">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/create"
          className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:brightness-95 transition"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-lg">
          <p className="text-slate-400 mb-4">No posts yet</p>
          <Link
            href="/admin/posts/create"
            className="inline-block bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:brightness-95 transition"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800 border-b border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">Created</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-slate-800 transition">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{post.title}</p>
                    <p className="text-sm text-slate-400">{post.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        post.published
                          ? "bg-green-900/30 text-green-400"
                          : "bg-yellow-900/30 text-yellow-400"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post._id}`}
                        className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => deletePost(post._id)}
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

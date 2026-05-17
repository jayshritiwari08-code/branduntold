"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Tag, Settings, LogOut, Layers } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  if (!session || (session as any)?.user?.role !== "admin") {
    redirect("/admin/login");
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: FileText, label: "Posts", href: "/admin/posts" },
    { icon: Tag, label: "Categories", href: "/admin/categories" },
    { icon: Layers, label: "Sections", href: "/admin/sections" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gold mb-1">Admin Panel</h2>
          <p className="text-sm text-slate-400">Jayshree CMS</p>
        </div>

        <nav className="space-y-2 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-800 pt-6">
          <div className="mb-4 p-3 bg-slate-800 rounded-lg">
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-semibold text-white">{(session as any)?.user?.email}</p>
            <p className="text-xs text-gold capitalize">{(session as any)?.user?.role}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-2 rounded-lg px-4 py-2 bg-slate-800 text-slate-300 hover:bg-red-900/20 hover:text-red-400 transition"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400 mb-8">Welcome to your admin panel. Manage posts, categories, and settings.</p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h3 className="text-slate-400 text-sm font-semibold mb-2">Total Posts</h3>
              <p className="text-3xl font-bold text-gold">--</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h3 className="text-slate-400 text-sm font-semibold mb-2">Categories</h3>
              <p className="text-3xl font-bold text-gold">--</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h3 className="text-slate-400 text-sm font-semibold mb-2">Users</h3>
              <p className="text-3xl font-bold text-gold">--</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/admin/posts/create"
              className="block p-6 bg-slate-900 border border-slate-800 rounded-lg hover:border-gold/50 hover:bg-slate-800/50 transition"
            >
              <FileText className="text-gold mb-2" size={28} />
              <h3 className="text-lg font-semibold text-white mb-1">Create New Post</h3>
              <p className="text-sm text-slate-400">Write and publish a new article</p>
            </Link>
            <Link
              href="/admin/categories"
              className="block p-6 bg-slate-900 border border-slate-800 rounded-lg hover:border-gold/50 hover:bg-slate-800/50 transition"
            >
              <Tag className="text-gold mb-2" size={28} />
              <h3 className="text-lg font-semibold text-white mb-1">Manage Categories</h3>
              <p className="text-sm text-slate-400">Organize your content with categories</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Admin | The Story Behind",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 py-4 sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Admin Panel</p>
            <h1 className="text-2xl font-semibold">Jayshree Dashboard</h1>
          </div>
          <nav className="flex items-center gap-3 text-sm text-slate-300">
            <Link href="/" className="rounded-lg border border-slate-700 px-4 py-2 transition hover:border-slate-500 hover:text-white">
              Public Site
            </Link>
            <Link href="/admin" className="rounded-lg bg-gold px-4 py-2 text-black font-semibold transition hover:brightness-95">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}

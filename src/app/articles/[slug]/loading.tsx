export default function BlogPostLoading() {
  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden animate-pulse"
      style={{
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="152" height="152" viewBox="0 0 152 152"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="temple" fill="%23d4af37" fill-opacity="0.06"%3E%3Cpath d="M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative">
        {/* Banner Skeleton */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#c2a15f]/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 relative">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="h-4 w-12 bg-gray-800 rounded"></div>
              <div className="text-gray-600">/</div>
              <div className="h-4 w-20 bg-gray-800 rounded"></div>
              <div className="text-gray-600">/</div>
              <div className="h-4 w-32 bg-gray-800 rounded text-transparent">Loading...</div>
            </div>

            <div className="text-center mb-8">
              <div className="h-4 w-24 bg-[#c2a15f]/20 rounded mx-auto mb-4"></div>
              <div className="h-10 md:h-14 w-2/3 md:w-1/2 bg-gray-800 rounded mx-auto mb-6"></div>
              <div className="flex items-center justify-center gap-4">
                <div className="h-4 w-24 bg-gray-800 rounded"></div>
                <div className="h-4 w-4 bg-gray-800 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Featured Image Skeleton */}
              <div className="aspect-video rounded-3xl bg-gray-900 border border-[#c2a15f]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
              </div>

              {/* Article Body Skeleton */}
              <div
                className="rounded-3xl p-8 md:p-12 space-y-6"
                style={{
                  background: 'linear-gradient(160deg, #141414 0%, #0c0c0c 100%)',
                  border: '1px solid rgba(212,175,55,0.12)',
                }}
              >
                <div className="h-6 w-1/4 bg-[#c2a15f]/20 rounded mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-800 rounded"></div>
                  <div className="h-4 w-11/12 bg-gray-800 rounded"></div>
                  <div className="h-4 w-full bg-gray-800 rounded"></div>
                  <div className="h-4 w-10/12 bg-gray-800 rounded"></div>
                  <div className="h-4 w-9/12 bg-gray-800 rounded"></div>
                </div>
                <div className="h-8 w-1/3 bg-gray-800 rounded pt-4"></div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-800 rounded"></div>
                  <div className="h-4 w-11/12 bg-gray-800 rounded"></div>
                  <div className="h-4 w-full bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div
                className="rounded-3xl p-6 border border-[#c2a15f]/20 bg-black h-[450px] flex flex-col justify-between"
                style={{ background: 'linear-gradient(160deg, #141414 0%, #0c0c0c 100%)' }}
              >
                <div>
                  <div className="h-4 w-1/4 bg-[#c2a15f]/20 rounded mb-3"></div>
                  <div className="h-6 w-2/3 bg-gray-800 rounded mb-4"></div>
                  <div className="w-16 h-px bg-[#c2a15f]/20 mt-3 mb-6"></div>
                </div>
                <div className="flex-1 bg-gray-900/40 rounded-2xl border border-gray-800/50 p-4 flex flex-col justify-between">
                  <div className="aspect-video w-full bg-gray-800/50 rounded-xl animate-pulse"></div>
                  <div className="h-3 w-1/4 bg-[#c2a15f]/10 rounded mt-4"></div>
                  <div className="h-5 w-3/4 bg-gray-800/80 rounded mt-2 mb-2"></div>
                </div>
                <div className="h-10 w-full bg-[#c2a15f]/10 rounded-xl mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

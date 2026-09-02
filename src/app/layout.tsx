import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { fetchStaticMeta, getOneFromCollectionApi } from "@/app/lib/api";
import "@fontsource/mona-sans/400.css";
import "@fontsource/mona-sans/500.css";
import "@fontsource/mona-sans/600.css";
import "@fontsource/mona-sans/700.css";
import "@fontsource/mona-sans/800.css";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";
import TawkTo from "@/components/TawkTo";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [meta, footerData] = await Promise.all([
    fetchStaticMeta(''),
    getOneFromCollectionApi('footer'),
  ]);

  let dynamicLogo = footerData?.footerlogo || footerData?.favicon;
  if (Array.isArray(dynamicLogo)) {
    dynamicLogo = dynamicLogo[0];
  }
  const logoUrl = dynamicLogo
    ? (dynamicLogo.startsWith('http') ? dynamicLogo : `https://admin.branduntold.in${dynamicLogo.startsWith('/') ? '' : '/'}${dynamicLogo}`)
    : "https://admin.branduntold.in/uploads/1779986882643-l8lu45m8gxf.png";

  const defaultTitle = meta?.metatitle || "The Story Behind | Storytelling Platform";
  const defaultDesc = meta?.meta_description || "A clean, minimal, content-focused platform for high-quality articles and stories about founders, brands, and storytelling.";
  const keywords = Array.isArray(meta?.meta_keyword)
    ? meta.meta_keyword
    : typeof meta?.meta_keyword === 'string'
      ? meta.meta_keyword.split(',').map((k: string) => k.trim())
      : [];

  return {
    metadataBase: new URL("https://www.branduntold.in"),
    title: defaultTitle,
    description: defaultDesc,
    keywords: keywords,
    icons: {
      icon: logoUrl,
      shortcut: logoUrl,
      apple: logoUrl,
    },
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      url: "https://www.branduntold.in",
      siteName: "Brand Untold",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: logoUrl,
          width: 500,
          height: 500,
          alt: "Brand Untold Logo",
        },
      ],
    },
    alternates: {
      canonical: meta?.canonical || "/",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MFXTKF5J');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MFXTKF5J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <TawkTo />
        </Providers>
      </body>
    </html>
  );
}
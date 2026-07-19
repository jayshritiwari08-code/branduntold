// app/work-with-me/page.tsx  — ISR Server Component
// Data is fetched at build time and revalidated only when new data is added/removed.
// No 'use client' here; interactivity lives in the Client Components below.

import { Metadata } from 'next';
import WorkWithMeClient from '../components/Workwithmeclient';
import { getOneFromCollectionApi, getFromCollectionApi, fetchStaticMeta } from '@/app/lib/api';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface ContactUsHeading {
  tagline?: string;
  subheading?: string;
}

export interface ServicesData {
  description?: string;
  heading?: string;
  card_heading?: string[];
  cards_description?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  ans: string;
  created_at: string;
  updated_at: string;
}

export interface FooterData {
  email?: string;
  address?: string;
  map?: string;
}

// ─── ISR Data Fetchers ────────────────────────────────────────────────────────
// Each fetch uses Next.js extended `fetch` with `revalidate`.
// Set the value (in seconds) to however often you expect data to change,
// or use `revalidate = false` (cache forever) + on-demand revalidation via
// a webhook / revalidateTag() when your CMS updates.

// ─── Optional: page-level revalidation interval (seconds) ────────────────────
// This acts as the fallback if individual fetches don't specify their own.
export const revalidate = 0;

// ─── Metadata (also benefits from ISR) ───────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const meta = await fetchStaticMeta('work-with-me');
  if (!meta) {
    return {
      title: 'Work With Me',
      description: "Let's craft your brand's story together.",
    };
  }
  return {
    title: meta.metatitle,
    description: meta.meta_description,
    keywords: meta.meta_keyword,
  };
}

// ─── Page (Server Component) ─────────────────────────────────────────────────
export default async function WorkWithMePage() {
  // All fetches run in parallel — no waterfall
  const [contactUsHeading, contactFormHeading, servicesData, footerData, faqData, pageMeta] = await Promise.all([
    getOneFromCollectionApi('heading', { section: 'Contact Us' }),
    getOneFromCollectionApi('heading', { section: 'contact form' }),
    getOneFromCollectionApi('services'),
    getOneFromCollectionApi('footer'),
    getFromCollectionApi('faq'),
    fetchStaticMeta('work-with-me'),
  ]);

  return (
    <>
      {pageMeta?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: pageMeta.schema }}
        />
      )}
      <WorkWithMeClient
        contactUsHeading={contactUsHeading}
        contactFormHeading={contactFormHeading}
        servicesData={servicesData}
        footerData={footerData}
        faqData={faqData}
      />
    </>
  );
}
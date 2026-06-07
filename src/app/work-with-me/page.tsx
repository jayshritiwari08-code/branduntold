// app/work-with-me/page.tsx  — ISR Server Component
// Data is fetched at build time and revalidated only when new data is added/removed.
// No 'use client' here; interactivity lives in the Client Components below.

import { Metadata } from 'next';
import WorkWithMeClient from '../components/Workwithmeclient';

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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

async function getHeadingBySection(section: string): Promise<ContactUsHeading | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/data/heading?section=${encodeURIComponent(section)}`,
      {
        next: {
          // Revalidate every 60 s — swap for { tags: ['headings'] } + on-demand if you prefer
          revalidate: 60,
        },
      },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch {
    return null;
  }
}

async function getServicesData(): Promise<ServicesData | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/data/services`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch {
    return null;
  }
}

async function getFAQData(): Promise<FAQItem[] | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/data/faq`, {
      next: {
        revalidate: 60,
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : null;
  } catch {
    return null;
  }
}

async function getFooterData(): Promise<FooterData | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/data/footer`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch {
    return null;
  }
}

// ─── Optional: page-level revalidation interval (seconds) ────────────────────
// This acts as the fallback if individual fetches don't specify their own.
export const revalidate = 60;

// ─── Metadata (also benefits from ISR) ───────────────────────────────────────
export const metadata: Metadata = {
  title: 'Work With Me',
  description: "Let's craft your brand's story together.",
};

// ─── Page (Server Component) ─────────────────────────────────────────────────
export default async function WorkWithMePage() {
  // All three fetches run in parallel — no waterfall
  const [contactUsHeading, contactFormHeading, servicesData, footerData, faqData] = await Promise.all([
    getHeadingBySection('Contact Us'),
    getHeadingBySection('contact form'),
    getServicesData(),
    getFooterData(),
    getFAQData(),
  ]);


  return (
    <WorkWithMeClient
      contactUsHeading={contactUsHeading}
      contactFormHeading={contactFormHeading}
      servicesData={servicesData}
      footerData={footerData}
      faqData={faqData}
    />
  );
}
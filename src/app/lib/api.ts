// src/app/lib/api.ts

/**
 * Centralised API utilities for the Next.js site.
 * Provides base URLs, fetch options with ISR revalidation, and helper functions
 * for fetching articles, categories and slugs.
 */

export const REVALIDATE_SECONDS = 60; // default ISR interval (can be overridden per page)

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

// export const API_URL duplicate removed

/**
 * Shared fetch options – Next.js ISR revalidation.
 */
export const FETCH_OPTS = { next: { revalidate: REVALIDATE_SECONDS } } as const;

export const ARTICLES_COLLECTION = 'articles'; // matches CMS collection name
export const CATEGORIES_COLLECTION = 'category';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

/** Build absolute API URL */
export const buildApiUrl = (path: string) => API_URL ? new URL(path, API_URL).toString() : path;

/** Fetch a single article by slug */
export async function fetchArticle(slug: string) {
  try {
    const res = await fetch(buildApiUrl(`/api/data/${ARTICLES_COLLECTION}?slug=${encodeURIComponent(slug)}`), FETCH_OPTS);
    const json = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      return Array.isArray(json.data) ? json.data[0] : json.data;
    }
    // fallback: fetch all and find manually
    const allRes = await fetch(buildApiUrl(`/api/data/${ARTICLES_COLLECTION}`), FETCH_OPTS);
    const allJson = await allRes.json();
    if (allJson.success && Array.isArray(allJson.data)) {
      return allJson.data.find((a: any) => a.slug === slug || a.id === slug) || null;
    }
    return null;
  } catch (err) {
    console.error('fetchArticle error', err);
    return null;
  }
}

/** Fetch all categories (no filter) */
export async function fetchAllCategories() {
  try {
    const res = await fetch(buildApiUrl('/api/data/category'), FETCH_OPTS);
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    console.error('fetchAllCategories error', err);
    return [];
  }
}

/** Fetch a single category by slug */
export async function fetchCategoryBySlug(slug: string) {
  try {
    const res = await fetch(buildApiUrl(`/api/data/category?slug=${encodeURIComponent(slug)}`), FETCH_OPTS);
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    console.error('fetchCategoryBySlug error', err);
    return [];
  }
}

/** Fetch all articles */
export async function fetchAllArticles() {
  try {
    const res = await fetch(buildApiUrl(`/api/data/${ARTICLES_COLLECTION}`), FETCH_OPTS);
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    console.error('fetchAllArticles error', err);
    return [];
  }
}

/** Fetch only slugs (and ids) for generateStaticParams */
export async function fetchAllArticleSlugs() {
  try {
    const res = await fetch(buildApiUrl(`/api/data/${ARTICLES_COLLECTION}?fields=slug,id`), FETCH_OPTS);
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.error('fetchAllArticleSlugs error', err);
    return [];
  }
}

/** Fetch only category slugs for static params */
export async function fetchAllCategorySlugs() {
  try {
    const res = await fetch(buildApiUrl('/api/data/category'), FETCH_OPTS);
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.error('fetchAllCategorySlugs error', err);
    return [];
  }
}

// Simple slugify utility – converts a string into URL-friendly slug
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // decompose diacritics
    .replace(/[\u0300-\u036f]/g, '') // remove diacritic marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // strip invalid chars
    .replace(/[\s_-]+/g, '-') // collapse whitespace & underscores to hyphen
    .replace(/^-+|-+$/g, ''); // trim hyphens
}
export interface HeroData {
  id: string;
  tagline: string;
  heading: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

/** Fetch hero section data */
export async function getHeroData(): Promise<{ data: HeroData | null; error: string | null }> {
  try {
    const res = await fetch(buildApiUrl('/api/data/herosec'), FETCH_OPTS);
    const json = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      return { data: json.data[0], error: null };
    }
    return { data: null, error: json.error || 'No hero data' };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

/** Fetch about us data */
export async function getAboutUsData(): Promise<{ data: any | null; error: string | null }> {
  try {
    const res = await fetch(buildApiUrl('/api/data/about_us'), FETCH_OPTS);
    const json = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      return { data: json.data[0], error: null };
    }
    return { data: null, error: json.error || 'No about data' };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

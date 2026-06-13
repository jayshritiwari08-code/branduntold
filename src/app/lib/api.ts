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
export const NO_CACHE_OPTS = { cache: "no-store" } as const;

export const ARTICLES_COLLECTION = 'articles'; // matches CMS collection name
export const CATEGORIES_COLLECTION = 'category';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin.branduntold.in';

/**
 * Resolve an image URL from the CMS.
 * - Absolute URLs (http/https) are returned as-is.
 * - Relative paths like /uploads/... are prefixed with the CMS base URL.
 * - Fallback is returned when the src is empty/undefined.
 */
export function getImageUrl(src: any, fallback = '/placeholder.jpg'): string {
  if (!src) return fallback;
  // If it's an array, take the first element
  if (Array.isArray(src)) {
    src = src[0];
  }
  // Ensure src is a string
  if (typeof src !== 'string' || !src) return fallback;
  // Already an absolute URL — use as-is
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  // Relative path — prefix with CMS base URL
  return `${API_URL}${src.startsWith('/') ? '' : '/'}${src}`;
}

/**
 * Build absolute API URL. During static generation the external API may not be running.
 * In that case we fall back to using the same site’s base URL (BASE_URL) which resolves to the
 * internal API routes provided by Next.js.
 */
export const buildApiUrl = (path: string) => {
  // Prefer external API URL if configured
  if (API_URL) {
    try {
      return new URL(path, API_URL).toString();
    } catch {
      console.warn('Invalid API_URL, falling back to BASE_URL');
    }
  }
  // Use site base URL for server-side fetch during build
  const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

/** Fetch a single article by slug */
export async function fetchArticle(slug: string) {
  try {
    const res = await fetch(
      buildApiUrl(`/api/data/${ARTICLES_COLLECTION}?slug=${encodeURIComponent(slug)}`),
      FETCH_OPTS
    );
    const json = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      return Array.isArray(json.data) ? json.data[0] : json.data;
    }
    return null;
  } catch (err) {
    console.warn('fetchArticle error', err);
    return null;
  }
}

/** Fetch a single article meta fields only (for generateMetadata — avoids loading long_description) */
export async function fetchArticleMeta(slug: string) {
  try {
    const res = await fetch(
      buildApiUrl(`/api/data/${ARTICLES_COLLECTION}?slug=${encodeURIComponent(slug)}&fields=id,slug,title,description,metatitle,meta_description,meta_keyword`),
      FETCH_OPTS
    );
    const json = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      return Array.isArray(json.data) ? json.data[0] : json.data;
    }
    return null;
  } catch (err) {
    console.warn('fetchArticleMeta error', err);
    return null;
  }
}

/** Fetch all categories (no filter) */
// Fetch all categories (no filter)
export async function fetchAllCategories() {
  try {
    const res = await fetch(buildApiUrl('/api/data/category'), FETCH_OPTS);
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    console.warn('fetchAllCategories error', err);
    return [];
  }
}

/** Fetch a single category by slug */
// Fetch a single category by slug
export async function fetchCategoryBySlug(slug: string) {
  try {
    const res = await fetch(buildApiUrl(`/api/data/category?slug=${encodeURIComponent(slug)}`), FETCH_OPTS);
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    console.warn('fetchCategoryBySlug error', err);
    return [];
  }
}

/** Fetch all articles — summary fields only (no heavy description/body) */
// Fetch all articles
export async function fetchAllArticles() {
  try {
    // Only request fields needed for list/card views — skips large long_description HTML
    const res = await fetch(
      buildApiUrl(`/api/data/${ARTICLES_COLLECTION}?fields=id,slug,title,description,image,date,author,category,tagline`),
      FETCH_OPTS
    );
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    console.warn('fetchAllArticles error', err);
    return [];
  }
}

/** Fetch only slugs (and ids) for generateStaticParams */
// Fetch only slugs (and ids) for generateStaticParams
export async function fetchAllArticleSlugs() {
  try {
    const res = await fetch(buildApiUrl(`/api/data/${ARTICLES_COLLECTION}?fields=slug,id`), FETCH_OPTS);
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn('fetchAllArticleSlugs error', err);
    return [];
  }
}

/** Fetch only category slugs for static params */
// Fetch only category slugs for static params
export async function fetchAllCategorySlugs() {
  try {
    const res = await fetch(buildApiUrl('/api/data/category'), FETCH_OPTS);
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn('fetchAllCategorySlugs error', err);
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
// Fetch hero section data
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
// Fetch about us data
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

/** Generic function to fetch a single item from a collection */
export async function getOneFromCollectionApi(collectionName: string, queryParams: Record<string, string> = {}) {
  try {
    const qString = new URLSearchParams(queryParams).toString();
    const url = buildApiUrl(`/api/data/${collectionName}${qString ? `?${qString}` : ''}`);
    const res = await fetch(url, FETCH_OPTS);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data[0];
    }
    return null;
  } catch (err) {
    console.warn(`getOneFromCollectionApi error (${collectionName})`, err);
    return null;
  }
}

/** Generic function to fetch all items from a collection */
export async function getFromCollectionApi(collectionName: string, queryParams: Record<string, string> = {}) {
  try {
    const qString = new URLSearchParams(queryParams).toString();
    const url = buildApiUrl(`/api/data/${collectionName}${qString ? `?${qString}` : ''}`);
    const res = await fetch(url, FETCH_OPTS);
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch (err) {
    console.warn(`getFromCollectionApi error (${collectionName})`, err);
    return [];
  }
}

/** Fetch static metadata by slug */
export async function fetchStaticMeta(slug: string) {
  try {
    const url = buildApiUrl(`/api/data/static_meta?slug=${encodeURIComponent(slug)}`);
    const res = await fetch(url, FETCH_OPTS);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data[0];
    }
    return null;
  } catch (err) {
    console.warn(`fetchStaticMeta error (${slug})`, err);
    return null;
  }
}


/**
 * Direct MongoDB access for build-time server functions (generateStaticParams, etc.)
 * This avoids relying on the CMS API server being up during `next build`.
 */
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'jayshree_blogs';

// Reuse connection across hot-reloads in dev
const globalWithMongo = global as typeof globalThis & { _mongoClient?: MongoClient };

async function getClient(): Promise<MongoClient> {
  if (!globalWithMongo._mongoClient) {
    if (!uri) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      );
    }
    globalWithMongo._mongoClient = new MongoClient(uri);
    await globalWithMongo._mongoClient.connect();
  }
  return globalWithMongo._mongoClient;
}
export async function getDb() {
  const client = await getClient();
  return client.db(dbName);
}

export function normalizeId<T extends { _id: unknown }>(doc: T) {
  const { _id, ...rest } = doc as any;
  return { id: String(_id), ...rest };
}

/** Fetch all article slugs directly — used by generateStaticParams */
export async function getArticleSlugs(collectionName = 'articles'): Promise<string[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection(collectionName)
      .find({}, { projection: { slug: 1, _id: 1 } })
      .toArray();
    return docs
      .map((d: any) => d.slug || String(d._id))
      .filter(Boolean);
  } catch (err) {
    console.error('[getArticleSlugs] DB error:', err);
    return [];
  }
}

/** Generic fetch for any collection — replaces internal API fetches during build */
export async function getFromCollection(collectionName: string, query = {}, sort = {}) {
  try {
    const db = await getDb();
    const docs = await db
      .collection(collectionName)
      .find(query)
      .sort(sort)
      .toArray();
    return docs.map(normalizeId);
  } catch (err) {
    console.error(`[getFromCollection] DB error (${collectionName}):`, err);
    return [];
  }
}

/** Fetch a single document by query */
export async function getOneFromCollection(collectionName: string, query = {}) {
  const db = await getDb();
  const doc = await db.collection(collectionName).findOne(query);
  return doc ? normalizeId(doc) : null;
}

/** Fetch a single article by slug directly — used by generateMetadata and page */
export async function getArticleBySlug(slug: string, collectionName = 'articles') {
  try {
    const db = await getDb();
    const doc = await db.collection(collectionName).findOne({ slug });
    if (doc) return normalizeId(doc);

    // Fallback: try by ObjectId
    try {
      const oid = new ObjectId(slug);
      const byId = await db.collection(collectionName).findOne({ _id: oid });
      if (byId) return normalizeId(byId);
    } catch {
      // not a valid ObjectId — ignore
    }

    return null;
  } catch (err) {
    console.error('[getArticleBySlug] DB error:', err);
    return null;
  }
}

/** Simple slugify utility – converts a string into URL-friendly slug */
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

/** Fetch all articles — used by the page to build recent articles sidebar */
export async function getArticles(collectionName = 'articles', projection: any = {}) {
  try {
    const db = await getDb();
    const docs = await db
      .collection(collectionName)
      .find({}, { projection })
      .sort({ created_at: -1 })
      .toArray();
    return docs.map(normalizeId);
  } catch (err) {
    console.error('[getArticles] DB error:', err);
    return [];
  }
}

/** Fetch all categories */
export async function getCategories() {
  try {
    const db = await getDb();
    const docs = await db.collection('category').find({}).toArray();
    return docs.map(normalizeId);
  } catch (err) {
    console.error('[getCategories] DB error:', err);
    return [];
  }
}

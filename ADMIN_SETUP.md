# Admin Dashboard Setup Guide

## Overview
This admin panel allows you to manage your Jayshree blog content dynamically. All content is stored in MongoDB, making it easy to add, edit, and delete posts and categories without touching code.

## Getting Started

### 1. Environment Setup
Copy `.env.local.example` to `.env.local` and update with your values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:
```
MONGODB_URI=mongodb+srv://harshit:Harshit%40123@userinfo.lmbsytd.mongodb.net/jayshree_blogs
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_random_string_here
```

To generate a secure `NEXTAUTH_SECRET`, run:
```bash
openssl rand -base64 32
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed Admin User
Create an initial admin user to log in:

```bash
node scripts/seed-admin.mjs
```

This creates:
- **Email**: `admin@jayshree.com`
- **Password**: `Admin@123`

⚠️ **Change this password after first login!**

### 4. Run Dev Server
```bash
npm run dev
```

Visit `http://localhost:3000/admin/login` to access the admin panel.

---

## Admin Dashboard Features

### 📊 Dashboard (`/admin`)
Overview of your site with quick stats and navigation to all management areas.

### 📝 Posts Management (`/admin/posts`)
**Features:**
- List all posts with status (Draft/Published)
- Create new posts with:
  - Title, slug, excerpt, full content
  - Category assignment
  - Featured image URL
  - Publish/draft toggle
- Edit existing posts
- Delete posts with confirmation
- Auto-generate slugs from titles

**API Endpoints:**
- `GET /api/admin/posts` — List all posts
- `POST /api/admin/posts` — Create post
- `GET /api/admin/posts/[id]` — Get single post
- `PUT /api/admin/posts/[id]` — Update post
- `DELETE /api/admin/posts/[id]` — Delete post

### 🏷️ Categories Management (`/admin/categories`)
**Features:**
- View all categories
- Create categories with:
  - Name, slug, description
  - Custom color picker
- Edit category details inline
- Delete categories
- Color-coded category display

**API Endpoints:**
- `GET /api/admin/categories` — List all categories (public)
- `POST /api/admin/categories` — Create category (admin)
- `GET /api/admin/categories/[id]` — Get single category (public)
- `PUT /api/admin/categories/[id]` — Update category (admin)
- `DELETE /api/admin/categories/[id]` — Delete category (admin)

### ⚙️ Settings (`/admin/settings`)
Placeholder for future settings including:
- Site configuration
- User management
- Email templates
- Social media links

---

## Database Schema

### Users Collection
```json
{
  "_id": ObjectId,
  "email": "admin@jayshree.com",
  "password": "bcrypt_hashed_password",
  "name": "Admin",
  "role": "admin",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Posts Collection
```json
{
  "_id": ObjectId,
  "title": "Post Title",
  "slug": "post-title",
  "excerpt": "Brief description",
  "content": "<html>Full content</html>",
  "categoryId": ObjectId,
  "image": "https://...",
  "published": true,
  "authorId": ObjectId,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Categories Collection
```json
{
  "_id": ObjectId,
  "name": "Category Name",
  "slug": "category-slug",
  "description": "Category description",
  "color": "#C9A84C",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

---

## Security

✅ **Protected Routes:**
- All `/admin/*` routes require authentication
- Only users with `role: "admin"` can access
- Middleware checks on every request
- JWT session tokens expire after 7 days

✅ **Password Security:**
- Passwords hashed with bcryptjs
- No plaintext passwords stored
- Session-based authentication

---

## Next Steps

1. **Connect Frontend to Database:**
   - Update public pages (`/blog`, `/categories`, etc.) to fetch from MongoDB instead of hardcoded data
   - Use the public API endpoints for reading posts/categories

2. **Customization:**
   - Add more fields to posts (tags, featured, author bio)
   - Create page templates for custom pages
   - Add user management interface

3. **Advanced Features:**
   - Media upload (currently uses image URLs)
   - SEO optimization fields
   - Draft preview
   - Scheduled publishing
   - Comment moderation

---

## Troubleshooting

**Issue: "Unauthorized" at login**
- Check email and password (default: `admin@jayshree.com` / `Admin@123`)
- Verify MongoDB connection string in `.env.local`
- Run seed script again: `node scripts/seed-admin.mjs`

**Issue: Cannot create posts**
- Ensure you're logged in and have admin role
- Check MongoDB connection
- Verify API routes are deployed correctly

**Issue: Changes don't appear**
- Refresh page or clear browser cache
- Check MongoDB Atlas for duplicate entries
- Verify `published` flag is set correctly

---

## Deployment

For production:
1. Use strong `NEXTAUTH_SECRET`
2. Set `NEXTAUTH_URL` to your production domain
3. Use MongoDB Atlas with IP whitelist
4. Enable HTTPS
5. Consider adding rate limiting to login
6. Set up database backups

---

## Support & Documentation

- [NextAuth.js Docs](https://next-auth.js.org)
- [MongoDB Docs](https://docs.mongodb.com)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

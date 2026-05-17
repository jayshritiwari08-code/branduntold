# 🚀 Quick Start Checklist

Follow these steps to get your admin panel running:

## ✅ Step 1: Setup Environment
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
- [ ] Update `.env.local` with your values
- [ ] MongoDB URL is already set: `mongodb+srv://harshit:Harshit%40123@userinfo.lmbsytd.mongodb.net/jayshree_blogs`

## ✅ Step 2: Install Dependencies
```bash
npm install
```

## ✅ Step 3: Create Admin User
```bash
node scripts/seed-admin.mjs
```
**Login with:**
- Email: `admin@jayshree.com`
- Password: `Admin@123`

## ✅ Step 4: Run Development Server
```bash
npm run dev
```

## ✅ Step 5: Access Admin Panel
- Open: `http://localhost:3000/admin/login`
- Log in with credentials from Step 3
- You should see the dashboard!

---

## 📝 What You Can Do Now

### Dashboard
- View overview stats
- Quick access to main features

### Posts Management
1. Go to **Posts** → **New Post**
2. Fill in title, slug (auto-generated), content
3. Assign category and featured image
4. Publish or save as draft
5. Edit or delete existing posts

### Categories Management
1. Go to **Categories** → **New Category**
2. Add name, slug, description
3. Pick a color for the category
4. Manage existing categories

### Settings
- Placeholder for future features

---

## 🔧 Troubleshooting

**Getting "Unauthorized" error?**
```bash
# Make sure admin user exists
node scripts/seed-admin.mjs

# Check .env.local has correct values
cat .env.local
```

**MongoDB connection failed?**
- Verify MongoDB URL in `.env.local`
- Check internet connection
- Ensure MongoDB cluster is running

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

---

## 📚 Full Documentation
See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for detailed documentation.

---

## ⚡ Next: Connect Frontend to Database

The admin panel is now ready! Next you'll want to:

1. Update public pages to use MongoDB instead of hardcoded data
2. Connect the blog pages to fetch posts from the database
3. Update category pages to use categories from MongoDB

Would you like help connecting the frontend pages to the database content?

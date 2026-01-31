# 🚀 Quick Deploy to Vercel

## Prerequisites Checklist

- [ ] Neon PostgreSQL database created (https://neon.tech)
- [ ] Vercel account (https://vercel.com)
- [ ] Repository cloned to your machine

## Step-by-Step Deployment

### 1. Initialize Your Database

```bash
cd income-expenses-tracker
echo "DATABASE_URL=your_neon_connection_string" > .env
node scripts/init-db.js
```

### 2. Install Vercel CLI (Option A)

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts to deploy.

### 3. Or Use Vercel Dashboard (Option B)

1. Go to https://vercel.com/new
2. Click "Import" and select your GitHub repo
3. Configure:
   - **Framework Preset:** Other
   - **Environment Variables:**
     - `DATABASE_URL` = your Neon connection string
4. Click **Deploy**

### 4. Access Your App

Vercel will give you a URL like:
```
https://income-expenses-tracker.vercel.app
```

## After Deployment

- ✅ App is live on Vercel
- ✅ Database connected to Neon
- ✅ API endpoints working
- ✅ Frontend serving correctly

## Environment Variables in Vercel

If you chose Option B (Dashboard), add your `DATABASE_URL`:

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add: `DATABASE_URL` = your Neon connection string
4. Redeploy from the "Deployments" tab

## Troubleshooting

**Database connection error:**
- Check that `DATABASE_URL` is set in Vercel environment variables
- Verify your Neon database is active

**API 404 errors:**
- Make sure `vercel.json` is in the repository root
- Check that the `api/` directory structure is correct

**Build fails:**
- Ensure `package.json` is correct
- Verify dependencies are listed

## Next Steps

- Add a custom domain in Vercel settings
- Set up automatic deployments on push to main
- Monitor usage in Vercel dashboard
- Scale your Neon database if needed

## Local Development

To test locally:

```bash
npm install
npm run dev
```

Opens at http://localhost:3000

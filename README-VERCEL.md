# 🚀 Vercel Deployment Guide for Resettlement App

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Database**: You'll need a cloud MySQL database (PlanetScale, Railway, or AWS RDS)

## 🔧 Step 1: Prepare Your Database

### Option A: PlanetScale (Recommended - Free Tier)
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get your connection string
4. Update your `DATABASE_URL` in Vercel environment variables

### Option B: Railway
1. Go to [railway.app](https://railway.app)
2. Create a MySQL database
3. Get your connection string

### Option C: Keep Current Database
- Your current database should work if it's accessible from the internet
- Make sure the connection string is correct

## 🚀 Step 2: Deploy to Vercel

### Method 1: GitHub Integration (Recommended)
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js app

3. **Configure Environment Variables**:
   In Vercel dashboard, add these environment variables:
   ```
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=ResettlementApp2025!SecureJWT#ProductionKey$789@Moon
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

4. **Deploy**: Click "Deploy" and wait for the build to complete

### Method 2: Vercel CLI
1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:
   ```bash
   vercel login
   vercel --prod
   ```

## 🔧 Step 3: Database Setup

After deployment, you need to run Prisma migrations:

1. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

2. **Run Migrations**:
   ```bash
   npx prisma db push
   ```

3. **Seed Database** (optional):
   ```bash
   npm run seed
   ```

## ✅ Step 4: Verify Deployment

1. **Check your app**: Visit `https://your-app-name.vercel.app`
2. **Test API endpoints**:
   - `https://your-app-name.vercel.app/api/auth/register`
   - `https://your-app-name.vercel.app/api/dashboard`

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Check your `DATABASE_URL` in Vercel environment variables
   - Ensure your database allows external connections

2. **Build Errors**:
   - Check the build logs in Vercel dashboard
   - Make sure all dependencies are in `package.json`

3. **API Routes Not Working**:
   - Verify `vercel.json` configuration
   - Check function timeout settings

4. **Environment Variables**:
   - Make sure all required env vars are set in Vercel
   - Redeploy after adding new environment variables

### Useful Commands:
```bash
# Check deployment status
vercel ls

# View logs
vercel logs your-app-name

# Redeploy
vercel --prod
```

## 📁 Files Created for Vercel:

- ✅ `vercel.json` - Vercel configuration
- ✅ `.env.example` - Environment variables template
- ✅ Updated `next.config.js` - Optimized for Vercel
- ✅ Updated `.gitignore` - Proper file exclusions

## 🎉 You're Ready!

Your resettlement app is now configured for Vercel deployment. The setup includes:

- ✅ Optimized Next.js configuration
- ✅ Proper API route handling
- ✅ Database integration ready
- ✅ Environment variables configured
- ✅ Build optimization for Vercel

Just push to GitHub and connect to Vercel, and you'll be live in minutes! 🚀
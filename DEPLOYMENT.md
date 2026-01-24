# Deployment Guide

This guide will help you deploy your portfolio to make it accessible on the internet.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended) ⭐

Vercel is the easiest and fastest way to deploy Next.js applications. It's free for personal projects!

#### Steps:

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Install Vercel CLI** (Optional)
   ```bash
   npm install -g vercel
   ```

3. **Deploy via CLI**
   ```bash
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   
   # Follow the prompts:
   # - Set up and deploy? Yes
   # - Which scope? Your account
   # - Link to existing project? No
   # - Project name? portfolio (or your choice)
   # - Directory? ./ (current directory)
   # - Override settings? No
   ```

4. **Deploy via GitHub** (Easier)
   - Push your code to GitHub
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your site will be live in ~2 minutes

#### Benefits:
- ✅ Free for personal use
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Custom domain support
- ✅ Built-in analytics

---

### Option 2: Netlify

Another excellent free option for hosting static sites.

#### Steps:

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Create a Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

3. **Deploy via GitHub**
   - Push code to GitHub
   - Go to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

4. **Or Deploy via Drag & Drop**
   - Build locally: `npm run build`
   - Drag the `.next` folder to Netlify

#### Benefits:
- ✅ Free for personal use
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Form handling
- ✅ Continuous deployment

---

### Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

#### Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these scripts:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d .next"
     }
   }
   ```

3. **Update next.config.ts**
   ```typescript
   const nextConfig = {
     output: 'export',
     basePath: '/portfolio', // Replace with your repo name
     images: {
       unoptimized: true,
     },
   };
   
   export default nextConfig;
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

Your site will be available at: `https://yourusername.github.io/portfolio`

---

### Option 4: AWS Amplify

For those who want to use AWS services.

#### Steps:

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Configure Amplify**
   ```bash
   amplify configure
   ```

3. **Initialize Amplify**
   ```bash
   amplify init
   ```

4. **Add hosting**
   ```bash
   amplify add hosting
   ```

5. **Deploy**
   ```bash
   amplify publish
   ```

---

### Option 5: Traditional VPS (DigitalOcean, Linode, etc.)

For full control over your hosting environment.

#### Steps:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Set up your server**
   ```bash
   # SSH into your server
   ssh user@your-server-ip
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 (process manager)
   sudo npm install -g pm2
   ```

3. **Upload your project**
   ```bash
   # On your local machine
   rsync -avz --exclude 'node_modules' ./ user@your-server-ip:/var/www/portfolio
   ```

4. **Install dependencies and start**
   ```bash
   # On your server
   cd /var/www/portfolio
   npm install
   npm run build
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

5. **Set up Nginx (optional)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 🌐 Custom Domain Setup

### For Vercel:

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your domain's DNS settings:
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or add A records pointing to Vercel's IP addresses

### For Netlify:

1. Go to "Domain settings"
2. Click "Add custom domain"
3. Update DNS settings:
   - Add a CNAME record pointing to your Netlify subdomain
   - Or use Netlify DNS for easier setup

---

## 📊 Post-Deployment Checklist

After deploying, make sure to:

- [ ] Test all navigation links
- [ ] Verify all sections load correctly
- [ ] Test on mobile devices
- [ ] Check form functionality
- [ ] Verify all images load
- [ ] Test social media links
- [ ] Check page load speed
- [ ] Verify SEO meta tags
- [ ] Test on different browsers
- [ ] Set up analytics (Google Analytics, Vercel Analytics, etc.)

---

## 🔧 Environment Variables

If you add backend functionality later, you'll need to set environment variables:

### Vercel:
1. Go to project settings
2. Navigate to "Environment Variables"
3. Add your variables

### Netlify:
1. Go to "Site settings"
2. Navigate to "Build & deploy" → "Environment"
3. Add your variables

### Local Development:
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_CONTACT_EMAIL=your-email
```

---

## 📈 Analytics Setup

### Google Analytics:

1. **Get tracking ID**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create a new property
   - Get your tracking ID (G-XXXXXXXXXX)

2. **Add to your site**
   Update `app/layout.tsx`:
   ```tsx
   import Script from 'next/script';
   
   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <head>
           <Script
             src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
             strategy="afterInteractive"
           />
           <Script id="google-analytics" strategy="afterInteractive">
             {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', 'G-XXXXXXXXXX');
             `}
           </Script>
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

### Vercel Analytics:

1. **Install package**
   ```bash
   npm install @vercel/analytics
   ```

2. **Add to layout**
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   
   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

---

## 🔒 Security Best Practices

Before deploying:

1. **Remove sensitive data**
   - Check for API keys
   - Remove test credentials
   - Review environment variables

2. **Update .gitignore**
   ```
   .env.local
   .env.*.local
   .vercel
   ```

3. **Enable HTTPS**
   - Most platforms do this automatically
   - Ensure all external resources use HTTPS

4. **Set up CSP headers** (optional)
   Update `next.config.ts`:
   ```typescript
   const nextConfig = {
     async headers() {
       return [
         {
           source: '/:path*',
           headers: [
             {
               key: 'X-Frame-Options',
               value: 'DENY',
             },
             {
               key: 'X-Content-Type-Options',
               value: 'nosniff',
             },
           ],
         },
       ];
     },
   };
   ```

---

## 🎯 Recommended: Vercel Deployment

For the easiest deployment experience:

```bash
# One-time setup
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

That's it! Your portfolio will be live with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments
- ✅ Free custom domain
- ✅ Built-in analytics

---

## 📞 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)

---

Good luck with your deployment! 🚀

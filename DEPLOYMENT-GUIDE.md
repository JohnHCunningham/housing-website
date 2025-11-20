# How to Get Your Website Online

This guide will walk you through deploying your website to the internet using **Netlify** (100% FREE hosting with your custom subdomain).

## Why Netlify?
- ✅ Completely FREE (no credit card required)
- ✅ Fast and reliable
- ✅ Free SSL certificate (HTTPS)
- ✅ Easy subdomain connection
- ✅ Automatic updates when you make changes
- ✅ Great for beginners

---

## Step 1: Sign Up for Netlify

1. Go to https://www.netlify.com/
2. Click **"Sign up"** in the top right
3. Choose **"Sign up with GitHub"** (recommended) or use email
4. Complete the sign-up process

---

## Step 2: Prepare Your Website Files

Make sure your `housing-website` folder contains:
- `index.html`
- `about.html`
- `services.html`
- `contact.html`
- `css/style.css`
- Any images in the `images/` folder

**Note:** You do NOT need to upload this DEPLOYMENT-GUIDE.md or EDITING-GUIDE.md file.

---

## Step 3: Deploy Your Website

### Option A: Drag and Drop (Easiest - No GitHub Required)

1. **Log in to Netlify**
2. Look for the section that says **"Want to deploy a new site without connecting to Git?"**
3. **Drag and drop your entire `housing-website` folder** onto the upload area
4. Wait 30-60 seconds while Netlify uploads and deploys
5. Done! You'll get a random URL like `https://random-name-12345.netlify.app`

### Option B: Using GitHub (Recommended - Auto-updates)

This method lets you update your site automatically when you make changes.

**First, install Git and GitHub Desktop:**
1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account (create one if needed)

**Create a repository:**
1. Open GitHub Desktop
2. Click **"File" > "Add Local Repository"**
3. Select your `housing-website` folder
4. Click **"Create Repository"**
5. Add a description: "My housing website"
6. Click **"Publish repository"**
7. Uncheck "Keep this code private" if you want
8. Click **"Publish Repository"**

**Connect to Netlify:**
1. Go to https://app.netlify.com/
2. Click **"Add new site" > "Import an existing project"**
3. Click **"GitHub"**
4. Authorize Netlify to access GitHub
5. Find and select your `housing-website` repository
6. Leave all settings as default
7. Click **"Deploy site"**
8. Wait 1-2 minutes for deployment

**Now whenever you make changes:**
1. Open GitHub Desktop
2. Write a summary of changes (e.g., "Updated contact info")
3. Click **"Commit to main"**
4. Click **"Push origin"**
5. Your site updates automatically on Netlify!

---

## Step 4: Connect Your Subdomain (housing.aiadvantagesolutions.ca)

### Part A: Get Your Netlify Site Info

1. In Netlify, click on your site
2. Go to **"Site settings"**
3. Under **"Site information"**, find your **Site name** (like `random-name-12345.netlify.app`)
4. Click **"Change site name"** and choose something memorable (like `aiadvantage-housing`)

### Part B: Add Custom Domain in Netlify

1. Still in **Site settings**, click **"Domain management"** in the sidebar
2. Click **"Add a domain"**
3. Enter your subdomain: `housing.aiadvantagesolutions.ca`
4. Click **"Verify"**
5. Netlify will show you DNS records you need to add

**Netlify will give you ONE of these options:**

**Option 1: CNAME Record** (Most common)
- Type: `CNAME`
- Name: `housing`
- Value: `your-site-name.netlify.app`

**Option 2: A Record**
- Type: `A`
- Name: `housing`
- Value: An IP address like `75.2.60.5`

Keep this page open - you'll need these values in the next step.

### Part C: Update DNS Records

Now you need to add DNS records where your main domain (`aiadvantagesolutions.ca`) is hosted.

**Find where your domain is hosted:**
- Check your email for "domain registration" or "DNS"
- Common registrars: GoDaddy, Namecheap, Google Domains, Cloudflare

**Add the DNS Record:**

**If using GoDaddy:**
1. Log in to GoDaddy
2. Go to "My Products" > "Domains"
3. Click "DNS" next to your domain
4. Scroll to "Records"
5. Click "Add"
6. Select type (CNAME or A)
7. In "Name" field, enter: `housing`
8. In "Value" field, paste the value from Netlify
9. Set TTL to 600 seconds
10. Click "Save"

**If using Namecheap:**
1. Log in to Namecheap
2. Go to "Domain List"
3. Click "Manage" next to your domain
4. Go to "Advanced DNS" tab
5. Click "Add New Record"
6. Select type (CNAME or A)
7. In "Host" field, enter: `housing`
8. In "Value" field, paste the value from Netlify
9. Set TTL to "Automatic"
10. Click the checkmark to save

**If using Cloudflare:**
1. Log in to Cloudflare
2. Select your domain
3. Click "DNS" in the sidebar
4. Click "Add record"
5. Select type (CNAME or A)
6. In "Name" field, enter: `housing`
7. In "Target/IPv4" field, paste the value from Netlify
8. Turn OFF the orange cloud (click it to make it gray)
9. Click "Save"

**If using another provider:**
- Look for "DNS Management" or "DNS Settings"
- Add a new record with the type, name, and value from Netlify

### Part D: Wait and Verify

1. **DNS changes take time** - usually 15 minutes to 48 hours
2. Go back to Netlify > Domain management
3. Once DNS propagates, you'll see a green checkmark
4. Netlify will automatically provision a FREE SSL certificate (HTTPS)
5. Visit `https://housing.aiadvantagesolutions.ca` - your site is live!

---

## Step 5: Enable SEO Features (Optional but Recommended)

### Add a Sitemap

1. Create a new file called `sitemap.xml` in your `housing-website` folder
2. Add this content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://housing.aiadvantagesolutions.ca/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://housing.aiadvantagesolutions.ca/about.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://housing.aiadvantagesolutions.ca/services.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://housing.aiadvantagesolutions.ca/contact.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

3. Re-deploy your site (drag & drop again, or push via GitHub)

### Add robots.txt

1. Create a new file called `robots.txt` in your `housing-website` folder
2. Add this content:

```
User-agent: *
Allow: /
Sitemap: https://housing.aiadvantagesolutions.ca/sitemap.xml
```

3. Re-deploy your site

### Submit to Google Search Console

1. Go to https://search.google.com/search-console/
2. Click "Start now" and sign in
3. Add your property: `housing.aiadvantagesolutions.ca`
4. Verify ownership (follow Google's instructions - usually involves adding a meta tag to your HTML)
5. Submit your sitemap: `https://housing.aiadvantagesolutions.ca/sitemap.xml`

---

## Step 6: Test Your Website

### Check These Things:

✅ Visit `https://housing.aiadvantagesolutions.ca` - does it load?
✅ Click all navigation links - do all pages work?
✅ Test on your phone - is it mobile-friendly?
✅ Check the contact form - does it work? (Test with Formspree)
✅ Check page speed: https://pagespeed.web.dev/
✅ Check mobile-friendly: https://search.google.com/test/mobile-friendly

---

## Updating Your Website

### If you used Drag & Drop:
1. Make changes to your local files
2. Go to Netlify
3. Click "Deploys" tab
4. Drag your updated `housing-website` folder to the upload area
5. Wait 30 seconds - changes are live!

### If you used GitHub:
1. Make changes to your local files
2. Open GitHub Desktop
3. You'll see your changes listed
4. Add a commit message (e.g., "Updated pricing")
5. Click "Commit to main"
6. Click "Push origin"
7. Wait 1-2 minutes - Netlify deploys automatically!

---

## Troubleshooting

### My subdomain isn't working
- **Wait longer**: DNS can take up to 48 hours (usually 1-2 hours)
- **Check DNS records**: Use https://dnschecker.org/ to verify your DNS is set up correctly
- **Verify in Netlify**: Make sure you see "Netlify DNS verification successful"

### My site shows a Netlify error
- **Check file names**: Make sure your homepage is named `index.html` (lowercase)
- **Check folder structure**: All HTML files should be in the root, CSS in `css/` folder

### SSL certificate not working
- **Wait**: SSL certificates can take 5-10 minutes to provision
- **Check DNS**: Make sure your subdomain is properly connected first

### Images not showing up
- **Check paths**: Make sure image paths are correct (e.g., `images/photo.jpg`)
- **Check file names**: Make sure image file names match exactly (case-sensitive)

### Contact form not working
- **Check Formspree**: Make sure you replaced `YOUR_FORM_ID` with your actual form ID
- **Verify email**: Check your spam folder for Formspree confirmation emails

---

## Performance & SEO Tips

### Make Your Site Faster:
1. **Compress images**: Use https://tinypng.com/ before uploading
2. **Enable caching**: Netlify does this automatically
3. **Use WebP images**: Convert images to WebP format for better compression

### Improve SEO:
1. **Add unique meta descriptions** to each page
2. **Use descriptive page titles**
3. **Add alt text to all images**
4. **Create quality content** regularly (blog posts, etc.)
5. **Get backlinks** from other reputable websites
6. **Add schema markup** (structured data) for better search results

### Monitor Your Site:
1. **Google Analytics**: Track visitors (free)
2. **Google Search Console**: Monitor search performance (free)
3. **Netlify Analytics**: Built-in analytics ($9/month, optional)

---

## Cost Breakdown

**Completely FREE plan includes:**
- ✅ Unlimited bandwidth
- ✅ 100GB/month bandwidth
- ✅ Free SSL certificate
- ✅ Custom domain support
- ✅ Automatic deployments
- ✅ Deploy previews

**You only pay for:**
- ❌ Your domain registration (if you don't have it already) - ~$15/year
- ❌ Nothing else required!

---

## Alternative Hosting Options

If you want to try something different:

### Vercel (Similar to Netlify)
- Website: https://vercel.com/
- Pros: Fast, great for beginners, free SSL
- Cons: More developer-focused

### GitHub Pages (100% Free, Simple)
- Website: https://pages.github.com/
- Pros: Totally free, works with GitHub
- Cons: Limited features, GitHub only

### Cloudflare Pages (Fast & Free)
- Website: https://pages.cloudflare.com/
- Pros: Very fast, free, unlimited bandwidth
- Cons: Requires GitHub/GitLab

---

## Need Help?

- **Netlify Documentation**: https://docs.netlify.com/
- **Netlify Support**: https://answers.netlify.com/
- **YouTube Tutorials**: Search "How to deploy to Netlify"

---

**Congratulations!** 🎉 Once deployed, your website will be live at `https://housing.aiadvantagesolutions.ca` and accessible to anyone in the world!

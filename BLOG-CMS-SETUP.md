# Blog & CMS Setup Guide

Your website now has a fully functional blog section with an easy-to-use Content Management System (CMS). You can write and publish blog posts without touching any code!

## 📝 What You Have

### Blog Features
✅ **Blog Listing Page** (`blog.html`) - Shows all your posts
✅ **Category Filtering** - Filter posts by topic (Mixed Income, Near Market, AODA, etc.)
✅ **Sample Blog Post** - Template showing proper formatting
✅ **Netlify CMS** - Easy visual editor for creating posts
✅ **AODA Compliant** - Fully accessible blog interface
✅ **Mobile Responsive** - Looks great on all devices
✅ **SEO Optimized** - Meta tags, keywords, structured content

### Blog Categories
- Mixed Income Communities
- Near Market Rentals
- Public Housing
- AODA Compliance
- Tenant Engagement
- Housing Policy

## 🚀 Quick Start: Two Ways to Publish

### Option 1: Netlify CMS (Easiest - No Coding!)

**After deploying to Netlify, you'll be able to:**
1. Visit `https://housing.aiadvantagesolutions.ca/admin`
2. Log in with your Netlify account
3. Click "New Blog Post"
4. Write your post in a visual editor (like Word)
5. Click "Publish" - Done!

See detailed setup instructions below.

### Option 2: Manual HTML Files (Quick Start)

For testing locally before deploying:
1. Copy `blog/aoda-compliance-checklist-housing-providers.html`
2. Rename it for your new post
3. Edit the content
4. Update the listing in `blog.html`

---

## 📖 Option 1: Netlify CMS Setup (Recommended)

### Prerequisites
✅ Your website deployed to Netlify (see DEPLOYMENT-GUIDE.md)
✅ GitHub repository connected to Netlify
✅ Netlify account (free)

### Step 1: Enable Netlify Identity

1. **Go to your Netlify dashboard**
   - Log in at https://app.netlify.com/
   - Click on your site

2. **Enable Identity**
   - Click "Identity" in the top menu
   - Click "Enable Identity"
   - Wait a moment for it to activate

3. **Enable Git Gateway**
   - In Identity settings, scroll to "Services"
   - Click "Enable Git Gateway"
   - This allows the CMS to save posts to your GitHub repo

### Step 2: Invite Yourself as a User

1. **In the Identity tab**, click "Invite users"
2. Enter your email address
3. Check your email for the invitation
4. Click the link to set your password
5. You're now an authorized user!

### Step 3: Access Your CMS

1. **Go to:** `https://housing.aiadvantagesolutions.ca/admin`
2. **Log in** with your email and password
3. **You'll see the CMS dashboard!**

### Step 4: Create Your First Post

1. **Click "New Blog Post"** in the CMS
2. **Fill in the fields:**
   - **Title**: Your blog post title
   - **Publish Date**: When to publish (or backdate if needed)
   - **Description**: Short summary (appears on blog listing)
   - **Featured Image**: Upload an image (optional)
   - **Categories**: Select relevant categories (can choose multiple)
   - **Body**: Write your post using the rich text editor
   - **SEO Keywords**: Comma-separated keywords

3. **Preview** your post (optional)

4. **Save Draft** or **Publish** immediately

5. **Done!** Your post is live at `https://housing.aiadvantagesolutions.ca/blog/your-post-title.html`

### Step 5: Edit Existing Posts

1. Go to your CMS (`/admin`)
2. Click on the post you want to edit
3. Make changes
4. Click "Publish" to update

---

## 📖 Option 2: Manual Blog Posts (No CMS)

If you prefer to create HTML files directly:

### Creating a New Post

1. **Copy the sample post:**
   ```bash
   cp blog/aoda-compliance-checklist-housing-providers.html blog/your-new-post.html
   ```

2. **Open the new file in your text editor**

3. **Update the metadata** (top of file):
   ```html
   <title>Your Post Title | AI Advantage Solutions</title>
   <meta name="description" content="Your post description">
   <meta name="keywords" content="your, keywords, here">
   ```

4. **Update the header:**
   ```html
   <h1 class="blog-post-title">Your Post Title</h1>
   <span class="blog-category">Category Name</span>
   <span class="blog-date">January 15, 2024</span>
   ```

5. **Write your content** in the blog-post-content section

6. **Save the file**

### Adding Post to Blog Listing

1. **Open `blog.html`** in your text editor

2. **Find the blog-grid section**

3. **Copy an existing blog card** and modify it:
   ```html
   <article class="blog-card" data-category="mixed-income aoda">
       <div class="blog-image">
           <img src="images/blog-your-image.jpg" alt="Description" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div class="blog-image-placeholder" style="display:none;">
               <span>🏘️</span>
           </div>
       </div>
       <div class="blog-content">
           <div class="blog-meta">
               <span class="blog-category">Mixed Income Communities</span>
               <span class="blog-date">January 15, 2024</span>
           </div>
           <h2><a href="blog/your-new-post.html">Your Post Title</a></h2>
           <p>Short description of your post...</p>
           <a href="blog/your-new-post.html" class="read-more">Read Article →</a>
       </div>
   </article>
   ```

4. **Update:**
   - `data-category`: Categories for filtering (space-separated)
   - Image src and alt text
   - Blog category badge
   - Date
   - Title and link (appears twice)
   - Description

5. **Save** blog.html

---

## 🎨 Writing Great Blog Posts

### SEO Best Practices

1. **Title**: 50-60 characters, include main keyword
2. **Description**: 150-160 characters, compelling summary
3. **Keywords**: 5-10 relevant keywords, comma-separated
4. **Headings**: Use H2, H3 structure (never skip levels)
5. **Links**: Link to your services/contact page
6. **Images**: Include alt text for all images
7. **Length**: 1000-2000 words for SEO value

### Content Ideas (Your Keywords)

**Mixed Income Communities:**
- "5 Keys to Successful Mixed Income Integration"
- "Designing Common Spaces for Mixed Income Communities"
- "Income Mix Ratios: What Works Best?"

**Near Market Rentals:**
- "Understanding Near Market Rent Calculations in Ontario"
- "Income Verification Best Practices"
- "Financial Sustainability in Near Market Programs"

**Public Housing:**
- "Modern Approaches to Public Housing Design"
- "Community Building in Public Housing"
- "Maintenance Management for Public Housing Providers"

**AODA Compliance:**
- "AODA Compliance Checklist" (already created!)
- "Making Tenant Portals Accessible"
- "Accessible Emergency Communications"

### Blog Post Structure Template

```
# Compelling Title with Main Keyword

Opening paragraph - Hook the reader with a question or statistic.

## Why This Matters
Explain the importance to housing providers.

## Key Point 1
Detailed explanation with examples.

## Key Point 2
More valuable information.

## Practical Steps / Checklist
Actionable items readers can implement.

## Common Mistakes to Avoid
Help readers avoid pitfalls.

## Conclusion
Summarize key points and include CTA to contact you.
```

---

## 📸 Adding Images to Blog Posts

### Option 1: Using Netlify CMS
1. In the CMS editor, click "Featured Image"
2. Click "Upload" or "Choose from library"
3. Select your image (JPG or PNG)
4. It's automatically uploaded and inserted!

### Option 2: Manual Upload
1. Put images in `images/blog/` folder
2. Name them descriptively: `mixed-income-community-event.jpg`
3. Reference in HTML:
   ```html
   <img src="../images/blog/your-image.jpg" alt="Detailed description">
   ```

### Image Guidelines
- **Size**: 1200px wide max
- **Format**: JPG for photos, PNG for graphics
- **File size**: Under 500KB (compress at tinypng.com)
- **Alt text**: Always describe what's in the image

---

## 🔧 Customizing Your Blog

### Changing Category Filters

Edit `blog.html`, find the blog-categories section:

```html
<button class="category-filter" data-category="your-category">Your Category Name</button>
```

Add new categories or remove ones you don't need.

### Changing Colors

Edit `css/style.css`, find the blog section variables (line ~705):

```css
.blog-category {
    background: var(--primary-color);  /* Change category badge color */
}
```

### Adding Author Info

In your blog post template, add after the date:

```html
<span class="blog-date">By John Cunningham</span>
```

---

## 📊 SEO & Analytics

### Google Search Console

1. Add your site: https://search.google.com/search-console/
2. Submit sitemap: `https://housing.aiadvantagesolutions.ca/sitemap.xml`
3. Wait for Google to index your blog posts (1-2 weeks)

### Tracking Blog Performance

Add Google Analytics (free):
1. Sign up at analytics.google.com
2. Get your tracking code
3. Add to all blog pages in the `<head>` section

---

## 🆘 Troubleshooting

### CMS Not Loading
- Check that Netlify Identity is enabled
- Verify Git Gateway is enabled
- Clear browser cache and try again

### Posts Not Showing on Blog Page
- Verify file is in `blog/` folder
- Check that you added it to `blog.html` listing
- Ensure proper `data-category` attributes

### Categories Not Filtering
- Check JavaScript is loading (`js/blog-filter.js`)
- Verify `data-category` matches filter button values
- Check browser console for errors (F12)

### Images Not Loading
- Verify image path is correct
- Check image file exists in `images/blog/`
- Ensure image file name has no spaces

---

## 📝 Quick Reference

### File Locations
```
housing-website/
├── blog.html                    # Blog listing page
├── blog/
│   └── your-posts.html          # Individual blog posts
├── admin/
│   ├── index.html               # CMS interface
│   └── config.yml               # CMS configuration
├── js/
│   └── blog-filter.js           # Category filtering
└── images/blog/                 # Blog images
```

### CMS Access
- URL: `https://housing.aiadvantagesolutions.ca/admin`
- Requires: Netlify Identity enabled
- Users: Invite via Netlify dashboard

### Support
- Netlify CMS Docs: https://www.netlifycms.org/docs/
- Need help? Contact your web developer

---

## 🎯 Content Calendar Ideas

### Monthly Topics
- **Week 1**: Mixed income community success story
- **Week 2**: AODA compliance tip or checklist
- **Week 3**: Near market rental program guidance
- **Week 4**: Public housing trend or policy update

### Seasonal Content
- **Q1**: New year housing trends, budget planning
- **Q2**: Spring maintenance, community events
- **Q3**: Summer programs, accessibility improvements
- **Q4**: Year-end reviews, next year planning

---

**You're ready to blog!** Start by deploying your site (DEPLOYMENT-GUIDE.md), then set up Netlify CMS and create your first post about mixed income communities or AODA compliance.

Your expertise will help Ontario housing providers succeed!

# Website Editing Guide for Beginners

Welcome! This guide will help you edit your website even if you've never coded before.

## Table of Contents
1. [Opening and Editing Files](#opening-and-editing-files)
2. [Editing Text Content](#editing-text-content)
3. [Changing Colors](#changing-colors)
4. [Adding or Removing Pages](#adding-or-removing-pages)
5. [Editing Contact Information](#editing-contact-information)
6. [Adding Images](#adding-images)
7. [Setting Up the Contact Form](#setting-up-the-contact-form)

---

## Opening and Editing Files

### What You Need:
- **Text Editor**: Download one of these (they're free):
  - **VS Code** (recommended): https://code.visualstudio.com/
  - **Sublime Text**: https://www.sublimetext.com/
  - **Notepad++** (Windows): https://notepad-plus-plus.org/

### Opening Your Website:
1. Open your text editor
2. Go to `File > Open Folder`
3. Select the `housing-website` folder
4. You'll see all your files in the sidebar

### Preview Your Changes:
- Just double-click any `.html` file to open it in your web browser
- After making changes, save the file and refresh your browser

---

## Editing Text Content

### Homepage (index.html)

**Change the main headline:**
Look for this section (around line 38):
```html
<h1>Find Your Perfect Home with AI-Powered Solutions</h1>
```
Simply change the text between `<h1>` and `</h1>`.

**Change the subtitle:**
```html
<p class="hero-subtitle">Revolutionizing housing search with cutting-edge technology and personalized service</p>
```
Change the text between `<p class="hero-subtitle">` and `</p>`.

**Edit the 3 feature boxes:**
Find the sections marked with comments like:
```html
<!-- FEATURE 1 - Edit icon, title, and text -->
```
- Change the emoji icon (🏡, ⚡, 🎯)
- Change the `<h3>` text (the title)
- Change the `<p>` text (the description)

### About Page (about.html)

**Edit your story:**
Look for:
```html
<!-- ABOUT CONTENT - Edit your company story here -->
```
Everything below this comment can be edited. Just change the text between the tags.

**Edit the mission statement:**
Find `<h2>Our Mission</h2>` and change the paragraph below it.

### Services Page (services.html)

**Edit or add services:**
Each service is in a section like:
```html
<div class="service-card">
    <div class="service-icon">🔍</div>
    <h3>AI-Powered Property Search</h3>
    <p>Description here...</p>
    <ul class="service-features">
        <li>Feature 1</li>
        <li>Feature 2</li>
    </ul>
</div>
```

To edit:
- Change the emoji icon
- Change the `<h3>` title
- Change the description in `<p>`
- Edit the bullet points in `<li>` tags

To add a new service:
- Copy an entire `<div class="service-card">` section
- Paste it below the last service
- Edit the content

---

## Changing Colors

Open `css/style.css` and find this section at the top:

```css
:root {
    --primary-color: #2563eb;      /* Main blue color */
    --secondary-color: #1e40af;    /* Darker blue */
    --accent-color: #3b82f6;       /* Light blue */
}
```

### How to Change Colors:
1. Go to https://htmlcolorcodes.com/color-picker/
2. Pick a color you like
3. Copy the hex code (looks like #2563eb)
4. Replace the code in the CSS file

**Example Color Schemes:**

**Green Theme:**
```css
--primary-color: #10b981;
--secondary-color: #059669;
--accent-color: #34d399;
```

**Purple Theme:**
```css
--primary-color: #8b5cf6;
--secondary-color: #7c3aed;
--accent-color: #a78bfa;
```

**Orange Theme:**
```css
--primary-color: #f97316;
--secondary-color: #ea580c;
--accent-color: #fb923c;
```

---

## Adding or Removing Pages

### To Remove a Page:
1. Delete the `.html` file you don't want
2. Remove it from navigation in ALL other pages

Find this section in each HTML file:
```html
<ul class="nav-menu">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="contact.html">Contact</a></li>
</ul>
```
Delete the line for the page you removed.

### To Add a New Page:
1. Copy an existing page (like `about.html`)
2. Rename it (like `pricing.html`)
3. Edit the content
4. Add it to the navigation in ALL pages:
```html
<li><a href="pricing.html">Pricing</a></li>
```

---

## Editing Contact Information

**Update in the Footer** (appears on every page):

Find this section:
```html
<div class="footer-section">
    <h3>Contact</h3>
    <p>Email: info@aiadvantagesolutions.ca</p>
    <p>Phone: (555) 123-4567</p>
</div>
```

Change your email and phone number.

**Important:** Update this in ALL 4 HTML files (index.html, about.html, services.html, contact.html)

**Update on Contact Page:**

In `contact.html`, find:
```html
<div class="contact-item">
    <div class="contact-icon">📧</div>
    <div>
        <h3>Email</h3>
        <p>info@aiadvantagesolutions.ca</p>
    </div>
</div>
```

Change your contact details in all the contact items.

---

## Adding Images

### Step 1: Prepare Your Images
1. Resize images to web-friendly sizes (max 1920px wide)
2. Save them as `.jpg` or `.png`
3. Name them simply: `hero-image.jpg`, `about-photo.jpg`

### Step 2: Add Images to Your Site
1. Put your images in the `images` folder
2. Add them to your HTML

**Example - Add a hero image on the homepage:**

Find the hero section in `index.html`:
```html
<section class="hero">
```

Add a background image by updating the CSS. In `css/style.css`, find:
```css
.hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    ...
}
```

Change to:
```css
.hero {
    background: url('../images/hero-image.jpg') center/cover no-repeat;
    ...
}
```

**Example - Add an image to the About page:**

In `about.html`, add this where you want the image:
```html
<img src="images/about-photo.jpg" alt="About our company" style="max-width: 100%; border-radius: 12px; margin: 2rem 0;">
```

---

## Setting Up the Contact Form

Your contact form needs a service to receive emails. I recommend **Formspree** (it's free for up to 50 submissions/month).

### Step 1: Sign Up for Formspree
1. Go to https://formspree.io/
2. Click "Get Started" and sign up (free)
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/abcd1234`)

### Step 2: Add It to Your Website
1. Open `contact.html`
2. Find this line (around line 74):
```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
3. Replace `YOUR_FORM_ID` with your actual form ID

**Example:**
```html
<form class="contact-form" action="https://formspree.io/f/mwpejvqz" method="POST">
```

That's it! Now when someone submits the form, you'll get an email.

---

## Quick Tips

### ✓ Always Save Your Changes
Press `Ctrl+S` (Windows) or `Cmd+S` (Mac) after editing

### ✓ Refresh Your Browser
After saving, refresh your browser (F5) to see changes

### ✓ Make Backups
Before making big changes, copy your entire `housing-website` folder as a backup

### ✓ Test on Mobile
After making changes, view your site on your phone to make sure it looks good

### ✓ Use Comments
HTML comments look like: `<!-- This is a comment -->`
They help you remember what sections do

---

## Common Problems

**Problem:** My changes aren't showing up
- **Solution:** Make sure you saved the file and refreshed your browser

**Problem:** The page looks broken
- **Solution:** You might have accidentally deleted a closing tag like `</div>`. Use Ctrl+Z to undo

**Problem:** Colors aren't changing
- **Solution:** Make sure you're editing `css/style.css` and saved the file

**Problem:** Contact form not working
- **Solution:** Double-check your Formspree form ID is correct in `contact.html`

---

## Need More Help?

- **HTML Tutorial:** https://www.w3schools.com/html/
- **CSS Tutorial:** https://www.w3schools.com/css/
- **Color Picker:** https://htmlcolorcodes.com/
- **Free Icons:** https://emojipedia.org/ (just copy and paste emojis)

---

**Remember:** You can't really "break" your website permanently. If something goes wrong, just restore from your backup!

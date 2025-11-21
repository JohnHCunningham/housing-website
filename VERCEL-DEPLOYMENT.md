# Vercel Deployment Guide for Voice Agent

## Quick Setup (3 Steps)

### Step 1: Add API Key to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **housing-website** project
3. Click **Settings** → **Environment Variables**
4. Add new variable:
   - **Key:** `CLAUDE_API_KEY`
   - **Value:** `sk-ant-...` (your Claude API key from console.anthropic.com)
   - **Environments:** Check all boxes (Production, Preview, Development)
5. Click **Save**

### Step 2: Deploy to Vercel

Push your code to git (if not already):
```bash
cd housing-website
git add .
git commit -m "Add voice agent with serverless function"
git push
```

Vercel will automatically deploy your changes.

**OR** deploy directly:
```bash
vercel --prod
```

### Step 3: Test on Production

1. Visit your live website (e.g., `yoursite.vercel.app`)
2. Click the floating microphone button
3. Allow microphone access
4. Start talking!

---

## How It Works

### Production Mode (Secure)
- Voice agent calls `/api/chat` (your serverless function)
- Serverless function uses `CLAUDE_API_KEY` from environment variables
- API key is NEVER exposed to the browser
- ✅ Secure and production-ready

### Local Testing Mode (Optional)
If you want to test locally with your own API key:

1. Edit `js/voice-agent-init.js`
2. Uncomment and set your API key:
   ```javascript
   apiKey: 'sk-ant-...'
   ```
3. Test locally
4. **Remove the API key before deploying!**

---

## File Structure

```
housing-website/
├── api/
│   └── chat.js          ← Serverless function (handles Claude API)
├── js/
│   ├── voice-agent.js   ← Core voice logic
│   ├── voice-agent-ui.js
│   └── voice-agent-init.js
└── css/
    └── voice-agent.css
```

---

## Troubleshooting

### Voice agent not working on production

**Check 1:** Environment variable set?
- Go to Vercel → Settings → Environment Variables
- Verify `CLAUDE_API_KEY` exists and is deployed to Production

**Check 2:** Redeploy after adding environment variable
- Environment variables require a new deployment to take effect
- Go to Vercel → Deployments → Click "..." → Redeploy

**Check 3:** Check Vercel function logs
- Go to Vercel → Deployments → Click on latest deployment
- Click "Functions" tab → View logs for `/api/chat`
- Look for errors

### "CLAUDE_API_KEY environment variable not set" error

This means Vercel can't find the environment variable:
1. Double-check spelling: `CLAUDE_API_KEY` (exact)
2. Make sure it's enabled for Production environment
3. Redeploy after adding it

### Function timeout errors

Claude API can take 2-5 seconds to respond. Vercel has these limits:
- Hobby plan: 10 second timeout (should be fine)
- Pro plan: 60 second timeout

If you see timeouts, check:
- Your internet connection
- Claude API status: https://status.anthropic.com/

---

## Cost Monitoring

### Set Up Spending Alerts

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Go to Settings → Billing
3. Set monthly spending limits
4. Enable email notifications

### Expected Costs

- Average conversation: 500-1000 tokens
- Cost: ~$0.015 per conversation (Claude Sonnet 3.5)
- 100 conversations: ~$1.50/month
- 1000 conversations: ~$15/month

Monitor usage in Anthropic Console → Usage

---

## Security Checklist

- ✅ API key stored in Vercel environment variables
- ✅ API key NOT in git repository
- ✅ API key NOT in client-side JavaScript
- ✅ Serverless function validates requests
- ✅ CORS handled by Vercel automatically

---

## Advanced: Rate Limiting (Optional)

To prevent abuse, add rate limiting to `/api/chat`:

```javascript
// api/chat.js
const rateLimit = {};

export default async function handler(req, res) {
    // Simple rate limiting by IP
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = Date.now();

    if (!rateLimit[ip]) {
        rateLimit[ip] = [];
    }

    // Remove requests older than 1 minute
    rateLimit[ip] = rateLimit[ip].filter(time => now - time < 60000);

    // Max 10 requests per minute per IP
    if (rateLimit[ip].length >= 10) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    rateLimit[ip].push(now);

    // ... rest of function
}
```

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Anthropic Docs:** https://docs.anthropic.com/
- **Your Setup Guide:** See VOICE-AGENT-SETUP.md

---

## Quick Reference

**Environment Variable Name:** `CLAUDE_API_KEY`

**Serverless Function:** `/api/chat`

**Get Claude API Key:** https://console.anthropic.com/

**Check Deployment:** https://vercel.com/dashboard

**Test Live:** https://yoursite.vercel.app

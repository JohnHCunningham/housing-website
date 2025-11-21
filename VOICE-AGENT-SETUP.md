# Voice Agent Setup Guide

## Overview

Your website now includes a real-time voice conversation agent powered by:
- **Web Speech API** - Browser-native speech recognition and text-to-speech
- **Claude AI** - Anthropic's advanced language model for intelligent responses
- **Custom Training Data** - Your chatbot training files provide context

## Features

✅ Real-time voice conversations
✅ Natural speech recognition and synthesis
✅ Context-aware responses about your services
✅ Mobile-friendly interface
✅ AODA-compliant design
✅ Works alongside your existing Chatbase chatbot

---

## Setup Instructions

### Step 1: Get a Claude API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign in or create an account
3. Navigate to **API Keys** section
4. Click **Create Key**
5. Copy your API key (starts with `sk-ant-`)

**Pricing**: Claude API uses pay-as-you-go pricing. Voice conversations typically cost $0.01-0.05 per conversation depending on length. See [Anthropic Pricing](https://www.anthropic.com/pricing) for details.

### Step 2: Configure the API Key

**⚠️ IMPORTANT SECURITY NOTE**: For production websites, you should **NEVER** put API keys directly in client-side JavaScript. The method below is for testing only. See "Production Deployment" section below for secure implementation.

#### For Testing (Local Development):

1. Open `js/voice-agent-init.js`
2. Find this line:
   ```javascript
   apiKey: 'YOUR_CLAUDE_API_KEY_HERE'
   ```
3. Replace `YOUR_CLAUDE_API_KEY_HERE` with your actual API key:
   ```javascript
   apiKey: 'sk-ant-api03-...'  // Your real API key
   ```
4. Save the file

### Step 3: Test Locally

1. Open your website in a local browser
2. You should see a floating microphone button in the bottom-right corner
3. Click it to open the voice panel
4. Click the microphone button and start speaking
5. The agent should respond with voice and text

**Browser Support**:
- ✅ Chrome/Edge (Recommended)
- ✅ Safari (macOS/iOS)
- ⚠️ Firefox (Limited support)

**Permissions**: You'll need to allow microphone access when prompted.

---

## Production Deployment (CRITICAL)

**🚨 DO NOT deploy your API key in client-side code to production!**

### Option 1: Serverless Function (Recommended)

Create a serverless function that proxies requests to Claude:

1. **Vercel Function** (if using Vercel):
   ```javascript
   // api/chat.js
   const Anthropic = require('@anthropic-ai/sdk');

   export default async function handler(req, res) {
       const anthropic = new Anthropic({
           apiKey: process.env.CLAUDE_API_KEY
       });

       const { messages, system } = req.body;

       const response = await anthropic.messages.create({
           model: 'claude-3-5-sonnet-20241022',
           max_tokens: 1024,
           system: system,
           messages: messages
       });

       res.json(response);
   }
   ```

2. **Update voice-agent.js**:
   Change the API endpoint from:
   ```javascript
   this.apiEndpoint = 'https://api.anthropic.com/v1/messages';
   ```
   To:
   ```javascript
   this.apiEndpoint = '/api/chat';  // Your serverless function
   ```

3. **Remove API key from client**:
   In `voice-agent-init.js`, remove the apiKey:
   ```javascript
   const voiceAgent = new VoiceAgent({
       // apiKey is not needed - serverless function handles it
   });
   ```

4. **Set environment variable**:
   - Vercel: Dashboard → Settings → Environment Variables
   - Add `CLAUDE_API_KEY` with your API key

### Option 2: Backend Server

If you have a Node.js/Python backend, create an endpoint that:
1. Receives messages from the voice agent
2. Calls Claude API server-side
3. Returns the response

### Option 3: Rate-Limited Public Key (Not Recommended)

If you must use client-side API calls:
1. Use Anthropic's API key management to set strict rate limits
2. Set spending caps
3. Monitor usage closely
4. Understand that anyone can extract and use your key

---

## Adding Voice Agent to Other Pages

Currently, the voice agent is only on `index.html`. To add it to other pages:

1. **Add CSS to page `<head>`**:
   ```html
   <link rel="stylesheet" href="css/voice-agent.css">
   ```

2. **Add scripts before closing `</body>`**:
   ```html
   <script src="js/voice-agent.js"></script>
   <script src="js/voice-agent-ui.js"></script>
   <script src="js/voice-agent-init.js"></script>
   ```

Pages to update:
- `about.html`
- `services.html`
- `blog.html`
- `contact.html`

---

## Customization

### Change Voice Settings

Edit `voice-agent.js` line ~247:
```javascript
utterance.rate = 1.0;   // Speed (0.5-2.0)
utterance.pitch = 1.0;  // Pitch (0-2)
utterance.volume = 1.0; // Volume (0-1)
```

### Modify System Prompt

Edit `voice-agent.js` line ~120 to change how the agent responds:
```javascript
this.systemContext = `You are a friendly and knowledgeable voice assistant...`
```

### Change Colors

Edit `css/voice-agent.css` to match your brand:
- Line 25: Floating button gradient
- Line 61: Panel header background
- Line 127-137: Status indicator colors

### Adjust Position

Edit `css/voice-agent.css` line 11:
```css
.voice-fab {
    bottom: 30px;  /* Change vertical position */
    right: 30px;   /* Change horizontal position */
}
```

---

## Troubleshooting

### "Microphone access denied"
- Check browser permissions (click lock icon in address bar)
- Ensure you're using HTTPS (required for microphone access)

### "Speech recognition is not supported"
- Use Chrome, Edge, or Safari
- Update your browser to the latest version

### "Error getting response"
- Check API key is correctly configured
- Verify you have API credits in your Anthropic account
- Check browser console for detailed error messages

### Voice agent button not appearing
- Check browser console for JavaScript errors
- Verify all script files loaded correctly
- Clear browser cache and reload

### Agent responses are slow
- This is normal - Claude API typically responds in 2-5 seconds
- Ensure good internet connection
- Consider upgrading to Claude Opus for faster responses

### No audio output
- Check browser audio isn't muted
- Ensure text-to-speech is enabled in browser settings
- Try a different voice (modify voice-agent.js line 244)

---

## Files Reference

### Core Files
- `js/voice-agent.js` - Main voice agent logic
- `js/voice-agent-ui.js` - User interface component
- `js/voice-agent-init.js` - Initialization and configuration
- `css/voice-agent.css` - Styling and animations

### Training Data (used by agent)
- `chatbot-training/1-company-overview.txt`
- `chatbot-training/2-services-detailed.txt`
- `chatbot-training/3-aoda-compliance-info.txt`
- `chatbot-training/4-faqs.txt`
- `chatbot-training/5-contact-process.txt`

---

## Privacy & Compliance

### Data Handling
- User voice is processed locally by browser (Web Speech API)
- Transcribed text is sent to Claude API for responses
- Conversation history is kept in browser memory (not persisted)
- No conversation data is stored on your server

### AODA Compliance
The voice agent is built with accessibility in mind:
- Full keyboard navigation support
- ARIA labels for screen readers
- High contrast mode support
- Reduced motion support
- Provides alternative to text-based chat

### User Privacy Notice
Consider adding to your privacy policy:
> "Our voice assistant uses your browser's speech recognition to convert your voice to text. This text is sent to Anthropic's Claude AI service to generate responses. Conversations are not stored. See [Anthropic's Privacy Policy](https://www.anthropic.com/privacy) for details."

---

## Cost Management

### Typical Usage Costs
- Average conversation: 500-1000 tokens
- Cost per conversation: ~$0.01-0.05
- 1000 conversations/month: ~$10-50

### Cost Optimization Tips
1. **Set API Rate Limits** - Prevent abuse
2. **Monitor Usage** - Check Anthropic dashboard regularly
3. **Implement Caching** - Cache common responses
4. **Shorter Responses** - System prompt requests concise answers
5. **Usage Analytics** - Track which features are most used

---

## Support & Updates

### Getting Help
- **Anthropic Documentation**: https://docs.anthropic.com/
- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **Issues**: Check browser console for error messages

### Updating Training Data
To update the agent's knowledge:
1. Edit files in `chatbot-training/` directory
2. Changes take effect immediately (no rebuild needed)
3. Reload the browser to load new content

### Future Enhancements
Consider adding:
- Voice activity detection (hands-free mode)
- Multilingual support
- Custom wake words
- Conversation history export
- Integration with your CRM

---

## Quick Start Checklist

- [ ] Get Claude API key from console.anthropic.com
- [ ] Add API key to `js/voice-agent-init.js`
- [ ] Test locally with supported browser
- [ ] Verify microphone permissions work
- [ ] Test voice conversation flows
- [ ] Set up serverless function for production
- [ ] Add to all website pages
- [ ] Update privacy policy
- [ ] Set API rate limits and spending caps
- [ ] Deploy to production (WITHOUT client-side API key!)
- [ ] Monitor usage and costs

---

**Questions?** Contact john@aiadvantagesolutions.ca

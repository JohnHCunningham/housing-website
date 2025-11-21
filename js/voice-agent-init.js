/**
 * AI Advantage Solutions - Voice Agent Initialization
 *
 * PRODUCTION MODE (Default):
 * - Uses Vercel serverless function at /api/chat
 * - API key stored securely in Vercel environment variables
 * - No API key needed in this file
 *
 * LOCAL TESTING MODE (Optional):
 * - Uncomment and set apiKey below to test locally
 * - Uses direct Claude API calls
 * - For testing only - never deploy with API key in client code
 */

// Configuration
const VOICE_AGENT_CONFIG = {
    // Leave empty for production (uses serverless function)
    // For local testing only: uncomment and add your API key
    // apiKey: 'sk-ant-...'
    apiKey: ''
};

// Initialize voice agent when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create voice agent instance
    const voiceAgent = new VoiceAgent({
        apiKey: VOICE_AGENT_CONFIG.apiKey
    });

    // Create UI instance
    const voiceAgentUI = new VoiceAgentUI(voiceAgent);

    // Make available globally for debugging (optional)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.voiceAgent = voiceAgent;
        window.voiceAgentUI = voiceAgentUI;
        const mode = VOICE_AGENT_CONFIG.apiKey ? 'direct API' : 'serverless function';
        console.log(`🎤 Voice Agent initialized (${mode} mode)`);
    }
});

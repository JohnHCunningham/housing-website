/**
 * AI Advantage Solutions - Voice Agent
 * Real-time voice conversation powered by Web Speech API and Claude
 */

class VoiceAgent {
    constructor(config = {}) {
        // Configuration
        this.apiKey = config.apiKey || '';

        // Use serverless function if no API key provided (production mode)
        // Use direct API if API key provided (local testing mode)
        this.apiEndpoint = this.apiKey
            ? 'https://api.anthropic.com/v1/messages'
            : '/api/chat';

        this.model = 'claude-3-opus-20240229';

        // Speech recognition setup
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSpeaking = false;

        // Conversation state
        this.conversationHistory = [];
        this.systemContext = '';

        // Event callbacks
        this.onStatusChange = config.onStatusChange || (() => {});
        this.onTranscript = config.onTranscript || (() => {});
        this.onResponse = config.onResponse || (() => {});
        this.onError = config.onError || (() => {});

        // Initialize
        this.initializeSpeechRecognition();
        this.loadSystemContext();
    }

    /**
     * Initialize Web Speech API for speech recognition
     */
    initializeSpeechRecognition() {
        // Check browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            this.onError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false; // Stop after each phrase
        this.recognition.interimResults = true; // Show interim results
        this.recognition.lang = 'en-US';

        // Event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            this.onStatusChange('listening');
        };

        this.recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');

            this.onTranscript(transcript, event.results[0].isFinal);

            // If final result, send to Claude
            if (event.results[0].isFinal) {
                this.processUserInput(transcript);
            }
        };

        this.recognition.onerror = (event) => {
            this.isListening = false;
            this.onStatusChange('idle');

            let errorMessage = 'Speech recognition error';
            if (event.error === 'no-speech') {
                errorMessage = 'No speech detected. Please try again.';
            } else if (event.error === 'not-allowed') {
                errorMessage = 'Microphone access denied. Please allow microphone access.';
            }

            this.onError(errorMessage);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            if (this.isSpeaking) {
                this.onStatusChange('speaking');
            } else {
                this.onStatusChange('idle');
            }
        };
    }

    /**
     * Load system context from chatbot training data
     */
    async loadSystemContext() {
        try {
            // Load all training files
            const files = [
                '1-company-overview.txt',
                '2-services-detailed.txt',
                '3-aoda-compliance-info.txt',
                '4-faqs.txt',
                '5-contact-process.txt'
            ];

            const baseUrl = window.location.origin + '/chatbot-training/';
            const contextParts = [];

            for (const file of files) {
                try {
                    const response = await fetch(baseUrl + file);
                    if (response.ok) {
                        const content = await response.text();
                        contextParts.push(content);
                    }
                } catch (error) {
                    console.warn(`Could not load ${file}:`, error);
                }
            }

            this.systemContext = `You are a friendly and knowledgeable voice assistant for AI Advantage Solutions, a company that helps Ontario housing providers with mixed income communities, near market rentals, and AODA compliance.

Key guidelines for your responses:
- Be conversational and natural - you're having a voice conversation
- Keep responses concise (2-3 sentences max) since you're speaking aloud
- Be warm, professional, and helpful
- If you don't know something, be honest and offer to have someone contact them
- For complex questions, offer to send detailed information via email
- Always offer next steps (book a call, send an email, etc.)

Company Information:
${contextParts.join('\n\n---\n\n')}

Remember: You're speaking, not writing, so be conversational and concise.`;

        } catch (error) {
            console.error('Error loading system context:', error);
            // Use fallback context
            this.systemContext = `You are a friendly voice assistant for AI Advantage Solutions, a housing consulting company in Ontario. Help visitors learn about mixed income communities, near market rentals, and AODA compliance. Keep responses brief and conversational since you're speaking.`;
        }
    }

    /**
     * Start listening to user
     */
    startListening() {
        if (!this.recognition) {
            this.onError('Speech recognition not available');
            return;
        }

        if (this.isListening) {
            return;
        }

        // Stop any ongoing speech
        if (this.isSpeaking) {
            this.synthesis.cancel();
            this.isSpeaking = false;
        }

        try {
            this.recognition.start();
        } catch (error) {
            this.onError('Could not start listening: ' + error.message);
        }
    }

    /**
     * Stop listening
     */
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    /**
     * Process user input and get response from Claude
     */
    async processUserInput(userMessage) {
        this.onStatusChange('thinking');

        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        try {
            // Prepare request options
            const requestBody = {
                system: this.systemContext,
                messages: this.conversationHistory
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            };

            // Add API key header only if using direct API (local testing)
            if (this.apiKey) {
                requestOptions.headers['x-api-key'] = this.apiKey;
                requestOptions.headers['anthropic-version'] = '2023-06-01';
                requestBody.model = this.model;
                requestBody.max_tokens = 1024;
            }

            // Call API (either serverless function or direct Claude API)
            const response = await fetch(this.apiEndpoint, requestOptions);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'API request failed');
            }

            const data = await response.json();
            const assistantMessage = data.content[0].text;

            // Add to conversation history
            this.conversationHistory.push({
                role: 'assistant',
                content: assistantMessage
            });

            // Display and speak response
            this.onResponse(assistantMessage);
            this.speak(assistantMessage);

        } catch (error) {
            this.onError('Error getting response: ' + error.message);
            this.onStatusChange('idle');
        }
    }

    /**
     * Speak text using speech synthesis
     */
    speak(text) {
        // Cancel any ongoing speech
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to use a natural-sounding voice
        const voices = this.synthesis.getVoices();
        const preferredVoice = voices.find(voice =>
            voice.lang.startsWith('en') &&
            (voice.name.includes('Natural') || voice.name.includes('Premium') || voice.name.includes('Enhanced'))
        ) || voices.find(voice => voice.lang.startsWith('en'));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
            this.isSpeaking = true;
            this.onStatusChange('speaking');
        };

        utterance.onend = () => {
            this.isSpeaking = false;
            this.onStatusChange('idle');
        };

        utterance.onerror = (event) => {
            this.isSpeaking = false;
            this.onStatusChange('idle');
            this.onError('Speech synthesis error: ' + event.error);
        };

        this.synthesis.speak(utterance);
    }

    /**
     * Stop speaking
     */
    stopSpeaking() {
        this.synthesis.cancel();
        this.isSpeaking = false;
        this.onStatusChange('idle');
    }

    /**
     * Reset conversation
     */
    resetConversation() {
        this.conversationHistory = [];
        this.stopListening();
        this.stopSpeaking();
        this.onStatusChange('idle');
    }

    /**
     * Set API key
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Check if browser supports required features
     */
    static checkBrowserSupport() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const hasSpeechRecognition = !!SpeechRecognition;
        const hasSpeechSynthesis = 'speechSynthesis' in window;

        return {
            supported: hasSpeechRecognition && hasSpeechSynthesis,
            speechRecognition: hasSpeechRecognition,
            speechSynthesis: hasSpeechSynthesis
        };
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoiceAgent;
}

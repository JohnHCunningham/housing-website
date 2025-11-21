/**
 * AI Advantage Solutions - Voice Agent UI
 * User interface and controls for the voice agent
 */

class VoiceAgentUI {
    constructor(voiceAgent) {
        this.voiceAgent = voiceAgent;
        this.isOpen = false;
        this.elements = {};

        this.init();
    }

    /**
     * Initialize the UI
     */
    init() {
        // Create UI elements
        this.createFloatingButton();
        this.createVoicePanel();
        this.attachEventListeners();

        // Check browser support
        const support = VoiceAgent.checkBrowserSupport();
        if (!support.supported) {
            this.showError('Your browser does not support voice features. Please use Chrome, Edge, or Safari.');
        }
    }

    /**
     * Create floating voice button
     */
    createFloatingButton() {
        const button = document.createElement('button');
        button.id = 'voice-agent-fab';
        button.className = 'voice-fab';
        button.setAttribute('aria-label', 'Open voice assistant');
        button.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
        `;

        document.body.appendChild(button);
        this.elements.fab = button;
    }

    /**
     * Create voice panel interface
     */
    createVoicePanel() {
        const panel = document.createElement('div');
        panel.id = 'voice-agent-panel';
        panel.className = 'voice-panel';
        panel.innerHTML = `
            <div class="voice-panel-header">
                <h3>Voice Assistant</h3>
                <button class="voice-close-btn" aria-label="Close voice assistant">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div class="voice-panel-body">
                <div class="voice-status">
                    <div class="status-indicator" id="voice-status-indicator">
                        <div class="status-dot"></div>
                        <span class="status-text">Ready to chat</span>
                    </div>
                </div>

                <div class="voice-conversation" id="voice-conversation">
                    <div class="voice-welcome">
                        <p>👋 Hi! I'm your AI Advantage Solutions voice assistant.</p>
                        <p>Click the microphone button below to start talking. I can help with:</p>
                        <ul>
                            <li>Mixed income communities</li>
                            <li>Near market rentals</li>
                            <li>AODA compliance</li>
                            <li>Our services and pricing</li>
                            <li>Booking a consultation</li>
                        </ul>
                    </div>
                </div>

                <div class="voice-controls">
                    <button class="voice-mic-btn" id="voice-mic-btn" aria-label="Click to speak">
                        <svg class="mic-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                        <svg class="stop-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style="display: none;">
                            <rect x="6" y="6" width="12" height="12" rx="2"></rect>
                        </svg>
                    </button>
                    <button class="voice-reset-btn" id="voice-reset-btn" aria-label="Reset conversation">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                            <path d="M21 3v5h-5"></path>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                            <path d="M3 21v-5h5"></path>
                        </svg>
                    </button>
                </div>

                <div class="voice-error" id="voice-error" style="display: none;"></div>
            </div>

            <div class="voice-panel-footer">
                <p class="voice-hint">
                    <strong>Tip:</strong> Speak clearly and wait for the response. You can interrupt by clicking the microphone button.
                </p>
            </div>
        `;

        document.body.appendChild(panel);

        // Store element references
        this.elements.panel = panel;
        this.elements.conversation = panel.querySelector('#voice-conversation');
        this.elements.statusIndicator = panel.querySelector('#voice-status-indicator');
        this.elements.statusText = panel.querySelector('.status-text');
        this.elements.micBtn = panel.querySelector('#voice-mic-btn');
        this.elements.resetBtn = panel.querySelector('#voice-reset-btn');
        this.elements.closeBtn = panel.querySelector('.voice-close-btn');
        this.elements.error = panel.querySelector('#voice-error');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Floating button
        this.elements.fab.addEventListener('click', () => this.toggle());

        // Close button
        this.elements.closeBtn.addEventListener('click', () => this.close());

        // Microphone button
        this.elements.micBtn.addEventListener('click', () => this.handleMicClick());

        // Reset button
        this.elements.resetBtn.addEventListener('click', () => this.handleReset());

        // Voice agent callbacks
        this.voiceAgent.onStatusChange = (status) => this.updateStatus(status);
        this.voiceAgent.onTranscript = (text, isFinal) => this.handleTranscript(text, isFinal);
        this.voiceAgent.onResponse = (text) => this.handleResponse(text);
        this.voiceAgent.onError = (error) => this.showError(error);
    }

    /**
     * Toggle panel open/close
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Open voice panel
     */
    open() {
        this.elements.panel.classList.add('open');
        this.elements.fab.classList.add('hidden');
        this.isOpen = true;
    }

    /**
     * Close voice panel
     */
    close() {
        this.elements.panel.classList.remove('open');
        this.elements.fab.classList.remove('hidden');
        this.isOpen = false;

        // Stop any ongoing activity
        this.voiceAgent.stopListening();
        this.voiceAgent.stopSpeaking();
    }

    /**
     * Handle microphone button click
     */
    handleMicClick() {
        if (this.voiceAgent.isListening) {
            this.voiceAgent.stopListening();
        } else if (this.voiceAgent.isSpeaking) {
            this.voiceAgent.stopSpeaking();
        } else {
            this.hideError();
            this.voiceAgent.startListening();
        }
    }

    /**
     * Handle reset button click
     */
    handleReset() {
        this.voiceAgent.resetConversation();

        // Clear conversation display
        this.elements.conversation.innerHTML = `
            <div class="voice-welcome">
                <p>Conversation reset. What would you like to know?</p>
            </div>
        `;

        this.hideError();
    }

    /**
     * Update status indicator
     */
    updateStatus(status) {
        const indicator = this.elements.statusIndicator;
        const statusText = this.elements.statusText;
        const micBtn = this.elements.micBtn;
        const micIcon = micBtn.querySelector('.mic-icon');
        const stopIcon = micBtn.querySelector('.stop-icon');

        // Remove all status classes
        indicator.classList.remove('listening', 'thinking', 'speaking');

        switch (status) {
            case 'listening':
                indicator.classList.add('listening');
                statusText.textContent = 'Listening...';
                micBtn.classList.add('active');
                micIcon.style.display = 'none';
                stopIcon.style.display = 'block';
                break;

            case 'thinking':
                indicator.classList.add('thinking');
                statusText.textContent = 'Thinking...';
                micBtn.classList.remove('active');
                micIcon.style.display = 'block';
                stopIcon.style.display = 'none';
                break;

            case 'speaking':
                indicator.classList.add('speaking');
                statusText.textContent = 'Speaking...';
                micBtn.classList.add('active');
                micIcon.style.display = 'none';
                stopIcon.style.display = 'block';
                break;

            default: // idle
                statusText.textContent = 'Ready to chat';
                micBtn.classList.remove('active');
                micIcon.style.display = 'block';
                stopIcon.style.display = 'none';
        }
    }

    /**
     * Handle transcript from speech recognition
     */
    handleTranscript(text, isFinal) {
        // Remove any existing interim transcript
        const existingInterim = this.elements.conversation.querySelector('.message-interim');
        if (existingInterim) {
            existingInterim.remove();
        }

        if (isFinal) {
            // Add final user message
            this.addMessage('user', text);
        } else {
            // Show interim transcript
            const interimDiv = document.createElement('div');
            interimDiv.className = 'message user-message message-interim';
            interimDiv.innerHTML = `<p><em>${text}...</em></p>`;
            this.elements.conversation.appendChild(interimDiv);
            this.scrollToBottom();
        }
    }

    /**
     * Handle response from Claude
     */
    handleResponse(text) {
        this.addMessage('assistant', text);
    }

    /**
     * Add message to conversation
     */
    addMessage(role, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;

        const label = role === 'user' ? 'You' : 'Assistant';
        messageDiv.innerHTML = `
            <div class="message-label">${label}</div>
            <p>${text}</p>
        `;

        this.elements.conversation.appendChild(messageDiv);
        this.scrollToBottom();
    }

    /**
     * Scroll conversation to bottom
     */
    scrollToBottom() {
        this.elements.conversation.scrollTop = this.elements.conversation.scrollHeight;
    }

    /**
     * Show error message
     */
    showError(message) {
        this.elements.error.textContent = message;
        this.elements.error.style.display = 'block';
    }

    /**
     * Hide error message
     */
    hideError() {
        this.elements.error.style.display = 'none';
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoiceAgentUI;
}

/**
 * Vercel Serverless Function - Claude API Proxy
 * This securely handles Claude API calls server-side
 */

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get API key from environment variable (set in Vercel dashboard)
    const apiKey = process.env.CLAUDE_API_KEY;

    if (!apiKey) {
        console.error('CLAUDE_API_KEY environment variable not set');
        return res.status(500).json({
            error: 'Server configuration error. Please contact support.'
        });
    }

    try {
        const { messages, system } = req.body;

        // Validate request
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid request: messages required' });
        }

        // Call Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1024,
                system: system,
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Claude API error:', errorData);
            // Return the full error details for debugging
            return res.status(response.status).json({
                error: errorData.error?.message || errorData.message || JSON.stringify(errorData.error) || 'API request failed',
                details: errorData
            });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error in chat function:', error);
        return res.status(500).json({
            error: 'Internal server error. Please try again.'
        });
    }
}

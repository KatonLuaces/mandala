import fetch from 'node-fetch';

/**
 * Handler function to generate a mandala image using DALL-E API.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Only GET requests allowed' });
        return;
    }

    try {
        // Call DALL-E API to generate the image
        const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: 'A beautiful and intricate mandala with vibrant colors and geometric patterns',
                n: 1,
                size: '1024x1024'
            })
        });

        if (!openaiResponse.ok) {
            throw new Error(`OpenAI API error: ${openaiResponse.statusText}`);
        }

        const result = await openaiResponse.json();

        if (!result.data || !result.data[0].url) {
            throw new Error('No image URL returned from OpenAI API');
        }

        const imageUrl = result.data[0].url;

        // Respond with the image URL
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Image generation failed' });
    }
}
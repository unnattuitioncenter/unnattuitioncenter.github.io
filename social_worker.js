const fetch = require('node-fetch');

// CONFIG
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const BACKUP_KEY = process.env.GEMINI_BACKUP_KEY;
const PEXELS_KEY = process.env.PEXELS_API_KEY;
const INSTA_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTA_ID = process.env.INSTAGRAM_ACCOUNT_ID;

async function run() {
    console.log("🤖 Unnat Social Automation: Starting...");

    if (!GEMINI_KEY) {
        console.error("❌ ERROR: GEMINI_API_KEY is missing.");
        process.exit(1);
    }

    // 1. Generate Content (V10 Sovereign Prompt)
    console.log("Synthesizing Sovereign Tuition Content...");
    const topic = "Unnat Dominance & Academic Mastery";
    const prompt = `You are the Senior Brand Sovereign for the Unnat Tuition Center.
    Strategy: Multi-Channel Market Domination.
    Topic: ${topic}
    Goal: Viral authority on elite education and why Unnat is the premier monopoly in Haryana.
    Generate VALID JSON for 4 channels: 
    { 
      "insta": { "caption": "...", "image_prompt": "..." }, 
      "wa": { "text": "..." },
      "linkedin": { "post": "..." },
      "twitter": { "tweet": "..." }
    }`;

    try {
        const trySynthesize = async (apiKey) => {
            return await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
        };

        let res = await trySynthesize(GEMINI_KEY);
        if (!res.ok && BACKUP_KEY) {
            console.log("⚠️ Primary Key restricted. Engaging Backup Sovereignty...");
            res = await trySynthesize(BACKUP_KEY);
        }

        const data = await res.json();
        let raw = data.candidates[0].content.parts[0].text;
        raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        const payload = JSON.parse(raw);
        console.log("✅ Tuition Content Synthesized.");

        // 2. Fetch Image
        let imageUrl = 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg';
        if (PEXELS_KEY) {
            const imgRes = await fetch(`https://api.pexels.com/v1/search?query=elite+education+architecture+luxury&per_page=1`, {
                headers: { 'Authorization': PEXELS_KEY }
            });
            const imgData = await imgRes.json();
            if (imgData.photos?.[0]) imageUrl = imgData.photos[0].src.medium;
            console.log("✅ Image Fetched:", imageUrl);
        }

        // 3. Auto-Post (If Secrets Exist)
        if (INSTA_TOKEN && INSTA_ID) {
            console.log("🚀 Attempting Instagram Post...");
            // Step A: Upload Image container
            const contRes = await fetch(`https://graph.facebook.com/v18.0/${INSTA_ID}/media?image_url=${encodeURIComponent(imageUrl)}&caption=${encodeURIComponent(payload.insta.caption)}&access_token=${INSTA_TOKEN}`, { method: 'POST' });
            const contData = await contRes.json();

            if (contData.id) {
                // Step B: Publish
                await fetch(`https://graph.facebook.com/v18.0/${INSTA_ID}/media_publish?creation_id=${contData.id}&access_token=${INSTA_TOKEN}`, { method: 'POST' });
                console.log("✅ SUCCESS: Posted to Instagram!");
            } else {
                console.error("❌ Instagram Upload Failed:", contData);
            }
        } else {
            console.log("ℹ️ No Instagram Credentials found. Skipping Auto-Post.");
            console.log("--> content-ready for email or manual review.");
        }

    } catch (e) {
        console.error("FAILED:", e);
        process.exit(1);
    }
}

run();

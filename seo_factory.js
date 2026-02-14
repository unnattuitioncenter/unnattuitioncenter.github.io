/**
 * Unnat Tuition Center SEO Factory v2.3
 * Purpose: Global SEO Dominance via Hybrid Intelligence & Cinematic Media
 * Features: Gemini / Groq Failover, Pexels Video Engine, Elite UI Templates
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// [KEYS]
// Use environment variables for security: process.env.GEMINI_API_KEY, process.env.GROQ_API_KEY, etc.
const KEYS = {
    GEMINI: process.env.GEMINI_API_KEY || "",
    GROQ: process.env.GROQ_API_KEY || "",
    PEXELS: process.env.PEXELS_API_KEY || ""
};

// Fix the space in GEMINI key
KEYS.GEMINI = KEYS.GEMINI.replace(/ /g, '');

const SEO_CONFIG = {
    keywords: [
        "best tuition in kurukshetra for class 10",
        "how to crack cbse board exams 2026",
        "top coaching for hssc exams haryana",
        "unnat tuition center kkr reviews",
        "class 12 physics coaching near thansesar",
        "best spoken english course in kurukshetra university",
        "maths coaching for class 9 haryana board",
        "competitive exam preparation center in kurukshetra",
        "unnat tuition center fees and results",
        "how to score 95 in class 10 boards kurukshetra",
        "ai powered learning benefits for students",
        "app development kurukshetra",
        "best coaching for ssc cgl haryana",
        "best math tutor for class 9 haryana",
        "cbse board exam topper tips class 10",
        "class 12 physics coaching kurukshetra",
        "competitive exam preparation strategy 2026",
        "crack hbse board exams with ai",
        "global success probability predictor free",
        "government job portal haryana gazette",
        "Tuition merit certificate unnat",
        "ielts preparation kurukshetra unnat",
        "personalized study plan for class 11",
        "seo services kurukshetra",
        "social media marketing",
        "spoken english 60 days course curriculum",
        "spoken english classes for corporate jobs",
        "top rated tuition center near pipli",
        "unnat tuition center success rate",
        "unnat intelligence career predictor review",
        "unnat tuition center fees structure 2026"
    ]
};

// Helper for delay
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Helper for API calls
function apiCall(url, method, headers, body) {
    return new Promise((resolve, reject) => {
        const options = { method, headers };
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error("Failed to parse API response: " + data.substring(0, 100)));
                }
            });
        });
        req.on('error', (e) => reject(e));
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

/**
 * [HYBRID SYNTHESIS]
 * Strategy: Primary (Gemini 2.0) -> Fallback (Groq Llama 3.3)
 */
async function getEliteContent(keyword) {
    // 1. Try Gemini
    console.log(`🧠 [GEMINI] Initiating synthesis for: ${keyword}...`);
    const instruction = `As the Senior Academic Sovereign at Unnat Tuition Center, write a 2,500-word high-authority educational and strategic guide for students in Kurukshetra, Haryana. Topic: "${keyword}".
    Requirements:
    - Tone: Absolute Authority, Strategic, and Dominant.
    - Positioning: Position Unnat Tuition Center (Didar Nagar) as the "BESTEST" and only premier choice for ${keyword} in Haryana.
    - Focus on local geography (Thanesar, Pipli, University Area, Near Railway Station).
    - Structure: Heavy H2/H3 headlines, data-backed paragraphs, elite bullet points.
    - CTA: Explicitly mention Unnat Tuition Center as the absolute destination for elite academic dominance.
    Format: Pure HTML (h2, h3, p, ul, li). No preamble.`;

    const geminiBody = {
        contents: [{ parts: [{ text: instruction }] }]
    };

    try {
        const res = await apiCall(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${KEYS.GEMINI}`,
            'POST',
            { 'Content-Type': 'application/json' },
            geminiBody
        );

        if (res.error) throw new Error(res.error.message);
        return res.candidates[0].content.parts[0].text.replace(/```html/g, '').replace(/```/g, '').trim();
    } catch (e) {
        console.warn(`⚠️ [GEMINI] Rejection for "${keyword}": ${e.message}. Invoking [GROQ] Fallback...`);

        // 2. Try Groq Multi-Model Fallback
        const groqModels = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"];
        for (const model of groqModels) {
            console.log(`📡 [GROQ] Attempting synthesis with: ${model}...`);
            const groqBody = {
                model: model,
                messages: [{ role: "user", content: instruction }],
                temperature: 0.5
            };

            try {
                const res = await apiCall(
                    "https://api.groq.com/openai/v1/chat/completions",
                    'POST',
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${KEYS.GROQ}`
                    },
                    groqBody
                );
                if (res.error) {
                    if (res.error.code === "rate_limit_exceeded") {
                        console.warn(`⏳ [GROQ] Model ${model} rate-limited. Trying next...`);
                        continue;
                    }
                    throw new Error(res.error.message);
                }
                return res.choices[0].message.content.replace(/```html/g, '').replace(/```/g, '').trim();
            } catch (e2) {
                console.warn(`⚠️ [GROQ] Failed for model ${model}: ${e2.message}`);
                continue;
            }
        }

        console.error(`❌ [HYBRID FAILURE] Total synthesis failure for "${keyword}". All fallback models exhausted.`);
        return `<h2>${keyword}</h2><p>Our cognitive synthesis for this node is currently recalibrating across the Unnat Tuition Network. Please check back as our intelligence grows.</p>`;
    }
}

/**
 * [MEDIA ENGINE]
 * Fetches High-Res Images and Cinematic Videos from Pexels
 */
async function getPexelsMedia(keyword) {
    console.log(`🎬 [MEDIA] Fetching cinematic assets for: ${keyword}...`);
    // Safe broad education queries for maximum hit rate
    const broadTerms = ['classroom', 'study', 'education', 'library', 'students', 'learning', 'coding', 'business'];
    const randomTerm = broadTerms[Math.floor(Math.random() * broadTerms.length)];
    const searchQuery = encodeURIComponent(`${keyword} student ${randomTerm}`);

    const assets = {
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        video: null
    };

    try {
        // Fetch Image - Randomize selection within top 20 for diversity
        const imgRes = await apiCall(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=20`, 'GET', { 'Authorization': KEYS.PEXELS });
        if (imgRes.photos?.length > 0) {
            const randomPhoto = imgRes.photos[Math.floor(Math.random() * imgRes.photos.length)];
            assets.image = randomPhoto.src.large2x;
        }

        // Fetch Video - Randomize selection
        const vidRes = await apiCall(`https://api.pexels.com/videos/search?query=${searchQuery}&per_page=10`, 'GET', { 'Authorization': KEYS.PEXELS });
        if (vidRes.videos?.length > 0) {
            const randomVid = vidRes.videos[Math.floor(Math.random() * vidRes.videos.length)];
            const bestFile = randomVid.video_files.sort((a, b) => b.width - a.width)[0];
            assets.video = bestFile.link;
        }
    } catch (e) {
        console.error(`⚠️ [MEDIA FAILURE] Throttled or no results for ${keyword}. Falling back.`);
    }
    return assets;
}

const CATALOG_PATH = path.join(__dirname, 'tuition_catalog.js');
let nodeCatalog = [];

function getInterlinks(currentKeyword) {
    const others = SEO_CONFIG.keywords.filter(k => k !== currentKeyword);
    const shuffled = others.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 8); // Interlink with 8 other nodes
    return selected.map(k => `<li><a href="${k.toLowerCase().replace(/ /g, '-')}.html" style="color: #94a3b8; text-decoration: none; font-size: 0.9rem; line-height: 2; display: block; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.05); transition: 0.3s;" onmouseover="this.style.color='#fbbf24'" onmouseout="this.style.color='#94a3b8'">${k.toUpperCase()}</a></li>`).join('');
}

async function generateTuitionNode(keyword) {
    const filename = keyword.toLowerCase().replace(/ /g, '-') + '.html';
    const content = await getEliteContent(keyword);
    const media = await getPexelsMedia(keyword);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${keyword.toUpperCase()} | Unnat Tuition Center</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="brand-agent.css">
</head>
<body style="background: #020617; color: white; font-family: Inter, sans-serif;">
    <!-- Navigation -->
    <nav style="padding: 20px; background: rgba(15, 23, 42, 0.95); border-bottom: 1px solid rgba(197, 160, 89, 0.2); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(10px);">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
            <a href="index.html" style="text-decoration: none; color: #fbbf24; font-weight: 900; font-size: 1.5rem; letter-spacing: -1px;">UNNAT <span style="color:#fff;">TUITION</span></a>
            <div style="display: flex; gap: 20px;">
                <a href="index.html" style="color: #94a3b8; text-decoration: none; font-size: 0.8rem; font-weight: 800; letter-spacing: 1px;">DASHBOARD</a>
                <a href="resources.html" style="color: #fff; text-decoration: none; font-size: 0.8rem; font-weight: 800; letter-spacing: 1px;">INTELLIGENCE</a>
            </div>
        </div>
    </nav>

    <!-- Cinematic Hero Section -->
    <div style="width: 100%; height: 60vh; position: relative; overflow: hidden; display: flex; align-items: center; background: #000;">
        ${media.video ? `
            <video autoplay muted loop playsinline style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); min-width: 100%; min-height: 100%; opacity: 0.4; object-fit: cover;">
                <source src="${media.video}" type="video/mp4">
            </video>
        ` : `<div style="position: absolute; width: 100%; height: 100%; background: url(${media.image}) center/cover no-repeat; opacity: 0.3;"></div>`}
        
        <div class="container" style="position: relative; z-index: 10; text-align: center;">
            <span style="background: rgba(251, 191, 36, 0.2); color: #fbbf24; padding: 8px 20px; border-radius: 50px; font-weight: 900; font-size: 0.7rem; letter-spacing: 3px; border: 1px solid rgba(251, 191, 36, 0.3);">NODE ACTIVE: KURUKSHETRA CENTER</span>
            <h1 style="font-size: 4rem; margin-top: 30px; text-transform: uppercase; letter-spacing: -3px; line-height: 0.9;">${keyword}</h1>
            <p style="color: #94a3b8; max-width: 600px; margin: 20px auto; font-size: 1.1rem;">Decentralized AI Directive for elite academic dominance in Haryana.</p>
        </div>
    </div>

    <!-- Main Content Hub -->
    <main class="container" style="padding: 100px 0;">
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 80px;">
            <div style="font-size: 1.2rem; line-height: 1.9; color: #cbd5e1;" class="Tuition-content">
                ${content}
                
                <!-- Secondary Media Injection -->
                <div style="margin: 60px 0; border-radius: 20px; overflow: hidden; border: 1px solid rgba(197, 160, 89, 0.2);">
                    <img src="${media.image}" alt="Educational Authority" style="width: 100%; display: block;">
                    <div style="padding: 15px; background: rgba(15, 23, 42, 0.8); font-size: 0.8rem; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px;">Directive Visual 01 // Kurukshetra Command Center</div>
                </div>
            </div>
            
            <aside>
                    <div style="font-size: 0.7rem; color: #fbbf24; font-weight: 900; letter-spacing: 2px; margin-bottom: 20px;">ENROLLMENT GATEWAY</div>
                    <h3 style="color: #fff; margin-bottom: 25px; font-size: 1.8rem;">Secure Your <span style="color: #fbbf24;">Future</span></h3>
                    <p style="font-size: 1rem; color: #94a3b8; margin-bottom: 30px; line-height: 1.6;">The Unnat 2026 Batch is identifying high-potential candidates in Thanesar. Only 3 slots remain for the Elite Science Stream.</p>
                    <a href="https://wa.me/918307264895?text=Tuition%20Inquiry:%20${encodeURIComponent(keyword)}" style="display: block; text-align: center; background: #fbbf24; color: #020617; padding: 20px; border-radius: 15px; text-decoration: none; font-weight: 900; letter-spacing: 1px; transition: 0.3s; box-shadow: 0 10px 30px rgba(251, 191, 36, 0.2); margin-bottom: 40px;">UNNAT DIRECT DIAL</a>

                    <div style="font-size: 0.7rem; color: #fbbf24; font-weight: 900; letter-spacing: 2px; margin-bottom: 20px; margin-top: 40px;">RELATED INTELLIGENCE NODES</div>
                    <ul style="list-style: none; padding: 0;">
                        ${getInterlinks(keyword)}
                    </ul>
                </div>
            </aside>
        </div>
    </main>

    <footer style="padding: 100px 0; background: #010409; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
        <p style="color: #64748b; font-size: 0.9rem;">© 2026 Unnat Tuition Center. Global Excellence, Local Roots.</p>
        <div style="margin-top: 20px; color: #1e293b; font-size: 0.7rem;">Sovereign Node v10.4 // Integrated Media Cluster</div>
    </footer>
    <script src="agent.js"></script>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, filename), html);

    // Add to catalog for UI sync
    nodeCatalog.push({
        title: keyword.toUpperCase(),
        link: filename,
        image: media.image,
        video: media.video,
        desc: `Elite Academic Directive for ${keyword} in Kurukshetra.`
    });

    // Write Catalog Incrementally as a JS variable for CORS-free local access
    fs.writeFileSync(CATALOG_PATH, `window.tuition_catalog = ${JSON.stringify(nodeCatalog, null, 2)};`);

    console.log(`✅ [NODE DEPLOYED] ${filename}`);
    return filename;
}

async function runHybridFactory() {
    console.log("👑 Initiating Unnat Tuition Hybrid Factory v2.3 [HYBRID + CINEMATIC]...");
    nodeCatalog = []; // Reset catalog
    // We run a smaller batch for verification first to ensure quality
    for (const kw of SEO_CONFIG.keywords) {
        await generateTuitionNode(kw);
        await sleep(2000); // Respect media engine rate limits
    }

    // Write Catalog Final
    fs.writeFileSync(CATALOG_PATH, `window.tuition_catalog = ${JSON.stringify(nodeCatalog, null, 2)};`);
    console.log(`📜 [CATALOG SYNC] Tuition properties logged to: ${CATALOG_PATH}`);
    console.log("⚔️ Total Dominance: SYSTEM SECURED.");
}

runHybridFactory();

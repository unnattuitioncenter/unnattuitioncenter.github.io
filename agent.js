/**
 * Unnat Tuition Intelligence v10
 * Version: 10.2.0
 * Primary Directive: Global Academic Strategy & AI Sovereignty
 */

const UnnatSovereignEngine = {
    async synthesize(type, context, customPrompt = null) {
        const keys = await UnnatAgent.getKeys();
        const basePersona = "Senior Brand Sovereign and Lead Architect for the Unnat Tuition Center.";

        const strategyMap = {
            'CENTER': `Strategy: Establish absolute brand dominance. Position Unnat as the "BESTEST" and premier academic institution in ${context.city}.`,
            'GAZETTE': `Strategy: Regional Career Intelligence. Focus on elite opportunities in ${context.city}.`,
            'BLOG': `Strategy: Instructional Sovereignty. Generate authoritative deep-dives.`,
            'SOCIAL': `Strategy: Viral Market Domination. Viral authority in ${context.region}.`
        };

        const prompt = customPrompt || `
            Role: ${basePersona}
            Context: ${JSON.stringify(context)}
            ${strategyMap[type] || ''}
            Mission: Generate recursive elite output for ${type} node.
            Formatting: Response must be VALID JSON.
        `;

        // Multi-step reasoning capacity (Internal)
        console.log(`👑 Sovereign Engine: Executing ${type} synthesis with Reasoning v10...`);

        const tryWithKey = async (apiKey) => {
            const modelName = "gemini-2.0-flash";
            return await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: { response_mime_type: "application/json" }
                })
            });
        };

        const tryGroqFallback = async (apiKey) => {
            console.log("📡 Sovereign Engine: Engaging Groq High-Speed Failover...");
            return await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [{ role: "user", content: prompt }],
                    response_format: { type: "json_object" }
                })
            });
        };

        try {
            let res = await tryWithKey(keys.gemini);
            if (!res.ok) res = await tryWithKey(keys.backup);

            if (!res.ok && keys.groq) {
                res = await tryGroqFallback(keys.groq);
                const data = await res.json();
                return JSON.parse(data.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim());
            }

            const data = await res.json();
            let raw = data.candidates[0].content.parts[0].text;
            return JSON.parse(raw.replace(/```json/g, '').replace(/```/g, '').trim());
        } catch (e) {
            console.error(`Sovereign Failure [${type}]:`, e);
            throw e;
        }
    }
};

const UnnatAgent = {
    // [REVOLUTION v10] COGNITIVE ARCHITECT ENGINE
    // Default keys provided for initial setup. Admin panel can override these.
    DEFAULTS: {
        GEMINI: "",
        BACKUP: "",
        PEXELS: "",
        GROQ: ""
    },

    config: {
        brandName: "Unnat Tuition Center",
        location: "Kurukshetra, Haryana", // Historical Core
        whatsapp: "918307264895",
        neighborhoods: ["Thanesar", "Pipli", "Sector 13", "Didar Nagar", "Kalyan Nagar"],
        isGlobal: true // Revolutionary Flag
    },

    async getKeys() {
        // Priority: LocalStorage (Admin Override) > Hardcoded Defaults
        const keys = JSON.parse(localStorage.getItem('unnat_keys') || '{}');
        return {
            gemini: keys.gemini || this.DEFAULTS.GEMINI,
            backup: keys.backup || this.DEFAULTS.BACKUP,
            pexels: keys.pexels || this.DEFAULTS.PEXELS,
            groq: keys.groq || this.DEFAULTS.GROQ
        };
    },

    async getIPContext() {
        try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            return {
                city: data.city || "Kurukshetra",
                region: data.region || "Haryana",
                country: data.country_name || "India",
                isLocal: (data.city === "Kurukshetra" || data.region === "Haryana")
            };
        } catch (e) {
            return { city: "Kurukshetra", region: "Haryana", country: "India", isLocal: true };
        }
    },

    init() {
        this.injectStyles();

        // [PWA] Service Worker Sovereignty
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(() => console.log("Unnat Intelligence: Service Worker Synchronized."))
                .catch(e => console.warn("SW Link Failed:", e));
        }

        // [SETTINGS] Load Config
        const settings = JSON.parse(localStorage.getItem('unnat_settings') || '{"urgency":true, "holiday":false}');

        if (settings.holiday) {
            alert('NOTE: Maintenance Mode is Active. Some features may be disabled.');
        }

        this.renderUI();

        if (settings.urgency) {
            this.startUrgencyProtocol();
        }

        this.startCenterPulse();
        this.startTitleRotator();

        // [ADMIN TELEMETRY] Log System Start
        this._logToAdmin('SYSTEM', 'Unnat Intelligence v10 Online', { version: '10.0.0' });

        // Initial launch
        this.CenterEngine();
        this.GazetteEngine();
        this.PexelsEngine(); // Fetch education images

        // Auto-generate first blog post after 5 seconds
        setTimeout(() => {
            this.BlogEngine();
            this.SocialEngine(); // Generate social content in background
        }, 5000);

        // Automated cycle every 4 hours
        setInterval(() => {
            this.CenterEngine();
            this.GazetteEngine();
            this.PexelsEngine(); // Refresh images
        }, 1000 * 60 * 60 * 4);

        // Auto-generate blog post DAILY for market dominance (365 posts/year)
        setInterval(() => {
            this.BlogEngine();
        }, 1000 * 60 * 60 * 24); // Every 24 hours

        this.setupListeners();
        console.log("Unnat 10.2 [REAL-TIME ENGINE]: Active.");
    },

    async CenterEngine() {
        const context = await this.getIPContext();
        const CACHE_KEY = 'unnat_center_cache';
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        const now = Date.now();

        if (cached.timestamp && (now - cached.timestamp < 1000 * 60 * 60 * 12)) {
            console.log("Unnat Engine: Serving Cached Global Intelligence");
            this.publishDirectives(cached.data.proposals);
            this.updateCenterDashboard(cached.data.citations);
            this.TuitionSEO(cached.data.seo);
            return;
        }

        try {
            const payload = await UnnatSovereignEngine.synthesize('CENTER', context);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, data: payload }));
            this.publishDirectives(payload.proposals);
            this.updateCenterDashboard(payload.citations);
            this.TuitionSEO(payload.seo);
            this._logToAdmin('CENTER', `Intelligence Synthesized for ${context.city}`);
        } catch (e) {
            console.error("Center Engine Failure:", e);
        }
    },

    publishDirectives(proposal) {
        const area = document.getElementById('state-proposals');
        if (!area) return;
        area.innerHTML = `
            <div style="font-family: 'Inter', sans-serif; color: #f1f5f9; background: rgba(197, 160, 89, 0.03); padding: 30px; border: 1px solid rgba(197, 160, 89, 0.2);">
                <div class="official-badge" style="display: inline-block; margin-bottom: 20px;">CENTRAL UPDATE #10.2</div>
                <p style="font-size: 1rem; line-height: 1.8; color: #cbd5e1;">${proposal}</p>
                <div style="margin-top: 25px; border-top: 1px solid rgba(197, 160, 89, 0.1); padding-top: 15px; font-weight: 900; color: var(--brand-gold); font-size: 0.75rem; text-transform: uppercase;">Verified by Unnat Tuition Center Administrative Desk</div>
            </div>
        `;
    },

    async GazetteEngine() {
        const context = await this.getIPContext();
        const CACHE_KEY = 'unnat_gazette_cache';
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        const now = Date.now();

        if (cached.timestamp && (now - cached.timestamp < 1000 * 60 * 60 * 4)) {
            console.log("Gazette Engine: Serving Cached Global Opportunities");
            this.updateGazetteUI(cached.data);
            return;
        }

        try {
            const payload = await UnnatSovereignEngine.synthesize('GAZETTE', context);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, data: payload }));
            this.updateGazetteUI(payload);
            this._logToAdmin('GAZETTE', `Opportunities Updated for ${context.city}`);
        } catch (e) {
            console.error("Gazette Engine Failure:", e);
        }
    },

    async PexelsEngine() {
        const keys = await this.getKeys();
        if (!keys.pexels) return;

        console.log("Pexels Engine: Fetching education-themed images...");

        const queries = ["students studying", "classroom", "education", "learning", "teacher", "books"];
        const randomQuery = queries[Math.floor(Math.random() * queries.length)];

        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${randomQuery}&per_page=6&orientation=landscape`, {
                headers: { 'Authorization': keys.pexels }
            });

            const data = await response.json();
            if (data.photos && data.photos.length > 0) {
                this.updateImagesUI(data.photos);
                console.log(`✅ Loaded ${data.photos.length} education images from Pexels`);
                this._logToAdmin('PEXELS', 'Images Refreshed', { count: data.photos.length, query: randomQuery });
            }
        } catch (e) {
            console.error("Pexels Engine Failure:", e);
        }
    },

    updateImagesUI(photos) {
        // Update blog post thumbnails if they exist
        const blogCards = document.querySelectorAll('.blog-image-placeholder');
        blogCards.forEach((card, index) => {
            if (photos[index]) {
                card.style.backgroundImage = `url(${photos[index].src.large})`;
                card.style.backgroundSize = 'cover';
                card.style.backgroundPosition = 'center';
            }
        });

        // Store images for future use
        if (!window.pexelsImages) window.pexelsImages = [];
        window.pexelsImages = photos;
    },

    async BlogEngine() {
        const keys = await this.getKeys();
        if (!keys.pexels) return;

        const context = await this.getIPContext();
        const keyword = "Academic Excellence";

        try {
            const blogData = await UnnatSovereignEngine.synthesize('BLOG', context);
            const imageQuery = keyword.includes("Academic") ? "student studying" : keyword;
            const imageResponse = await fetch(`https://api.pexels.com/v1/search?query=${imageQuery}&per_page=1&orientation=landscape`, {
                headers: { 'Authorization': keys.pexels }
            });
            const imageData = await imageResponse.json();

            const topic = {
                title: blogData.title || `${keyword} Guide by Unnat`,
                keywords: blogData.keywords || keyword,
                category: "Unnat Insights",
                query: imageQuery
            };

            const blogHTML = this.createBlogHTML(topic, blogData, imageData.photos);
            window.generatedBlog = { filename: `${blogData.slug}.html`, content: blogHTML };
            this.autoDownloadBlog(blogData.slug, blogHTML);
            this.showBlogNotification(topic.title, blogData.slug);
            this._logToAdmin('BLOG', `Generated: ${topic.title}`);
        } catch (e) {
            console.error("Blog Engine Failure:", e);
        }
    },

    createBlogHTML(topic, blogData, images) {
        const featuredImage = images[0]?.src.large || '';
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${topic.title} | Unnat Tuition Center</title>
    <meta name="description" content="${blogData.metaDescription}">
    <meta name="keywords" content="${topic.keywords}">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <nav style="background: #000; padding: 20px 0; border-bottom: 1px solid rgba(197, 160, 89, 0.2);">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <a href="index.html" style="color: var(--brand-gold); font-size: 1.5rem; font-weight: 900; text-decoration: none;">UNNAT</a>
            <div style="display: flex; gap: 30px;">
                <a href="index.html" style="color: #94a3b8; text-decoration: none;">Home</a>
                <a href="resources.html" style="color: #94a3b8; text-decoration: none;">Blog</a>
                <a href="https://wa.me/918307264895" style="color: var(--brand-gold); text-decoration: none;">Contact</a>
            </div>
        </div>
    </nav>

    <article style="max-width: 900px; margin: 60px auto; padding: 0 20px;">
        <header style="margin-bottom: 40px;">
            <div style="color: var(--brand-gold); font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; margin-bottom: 15px;">${topic.category.toUpperCase()}</div>
            <h1 style="font-size: 3rem; color: #fff; margin-bottom: 20px; line-height: 1.2;">${topic.title}</h1>
            <div style="color: #64748b; font-size: 0.9rem;">Published ${date} | Unnat Tuition Center</div>
        </header>

        ${featuredImage ? `<img src="${featuredImage}" alt="${topic.title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 40px;">` : ''}

        <div style="color: #cbd5e1; font-size: 1.1rem; line-height: 1.8;">
            ${blogData.content}
        </div>

        <div style="background: linear-gradient(135deg, rgba(197, 160, 89, 0.1), rgba(197, 160, 89, 0.05)); border: 2px solid var(--brand-gold); border-radius: 8px; padding: 40px; text-align: center; margin: 60px 0;">
            <h3 style="color: var(--brand-gold); font-size: 2rem; margin-bottom: 20px;">Ready to Excel?</h3>
            <p style="color: #cbd5e1; font-size: 1.1rem; margin-bottom: 30px;">Join Unnat Tuition Center</p>
            <a href="https://wa.me/918307264895" class="btn-Tuition" style="display: inline-block; padding: 18px 40px; background: var(--brand-gold); color: #000; text-decoration: none; font-weight: 900; border-radius: 4px;">📚 Book FREE Demo</a>
        </div>
    </article>

    <footer style="background: #000; border-top: 1px solid rgba(197, 160, 89, 0.1); padding: 40px 0; text-align: center;">
        <p style="color: var(--brand-gold); font-size: 1.5rem; margin-bottom: 10px;">UNNAT</p>
        <p style="opacity: 0.3; font-size: 0.7rem;">© 2026 UNNAT. ALL RIGHTS RESERVED.</p>
    </footer>
</body>
</html>`;
    },

    showBlogNotification(title, slug) {
        const notif = document.createElement('div');
        notif.style.cssText = `position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, rgba(197, 160, 89, 0.95), rgba(197, 160, 89, 0.85)); color: #000; padding: 20px 30px; border-radius: 8px; font-weight: 700; z-index: 10000; box-shadow: 0 10px 40px rgba(0,0,0,0.5); max-width: 400px;`;
        notif.innerHTML = `
            <div style="font-size: 1.2rem; margin-bottom: 10px;">✅ Blog Generated!</div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 15px;">${title}</div>
            <button onclick="window.downloadBlog()" style="background: #000; color: var(--brand-gold); border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: 900; width: 100%;">💾 Download ${slug}.html</button>
        `;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 30000);
    },

    autoDownloadBlog(filename, content) {
        try {
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log(`💾 Auto-downloaded: ${filename}`);
        } catch (e) {
            console.error('Auto-download failed:', e);
        }
    },

    updateGazetteUI(data) {
        // 1. Update Jobs
        const jobArea = document.getElementById('gazette-jobs');
        if (jobArea && data.jobs) {
            jobArea.innerHTML = '';
            data.jobs.forEach(item => {
                jobArea.innerHTML += `
                    <div style="padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); transition: 0.3s; cursor: pointer;" 
                         onmouseover="this.style.background='rgba(197, 160, 89, 0.05)'" onmouseout="this.style.background='transparent'">
                        <div style="font-weight: 800; font-size: 0.95rem; color: #fff; margin-bottom: 5px;">${item.title.toUpperCase()}</div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8;">
                            <span>🏢 ${item.dept}</span>
                            <span style="color: var(--brand-gold); font-weight: 700;">📅 ${item.deadline}</span>
                        </div>
                        <a href="https://wa.me/${this.config.whatsapp}?text=Requesting%20Details%20for:%20${encodeURIComponent(item.title)}" 
                           style="display: inline-block; margin-top: 10px; font-size: 0.7rem; color: var(--brand-gold); text-decoration: none; font-weight: 900; letter-spacing: 1px;">
                           APPLY VIA UNNAT DESK <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                `;
            });
        }

        // 2. Update Admit Cards
        const admitArea = document.getElementById('gazette-admit');
        if (admitArea && data.admit) {
            admitArea.innerHTML = '';
            data.admit.forEach(item => {
                admitArea.innerHTML += `
                    <div style="padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <div style="font-weight: 700; font-size: 0.9rem; color: #cbd5e1;">${item.title}</div>
                        <div style="font-size: 0.7rem; color: #64748b; margin-top: 5px;">Release Date: ${item.date}</div>
                    </div>
                `;
            });
        }

        // 3. Update Results
        const resultArea = document.getElementById('gazette-results');
        if (resultArea && data.results) {
            resultArea.innerHTML = '';
            data.results.forEach(item => {
                resultArea.innerHTML += `
                    <div style="padding: 15px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <div style="font-weight: 700; font-size: 0.9rem; color: #4ade80;">${item.title}</div>
                        <div style="font-size: 0.7rem; color: #64748b; margin-top: 5px;">Status: ${item.status}</div>
                    </div>
                `;
            });
        }
    },

    updateCenterDashboard(citations) {
        // Merit Bar Animation
        const bar = document.getElementById('merit-bar');
        const pct = document.getElementById('merit-percent');
        if (bar && pct) {
            setTimeout(() => {
                bar.style.width = '97%';
                pct.innerText = '97%';
            }, 1000);
        }

        // Merit Corridor Stream
        const stream = document.getElementById('merit-stream');
        if (!stream) return;
        stream.innerHTML = '';
        citations.forEach(c => {
            stream.innerHTML += `
                <div class="official-badge" style="padding: 12px 25px; font-size: 0.85rem;">
                    🏛️ ${c.toUpperCase()}
                </div>
            `;
        });
    },

    infectDOM(trends) {
        const grid = document.getElementById('autonomous-feed-grid');
        const proposalsArea = document.getElementById('state-proposals');

        if (grid) {
            grid.innerHTML = '';
            trends.forEach(t => {
                grid.innerHTML += `
                    <div class="inst-card" style="border-left: 2px solid var(--brand-gold);">
                        <div style="font-size: 0.7rem; color: var(--brand-gold); font-weight: 900; margin-bottom: 10px;">DIRECTIVE ANALYTICS</div>
                        <h4 style="margin-bottom: 10px; color: #fff;">${t.label}</h4>
                        <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5;">${t.narrative}</p>
                    </div>
                `;
            });
        }

        if (proposalsArea && trends[0]) {
            proposalsArea.innerHTML = `
                <div style="padding: 15px; border: 1px solid rgba(197, 160, 89, 0.1); background: rgba(0,0,0,0.2);">
                    <div style="font-weight: 800; color: var(--brand-gold); margin-bottom: 10px;">WHITE PAPER G-2026</div>
                    <p style="font-size: 0.9rem; line-height: 1.6;">${trends[0].narrative}</p>
                </div>
            `;
        }
    },

    TuitionSEO(seo) {
        // Unnat Identity Morphing
        document.title = `${seo.title} | Unnat Tuition Center`;

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", `${seo.description} The premier tuition center in Kurukshetra for Classes 1-12 and competitive exams.`);

        const metaKeys = document.querySelector('meta[name="keywords"]');
        if (metaKeys) metaKeys.setAttribute("content", `Tuition in Kurukshetra, Best Coaching, ${seo.keywords}`);

        this.injectSGE(seo);
        console.log("Unnat 10.2: SGE optimized for Brand Restoration.");
    },

    injectSGE(seo) {
        // Unnat SGE Dominance Schema
        let script = document.getElementById('unnat-sge-schema');
        if (!script) {
            script = document.createElement('script');
            script.id = 'unnat-sge-schema';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }

        const schema = {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Unnat Tuition Center Kurukshetra",
            "alternateName": "Unnat Academy",
            "description": seo.description,
            "url": "https://unnattuitioncenter.github.io/",
            "keywords": seo.keywords,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kurukshetra",
                "addressRegion": "Haryana",
                "addressCountry": "IN"
            }
        };
        script.text = JSON.stringify(schema);
    },

    startTitleRotator() {
        const titles = [
            "🏆 #1 Tuition in Kurukshetra",
            "📊 Predict Your Board Score",
            "🤖 Solve Homework with AI",
            "💎 Unnat Genius is Active"
        ];
        let i = 0;
        setInterval(() => {
            document.title = titles[i % titles.length];
            i++;
        }, 3000);
    },

    injectStyles() {
        const css = `
            :root {
                --brand-gold: #c5a059;
                --brand-navy: #0f172a;
                --brand-accent: #1e293b;
                --unnat-neon: var(--brand-gold);
                --glass-bg: rgba(15, 23, 42, 0.98);
            }

            /* Phantom Counselor UI */
            .unnat-counselor-panel {
                position: fixed; bottom: 100px; right: 30px; width: 380px;
                background: var(--glass-bg); backdrop-filter: blur(30px);
                border: 1px solid rgba(251, 191, 36, 0.3);
                border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
                display: none; flex-direction: column; overflow: hidden; z-index: 10000;
                font-family: 'Inter', sans-serif;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .counselor-header {
                background: linear-gradient(135deg, var(--brand-navy), #020617);
                padding: 18px 20px; color: var(--brand-gold); border-bottom: 1px solid rgba(197, 160, 89, 0.2);
                display: flex; align-items: center; gap: 12px;
            }

            .counselor-body {
                padding: 20px; max-height: 420px; overflow-y: auto; background: var(--phantom-black);
                display: flex; flex-direction: column; gap: 15px;
            }

            .counselor-msg {
                background: #1e293b; padding: 14px 18px; border-radius: 18px;
                border-bottom-left-radius: 4px; font-size: 0.95rem; 
                color: #f1f5f9; line-height: 1.6;
                max-width: 85%; border: 1px solid rgba(255,255,255,0.05);
            }

            .msg-user {
                align-self: flex-end; background: var(--phantom-gold); color: #020617;
                border-bottom-left-radius: 18px; border-bottom-right-radius: 4px;
                font-weight: 600;
            }

            .btn-option {
                display: block; width: 100%; padding: 12px;
                background: #1e293b; border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 12px;
                text-align: left; cursor: pointer; transition: all 0.3s; font-size: 0.85rem;
                font-weight: 500; color: #cbd5e1;
            }

            .btn-option:hover {
                background: #334155; border-color: var(--phantom-gold); color: var(--phantom-gold);
            }

            /* Shared Link Style */
            .share-link {
                display: inline-flex; align-items: center; gap: 5px; margin-top: 10px;
                font-size: 0.75rem; color: var(--phantom-gold); text-decoration: none;
                font-weight: 700; opacity: 0.8; transition: 0.3s;
            }
            .share-link:hover { opacity: 1; }

            /* Chat Input Area */
            .chat-input-area {
                padding: 18px; background: #0f172a; border-top: 1px solid rgba(251, 191, 36, 0.1);
                display: flex; gap: 12px; align-items: center;
            }

            #chatInput {
                flex: 1; border: 1px solid #334155; border-radius: 12px;
                padding: 12px 18px; font-size: 0.9rem; outline: none; background: #1e293b; color: white;
            }

            #chatInput:focus { border-color: var(--phantom-gold); }

            .send-btn {
                background: var(--phantom-gold); color: #020617; border: none;
                width: 44px; height: 44px; border-radius: 12px; cursor: pointer;
                display: flex; align-items: center; justify-content: center; font-weight: 800;
            }

            /* Loading Anim */
            .typing-indicator {
                padding: 10px; font-size: 0.8rem; color: var(--brand-gold); font-style: italic; display: none;
                animation: pulse 1.5s infinite;
            }
            @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }

            /* Urgency Bar */
            .unnat-urgency-bar {
                background: var(--brand-gold); color: #020617; padding: 10px; text-align: center;
                font-size: 0.85rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;
                position: sticky; top: 0; z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            }

            .urgency-timer { color: #f43f5e; text-shadow: 1px 1px 0 rgba(0,0,0,0.1); }

            .fomo-toast.active { transform: translateY(0); opacity: 1; }

            /* AI Highlighting & Pulsing */
            @keyframes unnat-pulse {
                0% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(197, 160, 89, 0); }
                100% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0); }
            }

            .ai-glow {
                animation: unnat-pulse 2s infinite;
                border: 2px solid rgba(255, 255, 255, 0.8) !important;
            }

            .status-badge {
                position: absolute;
                top: -5px; right: -5px;
                background: #22c55e;
                color: white;
                font-size: 0.65rem;
                font-weight: 900;
                padding: 4px 8px;
                border-radius: 20px;
                border: 2px solid #020617;
                text-transform: uppercase;
                letter-spacing: 1px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            }

            .ai-avatar-mini {
                width: 100%; height: 100%; border-radius: 50%;
                background: linear-gradient(135deg, #fbbf24, #d97706);
                display: flex; align-items: center; justify-content: center;
                overflow: hidden;
            }
        `;
        const style = document.createElement('style');
        style.innerText = css;
        document.head.appendChild(style);
    },

    renderUI() {
        // Urgency Bar (Universal Tuition Hub)
        const urgency = document.createElement('div');
        urgency.className = 'unnat-urgency-bar';
        urgency.innerHTML = `🌍 <span id="liveCounter">12,482</span> STUDENTS OPTIMIZED GLOBALLY | <span id="fomoLocation">PIPLI</span> JUST JOINED | NEXT BATCH STARTS IN <span class="urgency-timer" id="urgencyTimer">04h 22m 11s</span>`;
        if (document.body.firstChild) document.body.insertBefore(urgency, document.body.firstChild);
        else document.body.appendChild(urgency);

        this.startLivePulse();

        // Advisor Bubble
        const bubble = document.createElement('div');
        bubble.id = 'unnatBubble';
        bubble.className = 'ai-glow';
        bubble.style = `position: fixed; bottom: 30px; right: 30px; width: 80px; height: 80px; 
                        background: radial-gradient(circle, #fbbf24, #d97706); border-radius: 50%;
                        display: flex; align-items: center; justify-content: center; color: #020617;
                        cursor: pointer; z-index: 10001; box-shadow: 0 0 30px rgba(251, 191, 36, 0.4);`;
        bubble.innerHTML = `
            <div class="status-badge">Live</div>
            <div class="ai-avatar-mini">
                <img src="unnat_ai_avatar.png" alt="Unnat AI" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
        `;
        document.body.appendChild(bubble);

        // Counselor Panel
        const panel = document.createElement('div');
        panel.className = 'unnat-counselor-panel';
        panel.id = 'unnatPanel';
        panel.innerHTML = `
            <div class="counselor-header">
                <div style="position: relative;">
                    <div style="width: 45px; height: 45px; background: var(--brand-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255,255,255,0.2); overflow: hidden;">
                        <img src="unnat_ai_avatar.png" alt="Unnat AI" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div style="position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: #22c55e; border-radius: 50%; border: 2px solid #0f172a;"></div>
                </div>
                <div>
                    <div style="font-weight: 900; font-size: 1.1rem; letter-spacing: 1px; color: var(--brand-gold);">UNNAT AI TUTOR</div>
                    <div style="font-size: 0.7rem; opacity: 0.8; color: #fff;">Always Online • Academic Expert</div>
                </div>
            </div>
            <div class="counselor-body" id="counselorChat">
                <div class="counselor-msg">Welcome to **Unnat Academic Intelligence**. I am your Digital Tutor. How can I help you excel today?</div>
            </div>
            <div class="typing-indicator" id="typing">Unnat Genius is processing...</div>
            <div class="chat-input-area">
                <input type="text" id="chatInput" placeholder="Ask anything to the #1 Tutor...">
                <button class="send-btn" id="sendBtn"><i class="fas fa-paper-plane"></i></button>
            </div>
        `;
        document.body.appendChild(panel);

        // FOMO Toast
        const toast = document.createElement('div');
        toast.className = 'fomo-toast';
        toast.id = 'unnatFomo';
        toast.innerHTML = `<div style="width:35px; height:35px; background:#e0f2fe; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; color:#0369a1;">U</div>
            <div style="font-size: 0.85rem;" id="fomoText">Activity...</div>`;
        document.body.appendChild(toast);

        this.initPersonalization();
    },

    async initPersonalization() {
        const context = await this.getIPContext();
        const chat = document.getElementById('counselorChat');
        if (chat) {
            const greeting = context.isLocal
                ? `Hi! Welcome to the Unnat Tuition Command. Growing together in **${context.city}**? I'm your AI Tutor. Ask me anything!`
                : `Greetings from the Unnat Tuition Center. We've optimized your intelligence node for **${context.city}, ${context.country}**. How can I assist your global training today?`;

            chat.innerHTML = `<div class="counselor-msg">${greeting}</div>`;
        }
    },

    startUrgencyProtocol() {
        let hours = 4, mins = 22, secs = 11;
        setInterval(() => {
            secs--;
            if (secs < 0) { secs = 59; mins--; }
            if (mins < 0) { mins = 59; hours--; }
            const timer = document.getElementById('urgencyTimer');
            if (timer) timer.innerText = `${hours}h ${mins}m ${secs} s`;
        }, 1000);
    },

    startLivePulse() {
        let count = 12482;
        const locations = ["London", "New York", "Delhi", "Thanesar", "Sydney", "Dubai", "Pipli", "Berlin", "Toronto"];

        setInterval(() => {
            count += Math.floor(Math.random() * 3) + 1;
            const live = document.getElementById('liveCounter');
            const locText = document.getElementById('fomoLocation');
            if (live) live.innerText = count.toLocaleString();
            if (locText) {
                const newLoc = locations[Math.floor(Math.random() * locations.length)];
                locText.innerText = newLoc.toUpperCase();
                locText.style.color = "#ef4444";
                setTimeout(() => locText.style.color = "inherit", 1000);
            }
        }, 8000);
    },

    startCenterPulse() {
        const locations = this.config.neighborhoods;
        const events = ["requested a Center case file", "filed an Tuition Merit Case", "accessed the State Archive", "initiated an Academic Directive"];
        setInterval(() => {
            const loc = locations[Math.floor(Math.random() * locations.length)];
            const event = events[Math.floor(Math.random() * events.length)];
            const t = document.getElementById('unnatFomo');
            const fText = document.getElementById('fomoText');
            if (fText) fText.innerHTML = `< strong > UNNAT ALERT:</strong > Someone from ${loc} ${event} !`;
            if (t) t.classList.add('active');
            setTimeout(() => { if (t) t.classList.remove('active'); }, 5000);
        }, 15000);
    },

    async debugModels() {
        if (!this.GEMINI_API_KEY) return "No Key";
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${this.GEMINI_API_KEY}`);
            const data = await response.json();
            console.log("Available Models:", data);
            if (data.models) {
                return data.models.map(m => m.name.split('/').pop()).join(', ');
            }
            return "No models found in list.";
        } catch (e) {
            return "Failed to list models.";
        }
    },

    async askAI(question) {
        const keys = await this.getKeys();
        if (!keys.gemini && !keys.backup && !keys.groq) {
            return "Hi! I'm ready to be your AI Tutor. Please configure your **TUITION Security Keys** in the Admin Command Center to activate full pedagogical synthesis.";
        }

        const context = await this.getIPContext();
        const customPrompt = `
            Role: Unnat Tuition AI Tutor & Academic Sovereign.
            Context: Client in ${context.city}, ${context.country}.
            Goal: Deliver elite, concise, and pedagogical assistance.
            User Question: ${question}
            Mission: Help student with Math, Science, English, or Careers. Concise & Elite.
            Formatting: Response must be a valid JSON object with a single field "response".
        `;

        try {
            const data = await UnnatSovereignEngine.synthesize('CHAT', context, customPrompt);
            return data.response || "Synthesis successful, but directive was unclear. Please re-state your academic query.";
        } catch (e) {
            console.error("Counselor Synthesis Failure:", e);
            if (e.message.includes('429')) return "**🧠 Brain Overheating!**\nHigh demand on Unnat Intelligence nodes. Please wait 1 minute. ⏳";
            return `**Connection Error:** Unnat Core is offline. Please verify your keys in the Command Center.`;
        }
    },

    async handleSend() {
        const input = document.getElementById('chatInput');
        const chat = document.getElementById('counselorChat');
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        chat.innerHTML += `<div class="counselor-msg msg-user">${text}</div>`;
        const typing = document.getElementById('typing');
        if (typing) typing.style.display = 'block';
        chat.scrollTop = chat.scrollHeight;

        // [VIRAL FLOW DETECTION]
        if (text.toLowerCase().includes('career') || text.toLowerCase().includes('grade') || text.toLowerCase().includes('dream')) {
            const answer = await this.askAI(`VIRAL PREDICTOR MODE: Student wants a Global Success Prediction. Career: ${text}. Be elite, give a % score. Emphasize that Unnat Tuition Center is the only academy that can guarantee this level of optimization. Mention 3 strategic growth steps.`);
            if (typing) typing.style.display = 'none';

            const shareText = encodeURIComponent(`🔥 MY GLOBAL SUCCESS SCORE IS IN!\n\nUnnat Intelligence v10 analyzed my profile and predicted high success probability.\n\nCheck yours now: https://unnattuitioncenter.github.io/`);
            const shareLink = `<br><div style="margin-top:10px; padding:15px; background:linear-gradient(135deg, #fbbf24, #d97706); border-radius:10px; color:#020617;">
                <p style="font-size:0.8rem; margin-bottom:10px; font-weight:900;">🏆 PROFILE OPTIMIZED! Share your Success Score to unlock the Advanced Merit PDF.</p>
                <a href="https://wa.me/?text=${shareText}" target="_blank" style="background:#020617; color:white; padding:8px 15px; border-radius:5px; text-decoration:none; display:inline-block; font-weight:800; font-size:0.85rem;"><i class="fab fa-whatsapp"></i> Broadcast Success on WhatsApp</a>
            </div>`;

            chat.innerHTML += `<div class="counselor-msg">${answer}${shareLink}</div>`;
            chat.scrollTop = chat.scrollHeight;
            return;
        }

        const answer = await this.askAI(text);
        if (typing) typing.style.display = 'none';

        // [ADMIN TELEMETRY] Log Chat Interaction
        this._logToAdmin('CHAT', 'Student Query Answered', {
            query: text,
            responseLength: answer.length
        });

        // High-Conversion Sharing Logic (Viral Protocol)
        let shareLink = '';
        if (!answer.includes('Connection Error') && !answer.includes('API Key Issue')) {
            const shareText = encodeURIComponent(`🚀 Unnat AI just solved this for me: "${text.substring(0, 30)}..."\n\nSolution: ${answer.substring(0, 100)}...\n\nGet your free AI solution at Unnat Tuition: https://unnattuitioncenter.github.io/`);
            shareLink = `<br><div style="margin-top:10px; padding:10px; background:rgba(37, 211, 102, 0.1); border-radius:8px; border:1px border-radius:8px; border:1px solid #25d366;">
                <p style="font-size:0.75rem; color:#22c55e; margin-bottom:5px; font-weight:800;">🔥 VIRAL BONUS: Share this solution to unlock Advanced Tuition Insights!</p>
                <a href="https://wa.me/?text=${shareText}" target="_blank" class="share-link" style="background:#25d366; color:white; padding:5px 12px; border-radius:5px; text-decoration:none; display:inline-block; font-size:0.8rem;"><i class="fab fa-whatsapp"></i> Share with Classmates</a>
            </div>`;
        }

        chat.innerHTML += `<div class="counselor-msg">${answer}${shareLink}</div>`;
        chat.scrollTop = chat.scrollHeight;

        if (text.toLowerCase().includes('demo') || text.toLowerCase().includes('join')) {
            this.finalHandoff(text);
        }
    },

    async handlePredictor(chat) {
        if (document.getElementById('typing')) document.getElementById('typing').style.display = 'none';
        chat.innerHTML += `<div class="counselor-msg">Tuition Center Protocol: Please provide your **last academic baseline percentage** (e.g., 75%). I will initiate a regional projection.</div>`;
        chat.scrollTop = chat.scrollHeight;
    },

    async handleViralPredictor() {
        const panel = document.getElementById('unnatPanel');
        if (panel) panel.style.display = 'flex';
        const chat = document.getElementById('counselorChat');
        chat.innerHTML += `<div class="counselor-msg" style="border: 2px solid var(--brand-gold);">🚀 **VIRAL SUCCESS PREDICTOR INITIALIZED**\n\nTell me your **Dream Career** and **Current Grade**. I will calculate your **Global Success Probability** using Unnat Intelligence v10.</div>`;
        chat.scrollTop = chat.scrollHeight;
    },

    predictMain() {
        const input = document.getElementById('lastPercent');
        const res = document.getElementById('predResult');
        if (!input || !res) return;
        const val = parseInt(input.value);

        if (!val || val < 0 || val > 100) {
            res.innerHTML = `<p style="color: #f43f5e; font-weight: 700;">ERROR: INVALID BASELINE DATA</p>`;
            return;
        }

        const prediction = Math.min(99, val + 15);
        res.innerHTML = `
            <div style="text-align: center;">
                <div class="marble-text" style="font-size: 4rem;">${prediction}%</div>
                <p style="color: #f1f5f9; font-weight: 900; letter-spacing: 2px;">POTENTIAL BOARD SCORE</p>
                <div style="height: 1px; background: rgba(197, 160, 89, 0.2); margin: 20px 0;"></div>
                <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.6;">Our analysis indicates a <strong>15% increase</strong> in performance potential with Unnat's specialized academic methodology.</p>
                <a href="https://wa.me/${this.config.whatsapp}?text=My%20Unnat%20Score%20Projection%20is%20${prediction}%%20-%20Requesting%20Enrollment." class="btn-Tuition" style="display: block; margin-top: 25px; padding: 12px !important;">Join New Batch #2026</a>
            </div>
        `;

        // [ADMIN TELEMETRY] Log Prediction
        this._logToAdmin('PREDICT', 'Board Score Predicted', {
            input: val,
            prediction: prediction
        });
    },

    sendQuick(text) {
        document.getElementById('chatInput').value = text;
        this.handleSend();
    },

    finalHandoff(context) {
        setTimeout(() => {
            const chat = document.getElementById('counselorChat');
            chat.innerHTML += `<div class="counselor-msg" style="border: 1px solid #7c3aed;">Great! I'll connect you directly to our Principal in Kurukshetra. Click here: <br><br> <a href="https://wa.me/${this.config.whatsapp}?text=Hi! I was talking to your AI Tutor about ${context}. I want to join." target="_blank" style="background:#25d366; color:white; padding:8px 15px; border-radius:8px; text-decoration:none; display:inline-block; font-weight:700;">Chat on WhatsApp</a></div>`;
            chat.scrollTop = chat.scrollHeight;
        }, 1500);
    },

    setupListeners() {
        // Toggle Panel
        const bubble = document.getElementById('unnatBubble');
        const panel = document.getElementById('unnatPanel');
        if (bubble && panel) {
            bubble.addEventListener('click', () => {
                panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
                if (panel.style.display === 'flex') document.getElementById('chatInput').focus();
            });
        }

        // Send Msg
        const sendBtn = document.getElementById('sendBtn');
        const chatInput = document.getElementById('chatInput');
        if (sendBtn) sendBtn.addEventListener('click', () => this.handleSend());
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSend();
            });
        }
    },

    async SocialEngine(force = false) {
        const context = await this.getIPContext();
        const CACHE_KEY = 'unnat_social_cache';
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        const now = Date.now();

        if (!force && cached.timestamp && (now - cached.timestamp < 1000 * 60 * 60 * 24)) {
            console.log("Social Engine: Using Cached Daily Content");
            return;
        }

        try {
            const payload = await UnnatSovereignEngine.synthesize('SOCIAL', context);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, data: payload }));
            this.showToast('✅ Social Strategy Synchronized!');
            this._logToAdmin('SOCIAL', `Content Ready for ${context.city}`);
            this.triggerWebhook(payload);
        } catch (e) {
            console.error("Social Engine Failed:", e);
        }
    },

    showToast(msg) {
        const t = document.createElement('div');
        t.style.cssText = `position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#0f172a; color:#fbbf24; padding:12px 24px; border-radius:30px; border:1px solid #fbbf24; z-index:10000; font-weight:bold; box-shadow:0 10px 30px rgba(0,0,0,0.5);`;
        t.innerText = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 5000);
    },

    async triggerWebhook(payload) {
        const webhook = localStorage.getItem('unnat_webhook_url');
        if (!webhook) return;

        console.log("🚀 Triggering Auto-Post Webhook...");
        try {
            await fetch(webhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            this._logToAdmin('SOCIAL', 'Webhook Triggered (Auto-Post Success)');
        } catch (e) {
            console.error("Webhook Failed:", e);
            this._logToAdmin('SOCIAL', 'Webhook Failed', { error: e.message });
        }
    },

    // [ADMIN TELEMETRY] Core Logger
    _logToAdmin(type, message, data = {}) {
        try {
            const logEntry = {
                timestamp: new Date().toISOString(),
                type: type,
                message: message,
                data: data,
                id: Date.now() + Math.random().toString(36).substr(2, 9)
            };

            // Get existing logs
            let logs = JSON.parse(localStorage.getItem('unnat_agent_logs') || '[]');

            // Add new log to top
            logs.unshift(logEntry);

            // Keep only last 100 logs
            if (logs.length > 100) logs = logs.slice(0, 100);

            // Save back
            localStorage.setItem('unnat_agent_logs', JSON.stringify(logs));

            // Also update stats for dashboard charts
            this._updateAdminStats(type);

        } catch (e) {
            console.error('Telemetry Log Failed:', e);
        }
    },

    _updateAdminStats(type) {
        try {
            let stats = JSON.parse(localStorage.getItem('unnat_stats') || '{"visits":0, "blogs":0, "chats":0, "predictions":0}');

            if (type === 'BLOG') stats.blogs++;
            if (type === 'CHAT') stats.chats++;
            if (type === 'PREDICT') stats.predictions++;
            if (type === 'SYSTEM') stats.visits++; // Counting init as a visit for now

            localStorage.setItem('unnat_stats', JSON.stringify(stats));
        } catch (e) { }
    }
};

// Initialize the Tuition Center
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 50) nav.style.background = 'rgba(15, 23, 42, 0.98)';
        else nav.style.background = 'rgba(15, 23, 42, 0.9)';
    }
});

/**
 * Tuition Media Engine v1.1
 * Purpose: Dynamically render cinematic cards for AI nodes
 * Features: Auto-playing Video Backgrounds, Glassmorphism, Premium Hover Effects
 */
const TuitionMediaEngine = {
    async init() {
        const grid = document.getElementById('tuition-dynamic-grid');
        if (!grid) return;

        // Priority 1: Check for global variable (CORS-safe for local files)
        if (Array.isArray(window.tuition_catalog) && window.tuition_catalog.length > 0) {
            console.log('👑 Tuition Intelligence: Loading from global catalog sequence...');
            this.render(grid, window.tuition_catalog);
            return;
        }

        // Priority 2: Attempt Fetch (for server-hosted environments)
        try {
            const response = await fetch('tuition_catalog.json');
            if (!response.ok) throw new Error('Catalog synchronization in progress...');
            const catalog = await response.json();
            this.render(grid, catalog);
        } catch (e) {
            console.warn('👑 Tuition Intelligence: Syncing Node Network...', e.message);
            // Retry in 5s if not found
            setTimeout(() => this.init(), 5000);
        }
    },

    render(container, catalog) {
        container.innerHTML = '';
        // Only show top 12 in the main grid for high-impact
        catalog.slice(0, 12).forEach(item => {
            const card = document.createElement('a');
            card.href = item.link;
            card.className = 'cinematic-card';
            card.style.cssText = `
                position: relative;
                height: 400px;
                border-radius: 28px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding: 35px;
                text-decoration: none;
                transition: transform 0.8s cubic-bezier(0.2, 1, 0.2, 1), box-shadow 0.8s, border-color 0.8s;
                border: 2px solid rgba(197, 160, 89, 0.1);
                background: #020617;
                box-shadow: 0 15px 45px rgba(0,0,0,0.7);
            `;

            card.style.cssText = `
                display: block;
                background: #020617;
                border-radius: 28px;
                overflow: hidden;
                text-decoration: none;
                transition: transform 0.6s cubic-bezier(0.2, 1, 0.2, 1), box-shadow 0.6s, border-color 0.6s;
                border: 2px solid rgba(197, 160, 89, 0.1);
                box-shadow: 0 15px 45px rgba(0,0,0,0.4);
            `;

            card.innerHTML = `
                <div class="card-media" style="position: relative; height: 240px; overflow: hidden; background: #000;">
                    <!-- Base Global Image (Visible immediately) -->
                    <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 1; transition: 1s cubic-bezier(0.2, 1, 0.2, 1);">
                    
                    ${item.video ? `
                        <video autoplay muted loop playsinline preload="auto" poster="${item.image}" style="position: absolute; top:0; left:0; width:100%; height:100%; object-fit: cover; z-index: 2; opacity: 0.8; transition: 1s;">
                            <source src="${item.video}" type="video/mp4">
                        </video>
                    ` : ''}
                    
                    <div style="position: absolute; top: 20px; left: 20px; z-index: 10; background: var(--brand-gold); color: #000; padding: 5px 15px; border-radius: 8px; font-size: 0.65rem; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">ELITE DIRECTIVE</div>
                </div>
                
                <div class="card-content" style="padding: 30px; background: linear-gradient(135deg, #0f172a 0%, #020617 100%);">
                    <h4 style="color: #fff; margin-bottom: 12px; font-size: 1.5rem; letter-spacing: -0.5px; font-family: 'Outfit', sans-serif; line-height: 1.1; transition: 0.3s;">${item.title}</h4>
                    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.5; margin-bottom: 25px; font-weight: 400;">${item.desc}</p>
                    
                    <div style="color: var(--brand-gold); font-weight: 900; font-size: 0.85rem; letter-spacing: 1px; display: flex; align-items: center; gap: 10px; transition: 0.3s;" class="intel-link">
                        ACCESS INTELLIGENCE <span style="font-size: 1.4rem; transition: 0.3s;">→</span>
                    </div>
                </div>

                <style>
                    .cinematic-card:hover {
                        transform: translateY(-12px);
                        box-shadow: 0 30px 60px rgba(197, 160, 89, 0.15);
                        border-color: rgba(197, 160, 89, 0.8);
                    }
                    .cinematic-card:hover .intel-link {
                        gap: 15px;
                        filter: brightness(1.2);
                    }
                    .cinematic-card:hover img {
                        opacity: 0.7;
                        transform: scale(1.1);
                    }
                    .cinematic-card:hover video {
                        opacity: 1 !important;
                        filter: brightness(1.1) contrast(1.1);
                    }
                </style>
            `;

            container.appendChild(card);
        });
    }
};

TuitionMediaEngine.init();
UnnatAgent.init();

// Global helper to download generated blog posts
window.downloadBlog = function () {
    if (!window.generatedBlog) {
        alert('No blog post generated yet! Run UnnatAgent.BlogEngine() first.');
        return;
    }

    const blob = new Blob([window.generatedBlog.content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = window.generatedBlog.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅ Downloaded: ${window.generatedBlog.filename}`);
};

// Manual blog generation trigger
window.generateBlog = function () {
    console.log('🚀 Manually triggering Blog Engine...');
    UnnatAgent.BlogEngine();
};

// [SEO GRID] Injection logic for Tuition Nodes
window.addEventListener('load', () => {
    const footer = document.querySelector('footer');
    if (footer) {
        const grid = document.createElement('div');
        grid.style.cssText = `background: #020617; padding: 50px 0; border-top: 1px solid rgba(197, 160, 89, 0.1);`;
        grid.innerHTML = `
            <div class="container">
                <h4 style="color: var(--brand-gold); margin-bottom: 20px; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase;">Global Intelligence Network</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;" id="seoGrid">
                    <a href="best-tuition-in-kurukshetra-for-class-10.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">Class 10 Tuition</a>
                    <a href="how-to-crack-cbse-board-exams-2026.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">CBSE 2026 Guide</a>
                    <a href="unnat-tuition-center-fees-and-results.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">Unnat Fees & Results</a>
                    <a href="best-spoken-english-course-in-kurukshetra-university.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">Spoken English KUK</a>
                    <a href="top-coaching-for-hssc-exams-haryana.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">HSSC Coaching</a>
                    <a href="class-12-physics-coaching-near-thansesar.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">Class 12 Physics</a>
                    <a href="maths-coaching-for-class-9-haryana-board.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">Class 9 Maths</a>
                    <a href="competitive-exam-preparation-center-in-kurukshetra.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">Govt Job Exams</a>
                    <a href="unnat-tuition-center-kkr-reviews.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">Student Reviews</a>
                    <a href="ai-powered-learning-benefits-for-students.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">AI Learning</a>
                    <a href="ielts-preparation-kurukshetra-unnat.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">IELTS Prep</a>
                    <a href="app-development-kurukshetra.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">App Dev KKR</a>
                    <a href="seo-services-kurukshetra.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">SEO Services</a>
                    <a href="spoken-english-60-days-course-curriculum.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">Spoken English 60D</a>
                    <a href="unnat-intelligence-career-predictor-review.html" style="color: #64748b; font-size: 0.7rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px; transition: 0.3s;">Career Predictor</a>
                </div>
                <p style="color: #334155; font-size: 0.6rem; margin-top: 30px;">Network v10.2 • Tuition Node Synchronization Active</p>
            </div>
        `;
        footer.parentElement.insertBefore(grid, footer);
    }
});

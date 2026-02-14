/**
 * Unnat Imperial Council Engine 9.0
 * Version: 9.0.0
 * Primary Directive: State-Level Academic Authority & Institutional Sovereignty
 */

const CouncilAgent = {
    // [UNNAT 3.2] REGIONAL ACADEMIC ENGINE
    GEMINI_API_KEY: "AIzaSyDfE0ObTblusx144i5yulEocQVMUtithZU", // Primary key (NEW - Fresh from user)
    BACKUP_API_KEY: "AIzaSyCQLvOWOBjfyQ-u5mh0CIa26zXEzTphe-M", // Backup key #1
    PEXELS_API_KEY: "KDosZI0p7dpHM679PBnyBSQZ6RyAP0A5OMJKbbXKUNxZHmApYJas75fJ", // Pexels API for images

    config: {
        brandName: "Unnat Tuition Center",
        location: "Kurukshetra, Haryana",
        whatsapp: "918307264895",
        neighborhoods: ["Thanesar", "Pipli", "Sector 13", "Didar Nagar", "Kalyan Nagar"]
    },

    init() {
        this.injectStyles();

        // [SETTINGS] Load Config
        const settings = JSON.parse(localStorage.getItem('unnat_settings') || '{"urgency":true, "holiday":false}');

        if (settings.holiday) {
            alert('NOTE: Maintenance Mode is Active. Some features may be disabled.');
        }

        this.renderUI();

        if (settings.urgency) {
            this.startUrgencyProtocol();
        }

        this.startCouncilPulse();
        this.startTitleRotator();

        // [ADMIN TELEMETRY] Log System Start
        this._logToAdmin('SYSTEM', 'Unnat AI Core Initiated', { version: '9.0.0' });

        // Initial launch
        this.CouncilEngine();
        this.GazetteEngine();
        this.PexelsEngine(); // Fetch education images

        // Auto-generate first blog post after 5 seconds
        setTimeout(() => {
            this.BlogEngine();
            this.SocialEngine(); // Generate social content in background
        }, 5000);

        // Automated cycle every 4 hours
        setInterval(() => {
            this.CouncilEngine();
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

    async CouncilEngine() {
        if (!this.GEMINI_API_KEY) return;

        // [CACHE CHECK] 12 Hour Expiry
        const CACHE_KEY = 'unnat_council_cache';
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        const now = Date.now();
        if (cached.timestamp && (now - cached.timestamp < 1000 * 60 * 60 * 12)) {
            console.log("Unnat Engine: Using Cached Intelligence (Serving from Memory)");
            this.publishDirectives(cached.data.proposals);
            this.updateCouncilDashboard(cached.data.citations);
            this.imperialSEO(cached.data.seo);
            return;
        }

        console.log("Unnat Engine: Synthesizing Regional Academic Intelligence...");
        const prompt = `You are the Lead Digital Architect for Unnat Tuition Center.
        1. Identify 2 specific Haryana State Educational Mandates or Initiatives to align with.
        2. Write a 'Professional Update' (100 words) on how Unnat is leading Kurukshetra's academic growth.
        3. Generate 3 'Academic Merit Recognitions'.
        4. Focus on 'Best Tuition Center Kurukshetra', 'Kurukshetra Toppers', and 12 high-authority keywords.
        Response must be VALID JSON strictly: {"proposals": "", "citations": [], "seo":{"title":"", "description":"", "keywords":""}}`;

        const tryWithKey = async (apiKey) => {
            const modelName = "gemini-2.0-flash";
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: { response_mime_type: "application/json" }
                })
            });
            return response;
        };

        try {
            let response = await tryWithKey(this.GEMINI_API_KEY);

            // If primary key fails, try backup
            if (!response.ok && this.BACKUP_API_KEY) {
                console.log("Primary key failed, trying backup key...");
                response = await tryWithKey(this.BACKUP_API_KEY);
            }

            const data = await response.json();
            const payload = JSON.parse(data.candidates[0].content.parts[0].text);

            // Save to Cache
            localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: payload }));

            this.publishDirectives(payload.proposals);
            this.updateCouncilDashboard(payload.citations);
            this.imperialSEO(payload.seo);

            // [ADMIN TELEMETRY] Log Council Action
            this._logToAdmin('COUNCIL', 'Directives Published', {
                proposals: payload.proposals.substring(0, 50) + '...',
                seo: payload.seo.title
            });

        } catch (e) {
            console.error("Council Engine Failure:", e);
        }
    },

    publishDirectives(proposal) {
        const area = document.getElementById('state-proposals');
        if (!area) return;
        area.innerHTML = `
            <div style="font-family: 'Inter', sans-serif; color: #f1f5f9; background: rgba(197, 160, 89, 0.03); padding: 30px; border: 1px solid rgba(197, 160, 89, 0.2);">
                <div class="official-badge" style="display: inline-block; margin-bottom: 20px;">CENTRAL UPDATE #10.2</div>
                <p style="font-size: 1rem; line-height: 1.8; color: #cbd5e1;">${proposal}</p>
                <div style="margin-top: 25px; border-top: 1px solid rgba(197, 160, 89, 0.1); padding-top: 15px; font-weight: 900; color: var(--imperial-gold); font-size: 0.75rem; text-transform: uppercase;">Verified by Unnat Tuition Center Administrative Desk</div>
            </div>
        `;
    },

    async GazetteEngine() {
        if (!this.GEMINI_API_KEY) return;

        // [CACHE CHECK] 4 Hour Expiry
        const CACHE_KEY = 'unnat_gazette_cache';
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        const now = Date.now();
        if (cached.timestamp && (now - cached.timestamp < 1000 * 60 * 60 * 4)) {
            console.log("Gazette Engine: Using Cached Opportunities");
            this.updateGazetteUI(cached.data);
            return;
        }

        console.log("Gazette Engine: Scraping Regional Opportunities...");

        const prompt = `You are the Regional Career Intelligence for Unnat Tuition Center.
        1. Identify 5 latest Government or Private job openings for students in Kurukshetra/Haryana.
        2. Format: [{"title": "", "dept": "", "deadline": ""}]
        3. Identify 3 latest Admit Card releases.
        4. Identify 3 latest Results declared.
        Response must be VALID JSON strictly: {"jobs": [], "admit": [], "results": []}`;

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

        try {
            let response = await tryWithKey(this.GEMINI_API_KEY);

            // If primary key fails, try backup
            if (!response.ok && this.BACKUP_API_KEY) {
                console.log("Primary key failed, trying backup key...");
                response = await tryWithKey(this.BACKUP_API_KEY);
            }

            const data = await response.json();
            const payload = JSON.parse(data.candidates[0].content.parts[0].text);
            // Save to Cache
            localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: payload }));

            this.updateGazetteUI(payload);

            // [ADMIN TELEMETRY] Log Gazette Action
            this._logToAdmin('GAZETTE', 'Jobs & Results Updated', {
                jobs: payload.jobs.length,
                results: payload.results.length
            });

        } catch (e) {
            console.error("Gazette Engine Failure:", e);
        }
    },

    async PexelsEngine() {
        if (!this.PEXELS_API_KEY) return;
        console.log("Pexels Engine: Fetching education-themed images...");

        const queries = ["students studying", "classroom", "education", "learning", "teacher", "books"];
        const randomQuery = queries[Math.floor(Math.random() * queries.length)];

        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${randomQuery}&per_page=6&orientation=landscape`, {
                headers: {
                    'Authorization': this.PEXELS_API_KEY
                }
            });

            const data = await response.json();

            if (data.photos && data.photos.length > 0) {
                this.updateImagesUI(data.photos);
                console.log(`✅ Loaded ${data.photos.length} education images from Pexels`);

                // [ADMIN TELEMETRY] Log Pexels Action
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
        if (!this.GEMINI_API_KEY || !this.PEXELS_API_KEY) {
            console.log("⚠️ Blog Engine requires both Gemini and Pexels API keys");
            return;
        }
        console.log("🚀 Blog Engine: Generating SEO-optimized blog post...");

        // Expanded blog topics for daily content (365 posts/year)
        const topics = [
            // CBSE & Board Exams (10 topics)
            { title: "10 Proven Strategies to Score 95+ in CBSE Boards", keywords: "CBSE tips, board exam preparation, study strategies, score 95 percent", category: "Study Tips", query: "students studying" },
            { title: "CBSE Class 10 Math: Complete Preparation Guide", keywords: "class 10 math, CBSE math, board exam math", category: "CBSE Guide", query: "math student" },
            { title: "How to Prepare for CBSE English Board Exam", keywords: "CBSE English, board exam English, English preparation", category: "CBSE Guide", query: "english class" },
            { title: "Science Practical Tips for CBSE Class 12", keywords: "CBSE science practical, class 12 science, lab exam", category: "CBSE Guide", query: "science lab" },
            { title: "Time Management Secrets for Board Exams", keywords: "time management, board exam tips, study schedule", category: "Study Tips", query: "student planning" },

            // Kurukshetra Local (5 topics)
            { title: "Best Study Cafes in Kurukshetra for Students", keywords: "Kurukshetra students, study places, cafes, local guide", category: "Local Guide", query: "cafe study" },
            { title: "Top 10 Schools in Kurukshetra: Parent's Guide", keywords: "best schools Kurukshetra, school admission, education", category: "Local Guide", query: "school building" },
            { title: "Kurukshetra University Admission Guide 2026", keywords: "KUK admission, Kurukshetra University, college admission", category: "Local Guide", query: "university campus" },
            { title: "Best Coaching Centers in Kurukshetra", keywords: "coaching Kurukshetra, tuition centers, best coaching", category: "Local Guide", query: "classroom teaching" },
            { title: "Student Life in Kurukshetra: Complete Guide", keywords: "Kurukshetra student life, college life, student guide", category: "Local Guide", query: "students group" },

            // Competitive Exams (5 topics)
            { title: "HSSC Exam Preparation: Complete Guide", keywords: "HSSC preparation, competitive exams, Haryana jobs", category: "Competitive Exams", query: "exam preparation" },
            { title: "JEE Main Preparation Strategy for Haryana Students", keywords: "JEE Main, engineering entrance, JEE preparation", category: "Competitive Exams", query: "engineering student" },
            { title: "NEET Preparation: Medical Entrance Guide", keywords: "NEET preparation, medical entrance, NEET exam", category: "Competitive Exams", query: "medical student" },
            { title: "SSC CGL Preparation: Complete Roadmap", keywords: "SSC CGL, government job, SSC preparation", category: "Competitive Exams", query: "government exam" },
            { title: "Bank PO Exam: Preparation Tips", keywords: "bank PO, banking exam, IBPS preparation", category: "Competitive Exams", query: "banking career" },

            // English Learning (3 topics)
            { title: "Master Spoken English in 30 Days", keywords: "spoken English, English learning, communication skills", category: "English Learning", query: "teacher classroom" },
            { title: "Common English Grammar Mistakes Indians Make", keywords: "English grammar, common mistakes, grammar tips", category: "English Learning", query: "english writing" },
            { title: "IELTS Preparation Guide for Indian Students", keywords: "IELTS preparation, English test, IELTS exam", category: "English Learning", query: "ielts test" },

            // Career Guidance (2 topics)
            { title: "Career Options After 12th Science", keywords: "career after 12th, science stream, career guidance", category: "Career Guide", query: "career counseling" },
            { title: "Government Jobs in Haryana 2026", keywords: "Haryana government jobs, sarkari naukri, job opportunities", category: "Career Guide", query: "government office" }
        ];

        const topic = topics[Math.floor(Math.random() * topics.length)];

        try {
            // Generate blog content
            const contentPrompt = `Write a complete SEO-optimized blog post for "${topic.title}".
Write 800-1000 words with H2/H3 headings, practical tips, and engaging content.
Format in clean HTML using <h2>, <h3>, <p>, <ul>, <li> tags.
Include a strong conclusion with CTA.
Response must be VALID JSON: {"content": "HTML content", "metaDescription": "150 char", "slug": "url-slug"}`;

            const tryWithKey = async (apiKey) => {
                return await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ role: "user", parts: [{ text: contentPrompt }] }],
                        generationConfig: { response_mime_type: "application/json" }
                    })
                });
            };

            let response = await tryWithKey(this.GEMINI_API_KEY);
            if (!response.ok && this.BACKUP_API_KEY) {
                response = await tryWithKey(this.BACKUP_API_KEY);
            }

            const data = await response.json();
            const blogData = JSON.parse(data.candidates[0].content.parts[0].text);

            // Fetch images
            const imageResponse = await fetch(`https://api.pexels.com/v1/search?query=${topic.query}&per_page=4&orientation=landscape`, {
                headers: { 'Authorization': this.PEXELS_API_KEY }
            });
            const imageData = await imageResponse.json();

            // Create complete HTML
            const blogHTML = this.createBlogHTML(topic, blogData, imageData.photos);

            // Store for download
            window.generatedBlog = {
                filename: `${blogData.slug}.html`,
                content: blogHTML,
                topic: topic.title
            };

            console.log(`✅ Blog Generated: "${topic.title}"`);
            console.log(`📄 File: ${blogData.slug}.html`);
            console.log(`🖼️ Images: ${imageData.photos.length}`);

            // Auto-download the blog post
            this.autoDownloadBlog(blogData.slug, blogHTML);

            this.showBlogNotification(topic.title, blogData.slug);

            // [ADMIN TELEMETRY] Log Blog Generation
            this._logToAdmin('BLOG', `Generated: ${topic.title}`, {
                slug: blogData.slug,
                category: topic.category
            });

        } catch (e) {
            console.error("Blog Engine Error:", e);
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
            <a href="index.html" style="color: var(--imperial-gold); font-size: 1.5rem; font-weight: 900; text-decoration: none;">UNNAT</a>
            <div style="display: flex; gap: 30px;">
                <a href="index.html" style="color: #94a3b8; text-decoration: none;">Home</a>
                <a href="resources.html" style="color: #94a3b8; text-decoration: none;">Blog</a>
                <a href="https://wa.me/918307264895" style="color: var(--imperial-gold); text-decoration: none;">Contact</a>
            </div>
        </div>
    </nav>

    <article style="max-width: 900px; margin: 60px auto; padding: 0 20px;">
        <header style="margin-bottom: 40px;">
            <div style="color: var(--imperial-gold); font-size: 0.85rem; font-weight: 700; letter-spacing: 2px; margin-bottom: 15px;">${topic.category.toUpperCase()}</div>
            <h1 style="font-size: 3rem; color: #fff; margin-bottom: 20px; line-height: 1.2;">${topic.title}</h1>
            <div style="color: #64748b; font-size: 0.9rem;">Published ${date} | Unnat Tuition Center</div>
        </header>

        ${featuredImage ? `<img src="${featuredImage}" alt="${topic.title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 40px;">` : ''}

        <div style="color: #cbd5e1; font-size: 1.1rem; line-height: 1.8;">
            ${blogData.content}
        </div>

        <div style="background: linear-gradient(135deg, rgba(197, 160, 89, 0.1), rgba(197, 160, 89, 0.05)); border: 2px solid var(--imperial-gold); border-radius: 8px; padding: 40px; text-align: center; margin: 60px 0;">
            <h3 style="color: var(--imperial-gold); font-size: 2rem; margin-bottom: 20px;">Ready to Excel?</h3>
            <p style="color: #cbd5e1; font-size: 1.1rem; margin-bottom: 30px;">Join Unnat Tuition Center</p>
            <a href="https://wa.me/918307264895" class="btn-imperial" style="display: inline-block; padding: 18px 40px; background: var(--imperial-gold); color: #000; text-decoration: none; font-weight: 900; border-radius: 4px;">📚 Book FREE Demo</a>
        </div>
    </article>

    <footer style="background: #000; border-top: 1px solid rgba(197, 160, 89, 0.1); padding: 40px 0; text-align: center;">
        <p style="color: var(--imperial-gold); font-size: 1.5rem; margin-bottom: 10px;">UNNAT</p>
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
            <button onclick="window.downloadBlog()" style="background: #000; color: var(--imperial-gold); border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: 900; width: 100%;">💾 Download ${slug}.html</button>
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
                            <span style="color: var(--imperial-gold); font-weight: 700;">📅 ${item.deadline}</span>
                        </div>
                        <a href="https://wa.me/${this.config.whatsapp}?text=Requesting%20Details%20for:%20${encodeURIComponent(item.title)}" 
                           style="display: inline-block; margin-top: 10px; font-size: 0.7rem; color: var(--imperial-gold); text-decoration: none; font-weight: 900; letter-spacing: 1px;">
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

    updateCouncilDashboard(citations) {
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
                    <div class="inst-card" style="border-left: 2px solid var(--imperial-gold);">
                        <div style="font-size: 0.7rem; color: var(--imperial-gold); font-weight: 900; margin-bottom: 10px;">DIRECTIVE ANALYTICS</div>
                        <h4 style="margin-bottom: 10px; color: #fff;">${t.label}</h4>
                        <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5;">${t.narrative}</p>
                    </div>
                `;
            });
        }

        if (proposalsArea && trends[0]) {
            proposalsArea.innerHTML = `
                <div style="padding: 15px; border: 1px solid rgba(197, 160, 89, 0.1); background: rgba(0,0,0,0.2);">
                    <div style="font-weight: 800; color: var(--imperial-gold); margin-bottom: 10px;">WHITE PAPER G-2026</div>
                    <p style="font-size: 0.9rem; line-height: 1.6;">${trends[0].narrative}</p>
                </div>
            `;
        }
    },

    imperialSEO(seo) {
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
                --imperial-gold: #c5a059;
                --imperial-navy: #0f172a;
                --imperial-accent: #1e293b;
                --unnat-neon: var(--imperial-gold);
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
                background: linear-gradient(135deg, var(--imperial-navy), #020617);
                padding: 18px 20px; color: var(--imperial-gold); border-bottom: 1px solid rgba(197, 160, 89, 0.2);
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
                padding: 10px; font-size: 0.8rem; color: var(--imperial-gold); font-style: italic; display: none;
                animation: pulse 1.5s infinite;
            }
            @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }

            /* Urgency Bar */
            .unnat-urgency-bar {
                background: var(--imperial-gold); color: #020617; padding: 10px; text-align: center;
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
        // Urgency Bar
        const urgency = document.createElement('div');
        urgency.className = 'unnat-urgency-bar';
        urgency.innerHTML = `🏆 #1 TUITION IN KURUKSHETRA | NEXT BATCH STARTS IN <span class="urgency-timer" id="urgencyTimer">04h 22m 11s</span>`;
        document.body.prepend(urgency);

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
                    <div style="width: 45px; height: 45px; background: var(--imperial-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255,255,255,0.2); overflow: hidden;">
                        <img src="unnat_ai_avatar.png" alt="Unnat AI" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div style="position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: #22c55e; border-radius: 50%; border: 2px solid #0f172a;"></div>
                </div>
                <div>
                    <div style="font-weight: 900; font-size: 1.1rem; letter-spacing: 1px; color: var(--imperial-gold);">UNNAT AI TUTOR</div>
                    <div style="font-size: 0.7rem; opacity: 0.8; color: #fff;">Always Online • Academic Expert</div>
                </div>
            </div>
            <div class="counselor-body" id="counselorChat">
                <div class="counselor-msg">Welcome to **Unnat Academic Intelligence**. I am your Digital Tutor from Unnat Tuition Center. How can I help you excel today?</div>
                <div class="btn-group" id="quickOptions">
                    <button class="btn-option" onclick="CouncilAgent.sendQuick('Solve a difficult Math problem')">🔢 Solve a specific Math problem</button>
                    <button class="btn-option" onclick="CouncilAgent.sendQuick('Predict my Board Exam Marks')">📊 Predict my Board Exam Marks</button>
                    <button class="btn-option" onclick="CouncilAgent.sendQuick('Why Unnat is #1 in Kurukshetra?')">👑 Why Unnat is #1 in Kurukshetra?</button>
                </div>
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

    startCouncilPulse() {
        const locations = this.config.neighborhoods;
        const events = ["requested a Council declassification", "filed an Imperial Merit Case", "accessed the State Archive", "initiated an Academic Directive"];
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
        if (!this.GEMINI_API_KEY) {
            return "Hi! I'm ready to be your AI Tutor. To start, please paste your **FREE Gemini API Key** in `agent.js`.";
        }

        const tryModel = async (model, key) => {
            try {
                // console.log(`Unnat AI: Attempting connection to ${model}...`); // Reduced logging
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ role: "user", parts: [{ text: `You are the Unnat AI Tutor. Help students with Math, English, Science. Keep answers concise. Question: ${question}` }] }]
                    })
                });
                return { ok: response.ok, status: response.status, data: await response.json() };
            } catch (e) {
                return { ok: false, status: 500, error: e };
            }
        };

        // Confirmed Available Models (Removed dead 1.5/Pro models)
        const models = ["gemini-2.0-flash", "gemini-2.5-pro"];
        let result = null;

        for (const model of models) {
            result = await tryModel(model, this.GEMINI_API_KEY);
            if (result.ok) break; // Success!

            // If Rate Limited (429), stop immediately. Don't hammer other models.
            if (result.status === 429) {
                return `**🧠 Brain Overheating!**\nToo many students are asking questions right now (Rate Limit Reached).\n\n**Please wait 1 minute and try again.** ⏳`;
            }

            if (result.status === 400 || result.status === 403) break; // Key error
        }

        if (result && result.ok && result.data?.candidates?.[0]) {
            return result.data.candidates[0].content.parts[0].text;
        }

        // Specific Error for Key Issues
        if (result && (result.status === 400 || result.status === 403)) {
            return `**API Key Issue:** Google blocked the request. Please check your API Key in agent.js.`;
        }

        return `**Connection Error (${result ? result.status : 'Unknown'}):** Internet or Google API is down.`;
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

        // If user wants prediction
        if (text.toLowerCase().includes('predict') || text.toLowerCase().includes('marks') || text.toLowerCase().includes('score')) {
            await this.handlePredictor(chat);
            return;
        }

        const answer = await this.askAI(text);
        if (typing) typing.style.display = 'none';

        // [ADMIN TELEMETRY] Log Chat Interaction
        this._logToAdmin('CHAT', 'Student Query Answered', {
            query: text,
            responseLength: answer.length
        });

        // Add Share Link ONLY if successful answer (no error)
        let shareLink = '';
        if (!answer.includes('Connection Error') && !answer.includes('API Key Issue')) {
            const shareText = encodeURIComponent(`Solved via Unnat AI: "${text}" -> Solution: ${answer.substring(0, 50)}... Access Unnat Tuition Center: https://unnattuitioncenter.github.io/`);
            shareLink = `<br><a href="https://wa.me/?text=${shareText}" target="_blank" class="share-link"><i class="fab fa-whatsapp"></i> Share solution with classmates</a>`;
        }

        chat.innerHTML += `<div class="counselor-msg">${answer}${shareLink}</div>`;
        chat.scrollTop = chat.scrollHeight;

        if (text.toLowerCase().includes('demo') || text.toLowerCase().includes('join')) {
            this.finalHandoff(text);
        }
    },

    async handlePredictor(chat) {
        if (document.getElementById('typing')) document.getElementById('typing').style.display = 'none';
        chat.innerHTML += `<div class="counselor-msg">Imperial Council Protocol: Please provide your **last academic baseline percentage** (e.g., 75%). I will initiate a regional projection.</div>`;
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
                <a href="https://wa.me/${this.config.whatsapp}?text=My%20Unnat%20Score%20Projection%20is%20${prediction}%%20-%20Requesting%20Enrollment." class="btn-imperial" style="display: block; margin-top: 25px; padding: 12px !important;">Join New Batch #2026</a>
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
        if (!this.GEMINI_API_KEY) return;

        // [CACHE CHECK] 24 Hour Expiry (Daily Content)
        const CACHE_KEY = 'unnat_social_cache';
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        const now = Date.now();
        if (!force && cached.timestamp && (now - cached.timestamp < 1000 * 60 * 60 * 24)) {
            console.log("Social Engine: Using Cached Daily Content");
            return; // UI reads from localstorage directly
        }

        console.log("Social Engine: Generating Viral Content...");

        const topics = [
            "Exam Motivation", "Study Hack", "Math Trick", "Science Fact", "Unnat Success Story",
            "Parenting Tip", "Career Advice", "Haryana GK Fact"
        ];
        const topic = topics[Math.floor(Math.random() * topics.length)];

        const prompt = `You are the Social Media Manager for Unnat Tuition Center.
        Topic: ${topic}
        Generate 3 distinct pieces of content VALID JSON format strictly:
        {
            "insta": { "caption": "(Emoji rich caption with CTA)", "hashtags": "#Unnat #Kurukshetra...", "image_prompt": "Describe image to search" },
            "yt": { "script": "Hook: ... Body: ... CTA: Join Unnat." },
            "wa": { "text": "Short punchy status update 🚀" }
        }`;

        // [VISUAL FEEDBACK]
        this.showToast('🤖 Social Director: Generating Viral Content...');

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: { response_mime_type: "application/json" }
            })
        });

        const data = await response.json();
        let rawText = data.candidates[0].content.parts[0].text;
        // Clean Markdown if present
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

        const payload = JSON.parse(rawText);

        // Fetch Image for Insta
        let imgUrl = 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Default Fallback
        if (this.PEXELS_API_KEY) {
            try {
                const imgRes = await fetch(`https://api.pexels.com/v1/search?query=${topic}&per_page=1`, {
                    headers: { 'Authorization': this.PEXELS_API_KEY }
                });
                const imgData = await imgRes.json();
                if (imgData.photos && imgData.photos[0]) imgUrl = imgData.photos[0].src.large;
            } catch (e) { console.warn('Image Fetch Failed', e); }
        }
        payload.insta.image = imgUrl;

        // Save to Cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: payload }));

        // [VISUAL FEEDBACK]Success make it persistent
        localStorage.setItem('unnat_social_content', JSON.stringify({ data: payload })); // Backup key
        this.showToast('✅ Social Content Ready! Check Admin Panel.');

        // [ADMIN TELEMETRY]
        this._logToAdmin('SOCIAL', 'Daily Content Generated', { topic: topic });

        // [WEBHOOK AUTOMATION]
        this.triggerWebhook(payload);

    } catch(e) {
        console.error("Social Engine Failed:", e);
        this.showToast('❌ Social Engine Error. Check Console.');
        this._logToAdmin('ERROR', 'Social Gen Failed', { error: e.message });
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

// Initialize the Imperial Council
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 50) nav.style.background = 'rgba(15, 23, 42, 0.98)';
        else nav.style.background = 'rgba(15, 23, 42, 0.9)';
    }
});

CouncilAgent.init();

// Global helper to download generated blog posts
window.downloadBlog = function () {
    if (!window.generatedBlog) {
        alert('No blog post generated yet! Run CouncilAgent.BlogEngine() first.');
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
    CouncilAgent.BlogEngine();
};

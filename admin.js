// Admin Dashboard Logic

const AdminApp = {
    isAuthenticated: false,

    init() {
        this.checkAuth();
        this.setupListeners();

        // Start polling if authenticated
        if (this.isAuthenticated) {
            this.startPolling();
            this.renderDashboard();
        }
    },

    checkAuth() {
        const session = sessionStorage.getItem('unnat_admin_session');
        if (session === 'active') {
            this.isAuthenticated = true;
            document.getElementById('loginOverlay').style.display = 'none';
        }
    },

    login() {
        const pass = document.getElementById('adminPass').value;
        const master = localStorage.getItem('unnat_admin_pass') || 'Admin@7015716833';
        if (pass === master) {
            sessionStorage.setItem('unnat_admin_session', 'active');
            this.isAuthenticated = true;
            document.getElementById('loginOverlay').style.display = 'none';
            this.startPolling();
            this.renderDashboard();
        } else {
            alert('Access Denied: Invalid Security Credential');
            document.getElementById('adminPass').value = '';
        }
    },

    logout() {
        sessionStorage.removeItem('unnat_admin_session');
        location.reload();
    },

    setupListeners() {
        document.getElementById('loginBtn').addEventListener('click', () => this.login());
        document.getElementById('adminPass').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.login();
        });

        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.id === 'logoutBtn') {
                item.addEventListener('click', () => this.logout());
            } else {
                item.addEventListener('click', () => {
                    // Update active state
                    navItems.forEach(n => n.classList.remove('active'));
                    item.classList.add('active');

                    // Show section
                    const sectionId = item.getAttribute('data-section');
                    document.querySelectorAll('.section-view').forEach(s => s.classList.remove('active'));
                    document.getElementById(sectionId).classList.add('active');

                    // Specific renders
                    if (sectionId === 'logs-section') this.renderLogs(true); // Full render
                });
            }
        });

        // Settings listeners
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }
        const clearLogsBtn = document.getElementById('clearLogsBtn');
        if (clearLogsBtn) {
            clearLogsBtn.addEventListener('click', () => this.clearLogs());
        }
    },

    startPolling() {
        // Initial Fetch
        this.fetchData();
        this.loadSettings();

        // Poll every 3 seconds
        setInterval(() => {
            this.fetchData();
        }, 3000);

        this.initTokens();
    },

    fetchData() {
        const logs = JSON.parse(localStorage.getItem('unnat_agent_logs') || '[]');
        const stats = JSON.parse(localStorage.getItem('unnat_stats') || '{"visits":0, "blogs":0, "chats":0, "predictions":0}');
        const leads = JSON.parse(localStorage.getItem('unnat_leads') || '[]');

        this.updateStats(stats);
        this.renderLogs(false, logs);

        const activeSection = document.querySelector('.section-view.active').id;

        if (activeSection === 'leads-view') {
            this.renderLeads(leads);
        }
        if (activeSection === 'social-view') {
            this.renderSocial();
        }
        if (activeSection === 'analytics-view') {
            this.renderAnalytics(stats, leads);
        }
    },

    updateStats(stats) {
        document.getElementById('stat-visits').innerText = stats.visits || 0;
        document.getElementById('stat-blogs').innerText = stats.blogs || 0;
        document.getElementById('stat-chats').innerText = stats.chats || 0;
        document.getElementById('stat-predicts').innerText = stats.predictions || 0;
    },

    renderLogs(forceAll, logs) {
        if (!logs) logs = JSON.parse(localStorage.getItem('unnat_agent_logs') || '[]');

        const container = document.getElementById('liveLogList');
        const fullContainer = document.getElementById('fullLogList');

        // Render Live Logs (just top 20)
        this._renderLogList(container, logs.slice(0, 20), forceAll);

        // Also update Last Activity time
        if (logs[0]) {
            document.getElementById('lastActiveTime').innerText = new Date(logs[0].timestamp).toLocaleTimeString();
        }
    },

    shareSocial(platform) {
        const data = JSON.parse(localStorage.getItem('unnat_social_cache') || '{}');
        if (!data.data) return alert('No content generated yet!');

        const c = data.data;
        let url = '';

        if (platform === 'wa') {
            const text = encodeURIComponent(`${c.wa.text}\n\n👉 Join Unnat Tuition Center: https://unnattuitioncenter.github.io/`);
            url = `https://wa.me/?text=${text}`; // Opens WhatsApp Web/App
        } else if (platform === 'email') {
            const subject = encodeURIComponent(`Daily Content: ${new Date().toLocaleDateString()}`);
            const body = encodeURIComponent(`INSTAGRAM:\n${c.insta.caption}\n\nIMAGE: ${c.insta.image}\n\n---\n\nYOUTUBE:\n${c.yt.script}`);
            url = `mailto:?subject=${subject}&body=${body}`;
        }

        if (url) window.open(url, '_blank');
    },

    generateSocial(type) {
        alert('Command Sent: Please open the MAIN WEBSITE (index.html) in a new tab to trigger the AI Generator.');
        // Invalidate cache to force generation
        localStorage.setItem('unnat_social_cache', JSON.stringify({ timestamp: 0, data: null }));
    },

    escapeHtml(text) {
        if (!text) return text;
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    _renderLogList(container, logs, force) {
        if (!container) return;
        const firstLogId = logs[0] ? logs[0].id : null;
        if (!force && container.getAttribute('data-last-id') === firstLogId) return;

        container.innerHTML = '';
        container.setAttribute('data-last-id', firstLogId);

        if (logs.length === 0) {
            container.innerHTML = '<div style="padding:20px; text-align:center; color:#64748b;">No logs recorded yet.</div>';
            return;
        }

        logs.forEach(log => {
            const time = new Date(log.timestamp).toLocaleTimeString();
            const dataStr = JSON.stringify(log.data).replace(/{|}|"/g, ' ').trim();
            const safeMsg = this.escapeHtml(log.message);
            const safeData = this.escapeHtml(dataStr);

            const html = `
                <div class="log-item">
                    <div style="display:flex; align-items:center;">
                        <span class="log-type type-${log.type}">${log.type}</span>
                        <div class="log-content">
                            <div class="log-msg">${safeMsg}</div>
                            <div class="log-data">${safeData.substring(0, 50)}${safeData.length > 50 ? '...' : ''}</div>
                        </div>
                    </div>
                    <div class="log-time">${time}</div>
                </div>
            `;
            container.innerHTML += html;
        });
    },

    renderLeads(leads) {
        const tbody = document.getElementById('leadsTableBody');
        const badge = document.getElementById('leadCountBadge');
        if (!tbody) return;

        badge.innerText = `${leads.length} LEADS CAPTURED`;
        tbody.innerHTML = '';

        if (leads.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="padding:20px; text-align:center; color:#64748b;">No leads captured yet.</td></tr>';
            return;
        }

        leads.forEach(lead => {
            const date = new Date(lead.timestamp).toLocaleDateString() + ' ' + new Date(lead.timestamp).toLocaleTimeString();
            const data = lead.data;
            const contact = this.escapeHtml(data.phone || data.email || 'N/A');
            const details = this.escapeHtml(data.msg || data.course || data.biz || 'No details');
            const name = this.escapeHtml(data.name);

            tbody.innerHTML += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 15px;">${date}</td>
                    <td style="padding: 15px; font-weight:700; color:white;">${name}</td>
                    <td style="padding: 15px;"><span class="log-type type-GAZETTE" style="color:black;">${lead.type}</span></td>
                    <td style="padding: 15px;">${contact}</td>
                    <td style="padding: 15px;">${details}</td>
                    <td style="padding: 15px;">
                        <a href="https://wa.me/918307264895?text=Hi%20${name},%20contacting%20from%20Unnat." target="_blank" style="color:#22c55e;"><i class="fab fa-whatsapp"></i> Chat</a>
                    </td>
                </tr>
            `;
        });
    },

    renderAnalytics(stats, leads) {
        if (this.chartsInitialized) return;

        const ctx1 = document.getElementById('trafficChart').getContext('2d');
        const ctx2 = document.getElementById('sourceChart').getContext('2d');

        // Mock Traffic Data (In real app, we'd track this over time)
        // For now, we'll show "Today's Activity" based on current stats
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Visits', 'Blogs', 'Chats', 'Predictions'],
                datasets: [{
                    label: 'Today Activity',
                    data: [stats.visits, stats.blogs, stats.chats, stats.predictions],
                    backgroundColor: ['#c5a059', '#3b82f6', '#a855f7', '#ec4899'],
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } } }
            }
        });

        // Lead Sources
        // Count lead types
        const types = {};
        leads.forEach(l => { types[l.type] = (types[l.type] || 0) + 1; });

        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: Object.keys(types).length ? Object.keys(types) : ['No Data'],
                datasets: [{
                    data: Object.keys(types).length ? Object.values(types) : [1],
                    backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#64748b']
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } } }
        });

        this.chartsInitialized = true;
    },

    saveSettings() {
        const settings = {
            urgency: document.getElementById('setting-urgency').checked,
            holiday: document.getElementById('setting-holiday').checked
        };
        const webhook = document.getElementById('setting-webhook').value;
        localStorage.setItem('unnat_settings', JSON.stringify(settings));
        localStorage.setItem('unnat_webhook_url', webhook);
        alert('Configuration Saved! Rebooting Agents...');
    },

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('unnat_settings') || '{"urgency":true, "holiday":false}');
        const webhook = localStorage.getItem('unnat_webhook_url') || '';

        const uEl = document.getElementById('setting-urgency');
        const hEl = document.getElementById('setting-holiday');
        const wEl = document.getElementById('setting-webhook');

        if (uEl) uEl.checked = settings.urgency;
        if (hEl) hEl.checked = settings.holiday;
        if (wEl) wEl.value = webhook;
    },

    clearLogs() {
        if (confirm('Are you sure you want to delete all archives?')) {
            localStorage.removeItem('unnat_agent_logs');
            location.reload();
        }
    },

    renderDashboard() {
        this.fetchData();
    },

    saveKeys() {
        const keys = {
            gemini: document.getElementById('key-gemini').value,
            backup: document.getElementById('key-backup').value,
            pexels: document.getElementById('key-pexels').value,
            groq: document.getElementById('key-groq').value
        };
        localStorage.setItem('unnat_keys', JSON.stringify(keys));
        console.log("💎 Sovereign Keys Persisted to Browser Core.");

        // Visual Success Feedback
        const btn = event?.target || document.querySelector('button[onclick="AdminApp.saveKeys()"]');
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = "✅ KEYS SYNCHRONIZED";
            btn.style.background = "#22c55e";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
            }, 3000);
        }
    },

    initTokens() {
        const keys = JSON.parse(localStorage.getItem('unnat_keys') || '{}');
        const g = document.getElementById('key-gemini');
        const b = document.getElementById('key-backup');
        const p = document.getElementById('key-pexels');
        const gr = document.getElementById('key-groq');

        if (g) g.value = keys.gemini || '';
        if (b) b.value = keys.backup || '';
        if (p) p.value = keys.pexels || '';
        if (gr) gr.value = keys.groq || '';
    },

    updateAdminPass() {
        const newPass = document.getElementById('newAdminPass').value;
        if (!newPass) return alert('Enter a valid security key.');
        if (confirm('Rotate Master Token? You will be logged out and must use the new key.')) {
            localStorage.setItem('unnat_admin_pass', newPass);
            console.log("🔐 Security Token Rotated.");
            this.logout();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AdminApp.init();
});

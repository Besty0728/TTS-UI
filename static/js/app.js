document.addEventListener('DOMContentLoaded', () => {

    // --- 多语言支持 ---
    const i18n = {
        zh: {
            // 应用标题和导航
            'app-title': 'TTS UI',
            'welcome': '欢迎',
            'converter': '转换器',
            'api-management': 'API管理',
            'settings': '设置',
            'logout': '注销',
            
            // 登录页面
            'username': '用户名',
            'password': '密码',
            'login': '登录',
            'username-placeholder': '请输入用户名',
            'password-placeholder': '请输入密码',
            
            // 转换器页面
            'tts-converter-title': '文本转语音转换器',
            'input-text': '输入文本',
            'text-placeholder': '在这里输入要转换为语音的文本...',
            'service-provider': '服务商',
            'voice': '语音',
            'convert-to-speech': '转换',
            'cancel-generation': '中断生成',
            
            // 设置页面
            'api-settings': 'API 设置',
            'api-key': 'API密钥',
            'api-endpoint': 'API端点',
            'model': '模型',
            'save-openai-settings': '保存 OpenAI 设置',
            'save-gemini-settings': '保存 Gemini 设置',
            'openai-model-placeholder': '例如: tts-1, gpt-4-tts, etc.',
            'gemini-endpoint-placeholder': '例如: https://generativelanguage.googleapis.com/...',
            'gemini-model-placeholder': '例如: gemini-2.5-flash-preview-tts',
            
            // 账户管理
            'account-management': '账户管理',
            'new-username': '新用户名',
            'new-password': '新密码',
            'current-password': '当前密码',
            'new-username-placeholder': '输入新用户名（可选）',
            'new-password-placeholder': '输入新密码（可选）',
            'current-password-placeholder': '输入当前密码确认身份',
            'update-account': '更新账户',
            
            // 应用设置
            'app-settings': '应用设置',
            'auto-cleanup': '切换页面时自动清理音频',
            
            // API密钥管理
            'api-key-management': 'API密钥管理',
            'create-api-key': '创建新API密钥',
            'key-name': '密钥名称',
            'key-name-placeholder': '例如: 我的项目API密钥',
            'daily-limit': '每日调用限制',
            'provider-permissions': '允许的服务商',
            'existing-keys': '现有API密钥',
            'loading-keys': '正在加载...',
            'api-documentation': 'API文档',
            'base-url': '基础URL',
            'endpoint-synthesize': '文本转语音 API',
            'request-example': '请求示例',
            'request-params': '请求参数',
            'param-name': '参数名',
            'param-type': '类型',
            'param-required': '必填',
            'param-description': '说明',
            'param-text-desc': '要转换的文本内容',
            'param-provider-desc': '服务商: "openai" 或 "gemini"',
            'param-voice-desc': '语音名称',
            'param-format-desc': '音频格式 (默认: mp3)',
            'param-base64-desc': '返回Base64编码 (默认: false)',
            'other-endpoints': '其他端点',
            'get-providers': '获取可用服务商列表',
            'get-voices': '获取指定服务商的音色列表',
            'get-usage': '获取API使用统计',
            'health-check': '服务健康检查',
            'quick-test': '快速测试',
            'test-description': '使用以下URL在浏览器中测试API（需要先创建API密钥）:',
            'delete-key': '删除',
            'toggle-key': '启用/禁用',
            'copy-key': '复制密钥',
            'key-created': 'API密钥创建成功',
            'key-deleted': 'API密钥删除成功',
            'confirm-delete': '确定要删除这个API密钥吗？',
            
            // 状态信息
            'processing': '正在处理...',
            'success': '操作成功！',
            'error': '错误',
            'download': '下载',
            'done': '完成'
        },
        en: {
            // 应用标题和导航
            'app-title': 'TTS UI',
            'welcome': 'Welcome',
            'converter': 'Converter',
            'api-management': 'API Management',
            'settings': 'Settings',
            'logout': 'Logout',
            
            // 登录页面
            'username': 'Username',
            'password': 'Password',
            'login': 'Login',
            'username-placeholder': 'Enter username',
            'password-placeholder': 'Enter password',
            
            // 转换器页面
            'tts-converter-title': 'Text-to-Speech Converter',
            'input-text': 'Input Text',
            'text-placeholder': 'Enter text to convert to speech...',
            'service-provider': 'Service Provider',
            'voice': 'Voice',
            'convert-to-speech': 'Convert',
            'cancel-generation': 'Cancel Generation',
            
            // 设置页面
            'api-settings': 'API Settings',
            'api-key': 'API Key',
            'api-endpoint': 'API Endpoint',
            'model': 'Model',
            'save-openai-settings': 'Save OpenAI Settings',
            'save-gemini-settings': 'Save Gemini Settings',
            'openai-model-placeholder': 'e.g., tts-1, gpt-4-tts, etc.',
            'gemini-endpoint-placeholder': 'e.g., https://generativelanguage.googleapis.com/...',
            'gemini-model-placeholder': 'e.g., gemini-2.5-flash-preview-tts',
            
            // 账户管理
            'account-management': 'Account Management',
            'new-username': 'New Username',
            'new-password': 'New Password',
            'current-password': 'Current Password',
            'new-username-placeholder': 'Enter new username (optional)',
            'new-password-placeholder': 'Enter new password (optional)',
            'current-password-placeholder': 'Enter current password to confirm',
            'update-account': 'Update Account',
            
            // 应用设置
            'app-settings': 'App Settings',
            'auto-cleanup': 'Auto cleanup audio when switching pages',
            
            // API密钥管理
            'api-key-management': 'API Key Management',
            'create-api-key': 'Create New API Key',
            'key-name': 'Key Name',
            'key-name-placeholder': 'e.g., My Project API Key',
            'daily-limit': 'Daily Call Limit',
            'provider-permissions': 'Allowed Providers',
            'existing-keys': 'Existing API Keys',
            'loading-keys': 'Loading...',
            'api-documentation': 'API Documentation',
            'base-url': 'Base URL',
            'endpoint-synthesize': 'Text-to-Speech API',
            'request-example': 'Request Example',
            'request-params': 'Request Parameters',
            'param-name': 'Parameter',
            'param-type': 'Type',
            'param-required': 'Required',
            'param-description': 'Description',
            'param-text-desc': 'Text content to convert',
            'param-provider-desc': 'Provider: "openai" or "gemini"',
            'param-voice-desc': 'Voice name',
            'param-format-desc': 'Audio format (default: mp3)',
            'param-base64-desc': 'Return Base64 encoded (default: false)',
            'other-endpoints': 'Other Endpoints',
            'get-providers': 'Get Available Providers',
            'get-voices': 'Get Voice List for Provider',
            'get-usage': 'Get API Usage Statistics',
            'health-check': 'Service Health Check',
            'quick-test': 'Quick Test',
            'test-description': 'Use the following URL to test the API in browser (API key required):',
            'delete-key': 'Delete',
            'toggle-key': 'Enable/Disable',
            'copy-key': 'Copy Key',
            'key-created': 'API Key Created Successfully',
            'key-deleted': 'API Key Deleted Successfully',
            'confirm-delete': 'Are you sure you want to delete this API key?',
            
            // 状态信息
            'processing': 'Processing...',
            'success': 'Success!',
            'error': 'Error',
            'download': 'Download',
            'done': 'Done'
        }
    };

    // 当前语言设置（默认中文）
    let currentLang = localStorage.getItem('language') || 'zh';

    // 更新界面语言
    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);

        // 更新所有带有data-i18n属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key]) {
                element.textContent = i18n[lang][key];
            }
        });

        // 更新placeholder文本
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (i18n[lang] && i18n[lang][key]) {
                element.placeholder = i18n[lang][key];
            }
        });

        // 更新语言显示按钮
        const langDisplays = document.querySelectorAll('#current-lang, #current-lang-app');
        langDisplays.forEach(display => {
            display.textContent = lang === 'zh' ? '中文' : 'English';
        });

        // 更新页面语言属性
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        
        // 更新body类以支持按钮多语言切换
        if (lang === 'en') {
            document.body.classList.add('en');
        } else {
            document.body.classList.remove('en');
        }
        
        // 更新下载按钮文本
        updateDownloadButtonTexts();
    }

    // 获取本地化文本的辅助函数
    function getLocalizedText(key) {
        return i18n[currentLang] && i18n[currentLang][key] ? i18n[currentLang][key] : key;
    }

    // 更新下载按钮文本的函数
    function updateDownloadButtonTexts() {
        const downloadTitles = document.querySelectorAll('.download-title');
        downloadTitles.forEach((title, index) => {
            if (index % 2 === 0) { // 第一个标题 - "下载/Download"
                title.textContent = currentLang === 'zh' ? '下载' : 'Download';
            } else { // 第二个标题 - "完成/Done"
                title.textContent = currentLang === 'zh' ? '完成' : 'Done';
            }
        });
    }

    // --- DOM Elements ---
    const loginView = document.getElementById('login-view');
    const appView = document.getElementById('app-view');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const userDisplay = document.getElementById('user-display');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Language toggle buttons
    const langToggle = document.getElementById('lang-toggle');
    const langToggleApp = document.getElementById('lang-toggle-app');
    
    // Theme toggle buttons
    const themeToggles = document.querySelectorAll('.theme-switch__checkbox');

    const navLinks = {
        converter: document.getElementById('nav-converter'),
        apiManagement: document.getElementById('nav-api-management'),
        settings: document.getElementById('nav-settings')
    };

    const pages = {
        converter: document.getElementById('converter-page'),
        apiManagement: document.getElementById('api-management-page'),
        settings: document.getElementById('settings-page')
    };

    // Settings form elements
    const openaiSettingsForm = document.getElementById('openai-settings-form');
    const geminiSettingsForm = document.getElementById('gemini-settings-form');
    const accountSettingsForm = document.getElementById('account-settings-form');
    const openaiSaveStatus = document.getElementById('openai-save-status');
    const geminiSaveStatus = document.getElementById('gemini-save-status');
    const accountSaveStatus = document.getElementById('account-save-status');

    // Converter elements
    const convertBtn = document.getElementById('convert-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const ttsStatus = document.getElementById('tts-status');
    const ttsLoader = document.getElementById('tts-loader');
    const serviceSelect = document.getElementById('service-select');
    const voiceSelect = document.getElementById('voice-select');
    
    // App settings elements
    const autoCleanupToggle = document.getElementById('auto-cleanup-toggle');
    
    // API Key Management elements
    const createApiKeyBtn = document.getElementById('create-api-key-btn');
    const apiKeysContainer = document.getElementById('api-keys-container');
    const newKeyName = document.getElementById('new-key-name');
    const dailyLimit = document.getElementById('daily-limit');
    const providerOpenai = document.getElementById('provider-openai');
    const providerGemini = document.getElementById('provider-gemini');
    const createKeyStatus = document.getElementById('create-key-status');
    const apiBaseUrl = document.getElementById('api-base-url');

    // --- State ---
    let currentUser = null;
    let currentAbortController = null;
    let currentAudioUrl = null; // 跟踪当前音频URL以便清理内存

    // --- Utility Functions ---
    /**
     * A helper to fetch data from our API.
     * @param {string} url - The API endpoint.
     * @param {object} options - The options for the fetch call (method, headers, body).
     * @returns {Promise<any>} - The JSON response from the server.
     */
    async function apiFetch(url, options = {}) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                // Try to parse error message from server, otherwise use status text
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error || response.statusText);
            }
            // Handle responses with no content (e.g. for audio later)
            if (response.status === 204) return null;
            return response.json();
        } catch (error) {
            console.error(`API Fetch Error (${url}):`, error);
            throw error;
        }
    }

    // 清理音频内存的函数
    function cleanupAudioMemory() {
        if (currentAudioUrl) {
            URL.revokeObjectURL(currentAudioUrl);
            currentAudioUrl = null;
        }
    }

    // --- View/Page Management ---
    function showView(viewName) {
        loginView.classList.add('hidden');
        appView.classList.add('hidden');
        document.getElementById(`${viewName}-view`).classList.remove('hidden');
        
        // 切换到登录视图时清空错误消息和表单
        if (viewName === 'login') {
            if (loginError) loginError.textContent = '';
            // 清空登录表单
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            if (usernameInput) usernameInput.value = '';
            if (passwordInput) passwordInput.value = '';
        }
    }

    function showPage(pageName) {
        Object.values(pages).forEach(page => page.classList.add('hidden'));
        Object.values(navLinks).forEach(link => link.classList.remove('active'));
        pages[pageName].classList.remove('hidden');
        navLinks[pageName].classList.add('active');
        
        // 切换页面时清空状态消息
        if (pageName === 'converter') {
            if (ttsStatus) ttsStatus.textContent = '';
            if (ttsLoader) ttsLoader.classList.add('hidden'); // 隐藏加载器
            // 重置所有下载按钮状态
            document.querySelectorAll('.download-input').forEach(input => {
                input.checked = false;
            });
        } else if (pageName === 'settings') {
            // 根据用户设置决定是否清理音频内存
            if (autoCleanupToggle && autoCleanupToggle.checked) {
                cleanupAudioMemory();
                const audioContainer = document.getElementById('audio-player-container');
                if (audioContainer) audioContainer.innerHTML = '';
            }
        } else {
            if (openaiSaveStatus) openaiSaveStatus.textContent = '';
            if (geminiSaveStatus) geminiSaveStatus.textContent = '';
            if (accountSaveStatus) accountSaveStatus.textContent = '';
        }
    }

    // --- Authentication Logic ---
    async function checkAuthStatus() {
        try {
            const data = await apiFetch('/api/check_auth');
            if (data.is_logged_in) {
                currentUser = data.username;
                userDisplay.textContent = currentUser;
                showView('app');
                showPage('converter'); // Default to converter page
            } else {
                showView('login');
            }
        } catch (error) {
            showView('login');
        }
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.textContent = '';
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            await apiFetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            checkAuthStatus();
        } catch (error) {
            loginError.textContent = getLocalizedText('error') + ': ' + error.message;
        }
    });

    logoutBtn.addEventListener('click', async () => {
        try {
            await apiFetch('/api/logout', { method: 'POST' });
            currentUser = null;
            showView('login');
        } catch (error) {
            alert(getLocalizedText('error') + ': ' + error.message);
        }
    });

    // --- Navigation ---
    navLinks.converter.addEventListener('click', () => { showPage('converter'); });
    navLinks.apiManagement.addEventListener('click', () => { showPage('apiManagement'); loadApiKeys(); });
    navLinks.settings.addEventListener('click', () => { showPage('settings'); loadSettings(); });

    // --- Language Toggle ---
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            updateLanguage(newLang);
        });
    }

    if (langToggleApp) {
        langToggleApp.addEventListener('click', () => {
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            updateLanguage(newLang);
        });
    }

    // --- Theme Toggle ---
    // 从localStorage获取主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDark = savedTheme === 'dark';
    
    // 应用初始主题
    if (isDark) {
        document.body.classList.add('dark-theme');
        themeToggles.forEach(toggle => toggle.checked = true);
    }
    
    // 主题切换功能
    function toggleTheme() {
        const isDarkNow = document.body.classList.contains('dark-theme');
        if (isDarkNow) {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            themeToggles.forEach(toggle => toggle.checked = false);
        } else {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeToggles.forEach(toggle => toggle.checked = true);
        }
    }
    
    // 为所有主题切换按钮添加事件监听器
    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', toggleTheme);
    });


    // --- Settings Logic ---
    async function loadSettings() {
        try {
            const settings = await apiFetch('/api/settings');
            // OpenAI
            document.getElementById('openai-api-key').value = settings.openai.api_key || '';
            document.getElementById('openai-api-endpoint').value = settings.openai.api_endpoint || 'https://api.openai.com/v1/audio/speech';
            document.getElementById('openai-model').value = settings.openai.model_name || 'tts-1';
            // Gemini
            document.getElementById('gemini-api-key').value = settings.gemini.api_key || '';
            document.getElementById('gemini-api-endpoint').value = settings.gemini.api_endpoint || '';
            document.getElementById('gemini-model').value = settings.gemini.model_name || '';
            
            // 加载账户信息
            await loadAccountInfo();
            
            // 加载API密钥
            await loadApiKeys();
            
            // 设置API基础URL
            if (apiBaseUrl) {
                apiBaseUrl.textContent = window.location.origin;
            }
        } catch (error) {
            alert(getLocalizedText('error') + ': ' + error.message);
        }
    }

    // --- API Key Management ---
    async function loadApiKeys() {
        try {
            const keys = await apiFetch('/api/keys');
            displayApiKeys(keys);
        } catch (error) {
            if (apiKeysContainer) {
                apiKeysContainer.innerHTML = `<p class="error-message">${getLocalizedText('error')}: ${error.message}</p>`;
            }
        }
    }

    function displayApiKeys(keys) {
        if (!apiKeysContainer) return;
        
        if (keys.length === 0) {
            apiKeysContainer.innerHTML = `<p>${getLocalizedText('no-keys-yet') || '还没有API密钥'}</p>`;
            return;
        }

        const keysHtml = keys.map(key => `
            <div class="api-key-item ${key.is_active ? 'active' : 'inactive'}">
                <div class="key-info">
                    <div class="key-header">
                        <h5>${key.key_name}</h5>
                        <span class="key-status ${key.is_active ? 'active' : 'inactive'}">
                            ${key.is_active ? '✓ 活跃' : '✗ 禁用'}
                        </span>
                    </div>
                    <div class="key-details">
                        <p><strong>API密钥:</strong> <code class="api-key-display">${key.api_key_masked}</code></p>
                        <p><strong>每日限制:</strong> ${key.daily_limit}</p>
                        <p><strong>允许服务商:</strong> ${key.provider_permissions.join(', ')}</p>
                        <p><strong>创建时间:</strong> ${new Date(key.created_at).toLocaleString()}</p>
                        ${key.last_used_at ? `<p><strong>最后使用:</strong> ${new Date(key.last_used_at).toLocaleString()}</p>` : ''}
                    </div>
                </div>
                <div class="key-actions">
                    <button class="btn-small toggle-key-btn" data-key-id="${key.id}" data-is-active="${key.is_active}">
                        ${key.is_active ? '禁用' : '启用'}
                    </button>
                    <button class="btn-small delete-key-btn" data-key-id="${key.id}">
                        ${getLocalizedText('delete-key')}
                    </button>
                </div>
            </div>
        `).join('');

        apiKeysContainer.innerHTML = keysHtml;

        // 添加事件监听器
        apiKeysContainer.querySelectorAll('.toggle-key-btn').forEach(btn => {
            btn.addEventListener('click', toggleApiKey);
        });

        apiKeysContainer.querySelectorAll('.delete-key-btn').forEach(btn => {
            btn.addEventListener('click', deleteApiKey);
        });
    }

    async function createApiKey() {
        if (!newKeyName || !dailyLimit || !providerOpenai || !providerGemini) return;
        
        const keyName = newKeyName.value.trim();
        const limit = parseInt(dailyLimit.value);
        const providers = [];
        
        if (providerOpenai.checked) providers.push('openai');
        if (providerGemini.checked) providers.push('gemini');
        
        if (!keyName) {
            createKeyStatus.textContent = '请输入密钥名称';
            createKeyStatus.className = 'status-message error-message';
            return;
        }
        
        if (providers.length === 0) {
            createKeyStatus.textContent = '请至少选择一个服务商';
            createKeyStatus.className = 'status-message error-message';
            return;
        }
        
        createKeyStatus.textContent = getLocalizedText('processing');
        createKeyStatus.className = 'status-message';
        
        try {
            const result = await apiFetch('/api/keys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key_name: keyName,
                    daily_limit: limit,
                    provider_permissions: providers
                })
            });
            
            createKeyStatus.innerHTML = `
                <div class="success-message">
                    <p>${getLocalizedText('key-created')}</p>
                    <p><strong>新API密钥:</strong></p>
                    <div class="new-key-display">
                        <code id="new-api-key">${result.api_key}</code>
                        <button type="button" onclick="copyToClipboard('${result.api_key}')" class="copy-btn">📋</button>
                    </div>
                    <p class="warning">⚠️ 请立即保存此密钥，离开页面后将无法再次查看完整密钥！</p>
                </div>
            `;
            createKeyStatus.className = 'status-message success-message';
            
            // 清空表单
            newKeyName.value = '';
            dailyLimit.value = '1000';
            providerOpenai.checked = true;
            providerGemini.checked = true;
            
            // 重新加载密钥列表
            await loadApiKeys();
            
        } catch (error) {
            createKeyStatus.textContent = getLocalizedText('error') + ': ' + error.message;
            createKeyStatus.className = 'status-message error-message';
        }
        
        setTimeout(() => {
            if (createKeyStatus.className.includes('success') || createKeyStatus.className.includes('error')) {
                createKeyStatus.textContent = '';
                createKeyStatus.className = 'status-message';
            }
        }, 10000);
    }

    async function toggleApiKey(event) {
        const keyId = event.target.dataset.keyId;
        const isActive = event.target.dataset.isActive === 'true';
        
        try {
            await apiFetch(`/api/keys/${keyId}/toggle`, { method: 'POST' });
            await loadApiKeys();
        } catch (error) {
            alert(getLocalizedText('error') + ': ' + error.message);
        }
    }

    async function deleteApiKey(event) {
        const keyId = event.target.dataset.keyId;
        
        if (!confirm(getLocalizedText('confirm-delete'))) {
            return;
        }
        
        try {
            await apiFetch(`/api/keys/${keyId}`, { method: 'DELETE' });
            await loadApiKeys();
        } catch (error) {
            alert(getLocalizedText('error') + ': ' + error.message);
        }
    }

    // 复制到剪贴板的辅助函数
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            // 可以添加复制成功的提示
            const copyBtn = event.target;
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 1000);
        }).catch(err => {
            // 降级到选择文本的方法
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        });
    };

    async function loadAccountInfo() {
        try {
            const accountInfo = await apiFetch('/api/account');
            document.getElementById('account-username').placeholder = accountInfo.username + ' (' + getLocalizedText('new-username') + ')';
        } catch (error) {
            console.error('Failed to load account info:', error);
        }
    }

    async function handleSettingsSave(form, serviceName, statusElement) {
        event.preventDefault();
        statusElement.textContent = getLocalizedText('processing');
        const apiKey = form.querySelector(`input[id$="api-key"]`).value;
        const apiEndpoint = form.querySelector(`input[id$="api-endpoint"]`).value;
        const model = form.querySelector(`[id$="model"]`).value;
        try {
            // 使用后端统一的 'model_name' 字段
            const payload = {
                service_name: serviceName,
                api_key: apiKey,
                api_endpoint: apiEndpoint,
                model_name: model
            };
            const result = await apiFetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            statusElement.textContent = '✅ ' + getLocalizedText('success');
            statusElement.className = 'status-message success-message';
        } catch (error) {
            statusElement.textContent = '❌ ' + getLocalizedText('error') + ': ' + error.message;
            statusElement.className = 'status-message error-message';
        }
        setTimeout(() => { 
            statusElement.textContent = ''; 
            statusElement.className = 'status-message';
        }, 3000);
    }

    openaiSettingsForm.addEventListener('submit', (e) => handleSettingsSave(e.target, 'openai', openaiSaveStatus));
    geminiSettingsForm.addEventListener('submit', (e) => handleSettingsSave(e.target, 'gemini', geminiSaveStatus));
    
    // 账户管理表单提交
    accountSettingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        accountSaveStatus.textContent = getLocalizedText('processing');
        
        const newUsername = document.getElementById('account-username').value.trim();
        const newPassword = document.getElementById('account-password').value.trim();
        const currentPassword = document.getElementById('current-password').value.trim();
        
        if (!currentPassword) {
            accountSaveStatus.textContent = '❌ ' + (currentLang === 'zh' ? '请输入当前密码' : 'Please enter current password');
            accountSaveStatus.className = 'status-message error-message';
            setTimeout(() => { 
                accountSaveStatus.textContent = '';
                accountSaveStatus.className = 'status-message';
            }, 3000);
            return;
        }
        
        try {
            const result = await apiFetch('/api/account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: newUsername || undefined,
                    password: newPassword || undefined,
                    current_password: currentPassword
                })
            });
            
            accountSaveStatus.textContent = '✅ ' + getLocalizedText('success');
            accountSaveStatus.className = 'status-message success-message';
            
            // 清空表单
            document.getElementById('account-username').value = '';
            document.getElementById('account-password').value = '';
            document.getElementById('current-password').value = '';
            
            // 如果用户名更改了，更新显示
            if (newUsername) {
                userDisplay.textContent = newUsername;
                await loadAccountInfo(); // 重新加载账户信息更新placeholder
            }
            
        } catch (error) {
            accountSaveStatus.textContent = '❌ ' + getLocalizedText('error') + ': ' + error.message;
            accountSaveStatus.className = 'status-message error-message';
        }
        
        setTimeout(() => { 
            accountSaveStatus.textContent = '';
            accountSaveStatus.className = 'status-message';
        }, 3000);
    });

    // API密钥管理事件监听器
    if (createApiKeyBtn) {
        createApiKeyBtn.addEventListener('click', createApiKey);
    }

    const voices = {
        openai: [
            { value: 'alloy', text: 'Alloy' },
            { value: 'echo', text: 'Echo' },
            { value: 'fable', text: 'Fable' },
            { value: 'nova', text: 'Nova' },
            { value: 'onyx', text: 'Onyx' },
            { value: 'shimmer', text: 'Shimmer' }
        ],
        gemini: [
            // Gemini TTS官方支持的30种语音选项
            { value: 'Zephyr', text: 'Zephyr (Bright)' },
            { value: 'Puck', text: 'Puck (Upbeat)' },
            { value: 'Charon', text: 'Charon (Informative)' },
            { value: 'Kore', text: 'Kore (Firm)' },
            { value: 'Fenrir', text: 'Fenrir (Excitable)' },
            { value: 'Leda', text: 'Leda (Youthful)' },
            { value: 'Orus', text: 'Orus (Firm)' },
            { value: 'Aoede', text: 'Aoede (Breezy)' },
            { value: 'Callirrhoe', text: 'Callirrhoe (Easy-going)' },
            { value: 'Autonoe', text: 'Autonoe (Bright)' },
            { value: 'Enceladus', text: 'Enceladus (Breathy)' },
            { value: 'Iapetus', text: 'Iapetus (Clear)' },
            { value: 'Umbriel', text: 'Umbriel (Easy-going)' },
            { value: 'Algieba', text: 'Algieba (Smooth)' },
            { value: 'Despina', text: 'Despina (Smooth)' },
            { value: 'Erinome', text: 'Erinome (Clear)' },
            { value: 'Algenib', text: 'Algenib (Gravelly)' },
            { value: 'Rasalgethi', text: 'Rasalgethi (Informative)' },
            { value: 'Laomedeia', text: 'Laomedeia (Upbeat)' },
            { value: 'Achernar', text: 'Achernar (Soft)' },
            { value: 'Alnilam', text: 'Alnilam (Firm)' },
            { value: 'Schedar', text: 'Schedar (Even)' },
            { value: 'Gacrux', text: 'Gacrux (Mature)' },
            { value: 'Pulcherrima', text: 'Pulcherrima (Forward)' },
            { value: 'Achird', text: 'Achird (Friendly)' },
            { value: 'Zubenelgenubi', text: 'Zubenelgenubi (Casual)' },
            { value: 'Vindemiatrix', text: 'Vindemiatrix (Gentle)' },
            { value: 'Sadachbia', text: 'Sadachbia (Lively)' },
            { value: 'Sadaltager', text: 'Sadaltager (Knowledgeable)' },
            { value: 'Sulafat', text: 'Sulafat (Warm)' }
        ]
    };
    // --- Dynamic Voice Selection Logic ---
    function updateVoiceOptions(selectedService) {
        const voiceOptions = voices[selectedService] || [];
        voiceSelect.innerHTML = ''; // 清空现有选项
        voiceOptions.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.value;
            option.textContent = voice.text;
            voiceSelect.appendChild(option);
        });
    }
    // 监听服务下拉菜单的变化
    serviceSelect.addEventListener('change', (e) => {
        updateVoiceOptions(e.target.value);
    });

    // --- TTS Converter Logic ---
    convertBtn.addEventListener('click', async () => {
        const text = document.getElementById('tts-text').value;
        const service = document.getElementById('service-select').value;
        const voice = document.getElementById('voice-select').value; // Get selected voice
        const audioContainer = document.getElementById('audio-player-container');
        
        if (!text.trim()) {
            ttsStatus.textContent = "⚠️ " + (currentLang === 'zh' ? '请输入要转换的文本。' : 'Please enter text to convert.');
            ttsStatus.className = 'error-message';
            return;
        }
        
        // 开始新的转换前清理旧的音频内存
        cleanupAudioMemory();
        // Show cancel button and disable convert button
        convertBtn.style.display = 'none';
        cancelBtn.classList.remove('hidden');
        
        const serviceName = service === 'openai' ? 'OpenAI' : service === 'gemini' ? 'Gemini' : service;
        ttsStatus.textContent = `🎙️ ${currentLang === 'zh' ? '正在请求' : 'Requesting'} ${serviceName} ${currentLang === 'zh' ? '生成语音...' : 'to generate speech...'}`;
        ttsStatus.className = 'status-message loading';
        ttsLoader.classList.remove('hidden'); // 显示加载器
        audioContainer.innerHTML = ''; // Clear previous audio player
        
        // Create new AbortController for this request
        currentAbortController = new AbortController();
        
        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, service, voice }), // Send voice in request
                signal: currentAbortController.signal // Add abort signal
            });
            
            if (!response.ok) {
                // If the response is not OK, it's likely a JSON error from our backend
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate audio.');
            }
            
            // The response is audio data. We need to convert it to a playable format.
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            currentAudioUrl = audioUrl; // 保存当前音频URL以便后续清理
            
            // Create a wrapper for audio controls and download button
            const audioControlsWrapper = document.createElement('div');
            audioControlsWrapper.className = 'audio-controls-wrapper';
            
            // Create a new audio element
            const audio = new Audio(audioUrl);
            audio.controls = true;
            audio.autoplay = true; // Auto-play the generated audio
            
            // Create download button container
            const downloadContainer = document.createElement('div');
            downloadContainer.className = 'download-container';
            
            // Create download button
            downloadContainer.innerHTML = `
                <label class="download-label">
                    <input type="checkbox" class="download-input" />
                    <span class="download-circle">
                        <svg class="download-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19V5m0 14-4-4m4 4 4-4"></path>
                        </svg>
                        <div class="download-square"></div>
                    </span>
                    <p class="download-title">${getLocalizedText('download') || (currentLang === 'zh' ? '下载' : 'Download')}</p>
                    <p class="download-title">${getLocalizedText('done') || (currentLang === 'zh' ? '完成' : 'Done')}</p>
                </label>
            `;
            
            // Add click event to download button
            const downloadButton = downloadContainer.querySelector('.download-label');
            const downloadInput = downloadContainer.querySelector('.download-input');
            const downloadCircle = downloadContainer.querySelector('.download-circle');
            const downloadIcon = downloadContainer.querySelector('.download-icon');
            
            downloadButton.addEventListener('click', async (e) => {
                e.preventDefault();
                if (!downloadInput.checked) {
                    downloadInput.checked = true;
                    
                    // 隐藏图标，开始下载动画
                    downloadIcon.style.opacity = '0';
                    downloadCircle.classList.add('downloading');
                    
                    try {
                        // 重新获取音频数据以跟踪下载进度
                        const response = await fetch(audioUrl);
                        const reader = response.body.getReader();
                        const contentLength = +response.headers.get('Content-Length') || audioBlob.size;
                        
                        let receivedLength = 0;
                        let chunks = [];
                        
                        while(true) {
                            const { done, value } = await reader.read();
                            
                            if (done) break;
                            
                            chunks.push(value);
                            receivedLength += value.length;
                            
                            // 计算并更新进度到动画
                            const progress = Math.min((receivedLength / contentLength) * 100, 100);
                            downloadCircle.style.setProperty('--progress', progress + '%');
                        }
                        
                        // 下载完成
                        downloadCircle.style.setProperty('--progress', '100%');
                        
                        // 创建并触发下载
                        const blob = new Blob(chunks);
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `tts_audio_${new Date().getTime()}.mp3`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                        
                    } catch (error) {
                        console.error('Download failed:', error);
                        // 如果获取失败，使用现有的audioUrl直接下载
                        const link = document.createElement('a');
                        link.href = audioUrl;
                        link.download = `tts_audio_${new Date().getTime()}.mp3`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                    
                    // Reset button after animation completes
                    setTimeout(() => {
                        downloadInput.checked = false;
                        downloadIcon.style.opacity = '1';
                        downloadCircle.classList.remove('downloading');
                        downloadCircle.style.setProperty('--progress', '0%');
                    }, 4000);
                }
            });
            
            // Append elements to wrapper
            audioControlsWrapper.appendChild(audio);
            audioControlsWrapper.appendChild(downloadContainer);
            
            // Append wrapper to container
            audioContainer.appendChild(audioControlsWrapper);
            ttsStatus.textContent = '🎉 ' + (currentLang === 'zh' ? '语音生成成功！' : 'Speech generated successfully!');
            ttsStatus.className = 'status-message success-message';
            // 5秒后自动清除成功提示
            setTimeout(() => {
                if (ttsStatus.textContent.includes('成功') || ttsStatus.textContent.includes('successfully')) {
                    ttsStatus.textContent = '';
                    ttsStatus.className = '';
                }
            }, 5000);
        } catch (error) {
            if (error.name === 'AbortError') {
                ttsStatus.textContent = '⏹️ ' + (currentLang === 'zh' ? '语音生成已取消' : 'Speech generation cancelled');
                ttsStatus.className = 'status-message';
                // 3秒后自动清除取消提示
                setTimeout(() => {
                    if (ttsStatus.textContent.includes('取消') || ttsStatus.textContent.includes('cancelled')) {
                        ttsStatus.textContent = '';
                        ttsStatus.className = '';
                    }
                }, 3000);
            } else {
                ttsStatus.textContent = '❌ ' + getLocalizedText('error') + ': ' + error.message;
                ttsStatus.className = 'error-message';
            }
        } finally {
            // Reset UI state
            convertBtn.style.display = 'inline-flex';
            cancelBtn.classList.add('hidden');
            ttsLoader.classList.add('hidden'); // 隐藏加载器
            currentAbortController = null;
        }
    });
    
    // Cancel button logic
    cancelBtn.addEventListener('click', () => {
        if (currentAbortController) {
            currentAbortController.abort();
        }
    });

    // --- Initial Load ---
    updateLanguage(currentLang); // 初始化语言设置
    
    // 清空所有错误消息，确保页面加载时不显示空的错误框
    if (loginError) loginError.textContent = '';
    if (ttsStatus) ttsStatus.textContent = '';
    if (ttsLoader) ttsLoader.classList.add('hidden'); // 隐藏加载器
    if (openaiSaveStatus) openaiSaveStatus.textContent = '';
    if (geminiSaveStatus) geminiSaveStatus.textContent = '';
    if (accountSaveStatus) accountSaveStatus.textContent = '';
    
    checkAuthStatus();
    updateVoiceOptions('openai');
    
    // 加载应用设置
    if (autoCleanupToggle) {
        const savedAutoCleanup = localStorage.getItem('autoCleanup');
        if (savedAutoCleanup !== null) {
            autoCleanupToggle.checked = savedAutoCleanup === 'true';
        }
        
        // 监听开关变化并保存到本地存储
        autoCleanupToggle.addEventListener('change', () => {
            localStorage.setItem('autoCleanup', autoCleanupToggle.checked.toString());
        });
    }
    
    // 页面卸载时清理内存
    window.addEventListener('beforeunload', () => {
        cleanupAudioMemory();
    });

    // --- 复制功能 ---
    document.addEventListener('click', async (e) => {
        if (e.target.closest('.copy-btn')) {
            const btn = e.target.closest('.copy-btn');
            const targetId = btn.getAttribute('data-copy');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                try {
                    let textToCopy = '';
                    if (targetElement.tagName === 'CODE') {
                        textToCopy = targetElement.textContent;
                    } else {
                        textToCopy = targetElement.textContent || targetElement.innerText;
                    }
                    
                    await navigator.clipboard.writeText(textToCopy);
                    
                    // 显示复制成功反馈
                    const originalIcon = btn.querySelector('i');
                    const originalClass = originalIcon.className;
                    originalIcon.className = 'fas fa-check';
                    btn.style.background = '#28a745';
                    
                    setTimeout(() => {
                        originalIcon.className = originalClass;
                        btn.style.background = '';
                    }, 1500);
                    
                } catch (err) {
                    console.error('复制失败:', err);
                    // 降级到选择文本
                    if (window.getSelection && document.createRange) {
                        const range = document.createRange();
                        range.selectNodeContents(targetElement);
                        const selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            }
        }
    });
});

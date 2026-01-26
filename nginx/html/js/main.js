// Department Configuration
const departments = {
    'hr': {
        name: 'HR Team',
        botName: 'HR Assistant',
        botAvatar: 'HRBot',
        greeting: '안녕하세요! 👋저는 HR 팀의 챗봇입니다.   👋\n직원 관계, 복리후생 또는 인사 정책과 관련하여 어떻게 도와드릴까요?',
        quickActions: [
            { icon: 'fa-calendar', text: '인력구성: 매출 성장률, 팔로워 추이, ROI 분석' },
            { icon: 'fa-file-alt', text: '역량분석: 직무경력, 실무 역량, 전문 분야' },
            { icon: 'fa-users', text: '근태/관리: 근무 연차, 담당 부서, 연락망 확인' }
        ],
        botImg: '/img/hr_chatbot.png'
    },
    'finance': {
        name: 'Finance Team',
        botName: 'Finance Bot',
        botAvatar: 'FinanceBot',
        greeting: '안녕하세요! 저는 재무 담당 비서입니다. 💰\n경비, 송장, 예산 관련 질문, 재무 보고서 작성 등을 도와드릴 수 있습니다.',
        quickActions: [
            { icon: 'fa-receipt', text: 'Submit Expense' },
            { icon: 'fa-file-invoice', text: 'Track Invoice' },
            { icon: 'fa-chart-pie', text: 'Budget Report' }
        ],
        botImg: '/img/finance_chatbot.png'
    },
    'legal': {
        name: 'Legal Team',
        botName: 'Legal Advisor',
        botAvatar: 'LegalBot',
        greeting: '안녕하세요! 저는 법률 자문 봇입니다. ⚖️\n계약, 규정 준수 관련 질문, 법률 문서 작성에 도움을 드릴 수 있습니다.',
        quickActions: [
            { icon: 'fa-file-contract', text: 'Contract Review' },
            { icon: 'fa-shield-alt', text: 'Compliance Check' },
            { icon: 'fa-book', text: 'Legal Resources' }
        ],
        botImg: '/img/legal_chatbot.png'
    },
    'development': {
        name: 'Development Team',
        botName: 'Dev Bot',
        botAvatar: 'DevBot',
        greeting: '안녕하세요, 개발자님!  👨‍💻\n코드 리뷰, 배포 문제, 기술 문서 작성, 개발 워크플로우 관련해서 도와드리겠습니다.',
        quickActions: [
            { icon: 'fa-code-branch', text: 'Code Review' },
            { icon: 'fa-rocket', text: 'Deploy Status' },
            { icon: 'fa-book-open', text: 'Documentation' }
        ],
        botImg: '/img/development_chatbot.png'
    },
    'it-support': {
        name: 'IT Support Team',
        botName: 'Tech Bot',
        botAvatar: 'TechBot',
        greeting: '안녕하세요! 저는 IT 팀 매니저입니다.👋\n하드웨어 또는 소프트웨어 관련해서 어떤 도움을 드릴 수 있을까요??',
        quickActions: [
            { icon: 'fa-wifi', text: 'Connection Issues' },
            { icon: 'fa-key', text: 'Reset Password' },
            { icon: 'fa-download', text: 'Download VPN Client' }
        ],
        botImg: '/img/tech_chatbot.png'
    },
    'qa': {
        name: 'QA Team',
        botName: 'QA Bot',
        botAvatar: 'QABot',
        greeting: '안녕하세요! 저는 QA 어시스턴트입니다.🐛\n버그 보고서, 테스트 케이스, 품질 표준 및 테스트 절차 관련해서 도움을 드릴 수 있습니다.',
        quickActions: [
            { icon: 'fa-bug', text: 'Report Bug' },
            { icon: 'fa-tasks', text: 'Test Cases' },
            { icon: 'fa-clipboard-check', text: 'QA Checklist' }
        ],
        botImg: '/img/qa_chatbot.png'
    },
    'sales': {
        name: 'Sales Team',
        botName: 'Sales Assistant',
        botAvatar: 'SalesBot',
        greeting: '안녕하세요! 저는 영업 담당 어시스턴트입니다.  📈\n잠재 고객 발굴, 계약 체결, 고객 정보 관리, 판매 보고서 작성 등을 도와드릴 수 있습니다.',
        quickActions: [
            { icon: 'fa-handshake', text: 'New Lead' },
            { icon: 'fa-chart-line', text: 'Sales Pipeline' },
            { icon: 'fa-file-alt', text: 'Generate Report' }
        ],
        botImg: '/img/sales_chatbot.png'

    },
    'marketing': {
        name: 'Marketing Team',
        botName: 'Marketing Assistant',
        botAvatar: 'MarketingBot',
        greeting: '안녕하세요! 마케팅 어시스턴트입니다. 📢\n캠페인, 콘텐츠 제작, 분석 및 마케팅 전략 수립을 도와드릴 수 있습니다.',
        quickActions: [
            { icon: 'fa-bullhorn', text: '성과 지표: 매출 성장률 , 팔로워 추이 , ROI 분석' },
            { icon: 'fa-chart-bar', text: '고객 분석: 세대별 비중 , 구매 빈도 , 선호 채널' },
            { icon: 'fa-pen', text: '전략 실행: 분기별 진도 , 예산 배분 , 온라인 전환Content Ideas' }
        ],
        botImg: '/img/marketing_chatbot.png'
    },
    'sangsang': {
        name: 'SangSang Story',
        botName: '상상스토리 어시스턴트',
        botAvatar: 'SangSangBot',
        greeting: '안녕하세요! 👋저는 상상스토리 어시스턴트입니다.   👋\n사내문서를 수집하여 답변드리고 있습니다. 무엇이 궁금하신가요?',
        quickActions: [
        ],
        botImg: '/img/tech_chatbot.png'
    },
};

// Current state
let currentDepartment = 'sangsang';
let currentSessionId = null;
let currentUserId = null;

// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const mainContent = document.querySelector('.main-content');
const departmentTitle = document.getElementById('departmentTitle');
const departmentItems = document.querySelectorAll('.department-item');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const searchInput = document.getElementById('searchInput');
// const recentlyItems = document.querySelectorAll('.recently-item');
const btnLogout = document.getElementById('btnLogout');
const recordBtn = document.getElementById("recordBtn");
const recordStatus = document.getElementById("recordStatus");

// Initialize
async function init() {
    await loadSession();
    setupEventListeners();
    selectInitialDepartment(); // ⭐ 먼저 UI+채팅 초기화
    loadRecentlyByDept("sangsang"); // ⭐ 명시적으로 marketing
}


async function loadSession() {
    try {
        const res = await fetch("/api/me", {
            credentials: "include"   // ⭐ 세션 쿠키 필수
        });

        if (!res.ok) throw new Error("Not logged in");

        const user = await res.json();

        if (!user || !user.user_id) {
            throw new Error("Invalid session");
        }

        // ✅ 세션 ID 구성 (원하시는 포맷으로 가능)
        currentSessionId = `user:${user.login_id}`;
        currentUserId = user.login_id;

        console.log("Session loaded:", currentSessionId);

        document.body.style.display = "block";

    } catch (err) {
        console.error("Session load failed:", err);
        // 필요 시 로그인 페이지로 이동
        // location.href = "/login.html";
    }
}

function selectInitialDepartment() {
    const defaultDept = "sangsang";

    departmentItems.forEach(item => {
        const dept = item.dataset.department;

        if (dept === defaultDept) {
            item.classList.add("active");
            currentDepartment = defaultDept;

            const name = item.querySelector(".department-name")?.innerText;
            if (name) {
                departmentTitle.innerText = name;
            }

            // 🔥 실제 부서 로딩 추가
            loadDepartment(defaultDept);
        } else {
            item.classList.remove("active");
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Sidebar toggle
    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);

    // Department selection
    departmentItems.forEach(item => {
        item.addEventListener('click', () => {
            const dept = item.getAttribute('data-department');
            selectDepartment(dept);
        });
    });

    // Message sending
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    btnLogout.addEventListener('click', logout);


    // Search functionality
    searchInput.addEventListener('input', handleSearch);

    // Close sidebar on outside click (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                if (!sidebar.classList.contains('closed')) {
                    toggleSidebar();
                }
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', handleResize);
}

async function logout() {
    const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include" // ⭐ 세션 쿠키 필수
    });

    if (res.ok) {
        location.href = "/login.html";
    } else {
        alert("로그아웃 실패");
    }
}

// Toggle Sidebar
function toggleSidebar() {
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('closed');
    } else {
        sidebar.classList.toggle('closed');
        mainContent.classList.toggle('expanded');
    }
}

// Select Department
function selectDepartment(dept) {
    if (!departments[dept]) return;
    currentDepartment = dept;

    // ⭐ active UI 처리
    departmentItems.forEach(item => {
        item.classList.remove("active");
        if (item.dataset.department === dept) {
            item.classList.add("active");
        }
    });

    loadDepartment(dept);
    loadRecentlyByDept(dept);
}

// Load Department Chat
function loadDepartment(dept) {
    const config = departments[dept];
    if (!config) return;

    // Update header
    departmentTitle.textContent = config.name;

    // Clear messages
    messagesContainer.innerHTML = '';

    // ✅ Recently 필터링
    // recentlyItems.forEach(recent => {
    //     const recentDept = recent.dataset.department;

    //     if (!recentDept || recentDept === dept) {
    //         recent.classList.remove('hidden');
    //     } else {
    //         recent.classList.add('hidden');
    //     }
    // });


    // Add bot info
    const botInfo = `
        <div class="bot-info">
            <img src="${config.botImg}" alt="${config.botName}" class="bot-avatar-large">
            <h2 class="bot-name">${config.botName}</h2>
        </div>
    `;

    const botInfoContainer = document.querySelector('.bot-info');
    if (botInfoContainer) {
        botInfoContainer.innerHTML = `
            <img src="${config.botImg}" alt="${config.botName}" class="bot-avatar-large">
            <h2 class="bot-name">${config.botName}</h2>
        `;
    }

    // Add initial message
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    messagesContainer.innerHTML = `
        <div class="message-date">Today, ${timeString}</div>
        <div class="message bot-message">
            <img src="${config.botImg}" alt="Bot" class="message-avatar">
            <div class="message-content">
                <span class="message-sender">${config.botName}</span>
                <div class="message-bubble">
                    ${config.greeting.replace(/\n/g, '<br>')}
                </div>
            </div>
        </div>
    `;

    // Add quick actions if available
    if (config.quickActions && config.quickActions.length > 0) {
        const quickActionsHtml = config.quickActions.map(action => 
            `<button class="quick-action-btn" data-action="${action.text}">
                <i class="fas ${action.icon}"></i>
                ${action.text}
            </button>`
        ).join('');

        const quickActionsMessage = `
            <div class="message bot-message">
                <img src="${config.botImg}" alt="Bot" class="message-avatar">
                <div class="message-content">
                    <span class="message-sender">${config.botName}</span>
                    <div class="quick-actions">
                        ${quickActionsHtml}
                    </div>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', quickActionsMessage);

        // Add click handlers to quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                sendQuickAction(action);
            });
        });
    }

    // Scroll to bottom
    scrollToBottom();
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const config = departments[currentDepartment];
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });

    // 사용자 메시지 출력
    const userMessage = `
        <div class="message user-message">
            <div class="message-content">
                <div class="message-bubble">
                    ${escapeHtml(text)}
                </div>
                <span class="message-status">Read ${timeString}</span>
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', userMessage);
    messageInput.value = '';
    scrollToBottom();

    // 2️⃣ typing 표시
    showTypingIndicator();
    scrollToBottom();

    // ✅ 올바른 payload
    const payload = {
        session_id: currentSessionId,
        user_id: currentUserId,
        department: currentDepartment,
        message: text
    };

    fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
    })
    .then(result => {
        // 4️⃣ typing 제거
        hideTypingIndicator();

        // ✅ n8n 응답 구조에 맞게 접근
        const botReply = result.reply ?? "응답이 없습니다.";
        const botMessage = `
            <div class="message bot-message">
                <img src="${config.botImg}"
                     alt="Bot"
                     class="message-avatar">
                <div class="message-content">
                    <span class="message-sender">${config.botName}</span>
                    <div class="message-bubble">
                        ${escapeHtml(botReply).replace(/\n/g, "<br>")}
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', botMessage);
        scrollToBottom();
    })
    .catch(err => {
        // console.error(err);
        // alert("메시지 전송에 실패했습니다.");
        console.error("Chat error:", err);

        // 4️⃣ typing 제거
        hideTypingIndicator();

        const errorMessage = `
            <div class="message bot-message">
                <img src="${config.botImg}"
                     alt="Bot"
                     class="message-avatar">
                <div class="message-content">
                    <span class="message-sender">${config.botName}</span>
                    <div class="message-bubble">
                        서버와 통신 중 오류가 발생했습니다.
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', errorMessage);
        scrollToBottom();
    });
}

// Send Quick Action
function sendQuickAction(action) {
    messageInput.value = action;
    sendMessage();
}

// Handle Search
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    departmentItems.forEach(item => {
        const name = item.querySelector('.department-name').textContent.toLowerCase();
        if (name.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Handle Window Resize
function handleResize() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('closed');
        mainContent.classList.remove('expanded');
    } else {
        sidebar.classList.add('closed');
    }
}

// Utility Functions
function scrollToBottom() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===============================
// Bot Typing Indicator
// ===============================

function showTypingIndicator() {
    const messages = document.getElementById('messages');

    // 이미 있으면 중복 생성 방지
    if (document.getElementById('typingIndicator')) return;

    const typing = document.createElement('div');
    typing.className = 'message bot-message';
    typing.id = 'typingIndicator';

    const botImg = departments[currentDepartment].botImg;
    const botName = departments[currentDepartment].botName;

    typing.innerHTML = `
        <img src="${botImg}"
             class="message-avatar" />
        <div class="message-content">
            <span class="message-sender">${botName}</span>
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        </div>
    `;

    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
}

function hideTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

let recentlyCache = []; // 🔥 전체 최근 질문 캐시

// async function loadRecently() {
//     const userId = sessionStorage.getItem("user_id");
//     if (!userId) return;

//     const res = await fetch(`/api/recent?user_id=${userId}&limit=5`);
//     const data = await res.json();
//     recentlyCache = data;
// }

async function loadRecentlyByDept(dept) {
    // const userId = sessionStorage.getItem("user_id");
    // if (!userId || !dept) return;
    if (!currentUserId || !dept) {
        console.warn("userId or dept missing", currentUserId, dept);
        return;
    }

    const res = await fetch(`/api/recent?user_id=${currentUserId}&department=${dept}&limit=5`);
    const data = await res.json();

    recentlyCache[dept] = data;
    renderRecently(dept);
}

function renderRecently(dept) {
    const list = document.getElementById("recently-list");
    list.innerHTML = "";

    const items = recentlyCache[dept] || [];

    items.forEach(item => {
        const li = document.createElement("li");
        li.className = "recently-item";

        const span = document.createElement("span");
        span.className = "recently-name";
        span.textContent = item.question;

        li.appendChild(span);

        li.addEventListener("click", () => {
            messageInput.value = item.question;
            sendMessage();
        });

        list.appendChild(li);
    });
}


// ===============================
// Markdown Renderer (safe)
// ===============================
function renderMarkdown(mdText) {
  // marked 옵션 (필요하면 커스터마이징)
  marked.setOptions({
    breaks: true, // 줄바꿈을 <br>로 반영
    gfm: true
  });

  const rawHtml = marked.parse(mdText ?? "");

  // XSS 방지: 허용할 태그/속성 기본 정책은 DOMPurify에 맡김
  const safeHtml = DOMPurify.sanitize(rawHtml);

  return safeHtml;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);

// 음성 녹음 기능
let mediaRecorder;
let audioChunks = [];
recordBtn.onclick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
            noiseSuppression: true,
            echoCancellation: true
        }
    });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = sendAudioToServer;

    mediaRecorder.start();

    recordBtn.classList.add("recording");
    recordStatus.innerText = "녹음 중...";

    setTimeout(() => {
        mediaRecorder.stop();
        recordBtn.classList.remove("recording");
        recordStatus.innerText = "변환 중...";
    }, 5000);
};

async function sendAudioToServer() {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("file", audioBlob, "voice.webm");

    const res = await fetch("/api/stt", {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    document.getElementById("messageInput").value = data.text;
    recordStatus.innerText = "입력 완료";
}
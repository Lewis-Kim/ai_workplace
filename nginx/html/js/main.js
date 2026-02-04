// Department Configuration
const departments = {
    'hr': {
        name: '인사',
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
        name: '영업',
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
        name: '마케팅',
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
        name: '문서검색',
        botName: '문서검색 어시스턴트',
        botAvatar: 'SangSangBot',
        greeting: '안녕하세요! 문서검색 어시스턴트입니다.   👋\n사내문서를 수집하여 답변드리고 있습니다. 무엇이 궁금하신가요?',
        quickActions: [
        ],
        botImg: '/img/sangsangbot.png'
    },
};

// ============================
// Global State
// ============================
let currentDepartment = 'sangsang';
let currentSessionId = null;
let currentUserId = null;
let recentlyCache = [];

// ============================
// Init
// ============================
$(document).ready(async function () {
    await loadSession();
    setupEventListeners();
    selectDepartment(currentDepartment);
    loadRecentlyByDept(currentDepartment);
});

// ============================
// Session
// ============================
async function loadSession() {
    try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!res.ok) throw new Error("Not logged in");

        const user = await res.json();
        // 👇 여기 중요: null 체크
        if (!user || !user.login_id) {
            window.location.href = "/login.html";
            return;
        }

        currentSessionId = `user:${user.login_id}`;
        currentUserId = user.login_id;
        $("body").show();
    } catch (err) {
        console.error("Session load failed:", err);
    }
}

// ============================
// Events
// ============================
function setupEventListeners() {

    $("#menuToggle, #closeSidebar").on("click", toggleSidebar);

    $(".department-item").on("click", function () {
        const dept = $(this).data("department");
        selectDepartment(dept);
    });

    $("#sendButton").on("click", sendMessage);

    $("#messageInput").on("keypress", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    $("#btnLogout").on("click", logout);

    $("#searchInput").on("input", handleSearch);

    $(window).on("resize", handleResize);

    $(document).on("click", function (e) {
        if ($(window).width() <= 768) {
            if (!$("#sidebar").has(e.target).length && !$("#menuToggle").is(e.target)) {
                $("#sidebar").addClass("closed");
            }
        }
    });
}

// ============================
// UI Control
// ============================
function toggleSidebar() {
    $("#sidebar").toggleClass("closed");
    $(".main-content").toggleClass("expanded");
}

function handleResize() {
    if ($(window).width() > 768) {
        $("#sidebar").removeClass("closed");
        $(".main-content").removeClass("expanded");
    }
}

// ============================
// Department
// ============================
function selectDepartment(dept) {
    if (!departments[dept]) return;
    currentDepartment = dept;

    $(".department-item").removeClass("active");
    $(`.department-item[data-department="${dept}"]`).addClass("active");

    loadDepartment(dept);
    loadRecentlyByDept(dept);
}

function updateBotInfo(config) {
    const botInfoHtml = `
        <img src="${config.botImg}" alt="${config.botName}" class="bot-avatar-large">
        <h2 class="bot-name">${config.botName}</h2>
    `;
    $(".bot-info").html(botInfoHtml);
}

function loadDepartment(dept) {
    const config = departments[dept];

    // 🔥 Bot Info 상단 변경
    updateBotInfo(config);

    $("#departmentTitle").text(config.name);
    $("#messages").empty();

    const time = new Date().toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' });

    $("#messages").append(`
        <div class="message-date">Today, ${time}</div>
        <div class="message bot-message">
            <img src="${config.botImg}" class="message-avatar">
            <div class="message-content">
                <span class="message-sender">${config.botName}</span>
                <div class="message-bubble">${config.greeting.replace(/\n/g, "<br>")}</div>
            </div>
        </div>
    `);

    renderQuickActions(config);
    scrollToBottom();
}

function renderQuickActions(config) {
    if (!config.quickActions.length) return;

    const html = config.quickActions.map(action => `
        <button class="quick-action-btn" data-action="${action.text}">
            <i class="fas ${action.icon}"></i>${action.text}
        </button>
    `).join("");

    $("#messages").append(`
        <div class="message bot-message">
            <img src="${config.botImg}" class="message-avatar">
            <div class="quick-actions">${html}</div>
        </div>
    `);

    $(".quick-action-btn").on("click", function () {
        sendQuickAction($(this).data("action"));
    });
}

// ============================
// Messaging
// ============================
function sendMessage() {
    const text = $("#messageInput").val().trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' });

    $("#messages").append(`
        <div class="message user-message">
            <div class="message-content">
                <div class="message-bubble">${escapeHtml(text)}</div>
                <span class="message-status">Read ${time}</span>
            </div>
        </div>
    `);

    $("#messageInput").val("");
    scrollToBottom();
    showTypingIndicator();

    fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            session_id: currentSessionId,
            user_id: currentUserId,
            department: currentDepartment,
            message: text
        })
    })
    .then(res => res.json())
    .then(result => {
        hideTypingIndicator();
        appendBotMessage(result.reply || "응답이 없습니다.");
    })
    .catch(() => {
        hideTypingIndicator();
        appendBotMessage("서버 오류가 발생했습니다.");
    });
}

function appendBotMessage(text) {
    const config = departments[currentDepartment];
    $("#messages").append(`
        <div class="message bot-message">
            <img src="${config.botImg}" class="message-avatar">
            <div class="message-content">
                <span class="message-sender">${config.botName}</span>
                <div class="message-bubble">${escapeHtml(text).replace(/\n/g, "<br>")}</div>
            </div>
        </div>
    `);
    scrollToBottom();
}

function sendQuickAction(action) {
    $("#messageInput").val(action);
    sendMessage();
}

// ============================
// Recently
// ============================
async function loadRecentlyByDept(dept) {
    if (!currentUserId) return;
    const res = await fetch(`/api/recent?user_id=${currentUserId}&department=${dept}&limit=5`);
    const data = await res.json();
    recentlyCache[dept] = data;
    renderRecently(dept);
}

function renderRecently(dept) {
    const list = $("#recently-list").empty();
    (recentlyCache[dept] || []).forEach(item => {
        const li = $(`<li class="recently-item"><span class="recently-name">${item.question}</span></li>`);
        li.on("click", () => {
            $("#messageInput").val(item.question);
            sendMessage();
        });
        list.append(li);
    });
}

// ============================
// Search
// ============================
function handleSearch() {
    const q = $("#searchInput").val().toLowerCase();
    $(".department-item").each(function () {
        const name = $(this).find(".department-name").text().toLowerCase();
        $(this).toggle(name.includes(q));
    });
}

// ============================
// Utils
// ============================
function scrollToBottom() {
    const chat = $("#chatContainer")[0];
    chat.scrollTop = chat.scrollHeight;
}

function escapeHtml(text) {
    return $("<div>").text(text).html();
}

// ============================
// Typing Indicator
// ============================
function showTypingIndicator() {
    if ($("#typingIndicator").length) return;

    const config = departments[currentDepartment];

    $("#messages").append(`
        <div id="typingIndicator" class="message bot-message">
            <img src="${config.botImg}" class="message-avatar">
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        </div>
    `);

    scrollToBottom();
}


function hideTypingIndicator() {
    $("#typingIndicator").remove();
}

// ============================
// Logout
// ============================
async function logout() {
    const res = await fetch("/api/logout", { method: "POST", credentials: "include" });
    if (res.ok) location.href = "/login.html";
    else alert("로그아웃 실패");
}

// ===============================
// PDF Upload (LangChain RAG)
// ===============================

$("#uploadBtn").on("click", function () {
    $("#pdfUpload").click();
});

$("#pdfUpload").on("change", function () {
    const file = this.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
        alert("PDF 파일만 업로드 가능합니다.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // 사용자에게 업로드 중 표시
    appendSystemMessage(`📄 ${file.name} 업로드 중...`);

    fetch("/api/upload/pdf", {
        method: "POST",
        body: formData
    })
    .then(res => {
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
    })
    .then(data => {
        appendSystemMessage(`✅ ${file.name} 업로드 완료 (${data.chunks} chunks)`);
    })
    .catch(err => {
        console.error(err);
        appendSystemMessage(`❌ ${file.name} 업로드 실패`);
    })
    .finally(() => {
        $("#pdfUpload").val(""); // 초기화
    });
});

function appendSystemMessage(text) {
    const msg = `
        <div class="message bot-message">
            <div class="message-content">
                <span class="message-sender">System</span>
                <div class="message-bubble">
                    ${text}
                </div>
            </div>
        </div>
    `;
    $("#messages").append(msg);
    scrollToBottom();
}
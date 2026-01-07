// Department Configuration
const departments = {
    'hr': {
        name: 'HR Team',
        botName: 'HR Assistant',
        botAvatar: 'HRBot',
        greeting: '안녕하세요! 👋저는 HR 팀의 챗봇입니다.   👋\n직원 관계, 복리후생 또는 인사 정책과 관련하여 어떻게 도와드릴까요?',
        quickActions: [
            { icon: 'fa-calendar', text: 'Leave Request' },
            { icon: 'fa-file-alt', text: 'View Policies' },
            { icon: 'fa-users', text: 'Team Directory' }
        ],
        botImg: 'http://localhost/img/hr_chatbot.png'
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
        botImg: 'http://localhost/img/finance_chatbot.png'
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
        botImg: 'http://localhost/img/legal_chatbot.png'
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
        botImg: 'http://localhost/img/development_chatbot.png'
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
        botImg: 'http://localhost/img/tech_chatbot.png'
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
        botImg: 'http://localhost/img/qa_chatbot.png'
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
        botImg: 'http://localhost/img/sales_chatbot.png'

    },
    'marketing': {
        name: 'Marketing Team',
        botName: 'Marketing Bot',
        botAvatar: 'MarketingBot',
        greeting: '안녕하세요! 마케팅 어시스턴트입니다. 📢\n캠페인, 콘텐츠 제작, 분석 및 마케팅 전략 수립을 도와드릴 수 있습니다.',
        quickActions: [
            { icon: 'fa-bullhorn', text: 'Campaign Status' },
            { icon: 'fa-chart-bar', text: 'Analytics' },
            { icon: 'fa-pen', text: 'Content Ideas' }
        ],
        botImg: 'http://localhost/img/marketing_chatbot.png'
    }
};

// Current state
let currentDepartment = 'it-support';

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

// Initialize
function init() {
    setupEventListeners();
    loadDepartment('it-support');
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

    // Update active state
    departmentItems.forEach(item => {
        item.classList.remove('active');
        const arrow = item.querySelector('.arrow-icon, .check-icon');
        if (arrow) {
            if (item.getAttribute('data-department') === dept) {
                item.classList.add('active');
                arrow.className = 'fas fa-check check-icon';
            } else {
                arrow.className = 'fas fa-chevron-right arrow-icon';
            }
        }
    });

    // Load department chat
    loadDepartment(dept);

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// Load Department Chat
function loadDepartment(dept) {
    const config = departments[dept];
    if (!config) return;

    // Update header
    departmentTitle.textContent = config.name;

    // Clear messages
    messagesContainer.innerHTML = '';

    // Add bot info
    const botInfo = `
        <div class="bot-info">
            <img src="${config.botImg}" alt="${config.botName}" class="bot-avatar-large">
            <h2 class="bot-name">${config.botName}</h2>
            <div class="bot-status">
                <span class="status-indicator"></span>
                <span class="status-text">Online • Typically replies instantly</span>
            </div>
        </div>
    `;

    const botInfoContainer = document.querySelector('.bot-info');
    if (botInfoContainer) {
        botInfoContainer.innerHTML = `
            <img src="${config.botImg}" alt="${config.botName}" class="bot-avatar-large">
            <h2 class="bot-name">${config.botName}</h2>
            <div class="bot-status">
                <span class="status-indicator"></span>
                <span class="status-text">Online • Typically replies instantly</span>
            </div>
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

    // ✅ 올바른 payload
    const payload = {
        message: text,
        sessionId: "itstudio:ck"
    };

    fetch("http://localhost:5678/webhook/chat", {
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
        console.error(err);
        alert("메시지 전송에 실패했습니다.");
    });
}

// Send Message
// function sendMessage() {
//     const text = messageInput.value.trim();
//     if (!text) return;

//     const config = departments[currentDepartment];
//     const now = new Date();
//     const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

//     // Add user message
//     const userMessage = `
//         <div class="message user-message">
//             <div class="message-content">
//                 <div class="message-bubble">
//                     ${escapeHtml(text)}
//                 </div>
//                 <span class="message-status">Read ${timeString}</span>
//             </div>
//         </div>
//     `;

//     messagesContainer.insertAdjacentHTML('beforeend', userMessage);
//     messageInput.value = '';
//     scrollToBottom();
//     const message = {"message" : text, "sessionid": "itstudio:ck"}

//     //Simulate bot response
//     setTimeout(() => {
//         const botResponse = generateBotResponse(text);
//         const botMessage = `
//             <div class="message bot-message">
//                 <img src="https://api.dicebear.com/7.x/bottts/svg?seed=${config.botAvatar}" alt="Bot" class="message-avatar">
//                 <div class="message-content">
//                     <span class="message-sender">${config.botName}</span>
//                     <div class="message-bubble">
//                         ${botResponse}
//                     </div>
//                 </div>
//             </div>
//         `;
//         messagesContainer.insertAdjacentHTML('beforeend', botMessage);
//         scrollToBottom();
//     }, 1000);
// }

// Send Quick Action
function sendQuickAction(action) {
    messageInput.value = action;
    sendMessage();
}

// Generate Bot Response
function generateBotResponse(userMessage) {
    const config = departments[currentDepartment];
    const responses = {
        'hr': [
            'I can help you with that! Let me pull up your HR information.',
            'I\'ll check our HR system and get back to you right away.',
            'That\'s a great question! Our HR policies state...'
        ],
        'finance': [
            'I\'m checking the financial records for you.',
            'Let me review your expense report right away.',
            'I can process that payment request for you!'
        ],
        'legal': [
            'I\'ll review the legal documentation for you.',
            'That requires a compliance check. Let me verify...',
            'I can help you with that contract review.'
        ],
        'development': [
            'Let me check the repository for you.',
            'I\'ll review the deployment logs right away.',
            'That code issue is in our tracking system. Let me investigate.'
        ],
        'it-support': [
            'I\'m diagnosing the issue for you right now.',
            'Let me check your system status...',
            'I can help you troubleshoot that technical issue!'
        ],
        'qa': [
            'I\'ll create a test case for that scenario.',
            'Let me check the bug tracking system...',
            'I can help you verify that functionality!'
        ],
        'sales': [
            'Let me check the CRM system for that lead.',
            'I\'ll pull up the sales pipeline for you.',
            'Great opportunity! Let me update the deal status.'
        ],
        'marketing': [
            'I\'ll analyze the campaign metrics for you.',
            'Let me check our content calendar...',
            'That\'s a great marketing idea! I\'ll make a note of it.'
        ]
    };

    const deptResponses = responses[currentDepartment] || ['I\'m here to help!'];
    const randomResponse = deptResponses[Math.floor(Math.random() * deptResponses.length)];
    
    return randomResponse;
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

// Initialize on load
document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', () => {
    const chatItems = document.querySelectorAll('.chat-item');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory')) || {};

    function displayMessage(message, sender = 'Doron') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <img src="images/doronprofilepicture.png" alt="Profile Picture">
            <div class="message-text">${message}</div>
        `;
        chatMessages.appendChild(messageElement);
    }

    function loadMessages(chatName) {
        chatMessages.innerHTML = chatHistory[chatName] || '';
    }

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            displayMessage(messageText);
            const activeItem = document.querySelector('.chat-item.active');
            if (activeItem) {
                const activeName = activeItem.querySelector('span').textContent;
                if (!chatHistory[activeName]) {
                    chatHistory[activeName] = '';
                }
                chatHistory[activeName] += chatMessages.innerHTML;
                sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            }
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function loadChatHistory() {
        const activeItem = document.querySelector('.chat-item.active');
        if (activeItem) {
            const activeName = activeItem.querySelector('span').textContent;
            loadMessages(activeName);
        }
    }

    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            const chatName = item.querySelector('span').textContent;
            const activeItem = document.querySelector('.chat-item.active');
            if (activeItem) {
                const activeName = activeItem.querySelector('span').textContent;
                chatHistory[activeName] = chatMessages.innerHTML;
            }
            loadMessages(chatName);
            document.querySelector('.chat-item.active')?.classList.remove('active');
            item.classList.add('active');
            sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        });
    });

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    loadChatHistory();
});


const ws = new WebSocket('ws://localhost:8080');

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Функция для добавления сообщения в чат
function addMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(type);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Автопрокрутка вниз
}

// Обработка подключения WebSocket
ws.onopen = () => {
    console.log("Connected to the WebSocket server.");
};

// Обработка сообщений от сервера
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    addMessage(data.message, data.type);
};

// Обработка ошибок WebSocket
ws.onerror = (error) => {
    console.error("WebSocket error:", error);
};

// Обработка закрытия WebSocket
ws.onclose = () => {
    console.log("Disconnected from the WebSocket server.");
};

// Отправка сообщения на сервер
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        ws.send(JSON.stringify({ text: message }));
        messageInput.value = '';
    }
}

// Отправка сообщения по кнопке и при нажатии Enter
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

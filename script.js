const ws = new WebSocket('ws://localhost:8080');

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Функция для добавления сообщения в чат
function addMessage(message, type) {
    const messageElement = document.createElement('div');

    // Получаем текущее время
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `[${hours}:${minutes}:${seconds}]`;

    // Форматируем сообщение с временем
    messageElement.innerHTML = `<p>${timeString} ${message}</p>`;
    messageElement.classList.add(type);

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Автопрокрутка вниз
}


// Обработка подключения WebSocket
ws.onopen = () => {
    console.log("Connected to the WebSocket server.");
    notify("success", "Welcome to the Chat!")
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


async function notify(status, text) {

    let icon;
    if (status === "success") icon = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style>.cls-1{fill:none;stroke:#1eff00;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style> </defs> <title></title> <g id="checkmark"> <line class="cls-1" x1="3" x2="12" y1="16" y2="25"></line> <line class="cls-1" x1="12" x2="29" y1="25" y2="7"></line> </g> </g></svg>`
    else if (status === "load") icon = `<svg fill="#8c8c8c" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 367.136 367.136" xml:space="preserve" stroke="#8c8c8c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M336.954,87.494C318.821,59.1,293.251,36.318,263.01,21.613l-13.119,26.979c52.77,25.661,85.551,78.029,85.551,136.669 c0,83.744-68.131,151.874-151.874,151.874S31.694,269.005,31.694,185.262c0-49.847,24.899-96.439,65.042-124.571L149.7,113.91V0 H36.335l38.953,39.14C57.727,52.164,42.557,68.287,30.582,86.871c-18.898,29.33-28.888,63.352-28.888,98.391 c0,100.286,81.588,181.874,181.874,181.874s181.874-81.588,181.874-181.874C365.442,150.485,355.59,116.678,336.954,87.494z"></path> </g></svg>`
    else icon = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2.32129 2.32363C2.72582 1.9191 3.38168 1.9191 3.78621 2.32363L25.6966 24.234C26.1011 24.6385 26.1011 25.2944 25.6966 25.6989C25.2921 26.1035 24.6362 26.1035 24.2317 25.6989L2.32129 3.78854C1.91676 3.38402 1.91676 2.72815 2.32129 2.32363Z" fill="#ff0000"></path><path d="M25.6787 2.30339C25.2742 1.89887 24.6183 1.89887 24.2138 2.30339L2.30339 24.2138C1.89887 24.6183 1.89887 25.2742 2.30339 25.6787C2.70792 26.0832 3.36379 26.0832 3.76831 25.6787L25.6787 3.76831C26.0832 3.36379 26.0832 2.70792 25.6787 2.30339Z" fill="#ff0000"></path></g></svg>`
    const notify_cont = document.getElementById("notification_container");

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
        ${icon}
        <p>${text}</p>
    `;

    notify_cont.prepend(notification);
    setTimeout(() => {
        notification.classList.add("hide");
        notification.addEventListener("animationend", () => {
            notify_cont.removeChild(notification);
        });
    }, 5000);
}
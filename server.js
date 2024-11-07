const WebSocket = require('ws');

const PORT = 8080;
const server = new WebSocket.Server({ port: PORT });

const clients = new Set();

server.on('connection', (ws) => {
    clients.add(ws);
    console.log("New client connected.");

    ws.on('message', (data) => {
        const message = JSON.parse(data);
        console.log("Received message:", message);

        // Пересылаем сообщение всем подключенным клиентам
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'user', message: message.text }));
            }
        });
    });

    // Обработка отключения клиента
    ws.on('close', () => {
        clients.delete(ws);
        console.log("Client disconnected.");
    });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let timeLeft = 60; // Thời gian đếm ngược
let currentSession = 1001; // Mã phiên hiện tại

// Hàm chạy ngầm để quản lý phiên
setInterval(() => {
    timeLeft--;

    if (timeLeft < 0) {
        // Xử lý khi hết thời gian: Random xí ngầu và sang phiên mới
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;const dice3 = Math.floor(Math.random() * 6) + 1;
        
        io.emit('session-result', {
            session: currentSession,
            dices: [dice1, dice2, dice3],
            total: dice1 + dice2 + dice3
        });

        currentSession++;
        timeLeft = 60; // Reset thời gian
    }

    // Gửi thời gian thực cho tất cả người chơi
    io.emit('timer-update', {
        timeLeft: timeLeft,
        session: currentSession
    });
}, 1000);

server.listen(3000, () => {
    console.log('Server Tài Xỉu đang chạy tại port 3000');
});

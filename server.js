const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  // Handle Socket.io connections
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('user-connected', userId);

      socket.on('disconnect', () => {
        socket.broadcast.to(roomId).emit('user-disconnected', userId);
      });
    });

    socket.on('send-message', (message, roomId) => {
      io.to(roomId).emit('receive-message', message);
    });

    socket.on('share-screen', (data, roomId) => {
      socket.broadcast.to(roomId).emit('screen-shared', data);
    });
  });

  // Default Next.js request handling
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server on port 3000
  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

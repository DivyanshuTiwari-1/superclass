const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

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

    // Join room and emit user connection
    socket.on('join-room', async (userId) => {
      try {
        // Fetch room ID from the API
        const response = await axios.post('http://localhost:3000/api/liveclass', { title: 'Class Title' });
        const roomId = response.data.roomId;

        // Join the room
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);

        // Handle user disconnection
        socket.on('disconnect', () => {
          socket.broadcast.to(roomId).emit('user-disconnected', userId);
        });

        // Handle message sending
        socket.on('send-message', (message) => {
          io.to(roomId).emit('receive-message', message);
        });

        // Handle screen sharing
        socket.on('share-screen', (data) => {
          socket.broadcast.to(roomId).emit('screen-shared', data);
        });
      } catch (error) {
        console.error('Error fetching room ID:', error);
      }
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

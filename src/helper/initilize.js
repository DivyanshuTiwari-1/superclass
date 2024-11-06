// src/utils/initializeSocket.js

import { Server } from 'socket.io';

let io;
let serverStarted = false;

export default function initializeSocket(server) {
  if (!serverStarted) {
    io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      socket.on('start-class', ({ roomId }) => {
        socket.join(roomId);
        console.log(`Class started with room ID: ${roomId}`);
      });

      socket.on('teacher-stream', ({ roomId, stream }) => {
        socket.to(roomId).emit('receive-stream', stream);
      });

      socket.on('share-screen', ({ roomId, stream }) => {
        socket.to(roomId).emit('receive-screen', stream);
      });

      socket.on('end-class', ({ roomId }) => {
        socket.to(roomId).emit('class-ended');
        console.log(`Class ended: ${roomId}`);
      });

      socket.on('toggle-chat', ({ roomId, isChatDisabled }) => {
        socket.to(roomId).emit('chat-status-changed', isChatDisabled);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    serverStarted = true;
    console.log('Socket.IO server running');
  }
  return io;
}

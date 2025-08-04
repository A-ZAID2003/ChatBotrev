const { Server } = require('socket.io');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('userMessage', (message) => {
      console.log('User:', message);

      const botReply = `Bot says: ${message.split('').reverse().join('')}`;

      socket.emit('botReply', botReply);

      // Optional: Save to MongoDB using REST call or Mongoose directly here
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupSocket;

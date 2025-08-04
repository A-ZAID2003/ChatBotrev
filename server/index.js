const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const chatRoutes = require('./routes/chatRoutes');
const setupSocket = require('./socket');

dotenv.config();
const app = express();
const server = http.createServer(app);
setupSocket(server);   //socket.IO logic

app.use(cors());
app.use(express.json());
connectDB();

//Routes
app.use('', chatRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
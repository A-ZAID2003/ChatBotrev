const Chat = require('../models/chat');

const saveChat = async (req, res) => {
    try {
        const { userMessage, botReply } = req.body;
        const newChat = new Chat({userMessage, botReply});
        await newChat.save;
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: 'failed to save chat' });
    }
};

const getChats = async (req, res) => {
    try{
        const chats = await Chat.find().sort({ timestamp: -1});
        res.json(chats);
    } catch (error) {
        res.status(500).json({error: 'failed to get chat history'});
    }
};

module.exports = { saveChat, getChats };

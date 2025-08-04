const express = require('express');
const router = express.Router();
const { saveChat, getChats } = require('../controllers/chatController');

router.post('/', saveChat);
router.get('/', getChats);

module.exports = router;

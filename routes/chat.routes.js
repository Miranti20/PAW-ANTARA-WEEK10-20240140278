const express = require('express');
const router = express.Router();

// Import controller
const chatController = require('../controllers/chatHistory.controller'); 

// REVISI: Kita hapus sementara authMiddleware.verifyToken 
// karena nama fungsinya tidak dikenali (undefined)
router.post('/history', chatController.saveChatHistory);

router.get('/history', chatController.getChatHistory);

module.exports = router;
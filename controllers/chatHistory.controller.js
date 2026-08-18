// File: controllers/chatHistory.controller.js

// Ambil koneksi sequelize dari folder config/database.js
const sequelize = require('../config/database'); 
const { DataTypes } = require('sequelize');

// Import model dan langsung inisialisasi dengan sequelize & DataTypes
const ChatHistoryModel = require('../models/ChatHistory');
const ChatHistory = ChatHistoryModel(sequelize, DataTypes);

// CREATE: Menyimpan riwayat chat ke database
exports.saveChatHistory = async (req, res) => {
  try {
    const { prompt, response, userId } = req.body;

    const newChat = await ChatHistory.create({
      prompt: prompt,
      response: response,
      userId: req.user ? req.user.id : userId
    });

    res.status(201).json({
      message: 'Riwayat chat berhasil disimpan!',
      data: newChat
    });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat menyimpan chat',
      error: error.message
    });
  }
};

// READ: Mengambil riwayat chat dari database
exports.getChatHistory = async (req, res) => {
  try {
    const history = await ChatHistory.findAll({
      where: { userId: req.user ? req.user.id : req.query.userId },
      order: [['createdAt', 'DESC']] 
    });

    res.status(200).json({
      message: 'Riwayat chat berhasil diambil',
      data: history
    });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil chat',
      error: error.message
    });
  }
};
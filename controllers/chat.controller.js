// Import model yang tadi dibuat, sesuaikan path-nya
const ChatHistory = require('../models/ChatHistory'); 

// CREATE: Menyimpan riwayat chat
exports.saveChatHistory = async (req, res) => {
  try {
    const { prompt, response, userId } = req.body; // Sesuaikan dengan payload dari frontend

    const newChat = await ChatHistory.create({
      prompt,
      response,
      userId: req.user.id || userId // Pastikan middleware auth mengisi req.user
    });

    res.status(201).json({
      message: 'Riwayat chat berhasil disimpan!',
      data: newChat
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

// READ: Mengambil riwayat chat
exports.getChatHistory = async (req, res) => {
  try {
    // Ambil semua riwayat user, urutkan dari yang terbaru
    const history = await ChatHistory.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      message: 'Riwayat chat berhasil diambil',
      data: history
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};
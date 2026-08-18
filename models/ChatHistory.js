module.exports = (sequelize, DataTypes) => {
  const ChatHistory = sequelize.define('ChatHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'chat_histories',
    timestamps: true
  });

  return ChatHistory;
};
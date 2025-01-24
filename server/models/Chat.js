import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: () => `New Chat - ${new Date().toLocaleDateString()}`,
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'model'],
      required: true,
    },
    parts: [{
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
  }],
}, {
  timestamps: true,
  versionKey: false,
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);
export default Chat;
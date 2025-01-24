import { Chat, UserChats } from "../models/index.js";

export const createChat = async (req, res) => {
  try {
    const { userId, title, initialMessage } = req.body;

    // Create new chat
    const newChat = new Chat({
      userId,
      title: title || undefined,
      messages: [
        {
          role: "user",
          parts: [{ text: initialMessage }],
        },
      ],
    });

    const savedChat = await newChat.save();

    // Update user's chat sessions
    await UserChats.findOneAndUpdate(
      { userId },
      {
        $push: { chatSessions: savedChat._id },
        $inc: { totalChats: 1 },
      },
      { upsert: true, new: true }
    );

    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ message: "Error creating chat", error });
  }
};

export const addMessageToChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { role, text } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: { role, parts: [{ text }] } } },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: "Error adding message", error });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const userChats = await UserChats.findOne({ userId }).populate({
      path: "chatSessions",
      select: "title messages createdAt",
      options: { sort: { createdAt: -1 } },
    });

    if (!userChats) {
      return res.status(404).json({ message: "No chats found for user" });
    }

    res.json(userChats.chatSessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user chats", error });
  }
};

export const getChatDetails = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat details", error });
  }
};

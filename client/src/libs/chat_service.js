import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

const chatService = {
  createChat: async (userId, initialMessage) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chats`, {
        title: initialMessage.substring(0, 15),
        userId,
        initialMessage,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  },

  addMessageToChat: async (chatId, message) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/chats/${chatId}/messages`,
        message
      );
      return response.data;
    } catch (error) {
      console.error("Error adding message:", error);
      throw error;
    }
  },

  getUserChats: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/chats`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
  },

  getChatDetails: async (chatId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chats/${chatId}`);
      return {
        ...response.data,
        messages: response.data.messages || [],
      };
    } catch (error) {
      console.error(
        "Error fetching chat details:",
        error.response?.data || error.message
      );
      throw new Error("Failed to load chat");
    }
  },
};

export default chatService;

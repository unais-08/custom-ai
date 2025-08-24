import express from "express";

import {
  createChat,
  addMessageToChat,
  getUserChats,
  getChatDetails,
} from "../controllers/app.controller.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.send(
    `<h2 style="text-align:center;padding:1rem">server is listening</h2>`
  );
});
// Create a new chat session
router.post("/chats", createChat);

// Add message to existing chat
router.post("/chats/:chatId/messages", addMessageToChat);

// Get all chats for a user
router.get("/users/:userId/chats", getUserChats);

// Get specific chat details
router.get("/chats/:chatId", getChatDetails);

export default router;

// router.get("/chats", requireAuth(),getChatSession); refernce for using auth by clerk

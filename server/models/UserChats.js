import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    chatSessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    totalChats: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserChats =
  mongoose.models.UserChats || mongoose.model("UserChats", userChatsSchema);
export default UserChats;

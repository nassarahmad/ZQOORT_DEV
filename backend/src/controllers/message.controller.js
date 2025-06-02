import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    // Validate required fields
    if (!text && !image) {
      return res.status(400).json({ error: "Message content or image is required" });
    }
    if (!receiverId) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    let imageUrl;
    if (image) {
       try {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image, {
            // timeout: 120000, // 120 seconds (2 minutes) timeout
             resource_type: "auto" // handles both images and videos
});
        imageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    const newMessage = new Message({
       senderId,
      receiverId,
      text: text || null, // Handle case where only image is sent
      image: imageUrl || null,
    });

    const savedMessage = await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", savedMessage);
    }

     res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Detailed sendMessage error:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
      params: req.params,
      user: req.user
    });
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message || "Unknown error occurred" 
    });
  }
};

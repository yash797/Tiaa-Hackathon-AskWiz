import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
{
    _id: ObjectId, 
    text: String, 
    author: {
      _id: ObjectId, 
      name: String,
      picturePath: String, 
    },
    timestamp: Date, 
  }
  
);

const Message = mongoose.model("messgae", MessageSchema);

export default Message;
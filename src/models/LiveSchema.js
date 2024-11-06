// src/models/LiveClass.js
import mongoose from 'mongoose';

const liveClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  isLive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.LiveClass || mongoose.model('LiveClass', liveClassSchema);

import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorEmail: String, // Track which user owns this post
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);

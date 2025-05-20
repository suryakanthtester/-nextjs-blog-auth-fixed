import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);

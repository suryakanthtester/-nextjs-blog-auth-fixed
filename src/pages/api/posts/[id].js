import connectMongo from '@/lib/mongodb';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  await connectMongo();
  const { id } = req.query;

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    switch (req.method) {
      case 'GET':
        // ✅ Any logged-in user can view the post
        return res.status(200).json(post);

      case 'PUT':
        // ✅ Only the post owner can update
        if (post.userId.toString() !== session.user.id) {
          return res.status(403).json({ message: 'Forbidden: Not your post' });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatedPost);

      case 'DELETE':
        // ✅ Only the post owner can delete
        if (post.userId.toString() !== session.user.id) {
          return res.status(403).json({ message: 'Forbidden: Not your post' });
        }

        await Post.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Post deleted' });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

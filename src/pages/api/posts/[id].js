import connectMongo from '@/lib/mongodb';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await connectMongo();

  // GET: Anyone logged in can view a post
  if (req.method === 'GET') {
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch post' });
    }
  }

  // PUT: Only the post owner can update
  else if (req.method === 'PUT') {
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });

      if (post.userId.toString() !== session.user.id) {
        return res.status(403).json({ message: 'Forbidden: Not your post' });
      }

      const updated = await Post.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Failed to update post' });
    }
  }

  // DELETE: Only the post owner can delete
  else if (req.method === 'DELETE') {
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });

      if (post.userId.toString() !== session.user.id) {
        return res.status(403).json({ message: 'Forbidden: Not your post' });
      }

      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete post' });
    }
  }

  // Other methods not allowed
  else {
    res.status(405).end();
  }
}

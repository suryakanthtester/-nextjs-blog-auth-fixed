import connectMongo from '@/lib/mongodb';
import Post from '@/models/Post';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  await connectMongo();

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      // ✅ Return ALL posts (no user filter)
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch posts' });
    }
  }

  else if (req.method === 'POST') {
    try {
      const { title, content } = req.body;

      const post = await Post.create({
        title,
        content,
        userId: session.user.id, // ✅ Attach the user's ID
      });

      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create post' });
    }
  }

  else {
    res.status(405).end();
  }
}

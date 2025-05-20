import connectMongo from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === 'GET') {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } else {
    res.status(405).end();
  }
}

import connectMongo from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function handler(req, res) {
  const { id } = req.query;
  await connectMongo();

  if (req.method === 'GET') {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } else if (req.method === 'PUT') {
    const updated = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } else if (req.method === 'DELETE') {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Deleted' });
  } else {
    res.status(405).end();
  }
}
    
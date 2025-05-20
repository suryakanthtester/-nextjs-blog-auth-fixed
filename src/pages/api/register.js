import dbConnect from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });

  await newUser.save();
  res.status(201).json({ message: 'User created successfully' });
}

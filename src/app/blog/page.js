'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError('Unexpected response from server');
          setPosts([]); // prevent crash
        }
      })
      .catch((err) => {
        setError('Failed to load posts');
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <Link href="/create">+ New Post</Link>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

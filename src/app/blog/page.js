'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogList() {
  const [posts, setPosts] = useState([]); //

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <Link href="/create">+ New Post</Link>
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

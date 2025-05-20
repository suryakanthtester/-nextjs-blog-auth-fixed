'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/blog.module.css';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts([]);
        }
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Posts</h1>
       <Link href="/create" className={styles.newPostLink}>
           + New Post
        </Link>
      </div>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post._id} className={styles.postItem}>
            <Link href={`/blog/${post._id}`}>
              <a className={styles.postLink}>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '@/styles/form.module.css'; // Reuse the same form styles

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then(setPost);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title && !post.content) {
      alert('Please enter the title and content');
      return;
    } else if (!post.title) {
      alert('Please enter the title');
      return;
    } else if (!post.content) {
      alert('Please enter the content');
      return;
    }
    
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    router.push('/blog');
  };

  return (
    
    <div className={styles.container}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => router.push('/blog')}
      >
        ← Back
      </button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>Edit Post</h1>
        <input
          className={styles.input}
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Post Title"
        />
        <textarea
          className={styles.textarea}
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          placeholder="Post Content"
        />
        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

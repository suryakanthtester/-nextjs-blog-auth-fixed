'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/form.module.css'; // Import CSS module

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!title && !content) {
      alert('Please enter the title and content');
      return;
    } else if (!title) {
      alert('Please enter the title');
      return;
    } else if (!content) {
      alert('Please enter the content');
      return;
    }
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    router.push('/blog');
  };

  return (
    <div className={styles.container}>
      {/* Back button in top-left corner */}
      <button
        type="button"
        className={styles.backButton}
        onClick={() => router.push('/blog')}
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>Create New Post</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />
        <br />
        <button type="submit" className={styles.button}>Create</button>
      </form>
    </div>
  );
}

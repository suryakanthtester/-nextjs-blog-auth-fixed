'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/styles/blog.module.css";
import styles1 from '@/styles/form.module.css';

export default function PostDetail() {
  const { id } = useParams(); // Get dynamic route param like /blog/abc123
  const router = useRouter(); // Used to redirect after deletion or go to edit page
  const [post, setPost] = useState(null); // Holds post data fetched from API

  // Fetch post data when component mounts or `id` changes
  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  // Delete the current post
  const deletePost = async () => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.push("/blog"); // Go back to post list after deletion
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles1.backButton}
        onClick={() => router.push('/blog')}
      >
        ← Back
      </button>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.content}>{post.content}</p>
      <div className={styles.buttonGroup}>
        <button className={styles.editButton} onClick={() => router.push(`/edit/${post._id}`)}>Edit</button>
        <button className={styles.deleteButton} onClick={deletePost}>Delete</button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/auth.module.css';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Signup successful! Please login.');
        router.push('/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit">Sign Up</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

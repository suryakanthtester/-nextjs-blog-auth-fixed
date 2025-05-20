import '../styles/globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Next.js Blog',
  description: 'Simple blog using App Router and CSS Modules',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ padding: '20px' }}>{children}</main>
      </body>
    </html>
  );
}

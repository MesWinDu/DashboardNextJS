import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`${inter.className} flex justify-center`}>
          {children}

        </body>

      </html>
  );
}

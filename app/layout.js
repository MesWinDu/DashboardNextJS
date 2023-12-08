import { Inter } from 'next/font/google';
import './globals.css';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`${inter.className} flex justify-center`}>
          <Image src='/Icon.png' width= {1000} height={1000} alt='Logo' className='top-0 left-0 w-80 h-80 fixed z-50' />
          {children}

        </body>

      </html>
  );
}

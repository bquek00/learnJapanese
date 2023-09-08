import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Learn Japanese',
  description: 'Learn Japanese vocab',
  icons: {
    icon: '/images/japan.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
      {children}</body>
    </html>
  )
}

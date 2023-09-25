import './globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/context/NavContext'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Learn Japanese',
  description: 'Learn Japanese vocab',
  icons: {
    icon: '/images/japan.png',
  },
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider session={session}>{children}</AppProvider>
    </body>
    </html>
  )
}

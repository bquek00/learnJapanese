import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountForm from './account-form'
import BigCard from '@/components/BigCard'
import NavBar from "@/components/NavBar"

export default async function Account() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <NavBar />
      <BigCard><AccountForm session={session} /></BigCard>
    </div>
  )
}
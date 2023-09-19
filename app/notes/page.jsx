import BigCard from "@/components/BigCard"
import NavBar from "@/components/NavBar"
import Notes from "./notesForm";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Home() {

    const supabase = createServerComponentClient({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    const { data, err } = await supabase.from('notes').select().eq('uid', session?.user?.id);
  
    return (
        <div>
        <NavBar />
        <BigCard>
            <Notes session = {session} data={data}/>
        </BigCard>
        </div>
    )
}
'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Box from './box'
import { AppContext } from '@/context/NavContext';
import { createContext, useContext} from 'react';

export default function AccountForm({ session }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      let { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  const { activeLink, setActiveLink } = useContext(AppContext);
  useEffect(() => {
    setActiveLink("account");
  }, []);

  return (
    <div className='bg-fixed h-full w-full bg-black/[.6] flex justify-center items-center'>
      <div>
        <p className='text-white text-base lg:text-5xl font-bold text-center lg:mt-0'>Welcome {session?.user.email}</p>
        <p className='text-white text-2xl lg:text-7xl font-bold text-center lg:mt-8'>Learn Japanese with 3 easy steps</p>
        <div className='flex flex-col lg:flex-row justify-center mt-8 items-center'>
          <Box title="Learn" description="Search Japanese words via Kanji, Hiragana, Katakana, or English"
          link="/learn"/>
          <Box title="Review" description="Review and handle your saved notes"
          link="/notes"/>
          <Box title="Test" description="Test your knowledge" link="/test"/>
        </div>
      </div>
    </div>
  )
}

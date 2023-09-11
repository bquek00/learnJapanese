"use client";
import Register from './register-form'
import Navbar from '@/components/NavBar'
import { useEffect } from 'react';
import { AppContext } from '@/context/NavContext';
import { createContext, useContext} from 'react';

export default function Home() {
  const { activeLink, setActiveLink } = useContext(AppContext);
  useEffect(() => {
    setActiveLink("account");
  }, []);

    return (
      <div>
      <Navbar />
      <div className="h-screen bg-center bg-cover bg-[url('/images/fuji.jpeg')]">
        <Register/>
      </div>
      </div>
    )
  }
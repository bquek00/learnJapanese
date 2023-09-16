"use client";
import Learn from "./learnForm"
import BigCard from "@/components/BigCard"
import NavBar from "@/components/NavBar"
import { AppContext } from '@/context/NavContext';
import { createContext, useContext} from 'react';
import { useEffect } from 'react';

export default function Home() {

  const { activeLink, setActiveLink } = useContext(AppContext);
  useEffect(() => {
    setActiveLink("learn");
  }, []);

    return (
      <div>
        <NavBar />
        <BigCard>
          <Learn></Learn>
        </BigCard>
      </div>
    )
  }
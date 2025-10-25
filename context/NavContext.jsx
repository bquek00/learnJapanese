
"use client";
import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children, session }) {
  const [activeLink, setActiveLink] = useState("");
  const [user, setUser] = useState(session?.user ?? null);

  useEffect(() => {
    setUser(session?.user ?? null);
  }, [session]);

  return (
    <AppContext.Provider value={{ activeLink, setActiveLink, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

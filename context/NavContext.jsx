
"use client";
import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children, session }) {
  const [activeLink, setActiveLink] = useState("");
  const [user, setUser] = useState(session); 

  return (
    <AppContext.Provider value={{ activeLink, setActiveLink, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

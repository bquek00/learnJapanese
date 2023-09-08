
"use client";
import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeLink, setActiveLink] = useState("home");

  return (
    <AppContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </AppContext.Provider>
  );
}

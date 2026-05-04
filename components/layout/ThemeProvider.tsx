'use client';

import { createContext, useContext, useEffect } from 'react';

interface ThemeContextValue {
  theme: 'light';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Always force light mode; clear any stored preference
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.removeItem('d3-theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

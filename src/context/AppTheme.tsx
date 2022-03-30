import React, { createContext, ReactNode, useContext, useState } from "react";

type ThemeContextType = {
  darkMode?: boolean;
  setDarkMode?: (darkMode: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({});

type AppContextType = {
  children?: ReactNode;
};

const AppTheme = ({ children }: AppContextType) => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default AppTheme;

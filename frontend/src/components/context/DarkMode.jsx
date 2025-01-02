import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true"; // Convert string to boolean
  });

  // Save to localStorage when `isDarkMode` changes
  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}>
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};

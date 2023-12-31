import React, { useState, useEffect } from "react";
const DarkThemeContext = React.createContext();

const mainColors = [
  { bg: "#fff", txt: "#000" },
  { bg: "#000", txt: "#fff" }
];

const DartThemeProvider = ({ children }) => {

    
  const [turnOn, setTurnOn] = useState(false);
  const [mainColor, setMainColor] = useState(mainColors[0]);

  useEffect(() => {
    const color = turnOn ? mainColors[0] : mainColors[1];
    setMainColor(color);
  }, [turnOn]);

  return (
    <DarkThemeContext.Provider
      value={{ turnOn, setTurnOn, mainColor, setMainColor }}
    >
      {children}
    </DarkThemeContext.Provider>
  );
};

export { DarkThemeContext, DartThemeProvider };

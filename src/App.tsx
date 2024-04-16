import React, { useState } from "react";
import { Header } from "./Component/Header";
import { Cards } from "./Component/Card";
import { Navbar } from "./Component/Navbar";
import "./App.css";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <Header handleToggleMode={handleToggleMode} darkMode={darkMode} />
      <Navbar />
      <Cards />
    </div>
  );
};

export default App;

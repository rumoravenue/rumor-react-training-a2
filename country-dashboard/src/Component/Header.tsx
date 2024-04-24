import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

interface HeaderProps {
  handleToggleMode: () => void;
  darkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ handleToggleMode, darkMode }) => {
  return (
    <div className="header-container">
      <div className="title">Countries</div>
      <div className="toggle-mode" onClick={handleToggleMode}>
        {darkMode ? (
          <FaSun className="icon" style={{ color: "#fff" }} />
        ) : (
          <FaMoon className="icon" style={{ color: "#000" }} />
        )}
      </div>
    </div>
  );
};

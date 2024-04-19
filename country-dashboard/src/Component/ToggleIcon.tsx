import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ToggleIcon: React.FC<{
  isDarkMode: boolean;
  toggleColorMode: () => void;
}> = ({ isDarkMode, toggleColorMode }) => (
  <>
    {isDarkMode ? (
      <FaSun
        style={{ cursor: "pointer", marginLeft: "0.5rem" }}
        onClick={toggleColorMode}
      />
    ) : (
      <FaMoon
        style={{ cursor: "pointer", marginLeft: "0.5rem" }}
        onClick={toggleColorMode}
      />
    )}
  </>
);


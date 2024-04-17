import React from "react";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <Box position="relative">
      <Heading as="h1" size="xl" ml="7%" mt="3%">
        Countries
      </Heading>
      <Box
        position="absolute"
        top="50%"
        right="7%"
        transform="translateY(-50%)"
      >
        <IconWithToggle
          isDarkMode={isDarkMode}
          toggleColorMode={toggleColorMode}
        />
      </Box>
    </Box>
  );
};

const IconWithToggle: React.FC<{
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

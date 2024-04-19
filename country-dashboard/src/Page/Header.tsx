import React from "react";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import { ToggleIcon } from "../Component/ToggleIcon";

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
        <ToggleIcon
          isDarkMode={isDarkMode}
          toggleColorMode={toggleColorMode}
        />
      </Box>
    </Box>
  );
};


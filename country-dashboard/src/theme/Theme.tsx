import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#ffe6e6",
    
    },
    dark: {
      50: "#1a202c",
      
    },
  },
});

export default theme;

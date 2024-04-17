import React from "react";
import { Box, Center } from "@chakra-ui/react";
import countries from "./data/countries.json";
import Header from "./Components/Header";
import Card from "./Components/Card";

export const App = () => {
  const countryBool = !countries || countries.length === 0;
  const cardui = countries.map((item, index) => {
    return (
      <Card
        key={index}
        imgurl={item.flags.png}
        countryname={item.name.common}
        population={item.population}
        region={item.region}
        capital={item.capital}
        currency={item.cca3}
      />
    );
  });

  return (
    <Box px="8rem" width="100" pt='3rem'>
      <Header />
      <Box
        className="main-Content"
        display="flex"
        flexWrap={"wrap"}
        rowGap={5}
        columnGap={4}
        mt="4rem"
        justifyContent="space-between"
      >
        {countryBool ? <h1>Nothing Found</h1> : cardui}
      </Box>
    </Box>
  );
};

export default App;


import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Image,
  Flex,
  Text,
  Heading,
  useColorMode,
  Divider,
} from "@chakra-ui/react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleIcon } from "./Component/ToggleIcon";

interface CountryPageProps {}

interface Currency {
  name: string;
  symbol: string;
}

interface Language {
  [key: string]: string;
}

interface CountryInfo {
  name: {
    common: string;
  };
  capital: string;
  population: number;
  region: string;
  subregion: string;
  currencies: {
    [key: string]: Currency;
  };
  languages: {
    [key: string]: string;
  };
  flags: {
    png: string;
  };
}

const TextWithLabel: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <>
    <Text fontSize="large">
      {label} {"\u00A0"} {"\u00A0"} {"\u00A0"}
      {value}
    </Text>
    <Divider borderColor="black" my={.5} />
  </>
);

const renderCurrencies = (currencies: { [key: string]: Currency }) => (
    <>
      <Text fontSize="large" display="inline-block" mr={2}>Currencies</Text>
      {Object.entries(currencies).map(([code, currency]: [string, Currency]) => (
        <Text key={code} fontSize="large" display="inline-block">
          {`${currency.name} (${currency.symbol})`}
        </Text>
      ))}
      <Divider borderColor="black" my={.5} />
    </>
  );
  

const renderLanguages = (languages: { [key: string]: string }) => (
  <>
    <Text fontSize="large">Languages {Object.values(languages).join(", ")}</Text>
    
    <Divider borderColor="black" my={.5} />
  </>
);

export const CountryPage: React.FC<CountryPageProps> = () => {
  const location = useLocation();
  const countryInfo: CountryInfo = location.state?.countryInfo;
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const countryName: string = countryInfo.name.common;
  const navigate = useNavigate();
  
  const handleIconClick = () => {
    navigate("/"); 
  };
  
  return (
    <Box w="90%" p="4%" pl="10%" m="auto">
      <Box position="relative">
        <Text fontSize="large">
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ marginRight: "1rem", cursor: "pointer" }}
            onClick={handleIconClick}
          />
          {countryName}
        </Text>
        <Box
          position="absolute"
          top="50%"
          right="7%"
          transform="translateY(-5 0%)"
        >
          <ToggleIcon
            isDarkMode={isDarkMode}
            toggleColorMode={toggleColorMode}
          />
        </Box>
      </Box>
      <Flex>
        <Box flex="1" pt="4%">
          <Image src={countryInfo.flags.png} objectFit="cover" w="100%" h="auto"  />
        </Box>
        <Box flex="1" p={4} pr="10%" pt="4%">
          <TextWithLabel label="Native name" value={countryInfo.capital} />
          <TextWithLabel label="Population" value={countryInfo.population} />
          <TextWithLabel label="Region" value={countryInfo.region} />
          <TextWithLabel label="Subregion" value={countryInfo.subregion} />
          <TextWithLabel label="Capital" value={countryInfo.capital} />
          {renderCurrencies(countryInfo.currencies)}
          {renderLanguages(countryInfo.languages)}
        </Box>
      </Flex>
    </Box>
  );
};

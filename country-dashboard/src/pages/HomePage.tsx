import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import currency from "../data/currency-codes.json";
import language from "../data/language-codes.json";
import region from "../data/regions.json";
import SearchBar from "../components/searchBar";
import SelectOptions from "../components/selectOptions";
import { Data } from "../dataTypes/index";
import loadingPng from "../Loading State.png";

const HomePage = () => {
  // State for loading indicator
  const [loader, setLoader] = useState<boolean>(true);
  // State for dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // State for search input
  const [searchValue, setSearchValue] = useState<string>("");
  // State for search results
  const [searchData, setSearchData] = useState<Data[]>([]);
  // State for all countries
  const [allCountries, setAllCountries] = useState<Data[]>([]);
  // State for selected currency
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>("Any Currency");
  // State for selected language
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("Any Language");
  // State for selected region
  const [selectedRegion, setSelectedRegion] = useState<string>("Any Region");

  // Options for dropdowns
  const currencyOptions = Object.keys(currency);
  const languageOptions = Object.keys(language);
  const baseUrl = "https://restcountries.com/v3.1/";

  // Fetch data on component mount and when dependencies change
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${baseUrl}/all`;
        const response = await fetch(url);
        const data = await response.json();
        setAllCountries(data);
        setLoader(false);

        // Conditionally fetch data based on search or filter criteria
        if (searchValue !== "") {
          setLoader(true);
          url = `${baseUrl}/name/${searchValue}`;
          const response = await fetch(url);
          const data = await response.json();
          setSearchData(data);
          setLoader(false);
        } else if (selectedCurrency !== "Any Currency") {
          setLoader(true);
          url = `${baseUrl}/currency/${selectedCurrency}`;
          const response = await fetch(url);
          const data = await response.json();
          setAllCountries(data);
          setLoader(false);
        } else if (selectedLanguage !== "Any Language") {
          setLoader(true);
          url = `${baseUrl}/lang/${selectedLanguage}`;
          const response = await fetch(url);
          const data = await response.json();
          setAllCountries(data);
          setLoader(false);
        } else if (selectedRegion !== "Any Region") {
          setLoader(true);
          url = `${baseUrl}/region/${selectedRegion}`;
          const response = await fetch(url);
          const data = await response.json();
          setAllCountries(data);
          setLoader(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchValue, selectedCurrency, selectedLanguage, selectedRegion]);

  // Event handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCurrency(value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLanguage(value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRegion(value);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // JSX
  return (
    <Box
      w="100%"
      h="100%"
      bg={darkMode ? "black" : "white"}
      color={darkMode ? "white" : "black"}
    >
      <Box p={["1rem", "2rem", "1rem", "2rem"]}>
        <Flex
          direction={["column", "column", "row", "row"]}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h3" size="lg" ml={"0.5rem"}>
            Countries
          </Heading>
          <IconButton
            aria-label={
              darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            icon={darkMode ? <FiSun /> : <FiMoon />}
            bg={"white"}
            onClick={toggleDarkMode}
          />
        </Flex>

        <Flex
          as="header"
          flexDirection={["column", "column", "row", "row"]}
          justifyContent="space-between"
          mt="4"
          mb="4"
        >
          <Box
            bg={darkMode ? "black" : "white"}
            p="0.6rem"
            mb={["1rem", "1rem", "0", "0"]}
            minW={["100%", "100%", "20rem", "20rem"]}
          >
            <SearchBar
              id="searchBar"
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearch}
            />
          </Box>
          <Box
            p="0.6rem"
            mb={["1rem", "1rem", "0", "0"]}
            minW={["100%", "100%", "20rem", "20rem"]}
          >
            <SelectOptions
              onChange={handleCurrencyChange}
              defaultValue={selectedCurrency}
              name="currency"
              id="currency"
              options={currencyOptions}
            />
          </Box>
          <Box
            p="0.6rem"
            mb={["1rem", "1rem", "0", "0"]}
            minW={["100%", "100%", "20rem", "20rem"]}
          >
            <SelectOptions
              onChange={handleLanguageChange}
              defaultValue={selectedLanguage}
              name="anyLanguage"
              id="anyLanguage"
              options={languageOptions}
            />
          </Box>
          <Box p="0.6rem" minW={["100%", "100%", "20rem", "20rem"]}>
            <SelectOptions
              onChange={handleRegionChange}
              defaultValue={selectedRegion}
              name="anyRegion"
              id="anyRegion"
              options={region.map((region) => region)}
            />
          </Box>
        </Flex>
        <Wrap
          as="main"
          flexDirection="row"
          w={["100%", "100%", "100%", "100%"]}
          justifyContent="center"
        >
          {loader ? (
            <img src={loadingPng} alt="Loading..." id="loader" />
          ) : searchValue === "" ? (
            allCountries.map((country: Data, index: number) => (
              <WrapItem
                key={index}
                flexDirection="column"
                width={["100%", "100%", "19%", "19%"]}
                border="1px"
                borderColor="gray.200"
                borderRadius="0.4rem"
                bg={darkMode ? "gray.800" : "white"}
                ml={".5rem"}
              >
                <Box>
                  <Image
                    src={country.flags?.png}
                    alt={country.flags?.alt}
                    h="10rem"
                    w="16rem"
                    ml=".5rem"
                    mt=".5rem"
                  />
                </Box>
                <Box w="100%" h="100%" ml=".5rem" pb={".5rem"}>
                  <Heading
                    as="h3"
                    fontSize="1.3rem"
                    mt="1rem"
                    mb="1rem"
                    color={darkMode ? "white" : "black"}
                  >
                    {country.name.common}
                  </Heading>
                  <Text color={darkMode ? "white" : "black"}>
                    Population: {country.population}
                  </Text>
                  <Text color={darkMode ? "white" : "black"}>
                    Region: {country.region}
                  </Text>
                  <Text color={darkMode ? "white" : "black"}>
                    Capital: {country.capital}
                  </Text>
                  <Text color={darkMode ? "white" : "black"}>
                    Currency{" "}
                    {country.currencies &&
                      Object.entries(country.currencies).map(
                        ([item, index]) => item
                      )}
                  </Text>
                </Box>
              </WrapItem>
            ))
          ) : (
            searchData.map((country: Data, index: number) => (
              <WrapItem key={index}>
                <Box>
                  <Image
                    src={country.flags?.png}
                    alt={country.flags?.alt}
                    h="10rem"
                    w="16rem"
                    ml=".5rem"
                    mt=".5rem"
                  />
                </Box>
                <Box w="100%" h="100%" ml=".5rem" pb={".5rem"}>
                  <Heading
                    as="h3"
                    fontSize="1.3rem"
                    mt="1rem"
                    mb="1rem"
                    color={darkMode ? "white" : "black"}
                  >
                    {country.name.common}
                  </Heading>
                  <Text color={darkMode ? "white" : "black"}>
                    Population: {country.population}
                  </Text>
                  <Text color={darkMode ? "white" : "black"}>
                    Region: {country.region}
                  </Text>
                  <Text color={darkMode ? "white" : "black"}>
                    Capital: {country.capital}
                  </Text>
                  <Text color={darkMode ? "white" : "black"}>
                    Currency{" "}
                    {country.currencies &&
                      Object.entries(country.currencies).map(
                        ([item, index]) => item
                      )}
                  </Text>
                </Box>
              </WrapItem>
            ))
          )}
        </Wrap>
      </Box>
    </Box>
  );
};

export default HomePage;

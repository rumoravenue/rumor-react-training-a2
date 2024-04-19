import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { BASE_URL } from "../Component/api";
import { Box, Text, Image, Spinner, AspectRatio } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface CardsProps {
  selectedCurrency: string | null;
  selectedLanguage: string | null;
  selectedRegion: string | null;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchValue: string;
}

export const Cards: React.FC<CardsProps> = ({
  selectedCurrency,
  selectedLanguage,
  selectedRegion,
  setSearchValue,
  searchValue,
}) => {
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    let url = BASE_URL + "all";
    if (searchValue) {
      url = BASE_URL + `name/${searchValue}`;
    } else if (selectedCurrency) {
      url = BASE_URL + `currency/${selectedCurrency}`;
    } else if (selectedLanguage) {
      url = BASE_URL + `lang/${selectedLanguage}`;
    } else if (selectedRegion) {
      url = BASE_URL + `region/${selectedRegion}`;
    }

    try {
      const response = await axios.get(url);
      const data = response.data;
      setFilteredCountries(data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        setFilteredCountries([]);
        setError("No country found");
      } else {
        setError("Error fetching data");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCardClick = (country: any) => {
    navigate(`/${country.cca2}`, { state: { countryInfo: country } });
  };
  useEffect(() => {
    const timeoutId = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedCurrency, selectedLanguage, selectedRegion, searchValue]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={4}
      p="7%"
      pt="0px"
      mt="0px"
    >
      {loading ? (
        <Spinner size="lg" />
      ) : error ? (
        <Text>{error}</Text>
      ) : filteredCountries.length === 0 ? (
        <Text>No country found</Text>
      ) : (
        filteredCountries.map((country: any, index: number) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            h="auto"
            w="250px"
            overflow="hidden"
            onClick={() => handleCardClick(country)}
          >
            <AspectRatio ratio={3.5 / 2}>
              <Image
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                objectFit="cover"
                boxSize="100%"
                p="5%"
              />
            </AspectRatio>
            <Box p="4">
              <Text fontSize="s" fontWeight={500}>
                {country.name.common}
              </Text>
              <Text>Population: {country.population.toLocaleString()}</Text>
              <Text>Region: {country.region}</Text>
              <Text>Capital: {country.capital}</Text>

              {country.currencies &&
                Object.entries(country.currencies).map(([code, currency]) => (
                  <Text key={code}>Currency: {code}</Text>
                ))}
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

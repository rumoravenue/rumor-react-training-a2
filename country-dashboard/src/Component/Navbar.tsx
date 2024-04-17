import React, { useMemo, useCallback, useState } from "react";
import CurrencyData from "../data/currency-codes.json";
import LanguageData from "../data/language-codes.json";
import RegionData from "../data/regions.json";
import { Flex, Input, Select, Button, Text } from "@chakra-ui/react";

interface NavbarProps {
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string | null>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  setSelectedCurrency,
  setSelectedLanguage,
  setSelectedRegion,
  setSearchValue,
}) => {
  const [isFilterSelected, setIsFilterSelected] = useState(false);

  const handleClear = () => {
    window.location.reload();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setIsFilterSelected(true);
  };

  const handleCurrency = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCurrency = event.target.value;
      setSelectedCurrency(selectedCurrency);
      setIsFilterSelected(true);
    },
    [setSelectedCurrency]
  );

  const handleLanguage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedLanguage = event.target.value;
      setSelectedLanguage(selectedLanguage);
      setIsFilterSelected(true);
    },
    [setSelectedLanguage]
  );

  const handleRegion = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedRegion = event.target.value;
      setSelectedRegion(selectedRegion);
      setIsFilterSelected(true);
    },
    [setSelectedRegion]
  );

  const CurrencyOptions = useMemo(() => {
    return (
      <>
        <option value="">Any Currency </option>
        {Object.entries(CurrencyData).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </>
    );
  }, []);

  const LanguageOptions = useMemo(() => {
    return (
      <>
        <option value="">Any Language</option>
        {Object.entries(LanguageData).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </>
    );
  }, []);

  const RegionOptions = useMemo(
    () => (
      <>
        <option value="">Any Region</option>
        {RegionData.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </>
    ),
    []
  );

  return (
    <Flex direction="column" width="100%" alignItems="center" p="2%">
      <Flex width="89%" justifyContent="space-between">
        <Input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          w="22%"
        />
        <Select onChange={handleCurrency} w="22%">
          {CurrencyOptions}
        </Select>
        <Select onChange={handleLanguage} w="22%">
          {LanguageOptions}
        </Select>
        <Select onChange={handleRegion} w="22%">
          {RegionOptions}
        </Select>
      </Flex>
      {isFilterSelected && (
        <Text
          alignSelf="flex-end"
          color="red"
          cursor="pointer"
          onClick={handleClear}
          mr="4rem"
          fontWeight="bold"
        >
          Clear Filters
        </Text>
      )}
    </Flex>
  );
};

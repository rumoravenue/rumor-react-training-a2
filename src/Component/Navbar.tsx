import React, { useMemo, useState, useCallback } from "react";
import "../App.css";
import CurrencyData from "../data/currency-codes.json";
import LanguageData from "../data/language-codes.json";
import RegionData from "../data/regions.json";

export const Navbar: React.FC = () => {
  // State variables to track selected currency, language, region, and search query
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // Memoized options for currency selection
  const CurrencyOptions = useMemo(() => {
    return (
      <>
        <option value="any">Any Currency </option>
        {Object.entries(CurrencyData).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </>
    );
  }, []);

  // Memoized options for language selection
  const LanguageOptions = useMemo(() => {
    return (
      <>
        <option value="any">Any Language</option>
        {Object.entries(LanguageData).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </>
    );
  }, []);

  // Memoized options for region selection
  const RegionOptions = useMemo(
    () => (
      <>
        <option value="any">Any Region</option>
        {RegionData.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </>
    ),
    []
  );

  // Handle currency change
  const handleCurrency = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCurrency(event.target.value);
    },
    []
  );

  // Handle language change
  const handleLanguage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedLanguage(event.target.value);
    },
    []
  );

  // Handle region change
  const handleRegion = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedRegion(event.target.value);
    },
    []
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  
  console.log(selectedCurrency, selectedLanguage, selectedRegion, search);

  //  Navbar component
  return (
    <div className="Nav-Container">
      <div className="inputs">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </div>
      <div className="inputs">
        <select onChange={handleCurrency} value={selectedCurrency}>
          {CurrencyOptions}
        </select>
      </div>
      <div className="inputs">
        <select onChange={handleLanguage} value={selectedLanguage}>
          {LanguageOptions}
        </select>
      </div>
      <div className="inputs">
        <select onChange={handleRegion} value={selectedRegion}>
          {RegionOptions}
        </select>
      </div>
    </div>
  );
};

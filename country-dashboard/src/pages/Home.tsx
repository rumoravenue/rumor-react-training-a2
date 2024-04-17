import React, { useEffect, useState } from "react";
import currency from "../data/currency-codes.json";
import language from "../data/language-codes.json";
import region from "../data/regions.json";
import SearchBar from "../components/searchBar";
import SelectOptions from "../components/selectOptions";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import "../style/Home.css";
import { Data } from "../dataTypes/index";
import loadingPng from "../Loading State.png";

const Home = () => {
  // State for dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false);
  // State for loading indicator
  const [loader, setLoader] = useState<boolean>(true);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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

  // JSX
  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <div>
        <h3>Countries</h3>
        <p>
          <DarkModeSwitch
            checked={darkMode}
            onChange={toggleDarkMode}
            size={30}
          />
        </p>
      </div>
      <header>
        <div>
          <SearchBar
            id="searchBar"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <div>
          <SelectOptions
            onChange={handleCurrencyChange}
            defaultValue={selectedCurrency}
            name="currency"
            id="currency"
            options={currencyOptions}
          />
        </div>
        <div>
          <SelectOptions
            onChange={handleLanguageChange}
            defaultValue={selectedLanguage}
            name="anyLanguage"
            id="anyLanguage"
            options={languageOptions}
          />
        </div>
        <div>
          <SelectOptions
            onChange={handleRegionChange}
            defaultValue={selectedRegion}
            name="anyRegion"
            id="anyRegion"
            options={region.map((region) => region)}
          />
        </div>
      </header>
      <main>
        {loader ? (
          <img src={loadingPng} alt="Loading..." id="loader" />
        ) : searchValue === "" ? (
          allCountries.map((country: Data, index: number) => (
            <div key={index}>
              <img src={country.flags?.png} alt={country.flags?.alt} />
              <h2>{country.name.common}</h2>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
              <p>
                Currency{" "}
                {country.currencies &&
                  Object.entries(country.currencies).map(
                    ([item, index]) => item
                  )}
              </p>
            </div>
          ))
        ) : (
          searchData.map((country: Data, index: number) => (
            <div key={index}>
              <img src={country.flags?.png} alt={country.flags?.alt} />
              <h2>{country.name.common}</h2>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
              <p>
                Currency{" "}
                {country.currencies &&
                  Object.entries(country.currencies).map(
                    ([item, index]) => item
                  )}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Home;

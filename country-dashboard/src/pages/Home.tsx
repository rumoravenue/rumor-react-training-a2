import React, { useState } from "react";
import currency from "../data/currency-codes.json";
import language from "../data/language-codes.json";
import region from "../data/regions.json";
import countries from "../data/countries.json";
import SearchBar from "../components/searchBar";
import SelectOptions from "../components/selectOptions";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import "../style/Home.css";

const Home = () => {
  // Define options for currency and language selection
  const currencyOptions = Object.keys(currency);
  const languageOptions = Object.keys(language);

  // State for search input value and dark mode
  const [searchValue, setSearchValue] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    // Container with conditional dark mode class
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      {/* Section for toggling dark mode */}
      <div>
        <h3>Countries</h3>
        <p>
          {/* Dark mode switch component */}
          <DarkModeSwitch
            checked={darkMode}
            onChange={toggleDarkMode}
            size={30}
          />
        </p>
      </div>
      {/* Header section with search bar and select options */}
      <header>
        <div>
          {/* Search bar component */}
          <SearchBar
            id="searchBar"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <div>
          {/* Select options for currency */}
          <SelectOptions
            defaultvalue="Any Currency"
            name="currency"
            id="currency"
            options={currencyOptions}
          />
        </div>
        <div>
          {/* Select options for language */}
          <SelectOptions
            defaultvalue="Any Language"
            name="anyLanguage"
            id="anyLanguage"
            options={languageOptions}
          />
        </div>
        <div>
          {/* Select options for region */}
          <SelectOptions
            defaultvalue="Any Region"
            name="anyRegion"
            id="anyRegion"
            options={region.map((region) => region)}
          />
        </div>
      </header>
      {/* Main section for displaying country information */}
      <main>
        {/* Iterate over countries and display information */}
        {countries?.map((data, index) => (
          <div key={index}>
            {/* Country flag */}
            <img src={data.flags.png} alt={data.flags.alt} />
            {/* Country name */}
            <h2>{data.name.common}</h2>
            {/* Population */}
            <p>Population {data.population}</p>
            {/* Region */}
            <p>Region {data.region}</p>
            {/* Capital */}
            <p>Capital {data.capital}</p>
            {/* Currency */}
            <p>
              Currency{" "}
              {data.currencies &&
                Object.entries(data.currencies).map(([item, index]) => item)}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;

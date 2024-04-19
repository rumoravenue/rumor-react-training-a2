import React, { useState } from "react";
import { Header } from "./Page/Header";
import { Navbar } from "./Page/Navbar";
import { Cards } from "./Page/Card";

export const SearchPage: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = React.useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="App">
      <Header />
      <Navbar 
        setSelectedCurrency={setSelectedCurrency}
        setSelectedLanguage={setSelectedLanguage}
        setSelectedRegion={setSelectedRegion}
        setSearchValue={setSearchValue}
      />
      <Cards
        selectedCurrency={selectedCurrency}
        selectedLanguage={selectedLanguage}
        selectedRegion={selectedRegion}
        setSearchValue={setSearchValue}
        searchValue={searchValue} 
      />
    </div>
  );
};


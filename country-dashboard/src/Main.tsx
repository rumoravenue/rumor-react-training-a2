import React, { useState } from "react";
import { Header } from './Component/Header';
import { Navbar } from './Component/Navbar';
import { Cards } from './Component/Card';

export const Main: React.FC = () => {
    // State variables 
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


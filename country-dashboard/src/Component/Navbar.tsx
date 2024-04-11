import React, { useMemo, useCallback, useState } from "react";
import CurrencyData from "../data/currency-codes.json";
import LanguageData from "../data/language-codes.json";
import RegionData from "../data/regions.json";
// Define props
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
  // Memoized options for currency selection
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
  // Memoized options for language selection
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
  // Memoized options for region selection
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
  // Handle currency change
  const handleCurrency = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCurrency = event.target.value;
      setSelectedCurrency(selectedCurrency);
      setIsFilterSelected(true);
    },
    [setSelectedCurrency]
  );
  // Handle language change
  const handleLanguage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedLanguage = event.target.value;
      setSelectedLanguage(selectedLanguage);
      setIsFilterSelected(true);
    },
    [setSelectedLanguage]
  );
  // Handle region change
  const handleRegion = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedRegion = event.target.value;
      setSelectedRegion(selectedRegion);
      setIsFilterSelected(true);
    },
    [setSelectedRegion]
  );
  // Handle clear filters
  const handleClear = () => {
    window.location.reload();
  };
  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setIsFilterSelected(true);
  };

  return (
    <div>
      <div className="Nav-Container">
        <div className="inputs">
          <input type="text" placeholder="Search..." onChange={handleSearch} />
        </div>
        <div className="inputs">
          <select onChange={handleCurrency}>{CurrencyOptions}</select>
        </div>
        <div className="inputs">
          <select onChange={handleLanguage}>{LanguageOptions}</select>
        </div>
        <div className="inputs">
          <select onChange={handleRegion}>{RegionOptions}</select>
        </div>
      </div>
      {/* Display clear filters button if any filter is selected */}
      {isFilterSelected && (
        <div className="button" onClick={handleClear}>
          Clear Filters
        </div>
      )}
    </div>
  );
};

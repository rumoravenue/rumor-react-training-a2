import React, { useEffect, useState, Dispatch, SetStateAction } from "react";

// Define props
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

  // Fetch data based on selected filters
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let url = "https://restcountries.com/v3.1/all";
      if (searchValue) {
        url = `https://restcountries.com/v3.1/name/${searchValue}`;
      } else if (selectedCurrency) {
        url = `https://restcountries.com/v3.1/currency/${selectedCurrency}`;
      } else if (selectedLanguage) {
        url = `https://restcountries.com/v3.1/lang/${selectedLanguage}`;
      } else if (selectedRegion) {
        url = `https://restcountries.com/v3.1/region/${selectedRegion}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            setFilteredCountries([]);
            setError("No country found");
          } else {
            throw new Error("Failed to fetch data");
          }
        } else {
          const data = await response.json();
          setFilteredCountries(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCurrency, selectedLanguage, selectedRegion, searchValue]);

  return (
    <div className="cards-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredCountries.length === 0 ? (
        <p>No country found</p>
      ) : (
        // Display filtered countries
        filteredCountries.map((country: any, index: number) => (
          <div className="card" key={index}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <div className="card-info">
              <h3>{country.name.common}</h3>
              <p>Population: {country.population.toLocaleString()}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>

              {country.currencies &&
                Object.entries(country.currencies).map(([code, currency]) => (
                  <p key={code}>Currency: {code}</p>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

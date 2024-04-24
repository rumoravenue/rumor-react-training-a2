import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "./api";

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

  const fetchData = () => {
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
  
    axios
      .get(url)
      .then(response => {
        const data = response.data;
        setFilteredCountries(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          setFilteredCountries([]);
          setError("No country found");
        } else {
          setError("Error fetching data");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  useEffect(() => {
    const timeoutId = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(timeoutId);
    };
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

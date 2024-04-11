import "./App.css";

import Card from "./components/Card";
import { useEffect, useState } from "react";

export const App = () => {
  // Countries state to store the array of countries
  const [countries, setCountries] = useState<any[]>([]);     

  // state to store currency array
  const [curr, setCurr] = useState<any[]>([]);

  // state to store language array
  const [lang, setLang] = useState<any[]>([]);

  // state to store region array
  const [region, setRegion] = useState<any[]>([]);

  // state for the search field to filter
  const [search, setSearch] = useState("");
  // state for the currency field to filter
  const [currency, setCurrency] = useState("");
  // state for the search field to filter
  const [language, setLanguage] = useState("");
  // state for the search field to filter
  const [reg, setregion] = useState("");

  // function to get  the countires , currencies , languages , region
  useEffect(() => {
    (async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
      setCurr(
        data
          ? Array.from(
              new Set(
                data
                  .map((item: any) => {
                    // Check if currencies key exists and is not empty
                    if (
                      item.currencies &&
                      Object.keys(item.currencies).length > 0
                    ) {
                      return Object.keys(item.currencies)[0];
                    } else {
                      return null; // or any other value you want to use for empty currencies
                    }
                  })
                  .filter((curr: null) => curr !== null)
              )
            )
          : []
      );

      setLang(
        data
          ? Array.from(
              new Set(
                data
                  .map((item: any) => {
                    if (
                      item.languages &&
                      Object.keys(item.languages).length > 0
                    ) {
                      return Object.entries(item.languages)[0][1];
                    } else {
                      return null;
                    }
                  })
                  .filter(
                    (lang: string | any[] | null) =>
                      lang !== null && lang.length > 0
                  )
              )
            )
          : []
      );

      setRegion(
        data
          ? Array.from(
              new Set(
                data
                  .map((item: any) => item.region)
                  .filter(
                    (region: string | any[]) => region && region.length > 0
                  )
              )
            )
          : []
      );
    })();
  }, []);

  function handleSearch(event: any) {
    const countryName = event.target.value;
    setSearch(countryName);

    // Check if the input contains only alphabetic characters or is empty
    if (!/^[a-zA-Z]*$/.test(countryName.trim())) {
      // If input contains numbers or special characters, do not perform the search
      return;
    }

    // If search field is empty, fetch all countries
    if (!countryName.trim()) {
      (async () => {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      })();
    } else {
      // Otherwise, fetch countries by name
      (async () => {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        const data = await response.json();
        setCountries(data);
      })();
    }
  }

  function handleCurr(event: any) {
    const selectedcurrency = event.target.value;
    setCurrency(selectedcurrency);

    (async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/currency/${selectedcurrency}`
      );
      const data = await response.json();
      setCountries(data);
    })();
  }

  function handleLang(event: any) {
    const selectedlanguage = event.target.value;
    setLanguage(selectedlanguage);

    (async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/lang/${selectedlanguage}`
      );
      const data = await response.json();
      setCountries(data);
    })();
  }

  function handleRegion(event: any) {
    const selectedregion = event.target.value;
    setregion(selectedregion);

    (async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/region/${selectedregion}`
      );
      const data = await response.json();
      setCountries(data);
    })();
  }

  const countryBool = !countries || countries.length === 0;

  const cardui = countries.map((item, index) => {
    return (
      <Card
        key={index}
        imgurl={item.flags.png}
        countryname={item.name.common}
        population={item.population}
        region={item.region}
        capital={item.capital}
        currency={item.cca3}
      />
    );
  });

  return (
    <div className="App">
      <div className="header">
        <div className="header-Text">
          <h1>Countries</h1>
        </div>
        <div className="header-Search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
          <select name="currency" onChange={handleCurr} value={currency}>
            <option selected disabled>
              Any Currency
            </option>
            {curr.map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <select name="language" onChange={handleLang} value={language}>
            <option selected disabled>
              Any Language
            </option>
            {lang.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>

          {/* <select name="region">
            <option selected disabled>
              Any Region...
            </option>
            {region.map((reg, index) => (
              <option key={index} value={reg}>
                {reg}
              </option>
            ))}
          </select> */}

          <select name="region" onChange={handleRegion} value={reg}>
            <option selected disabled>
              Any Region
            </option>
            {region.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>
      {countryBool ? (
        <div className="main-Content">
          <h1>Nothing Found</h1>
        </div>
      ) : (
        <div className="main-Content">{cardui}</div>
      )}
    </div>
  );
};

export default App;

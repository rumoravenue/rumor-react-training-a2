import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CountryProps {
  value: string;
}

interface Currency {
  name: string;
  symbol: string;
}

interface Language {
  [key: string]: string;
}

interface Countrycode {
  cca2: string;
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  population: string;
  subregion: string;
  region: string;
  capital: string;
  currencies: {
    [key: string]: Currency;
  };
  languages: Language;
}

function Country(props: CountryProps) {
  const [cdata, setCdata] = useState<Countrycode[]>([]);
  const [countrydata, setCountryData] = useState<Countrycode | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        data.length > 0 ? setCdata(data) : console.log("nodata");
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cdata.length > 0) {
      const country = cdata.find((item) => item.cca2 === props.value);
      if (country) {
        setCountryData(country);
      } else {
        console.log("Country not found");
      }
    }
  }, [cdata, props.value]);
  const navigate = useNavigate();

  return (
    <>
      {countrydata && (
        <div className="countrydata">
          <div className="countryname">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => navigate("/")} 
              style={{ cursor: "pointer" }} 
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M26.25 14C26.25 13.5168 25.8582 13.125 25.375 13.125L4.73744 13.125L10.2437 7.61872C10.5854 7.27701 10.5854 6.72299 10.2437 6.38128C9.90201 6.03957 9.34799 6.03957 9.00628 6.38128L2.00628 13.3813C1.66457 13.723 1.66457 14.277 2.00628 14.6187L9.00628 21.6187C9.34799 21.9604 9.90201 21.9604 10.2437 21.6187C10.5854 21.277 10.5854 20.723 10.2437 20.3813L4.73744 14.875H25.375C25.8582 14.875 26.25 14.4832 26.25 14Z"
                fill="black"
              />
            </svg>

            <span>{countrydata?.name.common}</span>
          </div>
          <div key={countrydata?.cca2} className="card--ui2">
            <div className="card-flag2">
              <img src={countrydata?.flags.png} alt="Country Flag" />
            </div>
            <div className="card-text2">
              <div className="name">
                <span>Native name </span>
                <span>{countrydata?.name.common}</span>
              </div>
              <div className="population">
                <span>Population </span>
                <span>{countrydata?.population}</span>
              </div>

              <div className="region">
                <span>Region </span>
                <span>{countrydata?.region}</span>
              </div>
              <div className="subregion">
                <span>Subregion </span>
                <span>{countrydata?.subregion}</span>
              </div>
              <div className="capital">
                <span>Capital </span>
                <span>{countrydata?.capital}</span>
              </div>
              <div className="currencies">
                <span>Currencies</span>
                <span>
                  {Object.keys(countrydata?.currencies).map((currencyKey) => (
                    <span key={currencyKey}>
                      {countrydata?.currencies[currencyKey].name}{" "}
                      {countrydata?.currencies[currencyKey].symbol}
                    </span>
                  ))}
                </span>
              </div>
              <div className="languages">
                <span>Languages</span>
                <span>
                  {Object.keys(countrydata?.languages).map(
                    (languagekey, index) => (
                      <span key={languagekey}>
                        {countrydata?.languages[languagekey]}
                        {index !==
                          Object.keys(countrydata?.languages).length - 1 &&
                          ", "}
                      </span>
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Country;

import React from "react";
import countries from '../data/countries.json';
import "../App.css";

export const Cards: React.FC = () => {
  return (
    //  Cards component
    <div className="cards-container">
      {countries.map((country, index) => (
        <div className="card" key={index}>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          <div className="card-info">
            <h3>{country.name.common} </h3>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
            {country.currencies && Object.entries(country.currencies).map(([code, currency]) => (
              <p key={code}>Currency: {code} ({currency.symbol})</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

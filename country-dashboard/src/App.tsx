import "./App.css";
import countries from "./data/countries.json";
import Card from "./components/Card";

export const App = () => {
  // countries holds a JSON array of the countries and their data which you can use

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
          <input type="text" placeholder="Search..." />
          <select name="currency">
            <option selected disabled>
              Any Currency
            </option>
          </select>
          <select name="language">
            <option selected disabled>
              Any Language
            </option>
          </select>
          <select name="region">
            <option selected disabled>
              Any Region
            </option>
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

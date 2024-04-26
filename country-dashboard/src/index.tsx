import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Country from "./components/Country";

const RootElement = () => {
  interface Countrycode {
    cca2: string;
  }

  const [ccodes, setCountryCodes] = useState<Countrycode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        data.length > 0 ? setCountryCodes(data) : console.log("nodata");
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };

    fetchData();
  }, []);
  interface croutes {
    path: string;
    element: React.ReactElement;
  }
  const routes: croutes[] =
    ccodes.length > 0
      ? ccodes.map((item) => ({
          path: `/${item.cca2}`,
          element: <Country value={item.cca2} />,
        }))
      : [];

  const route = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    ...routes,
  ]);

  return (
    <>
      {routes.length > 0 ? (
        <RouterProvider router={route} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RootElement />);

reportWebVitals();

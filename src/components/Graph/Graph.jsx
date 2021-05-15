import React, { useEffect, useMemo, useState, memo } from "react";
import { countriesData, infectedData } from "../../db";
import { SelectCountry } from "../SelectCountry";
import ReactApexChart from "react-apexcharts";

const Graph = () => {
  const [infected, setInfected] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectId, setSelectId] = useState("");
  const [selectCountry, setSelectCountry] = useState([]);

  const changeCountryHandler = (e) => setSelectId(e.target.value);

  useEffect(() => {
    let data = infectedData.data.map((info) =>
      info.UpdatedAt !== null
        ? {
            infected: info.Infected,
            dead: info.Dead,
            recovered: info.Recovered,
            countryId: info.CountryId,
            createdAt: info.CreatedAt,
            updatedAt: info.UpdatedAt
          }
        : ""
    );

    setCountries(countriesData.data);
    setInfected(data);
  }, []);

  useEffect(() => {
    let selected = infected.filter(
      ({ countryId }) => Number(selectId) === countryId
    );

    setSelectCountry(selected);
  }, [selectId]);

  const date = useMemo(() => {
    return selectCountry
      .map(({ updatedAt }) => updatedAt)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }, [selectCountry]);

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center"
      }}
    >
      <SelectCountry
        countries={countries}
        changeCountryHandler={changeCountryHandler}
      />

      {selectCountry.length > 0 ? (
        <ReactApexChart
          options={{
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: "smooth"
            },
            xaxis: {
              type: "datetime",
              categories: date
            },
            tooltip: {
              x: {
                format: "dd/MM"
              }
            }
          }}
          series={[
            {
              name: "Infected",
              data: selectCountry.map(({ infected }) => infected)
            },
            {
              name: "Recovered",
              data: selectCountry.map(({ recovered }) => recovered)
            },
            {
              name: "Deaths",
              data: selectCountry.map(({ dead }) => dead)
            }
          ]}
          type="area"
          height={350}
        />
      ) : (
        <p>Данные отсутствуют</p>
      )}
    </div>
  );
};

export default Graph;

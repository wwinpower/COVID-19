import React, { memo } from "react";

const SelectCountry = memo(
  ({ countries, changeCountryHandler }) => {
    return (
      <select onChange={changeCountryHandler}>
        <option>Выбрать</option>
        {countries.map((country) => (
          <option value={country.Id} key={country.Id}>
            {country.Name}
          </option>
        ))}
      </select>
    );
  });

export default SelectCountry;

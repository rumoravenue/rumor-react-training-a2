import React from "react";

const SelectOptions = ({
  name,
  id,
  options,
  defaultValue,
  onChange,
}: {
  name: string;
  id: string;
  options: string[];
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <>
      <select
        name={name}
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <option>{defaultValue}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectOptions;

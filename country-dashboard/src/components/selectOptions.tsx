import React from "react";
import { Select } from "@chakra-ui/react";

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
    <Select name={name} id={id} defaultValue={defaultValue} onChange={onChange}>
      <option value={defaultValue}>{defaultValue}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default SelectOptions;

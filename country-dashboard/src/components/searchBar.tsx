import { Input } from "@chakra-ui/react";

const SearchBar = ({
  type,
  placeholder,
  value,
  id,
  onChange,
}: {
  id: string;
  type: string;
  placeholder: string;
  value: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
export default SearchBar;

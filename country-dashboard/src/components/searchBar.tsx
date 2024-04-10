const SearchBar = ({
  type,
  placeholder,
  value,
  id,
  onChange,
}: {
  id:string
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
    id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
export default SearchBar;
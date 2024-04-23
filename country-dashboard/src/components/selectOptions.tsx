const SelectOptions = ({
  name,
  id,
  options,
  defaultvalue

}: {
  name: string;
  id: string;
  options: string[];
  defaultvalue:string
}) => {
  return (
    <>
      
      <select name={name} id={id}>
      <option>{defaultvalue}</option>
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
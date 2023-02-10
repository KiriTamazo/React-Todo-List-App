const opt = ["all", "completed", "incomplete"];

const Select = ({ currentSelect, setCurrentSelect, options = opt }) => {
  const changeSelect = (e) => {
    setCurrentSelect(e.target.value);
  };

  return (
    <select
      className="cursor-pointer capitalize bg-lighter-gray outline-none  text-gray-900 text-sm rounded-sm  block p-0.5 sm:p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
      onChange={changeSelect}
      value={currentSelect}
    >
      {options.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;

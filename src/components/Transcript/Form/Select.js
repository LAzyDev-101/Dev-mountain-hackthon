import React, { useContext } from "react";
import { FormContext } from "../FormContext";

const Select = ({ field_id, field_label, field_placeholder, field_value, field_options }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-state">
        {field_label}
      </label>
      <div className="inline-block relative w-full mb-4">
        <select
          className="block appearance-none w-full text-gray-700 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          aria-label="Default select example"
          onChange={(event) => handleChange(field_id, event)}
        >
          <option>Open this select menu</option>
          {field_options.length > 0 &&
            field_options.map((option, i) => (
              <option value={option.option_label} key={i}>
                {option.option_label}
              </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Select;

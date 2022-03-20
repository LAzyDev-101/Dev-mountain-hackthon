import React, { useContext } from "react";
import { FormContext } from "../FormContext";

const Input = ({ field_id, field_label, field_placeholder, field_value }) => {
  const { handleChange } = useContext(FormContext);
  return (
    <div className="mb-4 ">
      <label htmlFor="field" className="block text-gray-700 text-sm font-bold mb-2">
        {field_label}
      </label>
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="field"
        aria-describedby="emailHelp"
        placeholder={field_placeholder ? field_placeholder : ""}
        value={field_value}
        onChange={(event) => handleChange(field_id, event)}
      />
      {/* <div id="emailHelp" className="form-text">
        We'll never share your email with anyone else.
      </div> */}
    </div>
  );
};

export default Input;

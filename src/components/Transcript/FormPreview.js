import React, { useContext } from "react";

const FormPreview = ({ props }) => {
  const test = (value) => {
    // not use
    return (
      <>
        <div className="flex flex-row mb-4">
          <div className="basis-2/12 font-mono font-bold">{value.field_id}: </div>

          <div className="basis-10/12 font-mono pl-3">{value.field_value ? value.field_value : "null"}</div>
        </div>
      </>
    );
  };
  return (
    <div className="rounded overflow-hidden shadow-lg bg-white p-2">
      <div className="mb-4">
        <span className="font-mono font-bold mb">Summary</span>
      </div>

      <div className="p-3">{props ? props.fields.map((item, i) => <div key={i}> {test(item)} </div>) : null}</div>
    </div>
  );
};

export default FormPreview;

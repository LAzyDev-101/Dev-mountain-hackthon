import { FormContext } from "components/Transcript/FormContext";
import { useEffect, useState } from "react";
import Element from "../../../components/Transcript/FormFields";
import formJSON from "../../../formObject.json";

const StudentDetailsSection = ({ onChangeOutput }) => {
  const [elements, setElements] = useState(null);
  const { fields, page_label } = elements ?? {};

  useEffect(() => {
    setElements(formJSON[0]);
  }, []);

  const handleChange = (id, event) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case "checkbox":
            field["field_value"] = event.target.checked;
            break;

          default:
            field["field_value"] = event.target.value;
            break;
        }
      }
      setElements(newElements);
    });
    onChangeOutput(elements);
  };

  return (
    <div key={0} className="basis-1/2">
      <FormContext.Provider value={{ handleChange }}>
        <div className="">
          <div className="flex flex-row items-center justify-center mb-5 font-mono font-bold">
            {page_label}
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            {fields
              ? fields.map((field, i) => <Element key={i} field={field} />)
              : null}
          </form>
        </div>
      </FormContext.Provider>
    </div>
  );
};

export default StudentDetailsSection;

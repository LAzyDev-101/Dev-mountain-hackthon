// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import formJSON from "../formObject.json";
import React, { useState, useEffect } from "react";
import Element from "../components/Transcript/FormFields";
import { FormContext } from "../components/Transcript/FormContext";
import FormPreview from "../components/Transcript/FormPreview";
import BlockPreview from "../components/Transcript/BlockPreview";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

// import React, { useState } from "react";

const steps = ["Input Form Data", "Input Summary", "Block Summary", "Finish"];

const TranscriptPage = () => {
  const [elements, setElements] = useState(null);
  const [outPut, setOutput] = useState("No Bitches?");
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  // stepper
  const isStepOptional = (step) => {
    // not use
    return step === 5;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // dialogue
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // form
  useEffect(() => {
    setElements(formJSON[0]);
  }, []);
  const { fields, page_label } = elements ?? {};
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(elements);
    setOutput(elements);
    handleNext();
    handleClose();
  };
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
    // console.log(elements);
    setOutput(elements);
  };

  return (
    <div className=" h-100 px-10 py-5">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Really?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you really agreeing to this shit?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fuck no</Button>
          <Button onClick={(e) => handleSubmit(e)} autoFocus>
            Hell yeah
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="flex flex-row items-center justify-center pt-10 min-h-full">
              {(() => {
                switch (activeStep) {
                  case 0:
                    return [
                      <div key={0} className="basis-1/2">
                        <FormContext.Provider value={{ handleChange }}>
                          <div className="">
                            <div className="flex flex-row items-center justify-center mb-5 font-mono font-bold">
                              {page_label}
                            </div>
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                              {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
                              {/* <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={(e) => handleSubmit(e)}
                              >
                                Submit
                              </button> */}
                            </form>
                          </div>
                        </FormContext.Provider>
                      </div>,
                    ];
                  case 1:
                    return [
                      <div key={1} className="basis-8/12">
                        <FormPreview props={outPut} />
                      </div>,
                    ];
                  case 2:
                    return [
                      <div key={2} className="basis-8/12">
                        <BlockPreview props={outPut} />
                      </div>,
                    ];
                  case 3:
                    return [<div key={3}>Send email</div>];
                  default:
                    return null;
                }
              })()}
            </div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              {activeStep === 1 ? (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={(e) => handleClickOpen(e)}
                >
                  Submit
                </button>
              ) : (
                <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>

      <div className="flex flex-row items-center"></div>
    </div>
  );
};

export default TranscriptPage;

import { Step, StepLabel, Stepper } from "@mui/material";

const TranscriptStepper = ({ steps, activeStep, isStepSkipped }) => {
  return (
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
  );
};

export default TranscriptStepper;

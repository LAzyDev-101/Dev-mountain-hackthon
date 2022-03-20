import { Button } from "@mui/material";
import { Box } from "@mui/system";
import TranscriptStepper from "components/TranscriptStepper";
import { useState } from "react";
import StudentDetailsSection from "./StudentDetailsSection";

const steps = [
  "Student Details",
  "Transcript",
  "Summary",
  "Block Summary",
  "Finish",
];

const MOCK_TRACSRIPT_DATA = [
  {
    term: "1",
    year: "2017",
    grade: [
      {
        subjectID: "01123412",
        subjectName: "aaaasfasf",
        grade: "A",
        credit: 3,
      },
      {
        subjectID: "01123412",
        subjectName: "aaa",
        grade: "A",
        credit: 3,
      },
      {
        subjectID: "01123412",
        subjectName: "aaaasfasf",
        grade: "A",
        credit: 3,
      },
      {
        subjectID: "01123412",
        subjectName: "aaa",
        grade: "A",
        credit: 3,
      },
    ],
  },
];

const MOCK_TRANSCRIPT = {
  id: "000001",
  issuerName: "KMITL",
  issuerPublicKey: "0x1124124",
  verificationType: "onChain",
  studentName: "Mr.A",
  studentID: "1234",
  educationType: "transcript_university",
  data: MOCK_TRACSRIPT_DATA,
};

const TranscriptPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [outPut, setOutput] = useState("No Bitches?");

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const onChangeOutput = (output) => {
    setOutput(output);
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

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  const onUploadTranscript = (transcript = {}) => {
    console.log(MOCK_TRANSCRIPT);
    //TODO implement regis transcript
  };

  const Factory = () => {
    switch (activeStep) {
      case 0:
        return <StudentDetailsSection onChangeOutput={onChangeOutput} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={onUploadTranscript}>
        on upload
      </Button>
      <Box py={2} />
      <TranscriptStepper
        activeStep={activeStep}
        isStepSkipped={isStepSkipped}
        steps={steps}
      />
      {Factory()}
    </div>
  );
};

export default TranscriptPage;

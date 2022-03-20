import { Button } from "@mui/material";
import { Box } from "@mui/system";
import TabBox from "components/TabBox";
import TranscriptStepper from "components/TranscriptStepper";
import { useState } from "react";
import StudentDetailsSection from "./StudentDetailsSection";
import StudentSummarySection from "./StudentSummarySection";
import StudentTranscriptSection from "./StudentTranscriptSection";

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
  const [output, setOutput] = useState({});
  const [transcript, setTranscript] = useState([]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const onChangeOutput = (type, value) => {
    setOutput((prev) => {
      return { ...prev, [type]: value };
    });
  };

  const onChangeTranscript = (tc) => {
    setTranscript(tc);
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
      <TabBox value={0} index={activeStep}>
        <StudentDetailsSection
          onChangeOutput={onChangeOutput}
          handleNext={handleNext}
        />
      </TabBox>
      <TabBox value={1} index={activeStep}>
        <StudentTranscriptSection
          onChangeTranscript={onChangeTranscript}
          handleNext={handleNext}
        />
      </TabBox>
      <TabBox value={2} index={activeStep}>
        <StudentSummarySection
          output={output}
          transcript={transcript}
          handleNext={handleNext}
        />
      </TabBox>
    </div>
  );
};

export default TranscriptPage;

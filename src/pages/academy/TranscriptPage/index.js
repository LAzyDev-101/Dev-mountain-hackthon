import { Button } from "@mui/material";
import { Box } from "@mui/system";
import TabBox from "components/TabBox";
import TranscriptStepper from "components/TranscriptStepper";
import { useState } from "react";
import StudentDetailsSection from "./StudentDetailsSection";
import StudentSummarySection from "./StudentSummarySection";
import StudentTranscriptSection from "./StudentTranscriptSection";
import { generatePDF } from "./generateTranscript";
import { hashSha256 } from "utils/hash";
import { useIssueTranscript } from "hook/useEduProof";
import Loading from "components/Loading";
import useActiveWeb3React from "hook/useActiveWeb3React";
import SuccessSection from "./SuccessSection";

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
  {
    term: "2",
    year: "2017",
    grade: [
      {
        subjectID: "01123412",
        subjectName: "aaa",
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
  {
    term: "1",
    year: "2018",
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
  {
    term: "2",
    year: "2018",
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
  {
    term: "1",
    year: "2019",
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
  {
    term: "2",
    year: "2019",
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
  {
    term: "1",
    year: "2020",
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
    ],
  },
  {
    term: "2",
    year: "2020",
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
  id: "000002",
  issuerName: "KMITL_A",
  issuerPublicKey: "0x1124124",
  verificationType: "onChain",
  studentName: "Mr.A",
  studentID: "1234",
  educationType: "transcript_university",
  data: MOCK_TRACSRIPT_DATA,
};

const steps = ["Student Details", "Transcript", "Summary", "Finish"];

const TranscriptPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [output, setOutput] = useState({});
  const [transcript, setTranscript] = useState([]);
  // const [outPut, setOutput] = useState("No Bitches?");
  const [transData, setTransData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { account } = useActiveWeb3React();

  const issueTranscript = useIssueTranscript();

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

  const buildTranscript = () => {
    const parsed = {
      id: "000002",
      issuerName: "KMITL_A",
      issuerPublicKey: "0x1124124",
      verificationType: "onChain",
      studentName: `${output.firstname} ${output.lastname}`,
      studentID: output.studentId,
      educationType: "transcript_university",
      data: transcript,
    };
    return parsed;
  };

  const onUploadTranscript = async (tsObject) => {
    let transcriptObject = tsObject;
    transcriptObject.issuerPublicKey = account;
    console.log(transcriptObject);
    const res = generatePDF(transcriptObject);
    const dataToHash = await res.text()
    // const reader = new FileReader();
    // reader.readAsDataURL(res);
    // reader.onloadend = function () {
    //   var base64data = reader.result;
    //   setTransData(base64data.toString());
    // };
    if (dataToHash !== '') {
      const hash = hashSha256(dataToHash);
      console.log("hash", hash);

      setLoading(true);
      issueTranscript(transcriptObject.studentID, hash)
        .then((v) => {
          console.log("success");
          var csvURL = window.URL.createObjectURL(res);
          var tempLink = document.createElement("a");
          tempLink.href = csvURL;
          tempLink.setAttribute("download", "transcript.pdf");
          tempLink.click();
          setLoading(false);
          setTimeout(() => {
            handleNext();
          }, 1000);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
      <Button
        variant="contained"
        onClick={() => onUploadTranscript(MOCK_TRANSCRIPT)}
      >
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
          handleNext={() => onUploadTranscript(buildTranscript())}
        />
      </TabBox>
      <TabBox value={3} index={activeStep}>
        <SuccessSection handleNext={handleNext} />
      </TabBox>
    </div>
  );
};

export default TranscriptPage;

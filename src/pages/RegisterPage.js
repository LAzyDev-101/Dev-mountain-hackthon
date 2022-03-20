// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { ReactComponent as Logo } from "../assets/logo-small.svg";
import { ReactComponent as CheckSuccess } from "../assets/check_success.svg";
import { useRegisterEI } from "hook/useEduProof";
import { generateSecretWord } from "utils/generateSecretWord";
import { hashSha256 } from "utils/hash";
import Loading from "components/Loading";

// import React, { useState } from "react";

const steps = ["ข้อมูลส่วนตัว", "เพิ่มข้อมูลสู่ระบบ"];

const RegisterPage = () => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [eiName, setEIName] = useState('');
  const [eiID, setEIID] = useState('');
  const [isLoading, setLoading] = useState(false);

  const registerEI = useRegisterEI()
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
  const handleClickOpen = async () => {
    if (eiID !== '' && eiName !== '') {
      const secretWord = generateSecretWord()
      alert(`Please remember your secret word: ${secretWord}`)
      const secretWordHash = hashSha256(secretWord)
      setLoading(true)
      await registerEI(eiID, eiName, secretWordHash)
        .then((v) => {
          console.log(v)
        }).catch((e) => {
          console.log(e)
        })

      setLoading(false);
      setOpen(true);
    } else {
      console.log("input err")
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEINameChange = (e) => {
    setEIName(e.target.value)
  }
  const onEIIDChange = (e) => {
    setEIID(e.target.value)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="bg-sky-100 w-screen h-100">
      <div className="absolute top-3 left-3 -z-11">
        <Logo />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="flex flex-row justify-center p-5">
            <CheckSuccess />
          </div>

          <div className="flex flex-row justify-center p-5">
            <div className="font-bold text-3xl font-mono">เพิ่มข้อมูลเข้าสู่ระบบสำเร็จ</div>
          </div>

          <div className="flex flex-row justify-center my-2">
            <div className="text-lg font-mono">รอการยืนยันการลงทะเบียน</div>
          </div>

          <div className="flex flex-row justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={(e) => handleClose(e)}
            >
              ตรวจสอบสถานะ
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-row items-center justify-center pt-12">
        <div className="basis-6/12">
          <div className="flex flex-row items-center justify-center">
            <div className="basis-6/12">
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>
                        <span className="font-bold">{label}</span>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
          </div>
          <React.Fragment>
            <div className="flex flex-row items-center justify-center pt-10 min-h-full">
              {(() => {
                switch (activeStep) {
                  case 0:
                    return [
                      <div key={0} className="basis-11/12">
                        <div className="flex flex-row justify-center mt-4">
                          <div className="basis-12/12">
                            <div className="font-bold text-3xl font-mono">สมัครสมาชิก</div>
                          </div>
                        </div>
                        <div className="flex flex-row text-xl mt-12">ข้อมูลสถานศึกษา</div>

                        <div className="flex flex-row text-lg mt-7">
                          <div className="basis-8/12 mr-5">
                            <div className="text-lg">สมัครสมาชิก</div>
                          </div>
                          <div className="basis-4/12">
                            <div className="text-lg">รหัสประจำสถานศึกษา</div>
                          </div>
                        </div>

                        <div className="flex flex-row text-lg">
                          <div className="basis-8/12 mr-5">
                            <input
                              type="text"
                              className="shadow appearance-none border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="field"
                              placeholder="ชื่อสถานศึกษาของคุณ"
                              onChange={(e) => onEINameChange(e)}
                            />
                          </div>
                          <div className="basis-4/12">
                            <input
                              type="text"
                              className="shadow appearance-none border rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="field"
                              placeholder="ชื่อสถานศึกษาของคุณ"
                              onChange={(e) => onEIIDChange(e)}
                            />
                          </div>
                        </div>

                        <div className="flex flex-row items-center justify-center pt-20">
                          <button
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleNext}
                          >
                            ยืนยันข้อูล
                          </button>
                        </div>
                      </div>,
                    ];
                  case 1:
                    return [
                      <div key={0} className="basis-11/12">
                        <div className="flex flex-row justify-center mt-4">
                          <div className="basis-12/12">
                            <div className="font-bold text-3xl font-mono">สมัครสมาชิก</div>
                          </div>
                        </div>
                        <div className="flex flex-row text-xl mt-12">ข้อมูลสถานศึกษา</div>

                        <div className="flex flex-row text-lg mt-7">
                          <div className="basis-4/12 mr-5">
                            <div className="text-lg">สมัครสมาชิก</div>
                          </div>
                          <div className="basis-8/12">
                            {eiName}
                          </div>
                        </div>

                        <div className="flex flex-row text-lg mt-3">
                          <div className="basis-4/12 mr-5">
                            <div className="text-lg">รหัสประจำสถานศึกษา</div>
                          </div>
                          <div className="basis-8/12">
                            {eiID}
                          </div>
                        </div>

                        <div className="flex flex-row items-center justify-between pt-20">
                          <button
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleBack}
                          >
                            แก้ไขข้อมูล
                          </button>

                          <button
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={(e) => handleClickOpen(e)}
                          >
                            เพิ่มข้อมูลสู่ระบบ
                          </button>
                        </div>
                      </div>,
                    ];
                  default:
                    return null;
                }
              })()}
            </div>
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
            </Box> */}
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

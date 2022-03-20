// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import { ReactComponent as Logo } from "../assets/logo.svg";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { hashSha256 } from "utils/hash";
import { useVerifyTranscript } from "hook/useEduProof";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { ReactComponent as CheckSuccess } from "../assets/check_success.svg";
import { ReactComponent as CrossError } from "../assets/red-error-icon.svg";

const VerifyCert = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [payload, setPayload] = useState({ eiAddress: "", studentID: "" });
  const [transData, setTransData] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isInCorrect, setIsInCorrect] = useState(false);
  const verifyTranscript = useVerifyTranscript();

  const loadFinish = () => {
    setIsLoading(false);
  };
  const loadToggle = () => {
    setIsLoading(true);
  };

  // dialogue
  const handleIsCorrectOpen = () => {
    setIsCorrect(true);
  };

  const handleIsCorrectClose = () => {
    setIsCorrect(false);
  };

  // dialogue
  const handleIsInCorrectOpen = () => {
    setIsInCorrect(true);
  };

  const handleIsInCorrectClose = () => {
    setIsInCorrect(false);
  };

  const changeHandler = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    async function readPdfMetadata() {
      // Fetch PDF

      var reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsArrayBuffer(file);
      reader.onloadend = async (evt) => {
        if (evt.target.readyState === FileReader.DONE) {
          const arrayBuffer = evt.target.result,
            array = new Uint8Array(arrayBuffer);
          const pdfDoc = await PDFDocument.load(arrayBuffer, {
            updateMetadata: false,
          });
          const author = pdfDoc.getAuthor().split(":");
          const subject = pdfDoc.getSubject().split(":");
          setPayload({
            eiAddress: author[1],
            studentID: subject[1],
          });
          setOwnerData(subject[0]);
        }
        // Load the PDF document without updating its existing metadata
      };
    }
    await readPdfMetadata();
  };
  const handdleSubmit = async () => {
    // loadToggle();
    console.log("isloading", isLoading);
    var reader = new FileReader();

    reader.readAsDataURL(selectedFile);
    reader.onloadend = function () {
      var base64data = reader.result;
      setTransData(base64data.toString());
    };
    if (transData != null) {
      loadToggle();
      // console.log(transData)

      const hash = hashSha256(transData);
      console.log("isloading", hash);
      console.log(`${payload.eiAddress} ${payload.studentID} hash: ${hash}`);

      await verifyTranscript(payload.eiAddress, payload.studentID, hash).then((v) => {
        loadFinish();
        console.log("loadFinish", isLoading);
        console.log(v.isCorrect);

        if (v.isCorrect === true) {
          handleIsCorrectOpen();
        } else {
          handleIsInCorrectOpen();
        }
      });
    }
  };

  return (
    <div className=" bg-sky-100 h-screen">
      <div className="flex flex-row justify-center items-center my-5 pt-5">
        <Logo />
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="font-bold text-4xl font-mono">ระบบขอข้อมูลผลการเรียนออนไลน์</div>
      </div>

      <div className="flex flex-row justify-center items-center mt-4">
        <div className="font-bold">ข้อมูลผลการเรียนรายบุคคล</div>
      </div>

      <div className="flex flex-row justify-center items-center mt-10">
        <div className=" basis-4/12">
          <div className="font-bold">อัพโหลดไฟล์</div>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center mt-3">
        <div className=" basis-4/12">
          <label className="w-full flex flex-col items-center py-1 mb-3  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue  hover:text-gray-300">
            <input type="file" name="file" onChange={changeHandler} className="hidden" />
            {selectedFile ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                {/* <p>Filetype: {selectedFile.type}</p> */}
              </div>
            ) : (
              <span className="text-base leading-normal">เลือกไฟล์เอกสารของคุณ</span>
            )}
          </label>
          <span>
            {ownerData != null && (
              <>
                <span className="font-bold"> Owner: </span> <span>{ownerData}</span>{" "}
              </>
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center mt-5">
        <button
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
          onClick={handdleSubmit}
        >
          ยืนยัน
        </button>
      </div>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={isCorrect}
        onClose={handleIsCorrectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="flex flex-row justify-center p-5">
            <CheckSuccess />
          </div>

          <div className="flex flex-row justify-center p-5">
            <div className="font-bold text-3xl font-mono">เอกสารถูกต้อง</div>
          </div>

          <div className="flex flex-row justify-center my-2">
            <div className="text-lg font-mono">เอกสารนี้ได้รับการยืนยันอย่างถูกต้อง</div>
          </div>

          <div className="flex flex-row justify-center mt-6">
            <button
              type="submit"
              className=" bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={(e) => handleIsCorrectClose(e)}
            >
              close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isInCorrect}
        onClose={handleIsInCorrectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="flex flex-row justify-center px-5 pt">
            <CrossError />
          </div>

          <div className="flex flex-row justify-center px-5">
            <div className="font-bold text-3xl font-mono">error</div>
          </div>

          <div className="flex flex-row justify-center my-2">
            <div className="text-lg font-mono">Something went wrong.</div>
          </div>

          <div className="flex flex-row justify-center mt-6">
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={(e) => handleIsInCorrectClose(e)}
            >
              close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerifyCert;

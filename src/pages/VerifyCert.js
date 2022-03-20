// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { hashEduJson } from "../utils/jspdf";
import React, { useState } from "react";
import { Buffer } from "buffer";
import { PDFDocument } from "pdf-lib";
import { hashSha256 } from "utils/hash";
import { useVerifyTranscript } from "hook/useEduProof";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const VerifyCert = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [payload, setPayload] = useState({ eiAddress: "", studentID: "" });
  const [transData, setTransData] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const verifyTranscript = useVerifyTranscript();

  const loadFinish = () => {
    setIsLoading(false);
  };
  const loadToggle = () => {
    setIsLoading(true);
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
  const handdleSubmit = () => {
    // loadToggle();
    console.log("start", isLoading);

    var reader = new FileReader();

    reader.readAsDataURL(selectedFile);
    reader.onloadend = function () {
      var base64data = reader.result;
      setTransData(base64data.toString());
    };
    if (transData != null) {
      // console.log(transData)
      const hash = hashSha256(transData);
      console.log(`${payload.eiAddress} ${payload.studentID} hash: ${hash}`);
      verifyTranscript(payload.eiAddress, payload.studentID, hash).then((v) => {
        console.log(v);
        loadFinish();
        console.log("stop", isLoading);
      });
    }
  };

  return (
    <div className=" bg-sky-100 w-screen h-screen">
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
    </div>
  );
};

export default VerifyCert;

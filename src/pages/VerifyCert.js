// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactComponent as Logo } from "../assets/logo.svg";
import jsPDF from "../utils/jspdf";
import React, { useState } from "react";
import { Buffer } from "buffer";

const VerifyCert = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    // var data = await readFileDataAsBase64(event, event.target.files[0])
    reader.addEventListener("load", (event) => {
      console.log(event.target.result);
    });
    const data = await reader.readAsBinaryString(event.target.files[0]);
    console.log(data);

    let base64ToString = Buffer.from(data, "base64").toString("utf8");
    // base64ToString = JSON.parse(base64ToString);
    console.log(base64ToString);
  };

  const handdleSubmit = () => {
    console.log("test");
  };

  const readFileDataAsBase64 = (e, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className=" bg-sky-100 w-screen h-screen">
      <div className="flex flex-row justify-center items-center my-5 pt-5">
        <Logo />
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="font-bold text-4xl font-mono">
          ระบบขอข้อมูลผลการเรียนออนไลน์
        </div>
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
          <label class="w-full flex flex-col items-center py-1  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue  hover:text-gray-300">
            <input
              type="file"
              name="file"
              onChange={changeHandler}
              class="hidden"
            />
            {selectedFile ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
              </div>
            ) : (
              <span class="text-base leading-normal">
                เลือกไฟล์เอกสารของคุณ
              </span>
            )}
          </label>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center mt-10">
        <button
          class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
          onClick={handdleSubmit}
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
};

export default VerifyCert;

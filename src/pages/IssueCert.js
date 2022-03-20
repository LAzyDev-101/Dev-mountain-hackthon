// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactComponent as Logo } from "../assets/logo.svg";

import React, { useState } from "react";

const LandingPage = () => {
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
          <label class="w-full flex flex-col items-center py-1  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue  hover:text-gray-300">
            <span class="text-base leading-normal">เลือกไฟล์เอกสารของคุณ</span>
            <input type="file" class="hidden" />
          </label>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center mt-10">
        <button class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3">ยืนยัน</button>
      </div>
    </div>
  );
};

export default LandingPage;

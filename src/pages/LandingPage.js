// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactComponent as Landing } from "../assets/landing_image.svg";
import { ReactComponent as Logo } from "../assets/logo-small.svg";
import { ReactComponent as Fox } from "../assets/metamask-fox.svg";

import React, { useState } from "react";

const LandingPage = () => {
  return (
    <div className=" bg-sky-100 w-screen h-100">
      <div className="absolute top-3 left-3 -z-11">
        <Logo />
      </div>

      <div className="flex flex-row items-center ml-48 mt-16 z-10">
        <div className="basis-6/12">
          <div className="font-bold text-4xl font-mono">
            แพลตฟอร์มสำหรับตรวจสอบข้อมูล <br />
            ผลการเรียนแบบออนไลน์
          </div>

          <div className="text-xl font-mono mt-6">
            ผ่านระบบเครือข่ายไร้สูญกลางบล็อคเชน สามารถตรวจสอบสะดวกรวดเร็ว
            และสามารถรับประกันได้ว่าเอกสารมีความน่าเชื่อถือ ไม่ถูกปลอมแปลง
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center">
        {/* <div className="font-bold text-4xl font-mono">
          แพลตฟอร์มสำหรับตรวจสอบข้อมูล <br />
          ผลการเรียนแบบออนไลน์
        </div> */}
      </div>

      <div className="flex flex-row items-center justify-end mt-16 text-center z-11">
        <div className="basis-6/12">
          <div className="font-bold text-2xl font-mono">ระบบสมาชิกสำหรับสถาบันการศึกษา</div>

          <div className=" text-lg  mt-4">ประเภทโรงเรียน อาชีวศึกษา และมหาวิทยาลัยในประเทศไทย</div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-end text-center">
        <div className="basis-6/12">
          <div className="flex flex-row items-center justify-end text-center">
            <div className="basis-6/12 pl-10 pt-3">
              เข้าสู่ระบบ <br />
              <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 mt-3">
                <div className="flex flex-row items-center justify-end text-center">
                  <Fox className="mr-2" /> เชื่อมต่อกับระบบ
                </div>
              </button>
            </div>

            <div className="basis-6/12 pr-10 pt-3">
              ลงทะเบียนใช้งานครั้งแรก <br />
              <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3 mt-3">
                <div className="flex flex-row items-center justify-end text-center">
                  <Fox className="mr-2" /> สมัครสมาชิก
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* <div className="basis-6/12">
          <button class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3">ยืนยัน</button>
        </div> */}
      </div>

      <div className="absolute bottom-0 left-0">
        <Landing />
      </div>
    </div>
  );
};

export default LandingPage;

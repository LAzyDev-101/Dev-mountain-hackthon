import { Outlet, Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
const drawerWidth = 240;

const blankLayout = () => (
  <div className=" bg-sky-100 w-screen h-screen">
    <div className=" flex flex-row justify-end items-center py-1">
      <button class="bg-transparent border border-blue-900 text-blue-500 hover:bg-blue-700 hover:text-white text-center py-2 px-4 rounded">
        ค้นหาผลการเรียน
      </button>

      <button class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-3">
        เข้าสู่ระบบ
      </button>
    </div>

    <Outlet />
  </div>
);

export default blankLayout;

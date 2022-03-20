import { Outlet } from "react-router-dom";
import * as React from "react";
import { useWeb3React } from "@web3-react/core";
import useAuth from 'hook/useAuth';
import useEagerConnect from 'hook/useEagerConnect'

const BlankLayout = () => {
  const { account } = useWeb3React();

  useEagerConnect()
  const { login, logout } = useAuth();

  const drawerWidth = 240;
  return (
    <div className="bg-sky-100 w-screen h-screen">
      <div className="flex flex-row justify-end items-center py-1">
        <button className="bg-transparent border border-blue-900 text-blue-500 hover:bg-blue-700 hover:text-white text-center py-2 px-4 rounded">
          ค้นหาผลการเรียน
        </button>
        {
          account ?
            <button onClick={() => logout()} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-3">
              ออกจากระบบ
            </button>
            : <button onClick={() => login()} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-3">
              เข้าสู่ระบบ
            </button>
        }

      </div>

      <Outlet />
    </div >
  );
}

export default BlankLayout;

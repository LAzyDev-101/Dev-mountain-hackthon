import { Outlet } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useWeb3React } from "@web3-react/core";
import useAuth from "hook/useAuth";
import useEagerConnect from "hook/useEagerConnect";
import { ReactComponent as Logo } from "../assets/logo-small.svg";

const drawerWidth = 240;

const NAV_CONFIGS = [
  {
    label: "ตั้งค่าบัญชี",
    href: "info",
  },
  {
    label: "เพิ่มผลการศึกษา",
    href: "transcript",
  },
  {
    label: "ประวัติการบันทึก",
    href: "history",
  },
];

const DefaultLayout = () => {
  const { account } = useWeb3React();

  useEagerConnect();
  const { login, logout } = useAuth();

  return (
    <div className="bg-sky-100 h-screen">
      <div className="flex flex-row justify-end items-center py-1">
        <button className="bg-transparent border border-blue-900 text-blue-500 hover:bg-blue-700 hover:text-white text-center py-2 px-4 rounded">
          ค้นหาผลการเรียน
        </button>
        {account ? (
          <button
            onClick={() => logout()}
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-3"
          >
            ออกจากระบบ
          </button>
        ) : (
          <button
            onClick={() => login()}
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-3"
          >
            เข้าสู่ระบบ
          </button>
        )}
      </div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
          style={{
            marginTop: 64,
          }}
          className="bg-sky-100"
        >
          <Logo className="mt-10" />

          <svg
            className="mx-auto my-3"
            width="150"
            height="150"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="90" cy="90" r="90" fill="#0069C0" />
          </svg>

          <div className="mx-auto mb-6 break-all text-center px-3">{account ? account : ""}</div>

          {/* <Toolbar /> */}
          <Divider />
          <List>
            {NAV_CONFIGS.map((navConfig, index) => (
              <Link href={navConfig.href} style={{ textDecoration: "none" }} key={navConfig.label}>
                <ListItem button>
                  <Typography className="text-black no-underline">{navConfig.label}</Typography>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <Box flex={1} />
          {/* {account ? (
          <div>
            <div className="px-2">Connected with : {account}</div>
            <Button onClick={() => logout()}>
              <Typography className="text-black">{"ออกจากระบบ"}</Typography>
            </Button>
          </div>
        ) : (
          <Button onClick={() => login()}>
            <Typography className="text-black">{"เข้าสู่ระบบ"}</Typography>
          </Button>
        )} */}

          <Box my={1} />
        </Drawer>
        <Box className="bg-sky-100" component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default DefaultLayout;

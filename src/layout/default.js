import { Outlet } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";

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

const defaultLayout = () => {
  const onLogout = () => {
    //TODO logout ...
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
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
      >
        <Toolbar />
        <Divider />
        <List>
          {NAV_CONFIGS.map((navConfig, index) => (
            <Link
              href={navConfig.href}
              style={{ textDecoration: "none" }}
              key={navConfig.label}
            >
              <ListItem button>
                <Typography className="text-black no-underline">
                  {navConfig.label}
                </Typography>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <Box flex={1} />
        <Button onClick={onLogout}>
          <Typography className="text-black">{"ออกจากระบบ"}</Typography>
        </Button>
        <Box my={1} />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default defaultLayout;

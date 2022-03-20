import { Outlet, Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
const drawerWidth = 240;

const blankLayout = () => (
  <div>
    <Outlet />
  </div>
);

export default blankLayout;

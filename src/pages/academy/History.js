import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Header = () => (
  <React.Fragment>
    <Typography>name</Typography>
    <Typography>student id</Typography>
    <Typography>date</Typography>
  </React.Fragment>
);

const MOCKS = [
  {
    name: "Tana",
    id: "603xxxxx21",
    date: new Date().toLocaleString("th"),
  },
];

const AdminTranscriptHistoryPage = () => {
  const RowBuilder = (row) => (
    <React.Fragment>
      <Typography>{row.name}</Typography>
      <Typography>{row.id}</Typography>
      <Typography>{row.date}</Typography>
    </React.Fragment>
  );

  return (
    <Box>
      <Typography variant="h6">ประวัติข้อมูล</Typography>
      <Box py={1} />
      <div className="grid grid-cols-3 ">
        <Header />
        {MOCKS.map(RowBuilder)}
      </div>
    </Box>
  );
};

export default AdminTranscriptHistoryPage;

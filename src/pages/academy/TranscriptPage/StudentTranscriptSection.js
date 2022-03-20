import { Box, Typography } from "@mui/material";
import { useState } from "react";

const TERMS = [1, 2];

const StudentGradeOnYear = ({ year, onChange }) => {
  return <div></div>;
};

const YEARS = ["2560", "2561", "2562", "2563"];

const StudentTranscriptSection = () => {
  const [years, setYears] = useState(YEARS);
  const [selectedYear, setSelectedYear] = useState(YEARS[0]);
  const [transcript, setTranscript] = useState({});

  const selectedYearStyle = (year) => {
    if (year === selectedYear) return "bg-gray-500 text-white";
    return "bg-gray-200";
  };

  const YearBlockBuilder = (year) => (
    <div
      className={
        "mx-2 p-1 px-2 rounded-lg cursor-pointer " + selectedYearStyle(year)
      }
      onClick={() => {
        setSelectedYear(year);
      }}
    >
      <Typography variant="caption">ปีการศึกษา {year}</Typography>
    </div>
  );

  return (
    <div className="basis-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8">
      <Typography variant="h6">เพิ่มข้อมูลผลการเรียน</Typography>
      <Box pt={1} />
      <div className="flex justify-center">{years.map(YearBlockBuilder)}</div>
    </div>
  );
};

export default StudentTranscriptSection;

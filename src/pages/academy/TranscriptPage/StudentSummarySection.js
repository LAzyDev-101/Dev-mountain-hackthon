import { Button, TextField, Typography } from "@mui/material";
import React from "react";

const GRADE_KEYS = ["subjectID", "subjectName", "grade", "credit"];

const StudentSummarySection = ({ output, transcript, handleNext }) => {
  const RowBuilder = (subject, gradeIndex, term, year) => (
    <React.Fragment key={gradeIndex}>
      {GRADE_KEYS.map((key) => (
        <Typography key={`${year}-${term}-${gradeIndex}-${key}`}>
          {subject[key]}
        </Typography>
      ))}
    </React.Fragment>
  );

  return (
    <div className="mt-4">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <Typography>ข้อมูลส่วนตัว</Typography>
          {Object.keys(output).map((key) => (
            <div className="flex justify-between">
              <Typography>{key}</Typography>
              <Typography>{output[key]}</Typography>
            </div>
          ))}
        </div>
        <div className="col-span-3">
          <Typography>ผลการเรียน</Typography>
          {transcript.map((yearTerm, index) => {
            return (
              <div key={index} className="bg-gray-100 mt-2">
                <Typography className="bg-gray-200">
                  {`ปี ${yearTerm.year} เทอม ${yearTerm.term}`}
                </Typography>
                <div className="grid grid-cols-4 gap-x-4 gap-y-1">
                  <Typography>subjectID</Typography>
                  <Typography>subjectName</Typography>
                  <Typography>grade</Typography>
                  <Typography>credit</Typography>
                  {yearTerm.grade?.map((subject, index) =>
                    RowBuilder(subject, index, transcript.term, yearTerm.year)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleNext}>ยืนยันข้อมูล</Button>
      </div>
    </div>
  );
};

export default StudentSummarySection;

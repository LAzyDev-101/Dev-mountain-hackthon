import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

const TERMS = [1, 2];

const GRADE_KEYS = ["subjectID", "subjectName", "grade", "credit"];

const StudentGradeOnYear = ({
  year,
  yearIndex,
  onChangeTranscript,
  transcriptInYear,
}) => {
  const addBlankRow = (term) => {
    onChangeTranscript(yearIndex, term, {
      subjectID: "",
      subjectName: "",
      grade: "",
      credit: "",
    });
  };

  const onChange = (term, gradeIndex, key, value) => {
    onChangeTranscript(yearIndex, term, { [key]: value }, gradeIndex);
  };

  const RowBuilder = (subject, gradeIndex, term) => (
    <React.Fragment key={gradeIndex}>
      {GRADE_KEYS.map((key) => (
        <TextField
          key={`${yearIndex}-${term}-${gradeIndex}-${key}`}
          size="small"
          value={subject[key]}
          onChange={(e) => onChange(term, gradeIndex, key, e.target.value)}
        />
      ))}
    </React.Fragment>
  );

  return (
    <div className="mt-4">
      {transcriptInYear.map((transcript) => (
        <div
          key={`${transcript.year}-${transcript.term}`}
          className="bg-gray-100 mb-4"
        >
          <Typography className="bg-gray-200">
            ภาคเรียนที่ {transcript.term}
          </Typography>
          <div className="grid grid-cols-4 gap-4">
            <Typography>subjectID</Typography>
            <Typography>subjectName</Typography>
            <Typography>grade</Typography>
            <Typography>credit</Typography>
            {transcript.grade?.map((subject, index) =>
              RowBuilder(subject, index, transcript.term)
            )}
          </div>
          <div className="flex justify-center">
            <Button onClick={() => addBlankRow(transcript.term)}>
              เพิ่มวิชาเรียน +
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const YEARS = ["2560", "2561", "2562", "2563"];

const StudentTranscriptSection = ({
  onChangeTranscript: _onChangeTranscript,
  handleNext,
}) => {
  const [years] = useState(YEARS);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [transcript, setTranscript] = useState([]);

  const onNext = () => {
    _onChangeTranscript(transcript);
    handleNext();
  };

  const initialTranscript = useCallback(() => {
    if (Object.keys(transcript).length !== 0) return;
    let initTrans = [];
    if (years.length !== 0) {
      years.forEach((year) => {
        TERMS.forEach((term) => {
          initTrans.push({
            term: `${term}`,
            year: `${year}`,
            grade: [],
          });
        });
      });
    }
    setTranscript(initTrans);
  }, [years, transcript]);

  useEffect(() => {
    initialTranscript();
  }, [initialTranscript]);

  const selectedYearStyle = (year) => {
    if (year === years[selectedYearIndex]) return "bg-gray-500 text-white";
    return "bg-gray-200";
  };

  const onChangeTranscript = (yearIndex, term, newValue, gradeIndex) => {
    const index = Number(yearIndex) * TERMS.length + Number(term) - 1;
    let modifyingState = [...transcript];
    if (gradeIndex === undefined) {
      modifyingState[index].grade.push(newValue);
    }
    if (gradeIndex !== undefined) {
      modifyingState[index].grade[gradeIndex] = {
        ...modifyingState[index].grade[gradeIndex],
        ...newValue,
      };
    }
    setTranscript(modifyingState);
  };

  const YearBlockBuilder = (year, index) => (
    <div
      className={
        "mx-2 p-1 px-2 rounded-lg cursor-pointer " + selectedYearStyle(year)
      }
      onClick={() => {
        setSelectedYearIndex(index);
      }}
      key={year + "block"}
    >
      <Typography variant="caption">ปีการศึกษา {year}</Typography>
    </div>
  );

  return (
    <div className="basis-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8">
      <Typography variant="h6">เพิ่มข้อมูลผลการเรียน</Typography>
      <Box pt={1} />
      <div className="flex justify-center">{years.map(YearBlockBuilder)}</div>
      <StudentGradeOnYear
        year={years[selectedYearIndex]}
        yearIndex={selectedYearIndex}
        onChangeTranscript={onChangeTranscript}
        transcriptInYear={transcript.slice(
          TERMS.length * selectedYearIndex,
          TERMS.length * selectedYearIndex + TERMS.length
        )}
      />
      <div className="flex justify-center">
        <Button onClick={onNext}>ยืนยันข้อมูล</Button>
      </div>
    </div>
  );
};

export default StudentTranscriptSection;

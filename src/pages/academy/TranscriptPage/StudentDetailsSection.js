import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CONTENTS = [
  {
    label: "ชื่อภาษาไทย",
    key: "firstname",
  },
  {
    label: "นามสกุลภาษาไทย",
    key: "lastname",
  },
  {
    label: "รหัสประจำตัวนักเรียน",
    key: "studentId",
  },
];

const StudentDetailsSection = ({ onChangeOutput, handleNext }) => {
  const handleChange = (key, value) => {
    onChangeOutput(key, value);
  };

  const formBuilder = (formConfig) => (
    <div key={formConfig.key}>
      <Typography>{formConfig.label}</Typography>
      <TextField
        size="small"
        fullWidth
        onChange={(e) => handleChange(formConfig.key, e.target.value)}
      />
    </div>
  );

  return (
    <div className="basis-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8">
      <Typography variant="h6">ข้อมูลส่วนตัว</Typography>
      <Box pt={1} />
      <div className="grid grid-cols-2 gap-4">{CONTENTS.map(formBuilder)}</div>
      <div className="pt-8 flex justify-center">
        <Button variant="outlined" onClick={handleNext}>
          ยืนยันข้อมูล
        </Button>
      </div>
    </div>
  );
};

export default StudentDetailsSection;

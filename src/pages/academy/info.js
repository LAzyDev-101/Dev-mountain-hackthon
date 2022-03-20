import { Box, Button, TextField, Typography } from "@mui/material";

const AdminProfileInfoPages = () => {
  return (
    <Box className="border-2 rounded-lg p-4">
      <Typography variant="h6">ข้อมูลสถาบันการศึกษา</Typography>
      <Box py={1} />
      <div className="grid grid-cols-5 gap-x-8">
        <div className="col-span-3">
          <Typography>ชื่อสถานศึกษา</Typography>
          <TextField size="small" fullWidth />
        </div>
        <div className="col-span-2">
          <Typography>รหัสประจำสถาบันการศึกษา</Typography>
          <TextField size="small" fullWidth />
        </div>
      </div>
      <Box py={1} />
      <div className="flex flex-row justify-end">
        <Button variant="outlined">บันทึกข้อมูล</Button>
      </div>
    </Box>
  );
};

export default AdminProfileInfoPages;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@mui/material";

const ModalAddedTranscript = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>บันทึกข้อมูลสำเร็จ</DialogTitle>
      <DialogContent>
        ระบบได้ทำการส่งการบันทึกข้อมูลไปยัง
        อีเมลของผู้ถูกบันทึกข้อมูลเรียบร้อยแล้ว
      </DialogContent>
      <DialogActions>
        <Link href="transcript">
          <Button>เพิ่มข้อมูล</Button>
        </Link>
        <Link href="history">
          <Button>ประวัติข้อมูล</Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddedTranscript;

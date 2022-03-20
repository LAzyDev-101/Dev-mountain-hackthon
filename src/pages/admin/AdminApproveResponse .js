import {useState, useEffect} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { Dialog, DialogActions } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const Header = () => (
  <React.Fragment>
    <Typography>response name</Typography>
    <Typography>date</Typography>
    <Typography>Action</Typography>
    <Typography>Status</Typography>
  </React.Fragment>
);

const MOCKS = [
  {
    response_name: "Tana",
    date: new Date().toLocaleString("th"),
    secret_gen: "abcdef"
  },
];

let _secrertCode = ""

const AdminApproveResponse =()=>{
  const [open, setOpen] = React.useState(false);
  const [secretCode, setSecret] = useState('')
  const [ListResponse, setResponse] = useState([])
  const ClickButton = () =>{
    setOpen(true);
  };

  //Mark Todo 
  const ListAllResponse = async ()=>{
    setResponse([])
  }

  useEffect(()=>{
    ListAllResponse()
  },[])

  const handleClose = () => {
    setOpen(false);
    setSecret(_secrertCode)
  };

  const inputSecret =(event)=>{
    // setSecret(event.target.value)
    _secrertCode = event.target.value
  }

  const button = <Button variant="outlined" onClick={ClickButton}>Approve</Button>

  const ShowIcon = ()=>{
    if (secretCode == "abcdef" &&  handleClose ){
      return <CheckOutlinedIcon/>;
    }
    else
      return <p class="color-yellow">pending</p>
  }

  const RowBuilder = (row) => (
    <React.Fragment>
      <Typography>{row.response_name}</Typography>
      <Typography>{row.date}</Typography>
      <Typography>{button}</Typography>
      <Typography> {ShowIcon()} </Typography>
    </React.Fragment>
  );

  return (
    <div class=" bg-sky-100 h-screen w-screen">
      <header>
      <Dialog open={open}>
        <div>
          <input class="required:border-red-500 rounded-full text-align-center" type="text" placeholder="secret code of this response"  onChange={inputSecret}/> 
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ width: `calc(100% px)`}}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Response List
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <li>
        <Box>
          <Typography variant="h6">ประวัติข้อมูล</Typography>
          <Box py={1} />
          <div className="grid grid-cols-4 ">
            <Header/>
            {/* {MOCKS.map(RowBuilder)} */}
            {ListAllResponse.map(RowBuilder)}
          </div>
        </Box>
      </li>
    </div>
  );
};
export default AdminApproveResponse 

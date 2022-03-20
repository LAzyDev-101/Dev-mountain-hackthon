import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { Dialog, DialogActions } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useGetALLEI } from "hook/useEduProof";
import useActiveWeb3React from "hook/useActiveWeb3React";
import useEagerConnect from "hook/useEagerConnect";
import { useWeb3React } from "@web3-react/core";
import { getAllByAltText } from "@testing-library/react";
import { useApproveEIID, useGetEIAddress } from "hook/useEduProof";
import Loading from "components/Loading";


const Header = () => (
  <React.Fragment>
    <Typography>name</Typography>
    <Typography>ID</Typography>
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

const AdminApproveResponse = () => {
  const { account } = useWeb3React();

  const [open, setOpen] = React.useState(false);

  const [secretCode, setSecret] = useState('')
  const [EIAddress, setEIAddress] = useState()
  const [isLoading, setLoading] = useState(false)
  const allEI = useGetALLEI()
  const approveEI = useApproveEIID()
  const getEIAddress = useGetEIAddress()

  const ClickButton = async (eiAddress) => {
    console.log(eiAddress)
    setEIAddress(eiAddress)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log(EIAddress, secretCode)
    setLoading(true)
    await approveEI(EIAddress, secretCode)
      .then((v) => {
        console.log(v)
        setLoading(false)
        setOpen(false);
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
        setOpen(false);
      })


  }

  const inputSecret = (event) => {
    // setSecret(event.target.value)
    _secrertCode = event.target.value
    setSecret(_secrertCode)
  }

  const parseEnum = (id) => {
    switch (id) {
      case 0:
        return "PENDING"
      case 1:
        return "APRROVED"
      case 2:
        return "REVOKED"
      default:
        return "UNDEFINED"
    }
  }
  const RowBuilder = (row) => {
    if (row[0] != 0) {
      return
    }
    return (
      <React.Fragment>
        <Typography>{row[1]}</Typography>
        <Typography>{row[2]}</Typography>
        <Typography>{<Button variant="outlined" onClick={() => ClickButton(row[5])} > Approve</Button>}</Typography>
        <Typography> {parseEnum(row[0])} </Typography>
      </React.Fragment>
    )
  }

  if (allEI == null) {
    return <Loading />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div class=" bg-sky-100 h-screen w-screen">
      <header>
        <Dialog open={open}>
          <div>
            <input class="required:border-red-500 rounded-full text-align-center" type="text" placeholder="secret code of this response" onChange={inputSecret} />
          </div>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ width: `calc(100% px)` }}>
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
            <Header />
            {allEI.map(RowBuilder)}
          </div>
        </Box>
      </li>
    </div>
  );
};
export default AdminApproveResponse 

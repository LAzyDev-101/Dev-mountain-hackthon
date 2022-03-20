// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReactComponent as LearnImage } from "../assets/undraw_education.svg";

import React, { useState } from "react";

const LandingPage = () => {
  return (
    <div className=" bg-slate-300 w-screen h-100">
      <div className="bg-fuchsia-400 flex flex-row justify-center items-center">
        <div className="p-8 bg-fuchsia-500">1234</div>
      </div>

      <div className="bg-fuchsia-400 flex flex-row justify-center items-center">
        <div className="bg-fuchsia-500 basis-1/3 h-20 align-middle rounded">1</div>

        <div className="bg-fuchsia-500 basis-1/3 h-10 items-center rounded">1</div>

        <div className="bg-fuchsia-500 basis-1/3 rounded">1</div>
      </div>

      <div class="flex flex-row items-center">
        <div class="basis-1/4">01</div>
        <div class="basis-1/4">02</div>
        <div class="basis-1/2">03</div>
      </div>

      <div class="flex flex-row items-center my-5">
        <LearnImage />
      </div>

      <div className="flex flex-row justify-center items-center">
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;

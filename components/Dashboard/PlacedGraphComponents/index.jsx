"use client";
import React from "react";
import { Spin } from "antd";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart, ArcElement, Legend } from "chart.js";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import PropTypes from "prop-types";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Image from "next/image";
import maleimg from "@/public/male.svg";
import femaleimg from "@/public/female.svg";
import { styled } from "@mui/material/styles";

Chart.register(ArcElement, Legend);

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,

    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#FFFFFF" : "#FFFFFF",
        }}
        size={150}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#11CC46" : "#11CC46",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={150}
        thickness={4}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          className="text-[30px] font-[800]"
          variant="caption"
          component="div"
          color="black"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function PlacedGraphComponents({
  studentData,
  dashboardData,
  noOfPlacedStudents = dashboardData.noOfStudentsPlaced,
  noOfStudents = dashboardData.noOfGradStudents,
  sideBar,
  TotalNoofFemale = 70,
  TotalNoofMale = 50,
}) {
  const [progress, setProgress] = React.useState(10);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [yearplace, setYearplace] = React.useState(10);
  const handleChange = (event) => {
    setYearplace(event.target.value);
  };

  const maleplacedvalue = 57;
  const femaleplacedvalue = 100 - maleplacedvalue;
  const percentagePlaced = (
    (parseInt(noOfPlacedStudents) / parseInt(noOfStudents)) *
    100
  ).toFixed(0);
  return (
    <div
      className={
        sideBar
          ? `h-[297px] w-[538px] mt-6 bg-[#EAFFEC] px-4 pt-4 rounded-lg flex flex-col shadow`
          : `mt-6 bg-[#EAFFEC] px-4 pt-4 py-[18px] rounded-lg flex flex-col shadow md:w-full lg:w-full mx-auto`
      }
    >
      <div className="flex flex-col gap-y-[17px] h-[78px] ">
        <div className="flex justify-between">
          <h1 className="text-left pt-2 pl-2  font-[700] text-[22px] leading-tight  text-black">
            Placement percentage
          </h1>
          <Select
            sx={{ borderRadius: 12 }}
            className="h-[36px] border-[1px] border-[#CCCCCC] rounded-full w-[97px]"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={yearplace}
            label="Select Year"
            onChange={handleChange}
          >
            <MenuItem value={10}>2024</MenuItem>
            <MenuItem value={20}>2023</MenuItem>
            <MenuItem value={30}>2022</MenuItem>
          </Select>
        </div>
        <div className="relative h-[1px] w-full bg-[#CCCCCC]"></div>
      </div>
      <div className="flex gap-[36px] justify-center">
        <CircularProgressWithLabel value={percentagePlaced} />
        <div className="flex flex-col items-center justify-between">
          <div className="w-full">
            <h1 className="font-[700] text-[18px]">Total Students:</h1>
            <div className="flex gap-[80px] mt-[10px]">
              <h2 className="font-[600] text-[16px]">Male: {TotalNoofMale}</h2>
              <h3 className="font-[600] text-[16px]">
                Female: {TotalNoofFemale}
              </h3>
            </div>
          </div>
          <div className="flex gap-[55px] items-end">
            <LightTooltip
              placement="top-start"
              title={
                <>
                  <div className="flex px-[10px] py-[5px] gap-[34px]">
                    <div className="flex gap-[10px] items-center">
                      <div>
                        <Image src={maleimg}></Image>
                      </div>
                      <div>
                        <h1 className="font-[700] text-[17px] text-[#29292B] leading-tight">
                          {maleplacedvalue}%
                        </h1>
                        <p className="text-[12px] font-[500]">Male</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <div>
                        <Image src={femaleimg}></Image>
                      </div>
                      <div>
                        <h1 className="font-[700] text-[17px] text-[#29292B] leading-tight">
                          {femaleplacedvalue}%
                        </h1>
                        <p className="text-[12px] font-[500]">Female</p>
                      </div>
                    </div>
                  </div>
                </>
              }
            >
              <div className="flex gap-[8px] items-center">
                <div className="h-[20px] w-[20px] bg-[#11CC46] rounded-full border-[1px] border-[#b9b8b8]"></div>
                <h2 className="text-[17px] font-[400] text-[#88888A]">
                  Placed
                </h2>
                <h2 className="text-[17px] font-[700]">{percentagePlaced}%</h2>
              </div>
            </LightTooltip>
            <LightTooltip
              placement="top-end"
              title={
                <>
                  <div className="flex px-[10px] py-[5px] gap-[34px]">
                    <div className="flex gap-[10px] items-center">
                      <div>
                        <Image src={maleimg}></Image>
                      </div>
                      <div>
                        <h1 className="font-[700] text-[17px] text-[#29292B] leading-tight">
                          {maleplacedvalue}%
                        </h1>
                        <p className="text-[12px] font-[500]">Male</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <div>
                        <Image src={femaleimg}></Image>
                      </div>
                      <div>
                        <h1 className="font-[700] text-[17px] text-[#29292B] leading-tight">
                          {maleplacedvalue}%
                        </h1>
                        <p className="text-[12px] font-[500]">Female</p>
                      </div>
                    </div>
                  </div>
                </>
              }
            >
              <div className="flex gap-[8px] items-center">
                <div className="h-[20px] w-[20px] bg-[#ffffff] border-[1px] border-[#b9b8b8] rounded-full"></div>
                <h2 className="text-[17px] font-[400] text-[#88888A]">
                  Unplaced
                </h2>
                <h2 className="text-[17px] font-[700]">
                  {100 - percentagePlaced}%
                </h2>
              </div>
            </LightTooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

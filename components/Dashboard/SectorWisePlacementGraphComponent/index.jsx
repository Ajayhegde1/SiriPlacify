import { Spin } from "antd";
import { Pie } from "react-chartjs-2";
import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Chart } from "chart.js";
import PieChart from "./PieChart";

export default function SectorWisePlacementGraph({ chartData, sector, count }) {
  const data = {
    labels: sector,
    data: count,
    datasets: [
      {
        data: count,

        backgroundColor: [
          "#FF9292",
          "#36A2EB",
          "#FFDAAE",
          "#A0F799",
          "#FFCACA",
          "#B8B2FF",
          "#FF9FF0",
        ],
        hoverBackgroundColor: [
          "#FF9292",
          "#36A2EB",
          "#FFDAAE",
          "#A0F799",
          "#FFCACA",
          "#B8B2FF",
          "#FF9FF0",
        ],
      },
    ],
  };
  const emptyData = {
    labels: [],
    datasets: [
      {
        data: [1], // Any non-zero value for an empty dataset
        backgroundColor: ["#CCCCCC"],
        hoverBackgroundColor: ["#CCCCCC"],
      },
    ],
  };
  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: true,
        boxWidth: "300px",

        position: "right",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          fontColor: "black",
          fontFamily: "DM Sans",
          fontSize: 20,
          fontStyle: "bold",
          padding: 16, // Adjust the padding for the legend
          // generateLabels: function (chart) {
          //   // Get the default labels
          //   var originalLabels =
          //     Chart.overrides.pie.plugins.legend.labels.generateLabels(chart);

          //   // Add custom text to each label
          //   // originalLabels.forEach(function (label) {
          //   //   label.text += " " + count[0];
          //   //   label.text += " student(s)";
          //   // });
          //   var middleIndex = Math.ceil(originalLabels.length / 2);

          //   // Split the labels into two columns
          //   var firstColumn = originalLabels.slice(0, middleIndex);
          //   var secondColumn = originalLabels.slice(middleIndex);

          //   // Combine the two columns in the desired order
          //   var modifiedLabels = firstColumn.reduce(function (
          //     acc,
          //     label,
          //     index
          //   ) {
          //     acc.push(label, secondColumn[index]);
          //     return acc;
          //   },
          //   []);

          //   return modifiedLabels;
          // },
        },
        // Custom function to display three labels in one column
        // generateLabels: function (chart) {
        //   const original =
        //     Chart.overrides.pie.plugins.legend.labels.generateLabels(chart);
        //   const labelsPerColumn = 3;
        //   const rows = Math.ceil(original.length / labelsPerColumn);
        //   const newLabels = [];

        //   for (let i = 0; i < rows; i++) {
        //     const rowLabels = original.slice(
        //       i * labelsPerColumn,

        //       (i + 1) * labelsPerColumn
        //     );
        //     newLabels.push(rowLabels);
        //   }

        //   return newLabels.flat(); // Return a flat array of labels
        // },
      },
      datalabels: {
        display: function (context) {
          return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
        },
        labels: {
          value: {
            color: "black",
          },
        },
      },
    },
  };

  const [yearplace, setYearplace] = React.useState(10);
  const handleChange = (event) => {
    setYearplace(event.target.value);
  };
  return (
    <div className="mt-[18px] bg-white px-4 py-4 rounded-lg flex flex-col">
      <div className="flex flex-col gap-y-[17px] h-[78px] ">
        <div className="flex justify-between items-center">
          <h1 className="text-left pt-4 pb-6 pl-4 text-lg md:text-4xl font-bold text-black">
            Placements across Departments
          </h1>
          <Select
            className="h-[36px] border-[1px] border-[#CCCCCC] rounded-full w-[97px]"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={yearplace}
            label="Select Year"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>2024</MenuItem>
            <MenuItem value={20}>2023</MenuItem>
            <MenuItem value={30}>2022</MenuItem>
          </Select>
        </div>
      </div>

      {chartData == 0 ? (
        <div
          className="flex-grow flex justify-center"
          style={{ height: "350px" }}
        >
          {/* Render the Pie chart with hardcoded empty data */}
          <PieChart chartData={emptyData} />
        </div>
      ) : (
        <div
          className="flex-grow flex justify-center"
          style={{ height: "350px" }}
        >
          <PieChart chartData={data} />
        </div>
      )}
      {/* <div className="h-[300px] w-[300px]">
        <div className="flex">
          <div className="h-[181px] w-[181px] rounded-full bg-[#B8B2FF] flex justify-center items-center">
            <p className="text-white font-[700] text-[27px]">32%</p>
          </div>
          <div className="ml-[-40px]">
            <div className="h-[128px] w-[128px] rounded-full bg-[#FFDAAE] mt-[-30px] border-white border-[3px] flex justify-center items-center">
              <p className="text-white font-[700] text-[27px]">40%</p>
            </div>
            <div className="h-[85px] w-[85px] rounded-full bg-[#FF9292] mt-[-30px] border-white border-[3px] flex justify-center items-center">
              <p className="text-white font-[700] text-[18px]">20%</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

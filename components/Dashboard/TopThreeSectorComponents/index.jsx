// src/RadarChart.js
import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart, Legend, Tooltip } from "chart.js";
import { RadialLinearScale } from "chart.js";
import { Spin } from "antd";

Chart.register(RadialLinearScale, Legend, Tooltip);

const TopThreeSectorComponents = ({ chartData, sector, count }) => {
  const data = {
    labels: sector.slice(0, 3),
    datasets: [
      {
        label: "Top Hiring Sectors",
        backgroundColor: "rgba(0, 100, 0, 1)",
        borderColor: "rgba(0, 100, 0, 1)",
        pointBackgroundColor: "rgba(0, 100, 0, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(0, 100, 0, 1)",
        data: count.slice(0, 3),
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true, // Set to true to enable tooltips
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    // Add other chart options as needed
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white mt-4 px-4 py-4 flex flex-col rounded-lg">
      <h1 className="text-left pt-4 mb-6 pl-4 text-4xl font-bold text-black">
        Top Hiring Sectors
      </h1>
      {chartData == 0 ? (
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold text-black">No data to display</h1>
        </div>
      ) : (
        <div>
          <Radar data={data} width={350} height={350} options={options} />
        </div>
      )}
    </div>
  );
};

export default TopThreeSectorComponents;

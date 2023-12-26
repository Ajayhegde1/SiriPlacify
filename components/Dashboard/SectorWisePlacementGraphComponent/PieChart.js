import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Legend from "./Legend"; // Import your Legend component

const PieChart = ({ chartData }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.log("Canvas not found");
      return;
    }

    const ctx = canvas.getContext("2d");

    // Destroy existing Chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartData) {
      const data = chartData.datasets[0].data;
      const backgroundColor = chartData.datasets[0].backgroundColor;

      // Create new Chart instance with legend disabled
      const chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              data,
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
        },
        options: {
          radius: "70%",
          plugins: {
            legend: {
              display: false, // Disable the legend
            },
          },
          onHover: (event, chartElement) => {
            // Handle tooltip logic here
          },
        },
      });

      // Save Chart instance reference for future destruction
      chartInstanceRef.current = chartInstance;
    }
  }, [chartData]);

  return (
    <div className="flex-grow flex justify-center items-center">
      <canvas ref={canvasRef} id="pieChart" width="400" height="400"></canvas>
      <Legend chartData={chartData} />
      <div id="chartjs-tooltip" style={{ display: "none" }}></div>
    </div>
  );
};

export default PieChart;

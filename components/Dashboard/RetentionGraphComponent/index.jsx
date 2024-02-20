import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Spin } from "antd";

import { getRetentionRates } from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export default function RetentionGraphComponent() {
  const [dashboardData, setDashboardData] = useState(null);
  const [years, setYears] = useState([]);
  const [retentionRates, setRetentionRates] = useState([]);

  useEffect(() => {
    getRetentionRates()
      .then((res) => {
        if (res.data.status === 200) {
          setDashboardData(res.data.data);
          let data = res.data.data;
          let years = data.map((item) => item.year);
          let retentionRates = data.map((item) => item.retentionRate);
          setYears(years);
          setRetentionRates(retentionRates);
        } else {
          // openNotification(notificationTypes.ERROR, "Error", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    labels: years,
    datasets: [
      {
        label: "Retention Rate",
        data: retentionRates,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white mt-4 p-4 h-[38vh] rounded-[6px]">
      <h2 className="text-center pt-2 pl-2 text-xl font-bold text-black mb-4">
        Student's average retention rate in companies
      </h2>
      {dashboardData === null ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : Object.keys(dashboardData).length === 0 ? (
        <div className="flex justify-center items-center">No Data To Show</div>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Spin } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getSectorTrends } from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SectorTrendGraphComponent() {
  const [data, setData] = useState(null);
  const [years, setYears] = useState(null);
  const [itHires, setItHires] = useState(null);
  const [coreHires, setCoreHires] = useState(null);

  useEffect(() => {
    getSectorTrends()
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
          let data = res.data.data;
          setYears(data.map((item) => item.year));
          setItHires(data.map((item) => item.noOfITHires));
          setCoreHires(data.map((item) => item.noOfCoreHires));
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Core sector",
        data: coreHires,
        backgroundColor: "#E0C6FD",
      },
      {
        label: "IT & ITeS",
        data: itHires,
        backgroundColor: "#FFB7D1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-10 mb-5 bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg md:text-4xl font-bold text-left ml-6 mt-5 mb-2 md:mb-10">
        Sector wise placement growth/trend
      </h2>
      {data === null ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : Object.keys(data).length === 0 ? (
        <div className="flex justify-center items-center">No Data To Show</div>
      ) : (
        <div className="mt-4" style={{ height: "450px" }}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}

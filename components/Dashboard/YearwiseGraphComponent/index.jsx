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
import { useState, useEffect } from "react";
import { getPlacementTrends } from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";
import { Spin } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function YearwiseGraphComponent() {
  const [data, setData] = useState(null);
  const [years, setYears] = useState(null);
  const [ppos, setPpos] = useState(null);
  const [internships, setInternships] = useState(null);
  const [offers, setOffers] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    getPlacementTrends()
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
          let data = res.data.data.reverse();
          // set years from the array of objects with year attribute
          setYears(data.map((item) => item.year));

          setInternships(data.map((item) => item.InternshipOffers));
          setPpos(data.map((item) => item.PPO));
          setOffers(data.map((item) => item.totalOffers));
          setCompanies(data.map((item) => item.companiesVisited));
          setStudents(data.map((item) => item.studentsRegistered));
        } else {
          // openNotification(notificationTypes.ERROR, "Error", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        // openNotification(notificationTypes.ERROR, "Error", "No data to show");
      });
  }, []);

  const chartData = {
    labels: years,

    datasets: [
      {
        label: "PPO's",
        data: ppos,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Students with Internship",
        data: internships,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Offers rolled out",
        data: offers,
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
      {
        label: "Companies Visited",
        data: companies,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Students Registered",
        data: students,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
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
        Placement growth/trend
      </h2>
      {data === null ? (
        <Spin size="large" />
      ) : Object.keys(data).length === 0 ? (
        <h2 className="text-lg md:text-2xl font-bold text-center mt-5 mb-2 md:mb-10">
          No data to show
        </h2>
      ) : (
        <div className="mt-4" style={{ height: "450px" }}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}

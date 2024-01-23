import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  getTPODashboard,
  getSectorTrend,
  getStudents,
} from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";

import Sidebar from "@/components/SideBar";
import DocHeader from "@/components/DocHeader";
import SalaryStatsComponents from "@/components/Dashboard/SalaryStatsComponents";
import BasicStatsComponents from "@/components/Dashboard/BasicStatsComponents";
import TypesOfOfferComponents from "@/components/Dashboard/TypesOfOffersComponents";
import PlacedGraphComponents from "@/components/Dashboard/PlacedGraphComponents";
import RetentionGraphComponent from "@/components/Dashboard/RetentionGraphComponent";
import SectorWisePlacementGraph from "@/components/Dashboard/SectorWisePlacementGraphComponent";
import TopThreeSectorComponents from "@/components/Dashboard/TopThreeSectorComponents";
import StudentStatsComponent from "@/components/Dashboard/StudentStatsComponent";
import YearwiseGraphComponent from "@/components/Dashboard/YearwiseGraphComponent";
import SectorTrendGraphComponent from "@/components/Dashboard/SectorTrendGraphComponent";
import TopRecruitersComponent from "@/components/Dashboard/TopRecruitersComponent";
import AchievementCarousel from "@/components/Dashboard/AchievementCarousel/Index";
import BranchWiseLineGraph from "@/components/Dashboard/BranchWiseLineGraph";
import { BranchWiseStatistics } from "@/components/BranchWiseStatistics";
import { TopBar } from "@/components/TopBar";

export default function College() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [sector, setSector] = useState([]);
  const [count, setCount] = useState([]);

  const user = useSelector((state) => state.user);
  useEffect(() => {
    getStudents()
      .then((res) => {
        if (res.data.status === 200) {
          setStudentData(res.data.data);
        } else {
          // openNotification(
          //   notificationTypes.ERROR,
          //   "Error",
          //   "Error while fetching dashboard data"
          // );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(studentData);
  useEffect(() => {
    getTPODashboard()
      .then((res) => {
        if (res.data.status === 200) {
          setDashboardData(res.data.data);
        } else {
          // openNotification(
          //   notificationTypes.ERROR,
          //   "Error",
          //   "Error while fetching dashboard data"
          // );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSectorTrend()
      .then((res) => {
        if (res.data.status === 200) {
          let data = res.data.data;
          let sectorCounts = data.reduce((countDict, sector) => {
            countDict[sector] = (countDict[sector] || 0) + 1;
            return countDict;
          }, {});
          // sort sectorCounts by value and store in sectorCounts
          sectorCounts = Object.fromEntries(
            Object.entries(sectorCounts).sort(([, a], [, b]) => b - a)
          );
          setSector(Object.keys(sectorCounts));
          setCount(Object.values(sectorCounts));
          setChartData(data);
        } else {
          // openNotification(notificationTypes.ERROR, "Error", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-gray-200">
      <TopBar sidebar={sidebarOpen} />
      <DocHeader DocTitle="Dashboard" />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={1}
      />
      <main class={`dashboard ${sidebarOpen ? "active" : ""}`}>
        <div className="min-h-screen pt-4 md:py-10 px-4 md:px-6 lg:p-10">
          <div className="pb-4 pt-16">
            <h1 className="text-center md:text-left pt-6 pb-4 text-3xl md:text-6xl font-Heading font-bold text-black">
              Dashboard
            </h1>
            <p className="text-center md:text-left text-base md:text-xl text-gray-500 font-medium font-Heading ml-1">
              Welcome, {user === null ? " " : user.username}
            </p>
          </div>
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-2 md:gap-4 2xl:gap-8">
            <div className="col-span-1 2xl:col-span-3">
              <BasicStatsComponents dashboardData={dashboardData} />
            </div>
            <div className="col-span-1 2xl:col-span-2">
              <PlacedGraphComponents
                studentData={studentData}
                dashboardData={dashboardData}
                sideBar={sidebarOpen}
                noOfPlacedStudents={
                  dashboardData === null
                    ? 0
                    : parseInt(dashboardData.noOfStudentsPlaced)
                }
                noOfStudents={
                  dashboardData === null
                    ? 0
                    : parseInt(dashboardData.noOfGradStudents) -
                      parseInt(dashboardData.noOfStudentsPlaced)
                }
              />
            </div>
          </div>
          <div className="mb-2 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-2 md:gap-4 2xl:gap-8">
            <div className="col-span-1 2xl:col-span-3">
              <SalaryStatsComponents />
              <TypesOfOfferComponents />
            </div>
            <div className="col-span-1 2xl:col-span-2">
              <RetentionGraphComponent />
            </div>
          </div>
          <div className="pb-6 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-2 md:gap-4 2xl:gap-8">
            <div className="col-span-1 2xl:col-span-3">
              <SectorWisePlacementGraph
                chartData={chartData}
                sector={sector}
                count={count}
              />
            </div>
            <div className="col-span-1 2xl:col-span-2">
              <TopThreeSectorComponents
                chartData={chartData}
                sector={sector}
                count={count}
              />
            </div>
          </div>
          {/* <BranchWiseStatistics /> */}
          <YearwiseGraphComponent />
          <SectorTrendGraphComponent />
          <BranchWiseLineGraph />
          <AchievementCarousel />
        </div>
      </main>
    </div>
  );
}

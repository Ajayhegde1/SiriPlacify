import { getSalaryStats } from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";

import { useState, useEffect } from "react";

export default function SalaryStatsComponents() {
  const [salaryStats, setSalaryStats] = useState([]);

  // useEffect(() => {
  //   getSalaryStats()
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         setSalaryStats(res.data.data);
  //       } else {
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  const hardcodevalues = [
    { id: 1, value: 12, title: "Average" },
    { id: 2, value: 8, tite: "Median" },
    { id: 3, value: 25, title: "Highest" },
  ];
  return (
    <div className="mt-4 mb-6 p-4 bg-customOrange rounded-lg">
      <h1 className="text-left pt-2 text-lg font-semibold text-black mb-4">
        Salary package offered
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        <div className={`flex gap-4 border-r-$ md:border-r-2 border-black`}>
          <h1
            className={`text-xl md:text-3xl text-black font-bold $
         `}
          >
            12
          </h1>
          <div>
            <p>Average</p>
            <p className="text-sm text-black font-semibold">
              (Per annum – in lakh)
            </p>
          </div>
        </div>
        <div className={`flex gap-4 border-r-$ md:border-r-2 border-black`}>
          <h1
            className={`text-xl md:text-3xl text-black font-bold $
         `}
          >
            8
          </h1>
          <div>
            <p>Median</p>
            <p className="text-sm text-black font-semibold">
              (Per annum – in lakh)
            </p>
          </div>
        </div>
        <div className={`flex gap-4 border-r-$ md:border-r-2 border-black`}>
          <h1
            className={`text-xl md:text-3xl text-black font-bold $
         `}
          >
            25
          </h1>
          <div>
            <p>Highest</p>
            <p className="text-sm text-black font-semibold">
              (Per annum – in lakh)
            </p>
          </div>
        </div>
      </div>
      {/* {salaryStats !== null || Object?.keys(salaryStats).length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          {Object.entries(salaryStats).map(([key, value]) => (
            <div
              key={key}
              className={`flex gap-4 border-r-${
                key === "medianPackage" ? "0" : "2"
              } md:border-r-2 border-black`}
            >
              <h1
                className={`text-xl md:text-3xl text-black font-bold ${
                  key === "medianPackage" ? "mr-2" : ""
                }`}
              >
                {value}
              </h1>
              <div className={`pr-${key === "medianPackage" ? "2" : "4"}`}>
                <p className="text-md text-black font-semibold">
                  {key === "meanPackage"
                    ? "Average"
                    : key === "medianPackage"
                    ? "Median"
                    : "Highest"}
                </p>
                <p className="text-sm text-black font-semibold">
                  (Per annum – in lakh)
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          {Object.entries(salaryStats).map(([key, value]) => (
            <div
              key={key}
              className={`flex gap-4 border-r-${
                key === "medianPackage" ? "0" : "2"
              } md:border-r-2 border-black`}
            >
              <h1
                className={`text-xl md:text-3xl text-black font-bold ${
                  key === "medianPackage" ? "mr-2" : ""
                }`}
              >
                No Data Available
              </h1>
              <div className={`pr-${key === "medianPackage" ? "2" : "4"}`}>
                <p className="text-md text-black font-semibold">
                  {key === "meanPackage"
                    ? "Average"
                    : key === "medianPackage"
                    ? "Median"
                    : "Highest"}
                </p>
                <p className="text-sm text-black font-semibold">(Per annum)</p>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

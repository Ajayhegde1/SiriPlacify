import { useState, useEffect } from "react";

import StonksUpComponent from "@/components/Dashboard/StonksUpComponent";
import { Spin } from "antd";

export default function BasicStatsComponents({ dashboardData }) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8">
      <StonksUpComponent
        title="Current NIRF ranking"
        count={5}
        stonksType={1}
      />
      {dashboardData === null ? (
        <Spin size="large" />
      ) : Object.keys(dashboardData).length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <>
          <StonksUpComponent
            title="Number of students graduating"
            count={dashboardData.noOfGradStudents}
            stonksType={2}
          />
          <StonksUpComponent
            title="Number of students registered"
            count={dashboardData.noOfRegisteredStudents}
            stonksType={2}
          />
          <StonksUpComponent
            title="Number of students placed"
            count={dashboardData.noOfStudentsPlaced}
            stonksType={2}
          />
          <StonksUpComponent
            title="Number of companies visited"
            count={dashboardData.noOfCompanies}
            stonksType={2}
          />
          <StonksUpComponent
            title="Number of offers rolled out"
            count={dashboardData.noOfOffers}
            stonksType={2}
          />
        </>
      )}
    </div>
  );
}

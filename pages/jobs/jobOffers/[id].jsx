import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Sidebar from "@/components/SideBar";
import DocHeader from "@/components/DocHeader";

import BasicJobInfo from "@/components/BasicJobInfo";

import appleLogo from "@/public/appleLogo.png";
import JobDesc from "@/components/JobDesc";
import ModeOfSelection from "@/components/ModeOfSelection";
import CompanyContact from "@/components/CompanyContact";
import ApplicableCourses from "@/components/ApplicableCourses";

import { getJob } from "@/redux/Sagas/requests/features";
import { routes } from "@/constants/routes";

import { notificationTypes, openNotification } from "@/utils/notifications";

export default function JobOffers() {
  const router = useRouter();

  const user = useSelector((state) => state.user);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [job, setJob] = useState({});
  const [dept, setDept] = useState([]);
  const [jobSector, setJobSector] = [];

  const { id } = router.query;

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND);
    } else if (user !== null) {
      if (user.accType !== "0") {
        router.push(routes.NOTFOUND);
      } else {
        if (typeof id !== "undefined") {
          getJob(id).then((res) => {
            if (res.data.status === 200) {
              setJob(res.data.data);
              if (
                typeof res.data.data.jobDept !== "undefined" &&
                res.data.data.jobDept !== null &&
                res.data.data.jobDept.length > 0
              ) {
                let deet = res.data.data.jobDept;
                deet = deet.map((department) => {
                  return {
                    value: department.id,
                    label: department.depName,
                  };
                });
                setDept(deet);
              }
              if (
                typeof res.data.data.jobSector !== "undefined" &&
                res.data.data.jobSector !== null &&
                res.data.data.jobSector.length > 0
              ) {
                let sectors = res.data.data.jobSector;
                sectors = sectors.map((sector) => {
                  return {
                    value: sector.id,
                    label: sector.sectorName,
                  };
                });
                // setJobSector(sectors)
              }
            } else if (res.data.status === 423) {
              openNotification(
                notificationTypes.ERROR,
                "Error",
                "Job ID needs to be defined"
              );
            } else if (res.data.status === 424) {
              openNotification(
                notificationTypes.ERROR,
                "Error",
                "Job ID can not be empty"
              );
            } else if (res.data.status === 500) {
              openNotification(
                notificationTypes.ERROR,
                "Error",
                "Unable to get job"
              );
            }
          });
          //.catch((err) => {
          // openNotification(
          //   notificationTypes.ERROR,
          //   'Error'
          // )
          //})
        }
      }
    }
  }, [id]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <DocHeader DocTitle="Jobs" />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={2}
      />
      <main class={`dashboard ${sidebarOpen ? "active" : ""}`}>
        <p className="pt-14 ml-3 md:ml-6 mb-12 font-SubHeading text-base font-normal">
          <Link href="/jobs">
            <span className="text-gray-500">Home</span>
          </Link>{" "}
          {">"} Product Designer
        </p>
        {job === null ? (
          <div>Loading</div>
        ) : Object.keys(job).length === 0 ? (
          <div>No job found</div>
        ) : (
          <BasicJobInfo
            uid={job.uid}
            logo={appleLogo}
            jobTitle={job.jobTitle}
            jobLocation={job.jobLocation}
            jobCategory={job.jobSector}
            dueDate={job.dueDate}
          />
        )}
        <div className="mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg">
          {job === null ? (
            <div>Loading</div>
          ) : Object.keys(job).length === 0 ? (
            <div>No job found</div>
          ) : (
            <JobDesc
              jobID={job.uid}
              companyName={job.companyName}
              jobTitle={job.jobTitle}
              jobLocation={job.jobLocation}
              jobCTC={job.jobCTC}
              jobDesc={job.jobDescription}
              jobBond={job.jobBond}
              jobCriteria={job.jobCriteria}
              jobPosition={job.jobPositionType}
              jobSector={jobSector}
              basePay={job.basePay}
              jobDept={dept}
              variablePay={job.variablePay}
              RSU={job.RSU}
              tenthMarks={job.tenthMarks}
              twelfthMarks={job.twelfthMarks}
              UGCgpa={job.UGCgpa}
              jobSection={2}
            />
          )}
          {job === null ? (
            <div>Loading</div>
          ) : Object.keys(job).length === 0 ? (
            <div>No job found</div>
          ) : (
            <ModeOfSelection
              modeOfSelection={job.jobTestMode}
              finalDesc={job.jobFinalSelection}
            />
          )}
          {job === null ? (
            <div>Loading</div>
          ) : Object.keys(job).length === 0 ? (
            <div>No job found</div>
          ) : (
            <CompanyContact
              contactName={job.jobContactName}
              contactEmail={job.jobContactEmail}
              contactPhone={job.jobContactNumber}
            />
          )}
          {job === null ? (
            <></>
          ) : Object.keys(job).length === 0 ? (
            <div className="mt-12">
              <ApplicableCourses jobDept={[]} />
            </div>
          ) : (
            <div className="mt-12">
              <ApplicableCourses jobDept={dept} />
            </div>
          )}
        </div>
        <br />
        <br />
      </main>
    </div>
  );
}

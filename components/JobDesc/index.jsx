import { useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import Image from "next/image";
import edit from "../../public/edit.png";
import {
  getJobDescFile,
  uploadJobDescFile,
} from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";
import JobSectorSelect from "../SectorList";

export default function JobDesc({
  jobID,
  jdFile,
  companyName,
  setCompanyName,
  companyDesc,
  jobTitle,
  setJobTitle,
  jobLocation,
  setJobLocation,
  jobPosition,
  setJobPosition,
  jobSector,
  setJobSector,
  jobCTC,
  setJobCTC,
  basePay,
  setBasePay,
  variablePay,
  setVariablePay,
  RSU,
  setRSU,
  jobDesc,
  setJobDesc,
  jobBond,
  setJobBond,
  jobCriteria,
  setJobCriteria,
  tenthMarks,
  setTenthMarks,
  twelfthMarks,
  setTwelfthMarks,
  UGCgpa,
  setUGCgpa,
  jobSection,
  isEdit = false,
  setIsEdit,
  handleEditFunction,
}) {
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  function handleSector(data) {
    setJobSector(data);
  }

  const handleGetJD = () => {
    getJobDescFile(jobID)
      .then((res) => {
        if (res.data.status === 200) {
          const url = res.data.url;
          axios
            .get(url, {
              responseType: "blob",
            })
            .then((res) => {
              const downloadUrl = window.URL.createObjectURL(res.data);
              const link = document.createElement("a");
              link.href = downloadUrl;
              link.setAttribute("download", "JD.pdf");
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(downloadUrl);
              openNotification(
                notificationTypes.SUCCESS,
                "success",
                "Resume downloaded successfully"
              );
            })
            .catch((err) => {
              openNotification(
                notificationTypes.ERROR,
                "error",
                "Error downloading resume"
              );
            });
        } else if (res.data.status === 401) {
          openNotification(
            notificationTypes.WARNING,
            "Warning",
            res.data.message
          );
        } else if (res.data.status === 423) {
          openNotification(
            notificationTypes.WARNING,
            "Warning",
            res.data.message
          );
        } else if (res.data.status === 500) {
          openNotification(notificationTypes.ERROR, "error", res.data.message);
        } else {
          openNotification(
            notificationTypes.ERROR,
            "error",
            "Something went wrong"
          );
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          "error",
          "Error",
          "Something went wrong"
        );
      });
  };

  const handleJDUpload = async () => {
    fileInputRef.current.click();
  };

  const handleJDChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadJobDescFile(file.name, jobID)
        .then((res) => {
          const url = res.data.url;

          axios
            .put(url, file, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              openNotification(
                "success",
                "Job Description uploaded successfully"
              );
            })
            .catch((err) => {
              console.log(err);
              openNotification("error", "Error uploading resume");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {jobSection === 2 && (
        <div>
          <h1 className="mt-3 pb-4 text-lg font-bold font-Heading font-bold text-black">
            Company Name: {companyName}
          </h1>
        </div>
      )}
      {isEdit ? (
        <div>
          <button
            className="cursor pointer mt-12 flex ml-auto mr-5 bg-green-900 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
            onClick={handleEditFunction}
          >
            Save Changes
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className={jobSection === 2 ? "mt-6" : "mt-2"}>
        {jobSection === 1 ? (
          <div className="flex gap-8">
            <h1 className="pb-4 border-b-2 border-gray-300 text-3xl font-bold font-Heading font-bold text-black">
              {jobTitle}
            </h1>
            <div className="cursor-pointer">
              <Image
                src={edit}
                alt="edit"
                className="mt-1 h-6 w-6"
                onClick={handleEdit}
              />
            </div>
          </div>
        ) : (
          <h1 className="pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black">
            Job details
          </h1>
        )}
        <div class="mt-4 mr-4 md:mr-20">
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Title
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4"
              }`}
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              disabled={!isEdit}
            />
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Company Name
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4"
              }`}
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              disabled={!isEdit}
            />
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Location
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4"
              }`}
              type="text"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              disabled={!isEdit && jobSection !== 1}
            />
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Position type
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4"
              }`}
              type="text"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              disabled={!isEdit}
            />
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Sector
            </div>
            <div className="col-span-5">
              <JobSectorSelect
                isEdit={isEdit}
                sector={jobSector}
                handleSector={handleSector}
              />
            </div>
          </div>
          <div className="text-gray-700 text-2xl font-bold font-Heading col-span-1 mt-8 pb-5">
            CTC Breakdown
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              CTC (in Rs.)
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 pb-5"
              }
}`}
              type="text"
              value={jobCTC}
              onChange={(e) => setJobCTC(e.target.value)}
              disabled={!isEdit}
            />
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Base Pay (in Rs.)
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 pb-5"
              }
}`}
              type="text"
              value={basePay}
              onChange={(e) => setBasePay(e.target.value)}
              disabled={!isEdit}
            />
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Variable Pay (in Rs.)
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 pb-5"
              }
}`}
              type="text"
              value={variablePay}
              onChange={(e) => setVariablePay(e.target.value)}
              disabled={!isEdit}
            />
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              RSU (in Rs.)
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 pb-5"
              }
}`}
              type="text"
              value={RSU}
              onChange={(e) => setRSU(e.target.value)}
              disabled={!isEdit}
            />
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Job description
            </div>
            <div className="col-span-1 lg:col-span-5">
              <textarea
                className={`p-2 text-gray-800 rounded  ${
                  isEdit
                    ? "my-auto w-full border-2 border-gray-300 text-gray-500 font-Heading p-4"
                    : "my-auto w-full text-gray-500 font-Heading pb-2"
                }`}
                type="text"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                disabled={!isEdit}
                rows="4"
              />
              <button
                onClick={handleGetJD}
                className="flex text-base md:text-lg h-16 md:h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 md:mt-5 rounded-xl py-2 px-2 md:px-4"
              >
                <span className="mx-auto">View JD</span>
              </button>
              {isEdit ? (
                <>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleJDChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                  <button
                    onClick={handleJDUpload}
                    className="flex text-md md:text-lg h-16 md:h-10 bg-green-500 hover:bg-green-700 text-white mt-4 font-bold rounded-xl py-2 px-4"
                  >
                    <span className="mx-auto">Upload Job Description</span>
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Bond / Service agreement details if any
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4"
              }`}
              type="text"
              value={jobBond}
              onChange={(e) => setJobBond(e.target.value)}
              disabled={!isEdit}
            />
          </div>
          <div className="text-gray-700 text-2xl font-bold font-Heading col-span-1 mt-8 pb-5">
            Criteria
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              Degree
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4"
              }`}
              type="text"
              value={jobCriteria}
              onChange={(e) => setJobCriteria(e.target.value)}
              disabled={!isEdit}
            />
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              10th Marks (in %)
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4"
              }`}
              type="text"
              value={tenthMarks}
              onChange={(e) => setTenthMarks(e.target.value)}
              disabled={!isEdit}
            />
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              12th Marks (in %)
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4"
              }`}
              type="text"
              value={twelfthMarks}
              onChange={(e) => setTwelfthMarks(e.target.value)}
              disabled={!isEdit}
            />
          </div>
          <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
            <div className="text-gray-700 font-bold font-Heading col-span-1 my-auto">
              UG Marks (/10)
            </div>
            <input
              className={` p-2 rounded text-gray-600 ${
                isEdit
                  ? "border-2 border-gray-300  text-gray-500 font-Heading col-span-1 lg:col-span-5 p-4"
                  : "text-gray-500 font-Heading col-span-1 lg:col-span-5 focus:p-4"
              }`}
              type="text"
              value={UGCgpa}
              onChange={(e) => setUGCgpa(e.target.value)}
              disabled={!isEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

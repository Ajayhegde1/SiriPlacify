import { read, utils } from "xlsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Spin } from "antd";

import UserAdditionModal from "@/components/Modal/userAdditionModal";
import Sidebar from "@/components/SideBar";
import DocHeader from "@/components/DocHeader";
import TextField from "@/components/InputComponents/TextField";
import TextArea from "@/components/InputComponents/TextArea";
import SingleSelectComponent from "@/components/InputComponents/SingleSelectComponent";
import Button from "@/components/Buttons";

import sheet from "../public/sheets.png";
import { accountType } from "@/constants/users";
import { routes } from "@/constants/routes";
import { notificationTypes, openNotification } from "@/utils/notifications";
import { GET, POST } from "@/config/api";
import { genderListUserMgmt } from "@/constants/addJobDropDowns";
import { TopBar } from "@/components/TopBar";

export default function UserManagement() {
  const router = useRouter();
  const animatedComponents = makeAnimated();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => state.user);

  const [departmentList, setDepartmentList] = useState([]);
  const [deptCollegeList, setDeptCollegeList] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [studentTenthMarks, setStudentTenthMarks] = useState();
  const [studentTwelthMarks, setStudentTwelthMarks] = useState();
  const [studentGraduationMarks, setStudentGraduationMarks] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [studentPGMarks, setStudentPGMarks] = useState();
  const [studentID, setStudentID] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [gender, setGender] = useState(genderListUserMgmt[0].value);
  const [contactNo, setContactNo] = useState("");
  const [accType, setAccType] = useState(accountType[0].value);
  const [stream, setStream] = useState({});

  useEffect(() => {
    GET("/departmentsOfCollege", { sessionID: user.sessionId })
      .then((res) => {
        if (res.data.status === 200) {
          let departments = res.data.data;
          setDeptCollegeList(res.data.data);
          departments = departments.map((department) => {
            return {
              value: department.id,
              label: department.depName,
            };
          });
          setDepartmentList(departments);
        } else {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        }
      })
      .catch((err) => {
        openNotification(notificationTypes.ERROR, "Error", err.message);
      });
  }, []);

  function sanitizeCTCInput(inputValue) {
    return inputValue.replace(/[^0-9.]/g, "");
  }

  function handleSelect(data) {
    setStream(data);
  }

  function convertToMale(str) {
    const trimmedStr = str.trim();
    const convertedStr =
      trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1);
    console.log(convertedStr);
    return convertedStr;
  }

  const handleImport = ($event) => {
    setIsLoading(true);
    const files = $event.target.files;
    console.log(files);
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          const updatedData = rows;
          console.log(updatedData);
          let isValidData = true; // Flag variable to track validation status

          updatedData.forEach((element) => {
            element.username = element.studentName;
            delete element.studentName;

            element.gender = convertToMale(element.gender);

            const marksFields = [
              "studentTenthMarks",
              "studentTwelthMarks",
              "studentUGMarks",
            ];

            for (const field of marksFields) {
              const marksValue = parseFloat(element[field]);

              if (isNaN(marksValue)) {
                setIsLoading(false);
                openNotification(
                  notificationTypes.ERROR,
                  "Error",
                  "You are missing out on marks fields. Please check your data."
                );
                isValidData = false;
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
                break;
              }
            }
          });
          console.log(updatedData);
          if (isValidData) {
            POST("/addStudents", updatedData, { sessionID: user.sessionId })
              .then((res) => {
                console.log(res);
                const status = parseInt(res.data.status);

                if (status === 200 || status === 304 || status === "ok") {
                  setIsLoading(false);
                  openNotification(
                    notificationTypes.SUCCESS,
                    "Success",
                    res.data.message
                  );
                  router.push(routes.STUDENTLIST);
                } else {
                  openNotification(
                    notificationTypes.ERROR,
                    "Error",
                    res.data.message
                  );
                  setIsLoading(false);
                  // setTimeout(() => {
                  //   window.location.reload();
                  // }, 1000);
                }
              })
              .catch((err) => {
                openNotification(
                  notificationTypes.ERROR,
                  "Please check your data. It is not in the correct format."
                );
                setIsLoading(false);
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              });
          }

          setShowModal(!showModal);
          openNotification(
            notificationTypes.SUCCESS,
            "Sucess",
            "File Uploaded Sucessfully"
          );
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUserAddition = () => {
    setIsLoading(true);
    const Data = [
      {
        email,
        accountType: accType,
        username,
        contactNo,
        studentTenthMarks: parseFloat(studentTenthMarks),
        studentTwelthMarks: parseFloat(studentTwelthMarks),
        studentUGMarks: parseFloat(studentGraduationMarks),
        studentPGMarks,
        studentId: studentID,
        userDescription,
        dept: stream.value,
        gender,
      },
    ];
    POST("/addStudents", Data, { sessionID: user.sessionId })
      .then((res) => {
        const status = parseInt(res.data.status);
        if (status === 200) {
          openNotification(
            notificationTypes.SUCCESS,
            "Sucess",
            "Student Added"
          );
          setIsLoading(false);
          router.push(routes.STUDENTLIST);
        } else {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          "Error",
          "Something went wrong, please try again later"
        );
      });
  };

  return (
    <div className="bg-gray-200">
      <TopBar sidebar={sidebarOpen} />
      <DocHeader DocTitle="User Management" />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={9}
      />
      <main class={`dashboard ${sidebarOpen ? "active" : ""}`}>
        <div className="min-h-screen pt-4 md:py-10 px-4 md:px-6 lg:p-10">
          <div className="pb-4">
            <h1 className="text-center md:text-left mb-4 ml-2 md:ml-6 pt-6 md:pt-16 text-3xl md:text-4xl font-Heading font-bold text-black">
              User Management
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="ml-2 md:ml-6 flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3"
              >
                <Image
                  src={sheet}
                  alt="Import excel sheet"
                  className="h-7 w-7 mt-1 mr-2"
                />
                <span className="my-auto">Import from excel</span>
              </button>
              {isLoading && (
                <div className="ml-5 my-auto">
                  <Spin size="large" />
                </div>
              )}
            </div>
          </div>
          <div className="ml-2 md:ml-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <TextField
              label="Email ID"
              placeholder="abc@gmail.com"
              type="email"
              value={email}
              onChangeHandler={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Student Name"
              placeholder="abc def"
              type="text"
              value={username}
              onChangeHandler={(e) => setUsername(e.target.value)}
            />
            <div className="">
              <label className="font-semibold">Type </label>
              <SingleSelectComponent
                value={accType}
                onChangeHandler={(e) => setAccType(e.target.value)}
                options={accountType}
                label="Type of the User"
              />
            </div>
          </div>
          <div className="ml-2 md:ml-6 grid grid-cols-1 gap-4">
            <div class="mt-2 mb-6">
              <label
                class="block font-semibold text-black text-md font-bold mb-1"
                for="username"
              >
                Select Stream
              </label>
              <Select
                options={departmentList}
                placeholder="Select Stream"
                value={stream}
                onChange={handleSelect}
                isSearchable
                components={animatedComponents}
                closeMenuOnSelect={false}
                isMulti={false}
              />
            </div>

            <div>
              <TextArea
                label="Student description"
                placeholder="Your message..."
                rows="4"
                value={userDescription}
                onChangeHandler={(e) => setUserDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="ml-2 md:ml-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <TextField
              label="Contact No"
              placeholder="9123123123"
              type="text"
              value={contactNo ? contactNo : ""}
              onChangeHandler={(e) => setContactNo(e.target.value)}
            />
            <TextField
              label="Student ID"
              placeholder="ABCUG123"
              type="text"
              value={studentID ? studentID : ""}
              onChangeHandler={(e) => setStudentID(e.target.value)}
            />
            <div className="mt-6">
              <SingleSelectComponent
                value={gender}
                onChangeHandler={(e) => setGender(e.target.value)}
                options={genderListUserMgmt}
                label="Select Gender"
              />
            </div>
          </div>
          <div className="ml-2 md:ml-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="col-span-1">
              <TextField
                label="Class X (/100)%"
                placeholder="93%"
                type="text"
                value={studentTenthMarks ? studentTenthMarks : ""}
                onChangeHandler={(e) =>
                  setStudentTenthMarks(sanitizeCTCInput(e.target.value))
                }
              />
            </div>
            <div className="col-span-1">
              <TextField
                label="Class XII (/100)%"
                placeholder="93%"
                type="93%"
                value={studentTwelthMarks ? studentTwelthMarks : ""}
                onChangeHandler={(e) =>
                  setStudentTwelthMarks(sanitizeCTCInput(e.target.value))
                }
              />
            </div>
            <div className="col-span-1">
              <TextField
                label="UG CGPA  (/10)"
                placeholder="93%"
                type="text"
                value={studentGraduationMarks ? studentGraduationMarks : ""}
                onChangeHandler={(e) =>
                  setStudentGraduationMarks(sanitizeCTCInput(e.target.value))
                }
              />
            </div>
            <div className="col-span-1">
              <TextField
                label="PG CGPA"
                placeholder="93 (/10)"
                type="text"
                value={studentPGMarks ? studentPGMarks : ""}
                onChangeHandler={(e) =>
                  setStudentPGMarks(sanitizeCTCInput(e.target.value))
                }
              />
            </div>
          </div>
          <div className="flex gap-6 mt-8 ml-2 md:ml-6">
            <Button onClickHandler={handleUserAddition} btnText="Add Student" />
            {isLoading && (
              <div className="my-auto">
                <Spin size="large" />
              </div>
            )}
          </div>
        </div>
      </main>
      <UserAdditionModal
        showModal={showModal}
        setShowModal={setShowModal}
        ImportExcel={handleImport}
        departmentList={deptCollegeList}
      />
    </div>
  );
}

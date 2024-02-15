import photo from "../public/photoupload.png";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Spin } from "antd";

import DocHeader from "@/components/DocHeader";
import Sidebar from "@/components/SideBar";
import TextField from "@/components/InputComponents/TextField";
import TextArea from "@/components/InputComponents/TextArea";
import Button from "@/components/Buttons";
import ChangePasswordModal from "@/components/Modal/changePassword";

import { routes } from "@/constants/routes";
import { getProfile } from "@/redux/Slices/profile";
import { updateProfile, getDepartment } from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";

export default function EditProfile() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type && file.type.startsWith("image/")) {
      setSelectedPhoto(file);

      // Read the file content and set the data URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      // You can perform upload logic here, e.g., send the photo to a server
      console.log("Uploading Photo:", file);
      // Add your upload logic here, such as using an API to handle the file
    } else {
      console.error("Invalid file selected");
    }
  };

  // const [selectedPhoto, setSelectedPhoto] = useState(null);
  // const handlePhotoChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedPhoto(file);
  //   if (selectedPhoto) {
  //     console.log("Selected Photo:", selectedPhoto);
  //   } else {
  //     console.log("No photo selected");
  //   }
  // };
  // const handleUpload = () => {
  //   // You can perform upload logic here, e.g., send the photo to a server
  // };
  const dispatch = useDispatch();
  const router = useRouter();
  const animatedComponents = makeAnimated();

  const [collegeID, setCollegeID] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeWebsite, setCollegeWebsite] = useState("");
  const [collegeLocation, setCollegeLocation] = useState("");
  const [collegeDescription, setCollegeDescription] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gradStudents, setGradStudents] = useState(0);
  const [stream, setStream] = useState({});
  const [departmentList, setDepartmentList] = useState([]);
  const [update, setUpdate] = useState("Update");
  const [isDisabled, setIsDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND);
    } else if (user !== null) {
      if (user.accType !== "0") {
        router.push(routes.NOTFOUND);
      } else {
        dispatch(getProfile());
        setEmail(user.email);
        setUsername(user.username);
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (profile !== null) {
      if (Object.keys(profile).length !== 0) {
        setCollegeID(profile.id);
        setCollegeName(profile.collegeName);
        setCollegeWebsite(profile.collegeWebsite);
        setCollegeLocation(profile.collegeLocation);
        setCollegeDescription(profile.collegeDescription);
        setContactNo(profile.contactNo);
        setGradStudents(profile.noOfGradStudents);
        let departments = profile.dept;
        departments = departments.map((department) => {
          return {
            value: department.id,
            label: department.depName,
          };
        });
        setStream(departments);
      }
    }
  }, [profile]);

  function handleSelect(data) {
    setStream(data);
  }

  useEffect(() => {
    getDepartment()
      .then((res) => {
        if (res.data.status === 200) {
          let departments = res.data.data;
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

  const updateProfileHandler = () => {
    const data = {
      collegeID,
      collegeName,
      collegeWebsite,
      collegeLocation,
      collegeDescription,
      contactNo,
      email,
      username,
      stream,
      gradStudents,
    };
    setUpdate("Updating...");
    setIsDisabled(true);

    updateProfile(data)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(
            notificationTypes.SUCCESS,
            "Success",
            res.data.message
          );
        } else if (res.data.status === 401) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else if (res.data.status === 423) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else if (res.data.status === 424) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else if (res.data.status === 425) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else if (res.data.status === 500) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else {
          openNotification(
            notificationTypes.ERROR,
            "Error",
            "Internal server error"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        openNotification(
          notificationTypes.ERROR,
          "Error",
          "Internal server error"
        );
      });
    setUpdate("Update");
    setIsDisabled(false);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <DocHeader DocTitle="Edit Profile" />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={7}
      />
      <main class={`dashboard ${sidebarOpen ? "active" : ""}`}>
        <div className="ml-10 mr-8 md:mr-20 pt-10">
          <p className="ml-3 md:ml-6 mt-2 mb-6 font-SubHeading text-base font-normal">
            <span className="text-gray-500">
              <a href={routes.TPODASHBOARD}>Dashboard</a>
            </span>{" "}
            {">"} Edit profile
          </p>
          <div className="flex gap-2">
            <h1 className="text-center md:text-left ml-2 md:ml-6 mt-6 mb-3 text-3xl md:text-4xl font-Heading font-bold text-black">
              Edit profile
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex ml-auto h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 md:mt-12 rounded-xl py-2 px-4"
            >
              Change Password
            </button>
          </div>
          {profile === null ? (
            <div>
              <Spin size="large" />
            </div>
          ) : Object.keys(profile).length === 0 ? (
            <div>No data provided</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 content-center">
                  <div className="pb-4 pl-2 md:pl-5 m-auto">
                    {/* <Image
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        width: "200px",
                      }} // Set the width property here
                      src={URL.createObjectURL(selectedPhoto)}
                      alt="students"
                    /> */}
                    {/* <div className="mt-6">
                      <label className="custom-button w-full bg-green-900 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">
                        <button
                          className="custom-button"
                          onClick={handleUpload}
                          btnText="Upload"
                        >
                          upload
                        </button>
                        <input
                          className=""
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                        ></input>
                      </label>
                    </div> */}
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex justify-center ml-[]">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Selected"
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              width: "60%",
                            }}
                          />
                        ) : (
                          <Image
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              width: "80%",
                            }}
                            src={photo}
                            alt="students"
                          />
                        )}
                      </div>
                      {/* <div className="mt-[10px] flex justify-center">
                        <label
                          className={
                            "custom-button w-[135px] text-center text-white font-medium py-2 px-4 rounded hover:bg-green-600"
                          }
                        >
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 ml-0 md:ml-6">
                    <TextField
                      label="Name of universities / colleges"
                      placeholder="Pes university"
                      type="text"
                      value={collegeName}
                      onChangeHandler={(e) => setCollegeName(e.target.value)}
                    />
                    <TextField
                      label="Account user name"
                      placeholder="TPO name"
                      type="text"
                      value={username}
                      onChangeHandler={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                      label="Website"
                      placeholder="pes.edu"
                      type="text"
                      value={collegeWebsite}
                      onChangeHandler={(e) => setCollegeWebsite(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8">
                  <div className="col-span-1 md:col-span-3">
                    <TextField
                      label="Email id"
                      placeholder="xyz.@gmail.com"
                      type="text"
                      value={email}
                      onChangeHandler={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <TextField
                      label="Contact"
                      placeholder="9090909090"
                      type="text"
                      value={contactNo}
                      onChangeHandler={(e) => setContactNo(e.target.value)}
                    />
                  </div>
                </div>
                <TextField
                  label="location"
                  placeholder="100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Bengaluru, Karnataka 560085"
                  type="text"
                  value={collegeLocation}
                  onChangeHandler={(e) => setCollegeLocation(e.target.value)}
                />
              </div>
              <div className="mr-0 md:mr-4">
                <div class="mt-2 mb-6">
                  <label
                    class="block font-Poppins text-black text-md font-bold mb-2"
                    for="username"
                  >
                    Streams
                  </label>
                  <Select
                    options={departmentList}
                    placeholder="Select Streams"
                    value={stream}
                    onChange={handleSelect}
                    isSearchable
                    components={animatedComponents}
                    closeMenuOnSelect={false}
                    isMulti
                  />
                </div>
                <TextField
                  label="Number of Graduating Students"
                  placeholder="100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Bengaluru, Karnataka 560085"
                  type="text"
                  value={gradStudents}
                  onChangeHandler={(e) => setGradStudents(e.target.value)}
                />
                <TextArea
                  label="About the universities / colleges"
                  placeholder="PES University, located in Bangalore, India is one of the country’s leading teaching and research universities.
                            The University is committed to providing “navigation for the real world” that inspires students to find their
                            true north.
                            Our students graduate with the ability to adapt to an intellectually and technologically changing
                            environment. Over the years, we have accomplished this with the participative efforts of the management,
                            staff, students and parents."
                  rows="8"
                  value={collegeDescription}
                  onChangeHandler={(e) => setCollegeDescription(e.target.value)}
                />
                <div class="mb-6">
                  <Button
                    btnText={update}
                    disabled={isDisabled}
                    onClickHandler={updateProfileHandler}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <ChangePasswordModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

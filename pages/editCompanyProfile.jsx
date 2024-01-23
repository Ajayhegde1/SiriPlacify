import photo from "../public/photoupload.png";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import DocHeader from "@/components/DocHeader";
import TextField from "@/components/InputComponents/TextField";
import TextArea from "@/components/InputComponents/TextArea";
import Button from "@/components/Buttons";
import Sidebar from "@/components/SideBar";

import { getCompanyProfile } from "@/redux/Slices/companySlice";
import { routes } from "@/constants/routes";
import { updateCompanyProfile } from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";

import ChangePasswordModal from "@/components/Modal/changePassword";
import { TopBar } from "@/components/TopBar";

export default function EditCompanyProfile() {
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

  const [companyWebsite, setCompanyWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [isValidMail, setIsValidMail] = useState(true);
  const [url, setUrl] = useState("");
  const emailRegex =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  const emailHandleChange = (e) => {
    setEmail(e.target.value);
    setIsValidMail(emailRegex.test(email));
    console.log(isValidMail);
  };
  const regexPattern =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/;

  const [isValid, setIsValid] = useState(true);

  const websiteHandleChange = (e) => {
    setCompanyWebsite(e.target.value);

    setIsValid(regexPattern.test(companyWebsite));
    // console.log(isValid);
  };

  // Adjust the delay (in milliseconds) based on your preference

  // console.log(companyWebsite);
  const dispatch = useDispatch();
  const router = useRouter();

  const [userName, setUserName] = useState("");

  const [companyName, setCompanyName] = useState("");

  const [companyContactNo, setCompanyContactNo] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [plannedHires, setPlannedHires] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profile = useSelector((state) => state.companyProfile);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND);
    } else if (user !== null) {
      if (user.accType !== "2") {
        router.push(routes.NOTFOUND);
      } else {
        dispatch(getCompanyProfile());
        setUserName(user.username);
        setEmail(user.email);
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (profile !== null) {
      if (Object.keys(profile).length !== 0) {
        setCompanyName(profile.companyName);
        setCompanyWebsite(profile.companyWebsite);
        setCompanyContactNo(profile.companyContactNo);
        setCompanyLocation(profile.companyLocation);
        setCompanyDescription(profile.companyDescription);
        setPlannedHires(profile.plannedHires);
      }
    }
  }, [profile]);

  const updateProfile = () => {
    setIsDisabled(true);
    const data = {
      userName,
      email,
      companyName,
      companyWebsite,
      companyContactNo,
      companyLocation,
      companyDescription,
      plannedHires,
    };

    updateCompanyProfile(data)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(
            notificationTypes.SUCCESS,
            "Success",
            "Profile updated successfully"
          );
        } else if (res.data.status === 401) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else if (res.data.status === 424) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else if (res.data.status === 425) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else if (res.data.status === 426) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else if (res.data.status === 427) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        } else if (res.data.status === 500) {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          "Error",
          "Internal server error"
        );
      });

    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  };

  return (
    <div>
      <DocHeader DocTitle="Edit Profile" />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={7}
      />
      <main class={`dashboard ${sidebarOpen ? "active" : ""}`}>
        <div className="ml-10 mr-8 md:mr-20 pt-10">
          <p className="ml-3 md:ml-6 mb-4 font-SubHeading text-base font-normal">
            <span className="text-gray-500">
              <a href={routes.COMPANYDASHBOARD}>Dashboard</a>
            </span>{" "}
            {">"} Edit profile
          </p>
          <div className="flex gap-2">
            <h1 className="text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-12 text-3xl md:text-4xl font-Heading font-bold text-black">
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
                      <div className="mt-[10px] flex justify-center">
                        <label
                          className={
                            "custom-button w-[135px] bg-green-500 text-center text-white font-medium py-2 px-4 rounded hover:bg-green-600"
                          }
                        >
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 ml-0 md:ml-6">
                    <TextField
                      label="Name of the Company "
                      placeholder="Pes university"
                      type="text"
                      value={companyName}
                      onChangeHandler={(e) => setCompanyName(e.target.value)}
                    />
                    <TextField
                      label="Account user name"
                      placeholder="TPO name"
                      type="text"
                      value={userName}
                      onChangeHandler={(e) => setUserName(e.target.value)}
                    />
                    <div
                      className={
                        !isValid
                          ? "mt-[-20px] absolute text-red-500 font-[500]"
                          : "hidden"
                      }
                    >
                      Please Enter Correct Website URL
                    </div>
                    <TextField
                      label="Website"
                      placeholder="pes.edu"
                      type="text"
                      value={companyWebsite}
                      onChangeHandler={websiteHandleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8">
                  <div
                    className={
                      !isValidMail
                        ? "mt-[-20px] absolute text-red-500 font-[500]"
                        : "hidden"
                    }
                  >
                    Please Enter Correct Email
                  </div>

                  <div className="col-span-1 md:col-span-3">
                    <TextField
                      label="Email id"
                      placeholder="xyz.@gmail.com"
                      type="text"
                      value={email}
                      onChangeHandler={emailHandleChange}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <TextField
                      label="Contact"
                      placeholder="9090909090"
                      type="text"
                      value={companyContactNo}
                      onChangeHandler={(e) =>
                        setCompanyContactNo(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="mr-0 md:mr-4">
                <TextField
                  label="Planned Hires"
                  placeholder="123"
                  type="text"
                  value={plannedHires}
                  onChangeHandler={(e) => setPlannedHires(e.target.value)}
                />
                <TextField
                  label="Location"
                  placeholder="100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Bengaluru, Karnataka 560085"
                  type="text"
                  value={companyLocation}
                  onChangeHandler={(e) => setCompanyLocation(e.target.value)}
                />
                <TextArea
                  label="About the company"
                  placeholder="PES University, located in Bangalore, India is one of the country’s leading teaching and research universities.
                            The University is committed to providing “navigation for the real world” that inspires students to find their
                            true north.
                            Our students graduate with the ability to adapt to an intellectually and technologically changing
                            environment. Over the years, we have accomplished this with the participative efforts of the management,
                            staff, students and parents."
                  rows="4"
                  value={companyDescription}
                  onChangeHandler={(e) => setCompanyDescription(e.target.value)}
                />
                <div class="mb-6">
                  <Button
                    btnText={isDisabled ? "Updating..." : "Update"}
                    disabled={isDisabled}
                    onClickHandler={updateProfile}
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

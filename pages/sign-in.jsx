import student from "../public/students.png";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import React from "react";
import DocHeader from "@/components/DocHeader";
import TextField from "@/components/InputComponents/TextField";
import Button from "@/components/Buttons";
import ForgotPasswordModal from "@/components/Modal/ForgotPasswordModal";

import { signIn } from "@/redux/Slices/userSlice";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { notificationTypes, openNotification } from "@/utils/notifications";
import { routes } from "@/constants/routes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import photo1 from "@/public/chintu.png";
import styles from "@/components/ContactSection/helper.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CollegeProfile() {
  const [isCollege, setIsCollege] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const handleCollegeClick = () => {
    setIsCompany(false);
    setIsCollege(true);
  };
  const handleCompanyClick = () => {
    setIsCompany(true);
    setIsCollege(false);
  };
  const handleclick = () => {
    openNotification(
      notificationTypes.SUCCESS,
      <></>,
      <p className="font-[600] text-[16px]">Details Submitted Succesfully!</p>
    );
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [btnText, setBtnText] = useState("Sign In");
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (user) {
      if (user.accType === "0") {
        router.push(routes.TPODASHBOARD);
      } else if (user.accType === "1") {
        router.push(routes.JOBS);
      } else if (user.accType === "2") {
        router.push(routes.COMPANYDASHBOARD);
      } else {
        openNotification(notificationTypes.ERROR, "Error", "Unauthorized User");
      }
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signIn({ email, password }));
    setLoading(false);
  };

  return (
    <div>
      <DocHeader DocTitle="Sign In" />
      <div className="ml-5 lg:ml-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 xl:gap-6 2xl:gap-12">
        <div className="hidden lg:block min-h-screen">
          <Image className="h-full w-full" src={student} alt="students" />
        </div>
        <div className="mt-4 py-4 md:py-12 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12 2xl:mr-16">
          <h1 className="text-center md:text-left mb-10 mt-12 text-3xl md:text-4xl font-Heading font-semibold text-green-800">
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email ID"
              placeholder="sample@gmail.com"
              type="text"
              value={email}
              onChangeHandler={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              placeholder="********"
              type="password"
              value={password}
              onChangeHandler={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex gap-2">
              {isLoading ? (
                <Spin size="large" />
              ) : (
                <Button
                  type="submit"
                  onClickHandler={handleLogin}
                  disabled={isBtnDisabled}
                  btnText={btnText}
                />
              )}
            </div>
          </form>
          <div className="cursor-pointer mt-6 text-left">
            <div onClick={() => setShowModal(!showModal)}>
              <p className="text-base font-medium">
                <span className="text-red-700 hover:text-red-500 hover:border-b-2 hover:border-red-500">
                  Forgot Password?
                </span>
              </p>
            </div>
          </div>
          <div className="border-2 border-gray-300 shadow-lg rounded-lg mt-6 p-8">
            <p className="font-bold text-center md:text-left text-sm md:text-base font-Body text-black">
              New to Placify?
            </p>

            <div className="mt-5 h-[60px] text-center bg-customLightBlue rounded-lg hover:bg-blue-100">
              <button
                onClick={handleOpen}
                className="h-full w-full text-blue-400 text-blue font-bold font-heading"
              >
                Register for demo
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div>
                    <h1 className="text-center pt-2 mb-6 text-2xl lg:text-3xl 2xl:text-5xl font-Heading font-semibold drop-shadow underline text-green-800">
                      Contact Us
                    </h1>
                    <div className="mx-auto flex flex-col gap-3">
                      <div>
                        <label className="block font-medium mb-2 text-base font-SubHeading font-medium text-black">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                        />
                      </div>
                      <div>
                        <label className="block font-medium mb-2 text-base font-SubHeading font-medium text-black">
                          Designation:
                        </label>
                        <input
                          type="text"
                          placeholder="Designation"
                          className="w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-2 text-base font-SubHeading font-medium text-black">
                          E-mail:
                        </label>
                        <input
                          type="text"
                          placeholder="Email"
                          className="w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                        />
                      </div>
                      <div>
                        <label className="block font-medium mb-2 text-base font-SubHeading font-medium text-black">
                          Phone No:
                        </label>
                        <input
                          type="text"
                          placeholder="Phone"
                          className="w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                        />
                      </div>
                      <div>
                        <label className="block font-medium mb-2 text-base font-SubHeading font-medium text-black">
                          Role :
                        </label>
                        <div className="flex flex-row gap-2">
                          <input
                            onClick={handleCollegeClick}
                            type="radio"
                            name="opt-1"
                            id="1"
                            className={styles.role}
                          />
                          <label className={styles.colorlabel} for="1">
                            College
                          </label>
                          <input
                            onClick={handleCompanyClick}
                            type="radio"
                            name="opt-1"
                            id="2"
                            className={styles.role}
                          />
                          <label className={styles.colorlabel} for="2">
                            Company
                          </label>
                        </div>
                      </div>
                      {isCollege ? (
                        <div>
                          <label className="mb-2 text-base font-SubHeading font-medium text-black">
                            Enter College Name :
                          </label>
                          <input
                            type="text"
                            placeholder="College name"
                            className="w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                          />{" "}
                        </div>
                      ) : (
                        ""
                      )}
                      {isCompany ? (
                        <div>
                          <label className="mb-2 text-base font-SubHeading font-medium text-black">
                            Enter Company Name :
                          </label>
                          <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                          />{" "}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <button
                      onClick={handleclick}
                      className=" my-4 w-full text-center hover:shadow-lg   bg-green-800 text-white font-SubHeading font-medium text-base px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
            {/* <div className="mt-5 text-center bg-customLightBlue p-5 rounded-lg hover:bg-blue-100">
                <p className="text-blue-400 text-blue font-bold font-heading">
                  Register for demo{" "}
                </p>
              </div> */}
          </div>
        </div>
      </div>
      <ForgotPasswordModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

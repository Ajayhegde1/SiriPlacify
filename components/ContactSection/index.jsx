import Image from "next/image";
import photo1 from "@/public/chintu.png";
import styles from "./helper.module.css";
import { notificationTypes, openNotification } from "@/utils/notifications";
import { useState } from "react";
export default function ContactSection() {
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
  };
  return (
    <div className="mt-6 md:mt-20 mb-6">
      <form
        action="https://formsubmit.co/4fa7db1bbc2d29fad92396564ef8b71f"
        method="POST"
        target="_blank"
      >
        <div className="mt-20 mx-6 md:mx-12 lg:mx-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="hidden lg:block pl-6">
            <Image
              src={photo1}
              alt="photo1"
              className="lg:mt-28 xl:mt-36 2xl:mt-44"
            />
          </div>
          <div>
            <h1 className="text-center mt-8 lg:mt-16 xl:mt-24 mb-6 text-2xl lg:text-3xl 2xl:text-5xl font-Heading font-semibolg drop-shadow underline text-green-800">
              Contact Us
            </h1>
            <div className="mx-auto flex flex-col gap-3">
              <div>
                <label className="block font-medium mb-2 text-base font-SubHeading font-medium text-black">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                  placeholder="Full Name"
                  required
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
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-base font-SubHeading font-medium text-black">
                  E-mail:
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-base font-SubHeading font-medium text-black">
                  Phone No:
                </label>
                <input
                  type="number"
                  name="PhoneNumber"
                  placeholder="Phone"
                  className="form-control w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                  required
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
                    name="Role"
                    id="1"
                    className={`form-control ${styles.role}`}
                    required
                  />
                  <label className={styles.colorlabel} for="1">
                    College
                  </label>
                  <input
                    onClick={handleCompanyClick}
                    type="radio"
                    name="Role"
                    id="2"
                    className={`form-control ${styles.role}`}
                    required
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
                    name="College Name"
                    placeholder="College Name"
                    className="form-control w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                    required
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
                    name="Company Name"
                    placeholder="Company Name"
                    className="form-control w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4"
                    required
                  />{" "}
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              onClick={handleclick}
              className=" my-4 w-full text-center hover:shadow-lg   bg-green-800 text-white font-SubHeading font-medium text-base px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

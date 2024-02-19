import student from "../public/students.png";
import photo from "../public/photoupload.png";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import DocHeader from "@/components/DocHeader";
import TextField from "@/components/InputComponents/TextField";
import TextArea from "@/components/InputComponents/TextArea";
import Button from "@/components/Buttons";

import { addCompanyProfile } from "@/redux/Slices/companySlice";
import { routes } from "@/constants/routes";

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user);

  const [btnText, setBtnText] = useState("Save");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [emailID, setEmailID] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [plannedHires, setPlannedHires] = useState("");

  const handleCompanyProfile = () => {
    const Data = {
      name: companyName,
      username,
      website,
      location,
      emailID,
      contactNo,
      companyDescription,
      plannedHires,
    };
    setBtnText("Saving...");
    dispatch(addCompanyProfile(Data));
  };

  useEffect(() => {
    if (
      username.length > 0 &&
      companyName.length > 0 &&
      website.length > 0 &&
      location.length > 0 &&
      emailID.length > 0 &&
      contactNo.length > 0 &&
      companyDescription.length > 0
    ) {
      setIsBtnDisabled(false);
    }
  }, [
    username,
    companyName,
    website,
    location,
    emailID,
    contactNo,
    companyDescription,
  ]);

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND);
    } else if (user !== null) {
      if (user.accType !== "2") {
        router.push(routes.NOTFOUND);
      } else {
        if (user.signUpStatus === "1") {
          router.push(routes.COMPANYDASHBOARD);
        }
      }
    }
  }, [user]);

  return (
    <div>
      <DocHeader DocTitle="Company Profile" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 xl:gap-6 2xl:gap-12 content-center">
        <div className="mt-4 py-4 md:py-12 pl-2 md:pl-6 xl:pl-8 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12 2xl:mr-16">
          <h1 className="text-center md:text-left mb-10 ml-3 md:ml-6 mt-12 text-3xl md:text-4xl font-Heading font-medium text-black">
            Complete your profile
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 content-center">
            <div className="col-span-1 md:col-span-2 order-last md:order-first ml-6">
              <TextField
                label="Name of company"
                placeholder="ABC Company"
                type="text"
                value={companyName}
                onChangeHandler={(e) => setCompanyName(e.target.value)}
              />
              <TextField
                label="Account user name"
                placeholder="user name"
                type="text"
                value={user === null ? "" : user.username}
                onChangeHandler={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Website"
                placeholder="company.com"
                type="text"
                value={website}
                onChangeHandler={(e) => setWebsite(e.target.value)}
              />
            </div>
            {/* <div className="pl-5 m-auto">
              <Image src={photo} alt="students" /> */}
            {/* <div className='mt-6'>
                <Button
                  btnText='Upload'
                />
              </div> */}
            {/* </div> */}
          </div>
          <div className="ml-6">
            <TextField
              label="location"
              placeholder="100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Bengaluru, Karnataka 560085"
              type="text"
              value={location}
              onChangeHandler={(e) => setLocation(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-7 gap-0 md:gap-8">
              <div className="col-span-1 md:col-span-3">
                <TextField
                  label="Email id"
                  placeholder="xyz.@gmail.com"
                  type="text"
                  disabled
                  value={user === null ? "" : user.email}
                  onChangeHandler={(e) => setEmailID(e.target.value)}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <TextField
                  label="Planned Hires"
                  placeholder="100"
                  type="text"
                  value={plannedHires}
                  onChangeHandler={(e) => setPlannedHires(e.target.value)}
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
            <TextArea
              label="About the company"
              placeholder="Your message..."
              rows="4"
              value={companyDescription}
              onChangeHandler={(e) => setCompanyDescription(e.target.value)}
            />
            <div class="mb-6">
              <Button
                btnText={btnText}
                onClickHandler={handleCompanyProfile}
                disabled={isBtnDisabled}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Image className="h-full w-full" src={student} alt="students" />
        </div>
      </div>
    </div>
  );
}

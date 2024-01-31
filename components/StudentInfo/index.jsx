import Button from "@/components/Buttons";
import TextField from "@/components/InputComponents/TextField";
import TextArea from "@/components/InputComponents/TextArea";

import photo from "@/public/photoupload.png";

import Image from "next/image";
import { useState } from "react";

export default function StudentInfo({
  username,
  email,
  contactNo,
  department,
  studentTenthMarks,
  studentTwelthMarks,
  studentDegreeMarks,
  gender,
  studentID,
  studentDescription,
}) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [flag, setFlag] = useState(0);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedPhoto(URL.createObjectURL(file));
      setFlag(1);
    }
  };

  const handleUploadClick = () => {
    console.log(selectedPhoto);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 content-center">
          <div className="pb-4 pl-2 md:pl-5 m-auto">
            <label
              className={
                "custom-button w-[135px] text-center text-white font-medium py-2 px-4 rounded hover:bg-green-60y"
              }
            >
              <div className="flex justify-center">
                {flag == 1 ? (
                  <Image
                    src={selectedPhoto}
                    width={100}
                    height={100}
                    alt="students"
                  />
                ) : (
                  <Image src={photo} alt="students" />
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </label>

            {/* <Image src={photo} alt="students" /> */}

            {/* <div className="mt-6 flex justify-center">
              <button
                className="w-full bg-green-900 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
                onClick={handleUploadClick}
                btnText="Upload"
              >
                Upload
              </button>
            </div> */}
          </div>
          <div className="col-span-1 md:col-span-2 ml-0 md:ml-6">
            <TextField
              label="User Name"
              placeholder="abc sharma"
              type="text"
              value={username}
              disabled
            />
            <TextField
              label="Email ID"
              placeholder="TPO name"
              type="text"
              value={email}
              disabled
            />
            <TextField
              label="Department"
              placeholder="CSE"
              type="text"
              value={department}
              disabled
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-0 md:gap-4 2xl:gap-8">
          <div className="col-span-1">
            <TextField
              label="10th Standard Marks (in %)"
              placeholder="xyz.@gmail.com"
              type="text"
              value={studentTenthMarks}
              disabled
            />
          </div>
          <div className="col-span-1">
            <TextField
              label="12th Standard Marks (in %)"
              placeholder="9090909090"
              type="text"
              value={studentTwelthMarks}
              disabled
            />
          </div>
          <div className="col-span-1">
            <TextField
              label="UG CGPA (on a scale of 10)"
              placeholder="9090909090"
              type="text"
              value={studentDegreeMarks}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mr-0 md:mr-4">
        <TextField
          label="Gender"
          placeholder="Unisex"
          type="text"
          value={gender}
          disabled
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="student ID"
            placeholder="ABCUG123"
            type="text"
            value={studentID}
            disabled
          />
          <TextField
            label="Contact Number"
            placeholder="pes.edu"
            type="text"
            value={contactNo}
            disabled
          />
        </div>
        <TextArea
          label="About the universities / colleges"
          placeholder="studentdescription"
          rows="6"
          disabled
          value={studentDescription}
        />
        <div class="mb-6">
          <Button btnText="Next" disabled />
        </div>
      </div>
    </div>
  );
}

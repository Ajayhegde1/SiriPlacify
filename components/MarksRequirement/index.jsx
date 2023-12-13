import { useState } from "react";
import TextField from "../InputComponents/TextField";

export default function MarksRequirement({
  tenthMarks,
  twelfthMarks,
  UGCgpa,
  setTenthMarks,
  setTwelfthMarks,
  setUGCgpa,
}) {
  const [isRequiredTenth, setIsRequiredTenth] = useState(false);
  const [isRequiredTwelth, setIsRequiredTwelth] = useState(false);
  const [isRequiredUGC, setIsRequiredUGC] = useState(false);
  function sanitizeCTCInput(inputValue) {
    return inputValue.replace(/[^0-9.]/g, "");
  }

  return (
    <>
      <h1 className="text-center md:text-left pb-6 mt-10 text-xl md:text-2xl font-Heading font-bold text-gray-800">
        Marks Requirement
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <TextField
            label="10th Marks (in %) *"
            placeholder="95.00"
            type="text"
            required={true}
            value={tenthMarks}
            onChangeHandler={(e) => {
              setTenthMarks(sanitizeCTCInput(e.target.value));
              setIsRequiredTenth(false);
            }}
            onBlur={(e) => {
              setIsRequiredTenth(e.target.value.trim() === "");
            }}
          />
          {isRequiredTenth && (
            <div className="text-red-500 font-[400] mt-[-24px]">
              Error: 10th Marks Required
            </div>
          )}
        </div>
        <div>
          <TextField
            label="12th Marks (in %) *"
            placeholder="95.00"
            type="text"
            required={true}
            value={twelfthMarks}
            onChangeHandler={(e) => {
              setTwelfthMarks(sanitizeCTCInput(e.target.value));
              setIsRequiredTwelth(false);
            }}
            onBlur={(e) => {
              setIsRequiredTwelth(e.target.value.trim() === "");
            }}
          />
          {isRequiredTwelth && (
            <div className="text-red-500 font-[400] mt-[-24px]">
              Error: 12th Marks Required
            </div>
          )}
        </div>
        <div>
          <TextField
            label="UG Cgpa (on a scale of 10) *"
            placeholder="0.0"
            type="text"
            required={true}
            value={UGCgpa}
            onChangeHandler={(e) => {
              setUGCgpa(sanitizeCTCInput(e.target.value));
              setIsRequiredUGC(false);
            }}
            onBlur={(e) => {
              setIsRequiredUGC(e.target.value.trim() === "");
            }}
          />
          {isRequiredUGC && (
            <div className="text-red-500 font-[400] mt-[-24px]">
              Error: UG CGPA Required
            </div>
          )}
        </div>
      </div>
    </>
  );
}

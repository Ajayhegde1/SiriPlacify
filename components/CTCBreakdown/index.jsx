import TextField from "@/components/InputComponents/TextField";
import { useState } from "react";

export default function CTCBreakdown({
  ctc,
  basePay,
  variablePay,
  RSU,
  setCtc,
  setBasePay,
  setVariablePay,
  setRSU,
}) {
  const [isRequiredCTC, setIsRequiredCTC] = useState(false);
  const [isRequiredBase, setIsRequiredBase] = useState(false);
  const [isRequiredVariable, setIsRequiredVariable] = useState(false);
  const [isRequiredRSU, setIsRequiredRSU] = useState(false);
  function sanitizeCTCInput(inputValue) {
    return inputValue.replace(/[^0-9.]/g, "");
  }

  return (
    <>
      <h1 className="text-center md:text-left pb-4 mt-3 text-xl md:text-2xl font-Heading font-bold text-gray-800">
        CTC Breakdown (p.a)
      </h1>
      <div>
        <TextField
          label="CTC (in Rs.) *"
          placeholder="750000.00"
          required={true}
          type="text"
          value={ctc}
          onChangeHandler={(e) => {
            setCtc(sanitizeCTCInput(e.target.value));
            setIsRequiredCTC(false);
          }}
          onBlur={(e) => {
            setIsRequiredCTC(e.target.value.trim() === "");
          }}
        />
        {isRequiredCTC && (
          <div className="text-red-500 font-[400] mt-[-24px]">
            Error: CTC Required
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <TextField
              label="Base Pay (in Rs.) *"
              placeholder="750000.00"
              required={true}
              type="text"
              value={basePay}
              onChangeHandler={(e) => {
                setBasePay(sanitizeCTCInput(e.target.value));
                setIsRequiredBase(false);
              }}
              onBlur={(e) => {
                setIsRequiredBase(e.target.value.trim() === "");
              }}
            />

            {isRequiredBase && (
              <div className="text-red-500 font-[400] mt-[-24px]">
                Error: Base Pay Required
              </div>
            )}
          </div>
          <div>
            <TextField
              label="Variable Pay (in Rs.) *"
              placeholder="750000.00"
              required={true}
              type="text"
              value={variablePay}
              onChangeHandler={(e) => {
                setVariablePay(sanitizeCTCInput(e.target.value));
                setIsRequiredVariable(false);
              }}
              onBlur={(e) => {
                setIsRequiredVariable(e.target.value.trim() === "");
              }}
            />
            {isRequiredVariable && (
              <div className="text-red-500 font-[400] mt-[-24px]">
                Error: Variable Pay Required
              </div>
            )}
          </div>
          <div>
            <TextField
              label="RSU (in Rs.) *"
              required={true}
              placeholder="750000.00"
              type="text"
              value={RSU}
              onChangeHandler={(e) => {
                setRSU(sanitizeCTCInput(e.target.value));
                setIsRequiredRSU(false);
              }}
              onBlur={(e) => {
                setIsRequiredRSU(e.target.value.trim() === "");
              }}
            />
            {isRequiredRSU && (
              <div className="text-red-500 font-[400] mt-[-24px]">
                Error: RSU Required
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

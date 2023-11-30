import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./helperTable.module.css";
import {
  tableData,
  tablehead,
} from "@/constants/dashboardBranchWiseStatsTable";
export function BranchWiseStatistics() {
  const [yearplace, setYearplace] = React.useState("");
  const handleChange = (event) => {
    setYearplace(event.target.value);
  };
  return (
    <div className=" bg-[#FFFFFF] w-full h-auto rounded-[12px] border-[#CECED080] border-[1px]">
      <div className="flex justify-between rounded-[12px] px-[33px] py-[40px] ">
        <h2 className="font-[700] text-[21px] leading-tight text-[#333333]">
          Branch-wise statistics
        </h2>
        <Select
          sx={{
            borderRadius: 12,
          }}
          className="h-[36px] border-[1px] border-[#e1e1e1] rounded-[12px] w-[97px]"
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={yearplace}
          label="Select Year"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>2023</MenuItem>
          <MenuItem value={20}>2022</MenuItem>
          <MenuItem value={30}>2021</MenuItem>
        </Select>
      </div>
      <div className="w-auto h-auto">
        <table className="w-full ">
          <tbody>
            <tr className="">
              <th className="text-left pl-[63px] font-[700] text-[#6F767F] text-[17px]">
                Sector
              </th>
              <th className="text-left  font-[700] text-[#6F767F] text-[17px]">
                Grads
              </th>
              <th className=" text-left  font-[700] text-[#6F767F] text-[17px]">
                Reg Students
              </th>
              <th className=" text-left  font-[700] text-[#6F767F] text-[17px]">
                Placed Students
              </th>
              <th className="text-left  font-[700] text-[#6F767F] text-[17px]">
                Max CTC
              </th>
              <th className="text-left  font-[700] text-[#6F767F] text-[17px]">
                Med CTC
              </th>
              <th className="text-left  font-[700] text-[#6F767F] text-[18px]">
                Avg CTC
              </th>
            </tr>

            {tableData.map((link) => (
              <tr
                className="h-[80px] border-[1px] border-[#EDEDED] "
                key={link.id}
              >
                <td className="w-[150px] pl-[63px]">
                  <div className="flex gap-[12px] items-center font-[600] text-[17px] text-[#333333]">
                    {link.badge}
                    {link.sector}
                  </div>
                </td>
                <td className="w-[10px] font-[600] text-[17px] text-[#333333]">
                  {link.grads}
                </td>
                <td className="w-[20px] font-[600] text-[17px] text-[#333333]">
                  {link.reg_students}
                </td>
                <td className="w-[25px] font-[600] text-[17px] text-[#333333]">
                  {link.placed_students}
                </td>
                <td className="w-[17px] font-[600] text-[17px] text-[#333333]">
                  {link.max_ctc}
                </td>
                <td className="w-[19px] font-[600] text-[17px] text-[#333333]">
                  {link.med_ctc}
                </td>
                <td className="w-[19px] font-[600] text-[17px] text-[#333333]">
                  {link.avg_ctc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

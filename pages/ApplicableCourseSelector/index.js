import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getSectors } from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";
import { Spin } from "antd";

export default function ApplicableCourseSelector({
  isEdit = true,
  course,
  handleCourse,
}) {
  const [jobSectorList, setJobSectorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const courses = [
    { value: "1", label: "BTech" },
    { value: "2", label: "BSc." },
    { value: "3", label: "BArch." },
    { value: "4", label: "MTech" },
    { value: "5", label: "MSc." },
    { value: "6", label: "MArch." },
    { value: "7", label: "BBA" },
    { value: "8", label: "MBA" },
    { value: "9", label: "BCA" },
    { value: "10", label: "MCA" },
    { value: "11", label: "BDes." },
  ];

  useEffect(() => {
    getSectors()
      .then((res) => {
        if (res.data.status === 200) {
          let courseslist = courses.map((link) => {
            return link.label;
          });
          setJobSectorList(courseslist);
          setLoading(false);
        } else {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        openNotification(notificationTypes.ERROR, "Error", err.message);
        setLoading(false);
      });
  }, []);

  const handleSelectChange = (selectedOptions) => {
    // Log the selected values
    console.log(selectedOptions);
    const selectedLabels = selectedOptions.map((option) => option.label);

    // Convert the array to a string
    const selectedString = selectedLabels.join(",");
    console.log(selectedString);
    // Call the provided handler to update the state in the parent component
    handleCourse(selectedString);
  };

  return (
    <div className="mt-8 mb-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-5">
          <Select
            options={courses}
            placeholder="Select Applicable Courses"
            value={course}
            onChange={handleSelectChange}
            isSearchable={true}
            components={makeAnimated()}
            closeMenuOnSelect={false}
            isDisabled={!isEdit}
            isMulti
          />
        </div>
        <div>
          {loading ? (
            <Spin size="large" style={{ marginRight: "10px" }} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

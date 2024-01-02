import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { deleteStudent } from "@/redux/Sagas/requests/features";
import { openNotification } from "@/utils/notifications";

export default function Candidates({
  students,
  promoteStudents,
  setPromoteStudents,
  jobID,
  collegeID,
  isStudentsList = false,
}) {
  const router = useRouter();

  const user = useSelector((state) => state.user);

  const addPromoteStudent = (event, student) => {
    if (event.target.checked) {
      let status = parseInt(student.studentStatus) + 1;
      status = status.toString(10);
      const data = {
        email: student.email,
        status,
      };
      setPromoteStudents([...promoteStudents, data]);
    } else {
      setPromoteStudents(
        promoteStudents.filter(
          (promoteStudent) => promoteStudent.uid !== student.uid
        )
      );
    }
  };

  const deleteStudentHandler = (uid) => {
    deleteStudent(uid)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification("success", "Student deleted successfully");
        } else {
          openNotification("error", "Unable to delete student");
        }
        window.location.reload();
      })
      .catch((err) => {
        openNotification("error", "Unable to delete student");
      });
  };

  return (
    <div className="overflow-auto h-auto rounded-md">
      <table className="table-auto overflow-scroll w-full text-left">
        <thead className="border-b-2 bg-gray-100">
          {user === null ? <></> : user.accType !== "1" ? <th /> : <></>}
          <th className="px-6 py-2 text-sm font-semibold">Student ID</th>
          <th className="px-6 py-2 text-sm font-semibold">Student Name</th>
          <th className="px-6 py-2 text-sm font-semibold">Email</th>
          <th className="p-2 text-sm font-semibold">Mobile</th>
          <th className="px-6 py-2 text-sm font-semibold">Gender</th>
          <th className="px-6 py-2 text-sm font-semibold">Stream</th>
          <th className="px-6 py-2 text-sm font-semibold">Degree</th>
          <th className="px-6 py-2 text-sm font-semibold">Class X%</th>
          <th className="px-6 py-2 text-sm font-semibold">Class XII%</th>
          <th className="px-6 py-2 text-sm font-semibold">CGPA (/10)</th>
          <th className="px-6 py-2 text-sm font-semibold">View Profile</th>
          <th className="px-6 py-2 text-sm font-semibold">Delete Action</th>
          {user === null ? (
            <></>
          ) : user.accType === "2" ? (
            <th className="px-6 py-4 text-gray-600">Details</th>
          ) : (
            <></>
          )}
        </thead>
        <tbody>
          {students === null || typeof students === "undefined" ? (
            <div>Loading...</div>
          ) : students.length === 0 ? (
            <div className="mt-6 mb-3 ml-6 font-medium">No students found</div>
          ) : (
            students.map((student, index) => (
              <tr
                className="cursor-pointer hover:bg-gray-100 font-semibold border-b-2"
                key={index}
              >
                {user === null ? (
                  <></>
                ) : user.accType !== "1" ? (
                  isStudentsList ? (
                    <td></td>
                  ) : (
                    <td>
                      <input
                        type="checkbox"
                        className={
                          user === null
                            ? ""
                            : user.accType === "0"
                            ? "mx-5 h-6 w-6"
                            : user.accType === "2"
                            ? "h-6 w-6"
                            : ""
                        }
                        onChange={(event) => addPromoteStudent(event, student)}
                      />
                    </td>
                  )
                ) : (
                  <></>
                )}
                <td className="whitespace-nowrap px-6 py-2 text-sm ">
                  {student.studentId}
                </td>
                <td className="whitespace-nowrap px-6 py-2 text-sm capitalize hover:underline">
                  {student.username}
                </td>
                <td className="whitespace-nowrap px-6 py-2 text-sm ">
                  {student.email}
                </td>
                <td className="whitespace-nowrap p-2 text-sm ">
                  {student.contactNo}
                </td>
                <td className="whitespace-nowrap px-6 py-2 text-sm ">
                  {student.gender}
                </td>
                <td className="whitespace-nowrap px-6 py-2 text-sm ">
                  {student.stream}
                </td>
                <td className="whitespace-nowrap px-6 py-2 text-sm ">
                  {student.degree}
                </td>
                <td className="whitespace-nowrap px-6 py-2 text-sm ">
                  {student.tenthMarks}
                </td>
                <td className="whitespace-nowrap px-6 py-2 text-sm ">
                  {student.twelthMarks}
                </td>
                <td className="whitespace-nowrap px-6 py-2 text-sm ">
                  {student.studentUGMarks}
                </td>

                {user !== null ? (
                  user.accType === "0" ? (
                    isStudentsList ? (
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() =>
                            router.push(`/students/${student.uid}`)
                          }
                          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded"
                        >
                          View Profile
                        </button>
                      </td>
                    ) : (
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() =>
                            router.push(
                              `/jobs/currentJobs/${jobID}/candidates/${student.uid}`
                            )
                          }
                          className="font-medium bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
                        >
                          View Profile
                        </button>
                      </td>
                    )
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                {user !== null ? (
                  user.accType === "0" && isStudentsList ? (
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => deleteStudentHandler(student.uid)}
                        className="font-semibold text-sm bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded"
                      >
                        Delete Student
                      </button>
                    </td>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

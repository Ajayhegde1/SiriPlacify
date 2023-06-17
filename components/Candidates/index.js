import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function Candidates({
  students,
  promoteStudents,
  setPromoteStudents,
  jobID,
  collegeID
}) {
  const router = useRouter()

  const user = useSelector((state) => state.user)

  const addPromoteStudent = (event, student) => {
    if (event.target.checked) {
      let status = parseInt(student.studentStatus) + 1
      status = status.toString(10)
      const data = {
        email: student.email,
        status
      }
      setPromoteStudents([...promoteStudents, data])
    } else {
      setPromoteStudents(promoteStudents.filter((promoteStudent) => promoteStudent.uid !== student.uid))
    }
  }

  return (
    <div className='overflow-auto h-96'>
      <table className='table-auto overflow-scroll w-full mt-3 text-left'>
        <thead>
          {
            user === null
              ? <></>
              : user.accType === '2'
                ? <th />
                : <></>
          }
          <th className='px-6 py-4 text-gray-600'>Student Name</th>
          <th className='px-6 py-4 text-gray-600'>Email</th>
          <th className='px-6 py-4 text-gray-600'>Mobile</th>
          <th className='px-6 py-4 text-gray-600'>Class X%</th>
          <th className='px-6 py-4 text-gray-600'>Class XII%</th>
          <th className='px-6 py-4 text-gray-600'>CGPA</th>
          {
            user === null
              ?
              <></>
              :
              user.accType === '2'
                ?
                <th className='px-6 py-4 text-gray-600'>Details</th>
                :
                <></>
          }
        </thead>
        <tbody>
          {
            students === null || typeof students === 'undefined'
              ? <div>
                Loading...
              </div>
              : students.length === 0
                ? <div className='mt-6 mb-3 ml-6 font-medium'>
                  No students found
                </div>
                : students.map((student, index) =>
                  <tr className='cursor-pointer' key={index}>
                    {
                      user === null
                        ? <></>
                        : user.accType === '2'
                          ? <td>
                            <input
                              type='checkbox'
                              className='h-6 w-6'
                              onChange={(event) => addPromoteStudent(event, student)}
                            />
                          </td>
                          : <></>
                    }
                    <td className='whitespace-nowrap px-6 py-4'>{student.username}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{student.email}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{student.contactNo}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{student.tenthMarks}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{student.twelthMarks}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{student.studentUGMarks}</td>
                    {
                      user !== null
                        ?
                        user.accType === '2'
                          ?
                          <td className='whitespace-nowrap px-6 py-4'>
                            <button
                              onClick={() => router.push(`/jobs/companyJobs/${jobID}/${collegeID}/candidates/${student.uid}`)}
                              className='font-medium bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded'
                            >
                              View Profile
                            </button>
                          </td>
                          :
                          <></>
                        :
                        <></>
                    }
                  </tr>
                )
          }
        </tbody>
      </table>
    </div>
  )
}

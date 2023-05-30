import Student from './Student'

export default function Candidates ({
  students
}) {
  return (
    <div className='overflow-auto'>
      <table className='table-auto overflow-scroll w-full mt-3 text-left'>
        <thead>
          <th className='px-6 py-4 text-gray-600'>Candidate Name</th>
          <th className='px-6 py-4 text-gray-600'>Email</th>
          <th className='px-6 py-4 text-gray-600'>Mobile</th>
          <th className='px-6 py-4 text-gray-600'>Class X%</th>
          <th className='px-6 py-4 text-gray-600'>Class XII%</th>
          <th className='px-6 py-4 text-gray-600'>CGPA</th>
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
                  <Student
                    student={student}
                    key={index}
                  />
                )
          }
        </tbody>
      </table>
    </div>
  )
}

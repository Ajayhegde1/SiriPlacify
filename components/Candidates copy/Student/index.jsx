export default function Student ({ student, index }) {
  return (
    <tr>
      <td className='whitespace-nowrap px-6 py-4'>{student.username}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.email}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.contactNo}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.tenthMarks}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.twelthMarks}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.studentUGMarks}</td>
    </tr>
  )
}

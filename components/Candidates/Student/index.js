export default function Student ({ student, index }) {
  return (
    <tr>
      <td className='whitespace-nowrap px-6 py-4'>{student.name}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.email}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.mobile}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.classX}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.classXII}</td>
      <td className='whitespace-nowrap px-6 py-4'>{student.cgpa}</td>
    </tr>
  )
}

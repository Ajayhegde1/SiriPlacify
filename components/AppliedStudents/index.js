import Candidates from '../Candidates'

import students from '@/testingFiles/students'

import { useState } from 'react'
import StatusOfHire from '../StatusOfHire'

export default function AppliedStudents () {
  const [status, setStatus] = useState(1)
  const [filteredStudents, setFilteredStudents] = useState(students)

  const setApplied = () => {
    setStatus(1)
    setFilteredStudents(students.slice(0, 5))
  }

  const setShortlisted = () => {
    setStatus(2)
    setFilteredStudents(students.slice(2, 6))
  }

  const setTest = () => {
    setStatus(3)
    setFilteredStudents(students.slice(1, 6))
  }

  const setInterview = () => {
    setStatus(4)
    setFilteredStudents(students.slice(3, 6))
  }

  const setHired = () => {
    setStatus(5)
    setFilteredStudents(students.slice(2, 4))
  }

  return (
    <div className='ml-2 md:ml-10 mt-5 bg-white p-4 mr-5 lg:mr-20 rounded-lg'>
      <StatusOfHire
        status={status}
        setStatus={setStatus}
        setApplied={setApplied}
        setShortlisted={setShortlisted}
        setTest={setTest}
        setInterview={setInterview}
        setHired={setHired}
      />
      <Candidates
        students={filteredStudents}
      />
    </div>
  )
}

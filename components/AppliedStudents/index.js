import Candidates from '../Candidates'

import { useEffect, useState } from 'react'
import StatusOfHire from '../StatusOfHire'
import { notificationTypes, openNotification } from '@/utils/notifications'

import { getAppliedStudents } from '@/redux/Sagas/requests/features'

export default function AppliedStudents ({
  jobID
}) {
  const [studentList, setStudentList] = useState([])
  const [filteredStudentList, setFilteredStudentList] = useState([])
  const [status, setStatus] = useState(1)

  useEffect(() => {
    if (typeof jobID !== 'undefined') {
      getAppliedStudents(jobID)
        .then((res) => {
          if (res.data.status === '200') {
            setStudentList(res.data.data)
            setFilteredStudentList(res.data.data)
          } else {
            setStudentList([])
          }
        })
        .catch((err) => {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Error in fetching applied students'
          )
        })
    }
  }, [])

  const setApplied = () => {
    setStatus(1)
    const filtered = studentList.filter((student) => student.studentStatus === '0')
    setFilteredStudentList(filtered)
  }

  const setShortlisted = () => {
    setStatus(2)
    const filtered = studentList.filter((student) => student.studentStatus === '1')
    setFilteredStudentList(filtered)
  }

  const setTest = () => {
    setStatus(3)
    const filtered = studentList.filter((student) => student.studentStatus === '2')
    setFilteredStudentList(filtered)
  }

  const setInterview = () => {
    setStatus(4)
    const filtered = studentList.filter((student) => student.studentStatus === '3')
    setFilteredStudentList(filtered)
  }

  const setHired = () => {
    setStatus(5)
    const filtered = studentList.filter((student) => student.studentStatus === '4')
    setFilteredStudentList(filtered)
  }

  return (
    <div className='ml-2 md:ml-10 mt-5 bg-white p-4 mr-5 lg:mr-20 rounded-lg'>
      {
        studentList === null || typeof studentList === 'undefined'
          ? <div />
          : studentList.length === 0
            ? <>
            </>
            : <StatusOfHire
                students={studentList}
                status={status}
                setStatus={setStatus}
                setApplied={setApplied}
                setShortlisted={setShortlisted}
                setTest={setTest}
                setInterview={setInterview}
                setHired={setHired}
              />
      }
      {
        studentList === null || typeof studentList === 'undefined'
          ? <div>
            Loading...
          </div>
          : studentList.length === 0
            ? <div className='mt-6 mb-3 ml-6 font-medium'>
              No students have applied yet
            </div>
            : <Candidates
                students={filteredStudentList}
              />
      }
    </div>
  )
}

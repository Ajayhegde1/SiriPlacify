import Candidates from '../Candidates'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { read, utils, writeFile } from 'xlsx'

import StatusOfHire from '../StatusOfHire'
import { notificationTypes, openNotification } from '@/utils/notifications'

import LastRoundInterviewModal from '@/components/Modal/LastRoundInterviewModal'
import UpdateStatusModal from '@/components/Modal/UpdateStatusModal'

import sheet from '../../public/sheets.png'

import { getAppliedStudents } from '@/redux/Sagas/requests/features'
import { UpdateStatus } from '@/redux/Sagas/requests/features'


export default function AppliedStudents({
  jobID,
  collegeID,
  studentList,
  setStudentList
}) {
  const [filteredStudentList, setFilteredStudentList] = useState([])
  const [showLastRoundModal, setShowLastRoundModal] = useState(false)
  const [isLastRound, setLastRound] = useState(false)
  const [promoteStudents, setPromoteStudents] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [status, setStatus] = useState(1)

  useEffect(() => {
    if (typeof jobID !== 'undefined') {
      getAppliedStudents(jobID)
        .then((res) => {
          if (res.data.status === 200) {
            setStudentList(res.data.data)
            setFilteredStudentList(res.data.data.filter((student) => student.studentStatus === '0'))
          } else if (res.data.status === 401) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Session ID is invalid or not present'
            )
            setStudentList([])
          } else if (res.data.status === 423) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'college ID is undefined'
            )
            setStudentList([])
          } else if (res.data.status === 424) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Job ID needs to be defined'
            )
            setStudentList([])
          } else if (res.data.status === 425) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Job ID can not be empty'
            )
            setStudentList([])
          } else if (res.data.status === 426) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'unable to get job'
            )
            setStudentList([])
          } else if (res.data.status === 427) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Job ID or College ID is undefined'
            )
            setStudentList([])
          } else if (res.data.status === 428) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Unable to retrieve students'
            )
            setStudentList([])
          } else if (res.data.status === 500) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Unable to retrieve students'
            )
            setStudentList([])
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
  }, [jobID])

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
    const filtered = studentList.filter((student) => parseInt(student.studentStatus) === 3)
    setFilteredStudentList(filtered)
  }

  const setHired = () => {
    setStatus(5)
    const filtered = studentList.filter((student) => student.studentStatus === '4')
    setFilteredStudentList(filtered)
  }

  const setRejected = () => {
    setStatus(6)
    const filtered = studentList.filter((student) => student.studentStatus === '5')
    setFilteredStudentList(filtered)
  }

  const reconsiderStudents = () => {
    const studentsStatus = promoteStudents.map((student) => {
      return { ...student, status: "0" }
    })
    const data = {
      jobID,
      collegeID,
      candidates: studentsStatus
    }
    UpdateStatus(data)
      .then((res) => {
        if (res.data.status === 200 || res.data.status === '200' || res.data.status === 'ok') {
          openNotification(
            notificationTypes.SUCCESS,
            'Success',
            'Status updated successfully'
          )
          window.location.reload()
        } else if (res.data.status === 423) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Invalid job or college IDs'
          )
        } else if (res.data.status === 424) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get jobs IDs'
          )
        } else if (res.data.status === 425) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get college IDs'
          )
        } else if (res.data.status === 426) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'college Mapping IDs is not available'
          )
        } else if (res.data.status === 427) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'No Candidates'
          )
        } else if (res.data.status === 428) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get student ID'
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get students data'
          )
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Error in updating status'
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Error in updating status'
        )
      })
  }

  const sendStudentsToPrevRound = () => {
    const studentsStatus = promoteStudents.map((student) => {
      return { ...student, status: (parseInt(student.status) - 2).toString() }
    })

    const data = {
      jobID,
      collegeID,
      candidates: studentsStatus
    }

    UpdateStatus(data)
      .then((res) => {
        if (res.data.status === 200 || res.data.status === '200' || res.data.status === 'ok') {
          openNotification(
            notificationTypes.SUCCESS,
            'Success',
            'Status updated successfully'
          )
          window.location.reload()
        } else if (res.data.status === 423) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Invalid job or college IDs'
          )
        } else if (res.data.status === 424) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get jobs IDs'
          )
        } else if (res.data.status === 425) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get college IDs'
          )
        } else if (res.data.status === 426) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'college Mapping IDs is not available'
          )
        } else if (res.data.status === 427) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'No Candidates'
          )
        } else if (res.data.status === 428) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get student ID'
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get students data'
          )
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Error in updating status'
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Error in updating status'
        )
      })
  }

  const notLastRoundHandler = () => {
    const stdList = filteredStudentList.map((student) => {
      return { email: student.email, status: student.status }
    })

    let rejectedStudents = stdList.filter((student) =>
      promoteStudents.findIndex((std) => std.email === student.email) === -1
    )

    rejectedStudents = rejectedStudents.map((student) => {
      return { ...student, status: "5" }
    })

    const data = {
      jobID,
      collegeID,
      candidates: rejectedStudents
    }
    UpdateStatus(data)
      .then((res) => {
        if (res.data.status === 200 || res.data.status === '200' || res.data.status === 'ok') {
          openNotification(
            notificationTypes.SUCCESS,
            'Success',
            'Status updated successfully'
          )
          window.location.reload()
        } else if (res.data.status === 423) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Invalid job or college IDs'
          )
        } else if (res.data.status === 424) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get jobs IDs'
          )
        } else if (res.data.status === 425) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get college IDs'
          )
        } else if (res.data.status === 426) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'college Mapping IDs is not available'
          )
        } else if (res.data.status === 427) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'No Candidates'
          )
        } else if (res.data.status === 428) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get student ID'
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get students data'
          )
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Error in updating status'
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Error in updating status'
        )
      })
  }

  const lastRoundHandler = () => {
    const stdList = filteredStudentList.map((student) => {
      return { email: student.email, status: student.status }
    })

    let rejectedStudents = stdList.filter((student) =>
      promoteStudents.findIndex((std) => std.email === student.email) === -1
    )

    const studentsStatus = [...promoteStudents, ...rejectedStudents.map((student) => {
      return { ...student, status: "5" }
    })]
    const data = {
      jobID,
      collegeID,
      candidates: studentsStatus
    }
    UpdateStatus(data)
      .then((res) => {
        if (res.data.status === 200 || res.data.status === '200' || res.data.status === 'ok') {
          openNotification(
            notificationTypes.SUCCESS,
            'Success',
            'Status updated successfully'
          )
          window.location.reload()
        } else if (res.data.status === 423) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Invalid job or college IDs'
          )
        } else if (res.data.status === 424) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get jobs IDs'
          )
        } else if (res.data.status === 425) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get college IDs'
          )
        } else if (res.data.status === 426) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'college Mapping IDs is not available'
          )
        } else if (res.data.status === 427) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'No Candidates'
          )
        } else if (res.data.status === 428) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get student ID'
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get students data'
          )
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Error in updating status'
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Error in updating status'
        )
      })
  }

  const handlePromoteStudents = () => {
    const stdList = filteredStudentList.map((student) => {
      return { email: student.email, status: student.status }
    })

    let rejectedStudents = stdList.filter((student) =>
      promoteStudents.findIndex((std) => std.email === student.email) === -1
    )

    const studentsStatus = [...promoteStudents, ...rejectedStudents.map((student) => {
      return { ...student, status: "5" }
    })]

    if (status === 4) {
      setShowLastRoundModal(true)
    }
    else {
      const data = {
        jobID,
        collegeID,
        candidates: studentsStatus
      }
      UpdateStatus(data)
        .then((res) => {
          if (res.data.status === 200 || res.data.status === '200' || res.data.status === 'ok') {
            openNotification(
              notificationTypes.SUCCESS,
              'Success',
              'Status updated successfully'
            )
            window.location.reload()
          } else if (res.data.status === 423) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Invalid job or college IDs'
            )
          } else if (res.data.status === 424) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Unable to get jobs IDs'
            )
          } else if (res.data.status === 425) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Unable to get college IDs'
            )
          } else if (res.data.status === 426) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'college Mapping IDs is not available'
            )
          } else if (res.data.status === 427) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'No Candidates'
            )
          } else if (res.data.status === 428) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Unable to get student ID'
            )
          } else if (res.data.status === 500) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Unable to get students data'
            )
          } else {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Error in updating status'
            )
          }
        })
        .catch((err) => {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Error in updating status'
          )
        })
    }
  }

  const handleImport = ($event) => {
    const files = $event.target.files
    if (files.length) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const wb = read(event.target.result)
        const sheets = wb.SheetNames

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
          const updatedData = rows
          const data = updatedData.map(obj => {
            return { ...obj, status: obj.status.toString() }
          })
          const reqData = {
            jobID,
            collegeID,
            candidates: data
          }
          UpdateStatus(reqData)
            .then((res) => {
              const status = parseInt(res.data.status)
              if (status === 200 || status === 304 || status === 'ok') {
                openNotification(
                  notificationTypes.SUCCESS,
                  'Success'
                )
                window.location.reload()
              } else if (res.data.status === 423) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Invalid job or college IDs'
                )
              } else if (res.data.status === 424) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Unable to get jobs IDs'
                )
              } else if (res.data.status === 425) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Unable to get college IDs'
                )
              } else if (res.data.status === 426) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'college Mapping IDs is not available'
                )
              } else if (res.data.status === 427) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'No Candidates'
                )
              } else if (res.data.status === 428) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Unable to get student ID'
                )
              } else if (res.data.status === 500) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Unable to get students data'
                )
              } else {
                openNotification(
                  notificationTypes.ERROR,
                  'Please check your data. It is not in the correct format.'
                )
                window.location.reload()
              }
            }
            )
            .catch((err) => {
              openNotification(
                notificationTypes.ERROR,
                'Please check your data. It is not in the correct format.'
              )
            })
          setShowModal(!showModal)
          openNotification(notificationTypes.SUCCESS, 'Sucess', 'File Uploaded Sucessfully')
        }
      }
      reader.readAsArrayBuffer(file)
    }
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
              setRejected={setRejected}
            />
      }
      <div className='ml-3 md:ml-6 mt-3 md:mt-6 lg:mt-10'>
        <button
          onClick={() => setShowModal(true)}
          className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
        >
          <Image
            src={sheet}
            alt='Import from excel'
            className='h-5 mt-1 mr-2'
            width={20}
            height={20}
          />
          Import from excel
        </button>
      </div>
      {
        filteredStudentList === null || typeof filteredStudentList === 'undefined'
          ? <div>
            Loading...
          </div>
          : filteredStudentList.length === 0
            ? <div className='mt-6 mb-3 ml-6 font-medium'>
              No students have applied yet
            </div>
            :
            <>
              <Candidates
                students={filteredStudentList}
                promoteStudents={promoteStudents}
                setPromoteStudents={setPromoteStudents}
              />
              <div className='flex justify-end'>
                {
                  status === 6 ? (
                    <div className='flex'>
                      <button
                        type='button'
                        className='mt-6 mb-3 ml-auto mr-2 font-medium bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={reconsiderStudents}
                      >
                        Reconsider Students
                      </button>
                    </div>
                  ) : (
                    <></>
                  )
                }
                {
                  status !== 6 && status !== 1 ? (
                    <div className='flex'>
                      <button
                        type='button'
                        className='mt-6 mb-3 ml-auto mr-2 font-medium bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={sendStudentsToPrevRound}
                      >
                        Send to previous round
                      </button>
                    </div>
                  ) : (
                    <></>
                  )
                }
                {
                  status >= 5
                    ?
                    <>
                    </>
                    :
                    <div className='flex'>
                      <button
                        type='button'
                        className='mt-6 mb-3 ml-auto mr-2 font-medium bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handlePromoteStudents}
                      >
                        Send to next round
                      </button>
                    </div>
                }
              </div>
            </>
      }
      <LastRoundInterviewModal
        showModal={showLastRoundModal}
        setShowModal={setShowLastRoundModal}
        isLastRound={isLastRound}
        setIsLastRound={setLastRound}
        lastRoundModalFunction={lastRoundHandler}
        notLastRoundHandler={notLastRoundHandler}
      />
      <UpdateStatusModal
        showModal={showModal}
        setShowModal={setShowModal}
        ImportExcel={handleImport}
      />
    </div>
  )
}

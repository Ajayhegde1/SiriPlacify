import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { read, utils, writeFile } from 'xlsx'

import sheet from '../../../../public/sheets.png'
import exportIMG from '../../../../public/export.png'
import ppt from '../../../../public/pptIcon.png'
import test from '../../../../public/testIcon.png'
import interview from '../../../../public/interviewIcon.png'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import StatusOfHire from '@/components/StatusOfHire'
import Candidates from '@/components/Candidates'
import UpdateStatusModal from '@/components/Modal/UpdateStatusModal'
import SetPPTModal from '@/components/Modal/SetPPTModal'
import SetTestLinkModal from '@/components/Modal/SetTestLinkModal'
import SetInterviewModal from '@/components/Modal/SetInterviewModal'

import { getCandidates, UpdateStatus } from '@/redux/Sagas/requests/features'

import arrow from '@/public/arrow.png'

import { notificationTypes, openNotification } from '@/utils/notifications'
import { getJobData } from '@/redux/Sagas/requests/features'

export default function College() {
  const router = useRouter()
  const user = useSelector((state) => state.user)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showPPTModal, setShowPPTModal] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [showIntModal, setShowIntModal] = useState(false)

  const [candidates, setCandidates] = useState([])
  const [filteredStudentList, setFilteredStudentList] = useState([])
  const [promoteStudents, setPromoteStudents] = useState([])
  const [pptData, setPptData] = useState({})
  const [testData, setTestData] = useState({})
  const [intData, setIntData] = useState({})

  const [collegeName, setCollegeName] = useState('')
  const [status, setStatus] = useState(1)

  const { jobID, collegeID } = router.query

  useEffect(() => {
    if (user === null) {
      router.push('/NotAuthorized')
    } else if (user !== null) {
      if (user.accType !== '2') {
        router.push('/NotAuthorized')
      } else {
        if (typeof jobID !== 'undefined' && typeof collegeID !== 'undefined') {
          getCandidates(jobID, collegeID)
            .then((res) => {
              if (res.data.status === 200 || res.data.status === '200' || res.data.status === 'ok') {
                setCollegeName(res.data.collegeName)
                setCandidates(res.data.data)
                setFilteredStudentList(res.data.data.filter((student) => student.studentStatus === '0'))
              } else if (res.data.status === 401) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Session ID is invalid or not present'
                )
              } else if (res.data.status === 423) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Unable to retrieve company'
                )
              } else if (res.data.status === 424) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'job or college is undefined'
                )
              } else if (res.data.status === 425) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'job or college is empty'
                )
              } else if (res.data.status === 426) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Unable to retrieve job or college id'
                )
              } else if (res.data.status === 500) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Unable to retrieve candidates'
                )
              }
            })
            .catch((err) => {
              openNotification(
                notificationTypes.ERROR,
                'Error'
              )
            })
          getJobData(jobID, collegeID)
            .then((res) => {
              if (res.data.status === 200) {
                setPptData(res.data.data.pptData)
                setTestData(res.data.data.testData)
                setIntData(res.data.data.interviewData)
              }
              else {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Unable to retrieve job data'
                )
              }
            })
            .catch((err) => {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Unable to retrieve job data'
              )
            })
        }
      }
    }
  }, [jobID, collegeName])

  const handleExport = () => {
    const headings = [
      [
        'uid',
        'studentID',
        'username',
        'email',
        'contactNo',
        'tenthMarks',
        'twelthMarks',
        'studentUGMarks',
        'studentPGMarks',
        'status',
        'studentDescription'
      ]
    ]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    const outdata = JSON.stringify(candidates, [
      'uid',
      'studentID',
      'username',
      'email',
      'contactNo',
      'tenthMarks',
      'twelthMarks',
      'studentUGMarks',
      'studentPGMarks',
      'studentStatus',
      'studentDescription'
    ])
    const output = JSON.parse(outdata)
    utils.sheet_add_json(ws, output, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Students List')
    writeFile(wb, 'candidatesData.xlsx')
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

  const handlePromoteStudents = () => {
    const stdList = filteredStudentList.map((student) => {
      return { email: student.email, status: student.status }
    })

    const rejectedStudents = stdList.filter((student) =>
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

  const setApplied = () => {
    setStatus(1)
    const filtered = candidates.filter((student) => student.studentStatus === '0')
    setFilteredStudentList(filtered)
  }

  const setShortlisted = () => {
    setStatus(2)
    const filtered = candidates.filter((student) => student.studentStatus === '1')
    setFilteredStudentList(filtered)
  }

  const setTest = () => {
    setStatus(3)
    const filtered = candidates.filter((student) => student.studentStatus === '2')
    setFilteredStudentList(filtered)
  }

  const setInterview = () => {
    setStatus(4)
    const filtered = candidates.filter((student) => student.studentStatus === '3')
    setFilteredStudentList(filtered)
  }

  const setHired = () => {
    setStatus(5)
    const filtered = candidates.filter((student) => student.studentStatus === '4')
    setFilteredStudentList(filtered)
  }

  const setRejected = () => {
    setStatus(6)
    const filtered = candidates.filter((student) => student.studentStatus === '5')
    setFilteredStudentList(filtered)
  }

  return (
    <div className='bg-gray-200 min-h-screen'>
      <DocHeader
        DocTitle='Jobs'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={2}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <div className='pt-14 ml-0 md:ml-6 flex flex-row'>
          <Link href={`/jobs/companyJobs/${jobID}`}>
            <Image
              src={arrow}
              alt='arrow-left'
              className='my-auto h-12 w-12'
            />
          </Link>
          {
            collegeName === null
              ? <>
              </>
              : collegeName === ''
                ? <div>
                  undefined colleges
                </div>
                : <h1 className='ml-2 mt-2 text-lg md:text-2xl font-Heading font-bold text-black'>
                  {collegeName}
                </h1>
          }
        </div>
        <div className='flex flex-col md:flex-row gap-0 md:gap-2 mb-6'>
          <div className='ml-3 md:ml-6 mt-10 flex flex-col xl:flex-row gap-4 justify-start mr-3 md:mr-12'>
            <div>
              <button
                onClick={() => setShowPPTModal(true)}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={ppt}
                  alt='ppt'
                  className='h-6 w-6 mr-2'
                  width={20}
                  height={20}
                />
                {
                  pptData === null
                    ?
                    <span>
                      Schedule PPT
                    </span>
                    :
                    Object.keys(pptData).length === 0
                      ?
                      <span>
                        Schedule PPT
                      </span>
                      :
                      <span>
                        View PPT
                      </span>
                }
              </button>
            </div>
            <div>
              <button
                onClick={() => setShowTestModal(true)}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={test}
                  alt='Test'
                  className='h-6 w-6 mr-2'
                  width={20}
                  height={20}
                />
                {
                  testData === null
                    ?
                    <span>
                      Schedule Test
                    </span>
                    :
                    Object.keys(testData).length === 0
                      ?
                      <span>
                        Schedule Test
                      </span>
                      :
                      <span>
                        View Test
                      </span>
                }
              </button>
            </div>
            <div>
              <button
                onClick={() => setShowIntModal(true)}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={interview}
                  alt='Interview'
                  className='h-6 w-6 mr-2'
                  width={20}
                  height={20}
                />
                {
                  testData === null
                    ?
                    <span>
                      Schedule Interview
                    </span>
                    :
                    Object.keys(testData).length === 0
                      ?
                      <span>
                        Schedule Interview
                      </span>
                      :
                      <span>
                        View Interview
                      </span>
                }
              </button>
            </div>
          </div>
          <div className='mt-4 md:mt-10 flex flex-col xl:flex-row gap-4 ml-3 md:ml-auto mr-3 md:mr-12'>
            <div>
              <button
                onClick={handleExport}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={exportIMG}
                  alt='Export Students Data to excel'
                  className='h-5 w-5 mt-1 mr-2'
                  width={20}
                  height={20}
                />
                Export Students Data to excel
              </button>
            </div>
            <div>
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
          </div>
        </div>
        <div className='pb-10'>
          <div className='mt-4 ml-3 md:ml-6 bg-white mr-10 rounded-xl p-6'>
            {
              candidates === null || typeof candidates === 'undefined'
                ? <div />
                : candidates.length === 0
                  ? <>
                  </>
                  : <StatusOfHire
                    students={candidates}
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
            {
              candidates === null || typeof candidates === 'undefined'
                ? <div>
                  Loading...
                </div>
                : candidates.length === 0
                  ? <div className='mt-6 mb-3 ml-6 font-medium'>
                    No students have applied yet
                  </div>
                  : <Candidates
                    students={filteredStudentList}
                    promoteStudents={promoteStudents}
                    setPromoteStudents={setPromoteStudents}
                    jobID={jobID}
                    collegeID={collegeID}
                  />
            }
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
          </div>
        </div>
      </main>
      <UpdateStatusModal
        showModal={showModal}
        setShowModal={setShowModal}
        ImportExcel={handleImport}
      />
      <SetPPTModal
        showModal={showPPTModal}
        setShowModal={setShowPPTModal}
        jobID={jobID}
        collegeID={collegeID}
        data={pptData}
      />
      <SetTestLinkModal
        showModal={showTestModal}
        setShowModal={setShowTestModal}
        jobID={jobID}
        collegeID={collegeID}
        data={testData}
      />
      <SetInterviewModal
        showModal={showIntModal}
        setShowModal={setShowIntModal}
        jobID={jobID}
        collegeID={collegeID}
        data={intData}
      />
    </div>
  )
}

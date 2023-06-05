import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Link from 'next/link'
import { read, utils } from 'xlsx'

import sheet from '../../../../public/sheets.png'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import StatusOfHire from '@/components/StatusOfHire'
import Candidates from '@/components/Candidates'
import UpdateStatusModal from '@/components/Modal/UpdateStatusModal'
import { useSelector } from 'react-redux'

import { getCandidates, UpdateStatus } from '@/redux/Sagas/requests/features'

import arrow from '@/public/arrow.png'

import { notificationTypes, openNotification } from '@/utils/notifications'

export default function College () {
  const router = useRouter()
  const user = useSelector((state) => state.user)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [candidates, setCandidates] = useState([])
  const [filteredStudentList, setFilteredStudentList] = useState([])
  const [promoteStudents, setPromoteStudents] = useState([])

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
              }
            })
            .catch((err) => {
              openNotification(
                notificationTypes.ERROR,
                'Error'
              )
            })
        }
      }
    }
  }, [jobID, collegeName])

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

  const handlePromoteStudents = () => {
    const data = {
      jobID,
      collegeID,
      candidates: promoteStudents
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
        <div className='pt-14 ml-0 md:ml-6 flex flex-col md:flex-row'>
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
        <div>
          <button
            onClick={() => setShowModal(true)}
            className='mt-5 flex mr-auto lg:mr-12 ml-3 md:ml-10 lg:ml-auto hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black p-4'
          >
            <Image
              src={sheet}
              alt='Import excel sheet'
              className='h-5 mt-1 mr-2'
            />
            Import from excel
          </button>
        </div>
        <div className='mt-4 ml-3 md:ml-6 bg-white mb-10 mr-10 rounded-xl p-6'>
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
                  />
          }
          <div className='flex'>
            <button
              type='button'
              className='mt-6 mb-3 ml-auto mr-2 font-medium bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handlePromoteStudents}
            >
              Send to next round
            </button>
          </div>
        </div>
      </main>
      <UpdateStatusModal
        showModal={showModal}
        setShowModal={setShowModal}
        ImportExcel={handleImport}
      />
    </div>
  )
}

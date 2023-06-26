import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import { read, utils, writeFile } from 'xlsx'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import AppliedStudents from '@/components/AppliedStudents'
import JobDesc from '@/components/JobDesc'

import arrow from '@/public/arrow.png'
import download from '@/public/download.png'
import arrDown from '@/public/arrowdown.png'
import overview from '@/public/overview.png'
import microphone from '@/public/megaphone.png'

import { getJob } from '@/redux/Sagas/requests/features'
import { routes } from '@/constants/routes'

import { notificationTypes, openNotification } from '@/utils/notifications'

export default function CurrentJobs () {
  const router = useRouter()

  const user = useSelector((state) => state.user)

  const [jobSection, setJobSection] = useState(1)
  const [studentList, setStudentList] = useState([])
  const [dept,setDept] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [job, setJob] = useState({})

  const { id } = router.query

  const setDeclinedJobsSection = () => {
    setJobSection(1)
  }

  const setDegree = () => {
    setJobSection(2)
  }

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
    const outdata = JSON.stringify(studentList, [
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

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '0') {
        router.push(routes.NOTFOUND)
      } else {
        if (typeof id !== 'undefined') {
          getJob(id)
            .then((res) => {
              if (res.data.status === 200) {
                setJob(res.data.data)
                if (typeof res.data.data.jobDept !== 'undefined' && res.data.data.jobDept !== null && res.data.data.jobDept.length > 0) {
                  let deet = res.data.data.jobDept
                  deet = deet.map((department) => {
                    return {
                      value: department.id,
                      label: department.depName
                    }
                  })
                  setDept(deet)
                }
              } else if (res.data.status === 423) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Job ID needs to be defined'
                )
              } else if (res.data.status === 424) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Job ID can not be empty'
                )
              } else if (res.data.status === 500) {
                openNotification(
                  notificationTypes.ERROR,
                  'Error',
                  'Unable to get job'
                )
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
  }, [id])

  const handleEdit = () => {
    console.log('edit')
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
        <div className='pt-14 ml-0 md:ml-6 flex flex-col xl:flex-row'>
          <Link href='/jobs'>
            <Image
              src={arrow}
              alt='arrow-left'
              className='my-auto h-12 w-12'
            />
          </Link>
          {
                        job === null
                          ? <div />
                          : Object.keys(job).length === 0
                            ? <div>
                              No Data Found
                              </div>
                            : <div className='ml-2 md:ml-6'>
                              <p
                                className='font-SubHeading text-base text-gray-400 font-bold'
                              >
                                {job.jobSector}
                              </p>
                              <h1 className='mt-1 text-lg md:text-xl font-Heading font-bold text-black'>
                                {job.jobTitle}
                              </h1>
                              <p
                                className='pt-1 font-SubHeading text-base text-gray-400 font-bold'
                              >
                                {job.companyName} • {job.jobPositionType}
                              </p>
                            </div>
                    }
          <div className='mr-10 md:mr-20 ml-5 xl:ml-auto mt-6 grid grid-cols-2 gap-2'>
            <div className='h-12 font-bold rounded-lg text-gray-600 py-2 px-4 bg-gray-200 border-2 border-gray-400'>
              <div className='flex flex-row'>
                <Image
                  src={overview}
                  alt='arrow-left'
                  className='my-auto h-6 w-6 mr-2'
                />
                Overview
              </div>
            </div>
            <div className='h-12 font-bold rounded-lg text-gray-600 py-2 px-4 bg-gray-200 border-2 border-gray-400'>
              <div className='flex flex-row'>
                <Image
                  src={microphone}
                  alt='arrow-left'
                  className='my-auto h-6 w-6 mr-2'
                />
                Make announce
              </div>
            </div>
          </div>
        </div>
        <div className='mt-10 ml-2 md:ml-10 pr-20 flex flex-row border-b-2 border-gray-300'>
          <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            <div
              className={jobSection === 1 ? 'pb-1 border-b-4 border-green-900' : ''}
              onClick={setDeclinedJobsSection}
            >
              <span className='text-lg font-Heading font-semibold text-black pr-2'>Candidates</span>
            </div>
            <div
              className={jobSection === 2 ? 'pb-1 border-b-4 border-green-900' : ''}
              onClick={setDegree}
            >
              <span className='text-lg font-Heading font-semibold text-black pr-2'>Job Details</span>
            </div>
          </div>
          {
                        jobSection === 1

                          ? <div 
                            onClick={handleExport}
                            className='px-2 py-1 rounded cursor-pointer ml-auto flex flex-row'>
                            <Image
                              src={download}
                              alt='arrow-left'
                              className='mt-1 h-6 w-6 mr-3'
                            />
                            <p className='mt-1 text-lg font-Heading font-bold text-black pr-1'>

                              Download
                            </p>
                          </div>
                          : <></>
                    }
        </div>
        {
                    jobSection === 1
                      ? job === null
                        ? <></>
                        : id === null
                          ? <></>
                          : <AppliedStudents
                              jobID={id}
                              studentList={studentList}
                              setStudentList={setStudentList}
                            />
                      : job === null
                        ? <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                          <Spin size='large' />
                          </div>
                        : Object.keys(job).length === 0
                          ? <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                            No Data Found
                            </div>
                          : <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                            <JobDesc
                              jobID={job.uid}
                              jdFile={job.briefJDFile}
                              companyName={job.companyName}
                              companyDesc=''
                              jobTitle={job.jobTitle}
                              jobLocation={job.jobLocation}
                              jobPosition={job.jobPositionType}
                              jobSector={job.jobSector}
                              jobCTC={job.jobCTC}
                              jobDesc={job.jobDescription}
                              jobDept={dept}
                              jobBond={job.jobBond}
                              jobCriteria={job.jobCriteria}
                              basePay={job.basePay}
                              variablePay={job.variablePay}
                              RSU={job.RSU}
                              tenthMarks={job.tenthMarks}
                              twelfthMarks={job.twelfthMarks}
                              UGCgpa={job.ugCGPA}
                              jobSection={1}
                              isEdit={isEdit}
                              setIsEdit={setIsEdit}
                              handleEditFunction={handleEdit}
                            />
                          </div>
                }
        <br />
        <br />
      </main>
    </div>
  )
}

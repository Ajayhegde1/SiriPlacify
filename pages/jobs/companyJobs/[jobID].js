import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import arrow from '@/public/arrow.png'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import CollegesList from '@/components/CollegesList'
import JobDesc from '@/components/JobDesc'
import ModeOfSelection from '@/components/ModeOfSelection'
import CompanyContact from '@/components/CompanyContact'
import OfferedCollegesList from '@/components/OfferedCollegesList'

import { getJob, closeJob, updateJob } from '@/redux/Sagas/requests/features'
import { openNotification, notificationTypes } from '@/utils/notifications'
import { routes } from '@/constants/routes'

export default function CompanyJobs () {
  const router = useRouter()

  const user = useSelector((state) => state.user)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobSection, setJobSection] = useState(1)
  const [isOffered, setIsOffered] = useState(1)
  const [job, setJob] = useState({})
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobLocation, setJobLocation] = useState('')
  const [jobPosition, setJobPosition] = useState('')
  const [jobSector, setJobSector] = useState('')
  const [jobCTC, setJobCTC] = useState('')
  const [jobBasePay, setJobBasePay] = useState('')
  const [jobVariablePay, setJobVariablePay] = useState('')
  const [jobRSU, setJobRSU] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [jobBond, setJobBond] = useState('')
  const [jobCriteria, setJobCriteria] = useState('')
  const [jobModeOfSelection, setJobModeOfSelection] = useState('')
  const [jobContactName, setJobContactName] = useState('')
  const [jobContactPhoneNo, setJobContactPhoneNo] = useState('')
  const [jobContactEmail, setJobContactEmail] = useState('')
  const [jobFinalSelection, setJobFinalSelection] = useState('')
  const [tenthMarks, setTenthMarks] = useState(0.0)
  const [twelfthMarks, setTwelfthMarks] = useState(0.0)
  const [UGCgpa, setUGCgpa] = useState(0.0)
  const [isEdit, setIsEdit] = useState(false)

  const { jobID } = router.query

  const setCollegesSection = () => {
    setJobSection(1)
    setIsOffered(1)
  }

  const setOfferedCollegesSection = () => {
    setJobSection(2)
    setIsOffered(2)
  }

  const setDegree = () => {
    setJobSection(3)
  }

  const handleCloseJob = () => {
    closeJob(jobID)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(
            notificationTypes.SUCCESS,
            'Job Closed'
          )
          router.push('/jobs')
        } else if (res.data.status === 423) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Job ID is invalid'
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to close job'
          )
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            res.data.message
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

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '2') {
        router.push(routes.NOTFOUND)
      } else {
        if (typeof jobID !== 'undefined') {
          getJob(jobID)
            .then((res) => {
              if (res.data.status === 200) {
                setJob(res.data.data)
                setCompanyName(res.data.data.companyName)
                setJobTitle(res.data.data.jobTitle)
                setJobLocation(res.data.data.jobLocation)
                setJobPosition(res.data.data.jobPositionType)
                setJobSector(res.data.data.jobSector)
                setJobCTC(res.data.data.jobCTC)
                setJobDesc(res.data.data.jobDescription)
                setJobBond(res.data.data.jobBond)
                setJobBasePay(res.data.data.basePay)
                setJobVariablePay(res.data.data.variablePay)
                setJobRSU(res.data.data.RSU)
                setJobCriteria(res.data.data.jobCriteria)
                setJobModeOfSelection(res.data.data.jobTestMode)
                setJobContactName(res.data.data.jobContactName)
                setJobContactPhoneNo(res.data.data.jobContactNumber)
                setJobContactEmail(res.data.data.jobContactEmail)
                setJobFinalSelection(res.data.data.jobFinalSelection)
                setTenthMarks(res.data.data.tenthMarks)
                setTwelfthMarks(res.data.data.twelfthMarks)
                setUGCgpa(res.data.data.ugCGPA)
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
  }, [jobID])

  const handleEdit = () => {
    const data = {
      jobTitle,
      jobBasePay,
      jobVariablePay,
      jobRSU,
      jobLocation,
      jobPositionType: jobPosition,
      jobSector,
      jobCTC,
      jobDescription: jobDesc,
      jobBond,
      jobCriteria,
      jobTestMode: jobModeOfSelection,
      jobContactName,
      jobContactPhoneNo,
      jobContactEmail,
      jobFinalSelection,
      tenthMarks,
      twelfthMarks,
      UGCgpa
    }
    updateJob(jobID, data)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(
            notificationTypes.SUCCESS,
            'Job Updated'
          )
        } else if (res.data.status === 423) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            res.data.message
          )
        } else if (res.data.status === 424) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            res.data.message
          )
        } else if (res.data.status === 425) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            res.data.message
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to update job'
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Unable to update job'
        )
      })

    setTimeout(() => {
      window.location.reload()
    }, 4000)
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
        </div>
        <div className='mt-10 ml-2 md:ml-10 pr-20 flex flex-row border-b-2 border-gray-300'>
          <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            <div
              className={jobSection === 1 ? 'pb-1 border-b-4 border-green-900' : ''}
              onClick={setCollegesSection}
            >
              <span className='text-lg font-Heading font-semibold text-black pr-2'>List of colleges</span>
            </div>
            <div
              className={jobSection === 2 ? 'pb-1 border-b-4 border-green-900' : ''}
              onClick={setOfferedCollegesSection}
            >
              <span className='text-lg font-Heading font-semibold text-black pr-2'>List of offered colleges</span>
            </div>
            <div
              className={jobSection === 3 ? 'pb-1 border-b-4 border-green-900' : ''}
              onClick={setDegree}
            >
              <span className='text-lg font-Heading font-semibold text-black pr-2'>Job Details</span>
            </div>
          </div>
        </div>
        {
          jobSection === 1
            ? job === null
              ? <></>
              : jobID === null
                ? <></>
                : <CollegesList
                    collegeType={isOffered}
                    jobID={jobID}
                  />
            : jobSection === 2
              ? job === null
                ? <></>
                : jobID === null
                  ? <></>
                  : <OfferedCollegesList
                      collegeType={isOffered}
                      jobID={jobID}
                    />
              : job === null
                ? <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                  Loading ...
                </div>
                : Object.keys(job).length === 0
                  ? <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                    No Data Found
                  </div>
                  : <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                    <div className='flex'>
                      <button
                        className='rounded-lg text-lg px-4 py-2 text-white ml-auto mr-5 border-red-500 hover:border-red-600 bg-red-500 hover:bg-red-600'
                        onClick={handleCloseJob}
                      >
                        Close Job
                      </button>
                    </div>
                    <JobDesc
                      companyName={job.companyName}
                      setCompanyName={setCompanyName}
                      companyDesc=''
                      jobTitle={jobTitle}
                      setJobTitle={setJobTitle}
                      jobLocation={jobLocation}
                      setJobLocation={setJobLocation}
                      jobPosition={jobPosition}
                      setJobPosition={setJobPosition}
                      jobSector={jobSector}
                      setJobSector={setJobSector}
                      jobCTC={jobCTC}
                      setJobCTC={setJobCTC}
                      basePay={jobBasePay}
                      setBasePay={setJobBasePay}
                      variablePay={jobVariablePay}
                      setVariablePay={setJobVariablePay}
                      RSU={jobRSU}
                      setRSU={setJobRSU}
                      jobDesc={jobDesc}
                      setJobDesc={setJobDesc}
                      jobBond={jobBond}
                      setJobBond={setJobBond}
                      jobCriteria={jobCriteria}
                      setJobCriteria={setJobCriteria}
                      tenthMarks={tenthMarks}
                      setTenthMarks={setTenthMarks}
                      twelfthMarks={twelfthMarks}
                      setTwelfthMarks={setTwelfthMarks}
                      UGCgpa={UGCgpa}
                      setUGCgpa={setUGCgpa}
                      jobSection={1}
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                      handleEditFunction={handleEdit}
                    />
                    <ModeOfSelection
                      modeOfSelection={jobModeOfSelection}
                      setModeOfSelection={setJobModeOfSelection}
                      finalDesc={jobFinalSelection}
                      setFinalDesc={setJobFinalSelection}
                      isEdit={isEdit}
                    />
                    <CompanyContact
                      contactName={job.jobContactName}
                      setJobContactName={setJobContactName}
                      contactEmail={job.jobContactEmail}
                      setContactEmail={setJobContactEmail}
                      contactPhone={jobContactPhoneNo}
                      setContactPhone={setJobContactPhoneNo}
                      isEdit={isEdit}
                    />
                  </div>
        }
        <br />
      </main>
    </div>
  )
}

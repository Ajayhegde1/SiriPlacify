import { useState, useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { Spin } from 'antd'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { getJob } from '@/redux/Sagas/requests/features'
import { routes } from '@/constants/routes'

import { notificationTypes, openNotification } from '@/utils/notifications'

import DownloadApplicants from '@/components/DownloadApplicants'
const LazyAppliedStudents = lazy(() => import('@/components/AppliedStudents'))
const LazyJobScheduler = lazy(() => import('@/components/JobScheduler'))
const LazyJobDetails = lazy(() => import('@/components/JobDetails'))
const LazyJobBackButton = lazy(() => import('@/components/JobBackButton'))

export default function CurrentJobs() {
  const router = useRouter()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const college = useSelector((state) => state.profile)

  const [jobSection, setJobSection] = useState(1)
  const [studentList, setStudentList] = useState([])
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobLocation, setJobLocation] = useState('')
  const [jobPosition, setJobPosition] = useState('')
  const [jobSector, setJobSector] = useState([])
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
  const [jobDept, setjobDept] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [job, setJob] = useState({})

  const { id } = router.query

  const setDeclinedJobsSection = () => {
    setJobSection(1)
  }

  const setDegree = () => {
    setJobSection(2)
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
                setCompanyName(res.data.data.companyName)
                setJobTitle(res.data.data.jobTitle)
                setJobLocation(res.data.data.jobLocation)
                setJobPosition(res.data.data.jobPositionType)
                if (typeof res.data.data.jobSector !== 'undefined' && res.data.data.jobSector !== null && res.data.data.jobSector.length > 0) {
                  let sectors = res.data.data.jobSector
                  sectors = sectors.map((sector) => {
                    return{
                      value: sector.id,
                      label: sector.sectorName
                    }
                  })
                  setJobSector(sectors)
                }
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
                setUGCgpa(res.data.data.UGCgpa)
                if (typeof res.data.data.jobDept !== 'undefined' && res.data.data.jobDept !== null && res.data.data.jobDept.length > 0) {
                  let deet = res.data.data.jobDept
                  deet = deet.map((department) => {
                    return {
                      ...department,
                      value: department.id,
                      label: department.depName
                    }
                  })
                  setjobDept(deet)
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
  }, [id, dispatch])

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
          <Suspense fallback={<Spin size='large' />}>
            <LazyJobBackButton
              companyName={companyName}
              jobPositionType={jobPosition}
              jobTitle={jobTitle}
            />
          </Suspense>
        </div>
        <Suspense fallback={<Spin size='large' />}>
          <LazyJobScheduler
            jobID={id}
          />
        </Suspense>
        <div className='mt-10 ml-2 md:ml-10 pr-8 md:pr-20 flex flex-row border-b-2 border-gray-300'>
          <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            <div
              className={jobSection === 1 ? 'pb-1 border-b-4 border-green-900 cursor-pointer' : 'cursor-pointer'}
              onClick={setDeclinedJobsSection}
            >
              <span className='text-lg font-Heading font-semibold text-black pr-2'>Candidates</span>
            </div>
            <div
              className={jobSection === 2 ? 'pb-1 border-b-4 border-green-900 cursor-pointer' : 'cursor-pointer'}
              onClick={setDegree}
            >
              <span className='text-lg font-Heading font-semibold text-black pr-2'>Job Details</span>
            </div>
          </div>
          {
            jobSection === 1
              ?
              <DownloadApplicants
                studentList={studentList}
              />
              :
              <></>
          }
        </div>
        {
          jobSection === 1
            ? job === null
              ? <></>
              : id === null
                ? <></>
                : <Suspense fallback={<Spin size='large' />}>
                  <LazyAppliedStudents
                    jobID={id}
                    collegeID={college === null ? '' : college.uid}
                    studentList={studentList}
                    setStudentList={setStudentList}
                  />
                </Suspense>
            : job === null
              ? <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                <Spin size='large' />
              </div>
              : Object.keys(job).length === 0
                ? <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                  No Data Found
                </div>
                : <Suspense fallback={<Spin size='large' />}>
                  <LazyJobDetails
                    jobID={id}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    jobTitle={jobTitle}
                    setJobTitle={setJobTitle}
                    jobLocation={jobLocation}
                    setJobLocation={setJobLocation}
                    jobPositionType={jobPosition}
                    setJobPosition={setJobPosition}
                    jobSector={jobSector}
                    setJobSector={setJobSector}
                    jobCTC={jobCTC}
                    setJobCTC={setJobCTC}
                    basePay={jobBasePay}
                    setBasePay={setJobBasePay}
                    variablePay={jobVariablePay}
                    jobDept={jobDept}
                    setJobDept={setjobDept}
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
                    modeOfSelection={jobModeOfSelection}
                    setModeOfSelection={setJobModeOfSelection}
                    finalDesc={jobFinalSelection}
                    setFinalDesc={setJobFinalSelection}
                    contactName={jobContactName}
                    setJobContactName={setJobContactName}
                    contactEmail={jobContactEmail}
                    setContactEmail={setJobContactEmail}
                    contactPhone={jobContactPhoneNo}
                    setContactPhone={setJobContactPhoneNo}
                  />
                </Suspense>
        }
        <br />
        <br />
      </main>
    </div>
  )
}

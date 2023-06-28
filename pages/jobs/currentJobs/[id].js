import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { Spin } from 'antd'
import { read, utils, writeFile } from 'xlsx'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import AppliedStudents from '@/components/AppliedStudents'
import JobDesc from '@/components/JobDesc'
import ModeOfSelection from '@/components/ModeOfSelection'
import CompanyContact from '@/components/CompanyContact'
import SetPPTModal from '@/components/Modal/SetPPTModal'
import SetTestLinkModal from '@/components/Modal/SetTestLinkModal'
import SetInterviewModal from '@/components/Modal/SetInterviewModal'

import arrow from '@/public/arrow.png'
import download from '@/public/download.png'
import ppt from '@/public/pptIcon.png'
import test from '@/public/testIcon.png'
import interview from '@/public/interviewIcon.png'
import overview from '@/public/overview.png'
import microphone from '@/public/megaphone.png'

import { getJob, updateJobTPO,getJobData } from '@/redux/Sagas/requests/features'
import { routes } from '@/constants/routes'
import { getProfile } from '@/redux/Slices/profile'

import { notificationTypes, openNotification } from '@/utils/notifications'

export default function CurrentJobs() {
  const router = useRouter()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const college = useSelector((state) => state.profile)

  const [jobSection, setJobSection] = useState(1)
  const [pptData, setPptData] = useState({})
  const [testData, setTestData] = useState({})
  const [intData, setIntData] = useState({})
  const [showPPTModal, setShowPPTModal] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [showIntModal, setShowIntModal] = useState(false)
  const [studentList, setStudentList] = useState([])
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
  const [jobDept, setjobDept] = useState([])
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
        dispatch(getProfile())
        if (typeof id !== 'undefined') {
          getJob(id)
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
                setUGCgpa(res.data.data.UGCgpa)
                if (typeof res.data.data.jobDept !== 'undefined' && res.data.data.jobDept !== null && res.data.data.jobDept.length > 0) {
                  let deet = res.data.data.jobDept
                  deet = deet.map((department) => {
                    return {
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
          if (college !== null){
            getJobData(id, college.uid)
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
    }
  }, [id, dispatch])

  const handleEdit = () => {
    const data = {
      companyName,
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
      UGCgpa,
      dept: jobDept
    }
    updateJobTPO(id, data)
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
                  intData === null
                    ?
                    <span>
                      Schedule Interview
                    </span>
                    :
                    Object.keys(intData).length === 0
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
                    companyName={companyName}
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
        <br />
      </main>
      <SetPPTModal
        showModal={showPPTModal}
        setShowModal={setShowPPTModal}
        jobID={id}
        collegeID={college === null ? '' : college.uid}
        data={pptData}
      />
      <SetTestLinkModal
        showModal={showTestModal}
        setShowModal={setShowTestModal}
        jobID={id}
        collegeID={college === null ? '' : college.uid}
        data={testData}
      />
      <SetInterviewModal
        showModal={showIntModal}
        setShowModal={setShowIntModal}
        jobID={id}
        collegeID={college === null ? '' : college.uid}
        data={intData}
      />
    </div>
  )
}

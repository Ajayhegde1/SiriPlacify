import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import arrow from '@/public/arrow.png'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { getJob, closeJob } from '@/redux/Sagas/requests/features'
import CollegesList from '@/components/CollegesList'
import JobDesc from '@/components/JobDesc'
import OfferedCollegesList from '@/components/OfferedCollegesList'
import { openNotification, notificationTypes } from '@/utils/notifications'

export default function CompanyJobs () {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobSection, setJobSection] = useState(1)
  const [isOffered, setIsOffered] = useState(1)
  const [job, setJob] = useState({})

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
        if (res.data.status === 200){
          openNotification(
            notificationTypes.SUCCESS,
            'Job Closed'
          )
          router.push('/jobs')
        }
        else{
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
    if (typeof jobID !== 'undefined') {
      getJob(jobID)
        .then((res) => {
          setJob(res.data.data)
        })
        .catch((err) => {
          openNotification(
            notificationTypes.ERROR,
            'Error'
          )
        })
    }
  }, [jobID])

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
                              <div className="flex">
                                <button 
                                  className='rounded-lg text-lg px-4 py-2 text-white ml-auto mr-5 border-red-500 hover:border-red-600 bg-red-500 hover:bg-red-600'
                                  onClick={handleCloseJob}
                                >
                                  Close Job
                                </button>
                              </div>
                              <JobDesc
                                companyName={job.companyName}
                                companyDesc=''
                                jobTitle={job.jobTitle}
                                jobLocation={job.jobLocation}
                                jobPosition={job.jobPositionType}
                                jobSector={job.jobSector}
                                jobCTC={job.jobCTC}
                                jobDesc={job.jobDescription}
                                jobBond={job.jobBond}
                                jobCriteria={job.jobCriteria}
                                jobSection={1}
                              />
                              </div>
                }
      </main>
    </div>
  )
}

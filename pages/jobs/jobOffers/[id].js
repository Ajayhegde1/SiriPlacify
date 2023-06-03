import { useState, useEffect } from 'react'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import BasicJobInfo from '@/components/BasicJobInfo'

import appleLogo from '@/public/appleLogo.png'
import JobDesc from '@/components/JobDesc'
import ModeOfSelection from '@/components/ModeOfSelection'
import CompanyContact from '@/components/CompanyContact'
import ApplicableCourses from '@/components/ApplicableCourses'

import { getJob } from '@/redux/Sagas/requests/features'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function JobOffers () {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [job, setJob] = useState({})

  const { id } = router.query

  useEffect(() => {
    if (typeof id !== 'undefined') {
      getJob(id)
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
  }, [])

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
        <p
          className='pt-14 ml-3 md:ml-6 mb-12 font-SubHeading text-base font-normal'
        >
          <Link href='/jobs'><span className='text-gray-500'>Home</span></Link> {'>'} Product Designer
        </p>
        {
          job === null
            ? <div>
              Loading
              </div>
            : Object.keys(job).length === 0
              ? <div>
                No job found
                </div>
              : <BasicJobInfo
                  uid={job.uid}
                  logo={appleLogo}
                  jobTitle={job.jobTitle}
                  jobLocation={job.jobLocation}
                  jobCategory={job.jobSector}
                  dueDate={job.dueDate}
                />
        }
        <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
          {
          job === null
            ? <div>
              Loading
              </div>
            : Object.keys(job).length === 0
              ? <div>
                No job found
                </div>
              : <JobDesc
                  companyName={job.companyName}
                  jobTitle={job.jobTitle}
                  jobLocation={job.jobLocation}
                  jobCTC={job.jobCTC}
                  jobDesc={job.jobDescription}
                  jobBond={job.jobBond}
                  jobCriteria={job.jobCriteria}
                  jobPosition={job.jobPositionType}
                  jobSector={job.jobSector}
                  jobSection={2}
                />
          }
          {
          job === null
            ? <div>
              Loading
              </div>
            : Object.keys(job).length === 0
              ? <div>
                No job found
                </div>
              : <ModeOfSelection
                  modeOfSelection={job.jobTestMode}
                  finalDesc={job.jobFinalSelection}
                />
          }
          {
          job === null
            ? <div>
              Loading
              </div>
            : Object.keys(job).length === 0
              ? <div>
                No job found
                </div>
              : <CompanyContact
                  contactName={job.jobContactName}
                  contactEmail={job.jobContactEmail}
                  contactPhone={job.jobContactNumber}
                />
          }
        </div>
        {/* <ApplicableCourses /> */}
        <br />
        <br />
      </main>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import appleLogo from '@/public/appleLogo.png'
import JobDesc from '@/components/JobDesc'
import ModeOfSelection from '@/components/ModeOfSelection'
import CompanyContact from '@/components/CompanyContact'
// import ApplicableCourses from '@/components/ApplicableCourses'
import BasicJobInfo from '@/components/BasicJobInfo'
import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { openNotification, notificationTypes } from '@/utils/notifications'

import { getJob } from '@/redux/Sagas/requests/features'
import { routes } from '@/constants/routes'

export default function getStudentJobs () {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dept,setDept] = useState([])
  const [job, setJob] = useState({})

  const user = useSelector((state) => state.user)

  const { id } = router.query

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '1') {
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
        {
                    job === null
                      ? <div>
                        Loading...
                        </div>
                      : Object.keys(job).length === 0
                        ? <div>
                          No Job Found
                          </div>
                        : <>
                          <p
                            className='pt-14 ml-3 md:ml-6 mb-12 font-SubHeading text-base font-normal'
                          >
                            <span className='text-gray-500'><a href='/jobs'>Home</a></span> {'>'} {job.jobTitle}
                          </p>
                          <BasicJobInfo
                            logo={appleLogo}
                            jobTitle={job.jobTitle}
                            jobLocation={job.jobLocation}
                            jobCategory={job.jobSector}
                            dueDate={job.dueDate}
                            jobID={job.uid}
                          />
                          <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                            <JobDesc
                              jobID={job.uid}
                              companyName={job.companyName}
                              jobTitle={job.jobTitle}
                              jobLocation={job.jobLocation}
                              jobCTC={job.jobCTC}
                              jobPosition={job.jobPositionType}
                              jobSector={job.jobSector}
                              jobDesc={job.jobDescription}
                              jobBond={job.jobBond}
                              jobCriteria={job.jobCriteria}
                              basePay={job.basePay}
                              variablePay={job.variablePay}
                              jobDept={dept}
                              RSU={job.RSU}
                              tenthMarks={job.tenthMarks}
                              twelfthMarks={job.twelfthMarks}
                              UGCgpa={job.UGCgpa}
                              jobSection={2}
                            />
                            <ModeOfSelection
                              modeOfSelection={job.jobTestMode}
                              finalDesc={job.jobFinalSelection}
                            />
                            <CompanyContact
                              contactName={job.jobContactName}
                              contactEmail={job.jobContactEmail}
                              contactPhone={job.jobContactNumber}
                            />
                          </div>
                          <br />
                          <br />
                        </>
                }
      </main>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import CurrentJobs from '@/components/CurrentJobs'
import JobOffers from '@/components/JobOffers'
import DeclinedJobs from '@/components/DeclinedJobs'
import JobSection from '@/components/JobSection'

import { getJobs } from '@/redux/Slices/jobSlice'

export default function Jobs () {
  const dispatch = useDispatch()

  const jobs = useSelector((state) => state.jobs)
  const user = useSelector((state) => state.user)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobSection, setJobSection] = useState(1)

  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch])

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
      <main className={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <div className='pt-4 md:py-10 px-4 md:px-6 lg:p-10'>
          <div>
            <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>Jobs</h1>
            {
              user === null
                ? <>
                </>
                : user.accType === '0'
                  ? <JobSection
                      jobSection={jobSection}
                      setJobSection={setJobSection}
                      jobs={jobs}
                    />
                  : <></>
            }
            {
              jobSection === 1
                ? <CurrentJobs
                    jobs={jobs}
                  />
                : jobSection === 2
                  ? <JobOffers />
                  : <DeclinedJobs />
            }
          </div>
        </div>
      </main>
    </div>
  )
}

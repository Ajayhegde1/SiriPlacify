import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import CurrentJobs from '@/components/CurrentJobs'
import JobOffers from '@/components/JobOffers'
import DeclinedJobs from '@/components/DeclinedJobs'
import JobSection from '@/components/JobSection'

import { getJobs } from '@/redux/Slices/jobSlice'
import { getOfferJob } from '@/redux/Slices/offerJobsSlice'
import { getDeclinedJob } from '@/redux/Slices/declinedJobsSlice'
import { getClosedJob } from '@/redux/Slices/closedJobsSlice'

import CompanyJobSection from '@/components/CompanyJobSection'

export default function Jobs() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const jobs = useSelector((state) => state.jobs)
  const offerJobs = useSelector((state) => state.offerJobs)
  const declinedJobs = useSelector((state) => state.declinedJobs)
  const closedJobs = useSelector((state) => state.closedJobs)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobSection, setJobSection] = useState(1)

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      if (user.accType === '0') {
        dispatch(getOfferJob());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      if (user.accType === '0') {
        dispatch(getDeclinedJob());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      if (user.accType === '2') {
        dispatch(getClosedJob());
      }
    }
  }, [dispatch]);

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
                    offerJobs={offerJobs}
                    declinedJobs={declinedJobs}
                  />
                  :
                  user.accType === '2'
                    ?
                    <CompanyJobSection
                      jobSection={jobSection}
                      setJobSection={setJobSection}
                      openJobs={jobs}
                      closedJobs={closedJobs}
                    />
                    :
                    <></>
            }
            {
              user === null
                ?
                <></>
                :
                user.accType === '0'
                  ?
                  jobSection === 1
                    ? <CurrentJobs
                      jobs={jobs}
                    />
                    : jobSection === 2
                      ? <JobOffers
                        jobs={offerJobs}
                      />
                      : <DeclinedJobs
                        jobs={declinedJobs}
                      />
                  :
                  user.accType === '1'
                    ?
                    <CurrentJobs
                      jobs={jobs}
                    />
                    :
                    user.accType === '2'
                      ?
                      jobSection === 1
                        ?
                        <CurrentJobs
                          jobs={jobs}
                        />
                        :
                        jobSection === 2
                          ?
                          <JobOffers
                            jobs={closedJobs}
                          />
                          :
                          <div>
                            You are not logged in or authorized to log in.
                          </div>
                      :
                      <div>
                        You are not logged in or authorized to log in.
                      </div>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

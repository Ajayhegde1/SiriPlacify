import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { getJobApplication } from '@/redux/Slices/jobApplicationSlice'
import { routes } from '@/constants/routes'

export default function myApplications () {
  const router = useRouter()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const jobApplication = useSelector((state) => state.jobApplication)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '1') {
        router.push(routes.NOTFOUND)
      } else {
        dispatch(getJobApplication())
      }
    }
  }, [user, dispatch])

  const handleCustomPage = (id) => {
    router.push(`/applications/${id}`)
  }

  return (
    <div className='min-h-screen bg-gray-200'>
      <DocHeader
        DocTitle='My Applications'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={6}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <h1 className='text-center md:text-left mb-12 ml-2 md:ml-6 pt-6 md:pt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>My Applications</h1>
        <div className='pt-5 px-5 pb-10 rounded-xl mr-4 md:mr-12 overflow-auto'>
          <table className='pb-12 table-auto overflow-scroll w-full mt-3 text-left'>
            <thead className='bg-white rounded-xl border-b-8'>
              <th className='px-6 py-4 text-gray-600'>Company Name</th>
              <th className='px-6 py-4 text-gray-600'>Job Title</th>
              <th className='px-6 py-4 text-gray-600'>Status</th>
            </thead>
            <tbody className='bg-white border-t-8 rounded-xl'>
              {
                jobApplication === null
                  ? <div className='mt-4'>
                    Loading...
                  </div>
                  : jobApplication.length === 0
                    ? <div className='mt-4'>
                      No Applications found
                    </div>
                    : jobApplication.map((job, index) =>
                      <tr onClick={() => handleCustomPage(job.id)} key={index} className='mt-10 border-b-2 border-gray-200'>
                        <td className='font-medium whitespace-nowrap px-6 py-4'>
                          {job.companyName}
                        </td>
                        <td className='font-medium whitespace-nowrap px-6 py-4'>
                          {job.jobTitle}
                        </td>
                        <td className='font-bold whitespace-nowrap px-6 py-4'>
                          {job.jobStatus === '0'
                            ? <span className="text-cyan-600">Applied</span>
                            : job.jobStatus === '1'
                              ? <span className="text-blue-600">Shortlisted</span>
                              : job.jobStatus === '2'
                                ? <span className="text-yellow-600">Test</span>
                                : job.jobStatus === '3'
                                  ? <span className="text-lime-600">Interview</span>
                                  : job.jobStatus === '4' ? <span className="text-green-600">Hired</span> 
                                    : job.jobStatus === '5' 
                                      ? <span className="text-red-800">Rejected</span> 
                                        : 
                                        <span className="text-red-800">Undefined</span>}
                        </td>
                      </tr>
                    )
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

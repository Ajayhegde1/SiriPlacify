import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { Spin } from 'antd'

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
        <h1 className='text-center md:text-left pt-6 mb-6 md:ml-12 pt-6 md:pt-16 text-3xl md:text-5xl  font-semibold text-green-800'>My Applications</h1>
        <div className='pt-5 px-12 rounded-xl mr-4 md:mr-16 overflow-auto'>
          <table className='pb-12 table-auto  rounded overflow-scroll w-full mt-3 text-left'>
            <thead className='rounded-xl border border-b-1 bg-gray-100 '>
              <th className='px-8 py-4 text-black'>Company Name</th>
              <th className='px-8 py-4 text-black'>Job Title</th>
              <th className='px-8 py-4 text-black'>Status</th>
              <th></th>
            </thead>
            <tbody className='bg-white  rounded-xl'>
              {
                jobApplication === null
                  ? <div className='mt-4'>
                    <Spin size='large' />
                  </div>
                  : jobApplication.length === 0
                    ? <div className='mt-4'>
                      No Applications found
                    </div>
                    : jobApplication.map((job, index) =>
                      <tr key={index} className='mt-10 border-b-2 border-gray-200 hover:bg-gray-100 transiiton ease-in-out  '>
                        <td className='font-medium whitespace-nowrap px-8 py-4 capitalize'>
                          {job.companyName}
                        </td>
                        <td className='font-medium whitespace-nowrap px-8 py-4 capitalize'>
                          {job.jobTitle}
                        </td>
                        <td className='font-bold whitespace-nowrap px-8 py-4 text-sm '>
                          {job.jobStatus === '0'
                            ? <span className='text-cyan-600'>Applied</span>
                            : job.jobStatus === '1'
                              ? <span className='text-blue-600'>Shortlisted</span>
                              : job.jobStatus === '2'
                                ? <span className='text-yellow-600'>Test</span>
                                : job.jobStatus === '3'
                                  ? <span className='text-lime-600'>Interview</span>
                                  : job.jobStatus === '4'
                                    ? <span className='text-green-600'>Hired</span>
                                    : job.jobStatus === '5'
                                      ? <span className='text-red-800'>Rejected</span>
                                      : <span className='text-red-800'>Undefined</span>}
                        </td>
                        <td>
                          <button
                            onClick={() => handleCustomPage(job.collegeJobMappingId)}
                            className='text-green-600 font-semibold py-2 px-4 drop-shadow hover:drop-shadow-lg text-green-700 text-sm '
                          >
                            View Application
                          </button>
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

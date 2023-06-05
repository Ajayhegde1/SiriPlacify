import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { getStudentAppliedJobs } from '@/redux/Sagas/requests/features'

import { notificationTypes, openNotification } from '@/utils/notifications'
import { routes } from '@/constants/routes'

export default function myApplications () {
  const router = useRouter()

  const user = useSelector((state) => state.user)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobApplication, setJobApplication] = useState([])

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '1') {
        router.push(routes.NOTFOUND)
      } else {
        getStudentAppliedJobs()
          .then((res) => {
            if (res.data.status === 200) {
              setJobApplication(res.data.data)
            } else {
              openNotification(
                notificationTypes.WARNING,
                'No Jobs Found'
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
  }, [user])

  return (
    <div className='min-h-screen bg-gray-200'>
      <DocHeader
        DocTitle='My Applications'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={9}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <h1 className='text-center md:text-left mb-20 ml-2 md:ml-6 pt-6 md:pt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>My Applications</h1>
        <div className='bg-white p-5 rounded-xl mr-4 md:mr-12 overflow-auto'>
          <table className='table-auto overflow-scroll w-full mt-3 text-left'>
            <thead className='border-2 border-gray-300'>
              <th className='border-r-2 border-gray-300 px-6 py-4 text-gray-600'>Company Name</th>
              <th className='border-r-2 border-gray-300 px-6 py-4 text-gray-600'>Job Title</th>
              <th className='border-r-2 border-gray-300 px-6 py-4 text-gray-600'>Status</th>
            </thead>
            <tbody>
              {
                jobApplication === null
                  ? <div className='border-2 border-gray-300 mt-4'>
                    Loading...
                  </div>
                  : jobApplication.length === 0
                    ? <div className='mt-4'>
                      No Applications found
                    </div>
                    : jobApplication.map((job, index) =>
                      <tr key={index} className='border-2 border-gray-300'>
                        <td className='font-medium border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                          {job.companyName}
                        </td>
                        <td className='font-medium border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                          {job.jobTitle}
                        </td>
                        <td className='font-medium border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                          {job.jobStatus === '0'
                            ? 'Applied'
                            : job.jobStatus === '1'
                              ? 'Shortlisted'
                              : job.jobStatus === '2'
                                ? 'Test'
                                : job.jobStatus === '3'
                                  ? 'Interview'
                                  : job.jobStatus === '4' ? 'Hired' : job.jobStatus === '5' ? 'Rejected' : 'Undefined'}
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

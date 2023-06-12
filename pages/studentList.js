import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { utils, writeFile } from 'xlsx'

import { getStudents } from '@/redux/Sagas/requests/features'
import { routes } from '@/constants/routes'
import exportIMG from '../public/export.png'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import Candidates from '@/components/Candidates'

export default function UserList () {
  const router = useRouter()

  const user = useSelector((state) => state.user)

  const [students, setStudents] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleExport = () => {
    const headings = [
      [
        'uid',
        'username',
        'email',
        'contactNo',
        'tenthMarks',
        'twelthMarks',
        'studentUGMarks',
        'studentPGMarks',
        'studentDescription',
        'tempPassword'
      ]
    ]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, headings)
    const outdata = JSON.stringify(students, [
      'uid',
      'username',
      'email',
      'contactNo',
      'tenthMarks',
      'twelthMarks',
      'studentUGMarks',
      'studentPGMarks',
      'studentDescription',
      'tempPassword'
    ])
    const output = JSON.parse(outdata)
    utils.sheet_add_json(ws, output, { origin: 'A2', skipHeader: true })
    utils.book_append_sheet(wb, ws, 'Students List')
    writeFile(wb, 'studentsData.xlsx')
  }

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '0') {
        router.push(routes.NOTFOUND)
      } else if (user.accType === '0') {
        getStudents()
          .then((res) => {
            if (res.data.status === 200) {
              setStudents(res.data.data)
            } else if (res.data.status === 401) {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Error identifying user email'
              )
            } else if (res.data.status === 423) {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Unable to retrieve college'
              )
            } else if (res.data.status === 424) {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Error fetching students'
              )
            } else if (res.data.status === 500) {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Unable to get students data'
              )
            }
          })
      }
    }
  }, [user])

  return (
    <div className='bg-gray-200'>
      <DocHeader
        DocTitle='User Management'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={9}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <div className='min-h-screen pt-4 md:py-10 px-4 md:px-6 lg:p-10'>
          <div className='pb-4'>
            <h1 className='text-center md:text-left pt-6 md:pt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>User Management</h1>
          </div>
          <div className='flex ml-auto mb-10 mr-2 gap-2'>
            <button
              onClick={handleExport}
              className='h-16 md:h-14 ml-auto mr-2 gap-2 flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-2'
            >
              <span className='flex my-auto'>
                <Image
                  src={exportIMG}
                  alt='Import excel sheet'
                  className='h-5 w-5 mt-1 mr-2'
                />
                Export Data to excel
              </span>
            </button>
            <button
              className='mt-2 flex h-16 md:h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => router.push(routes.USERMANAGEMENT)}
            >
              Add User
            </button>
          </div>
          <div className='bg-white rounded-xl'>
            {
                            students === null
                              ? <div className='flex justify-center items-center'>
                                <h1 className='text-2xl font-Heading font-bold text-black'>Loading</h1>
                              </div>
                              : students.length === 0
                                ? <div className='flex justify-center items-center'>
                                  <h1 className='text-2xl font-Heading font-bold text-black'>No Students</h1>
                                </div>
                                : <Candidates
                                    students={students}
                                  />
                        }
          </div>
        </div>
      </main>
    </div>
  )
}

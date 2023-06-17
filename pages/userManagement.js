import { read, utils } from 'xlsx'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/router'

import UserAdditionModal from '@/components/Modal/userAdditionModal'
import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import SingleSelectComponent from '@/components/InputComponents/SingleSelectComponent'
import Button from '@/components/Buttons'

import sheet from '../public/sheets.png'
import { accountType } from '@/constants/users'
import { routes } from '@/constants/routes'
import { notificationTypes, openNotification } from '@/utils/notifications'
import { POST } from '@/config/api'
import { getStudents } from '@/redux/Sagas/requests/features'

export default function UserManagement () {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [accType, setAccType] = useState(accountType[0].value)

  const handleImport = ($event) => {
    const files = $event.target.files
    if (files.length) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const wb = read(event.target.result)
        const sheets = wb.SheetNames

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
          const updatedData = rows
          // replace studentName with username in updatedData
          updatedData.forEach((element) => {
            element.username = element.studentName
            delete element.studentName
          })

          POST('/addStudents', updatedData, { sessionID: user.sessionId })
            .then((res) => {
              const status = parseInt(res.data.status)
              if (status === 200 || status === 304 || status === 'ok') {
                openNotification(
                  notificationTypes.SUCCESS,
                  'Success'
                )
              } else {
                openNotification(
                  notificationTypes.ERROR,
                  'Please check your data. It is not in the correct format.'
                )
                window.location.reload()
              }
            }
            )
            .catch((err) => {
              openNotification(
                notificationTypes.ERROR,
                'Please check your data. It is not in the correct format.'
              )
            })
          setShowModal(!showModal)
          openNotification(notificationTypes.SUCCESS, 'Sucess', 'File Uploaded Sucessfully')
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleUserAddition = () => {
    const Data = [
      {
        email,
        accountType: accType,
        username
      }
    ]
    POST('/addStudents', Data, { sessionID: user.sessionId })
      .then((res) => {
        const status = parseInt(res.data.status)
        if (status === 200) {
          openNotification(
            notificationTypes.SUCCESS,
            'Sucess',
            'Student Added'
          )
          window.location.reload()
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Something went wrong, please try again later'
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Something went wrong, please try again later'
        )
      })
  }

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
            <h1 className='text-center md:text-left mb-4 ml-2 md:ml-6 pt-6 md:pt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>User Management</h1>
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
            <div>
              <button
                onClick={() => setShowModal(true)}
                className='ml-2 md:ml-6 flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={sheet}
                  alt='Import excel sheet'
                  className='h-5 mt-1 mr-2'
                />
                Import from excel
              </button>
            </div>
          </div>
          <div className='ml-2 md:ml-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4'>
            <TextField
              label='Email ID'
              placeholder='abc@gmail.com'
              type='text'
              value={email}
              onChangeHandler={e => setEmail(e.target.value)}
            />
            <TextField
              label='Student Name'
              placeholder='abc def'
              type='text'
              value={username}
              onChangeHandler={e => setUsername(e.target.value)}
            />
            <SingleSelectComponent
              value={accType}
              onChangeHandler={(e) => setAccType(e.target.value)}
              options={accountType}
              label='Type of the User'
            />
          </div>
          <div className='mt-8 ml-2 md:ml-6'>
            <Button
              onClickHandler={handleUserAddition}
              btnText='Done'
            />
          </div>
        </div>
      </main>
      <UserAdditionModal
        showModal={showModal}
        setShowModal={setShowModal}
        ImportExcel={handleImport}
      />
    </div>
  )
}

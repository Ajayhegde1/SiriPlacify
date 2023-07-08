import DocHeader from '@/components/DocHeader'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Spin } from 'antd'

import student from '../public/students.png'
import { routes } from '@/constants/routes'
import { uploadResume } from '@/redux/Sagas/requests/features'

import { openNotification, notificationTypes } from '@/utils/notifications'

export default function uploadStudentResume () {
  const router = useRouter()
  const fileInputRef = useRef(null)

  const [isLoading, setLoading] = useState(false)

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '1') {
        router.push(routes.NOTFOUND)
      }
    }
  }, [user])

  const handleResumeChange = (event) => {
    const file = event.target.files[0]
    setLoading(true)
    if (file) {
      try {
        uploadResume(file.name, file.type)
          .then((res) => {
            const url = res.data.url

            axios.put(url, file, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then((res) => {
                openNotification(notificationTypes.SUCCESS, 'Resume uploaded successfully')
                setTimeout(() => {
                  router.push(routes.JOBS)
                }, 2000)
              })
              .catch((err) => {
                console.log(err)
                openNotification(notificationTypes.ERROR, 'Error uploading resume')
              })
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
          })
      } catch (err) {
        console.log(err)
        setLoading(false)
        openNotification(notificationTypes.ERROR, 'Error uploading resume')
      }
    } else {
      openNotification(notificationTypes.ERROR, 'Please select a file')
    }
  }

  const handleResumeUpload = async () => {
    fileInputRef.current.click()
  }

  return (
    <div>
      <DocHeader
        DocTitle='Student Profile'
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 xl:gap-6 2xl:gap-12 content-center'>
        <div className='mt-4 py-4 md:py-12 pl-2 md:pl-6 xl:pl-8 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12 2xl:mr-16'>
          <h1 className='text-center md:text-left mb-5 ml-3 md:ml-6 mt-12 text-3xl md:text-4xl font-Heading font-medium text-black'>Complete your profile</h1>
          <p className='text-center md:text-left mb-10 ml-3 md:ml-6 mt-6 text-lg md:text-xl font-Heading font-medium text-black'>Final Step! Upload your resume.</p>
          <div class='flex items-center justify-center'>
            <label class='flex flex-col items-center px-8 py-4 bg-white rounded-lg shadow-lg cursor-pointer'>
              <svg xmlns='http://www.w3.org/2000/svg' class='w-10 h-10 mb-4 text-gray-500' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                <path d='M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M12 8v9M9 11h6M16 7H8' />
              </svg>
              <span class='text-gray-500 text-lg'>Upload Resume</span><input
                type='file'
                accept='.pdf'
                onChange={handleResumeChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
                                                                      />
              <button
                onClick={handleResumeUpload}
                className='flex h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold my-3 md:my-8 rounded-xl py-2 px-4'
              >
                Upload Resume
              </button>
            </label>
            <div className='mt-1 ml-4'>
              {
                                isLoading && <Spin size='large' />
                            }
            </div>
          </div>
        </div>
        <div className='hidden lg:block lg:min-h-screen '>
          <Image className='h-full w-full' src={student} alt='students' />
        </div>
      </div>
    </div>
  )
}

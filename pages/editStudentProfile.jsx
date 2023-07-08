import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import TextArea from '@/components/InputComponents/TextArea'
import Button from '@/components/Buttons'
import axios from 'axios'
import { Spin } from 'antd'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { routes } from '@/constants/routes'

import { getStudentProfile } from '@/redux/Slices/studentSlice'

import { uploadResume, getResume } from '@/redux/Sagas/requests/features'

import photo from '../public/photoupload.png'
import ChangePasswordModal from '@/components/Modal/changePassword'
import { notificationTypes, openNotification } from '@/utils/notifications'

export default function editStudentProfile () {
  const dispatch = useDispatch()
  const router = useRouter()

  const fileInputRef = useRef(null)

  const user = useSelector((state) => state.user)
  const profile = useSelector((state) => state.studentProfile)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '1') {
        router.push(routes.NOTFOUND)
      } else {
        dispatch(getStudentProfile())
      }
    }
  }, [user, dispatch])

  const handleResumeChange = (event) => {
    const file = event.target.files[0]

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
                openNotification('success', 'Resume uploaded successfully')
                setTimeout(() => {
                  window.location.reload()
                }
                , 2000)
              })
              .catch((err) => {
                console.log(err)
                openNotification('error', 'Error uploading resume')
              })
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (err) {
        console.log(err)
        openNotification('error', 'Error uploading resume')
      }
    } else {
      openNotification('error', 'Please select a file')
    }
  }

  const handleResumeUpload = async () => {
    fileInputRef.current.click()
  }

  const handleGetResume = () => {
    getResume()
      .then((res) => {
        if (res.status === 200) {
          const url = res.data.url
          axios
            .get(url, {
              responseType: 'blob'
            })
            .then((res) => {
              const downloadUrl = window.URL.createObjectURL(res.data)
              const link = document.createElement('a')
              link.href = downloadUrl
              link.setAttribute('download', 'resume.pdf')
              document.body.appendChild(link)
              link.click()
              link.remove()
              window.URL.revokeObjectURL(downloadUrl)
              openNotification(notificationTypes.SUCCESS, 'success', 'Resume downloaded successfully')
            })
            .catch((err) => {
              openNotification(notificationTypes.ERROR, 'error', 'Error downloading resume')
            })
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error getting resume',
            res.data.message || 'Unknown error occurred'
          )
        }
      })
      .catch((err) => {
        openNotification(notificationTypes.ERROR, 'Error getting resume')
      })
  }

  return (
    <div>
      <DocHeader
        DocTitle='Edit Profile'
      />
      <div className='mx-8 md:mx-20 mt-10'>
        <p
          className='ml-3 md:ml-6 mb-12 font-SubHeading text-base font-normal'
        >
          <span className='text-gray-500'>
            <a href='/jobs'>
              Dashboard
            </a>
          </span> {'>'} Edit profile
        </p>
        <div className='flex flex-col md:flex-row gap-4'>
          <h1 className='text-center md:text-left mb-4 md:mb-10 ml-2 md:ml-6 mt-6 text-3xl md:text-4xl font-Heading font-bold text-black'>Edit profile</h1>
          {
            profile === null
              ? <div>
                <Spin size='large' />
              </div>
              : Object.keys(profile).length === 0
                ? <div>
                  No data provided
                </div>
                : typeof profile.resumeFile === 'undefined' || profile.resumeFile === null || profile.resumeFile === ''
                  ? <>
                    <div className='ml-auto grid grid-cols-2 gap-2 mb-4 md:mb-0'>
                      <input
                        type='file'
                        accept='.pdf'
                        onChange={handleResumeChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />
                      <button
                        onClick={handleResumeUpload}
                        className='flex text-base md:text-lg h-16 md:h-10 ml-0 md:ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 md:mt-12 rounded-xl py-2 px-2 md:px-4'
                      >
                        Update Resume
                      </button>
                      <button
                        onClick={() => setShowModal(true)}
                        className='flex text-md md:text-lg h-16 md:h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 md:mt-12 rounded-xl py-2 px-2 md:px-4'
                      >
                        <span className='mx-auto'>
                          Change Password
                        </span>
                      </button>
                    </div>
                  </>
                  : <>
                    <div className='ml-auto grid grid-cols-3 gap-2 mb-4 md:mb-0'>
                      <button
                        onClick={handleGetResume}
                        className='flex text-base md:text-lg h-16 md:h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 md:mt-12 rounded-xl py-2 px-auto'
                      >
                        <span className='mx-auto'>
                          View Resume
                        </span>
                      </button>
                      <input
                        type='file'
                        accept='.pdf'
                        onChange={handleResumeChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />
                      <button
                        onClick={handleResumeUpload}
                        className='flex text-md md:text-lg h-16 md:h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 md:mt-12 rounded-xl py-2 px-auto'
                      >
                        <span className='mx-auto'>
                          Update Resume
                        </span>
                      </button>
                      <button
                        onClick={() => setShowModal(true)}
                        className='flex text-md md:text-lg h-16 md:h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 md:mt-12 rounded-xl py-2 px-2 md:px-4'
                      >
                        <span className='mx-auto'>
                          Change Password
                        </span>
                      </button>
                    </div>
                  </>
          }
        </div>
        {
          profile === null
            ? <div>
              loading...
            </div>
            : Object.keys(profile).length === 0
              ? <div>
                No data provided
              </div>
              : <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8'>
                <div>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 content-center'>
                    <div className='pb-4 pl-2 md:pl-5 m-auto'>
                      <Image src={photo} alt='students' />
                      <div className='mt-6'>
                        <Button
                          btnText='Upload'
                        />
                      </div>
                    </div>
                    <div className='col-span-1 md:col-span-2 ml-0 md:ml-6'>
                      <TextField
                        label='User Name'
                        placeholder='abc sharma'
                        type='text'
                        value={user !== null && Object.keys(user).length > 0 ? user.username : ''}
                        disabled
                      />
                      <TextField
                        label='Email ID'
                        placeholder='TPO name'
                        type='text'
                        value={user !== null && Object.keys(user).length > 0 ? user.email : ''}
                        disabled
                      />
                      <TextField
                        label='Department'
                        placeholder='CSE'
                        type='text'
                        value={profile.dept}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='mt-4 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-0 md:gap-4 2xl:gap-8'>
                    <div className='col-span-1'>
                      <TextField
                        label='10th Standard Marks (in %)'
                        placeholder='xyz.@gmail.com'
                        type='text'
                        value={profile.studentTenthMarks}
                        disabled
                      />
                    </div>
                    <div className='col-span-1'>
                      <TextField
                        label='12th Standard Marks (in %)'
                        placeholder='9090909090'
                        type='text'
                        value={profile.studentTwelthMarks}
                        disabled
                      />
                    </div>
                    <div className='col-span-1'>
                      <TextField
                        label='UG CGPA (on a scale of 10)'
                        placeholder='9090909090'
                        type='text'
                        value={profile.studentUGMarks}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className='mr-0 md:mr-4'>
                  <TextField
                    label='Gender'
                    placeholder='Unisex'
                    type='text'
                    value={profile.gender}
                    disabled
                  />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <TextField
                      label='student ID'
                      placeholder='ABCUG123'
                      type='text'
                      value={profile.studentId}
                      disabled
                    />
                    <TextField
                      label='Contact Number'
                      placeholder='pes.edu'
                      type='text'
                      value={profile.contactNo}
                      disabled
                    />
                  </div>
                  <TextArea
                    label='About the universities / colleges'
                    placeholder='studentdescription'
                    rows='6'
                    disabled
                    value={profile.studentDescription}
                  />
                  <div class='mb-6'>
                    <Button
                      btnText='Next'
                      disabled
                    />
                  </div>
                </div>
              </div>
        }
        <div className='mt-12'>
          <p className='shadow-2xl p-5 text-center font-bold text-gray-500 text-2xl'>
            Contact Placement Officer to change the details
          </p>
        </div>
      </div>
      <ChangePasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  )
}

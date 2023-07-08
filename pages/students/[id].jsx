import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import Button from '@/components/Buttons'
import TextField from '@/components/InputComponents/TextField'
import TextArea from '@/components/InputComponents/TextArea'

import { GetStudent, getCandidateResume } from '@/redux/Sagas/requests/features'
import { notificationTypes, openNotification } from '@/utils/notifications'

import photo from '@/public/photoupload.png'

export default function CandidatesPage () {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profile, setProfile] = useState({})

  const { id } = router.query

  useEffect(() => {
    if (typeof id !== 'undefined') {
      GetStudent(id)
        .then((res) => {
          if (res.data.status === 200) {
            setProfile(res.data.data)
          } else if (res.data.status === 401) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              res.data.message
            )
          } else if (res.data.status === 500) {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              res.data.message
            )
          } else {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Some error occured'
            )
          }
        })
        .catch((err) => {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Some error occured'
          )
        })
    }
  }, [id])

  const handleGetResume = () => {
    getCandidateResume(id)
      .then((res) => {
        if (res.data.status === 200) {
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
              openNotification(notificationTypes.ERROR, 'error', 'Candidate has not uploaded his resume')
            })
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error getting resume',
            'Candidate has not uploaded his resume'
          )
        }
      })
      .catch((err) => {
        console.log(err)
        openNotification(notificationTypes.ERROR, 'Error getting resume')
      })
  }

  return (
    <div className='bg-gray-200 min-h-screen'>
      <DocHeader
        DocTitle='Candidates'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <div className='pt-16 mx-auto md:mx-20'>
          <div className='flex gap-2'>
            <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-12 text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-Heading font-bold text-black'>Student Profile</h1>
            <button
              onClick={handleGetResume}
              className='h-12 ml-auto mt-6 md:mt-12 mr-2 md:mr-6 bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-2 px-4 rounded'
            >
              Resume
            </button>
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
                                      value={profile.username}
                                      disabled
                                    />
                                    <TextField
                                      label='Email ID'
                                      placeholder='TPO name'
                                      type='text'
                                      value={profile.email}
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
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8'>
                                  <div className='col-span-1'>
                                    <TextField
                                      label='10th Standard Marks'
                                      placeholder='xyz.@gmail.com'
                                      type='text'
                                      value={profile.studentTenthMarks}
                                      disabled
                                    />
                                  </div>
                                  <div className='col-span-1'>
                                    <TextField
                                      label='12th Standard Marks'
                                      placeholder='9090909090'
                                      type='text'
                                      value={profile.studentTwelthMarks}
                                      disabled
                                    />
                                  </div>
                                  <div className='col-span-1'>
                                    <TextField
                                      label='UG CGPA'
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
                                  label='student ID'
                                  placeholder='ABCUG123'
                                  type='text'
                                  value={profile.studentId}
                                  disabled
                                />
                                <TextArea
                                  label='About the universities / colleges'
                                  placeholder='PES University, located in Bangalore, India is one of the country’s leading teaching and research universities.
                            The University is committed to providing “navigation for the real world” that inspires students to find their
                            true north.
                            Our students graduate with the ability to adapt to an intellectually and technologically changing
                            environment. Over the years, we have accomplished this with the participative efforts of the management,
                            staff, students and parents.'
                                  rows='8'
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
        </div>
      </main>
    </div>
  )
}

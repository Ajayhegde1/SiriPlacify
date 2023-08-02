import DocHeader from '@/components/DocHeader'
import Sidebar from '@/components/SideBar'

import axios from 'axios'
import { Spin } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { routes } from '@/constants/routes'
import { getStudentProfile } from '@/redux/Slices/studentSlice'

import { uploadResume, getResume } from '@/redux/Sagas/requests/features'

import ChangePasswordModal from '@/components/Modal/changePassword'
import { notificationTypes, openNotification } from '@/utils/notifications'
import StudentInfo from '@/components/StudentInfo'

export default function editStudentProfile() {
  const dispatch = useDispatch()
  const router = useRouter()

  const fileInputRef = useRef(null)

  const user = useSelector((state) => state.user)
  const profile = useSelector((state) => state.studentProfile)

  const [showModal, setShowModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        if (res.data.status === 200) {
          const url = res.data.url;
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          openNotification(notificationTypes.SUCCESS, 'success', 'Resume displayed successfully');
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error getting resume',
            res.data.message || 'Unknown error occurred'
          );
        }
      })
      .catch((err) => {
        openNotification(notificationTypes.ERROR, 'Error getting resume');
      });
  };

  return (
    <div className='min-h-screen bg-gray-200'>
      <DocHeader
        DocTitle='Edit Profile'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={7}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <div className='ml-10 mr-8 md:mr-20 pt-10'>
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
                :
                <StudentInfo
                  username={profile.username}
                  email={profile.email}
                  department={profile.dept}
                  contactNo={profile.contactNo}
                  studentTenthMarks={profile.studentTenthMarks}
                  studentTwelthMarks={profile.studentTwelthMarks}
                  studentDegreeMarks={profile.studentUGMarks}
                  gender={profile.gender}
                  studentID={profile.studentId}
                  studentDescription={profile.studentDescription}
                />
          }
          <div className='mt-12'>
            <p className='shadow-2xl p-5 text-center font-bold text-gray-500 text-2xl'>
              Contact Placement Officer to change the details
            </p>
          </div>
        </div>
      </main>
      <ChangePasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  )
}

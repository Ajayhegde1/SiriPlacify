import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { Spin } from 'antd'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { GetStudent, getCandidateResume } from '@/redux/Sagas/requests/features'
import { notificationTypes, openNotification } from '@/utils/notifications'

import arrow from '@/public/arrow.png'
import StudentInfo from '@/components/StudentInfo'

export default function CandidatesPage() {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profile, setProfile] = useState({})

  const { id, collegeID, jobID } = router.query

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
        activePage={2}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <div className='mx-10 pt-10 flex flex-row'>
          <Link href={`/jobs/companyJobs/${jobID}/${collegeID}`}>
            <Image
              src={arrow}
              alt='arrow-left'
              className='my-auto h-12 w-12'
            />
          </Link>
          <h1 className='ml-2 mt-2 text-lg md:text-2xl font-Heading font-semibold text-black'>
            Back
          </h1>
        </div>
        <div className='mx-auto md:mx-20'>
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
                <Spin size='large' />
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
        </div>
      </main>
    </div>
  )
}

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import arrow from '@/public/arrow.png'
import applied from '@/public/applied.png'
import app from '@/public/app.png'
import short from '@/public/shortlist.png'
import tester from '@/public/tester.png'
import inter from '@/public/inter.png'
import interview from '@/public/interview.png'
import shortlisted from '@/public/shortlisted.png'
import test from '@/public/test.png'

import { getJobApplication } from '@/redux/Slices/jobApplicationSlice'

export default function JobStatus () {
  const router = useRouter()
  const dispatch = useDispatch()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [jobApp, setJobApp] = useState(null)
  const { id } = router.query

  const jobApplication = useSelector(state => state.jobApplication)

  useEffect(() => {
    dispatch(getJobApplication())
    if (typeof id === 'undefined' || id === null || id === '') {
      router.push('/myApplications')
    } else {
      if (jobApplication !== null && (typeof id !== undefined || id !== null || id !== '')) {
        const jobAppl = jobApplication.filter(job => job.id === parseInt(id))
        setJobApp(jobAppl[0])
      }
    }
  }, [id])

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
        <div className='pt-14 ml-0 md:ml-6 flex flex-row'>
          <Link href='/myApplications'>
            <Image
              src={arrow}
              alt='arrow-left'
              className='my-auto h-12 w-12'
            />
          </Link>
          {
                        jobApp === null
                          ? <div />
                          : Object.keys(jobApp).length === 0
                            ? <div>
                              No Data Found
                            </div>
                            : <div className='ml-2 md:ml-6'>
                              <p
                                className='font-SubHeading text-base text-gray-400 font-bold'
                              >
                                {jobApp.jobSector}
                              </p>
                              <h1 className='mt-1 text-lg md:text-xl font-Heading font-bold text-black'>
                                {jobApp.jobTitle}
                              </h1>
                              <p
                                className='pt-1 font-SubHeading text-base text-gray-400 font-bold'
                              >
                                {jobApp.companyName} • {jobApp.jobPositionType}
                              </p>
                              </div>
                    }
        </div>
        {
                    jobApp === null
                      ? <>
                      </>
                      : Object.keys(jobApp).length === 0
                        ? <>
                        </>
                        : <div className='w-9/10 lg:w-4/5 2xl:w-2/3 mt-10 ml-2 md:ml-8 lg:ml-10 mr-2 md:mr-8 lg:mr-12 xl:mr-16 2xl:mr-24'>
                          {
                                    jobApp.jobStatus === '0'
                                      ? <Image
                                          src={applied}
                                          alt='applied'
                                          className='h-full w-full'
                                        />
                                      : jobApp.jobStatus === '1'
                                        ? <Image
                                            src={shortlisted}
                                            alt='shortlisted'
                                            className='h-full w-full'
                                          />
                                        : jobApp.jobStatus === '2'
                                          ? <Image
                                              src={test}
                                              alt='test'
                                              className='h-full w-full'
                                            />
                                          : jobApp.jobStatus === '3'
                                            ? <Image
                                                src={interview}
                                                alt='interview'
                                                className='h-full w-full'
                                              />
                                            : <Image
                                                src={interview}
                                                alt='interview'
                                                className='h-full w-full'
                                              />
                                }
                        </div>
                }
        {
                    jobApp === null
                      ? <>
                      </>
                      : Object.keys(jobApp).length === 0
                        ? <>
                        </>
                        : <div className='mt-12'>
                          {
                                    jobApp.jobStatus === '0'
                                      ? <div className='w-9/10 lg:w-4/5 2xl:w-2/3 mt-10 ml-2 md:ml-8 lg:ml-10 mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div>
                                          <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>Successfully Applied</h1>
                                        </div>
                                        <div>
                                          <Image
                                            src={app}
                                            alt='applied'
                                            className='h-full w-full'
                                          />
                                        </div>
                                      </div>
                                      : jobApp.jobStatus === '1'
                                        ? <div className='w-9/10 lg:w-4/5 mt-10 ml-2 md:ml-8 lg:ml-10 mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                          <div>
                                            <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>You have been shortlisted</h1>
                                          </div>
                                          <div>
                                            <Image
                                              src={short}
                                              alt='applied'
                                              className='h-full w-full'
                                            />
                                          </div>
                                        </div>
                                        : jobApp.jobStatus === '2'
                                          ? <div className='w-9/10 lg:w-4/5 2xl:w-2/3 mt-10 ml-2 md:ml-8 lg:ml-10 mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <div>
                                              <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>Test Link has been sent through your registered emails.</h1>
                                            </div>
                                            <div>
                                              <Image
                                                src={tester}
                                                alt='applied'
                                                className='h-full w-full'
                                              />
                                            </div>
                                          </div>
                                          : jobApp.jobStatus === '3'
                                            ? <div className='w-9/10 lg:w-4/5 2xl:w-2/3 mt-10 ml-2 md:ml-8 lg:ml-10 mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                              <div>
                                                <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>You have been shortlisted for interview round!</h1>
                                              </div>
                                              <div>
                                                <Image
                                                  src={inter}
                                                  alt='applied'
                                                  className='h-full w-full'
                                                />
                                              </div>
                                            </div>
                                            : <div className='w-9/10 lg:w-4/5 2xl:w-2/3 mt-10 ml-2 md:ml-8 lg:ml-10 mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                              <div>
                                                <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>You have been hired!</h1>
                                              </div>
                                              <div>
                                                <Image
                                                  src={inter}
                                                  alt='applied'
                                                  className='h-full w-full'
                                                />
                                              </div>
                                            </div>
                                }
                        </div>
                }
      </main>
    </div>
  )
}

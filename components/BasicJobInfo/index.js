import Image from 'next/image'
import { useRouter } from 'next/router'

import moment from 'moment'

import JobApplicationModal from '@/components/Modal/jobApplicationModal'

import { useState, useEffect } from 'react'
import { GET, POST } from '@/config/api'

import { useSelector } from 'react-redux'
import { notificationTypes, openNotification } from '@/utils/notifications'

export default function BasicJobInfo ({
  uid,
  logo,
  jobTitle,
  jobLocation,
  jobCategory,
  dueDate,
  jobID
}) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user !== null) {
      if (parseInt(user.accType) === 1) {
        GET(`/checkJobApplication?jobID=${jobID}`, { sessionID: user.sessionId })
          .then((res) => {
            if (res.data.status === 200) {
              setIsApplied(res.data.jobStatus)
            } else if (res.data.status === 423) {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Unable to get Job'
              )
            } else if (res.data.status === 424) {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Unable to retrieve Job'
              )
            } else if (res.data.status === 425) {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Unable to get college'
              )
            } else if (res.data.status === 426) {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Unable to get college or Job'
              )
            } else if (res.data.status === 500) {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Error in retrieving Data'
              )
            } else {
              openNotification(
                notificationTypes.ERROR,
                'Error',
                'Something went wrong, please try again later'
              )
            }
          })
      }
    }
  }, [jobID])

  const handleAcceptOffer = () => {
    const data = {
      jobID: uid
    }
    POST('/acceptJob?status=accept', data, { sessionID: user.sessionId })
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(
            notificationTypes.SUCCESS,
            'Success',
            'Job offer accepted successfully'
          )
          router.push('/jobs')
        } else if (res.data.status === 401) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Session ID is invalid or not present'
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
            'Status is null'
          )
        } else if (res.data.status === 425) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Job is undefined'
          )
        } else if (res.data.status === 426) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'invalid option'
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'unable to approve job'
          )
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

  const handleDeclineOffer = () => {
    const data = {
      jobID: uid
    }
    POST('/acceptJob?status=decline', data, { sessionID: user.sessionId })
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(
            notificationTypes.SUCCESS,
            'Success',
            'Job offer accepted successfully'
          )
          router.push('/jobs')
        } else if (res.data.status === 401) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Session ID is invalid or not present'
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
            'Status is null'
          )
        } else if (res.data.status === 425) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Job is undefined'
          )
        } else if (res.data.status === 426) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'invalid option'
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'unable to approve job'
          )
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
    <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-5 rounded-lg'>
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-8'>
        <div className='col-span-1 2xl:col-span-2'>
          <div className='flex flex-col md:flex-row gap-2 md:gap-8'>
            <Image
              src={logo}
              alt='apple logo'
            />
            <div className='mt-3'>
              <p className='mt-5'>
                <span className='bg-black py-1 px-4 text-white rounded-2xl font-bold'>
                  {jobCategory}
                </span>
              </p>
              <h1 className='mt-3 text-2xl xl:text-3xl 2xl:text-4xl font-bold font-Heading font-bold text-black'>
                {jobTitle}
              </h1>
              <h1 className='my-2 text-sm text-medium font-Heading'>
                {jobLocation}
              </h1>
            </div>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='ml-auto w-40 p-3 bg-rose-100 rounded-2xl text-sm'>
            <p className='text-gray-700 text-center'>DUE DATE - {moment(dueDate).format('DD MMM')}</p>
          </div>
          {
              user === null
                ? <></>
                : user.accType === '1'
                  ? isApplied
                    ? <div className='mt-6 lg:mt-20 grid grid-cols-2 gap-8'>
                      <div />
                      <div
                        className='rounded-lg text-base md:text-lg 2xl:text-xl bg-green-600 text-white font-bold text-center p-2'
                      >
                        Applied
                      </div>
                    </div>
                    : <div className='mt-6 lg:mt-20 grid grid-cols-2 gap-8'>
                      <div />
                      <div
                        onClick={() => setShowModal(!showModal)}
                        className='rounded-lg text-base md:text-lg 2xl:text-xl bg-blue-600 text-white font-bold text-center p-2'
                      >
                        Apply Now
                      </div>
                    </div>
                  : user.accType === '0'
                    ? <div className='mt-6 lg:mt-20 grid grid-cols-2 gap-8'>
                      <button
                        onClick={handleDeclineOffer}
                        className='rounded-lg text-base md:text-lg 2xl:text-xl bg-red-500 text-white font-bold text-center p-2'
                      >
                        X    Decline For Now
                      </button>
                      <button
                        onClick={handleAcceptOffer}
                        className='rounded-lg text-base md:text-lg 2xl:text-xl bg-blue-600 text-white font-bold text-center p-2'
                      >
                        + Accept Offer
                      </button>
                    </div>
                    : <></>
            }
        </div>
      </div>
      <JobApplicationModal
        showModal={showModal}
        setShowModal={setShowModal}
        jobID={jobID}
      />
    </div>
  )
}

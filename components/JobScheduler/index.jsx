import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import SetPPTModal from '@/components/Modal/SetPPTModal'
import SetTestLinkModal from '@/components/Modal/SetTestLinkModal'
import SetInterviewModal from '@/components/Modal/SetInterviewModal'
import UpdatePPTModal from '@/components/Modal/UpdatePPTModal'
import UpdateTestLinkModal from '@/components/Modal/UpdateTestLinkModal'
import UpdateInterviewModal from '../Modal/UpdateInterviewModal'

import ppt from '@/public/pptIcon.png'
import test from '@/public/testIcon.png'
import interview from '@/public/interviewIcon.png'

import { getProfile } from '@/redux/Slices/profile'
import { getJobData } from '@/redux/Sagas/requests/features'

export default function JobScheduler({
  jobID
}) {
  const dispatch = useDispatch()

  const college = useSelector((state) => state.profile)

  const [showPPTModal, setShowPPTModal] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [showIntModal, setShowIntModal] = useState(false)
  const [showUpdatePPTModal, setShowUpdatePPTModal] = useState(false)
  const [showUpdateTestModal, setShowUpdateTestModal] = useState(false)
  const [showUpdateIntModal, setShowUpdateIntModal] = useState(false)
  const [pptData, setPptData] = useState(null)
  const [testData, setTestData] = useState(null)
  const [intData, setIntData] = useState(null)

  useEffect(() => {
    dispatch(getProfile())
    if (typeof jobID !== 'undefined' && college !== null) {
      getJobData(jobID, college.uid)
        .then((res) => {
          if (res.data.status === 200) {
            setPptData(res.data.data.pptData)
            setTestData(res.data.data.testData)
            setIntData(res.data.data.interviewData)
          } else {
            openNotification(
              notificationTypes.ERROR,
              'Error',
              'Unable to retrieve job data'
            )
          }
        })
        .catch((err) => {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to retrieve job data'
          )
        })
    }
  }, [jobID, dispatch])

  return (
    <div className='ml-3 md:ml-6 mt-10 flex flex-col xl:flex-row gap-4 justify-start mr-3 md:mr-12'>
      <div>
        {
          pptData === null
            ? <button
              onClick={() => setShowPPTModal(true)}
              className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
            >
              <Image
                src={ppt}
                alt='ppt'
                className='h-6 w-6 mr-2'
                width={20}
                height={20}
              />
              <span>
                Schedule PPT
              </span>
            </button>
            : Object.keys(pptData).length === 0
              ? <button
                onClick={() => setShowPPTModal(true)}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={ppt}
                  alt='ppt'
                  className='h-6 w-6 mr-2'
                  width={20}
                  height={20}
                />
                <span>
                  Schedule PPT
                </span>
              </button>
              : <button
                onClick={() => setShowUpdatePPTModal(true)}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={ppt}
                  alt='ppt'
                  className='h-6 w-6 mr-2'
                  width={20}
                  height={20}
                />
                <span>
                  View PPT
                </span>
              </button>
        }
      </div>
      <div>
        {
          testData === null
            ? <button
              onClick={() => setShowTestModal(true)}
              className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
            >
              <Image
                src={test}
                alt='Test'
                className='h-6 w-6 mr-2'
                width={20}
                height={20}
              />
              <span>
                Schedule Test
              </span>
            </button>
            : Object.keys(testData).length === 0
              ? <button
                onClick={() => setShowTestModal(true)}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={test}
                  alt='Test'
                  className='h-6 w-6 mr-2'
                  width={20}
                  height={20}
                />
                <span>
                  Schedule Test
                </span>
              </button>
              : <button
                onClick={() => setShowUpdateTestModal(true)}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={test}
                  alt='Test'
                  className='h-6 w-6 mr-2'
                  width={20}
                  height={20}
                />
                <span>
                  View Test
                </span>
              </button>
        }
      </div>
      <div>
        {
          intData === null
            ? <button
              onClick={() => setShowIntModal(true)}
              className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
            >
              <Image
                src={test}
                alt='Test'
                className='h-6 w-6 mr-2'
                width={20}
                height={20}
              />
              <span>
                Schedule Interview
              </span>
            </button>
            : Object.keys(intData).length === 0
              ? <button
                onClick={() => setShowIntModal(true)}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={interview}
                  alt='Interview'
                  className='h-6 w-6 mr-2'
                  width={20}
                  height={20}
                />
                <span>
                  Schedule Interview
                </span>
              </button>
              : <button
                onClick={() => setShowUpdateIntModal(true)}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-4 py-3'
              >
                <Image
                  src={interview}
                  alt='Interview'
                  className='h-6 w-6 mr-2'
                  width={20}
                  height={20}
                />
                <span>
                  View Interview
                </span>
              </button>
        }
      </div>
      <SetPPTModal
        showModal={showPPTModal}
        setShowModal={setShowPPTModal}
        jobID={jobID}
        collegeID={college === null ? '' : college.uid}
        data={pptData}
        setData={setPptData}
      />
      <UpdatePPTModal
        showModal={showUpdatePPTModal}
        setShowModal={setShowUpdatePPTModal}
        jobID={jobID}
        collegeID={college === null ? '' : college.uid}
        data={pptData}
        setData={setPptData}
      />
      <SetTestLinkModal
        showModal={showTestModal}
        setShowModal={setShowTestModal}
        jobID={jobID}
        collegeID={college === null ? '' : college.uid}
        data={testData}
        setData={setTestData}
      />
      <UpdateTestLinkModal
        showModal={showUpdateTestModal}
        setShowModal={setShowUpdateTestModal}
        jobID={jobID}
        collegeID={college === null ? '' : college.uid}
        data={testData}
        setData={setTestData}
      />
      <SetInterviewModal
        showModal={showIntModal}
        setShowModal={setShowIntModal}
        jobID={jobID}
        collegeID={college === null ? '' : college.uid}
        data={intData}
        setData={setIntData}
      />
      <UpdateInterviewModal
        showModal={showUpdateIntModal}
        setShowModal={setShowUpdateIntModal}
        jobID={jobID}
        collegeID={college === null ? '' : college.uid}
        data={intData}
        setData={setIntData}
      />
    </div>
  )
}

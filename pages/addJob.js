import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import TextField from '@/components/InputComponents/TextField'
import TextArea from '@/components/InputComponents/TextArea'
import Button from '@/components/Buttons'
import SingleSelectComponent from '@/components/InputComponents/SingleSelectComponent'
import DocHeader from '@/components/DocHeader'

import { addJob, addJobByCompany } from '@/redux/Slices/jobSlice'

import { notificationTypes, openNotification } from '@/utils/notifications'
import { jobStatusList, modeOfSelectionList } from '@/constants/addJobDropDowns'
import { routes } from '@/constants/routes'

export default function AddJob () {
  const dispatch = useDispatch()
  const router = useRouter()

  const user = useSelector((state) => state.user)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [btnText, setBtnText] = useState('Save')
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [designation, setDesignation] = useState('')
  const [jobStatus, setJobStatus] = useState(jobStatusList[0].value)
  const [locationOfWork, setLocationOfWork] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [ctc, setCtc] = useState('')
  const [basePay, setBasePay] = useState(0.0)
  const [variablePay, setVariablePay] = useState(0.0)
  const [RSU, setRSU] = useState(0.0)
  const [sector, setSector] = useState('')
  const [applicableCourses, setApplicableCourses] = useState('')
  const [modeOfSelection, setModeOfSelection] = useState(modeOfSelectionList[0].value)
  const [briefJobDescription, setBriefJobDescription] = useState('')
  const [bondDetails, setBondDetails] = useState('')
  const [contactPersonName, setContactPersonName] = useState('')
  const [contactPersonPhoneNumber, setContactPersonPhoneNumber] = useState('')
  const [contactPersonEmail, setContactPersonEmail] = useState('')
  const [finalMode, setFinalMode] = useState(modeOfSelectionList[0].value)
  const [companyName, setCompanyName] = useState('')

  useEffect(() => {
    if (finalMode && designation && jobStatus && locationOfWork && ctc &&
            sector && applicableCourses && modeOfSelection && bondDetails &&
            contactPersonName && contactPersonPhoneNumber && contactPersonEmail
    ) {
      setIsBtnDisabled(false)
    } else {
      setIsBtnDisabled(true)
    }
  }, [finalMode, designation, jobStatus, locationOfWork, ctc, sector, applicableCourses, modeOfSelection, bondDetails, contactPersonName, contactPersonPhoneNumber, contactPersonEmail])

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType === '1') {
        router.push(routes.NOTFOUND)
      }
    }
  }, [user])

  const addJobHandler = () => {
    if (user.accType === '0') {
      const jobData = {
        jobTitle: designation,
        jobLocation: locationOfWork,
        jobCTC: ctc,
        jobDescription: briefJobDescription,
        jobBond: bondDetails,
        jobSector: sector,
        jobPositionType: jobStatus,
        jobCriteria: applicableCourses,
        jobTestMode: modeOfSelection,
        jobFinalSelection: finalMode,
        jobContactName: contactPersonName,
        jobContactNumber: contactPersonPhoneNumber,
        jobEmailId: contactPersonEmail,
        dueDate: selectedDate,
        companyName,
        basePay: basePay,
        variablePay: variablePay,
        RSU: RSU
      }
      setBtnText('Saving...')
      dispatch(addJob(jobData))
    } else if (user.accType === '2') {
      const jobData = {
        jobTitle: designation,
        jobLocation: locationOfWork,
        jobCTC: ctc,
        jobDescription: briefJobDescription,
        jobBond: bondDetails,
        jobSector: sector,
        jobPositionType: jobStatus,
        jobCriteria: applicableCourses,
        jobTestMode: modeOfSelection,
        jobFinalSelection: finalMode,
        jobContactName: contactPersonName,
        jobContactNumber: contactPersonPhoneNumber,
        jobEmailId: contactPersonEmail,
        dueDate: selectedDate,
        basePay: basePay,
        variablePay: variablePay,
        RSU: RSU
      }
      setBtnText('Saving...')
      dispatch(addJobByCompany(jobData))
    } else {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'You are not authorized to add jobs'
      )
    }
  }

  return (
    <div className='bg-gray-100'>
      <DocHeader
        DocTitle='Add Jobs'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={6}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <p
          className='pt-16 ml-3 md:ml-6 pb-12 font-SubHeading text-base font-normal'
        >
          <span className='text-gray-500'>
            <a href='/jobs'>
              Dashboard
            </a>
          </span> {'>'} Create Job
        </p>

        <h1 className='text-center md:text-left pb-10 ml-2 md:ml-6 mt-2 md:mt-4 text-3xl md:text-4xl font-Heading font-bold text-black'>Create Job</h1>
        <div className='ml-3 md:ml-6 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 mr-12'>
          <div>
            {
              user.accType === '0'
                ? <TextField
                    label='Company Name'
                    placeholder='PESU Venture Labs'
                    type='text'
                    value={companyName}
                    onChangeHandler={(e) => setCompanyName(e.target.value)}
                  />
                : <></>
            }
            <TextField
              label='Designation'
              placeholder='UI, UX Designer'
              type='text'
              value={designation}
              onChangeHandler={(e) => setDesignation(e.target.value)}
            />
            <SingleSelectComponent
              value={jobStatus}
              onChangeHandler={(e) => setJobStatus(e.target.value)}
              options={jobStatusList}
              label='Job Status'
            />
            <TextField
              label='Location of work'
              placeholder='Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016'
              type='text'
              value={locationOfWork}
              onChangeHandler={(e) => setLocationOfWork(e.target.value)}
            />
            <div className='mt-4 mb-6'>
              <label className='block font-Heading font-medium text-black mb-2'>
                Last date to apply
              </label>
              <input
                type='date'
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className='border-2 border-gray-400 rounded w-full p-4 text-black leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
          </div>
          <div>
            <TextField
              label='Sector'
              placeholder='IT'
              type='text'
              value={sector}
              onChangeHandler={(e) => setSector(e.target.value)}
            />
            <TextField
              label='Applicable courses'
              placeholder='Btech'
              type='text'
              value={applicableCourses}
              onChangeHandler={(e) => setApplicableCourses(e.target.value)}
            />
            <SingleSelectComponent
              value={modeOfSelection}
              onChangeHandler={(e) => setModeOfSelection(e.target.value)}
              options={modeOfSelectionList}
              label='Mode of Selection'
            />
            <SingleSelectComponent
              value={finalMode}
              onChangeHandler={(e) => setFinalMode(e.target.value)}
              options={modeOfSelectionList}
              label='Final Mode of Selection'
            />
            <TextArea
              rows='4'
              label='Brief Job Description'
              placeholder='Write a detailed description of the job'
              value={briefJobDescription}
              onChangeHandler={(e) => setBriefJobDescription(e.target.value)}
            />
          </div>
        </div>
        <div className='ml-3 md:ml-6 mr-12'>
          <div className='w-1/3'>
            <TextField
              label='CTC'
              placeholder='75,0000.00'
              type='text'
              value={ctc}
              onChangeHandler={(e) => setCtc(e.target.value)}
            />
          </div>
          <h1 className='text-center md:text-left pb-4 mt-3 md:mt-6 text-xl md:text-2xl font-Heading font-bold text-gray-800'>CTC Breakdown</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <TextField
              label='Base Pay'
              placeholder='75,0000.00'
              type='text'
              value={basePay}
              onChangeHandler={(e) => setBasePay(e.target.value)}
            />
            <TextField
              label='Variable Pay'
              placeholder='75,0000.00'
              type='text'
              value={variablePay}
              onChangeHandler={(e) => setVariablePay(e.target.value)}
            />
            <TextField
              label='RSU'
              placeholder='75,0000.00'
              type='text'
              value={RSU}
              onChangeHandler={(e) => setRSU(e.target.value)}
            />
          </div>
        </div>
        <div className='ml-3 md:ml-6 mr-12'>
          <TextArea
            rows='4'
            label='Bond / Service agreement details if any'
            placeholder='Joining bonus: you shall be eligible for a one time joining bounus of INR 2,00,000, recoverable in prorated manner if you wish to leave the services within 3 years of joining.'
            value={bondDetails}
            onChangeHandler={(e) => setBondDetails(e.target.value)}
          />
        </div>
        <div className='mb-10 ml-3 md:ml-6 mr-12 mt-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <TextField
              label='Name of the contact person'
              placeholder='ABC sharma'
              type='text'
              value={contactPersonName}
              onChangeHandler={(e) => setContactPersonName(e.target.value)}
            />

            <TextField
              label='Phone Number of the contact person'
              placeholder='9123123123'
              type='text'
              value={contactPersonPhoneNumber}
              onChangeHandler={(e) => setContactPersonPhoneNumber(e.target.value)}
            />

            <TextField
              label='Email ID of the contact person'
              placeholder='Btech@gmail.com'
              type='text'
              value={contactPersonEmail}
              onChangeHandler={(e) => setContactPersonEmail(e.target.value)}
            />
          </div>
          <Button
            btnText={btnText}
            disabled={isBtnDisabled}
            onClickHandler={addJobHandler}
          />
        </div>
      </main>
    </div>
  )
}

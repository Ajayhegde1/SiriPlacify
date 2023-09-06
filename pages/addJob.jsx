import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import TextField from '@/components/InputComponents/TextField'
import TextArea from '@/components/InputComponents/TextArea'
import Button from '@/components/Buttons'
import SingleSelectComponent from '@/components/InputComponents/SingleSelectComponent'
import DocHeader from '@/components/DocHeader'
import ContactPersonInfo from '@/components/ContactPersonInfo'
import MarksRequirement from '@/components/MarksRequirement'
import CTCBreakdown from '@/components/CTCBreakdown'
import JobSectorSelect from '@/components/SectorList'
import DepartmentList from '@/components/DepartmentList'

import { addJob, addJobByCompany } from '@/redux/Slices/jobSlice'

import { notificationTypes, openNotification } from '@/utils/notifications'
import { validatePhoneNumber, validateEmail } from '@/utils/validators'

import { jobStatusList, modeOfSelectionList, finalSelection, genderList } from '@/constants/addJobDropDowns'
import { routes } from '@/constants/routes'

export default function AddJob() {
  const dispatch = useDispatch()
  const router = useRouter()

  const fileInputRef = useRef(null)

  const user = useSelector((state) => state.user)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [btnText, setBtnText] = useState('Save')
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [designation, setDesignation] = useState('')
  const [locationOfWork, setLocationOfWork] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [ctc, setCtc] = useState()
  const [basePay, setBasePay] = useState()
  const [variablePay, setVariablePay] = useState()
  const [RSU, setRSU] = useState()
  const [tenthMarks, setTenthMarks] = useState()
  const [twelfthMarks, setTwelfthMarks] = useState()
  const [UGCgpa, setUGCgpa] = useState()
  const [applicableCourses, setApplicableCourses] = useState('')
  const [briefJobDescription, setBriefJobDescription] = useState('')
  const [bondDetails, setBondDetails] = useState('')
  const [contactPersonName, setContactPersonName] = useState('')
  const [contactPersonPhoneNumber, setContactPersonPhoneNumber] = useState('')
  const [contactPersonEmail, setContactPersonEmail] = useState('')
  const [jobStatus, setJobStatus] = useState(jobStatusList[0].value)
  const [sector, setSector] = useState([])
  const [modeOfSelection, setModeOfSelection] = useState(modeOfSelectionList[0].value)
  const [gender, setGender] = useState(genderList[0].value)
  const [finalMode, setFinalMode] = useState(finalSelection[0].value)
  const [companyName, setCompanyName] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    if (finalMode !== 'Final Mode of Selection' && designation && jobStatus !== 'Job Type' && locationOfWork && ctc &&
      sector && applicableCourses && modeOfSelection !== 'Mode of Selection' && bondDetails &&
      contactPersonName && contactPersonPhoneNumber && contactPersonEmail && selectedDate &&
      gender !== 'Gender'
    ) {
      setIsBtnDisabled(false)
    } else {
      setIsBtnDisabled(true)
    }
  }, [finalMode, designation, jobStatus, selectedOptions, locationOfWork, applicableCourses, ctc, sector, selectedDate, modeOfSelection, bondDetails, contactPersonName, contactPersonPhoneNumber, contactPersonEmail])

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType === '1') {
        router.push(routes.NOTFOUND)
      }
    }
  }, [user])

  function handleSelect(data) {
    setSelectedOptions(data)
  }

  function handleSector(data) {
    setSector(data)
  }

  const addJobHandler = () => {
    if (!validatePhoneNumber(contactPersonPhoneNumber) && !validateEmail(contactPersonEmail)) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Please enter a valid phone number and email id'
      )
    }
    else if (!(0 < tenthMarks < 100) || !(0 < twelfthMarks < 100) || !(0 < UGCgpa < 10)) {
      openNotification(
        notificationTypes.ERROR,
        'Error',
        'Please enter a valid percentage'
      )
    }
    else {
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
          gender,
          jobContactNumber: contactPersonPhoneNumber,
          jobEmailId: contactPersonEmail,
          dueDate: selectedDate,
          companyName,
          basePay,
          variablePay,
          RSU,
          tenthMarks,
          twelfthMarks,
          UGCgpa,
          degree: selectedOptions
        }
        const Data = {
          data: jobData,
          file: selectedFile
        }
        setBtnText('Saving...')
        dispatch(addJob(Data))
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
          gender,
          jobTestMode: modeOfSelection,
          jobFinalSelection: finalMode,
          jobContactName: contactPersonName,
          jobContactNumber: contactPersonPhoneNumber,
          jobEmailId: contactPersonEmail,
          dueDate: selectedDate,
          basePay,
          variablePay,
          RSU,
          tenthMarks,
          twelfthMarks,
          UGCgpa,
          degree: selectedOptions
        }
        const Data = {
          data: jobData,
          file: selectedFile
        }
        setBtnText('Saving...')
        dispatch(addJobByCompany(Data))
      } else {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'You are not authorized to add jobs'
        )
      }
    }
  }

  const handleJDUpload = async () => {
    fileInputRef.current.click()
  }

  const handleJDChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
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
            <a href={user !== null ? user.accType === '2' ? routes.COMPANYDASHBOARD : routes.TPODASHBOARD : routes.NOTFOUND}>
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
            <div className='my-4'>
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
            <MarksRequirement
              tenthMarks={tenthMarks}
              twelfthMarks={twelfthMarks}
              UGCgpa={UGCgpa}
              setTenthMarks={setTenthMarks}
              setTwelfthMarks={setTwelfthMarks}
              setUGCgpa={setUGCgpa}
            />
            <CTCBreakdown
              ctc={ctc}
              basePay={basePay}
              variablePay={variablePay}
              RSU={RSU}
              setCtc={setCtc}
              setRSU={setRSU}
              setBasePay={setBasePay}
              setVariablePay={setVariablePay}
            />
          </div>
          <div>
            <JobSectorSelect
              sector={sector}
              handleSector={handleSector}
            />
            <TextField
              label='Applicable courses'
              placeholder='Btech'
              type='text'
              value={applicableCourses}
              onChangeHandler={(e) => setApplicableCourses(e.target.value)}
            />
            <DepartmentList
              selectedOptions={selectedOptions}
              handleSelect={handleSelect}
            />
            <div className='mb-8'>
              <SingleSelectComponent
                value={modeOfSelection}
                onChangeHandler={(e) => setModeOfSelection(e.target.value)}
                options={modeOfSelectionList}
              />
            </div>
            <div className='mb-8'>
              <SingleSelectComponent
                value={finalMode}
                onChangeHandler={(e) => setFinalMode(e.target.value)}
                options={finalSelection}
              />
            </div>
            <div className='mb-8'>
              <SingleSelectComponent
                value={gender}
                onChangeHandler={(e) => setGender(e.target.value)}
                options={genderList}
              />
            </div>
            <TextArea
              label='Brief Job Description'
              placeholder='Write a detailed description of the job or upload a pdf file with the job description'
              value={briefJobDescription}
              onChangeHandler={(e) => setBriefJobDescription(e.target.value)}
            />
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='file'
                accept='.pdf'
                onChange={handleJDChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              <button
                onClick={handleJDUpload}
                className='flex text-md h-16 md:h-10 bg-green-500 hover:bg-green-700 text-white font-semibold rounded shadow py-2 px-4'
              >
                <span className='mx-auto'>
                  Upload Job Description
                </span>
              </button>

              {
                selectedFile === null
                  ? <>
                  </>
                  : <div className='mt-1 font-heading text-lg font-medium'>
                    {selectedFile.name}
                  </div>
              }
            </div>
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
          <ContactPersonInfo
            contactPersonName={contactPersonName}
            contactPersonPhoneNumber={contactPersonPhoneNumber}
            contactPersonEmail={contactPersonEmail}
            setContactPersonName={setContactPersonName}
            setContactPersonPhoneNumber={setContactPersonPhoneNumber}
            setContactPersonEmail={setContactPersonEmail}
          />
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

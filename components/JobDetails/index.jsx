import JobDesc from '../JobDesc'
import ModeOfSelection from '../ModeOfSelection'
import CompanyContact from '../CompanyContact'
import ApplicableCourses from '../ApplicableCourses'

import { useState } from 'react'

import { updateJobTPO } from '@/redux/Sagas/requests/features'

export default function JobDetails ({
  jobID,
  companyName,
  setCompanyName,
  jobTitle,
  setJobTitle,
  jobLocation,
  setJobLocation,
  jobPositionType,
  setJobPosition,
  jobSector,
  setJobSector,
  jobCTC,
  setJobCTC,
  basePay,
  setBasePay,
  variablePay,
  jobDept,
  setJobDept,
  setVariablePay,
  RSU,
  setRSU,
  jobDesc,
  setJobDesc,
  jobBond,
  setJobBond,
  jobCriteria,
  setJobCriteria,
  tenthMarks,
  setTenthMarks,
  twelfthMarks,
  setTwelfthMarks,
  UGCgpa,
  setUGCgpa,
  jobSection,
  modeOfSelection,
  setModeOfSelection,
  finalDesc,
  setFinalDesc,
  contactName,
  setJobContactName,
  contactEmail,
  setContactEmail,
  contactPhone,
  setContactPhone
}) {
  const [isEdit, setIsEdit] = useState(false)

  const handleEdit = () => {
    const data = {
      companyName,
      jobTitle,
      jobBasePay,
      jobVariablePay,
      jobRSU,
      jobLocation,
      jobPositionType: jobPosition,
      jobSector,
      jobCTC,
      jobDescription: jobDesc,
      jobBond,
      jobCriteria,
      jobTestMode: jobModeOfSelection,
      jobContactName,
      jobContactPhoneNo,
      jobContactEmail,
      jobFinalSelection,
      tenthMarks,
      twelfthMarks,
      UGCgpa,
      dept: jobDept
    }
    updateJobTPO(id, data)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(
            notificationTypes.SUCCESS,
            'Job Updated'
          )
        } else if (res.data.status === 423) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            res.data.message
          )
        } else if (res.data.status === 424) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            res.data.message
          )
        } else if (res.data.status === 425) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            res.data.message
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to update job'
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Unable to update job'
        )
      })

    setTimeout(() => {
      window.location.reload()
    }, 4000)
  }

  return (
    <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
      <JobDesc
        jobID={jobID}
        companyName={companyName}
        setCompanyName={setCompanyName}
        companyDesc=''
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        jobLocation={jobLocation}
        setJobLocation={setJobLocation}
        jobPosition={jobPositionType}
        setJobPosition={setJobPosition}
        jobSector={jobSector}
        setJobSector={setJobSector}
        jobCTC={jobCTC}
        setJobCTC={setJobCTC}
        basePay={basePay}
        setBasePay={setBasePay}
        variablePay={variablePay}
        jobDept={jobDept}
        setJobDept={setJobDept}
        setVariablePay={setVariablePay}
        RSU={RSU}
        setRSU={setRSU}
        jobDesc={jobDesc}
        setJobDesc={setJobDesc}
        jobBond={jobBond}
        setJobBond={setJobBond}
        jobCriteria={jobCriteria}
        setJobCriteria={setJobCriteria}
        tenthMarks={tenthMarks}
        setTenthMarks={setTenthMarks}
        twelfthMarks={twelfthMarks}
        setTwelfthMarks={setTwelfthMarks}
        UGCgpa={UGCgpa}
        setUGCgpa={setUGCgpa}
        jobSection={jobSection}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleEditFunction={handleEdit}
      />
      <ModeOfSelection
        modeOfSelection={modeOfSelection}
        setModeOfSelection={setModeOfSelection}
        finalDesc={finalDesc}
        setFinalDesc={setFinalDesc}
        isEdit={isEdit}
      />
      <CompanyContact
        contactName={contactName}
        setJobContactName={setJobContactName}
        contactEmail={contactEmail}
        setContactEmail={setContactEmail}
        contactPhone={contactPhone}
        setContactPhone={setContactPhone}
        isEdit={isEdit}
      />
      <div className='mt-12'>
        <ApplicableCourses />
      </div>
    </div>
  )
}

import { useState } from 'react'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import BasicJobInfo from '@/components/BasicJobInfo'

import appleLogo from '@/public/appleLogo.png'
import JobDesc from '@/components/JobDesc'
import ModeOfSelection from '@/components/ModeOfSelection'
import CompanyContact from '@/components/CompanyContact'
import ApplicableCourses from '@/components/ApplicableCourses'

export default function JobOffers () {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='bg-gray-200 min-h-screen'>
      <DocHeader
        DocTitle='Jobs'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={2}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <p
          className='pt-14 ml-3 md:ml-6 mb-12 font-SubHeading text-base font-normal'
        >
          <span className='text-gray-500'>Home</span> {'>'} Product Designer
        </p>
        <BasicJobInfo
          logo={appleLogo}
          jobTitle='Product Designer'
          jobLocation='Apple Rammurthy nagar, Bangalore'
          jobCategory='Design'
          dueDate='12 NOV'
        />
        <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
          <JobDesc
            companyName='Apple'
            companyDesc="is an American multinational technology company headquartered in Cupertino, California. Apple is the largest technology company by revenue, totaling US$394.3 billion in 2022. As of March 2023, Apple is the world's biggest company by market capitalization."
            jobTitle='Product Designer'
            jobLocation='Apple Rammurthy nagar, Bangalore'
            jobCTC='₹ 10,00,000 - ₹ 15,00,000'
            jobDesc='We are looking for a Product Designer to join our team! As a Product Designer, you will be responsible for delivering the best online user experience, which makes your role extremely important for our success and ensuring customer satisfaction and loyalty. You will be designing ideas using various methods and latest technology. You will be designing graphic user interface elements, like menus, tabs, forms, and widgets.'
            jobBond='2 years'
            jobCriteria='B.Tech'
            jobSection={2}
          />
          <ModeOfSelection
            modeOfSelection='Online Test'
            finalDesc='The final selection will be based on the performance in the interview.'
          />
          <CompanyContact
            contactName='John Doe'
            contactEmail='johnDoe@gmail.com'
            contactPhone='+91 9876543210'
          />
        </div>
        <ApplicableCourses />
        <br />
        <br />
      </main>
    </div>
  )
}

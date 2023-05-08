import { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import Sidebar from "@/components/SideBar";
import DocHeader from '@/components/DocHeader'

import arrow from '@/public/arrow.png'
import download from '@/public/download.png'
import arrDown from '@/public/arrowdown.png'
import overview from '@/public/overview.png'
import microphone from '@/public/megaphone.png'

import AppliedStudents from '@/components/AppliedStudents';
import JobDesc from '@/components/JobDesc';

export default function CurrentJobs() {
    const [jobSection, setJobSection] = useState(1)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const setDeclinedJobsSection = () => {
        setJobSection(1)
    }

    const setDegree = () => {
        setJobSection(2)
    }

    return (
        <div className="bg-gray-200 min-h-screen">
            <DocHeader
                DocTitle="Jobs"
            />
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activePage={2}
            />
            <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
                <div className='pt-14 ml-0 md:ml-6 flex flex-col xl:flex-row'>
                    <Link href='/jobs'>
                        <Image
                            src={arrow}
                            alt="arrow-left"
                            className='my-auto h-12 w-12'
                        />
                    </Link>
                    <div className='ml-2 md:ml-6'>
                        <p
                            className='font-SubHeading text-base text-gray-400 font-bold'
                        >
                            Design
                        </p>
                        <h1 className='mt-1 text-xl md:text-2xl font-Heading font-bold text-black'>
                            Product Designer
                        </h1>
                        <p
                            className='pt-1 font-SubHeading text-base text-gray-400 font-bold'
                        >
                            PESU venture labs • Full time
                        </p>
                    </div>
                    <div className='mr-10 md:mr-20 ml-5 xl:ml-auto mt-6 grid grid-cols-2 gap-2'>
                        <div className='h-12 font-bold rounded-lg text-gray-600 py-2 px-4 bg-gray-200 border-2 border-gray-400'>
                            <div className='flex flex-row'>
                                <Image
                                    src={overview}
                                    alt="arrow-left"
                                    className='my-auto h-6 w-6 mr-2'
                                />
                                Overview
                            </div>
                        </div>
                        <div className='h-12 font-bold rounded-lg text-gray-600 py-2 px-4 bg-gray-200 border-2 border-gray-400'>
                            <div className='flex flex-row'>
                                <Image
                                    src={microphone}
                                    alt="arrow-left"
                                    className='my-auto h-6 w-6 mr-2'
                                />
                                Make announce
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10 ml-2 md:ml-10 pr-20 flex flex-row border-b-2 border-gray-300'>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <div
                            className={jobSection === 1 ? "pb-1 border-b-4 border-green-900" : ""}
                            onClick={setDeclinedJobsSection}
                        >
                            <span className="text-lg font-Heading font-semibold text-black pr-2">Candidates</span>
                        </div>
                        <div
                            className={jobSection === 2 ? "pb-1 border-b-4 border-green-900" : ""}
                            onClick={setDegree}
                        >
                            <span className="text-lg font-Heading font-semibold text-black pr-2">Job Details</span>
                        </div>
                    </div>
                    {
                        jobSection === 1 ?

                            <div className='ml-auto flex flex-row'>
                                <Image
                                    src={download}
                                    alt="arrow-left"
                                    className='mt-1 h-6 w-6 mr-3'
                                />
                                <p className="mt-1 text-lg font-Heading font-bold text-black pr-1">

                                    Download
                                </p>
                                <Image
                                    src={arrDown}
                                    alt="arrow-left"
                                    className='ml-2 mt-4 h-2 w-4'
                                />
                            </div>
                            :
                            <></>
                    }
                </div>
                {
                    jobSection === 1 ?
                        <AppliedStudents />
                        :
                        <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                            <JobDesc
                                companyName="Apple"
                                companyDesc="is an American multinational technology company headquartered in Cupertino, California. Apple is the largest technology company by revenue, totaling US$394.3 billion in 2022. As of March 2023, Apple is the world's biggest company by market capitalization."
                                jobTitle="Product Designer"
                                jobLocation="Apple Rammurthy nagar, Bangalore"
                                jobPosition="Full Time"
                                jobSector="Design"
                                jobCTC="₹ 10,00,000 - ₹ 15,00,000"
                                jobDesc="We are looking for a Product Designer to join our team! As a Product Designer, you will be responsible for delivering the best online user experience, which makes your role extremely important for our success and ensuring customer satisfaction and loyalty. You will be designing ideas using various methods and latest technology. You will be designing graphic user interface elements, like menus, tabs, forms, and widgets."
                                jobBond="2 years"
                                jobCriteria="B.Tech"
                                jobSection={1}
                            />
                        </div>
                }
                <br />
                <br />
            </main>
        </div>
    )
}
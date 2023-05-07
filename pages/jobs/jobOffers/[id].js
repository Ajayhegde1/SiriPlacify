import { useState } from 'react'
import Image from 'next/image';

import Sidebar from "@/components/SideBar";
import DocHeader from '@/components/DocHeader'

import appleLogo from '@/public/appleLogo.png'

export default function JobOffers() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [jobSection, setJobSection] = useState(1)

    const setJobOffersSection = () => {
        setJobSection(2)
    }

    const setDeclinedJobsSection = () => {
        setJobSection(3)
    }

    const setCurrentJobsSection = () => {
        setJobSection(1)
    }

    const setDegree = () => {
        setJobSection(4)
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
                <p
                    className='pt-14 ml-3 md:ml-6 mb-12 font-SubHeading text-base font-normal'
                >
                    <span className='text-gray-500'>Home</span> {'>'} Product Designer
                </p>
                <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-5 rounded-lg'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-8'>
                        <div className='col-span-1 2xl:col-span-2'>
                            <div className='flex flex-col md:flex-row gap-2 md:gap-8'>
                                <Image
                                    src={appleLogo}
                                    alt="apple logo"
                                />
                                <div className='mt-3'>
                                    <p className="mt-5">
                                        <span className="bg-black py-1 px-4 text-white rounded-2xl font-bold">
                                            DESIGN
                                        </span>
                                    </p>
                                    <h1 className='mt-3 text-2xl xl:text-3xl 2xl:text-4xl font-bold font-Heading font-bold text-black'>
                                        Product Designer
                                    </h1>
                                    <h1 className='my-2 text-sm text-medium font-Heading'>
                                        Apple Rammurthy nagar, Bangalore
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className='ml-auto w-40 p-3 bg-rose-100 rounded-2xl text-sm'>
                                <p className='text-gray-700 text-center'>DUE DATE - 12 NOV</p>
                            </div>
                            <div className='mt-6 lg:mt-20 grid grid-cols-2 gap-8'>
                                <div className='rounded-lg text-base md:text-lg 2xl:text-xl bg-red-500 text-white font-bold text-center p-2'>
                                    X    Decline For Now
                                </div>
                                <div className='rounded-lg text-base md:text-lg 2xl:text-xl bg-blue-600 text-white font-bold text-center p-2'>
                                    + Accept Offer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-4 md:p-10 rounded-lg'>
                    <h1 className='mt-3 pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
                        About Apple
                    </h1>
                    <p className='mt-6 mb-4 text-gray-500 text-medium text-lg mr-8 md:mr-32'>
                        is an American multinational technology company headquartered in Cupertino, California.
                        Apple is the largest technology company by revenue, totaling US$394.3 billion in 2022.
                        As of March 2023, Apple is the world's biggest company by market capitalization.
                    </p>
                    <h1 className='mt-20 pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
                        Job details
                    </h1>
                    <div class="mt-4 md:mt-10 mr-4 md:mr-20">
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Title</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>Product Designer</div>
                        </div>
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Location</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</div>
                        </div>
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>CTC Breakdown</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>12,5000</div>
                        </div>
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Job description</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>A Product Designer is a professional who is in charge of translating the wants and needs of consumers into product design features. They must have a creative eye, be able to think outside the box in order to come up with new ideas or solutions that meet customer expectations, and create digital or print drawings as well as design fully-functional products.</div>
                        </div>
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Bond / Service agreement details if any</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>Joining bonus: you shall be eligible for a one time joining bounus of INR 2,00,000, recoverable in prorated manner if you wish to leave the services within 3 years of joining.</div>
                        </div>
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Criteria</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>Minimum 45% in X Grade, Minimum 45% in XII Grade, Minimum CGPA Score 5.5</div>
                        </div>
                    </div>
                    <h1 className='mt-20 pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
                        Mode of selection
                    </h1>
                    <div class="mt-4 md:mt-10 mr-4 md:mr-20">
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Test mode</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'> Online (Provide system requirements)</div>
                        </div>
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Final selection</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>Personal Interview</div>
                        </div>
                    </div>
                    <h1 className='mt-20 pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
                        Company contact
                    </h1>
                    <div class="mt-4 md:mt-10 mr-4 md:mr-20">
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Name of the contact person</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>Kiriti</div>
                        </div>
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Contacts</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>9090909090</div>
                        </div>
                        <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                            <div className='text-gray-700 font-bold font-Heading col-span-1'>Email ID</div>
                            <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>Kiriti@gmail.com</div>
                        </div>
                    </div>
                </div>
                <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white rounded-lg'>
                    <h1 className='border-b-2 p-4 border-gray-300 rounded-2xl' >Applicable courses*</h1>
                    <div className='p-4 md:p-10'>
                        <div className="ml-2 md:ml-6 flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 border-b-2 border-gray-300">
                            <div
                                onClick={setCurrentJobsSection}
                                className={jobSection === 1 ? "pb-1 border-b-4 border-green-900" : ""}
                            >
                                <p>
                                    <span className="pb-1 text-lg font-Heading font-semibold text-black pr-1">
                                        B DEC
                                    </span>
                                    <span className="ml-2 p-1 bg-gray-300 rounded-2xl text-green-500 font-medium">
                                        09
                                    </span>
                                </p>
                            </div>
                            <div
                                onClick={setJobOffersSection}
                                className={jobSection === 2 ? "pb-1 border-b-4 border-green-900" : ""}
                            >
                                <span className="text-lg font-Heading font-semibold text-black pr-2">B.TECH</span>
                                <span className="p-1 bg-gray-300 rounded-2xl text-green-500 font-medium">12</span>
                            </div>
                            <div
                                className={jobSection === 3 ? "pb-1 border-b-4 border-green-900" : ""}
                                onClick={setDeclinedJobsSection}
                            >
                                <span className="text-lg font-Heading font-semibold text-black pr-2">M.TECH</span>
                                <span className="p-1 bg-gray-300 rounded-2xl text-green-500 font-medium">10</span>
                            </div>
                            <div
                                className={jobSection === 4 ? "pb-1 border-b-4 border-green-900" : ""}
                                onClick={setDegree}
                            >
                                <span className="text-lg font-Heading font-semibold text-black pr-2">DEGREE</span>
                                <span className="p-1 bg-gray-300 rounded-2xl text-green-500 font-medium">3</span>
                            </div>
                        </div>
                        <div className='ml-3 md:ml-6 mt-10'>
                            <div class="flex flex-col">
                                <div class="mb-[1rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300"
                                        type="checkbox"
                                        id="inlineCheckbox1"
                                        value="option1" />
                                    <label
                                        class="mt-1 md:mt-2 text-base md:text-lg inline-block pl-[0.75rem] md:pl-[2rem] text-gray-500 font-Heading "
                                        for="inlineCheckbox1"
                                    >Visual Design Design</label
                                    >
                                </div>
                                <div class="mb-[1rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300"
                                        type="checkbox"
                                        id="inlineCheckbox1"
                                        value="option1" />
                                    <label
                                        class="mt-1 md:mt-2 text-base md:text-lg inline-block pl-[0.75rem] md:pl-[2rem] text-gray-500 font-Heading"
                                        for="inlineCheckbox1"
                                    >Interaction Design</label
                                    >
                                </div>
                                <div class="mb-[1rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300"
                                        type="checkbox"
                                        id="inlineCheckbox2"
                                        value="option2" />
                                    <label
                                        class="mt-1 md:mt-2 text-base md:text-lg inline-block pl-[0.75rem] md:pl-[2rem] text-gray-500 font-Heading"
                                        for="inlineCheckbox2"
                                    >Product Design</label
                                    >
                                </div>
                                <div class="mb-[1rem] inline-block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.5rem] md:h-[2rem] w-[1.5rem] md:w-[2rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300"
                                        type="checkbox"
                                        id="inlineCheckbox3"
                                        value="option3"
                                     />
                                    <label
                                        class="mt-1 md:mt-2 text-base md:text-lg inline-block pl-[0.75rem] md:pl-[2rem] text-gray-500 font-Heading"
                                        for="inlineCheckbox3"
                                    >Communication Design</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </main>
        </div>
    )
}
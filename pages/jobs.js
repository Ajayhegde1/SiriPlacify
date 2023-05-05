import Sidebar from "@/components/SideBar";
import DocHeader from '@/components/DocHeader'

import { useState } from 'react'

import CurrentJobs from "@/components/CurrentJobs";
import JobOffers from "@/components/JobOffers";

export default function Jobs() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="bg-gray-200 min-h-screen">
            <DocHeader
                DocTitle="Current Jobs"
            />
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activePage={2}
            />
            <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
                <div className="pt-4 md:py-10 px-4 md:px-6 lg:p-10">
                    <div>
                        <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>Jobs</h1>
                        <div className="ml-2 md:ml-6 flex flex-col md:flex-row gap-4 md:gap-16 border-b-2 border-gray-300">
                            <div className="pb-1 border-b-4 border-green-900">
                                <p>
                                    <span className="pb-1 text-lg font-Heading font-semibold text-black pr-1">
                                        Current  Job
                                    </span>
                                    <span className="ml-2 p-1 bg-gray-300 rounded-2xl text-green-500 font-medium">
                                        09
                                    </span>
                                </p>
                            </div>
                            <div>
                                <span className="text-lg font-Heading font-semibold text-black pr-1">Job offers</span>
                                <span className="p-1 bg-gray-300 rounded-2xl text-green-500 font-medium">12</span>
                            </div>
                            <div>
                                <span className="text-lg font-Heading font-semibold text-black pr-1">Declined jobs</span>
                                <span className="p-1 bg-gray-300 rounded-2xl text-red-500 font-medium">10</span>
                            </div>
                        </div>
                        <JobOffers />
                    </div>
                </div>
            </main >
        </div >
    );
}
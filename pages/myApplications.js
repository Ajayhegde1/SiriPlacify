import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { useState, useEffect } from 'react'

export default function myApplications() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='min-h-screen bg-gray-200'>
            <DocHeader
                DocTitle='My Applications'
            />
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activePage={9}
            />
            <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
                <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 pt-6 md:pt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>My Applications</h1>
                <div className='bg-white p-5 rounded-xl mr-4 md:mr-12 overflow-auto'>
                    <table className='table-auto overflow-scroll w-full mt-3 text-left'>
                        <thead className='border-2 border-gray-300'>
                            <th className='border-r-2 border-gray-300 px-6 py-4 text-gray-600'>Company Name</th>
                            <th className='border-r-2 border-gray-300 px-6 py-4 text-gray-600'>Job Title</th>
                            <th className='border-r-2 border-gray-300 px-6 py-4 text-gray-600'>Status</th>
                        </thead>
                        <tbody>
                            <tr className='border-2 border-gray-300'>
                                <td className='border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                                    Apple
                                </td>
                                <td className='border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                                    UX Designer
                                </td>
                                <td className='border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                                    Applied
                                </td>
                            </tr>
                            <tr className='border-2 border-gray-300'>
                                <td className='border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                                    Apple
                                </td>
                                <td className='border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                                    UX Designer
                                </td>
                                <td className='border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                                    Applied
                                </td>
                            </tr>
                            <tr className='border-2 border-gray-300'>
                                <td className='border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                                    Apple
                                </td>
                                <td className='border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                                    UX Designer
                                </td>
                                <td className='border-r-2 border-gray-300 whitespace-nowrap px-6 py-4'>
                                    Applied
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
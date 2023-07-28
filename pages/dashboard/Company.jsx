import { useState } from 'react'
import { useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import FirstHalfCompany from '@/components/Dashboard/FirstHalfCompany'
import PlannedVsActualGraph from '@/components/Dashboard/PlannedVsActualGraph'

export default function Company() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const user = useSelector((state) => state.user)

  return (
    <div className='bg-gray-200'>
      <DocHeader
        DocTitle='Dashboard'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={1}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <div className='min-h-screen pt-3 md:py-6 px-4 md:px-6 lg:p-6'>
          <div className='pb-2'>
            <h1 className='text-center md:text-left pt-4 pb-2 text-xl md:text-4xl font-Heading font-bold text-black'>Dashboard</h1>
            <p className='text-center md:text-left text-base md:text-xl text-gray-500 font-medium font-Heading ml-1'>Welcome, {user === null ? ' ' : user.username}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-2 xl:gap-6">
            <FirstHalfCompany />
            <div className="col-span-1 2xl:col-span-3">
              <PlannedVsActualGraph />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

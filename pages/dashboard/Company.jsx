import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

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
          <div className='pb-4'>
            <h1 className='text-center md:text-left pt-6 pb-4 text-3xl md:text-6xl font-Heading font-bold text-black'>Dashboard</h1>
            <p className='text-center md:text-left text-base md:text-xl text-gray-500 font-medium font-Heading ml-1'>Welcome, {user === null ? ' ' : user.username}</p>
          </div>

        </div>
      </main>
    </div>
  )
}

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

export default function JobStatus () {
    const router = useRouter()
    
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const { state } = router.query;
    console.log(state)

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
          </main>
        </div>
    )
}
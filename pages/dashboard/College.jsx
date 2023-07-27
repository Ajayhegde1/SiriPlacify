import { useState} from 'react'
import { useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import SalaryStatsComponents from '@/components/Dashboard/SalaryStatsComponents'
import BasicStatsComponents from '@/components/Dashboard/BasicStatsComponents'
import TypesOfOfferComponents from '@/components/Dashboard/TypesOfOffersComponents'
import PlacedGraphComponents from '@/components/Dashboard/PlacedGraphComponents'
import RetentionGraphComponent from '@/components/Dashboard/RetentionGraphComponent'
import SectorWisePlacementGraph from '@/components/Dashboard/SectorWisePlacementGraphComponent'
import TopThreeSectorComponents from '@/components/Dashboard/TopThreeSectorComponents'
import StudentStatsComponent from '@/components/Dashboard/StudentStatsComponent'
import YearwiseGraphComponent from '@/components/Dashboard/YearwiseGraphComponent'
import SectorTrendGraphComponent from '@/components/Dashboard/SectorTrendGraphComponent'
import TopRecruitersComponent from '@/components/Dashboard/TopRecruitersComponent'
import AchievementCarousel from '@/components/Dashboard/AchievementCarousel/Index'
import BranchWiseLineGraph from '@/components/Dashboard/BranchWiseLineGraph'

export default function College() {
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
        <div className='min-h-screen pt-4 md:py-10 px-4 md:px-6 lg:p-10'>
          <div className='pb-4'>
            <h1 className='text-center md:text-left pt-6 pb-4 text-3xl md:text-6xl font-Heading font-bold text-black'>Dashboard</h1>
            <p className='text-center md:text-left text-base md:text-xl text-gray-500 font-medium font-Heading ml-1'>Welcome, {user === null ? ' ' : user.username}</p>
          </div>
          <div className='mb-6 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-2 md:gap-4 2xl:gap-8'>
            <div className='col-span-1 2xl:col-span-3'>
              <BasicStatsComponents />
            </div>
            <div className='col-span-1 2xl:col-span-2'>
              <PlacedGraphComponents />
            </div>
          </div>
          <div className='mb-2 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-2 md:gap-4 2xl:gap-8'>
            <div className='col-span-1 2xl:col-span-3'>
              <SalaryStatsComponents />
              <TypesOfOfferComponents />
            </div>
            <div className='col-span-1 2xl:col-span-2'>
              <RetentionGraphComponent />
            </div>
          </div>
          <div className='pb-6 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-2 md:gap-4 2xl:gap-8'>
            <div className='col-span-1 2xl:col-span-3'>
              <SectorWisePlacementGraph />
            </div>
            <div className='col-span-1 2xl:col-span-2'>
              <TopThreeSectorComponents />
            </div>
          </div>
          <StudentStatsComponent />
          <YearwiseGraphComponent />
          <SectorTrendGraphComponent />
          <BranchWiseLineGraph />
          <TopRecruitersComponent />
          <AchievementCarousel />
        </div>
      </main>
    </div>
  )
}

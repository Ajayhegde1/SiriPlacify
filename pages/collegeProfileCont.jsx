import DocHeader from "@/components/DocHeader"

import Image from 'next/image'
import { useState } from "react"

import student from '../public/students.png'
import PlacementTrend from "@/components/PlacementTrend"
import SectorWisePlacement from "@/components/SectorWisePlacement"
import AddAchievment from "@/components/AddAchievment"

export default function CollegeProfileCont() {
    const [placementTrend, setPlacementTrend] = useState([])
    const [sectorWisePlacement, setSectorWisePlacement] = useState([])
    const [branchTrends, setBranchTrends] = useState([])
    const [achievements, setAchievements] = useState([])

    const [showBranchTrendsModal, setShowBranchTrendsModal] = useState(false)

    return (
        <div>
            <DocHeader
                DocTitle='College Profile'
            />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 xl:gap-6 2xl:gap-12 content-center'>
                <div className='mt-4 py-4 pl-2 md:pl-6 xl:pl-8 ml-3 md:ml-8 xl:ml-12 mr-8 md:mr-10 xl:mr-12 2xl:mr-16'>
                <h1 className='text-center md:text-left mb-10 mt-12 text-3xl md:text-4xl font-Heading font-medium text-black'>Complete your profile (Continued)</h1>
                <PlacementTrend 
                    placementTrend={placementTrend}
                    setPlacementTrend={setPlacementTrend}
                />
                <hr className='my-8 border-t-2 border-gray-300' />
                <SectorWisePlacement 
                    sectorWisePlacement={sectorWisePlacement}
                    setSectorWisePlacement={setSectorWisePlacement}
                />
                <hr className='my-8 border-t-2 border-gray-300' />
                <AddAchievment
                    achievements={achievements}
                    setAchievements={setAchievements}
                />
                </div>
                <div className='hidden lg:block'>
                    <Image className='h-full w-full' src={student} alt='students' />
                </div>
            </div>
        </div>
    )
}
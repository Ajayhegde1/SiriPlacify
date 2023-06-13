import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { getTPODashboard } from '@/redux/Sagas/requests/features'
import { notificationTypes, openNotification } from '@/utils/notifications'
import { routes } from '@/constants/routes'

export default function College() {
    const router = useRouter()
    
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [data, setData] = useState({})

    const user = useSelector((state) => state.user)

    useEffect(() => {
        if (user === null) {
            router.push(routes.NOTFOUND)
        } else if (user !== null) {
            if (user.accType !== '0') {
                router.push(routes.NOTFOUND)
            } else {
                getTPODashboard()
                    .then((res) => {
                        if (res.data.status === 200) {
                            setData(res.data.data)
                        }
                        else {
                            openNotification(
                                notificationTypes.ERROR,
                                'Error',
                                'Unable to get Data'
                            )
                        }
                    })
                    .catch((err) => {
                        openNotification(
                            notificationTypes.ERROR,
                            'Error'
                        ),
                            'Unable to get Data'
                    })
            }
        }
    }, [])

    return (
        <div className='bg-gray-200'>
            <DocHeader
                DocTitle='Dashboard'
            />
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activePage={9}
            />
            <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
                <div className='min-h-screen pt-4 md:py-10 px-4 md:px-6 lg:p-10'>
                    <div className='pb-4'>
                        <h1 className='text-center md:text-left pt-6 md:pt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>Dashboard</h1>
                    </div>
                    <div className='mt-6 mb-6 lg:mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8'>
                        <div className="py-2 bg-white rounded-xl">
                            <div className="flex flex-col justify-center">
                                <div>
                                    <h1 className="font-DMSANS text-center font-bold mt-2">
                                        Number of Students
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                        {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.noOfStudents}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 bg-white rounded-xl">
                            <div className="flex flex-col justify-center">
                                <div>
                                    <h1 className="font-DMSANS text-center font-bold mt-2">
                                        Companies Approached
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                    {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.noOfCompanies}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 bg-white rounded-xl">
                            <div className="flex flex-col justify-center">
                                <div>
                                    <h1 className="font-DMSANS text-center font-bold mt-2">
                                        Number of Offers
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                    {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.noOfStudentsPlaced}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 bg-white rounded-xl">
                            <div className="flex flex-col justify-center">
                                <div>
                                    <h1 className="font-DMSANS text-center font-bold mt-2">
                                        Number of Students Placed
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                    {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.noOfOffers}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-6 lg:mb-10 grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div className='col-span-1 bg-white p-6 rounded-lg'>
                            <h1 className='text-center md:text-left pt-6 text-lg md:text-2xl font-Heading font-bold text-black'>Distribution of Offers</h1>
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                    <div className="flex flex-col justify-center">
                                        <div>
                                            <h1 className="font-DMSANS text-center font-bold mt-2">
                                                Number of T1 offers
                                            </h1>
                                        </div>
                                        <div>
                                            <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                            {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.noOfT1Offers}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                    <div className="flex flex-col justify-center">
                                        <div>
                                            <h1 className="font-DMSANS text-center font-bold mt-2">
                                                Number of T2 offers
                                            </h1>
                                        </div>
                                        <div>
                                            <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                            {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.noOfT2Offers}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                    <div className="flex flex-col justify-center">
                                        <div>
                                            <h1 className="font-DMSANS text-center font-bold mt-2">
                                                Number of T3 offers
                                            </h1>
                                        </div>
                                        <div>
                                            <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                            {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.noOfT3Offers}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 bg-white p-6 rounded-lg'>
                            <h1 className='text-center md:text-left pt-6 text-lg md:text-2xl font-Heading font-bold text-black'>
                                CTC Statistics
                            </h1>
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                    <div className="flex flex-col justify-center">
                                        <div>
                                            <h1 className="font-DMSANS text-center font-bold mt-2">
                                                Mean Package
                                            </h1>
                                        </div>
                                        <div>
                                            <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-2xl">
                                            {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.meanPackage}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                    <div className="flex flex-col justify-center">
                                        <div>
                                            <h1 className="font-DMSANS text-center font-bold mt-2">
                                            Median Package
                                            </h1>
                                        </div>
                                        <div>
                                            <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-2xl">
                                            {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.medianPackage}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                    <div className="flex flex-col justify-center">
                                        <div>
                                            <h1 className="font-DMSANS text-center font-bold mt-2">
                                                Highest Package
                                            </h1>
                                        </div>
                                        <div>
                                            <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-2xl">
                                                {data === null ? 0 : Object.keys(data) === 0 ? 0 : data.highestPackage}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
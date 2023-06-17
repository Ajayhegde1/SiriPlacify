import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { notificationTypes, openNotification } from '@/utils/notifications'
import { routes } from '@/constants/routes'
import { getCompanyDashboard } from '@/redux/Sagas/requests/features'

import BarGraph from '@/components/HiresChart'

export default function Company() {
    const router = useRouter()

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [data, setData] = useState({})

    const user = useSelector((state) => state.user)

    const chartData = {
        labels: ['Category 1'],
        plannedHires: [data.plannedHires],
        studentHires: [data.applicants],
    };


    useEffect(() => {
        if (user === null) {
            router.push(routes.NOTFOUND)
        } else if (user !== null) {
            if (user.accType !== '2') {
                router.push(routes.NOTFOUND)
            } else {
                getCompanyDashboard()
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
                activePage={1}
            />
            <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
                <div className='min-h-screen pt-3 md:py-6 px-4 md:px-6 lg:p-6'>
                    <div className='pb-4'>
                        <h1 className='text-center md:text-left pt-6 md:pt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>
                            Dashboard
                        </h1>
                    </div>
                    <div className='mt-6 mb-6 lg:mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8'>
                        <div className="py-2 bg-white rounded-xl">
                            <div className="flex flex-col justify-center">
                                <div>
                                    <h1 className="font-DMSANS text-center font-bold mt-2">
                                        Planned Hires
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                        {data === null ? 0 : Object.keys(data).length === 0 ? 0 : data.plannedHires}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 bg-white rounded-xl">
                            <div className="flex flex-col justify-center">
                                <div>
                                    <h1 className="font-DMSANS text-center font-bold mt-2">
                                        Number of Colleges Jobs offered to
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                        {data === null ? 0 : Object.keys(data).length === 0 ? 0 : data.colleges}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 bg-white rounded-xl">
                            <div className="flex flex-col justify-center">
                                <div>
                                    <h1 className="font-DMSANS text-center font-bold mt-2">
                                        Number of Applicants
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                        {data === null ? 0 : Object.keys(data).length === 0 ? 0 : data.applicants}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pb-6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6'>
                        <div className='col-span-1 2xl:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                            <div className='col-span-1 lg:col-span-3 bg-white p-6 rounded-lg'>
                                <h1 className='text-center md:text-left pt-6 text-lg md:text-2xl font-Heading font-bold text-black'>
                                    Status of students
                                </h1>
                                    <div className="mb-6 w-full lg:w-1/2 2xl:w-1/3 mt-4 col-span-1 p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                        <div className="flex flex-col justify-center">
                                            <div>
                                                <h1 className="font-DMSANS text-center font-bold mt-2">
                                                    Students Applied
                                                </h1>
                                            </div>
                                            <div>
                                                <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                                    {data === null ? 0 : Object.keys(data).length === 0 ? 0 : data.appliedStudents}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                <div className="mt-5 grid grid-cols-1 grid-col-1 md:grid-cols-2 2xl:grid-cols-4 gap-2">
                                    <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                        <div className="flex flex-col justify-center">
                                            <div>
                                                <h1 className="font-DMSANS text-center font-bold mt-2">
                                                    Students shortlisted
                                                </h1>
                                            </div>
                                            <div>
                                                <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                                    {data === null ? 0 : Object.keys(data).length === 0 ? 0 : data.shortlistedStudents}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                        <div className="flex flex-col justify-center">
                                            <div>
                                                <h1 className="font-DMSANS text-center font-bold mt-2">
                                                    Students in Test
                                                </h1>
                                            </div>
                                            <div>
                                                <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                                    {data === null ? 0 : Object.keys(data).length === 0 ? 0 : data.TestStudents}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                        <div className="flex flex-col justify-center">
                                            <div>
                                                <h1 className="font-DMSANS text-center font-bold mt-2">
                                                    Students in Interview
                                                </h1>
                                            </div>
                                            <div>
                                                <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                                    {data === null ? 0 : Object.keys(data).length === 0 ? 0 : data.InterviewStudents}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-2 border-gray-200 shadow-xl bg-white rounded-xl">
                                        <div className="flex flex-col justify-center">
                                            <div>
                                                <h1 className="font-DMSANS text-center font-bold mt-2">
                                                    Students Hired
                                                </h1>
                                            </div>
                                            <div>
                                                <h1 className="mt-1 font-DMSANS font-bold text-customGreenTwo text-center xl:text-4xl">
                                                    {data === null ? 0 : Object.keys(data).length === 0 ? 0 : data.HiredStudents}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 bg-white p-2 md:px-6 rounded-lg mb-6'>
                            <h1 className='text-center md:text-left pt-10 pb-6 text-md md:text-2xl font-Heading font-bold text-black'>
                                Planned Hires vs Students Applied
                            </h1>
                            <div>
                            {
                                data === null
                                    ?
                                    <div className='flex justify-center items-center'>
                                        Loading...
                                    </div>
                                    :
                                    Object.keys(data).length === 0 || (data.plannedHires === 0 && data.applicants === 0)
                                        ? 
                                        <div className='mt-6 md:mt-12 text-gray-500 text-5xl font-semibold font-Heading flex justify-center items-center'>
                                            No Data
                                        </div>
                                        :
                                        <BarGraph
                                            data={chartData}
                                        />
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
import { getCompanyDashboard } from "@/redux/Sagas/requests/features"
import StonksUpComponent from "../StonksUpComponent"

import { useEffect, useState } from "react"
import { Spin } from "antd"

import { notificationTypes, openNotification } from "@/utils/notifications"

export default function FirstHalfCompany() {
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(() => {
        getCompanyDashboard()
            .then((res) => {
                if (res.data.status === 200) {
                    setDashboardData(res.data.data)
                }
                else {
                    openNotification(
                        notificationTypes.ERROR,
                        'Error',
                        'Error in fetching dashboard data'
                    )
                }
            })
            .catch((err) => {
                openNotification(
                    notificationTypes.ERROR,
                    'Error',
                    'Error in fetching dashboard data'
                )
            })
    }, [])

    return (
        <>
            {
                dashboardData === null ?
                    (
                        <div className="min-h-screen flex my-10 justify-center">
                            <Spin size='large' />
                        </div>
                    )
                    :
                    Object.keys(dashboardData).length === 0
                        ?
                        (
                            <div className='min-h-screen flex justify-center text-5xl font-bold text-gray-600'>
                                No data found
                            </div>
                        )
                        :
                        <div className='col-span-1 2xl:col-span-2 mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4'>
                            <StonksUpComponent
                                title='Planned hiring'
                                count={dashboardData.plannedHires}
                                stonksType={4}
                            />
                            <StonksUpComponent
                                title='Hired candidates'
                                count={dashboardData.HiredStudents}
                                stonksType={5}
                            />
                            <StonksUpComponent
                                title='Colleges/ Universities'
                                count={dashboardData.colleges}
                                stonksType={2}
                            />
                            <StonksUpComponent
                                title='Total Applicants'
                                count={dashboardData.applicants}
                                stonksType={2}
                            />
                            <StonksUpComponent
                                title='Shortlisted candidates'
                                count={dashboardData.shortlistedStudents}
                                stonksType={6}
                            />
                            <StonksUpComponent
                                title='Student in test stage'
                                count={dashboardData.TestStudents}
                                stonksType={7}
                            />
                            <StonksUpComponent
                                title='Rejected candidates'
                                count={dashboardData.rejectedStudents}
                                stonksType={8}
                            />
                            <StonksUpComponent
                                title='Interviewed candidates'
                                count={dashboardData.InterviewStudents}
                                stonksType={9}
                            />
                        </div>
            }
        </>
    )
}
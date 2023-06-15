import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'

import { getNotifications, updateNotification } from '@/redux/Slices/notificationSlice'

export default function Notifications() {
    const dispatch = useDispatch()

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const Notifications = useSelector((state) => state.notifications)

    useEffect(() => {
        dispatch(getNotifications())
    }, [dispatch])

    const handleMarkNotifications = (id) => {
        dispatch(updateNotification(id))
    }

    return (
        <div className='min-h-screen bg-gray-200'>
            <DocHeader
                DocTitle='Notifications'
            />
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activePage={12}
            />
            <main className={`dashboard ${sidebarOpen ? 'active' : ''}`}>
                <div className='flex flex-col items-center justify-center flex-1 h-full pl-3 md:pl-10 pr-3 md:pr-24 py-10'>
                    <div className='flex flex-col w-full space-y-4'>
                        <div className='flex flex-row justify-between items-center w-full'>
                            <h2 className='text-4xl my-10 font-bold text-gray-900'>Notifications</h2>
                        </div>
                        <div class='flex flex-col space-y-4'>
                            {Notifications.map((notification) => (
                                <div className='w-full p-4 bg-white rounded-lg shadow-xs'>
                                    <div className='flex flex-row items-center justify-between'>
                                        <div className='flex flex-col space-y-2 w-2/3'>
                                            <span className='font-Heading text-base md:text-lg font-bold text-gray-900'>{notification.subject}</span>
                                            <span className='font-SubHeading text-sm md:text-base font-normal text-gray-500'>{notification.body}</span>
                                        </div>
                                        <div className='text-sm font-normal text-gray-500 ml-auto'>
                                            {notification.formattedDate}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleMarkNotifications(notification.uid)}
                                            className='p-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-sm font-bold text-white flex ml-auto mt-2'
                                        >
                                            Mark as Read
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
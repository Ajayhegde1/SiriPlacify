import CollegeItem from '../CollegesList/CollegeItem'

import { useEffect, useState } from 'react'
import { notificationTypes, openNotification } from '@/utils/notifications'

import { getOfferColleges } from '@/redux/Sagas/requests/features'

export default function OfferedCollegesList({
    jobID
}) {
    const [colleges, setColleges] = useState([])

    useEffect(() => {
        if (typeof jobID !== 'undefined') {
            getOfferColleges(jobID)
                .then((res) => {
                    if (res.data.status === 200 || res.data.status === 'ok') {
                        setColleges(res.data.data)
                    }
                })
                .catch((err) => {
                    openNotification(
                        notificationTypes.ERROR,
                        'Error',
                        'Error in fetching applied students'
                    )
                })
        }
    }, [jobID])

    return (
        <div className='pb-10'>
            <div className='ml-2 md:ml-10 mt-5 bg-white p-4 mr-5 lg:mr-20 rounded-lg'>
                {
                    colleges === null || typeof colleges === 'undefined'
                        ?
                        <div>
                            Loading...
                        </div>
                        : colleges.length === 0
                            ? <div className='mt-6 mb-3 ml-6 font-medium'>
                                No colleges have applied yet
                            </div>
                            :
                            <div>
                                {
                                    colleges.filter((college) => college.status === '1').length === 0
                                        ?
                                        <div></div>
                                        :
                                        <div className='my-5'>
                                            <h1 className='text-center md:text-left underline underline-offset-8 mb-5 ml-3 md:ml-6 mt-12 text-2xl md:text-3xl font-Heading font-bold text-black'>Offer Accepted Colleges</h1>
                                            <CollegeItem
                                                jobID={jobID}
                                                colleges={colleges.filter((college) => college.status === '1')}
                                                isOffered={true}
                                            />
                                        </div>
                                }
                                {
                                    colleges.filter((college) => college.status === '0').length === 0
                                        ?
                                        <div></div>
                                        :
                                        <div className='mt-10 mb-5'>
                                            <h1 className='text-center md:text-left underline underline-offset-8 mb-5 ml-3 md:ml-6 mt-12 text-2xl md:text-3xl font-Heading font-bold text-black'>Offer Pending Colleges</h1>
                                            <CollegeItem
                                                jobID={jobID}
                                                colleges={colleges.filter((college) => college.status === '0')}
                                                isOffered={true}
                                            />
                                        </div>
                                }
                                {
                                    colleges.filter((college) => college.status === '2').length === 0
                                        ?
                                        <div></div>
                                        :
                                        <div>
                                            <h1 className='text-center md:text-left underline underline-offset-8 mb-5 ml-3 md:ml-6 mt-12 text-2xl md:text-3xl font-Heading font-bold text-black'>Offer Declined Colleges</h1>
                                            <CollegeItem
                                                jobID={jobID}
                                                colleges={colleges.filter((college) => college.status === '2')}
                                                isOffered={true}
                                            />
                                        </div>
                                }
                            </div>
                }
            </div>
        </div>
    )
}
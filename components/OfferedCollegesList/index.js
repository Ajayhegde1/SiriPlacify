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
                        : <CollegeItem
                            colleges={colleges}
                            isOffered={true}
                        />
            }
        </div>
    )
}
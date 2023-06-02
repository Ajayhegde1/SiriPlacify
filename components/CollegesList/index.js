import CollegeItem from './CollegeItem'

import { useEffect, useState } from 'react'
import { notificationTypes, openNotification } from '@/utils/notifications'

import { getColleges,sendOfferColleges } from '@/redux/Sagas/requests/features'
import Button from '../Buttons'

export default function CollegesList({
    jobID
}) {
    const [colleges, setColleges] = useState([])
    const [offerColleges, setOfferColleges] = useState([])

    useEffect(() => {
        if (typeof jobID !== 'undefined') {
            getColleges(jobID)
                .then((res) => {
                    if (res.data.status === 200) {
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

    const sendOffers = () => {
        if (typeof jobID !== 'undefined') {
            let data = {
                collegeIDs: offerColleges
            }
            sendOfferColleges(data,jobID)
                .then((res) => {
                    if (res.data.status === 200 || res.data.status === 'ok') {
                        openNotification(
                            notificationTypes.SUCCESS,
                            'Sucess',
                            'Sent Offer to Students'
                        )
                        window.location.reload()
                    }
                    else{
                        openNotification(
                            notificationTypes.ERROR,
                            'Error',
                            'Error in sending offers to colleges'
                        )
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
    }

    const addCollegeList = (event, college) => {
        if (event.target.checked) {
            setOfferColleges([...offerColleges, college.uid])
        }
        else{
            setOfferColleges(offerColleges.filter((item) => item !== college.uid))
        }
    }

    return (
        <div>
            <div className='mt-6 w-1/2 md:w-1/5 flex ml-auto mr-5 lg:mr-20 '>
                <Button
                    btnText='Offer Jobs'
                    onClickHandler={sendOffers}
                />
            </div>
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
                                offerColleges={offerColleges}
                                sendOfferColleges={setOfferColleges}
                                addCollegeList={addCollegeList}
                                isOffered={false}
                            />
                }
            </div>
        </div>
    )
}
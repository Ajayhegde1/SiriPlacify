import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import DateTimePicker from 'react-datetime-picker';

import close from '../../../public/close.png'
import styles from '@/styles/modal.module.css'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { notificationTypes, openNotification } from '@/utils/notifications'
import { POST } from '@/config/api'

import { schedulePPT } from '@/redux/Sagas/requests/features';

import TextField from '@/components/InputComponents/TextField'
import Label from '@/components/InputComponents/Label';

export default function SetPPTModal({
    showModal,
    setShowModal,
    jobID,
    collegeID
}) {
    const modalRef = useRef(null)
    const user = useSelector((state) => state.user)

    const [btnText, setBtnText] = useState('Schedule')
    const [url, setURL] = useState('')
    const [platform, setPlatform] = useState('')
    const [value, onChange] = useState(new Date());
    const [isDisabled, setIsDisabled] = useState(true)

    const closeModal = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        //check platform, url, value
        if (platform !== '' && url !== '' && value !== '') {
            setIsDisabled(false)
        }
    }, [platform, url, value])

    const handleChangePassword = () => {
        setBtnText('Scheduling')
        const data = {
            collegeID,
            jobID,
            platform: platform,
            url: url,
            date: value
        }
        schedulePPT(data)
            .then((res) => {
                if (res.data.status === 200){
                    openNotification(notificationTypes.SUCCESS, 'Success', 'PPT Scheduled Successfully')
                    setShowModal(!showModal)
                }
                else if (res.data.status === 424){
                    openNotification(notificationTypes.ERROR, 'Error', res.data.message)
                }
                else if (res.data.status === 425){
                    openNotification(notificationTypes.ERROR, 'Error', res.data.message)
                }
                else if (res.data.status === 426){
                    openNotification(notificationTypes.ERROR, 'Error', res.data.message)
                }
                else if (res.data.status === 427){
                    openNotification(notificationTypes.ERROR, 'Error', res.data.message)
                }
                else if (res.data.status === 500){
                    openNotification(notificationTypes.ERROR, 'Error', res.data.message)
                }
                else{
                    openNotification(notificationTypes.ERROR, 'Error', 'Unable To Schedule PPT')
                }
            })
            .catch((err) => {
                openNotification(notificationTypes.ERROR, 'Error', 'Unable To Schedule PPT')
            })
        setBtnText('Schedule')
    }

    useEffect(() => {
        if (showModal) {
            modalRef.current.style.top = '0'
            modalRef.current.style.opacity = '1'
        } else {
            modalRef.current.style.top = '120vh'
            modalRef.current.style.opacity = '0'
        }
    }, [showModal])

    return (
        <div ref={modalRef} className={styles.wrapper}>
            <div className={styles.cardContainer5}>
                <div className={styles.header}>
                    <div className={styles.header}>
                        <h2
                            className='pb-3 mt-2 ml-4 text-black font-bold font-Heading text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'
                        >
                            Schedule Pre Placement Talk
                        </h2>
                    </div>
                    <div className={styles.close}>
                        <a onClick={closeModal}>
                            <Image
                                src={close}
                                className='h-14'
                                alt='close button'
                            />
                        </a>
                    </div>
                </div>
                <div className={styles.modalBody}>
                    <div className='mt-6 ml-4 mr-10'>
                        <TextField
                            label='Platform'
                            type='url'
                            placeholder='Zoom, Google Meet, etc.'
                            value={platform}
                            onChangeHandler={(e) => setPlatform(e.target.value)}
                        />
                        <TextField
                            label='Meeting Link'
                            type='text'
                            placeholder='meet.google.com/abc-xyz'
                            value={url}
                            onChangeHandler={(e) => setURL(e.target.value)}
                        />
                        <Label
                            label='Date and Time'
                        />
                        <DateTimePicker
                            onChange={onChange}
                            value={value}
                        />
                    </div>
                    <div className='mt-6 ml-4 mr-10'>
                        <button
                            onClick={handleChangePassword}
                            className={isDisabled ? 'flex ml-auto h-10 bg-gray-500 text-white font-bold rounded-lg py-2 px-4' : 'flex ml-auto h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4'}
                            disabled={isDisabled}
                        >
                            {btnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import DateTimePicker from 'react-datetime-picker'
import { Spin } from 'antd'

import close from '../../../public/close.png'
import styles from '@/styles/modal.module.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

import { openNotification } from '@/utils/notifications'
import { validateURL } from '@/utils/validators' 

import { schedulePPT } from '@/redux/Sagas/requests/features'

import TextField from '@/components/InputComponents/TextField'
import Label from '@/components/InputComponents/Label'

export default function UpdatePPTModal({
  showModal,
  setShowModal,
  jobID,
  collegeID,
  data,
  setData
}) {
  const modalRef = useRef(null)
  const [btnText, setBtnText] = useState('Schedule')

  const closeModal = () => {
    setShowModal(false)
  }

  const displayNotification = (type, message) => {
    const notificationTypes = {
      SUCCESS: 'success',
      ERROR: 'error'
    }
    openNotification(notificationTypes[type], type, message)
  }

  const handleChangePPT = () => {
    setBtnText('Scheduling')

    if (data.url !== '' && !validateURL(data.url)) {
      displayNotification('ERROR', 'Invalid URL')
      setBtnText('Schedule')
      return
    }

    const requestData = {
      collegeID,
      jobID,
      platform: data.platform,
      url: data.url,
      date: data.pptDateTime,
      venue: data.venue
    }

    schedulePPT(requestData)
      .then((res) => {
        if (res.data.status === 200) {
          displayNotification('SUCCESS', 'PPT Scheduled Successfully')
          setShowModal(false)
        } else if (res.data.status === 424 || res.data.status === 425 || res.data.status === 426 || res.data.status === 427 || res.data.status === 500) {
          displayNotification('ERROR', res.data.message)
        } else {
          displayNotification('ERROR', 'Unable To Schedule PPT')
        }
      })
      .catch(() => {
        displayNotification('ERROR', 'Unable To Schedule PPT')
      })
      setBtnText('Schedule')
  }

  useEffect(() => {
    modalRef.current.style.top = showModal ? '0' : '120vh'
    modalRef.current.style.opacity = showModal ? '1' : '0'
  }, [showModal])

  return (
    <div ref={modalRef} className={styles.wrapper}>
      <div className={styles.cardContainer5}>
        <div className={styles.header}>
          <h2 className='font-bold text-xl ml-4 mt-2'>
            View / Update Pre Placement Talk
          </h2>
          <div className={styles.close}>
            <a onClick={closeModal}>
              <Image src={close} className='h-14' alt='close button' />
            </a>
          </div>
        </div>
        {data === null ? (
          <Spin size='large' />
        ) : Object.keys(data).length === 0 ? (
          <>Data Not Found</>
        ) : (
          <div className={styles.modalBody}>
            <div className='mt-6 ml-4 mr-10'>
              <TextField
                label='Platform'
                type='text'
                placeholder='Zoom, Google Meet, etc.'
                value={data.platform}
                onChangeHandler={(e) => setData({ ...data, platform: e.target.value })}
              />
              <TextField
                label='Meeting Link'
                type='url'
                placeholder='meet.google.com/abc-xyz'
                value={data.url}
                onChangeHandler={(e) => setData({ ...data, url: e.target.value })}
              />
              <TextField
                label='Venue'
                type='text'
                placeholder='auditorium'
                value={data.venue}
                onChangeHandler={(e) => setData({ ...data, venue: e.target.value })}
              />
              <Label label='Date and Time' />
              <DateTimePicker
                onChange={(value) => setData({ ...data, pptDateTime: value })}
                value={data.pptDateTime}
              />
            </div>
            <div className='mt-6 ml-4 mr-10'>
              <button
                onClick={handleChangePPT}
                className='flex ml-auto h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4'
              >
                {btnText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

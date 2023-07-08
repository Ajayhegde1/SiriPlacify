import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import DateTimePicker from 'react-datetime-picker'
import { Spin } from 'antd'

import close from '../../../public/close.png'
import styles from '@/styles/modal.module.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

import { notificationTypes, openNotification } from '@/utils/notifications'

import { schedulePPT } from '@/redux/Sagas/requests/features'

import TextField from '@/components/InputComponents/TextField'
import Label from '@/components/InputComponents/Label'

export default function UpdatePPTModal ({
  showModal,
  setShowModal,
  jobID,
  collegeID,
  data,
  setData
}) {
  const modalRef = useRef(null)
  const user = useSelector((state) => state.user)

  const [btnText, setBtnText] = useState('Schedule')
  const [value, onChange] = useState(new Date())

  const closeModal = () => {
    setShowModal(!showModal)
  }

  const validateURL = (inputURL) => {
    const domainPattern = new RegExp('^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}(\/[A-Za-z0-9-]+)?$')
    return domainPattern.test(inputURL)
  }

  const handleChangePassword = () => {
    setBtnText('Scheduling')

    console.log(data)
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
              View / Update Pre Placement Talk
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
        {
                    data === null
                      ? <>
                        <Spin size='large' />
                      </>
                      : Object.keys(data).length === 0
                        ? <>
                          Data Not Found
                          </>
                        : <div className={styles.modalBody}>
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
                            <Label
                              label='Date and Time'
                            />
                            <DateTimePicker
                              onChange={onChange}
                              value={data.pptDateTime}
                            />
                          </div>
                          <div className='mt-6 ml-4 mr-10'>
                            <button
                              onClick={handleChangePassword}
                              className='flex ml-auto h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4'
                            >
                              {btnText}
                            </button>
                          </div>
                        </div>

                }
      </div>
    </div>
  )
}

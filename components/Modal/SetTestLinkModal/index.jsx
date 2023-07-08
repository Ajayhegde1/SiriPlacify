import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import DateTimePicker from 'react-datetime-picker'

import close from '../../../public/close.png'
import styles from '@/styles/modal.module.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

import { notificationTypes, openNotification } from '@/utils/notifications'

import TextField from '@/components/InputComponents/TextField'
import TextArea from '@/components/InputComponents/TextArea'
import Label from '@/components/InputComponents/Label'

import { scheduleTest } from '@/redux/Sagas/requests/features'

export default function SetTestLinkModal ({
  showModal,
  setShowModal,
  jobID,
  collegeID,
  data
}) {
  const modalRef = useRef(null)
  const user = useSelector((state) => state.user)

  const [btnText, setBtnText] = useState('Schedule')
  const [url, setURL] = useState('')
  const [platform, setPlatform] = useState('')
  const [prerequisties, setPrerequistes] = useState('')
  const [value, onChange] = useState(new Date())
  const [isDisabled, setIsDisabled] = useState(true)

  const closeModal = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    // check platform, url, value
    if (platform !== '' && value !== '') {
      setIsDisabled(false)
    }
  }, [platform, url, value])

  const validateURL = (inputURL) => {
    const domainPattern = new RegExp('^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}(\/[A-Za-z0-9-]+)?$')
    return domainPattern.test(inputURL)
  }

  const handleChangePassword = () => {
    setBtnText('Scheduling')

    if (url !== '' && !validateURL(url)) {
      openNotification(notificationTypes.ERROR, 'Error', 'Invalid URL')
      setBtnText('Schedule')
      return
    }

    const data = {
      collegeID,
      jobID,
      platform,
      url,
      date: value,
      prerequistes: prerequisties
    }
    scheduleTest(data)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(notificationTypes.SUCCESS, 'Success', 'PPT Scheduled Successfully')
          setShowModal(!showModal)
          window.location.reload()
        } else if (res.data.status === 424) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message)
        } else if (res.data.status === 425) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message)
        } else if (res.data.status === 426) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message)
        } else if (res.data.status === 427) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message)
        } else if (res.data.status === 500) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message)
        } else {
          openNotification(notificationTypes.ERROR, 'Error', 'Unable To Schedule Test')
        }
      })
      .catch((err) => {
        openNotification(notificationTypes.ERROR, 'Error', 'Unable To Schedule Test')
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
      <div className={styles.cardContainer1}>
        <div className={styles.header}>
          <div className={styles.header}>
            <h2
              className='pb-3 mt-2 ml-4 text-black font-bold font-Heading text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'
            >
              Schedule Test
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
                      ? <div className={styles.modalBody}>
                        <div className='mt-4 ml-4 mr-10'>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 xl:gap-8'>
                            <TextField
                              label='Platform'
                              type='text'
                              placeholder='HackerRank, CodeChef, etc.'
                              value={platform}
                              onChangeHandler={(e) => setPlatform(e.target.value)}
                            />
                            <div className='mb-6'>
                              <Label
                                label='Date and Time'
                              />
                              <div className='mt-4'>
                                <DateTimePicker
                                  onChange={onChange}
                                  value={value}
                                />
                              </div>
                            </div>
                          </div>
                          <TextField
                            label='Test Link'
                            type='url'
                            placeholder='hackerrank/abc-xyz'
                            value={url}
                            onChangeHandler={(e) => setURL(e.target.value)}
                          />
                          <TextArea
                            label='Prerequisties'
                            placeholder='Enter prerequisties for the students'
                            value={prerequisties}
                            onChangeHandler={(e) => setPrerequistes(e.target.value)}
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
                      : Object.keys(data).length === 0
                        ? <div className={styles.modalBody}>
                          <div className='mt-4 ml-4 mr-10'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 xl:gap-8'>
                              <TextField
                                label='Platform'
                                type='text'
                                placeholder='HackerRank, CodeChef, etc.'
                                value={platform}
                                onChangeHandler={(e) => setPlatform(e.target.value)}
                              />
                              <div className='mb-6'>
                                <Label
                                  label='Date and Time'
                                />
                                <div className='mt-4'>
                                  <DateTimePicker
                                    onChange={onChange}
                                    value={value}
                                  />
                                </div>
                              </div>
                            </div>
                            <TextField
                              label='Test Link'
                              type='url'
                              placeholder='hackerrank/abc-xyz'
                              value={url}
                              onChangeHandler={(e) => setURL(e.target.value)}
                            />
                            <TextArea
                              label='Prerequisties'
                              placeholder='Enter prerequisties for the students'
                              value={prerequisties}
                              onChangeHandler={(e) => setPrerequistes(e.target.value)}
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
                        : <div className={styles.modalBody}>
                          <div className='mt-4 ml-4 mr-10'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 xl:gap-8'>
                              <TextField
                                label='Platform'
                                type='text'
                                placeholder='HackerRank, CodeChef, etc.'
                                value={data.platform}
                                disabled
                              />
                              <div className='mb-6'>
                                <Label
                                  label='Date and Time'
                                />
                                <div className='mt-4'>
                                  <DateTimePicker
                                    onChange={onChange}
                                    value={data.testDateTime}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <TextField
                              label='Test Link'
                              type='url'
                              placeholder='hackerrank/abc-xyz'
                              value={data.url}
                              disabled
                            />
                            <TextArea
                              label='Prerequisties'
                              placeholder='Enter prerequisties for the students'
                              value={data.prerequistes}
                              disabled
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
                }
      </div>
    </div>
  )
}

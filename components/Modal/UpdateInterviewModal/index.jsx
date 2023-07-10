import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import DateTimePicker from 'react-datetime-picker';
import { Spin } from 'antd';

import close from '../../../public/close.png';
import styles from '@/styles/modal.module.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { notificationTypes, openNotification } from '@/utils/notifications';
import { scheduleInterview } from '@/redux/Sagas/requests/features';

import TextField from '@/components/InputComponents/TextField';
import TextArea from '@/components/InputComponents/TextArea';
import Label from '@/components/InputComponents/Label';

export default function UpdateInterviewModal({
  showModal,
  setShowModal,
  jobID,
  collegeID,
  data,
  setData
}) {
  const modalRef = useRef(null);

  const [btnText, setBtnText] = useState('Schedule');
  
  const closeModal = () => {
    setShowModal(!showModal);
  };

  const validateURL = (inputURL) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // Protocol (optional)
      '((([a-zA-Z\\d][a-zA-Z\\d-]*[a-zA-Z\\d])|([a-zA-Z\\d]))\\.?)+[a-zA-Z]{2,6}(\\/.*)?$' // Domain name with valid extensions and optional path
    );
    return urlPattern.test(inputURL);
  };

  const updateInterviewHandler = () => {
    setBtnText('Scheduling')

    if (data.url !== '' && !validateURL(data.url)) {
      openNotification(notificationTypes.ERROR, 'Error', 'Invalid URL')
      setBtnText('Schedule')
      return
    }

    const deets = {
      collegeID,
      jobID,
      platform: data.platform,
      url: data.url,
      date: data.interviewDateTime,
      prerequistes: data.prerequistes,
      venue: data.venue
    }

    scheduleInterview(deets)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(notificationTypes.SUCCESS, 'Success', 'Interview Scheduled Successfully')
          setShowModal(!showModal)
          window.location.reload()
        } else if (res.data.status === 423) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message)
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
          openNotification(notificationTypes.ERROR, 'Error', 'Unable To Schedule Interview')
        }
      })
      .catch((err) => {
        openNotification(notificationTypes.ERROR, 'Error', 'Unable To Schedule Interview')
      })
    setBtnText('Schedule')
  }

  useEffect(() => {
    modalRef.current.style.top = showModal ? '0' : '120vh';
    modalRef.current.style.opacity = showModal ? '1' : '0';
  }, [showModal]);

  const renderModalBody = () => {
    if (data === null) {
      return <Spin size='large' />;
    }

    return (
      <div className={styles.modalBody}>
        <div className='mt-4 ml-4 mr-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 xl:gap-8'>
            <TextField
              label='Platform'
              type='text'
              placeholder='Zoom, Google Meet, etc.'
              value={data.platform}
              onChangeHandler={(e) => setData({ ...data, platform: e.target.value })}
            />
            <div className='mb-6'>
              <Label label='Date and Time' />
              <div className='mt-4'>
                <DateTimePicker
                  onChange={(value) => setData({ ...data, interviewDateTime: value })}
                  value={data.interviewDateTime}
                />
              </div>
            </div>
          </div>
          <TextField
            label='Meeting Link'
            type='text'
            placeholder='meet.google.com/abc-xyz'
            value={data.url}
            onChangeHandler={(e) => setData({ ...data, url: e.target.value })}
          />
          <TextField
            label='Venue'
            type='text'
            placeholder='Auditorium'
            value={data.venue}
            onChangeHandler={(e) => setData({ ...data, venue: e.target.value })}
          />
          <TextArea
            label='Prerequisites'
            placeholder='Enter prerequisites for the students'
            value={data.prerequistes}
            onChangeHandler={(e) => setData({ ...data, prerequisites: e.target.value })}
          />
        </div>
        <div className='mt-6 ml-4 mr-10'>
          <button
            onClick={updateInterviewHandler}
            className={`flex ml-auto h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4`}
          >
            {btnText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div ref={modalRef} className={styles.wrapper}>
      <div className={styles.cardContainer1}>
        <div className={styles.header}>
          <h2 className='pb-3 mt-2 ml-4 text-black font-bold font-Heading text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'>
            View / Update Interview
          </h2>
          <div className={styles.close}>
            <a onClick={closeModal}>
              <Image src={close} className='h-14' alt='close button' />
            </a>
          </div>
        </div>
        {renderModalBody()}
      </div>
    </div>
  );
}

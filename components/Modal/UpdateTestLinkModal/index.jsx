import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import DateTimePicker from 'react-datetime-picker';
import { Spin } from 'antd';

import close from '../../../public/close.png';
import styles from '@/styles/modal.module.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { notificationTypes, openNotification } from '@/utils/notifications';
import { validateURL } from '@/utils/validators' 

import TextField from '@/components/InputComponents/TextField';
import TextArea from '@/components/InputComponents/TextArea';
import Label from '@/components/InputComponents/Label';

import { scheduleTest } from '@/redux/Sagas/requests/features';

export default function UpdateTestLinkModal({
  showModal,
  setShowModal,
  jobID,
  collegeID,
  data,
  setData,
}) {
  const modalRef = useRef(null);

  const [btnText, setBtnText] = useState('Schedule');

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const handleUpdateTestModal = () => {
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
      date: data.testDateTime,
      prerequistes: data.prerequistes,
      venue: data.venue
    }
    scheduleTest(deets)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(notificationTypes.SUCCESS, 'Success', 'Test Scheduled Successfully')
          setShowModal(!showModal)
          setData({
            platform: deets.platform,
            url: deets.url,
            testDateTime: deets.date,
            venue: deets.venue,
            prerequistes: deets.prerequistes
          })
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
  };

  useEffect(() => {
    modalRef.current.style.top = showModal ? '0' : '120vh';
    modalRef.current.style.opacity = showModal ? '1' : '0';
  }, [showModal]);

  return (
    <div ref={modalRef} className={styles.wrapper}>
      <div className={styles.cardContainer1}>
        <div className={styles.header}>
          <h2 className='pb-3 mt-2 ml-4 text-black font-bold font-Heading text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'>
            Schedule Test
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
          <div className={styles.modalBody}>No Data Found</div>
        ) : (
          <div className={styles.modalBody}>
            <div className='mt-4 ml-4 mr-10'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 xl:gap-8'>
                <TextField
                  label='Platform'
                  type='text'
                  placeholder='HackerRank, CodeChef, etc.'
                  value={data.platform}
                  onChangeHandler={(e) => setData({ ...data, platform: e.target.value })}
                />
                <div className='mb-6'>
                  <Label label='Date and Time' />
                  <div className='mt-4'>
                    <DateTimePicker
                      onChange={(value) => setData({ ...data, testDateTime: value })}
                      value={data.testDateTime}
                    />
                  </div>
                </div>
              </div>
              <TextField
                label='Test Link'
                type='url'
                placeholder='hackerrank/abc-xyz'
                value={data.url}
                onChangeHandler={(e) => setData({ ...data, url: e.target.value })}
              />
              <TextField
                label='Venue'
                type='url'
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
                onClick={handleUpdateTestModal}
                className='flex ml-auto h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4'
              >
                {btnText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

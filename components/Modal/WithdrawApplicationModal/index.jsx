import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import close from '../../../public/close.png'
import styles from '@/styles/modal.module.css'
import Image from 'next/image'
import { POST } from '@/config/api'
import { notificationTypes, openNotification } from '@/utils/notifications'

export default function WithdrawApplicationModal ({
  showModal,
  setShowModal,
  jobID
}) {
  const modalRef = useRef(null)
  const user = useSelector((state) => state.user)

  const closeModal = () => {
    setShowModal(!showModal)
  }

  const handleWithdrawJob = () => {
    const data = {
      jobID
    }

    POST('/withdrawJob', data, { sessionID: user.sessionId })
      .then((res) => {
        if (res.data.status === 200) {
          setShowModal(!showModal)
          window.location.reload()
        } else if (res.data.status === 401) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Session ID is invalid or not present'
          )
        } else if (res.data.status === 423) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get college ID'
          )
        } else if (res.data.status === 424) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Unable to get Job ID or college ID'
          )
        } else if (res.data.status === 425) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Error in withdrawing application'
          )
        } else if (res.data.status === 500) {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Error in withdrawing application'
          )
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Error in withdrawing application'
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Error in withdrawing application'
        )
      })
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
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <div className={styles.header}>
            <h2
              className='pb-3 mt-2 md:underline underline-offset-8 ml-4 text-black font-bold font-DMSANS text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'
            >
              Withdraw Your Application!
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
          <p className='ml-3 mt-5'>Are you sure you want to withdraw from this application?</p>
          <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div
              onClick={() => handleWithdrawJob()}
              className='cursor-pointer rounded-lg text-base md:text-lg 2xl:text-xl bg-green-600 text-white font-bold text-center p-2'
            >
              Yes
            </div>
            <div
              onClick={() => setShowModal(!showModal)}
              className='cursor-pointer rounded-lg text-base md:text-lg 2xl:text-xl bg-red-600 text-white font-bold text-center p-2'
            >
              No
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

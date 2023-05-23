import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import close from '../../../public/close.png'
import styles from '@/styles/modal.module.css'
import Image from 'next/image'
import { POST } from '@/config/api'
import { notificationTypes, openNotification } from '@/utils/notifications'

export default function JobApplicationModal ({
  showModal,
  setShowModal,
  jobID
}) {
  const modalRef = useRef(null)
  const user = useSelector((state) => state.user)

  const closeModal = () => {
    setShowModal(!showModal)
  }

  const handleApplyJob = () => {
    const data = {
      jobID
    }

    POST('/applyJobs', data, { sessionID: user.sessionId })
      .then((res) => {
        if (res.data.status === '200') {
          setShowModal(!showModal)
          window.location.reload()
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            'Something went wrong, please try again later'
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          'Something went wrong, please try again later'
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
      <div className={styles.cardContainer5}>
        <div className={styles.header}>
          <div className={styles.header}>
            <h2
              className='pb-3 mt-2 md:underline underline-offset-8 ml-4 text-black font-bold font-DMSANS text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'
            >
              Confirm Your Application!
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
          <p className='ml-3 mt-5'>I understand that any false statements or omissions may disqualify me from further consideration for employment and may result in my dismissal if discovered at a later date.</p>
          <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div
              onClick={() => handleApplyJob()}
              className='rounded-lg text-base md:text-lg 2xl:text-xl bg-green-600 text-white font-bold text-center p-2'
            >
              Yes
            </div>
            <div
              onClick={() => setShowModal(!showModal)}
              className='rounded-lg text-base md:text-lg 2xl:text-xl bg-red-600 text-white font-bold text-center p-2'
            >
              No
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

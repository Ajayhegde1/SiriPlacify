import { useRef, useEffect } from 'react'
import close from '../../../public/close.png'
import styles from '@/styles/modal.module.css'
import Image from 'next/image'

export default function LastRoundInterviewModal ({
  showModal,
  setShowModal,
  lastRoundModalFunction,
  notLastRoundHandler
}) {
  const modalRef = useRef(null)

  const closeModal = () => {
    setShowModal(!showModal)
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
              Confirmation!
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
          <p className='ml-3 mt-5'>
            Is this your last round of interview?
          </p>
          <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div
              onClick={lastRoundModalFunction}
              className='cursor-pointer rounded-lg text-base md:text-lg 2xl:text-xl bg-green-600 text-white font-bold text-center p-2'
            >
              Yes
            </div>
            <div
              onClick={notLastRoundHandler}
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

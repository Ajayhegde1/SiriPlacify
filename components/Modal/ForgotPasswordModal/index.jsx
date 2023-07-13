import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import close from '../../../public/close.png'
import styles from '@/styles/modal.module.css'
import Image from 'next/image'
import { POST } from '@/config/api'
import { notificationTypes, openNotification } from '@/utils/notifications'
import TextField from '@/components/InputComponents/TextField'

export default function ForgotPasswordModal ({
  showModal,
  setShowModal
}) {
  const modalRef = useRef(null)
  const user = useSelector((state) => state.user)

  const [emailID, setEmailID] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [btnText, setBtnText] = useState('Change Password')

  const closeModal = () => {
    setShowModal(!showModal)
  }

  const handleForgotPassword = () => {
    setBtnText('Changing')
    const data = { emailID }
    POST('/forgotPassword', data)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(notificationTypes.SUCCESS, 'Success', res.data.message)
        }
        else{
            openNotification(notificationTypes.ERROR, 'Error', res.data.message)
        } 
        setTimeout(() => {
            setEmailID('')
            setBtnText('Change Password')
            setShowModal(false)
        }, 1000)
      })
      .catch((error) => {
        openNotification(notificationTypes.ERROR, 'Error', 'Unable to Change Password')
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

  useEffect(() => {
    if (emailID !== '') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [emailID])

  return (
    <div ref={modalRef} className={styles.wrapper}>
      <div className={styles.cardContainer5}>
        <div className={styles.header}>
          <div className={styles.header}>
            <h2
              className='pb-3 mt-2 ml-4 text-black font-bold font-Heading text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'
            >
              Change Password
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
              label='Enter email ID'
              type='email'
              placeholder='abc@gmail.com'
              value={emailID}
              onChangeHandler={(e) => setEmailID(e.target.value)}
            />
          </div>
          <div className='mt-6 ml-4 mr-10'>
            <button
              onClick={handleForgotPassword}
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

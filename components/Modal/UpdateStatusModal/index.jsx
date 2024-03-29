import { useRef, useEffect } from 'react'
import styles from '@/styles/modal.module.css'
import sheet from '../../../public/sheets.png'
import close from '../../../public/close.png'
import Image from 'next/image'

export default function UpdateStatusModal ({
  showModal,
  setShowModal,
  ImportExcel
}) {
  const modalRef = useRef(null)
  const hiddenFileInput = useRef(null)

  const closeModal = () => {
    setShowModal(!showModal)
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click()
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
              className='pb-3 mt-2 underline underline-offset-8 ml-4 text-black font-bold font-DMSANS text-base text-customGreenThree xl:text-2xl leading-none lg:leading-11'
            >
              Update Student Status
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
        <div className='my-4 ml-3'>
          <h1 className='font-bold text-2xl mb-4'>Please Update student as per given excel sheet</h1>
          <p className='font-medium text-xl mb-2'>Status must be as follows:</p>
          <ul className='text-xl font-medium'>
            <li>0: Applied</li>
            <li>1: Shortlisted</li>
            <li>2: Test</li>
            <li>3: Interview</li>
            <li>4: Hired</li>
            <li>5: Reject</li>
          </ul>
        </div>
        <div className='pt-5 pl-5 rounded-3xl'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='mt-4'>
              <a
                href='/sample_updateStatus.xlsx'
                download='sampleForStatusUpdation.xlsx'
                className='ml-10 mt-1 bg-blue-300 hover:bg-green-300 border-2 text-black font-bold py-5 px-4 text-base rounded-xl focus:outline-none focus:shadow-outline'
              >
                Download Sample sheet
              </a>
            </div>
            <div>
              <button
                onClick={handleClick}
                className='flex hover:bg-customBlueFour rounded-2xl text-black font-bold font-DMSANS text-base border-2 border-black px-6 py-4'
              >
                <input
                  type='file'
                  ref={hiddenFileInput}
                  name='file'
                  required
                  onChange={(event) => ImportExcel(event)}
                  id='fu'
                  style={{ display: 'none' }}
                  accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                />
                <Image
                  src={sheet}
                  alt='Import excel sheet'
                  className='h-5 mt-1 mr-2'
                />
                Import From Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

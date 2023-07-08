import { useRef, useEffect, useState } from 'react'
import close from '../../../public/close.png'
import styles from '@/styles/modal.module.css'
import Image from 'next/image'
import TextField from '@/components/InputComponents/TextField'

export default function AddTierModal ({
  showModal,
  setShowModal,
  setPlacementTierList
}) {
  const modalRef = useRef(null)

  const [newTier, setNewTier] = useState({
    name: '',
    minCTC: 0,
    maxCTC: 0
  })

  const handleNewTierChange = (field, value) => {
    setNewTier(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  const handleAddTier = () => {
    if (newTier.name && newTier.minCTC && newTier.maxCTC) {
      const formattedTier = {
        ...newTier,
        minCTC: parseFloat(newTier.minCTC),
        maxCTC: parseFloat(newTier.maxCTC)
      }
      setPlacementTierList(prevList => [...prevList, formattedTier])
      setNewTier({
        name: '',
        minCTC: 0,
        maxCTC: 0
      })
      setShowModal(!showModal)
    }
  }

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
      <div className={styles.cardContainer5}>
        <div className={styles.header}>
          <div className={styles.header}>
            <h2
              className='pb-3 mt-2 md:underline underline-offset-8 ml-4 text-black font-bold font-DMSANS text-lg md:text-2xl xl:text-4xl leading-none lg:leading-11'
            >
              Add Tier
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
              label='Tier Name'
              type='text'
              placeholder='Tier Name'
              value={newTier.name}
              onChangeHandler={e => handleNewTierChange('name', e.target.value)}
            />
            <TextField
              label='Minimum CTC'
              type='text'
              placeholder='Minimum CTC'
              value={newTier.minCTC}
              onChangeHandler={e => handleNewTierChange('minCTC', e.target.value)}
            />
            <TextField
              label='Maximum CTC'
              type='text'
              placeholder='Maximum CTC'
              value={newTier.maxCTC}
              onChangeHandler={e => handleNewTierChange('maxCTC', e.target.value)}
            />
            <button
              className='flex ml-auto h-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4'
              onClick={handleAddTier}
            >
              Add Tier
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

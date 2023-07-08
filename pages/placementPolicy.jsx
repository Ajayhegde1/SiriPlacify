import photo from '../public/policy.png'

import Image from 'next/image'
import { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CloseCircleOutlined } from '@ant-design/icons'

import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import Button from '@/components/Buttons'
import AddTierModal from '@/components/Modal/AddTierModal'

import { addPlacementPolicy } from '@/redux/Slices/placementPolicy'
import { routes } from '@/constants/routes'

export default function placementPolicy () {
  const router = useRouter()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const [btnText, setBtnText] = useState('Save')
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [showTierModal, setShowTierModal] = useState(false)

  const [numberOfTiers, setNumberOfTiers] = useState(0)
  const [maxNumberOfOffers, setMaxNumberOfOffers] = useState(0)
  const [placementPolicyList, setPlacementTierList] = useState([])

  useEffect(() => {
    if ((numberOfTiers > 0 && maxNumberOfOffers > 0 && placementPolicyList.length > 0) === true) {
      setIsBtnDisabled(!isBtnDisabled)
    }
  }, [numberOfTiers, maxNumberOfOffers, placementPolicyList])

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '0') {
        router.push(routes.NOTFOUND)
      } else {
        if (user.signUpStatus === '2') {
          router.push(routes.TPODASHBOARD)
        }
      }
    }
  }, [user])

  const handleDeleteTier = (index) => {
    const updatedList = [...placementPolicyList]

    updatedList.splice(index, 1)

    setPlacementTierList(updatedList)
  }

  const handleAddTier = () => {
    if (placementPolicyList.length < numberOfTiers) {
      setShowTierModal(true)
    }
  }

  const handleCTCChange = (index, field, value) => {
    const updatedList = [...placementPolicyList]
    updatedList[index] = {
      ...updatedList[index],
      [field]: parseFloat(value)
    }
    setPlacementTierList(updatedList)
  }

  const handlePlacementPolicy = () => {
    const Data = {
      noOfTiers: numberOfTiers,
      maxOffers: maxNumberOfOffers,
      tiers: placementPolicyList
    }
    setBtnText('Saving...')
    dispatch(addPlacementPolicy(Data))
  }

  return (
    <div>
      <DocHeader
        DocTitle='Placement Policy'
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 xl:gap-6 2xl:gap-12 content-center'>
        <div className='mt-4 py-4 md:py-12 pl-2 md:pl-6 xl:pl-8 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12 2xl:mr-16'>
          <h1 className='text-center md:text-left mb-10 ml-3 md:ml-6 mt-12 text-3xl md:text-4xl font-Heading font-medium text-black'>Placement Policy</h1>
          <div className='ml-6'>
            <div className='mb-3 w-full md:w-1/2'>
              <TextField
                label='Number of tiers'
                placeholder='03'
                type='text'
                value={numberOfTiers}
                onChangeHandler={e => setNumberOfTiers(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <TextField
                label='Maximum Number of offers a student can receive'
                placeholder='03'
                type='text'
                value={maxNumberOfOffers}
                onChangeHandler={e => setMaxNumberOfOffers(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
              {
                placementPolicyList.map((item, index) =>
                  <Fragment key={index}>
                    <div className='col-span-3'>
                      <TextField
                        label={`Minimum CTC of ${item.name}`}
                        placeholder='75,0000.00'
                        type='text'
                        value={item.minCTC}
                        onChangeHandler={(e) =>
                          handleCTCChange(index, 'minCTC', e.target.value)}
                      />
                    </div>
                    <div className='col-span-3'>
                      <TextField
                        label={`Maximum CTC of ${item.name}`}
                        placeholder='85,0000.00'
                        type='text'
                        value={item.maxCTC}
                        onChangeHandler={(e) =>
                          handleCTCChange(index, 'maxCTC', e.target.value)}
                      />
                    </div>
                    <div className='flex col-span-1'>
                      <button
                        className='my-auto'
                        onClick={() => handleDeleteTier(index)}
                      >
                        <CloseCircleOutlined style={{ fontSize: '24px' }} />
                      </button>
                    </div>
                  </Fragment>
                )
              }
            </div>
            {
              placementPolicyList.length < numberOfTiers
                ? <div className='flex'>
                  <button
                    className='cursor-pointer ml-auto bg-green-500 text-white font-bold rounded-lg py-2 px-4'
                    onClick={handleAddTier}
                  >
                    Add Tier
                  </button>
                  </div>
                : numberOfTiers === 0
                  ? <div className='flex'>
                    <button
                      className='cursor-not-allowed ml-auto bg-gray-500 text-white font-bold rounded-lg py-2 px-4'
                    >
                      No Tiers Added
                    </button>
                  </div>
                  : <div className='flex'>
                    <button
                      className='ml-auto bg-gray-500 hover:bg-green-700 text-white font-bold rounded-lg py-2 px-4'
                    >
                      Max Tiers Added
                    </button>
                  </div>
            }
            <div class='mt-6 mb-6'>
              <Button
                btnText={btnText}
                disabled={isBtnDisabled}
                onClickHandler={handlePlacementPolicy}
              />
            </div>
          </div>
        </div>
        <div className='hidden lg:block'>
          <Image className='h-full w-full' src={photo} alt='students' />
        </div>
      </div>
      <AddTierModal
        showModal={showTierModal}
        setShowModal={setShowTierModal}
        setPlacementTierList={setPlacementTierList}
      />
    </div>
  )
}

import photo from '../public/policy.png'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import Button from '@/components/Buttons'

import { useDispatch, useSelector } from 'react-redux'

import { addPlacementPolicy } from '@/redux/Slices/placementPolicy'

export default function placementPolicy () {
  const dispatch = useDispatch()

  const [btnText, setBtnText] = useState('Save')
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)

  const [numberOfTiers, setNumberOfTiers] = useState(0)
  const [maxNumberOfOffers, setMaxNumberOfOffers] = useState(0)
  const [minCTCT1, setMinCTCT1] = useState(0.0)
  const [maxCTCT1, setMaxCTCT1] = useState(0.0)
  const [minCTCT2, setMinCTCT2] = useState(0.0)
  const [maxCTCT2, setMaxCTCT2] = useState(0.0)
  const [minCTCT3, setMinCTCT3] = useState(0.0)
  const [maxCTCT3, setMaxCTCT3] = useState(0.0)

  useEffect(() => {
    // make sure user entered proper values in field
    if (numberOfTiers > 0 && maxNumberOfOffers > 0 && minCTCT1 > 0.0 && maxCTCT1 > 0.0 && minCTCT2 > 0.0 && maxCTCT2 > 0.0 && minCTCT3 > 0.0 && maxCTCT3 > 0.0) {
      setIsBtnDisabled(false)
    }
  }, [numberOfTiers, maxNumberOfOffers, minCTCT1, maxCTCT1, minCTCT2, maxCTCT2, minCTCT3, maxCTCT3])

  const handlePlacementPolicy = () => {
    const Data = {
      noOfTiers: numberOfTiers,
      maxOffers: maxNumberOfOffers,
      minCTCT1,
      maxCTCT1,
      minCTCT2,
      maxCTCT2,
      minCTCT3,
      maxCTCT3
    }

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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <TextField
                label='Minimum CTC of tier 1'
                placeholder='75,0000.00'
                type='text'
                value={minCTCT1}
                onChangeHandler={e => setMinCTCT1(e.target.value)}
              />
              <TextField
                label='Maximum CTC of tier 1'
                placeholder='85,0000.00'
                type='text'
                value={maxCTCT1}
                onChangeHandler={e => setMaxCTCT1(e.target.value)}
              />
              <TextField
                label='Minimum CTC of tier 2'
                placeholder='75,0000.00'
                type='text'
                value={minCTCT2}
                onChangeHandler={e => setMinCTCT2(e.target.value)}
              />
              <TextField
                label='Maximum CTC of tier 2'
                placeholder='85,0000.00'
                type='text'
                value={maxCTCT2}
                onChangeHandler={e => setMaxCTCT2(e.target.value)}
              />
              <TextField
                label='Minimum CTC of tier 3'
                placeholder='75,0000.00'
                type='text'
                value={minCTCT3}
                onChangeHandler={e => setMinCTCT3(e.target.value)}
              />
              <TextField
                label='Maximum CTC of tier 3'
                placeholder='85,0000.00'
                type='text'
                value={maxCTCT3}
                onChangeHandler={e => setMaxCTCT3(e.target.value)}
              />
            </div>
            <div class='mt-6 mb-6'>
              <Button
                btnText='Done'
                isBtnDisabled={isBtnDisabled}
                onClickHandler={handlePlacementPolicy}
              />
            </div>
          </div>
        </div>
        <div className='hidden lg:block'>
          <Image className='h-full w-full' src={photo} alt='students' />
        </div>
      </div>
    </div>
  )
}

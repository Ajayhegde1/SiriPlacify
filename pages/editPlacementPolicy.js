import Sidebar from '@/components/SideBar'
import TextField from '@/components/InputComponents/TextField'
import Button from '@/components/Buttons'
import DocHeader from '@/components/DocHeader'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import pp from '@/public/pp1.png'

import { getPlacementPolicy } from '@/redux/Slices/placementPolicy'
import { routes } from '@/constants/routes'
import { updatePlacementPolicy } from '@/redux/Sagas/requests/features'
import { openNotification, notificationTypes } from '@/utils/notifications'

export default function EditPlacementPolicy () {
  const dispatch = useDispatch()
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [noOfTiers, setNoOfTiers] = useState('')
  const [maxOffers, setMaxOffers] = useState('')
  const [minCTCForT1, setMinCTCForT1] = useState('')
  const [minCTCForT2, setMinCTCForT2] = useState('')
  const [minCTCForT3, setMinCTCForT3] = useState('')
  const [maxCTCForT1, setMaxCTCForT1] = useState('')
  const [maxCTCForT2, setMaxCTCForT2] = useState('')
  const [maxCTCForT3, setMaxCTCForT3] = useState('')
  const [update, setUpdate] = useState('Update')
  const [isDisabled, setIsDisabled] = useState(false)

  const placementPolicy = useSelector((state) => state.placementPolicy)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '0') {
        router.push(routes.NOTFOUND)
      } else {
        dispatch(getPlacementPolicy())
      }
    }
  }, [user, dispatch])

  useEffect(() => {
    if (placementPolicy !== null) {
      if (Object.keys(placementPolicy) !== 0) {
        setNoOfTiers(placementPolicy.noOfTiers)
        setMaxOffers(placementPolicy.maxOffers)
        setMinCTCForT1(placementPolicy.minCTCForT1)
        setMinCTCForT2(placementPolicy.minCTCForT2)
        setMinCTCForT3(placementPolicy.minCTCForT3)
        setMaxCTCForT1(placementPolicy.maxCTCForT1)
        setMaxCTCForT2(placementPolicy.maxCTCForT2)
        setMaxCTCForT3(placementPolicy.maxCTCForT3)
      }
    }
  }, [placementPolicy])

  const updatePlacementPolicyHandler = () => {
    const data = {
      noOfTiers,
      maxOffers,
      minCTCForT1,
      minCTCForT2,
      minCTCForT3,
      maxCTCForT1,
      maxCTCForT2,
      maxCTCForT3
    }
    setIsDisabled(true)
    setUpdate('Updating...')

    updatePlacementPolicy(data)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(notificationTypes.SUCCESS, 'Success', 'Placement Policy Updated Successfully')
        } else if (res.data.status === 401) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message)
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
          openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong')
        }
        setTimeout(() => {
          window.location.reload()
        }, 4000)
      })
      .catch((err) => {
        openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong')
        setTimeout(() => {
          window.location.reload()
        }, 4000)
      })
  }

  return (
    <div className='bg-gray-200'>
      <DocHeader
        DocTitle='Placement Policy'
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={4}
      />
      <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
        <div className='pt-4 md:py-10 px-4 md:px-6 lg:p-10'>
          <div className='bg-white pb-16'>
            <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 pt-6 md:pt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>Placement Policy</h1>
            <div className='ml-5 grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='hidden lg:block'>
                <Image
                  src={pp}
                  className='mr-12 pt-20 mt-10'
                />
              </div>
              <div>
                <div className='pl-2 md:pl-6 xl:pl-8 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12 2xl:mr-16'>
                  <div className='ml-6'>
                    {
                                            placementPolicy === null
                                              ? <div>
                                                Loading...
                                                </div>
                                              : Object.keys(placementPolicy).length === 0
                                                ? <div>
                                                  No Placement Policy Found
                                                  </div>
                                                : <>
                                                  <div className='mb-3 w-full md:w-1/2'>
                                                    <TextField
                                                      label='Number of tiers'
                                                      placeholder='03'
                                                      type='text'
                                                      value={noOfTiers}
                                                      onChangeHandler={(e) => setNoOfTiers(e.target.value)}
                                                    />
                                                  </div>
                                                  <div className='mb-3'>
                                                    <TextField
                                                      label='Maximum Number of offers a student can receive'
                                                      placeholder='03'
                                                      type='text'
                                                      value={maxOffers}
                                                      onChangeHandler={(e) => setMaxOffers(e.target.value)}
                                                    />
                                                  </div>
                                                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                                    <TextField
                                                      label='Minimum CTC of tier 1'
                                                      placeholder='75,0000.00'
                                                      type='text'
                                                      value={minCTCForT1}
                                                      onChangeHandler={(e) => setMinCTCForT1(e.target.value)}
                                                    />
                                                    <TextField
                                                      label='Maximum CTC of tier 1'
                                                      placeholder='85,0000.00'
                                                      type='text'
                                                      value={maxCTCForT1}
                                                      onChangeHandler={(e) => setMaxCTCForT1(e.target.value)}
                                                    />
                                                    <TextField
                                                      label='Minimum CTC of tier 2'
                                                      placeholder='75,0000.00'
                                                      type='text'
                                                      value={minCTCForT2}
                                                      onChangeHandler={(e) => setMinCTCForT2(e.target.value)}
                                                    />
                                                    <TextField
                                                      label='Maximum CTC of tier 2'
                                                      placeholder='85,0000.00'
                                                      type='text'
                                                      value={maxCTCForT2}
                                                      onChangeHandler={(e) => setMaxCTCForT2(e.target.value)}
                                                    />
                                                    <TextField
                                                      label='Minimum CTC of tier 3'
                                                      placeholder='75,0000.00'
                                                      type='text'
                                                      value={minCTCForT3}
                                                      onChangeHandler={(e) => setMinCTCForT3(e.target.value)}
                                                    />
                                                    <TextField
                                                      label='Maximum CTC of tier 3'
                                                      placeholder='85,0000.00'
                                                      type='text'
                                                      value={maxCTCForT3}
                                                      onChangeHandler={(e) => setMaxCTCForT3(e.target.value)}
                                                    />
                                                  </div>
                                                </>
                                        }
                    <div class='mt-6 mb-6'>
                      <Button
                        btnText={update}
                        disabled={isDisabled}
                        onClickHandler={updatePlacementPolicyHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

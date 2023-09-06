import Sidebar from '@/components/SideBar'
import TextField from '@/components/InputComponents/TextField'
import Button from '@/components/Buttons'
import DocHeader from '@/components/DocHeader'

import Image from 'next/image'
import { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import pp from '@/public/pp1.png'

import { getPlacementPolicy } from '@/redux/Slices/placementPolicy'
import { routes } from '@/constants/routes'
import { updatePlacementPolicy } from '@/redux/Sagas/requests/features'
import { openNotification, notificationTypes } from '@/utils/notifications'

import AddTierModal from '@/components/Modal/AddTierModal'

export default function EditPlacementPolicy() {
  const dispatch = useDispatch()
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [noOfTiers, setNoOfTiers] = useState('')
  const [maxOffers, setMaxOffers] = useState('')
  const [placementPolicyList, setPlacementTierList] = useState([])
  const [update, setUpdate] = useState('Update')
  const [isDisabled, setIsDisabled] = useState(false)
  const [showTierModal, setShowTierModal] = useState(false)

  const placementPolicy = useSelector((state) => state.placementPolicy)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (parseInt(user.accType) > 1) {
        router.push(routes.NOTFOUND)
      } else {
        dispatch(getPlacementPolicy())
      }
    }
  }, [user, dispatch])

  useEffect(() => {
    if (placementPolicy !== null) {
      if (Object.keys(placementPolicy.placementPolicyData) !== 0 && placementPolicy.placementPolicyList.length !== 0) {
        setNoOfTiers(placementPolicy.placementPolicyData.noOfTiers)
        setMaxOffers(placementPolicy.placementPolicyData.maxOffers)
        const formattedPlacementPolicyList = placementPolicy.placementPolicyList.map(item => ({
          ...item,
          minCTC: parseFloat(item.minCTC),
          maxCTC: parseFloat(item.maxCTC)
        }))

        setPlacementTierList(formattedPlacementPolicyList)
      }
    }
  }, [placementPolicy])

  const handleDeleteTier = (index) => {
    const updatedList = [...placementPolicyList]

    updatedList.splice(index, 1)

    setPlacementTierList(updatedList)
  }

  const handleCTCChange = (index, field, value) => {
    const updatedList = [...placementPolicyList]
    updatedList[index] = {
      ...updatedList[index],
      [field]: parseFloat(value)
    }
    setPlacementTierList(updatedList)
  }

  const updatePlacementPolicyHandler = () => {
    const data = {
      noOfTiers,
      maxOffers,
      placementPolicyList
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
                <div className='pl-2 md:pl-6 xl:pl-8 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12'>
                  <div >
                    {
                      placementPolicy === null
                        ? <div>
                          <Spin size='large' />
                        </div>
                        : Object.keys(placementPolicy).length === 0
                          ? <div>
                            No Placement Policy Found
                          </div>
                          : <>
                            <div className='mb-3 w-full'>
                              <TextField
                                label='Number of tiers'
                                placeholder='03'
                                type='text'
                                value={noOfTiers}
                                onChangeHandler={(e) => setNoOfTiers(e.target.value)}
                                disabled={user === null ? true : user.accType === "0" ? false : true}
                              />
                            </div>
                            <div className='mb-3'>
                              <TextField
                                label='Maximum Number of offers a student can receive'
                                placeholder='03'
                                type='text'
                                value={maxOffers}
                                onChangeHandler={(e) => setMaxOffers(e.target.value)}
                                disabled={user === null ? true : user.accType === "0" ? false : true}
                              />
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-10 gap-4 mb-6'>
                              {
                                placementPolicyList === null
                                  ? (
                                    <div>Loading...</div>
                                  )
                                  : placementPolicyList.length === 0
                                    ? (
                                      <div>No Tier List found</div>
                                    )
                                    : (
                                      placementPolicyList.map((item, index) => (
                                        <Fragment key={index}>
                                          <div className='col-span-4'>
                                            <TextField
                                              label={`Minimum CTC of ${item.name} (in Rs.)`}
                                              placeholder='75,0000.00'
                                              type='text'
                                              value={item.minCTC}
                                              onChangeHandler={(e) =>
                                                handleCTCChange(index, 'minCTC', e.target.value)}
                                              disabled={user === null ? true : user.accType === "0" ? false : true}
                                            />
                                          </div>
                                          <div className='col-span-4'>
                                            <TextField
                                              label={`Maximum CTC of ${item.name} (in Rs.)`}
                                              placeholder='85,0000.00'
                                              type='text'
                                              value={item.maxCTC}
                                              onChangeHandler={(e) =>
                                                handleCTCChange(index, 'maxCTC', e.target.value)}
                                              disabled={user === null ? true : user.accType === "0" ? false : true}
                                            />
                                          </div>
                                          {
                                            user === null
                                              ?
                                              <div></div>
                                              :
                                              user.accType === "0"
                                                ?
                                                <div className='flex justify-end col-span-2'>
                                                  <button
                                                    className='my-auto whitespace-nowrap bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm'
                                                    onClick={() => handleDeleteTier(index)}
                                                  >
                                                    Clear Tier
                                                  </button>
                                                </div>
                                                :
                                                <div></div>
                                          }
                                        </Fragment>
                                      ))
                                    )
                              }
                            </div>

                          </>
                    }
                    {
                      user === null
                        ?
                        <div></div>
                        :
                        user.accType === "0"
                          ?
                          <>
                            <button
                              className='flex ml-auto h-10 text-center bg-green-500 hover:bg-green-700 text-white font-bold rounded text-sm py-2 px-6'
                              onClick={() => setShowTierModal(true)}
                            >
                              Add Tier
                            </button>
                            <div class='mt-6 mb-6'>
                              <Button
                                btnText={update}
                                disabled={isDisabled}
                                onClickHandler={updatePlacementPolicyHandler}
                              />
                            </div>
                          </>
                          :
                          <div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AddTierModal
        showModal={showTierModal}
        setShowModal={setShowTierModal}
        setPlacementTierList={setPlacementTierList}
      />
    </div>
  )
}

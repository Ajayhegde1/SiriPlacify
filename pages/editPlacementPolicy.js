import Sidebar from '@/components/SideBar'
import TextField from '@/components/InputComponents/TextField'
import Button from '@/components/Buttons'
import DocHeader from '@/components/DocHeader'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import pp from '@/public/pp1.png'

import { useDispatch, useSelector } from 'react-redux'
import { getPlacementPolicy } from '@/redux/Slices/placementPolicy'

export default function EditPlacementPolicy () {
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const placementPolicy = useSelector((state) => state.placementPolicy)

  useEffect(() => {
    dispatch(getPlacementPolicy())
  }, [dispatch])

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
                                                      value={placementPolicy.noOfTiers}
                                                      disabled
                                                    />
                                                  </div>
                                                  <div className='mb-3'>
                                                    <TextField
                                                      label='Maximum Number of offers a student can receive'
                                                      placeholder='03'
                                                      type='text'
                                                      value={placementPolicy.maxOffers}
                                                      disabled
                                                    />
                                                  </div>
                                                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                                    <TextField
                                                      label='Minimum CTC of tier 1'
                                                      placeholder='75,0000.00'
                                                      type='text'
                                                      value={placementPolicy.minCTCForT1}
                                                      disabled
                                                    />
                                                    <TextField
                                                      label='Maximum CTC of tier 1'
                                                      placeholder='85,0000.00'
                                                      type='text'
                                                      value={placementPolicy.maxCTCForT1}
                                                      disabled
                                                    />
                                                    <TextField
                                                      label='Minimum CTC of tier 2'
                                                      placeholder='75,0000.00'
                                                      type='text'
                                                      value={placementPolicy.minCTCForT2}
                                                      disabled
                                                    />
                                                    <TextField
                                                      label='Maximum CTC of tier 2'
                                                      placeholder='85,0000.00'
                                                      type='text'
                                                      value={placementPolicy.maxCTCForT2}
                                                      disabled
                                                    />
                                                    <TextField
                                                      label='Minimum CTC of tier 3'
                                                      placeholder='75,0000.00'
                                                      type='text'
                                                      value={placementPolicy.maxCTCForT3}
                                                      disabled
                                                    />
                                                    <TextField
                                                      label='Maximum CTC of tier 3'
                                                      placeholder='85,0000.00'
                                                      type='text'
                                                      value={placementPolicy.maxCTCForT3}
                                                      disabled
                                                    />
                                                  </div>
                                                </>
                                        }
                    <div class='mt-6 mb-6'>
                      <Button
                        btnText='Done'
                        disabled
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

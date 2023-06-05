import photo from '../public/photoupload.png'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import TextArea from '@/components/InputComponents/TextArea'
import Button from '@/components/Buttons'
import { routes } from '@/constants/routes'

import { getProfile } from '@/redux/Slices/profile'

export default function EditProfile () {
  const dispatch = useDispatch()
  const router = useRouter()

  const profile = useSelector((state) => state.profile)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '0') {
        router.push(routes.NOTFOUND)
      } else {
        dispatch(getProfile())
      }
    }
  }, [user, dispatch])

  return (
    <div>
      <DocHeader
        DocTitle='Edit Profile'
      />
      <div className='mx-8 md:mx-20 mt-16'>
        <p
          className='ml-3 md:ml-6 mb-12 font-SubHeading text-base font-normal'
        >
          <span className='text-gray-500'>
            <a href='/jobs'>
              Dashboard
            </a>
          </span> {'>'} Edit profile
        </p>
        <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>Edit profile</h1>
        {
          profile === null
            ? <div>
              loading...
            </div>
            : Object.keys(profile).length === 0
              ? <div>
                No data provided
              </div>
              : <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8'>
                <div>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 content-center'>
                    <div className='pb-4 pl-2 md:pl-5 m-auto'>
                      <Image src={photo} alt='students' />
                      <div className='mt-6'>
                        <Button
                          btnText='Upload'
                        />
                      </div>
                    </div>
                    <div className='col-span-1 md:col-span-2 ml-0 md:ml-6'>
                      <TextField
                        label='Name of universities / colleges'
                        placeholder='Pes university'
                        type='text'
                        value={profile.collegeName}
                        disabled
                      />
                      <TextField
                        label='Account user name'
                        placeholder='TPO name'
                        type='text'
                        value={user !== null && Object.keys(user).length > 0 ? user.username : ''}
                        disabled
                      />
                      <TextField
                        label='Website'
                        placeholder='pes.edu'
                        type='text'
                        value={profile.collegeWebsite}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8'>
                    <div className='col-span-1 md:col-span-3'>
                      <TextField
                        label='Email id'
                        placeholder='xyz.@gmail.com'
                        type='text'
                        value={user !== null && Object.keys(user).length > 0 ? user.email : ''}
                        disabled
                      />
                    </div>
                    <div className='col-span-1 md:col-span-2'>
                      <TextField
                        label='Contact'
                        placeholder='9090909090'
                        type='text'
                        value={profile.contactNo}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className='mr-0 md:mr-4'>
                  <TextField
                    label='location'
                    placeholder='100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Bengaluru, Karnataka 560085'
                    type='text'
                    value={profile.collegeLocation}
                    disabled
                  />
                  <TextArea
                    label='About the universities / colleges'
                    placeholder='PES University, located in Bangalore, India is one of the country’s leading teaching and research universities.
                            The University is committed to providing “navigation for the real world” that inspires students to find their
                            true north.
                            Our students graduate with the ability to adapt to an intellectually and technologically changing
                            environment. Over the years, we have accomplished this with the participative efforts of the management,
                            staff, students and parents.'
                    rows='8'
                    value={profile.collegeDescription}
                    disabled
                  />
                  <div class='mb-6'>
                    <Button
                      btnText='Next'
                      disabled
                    />
                  </div>
                </div>
              </div>
        }
      </div>
    </div>
  )
}

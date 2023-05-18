import photo from '../public/photoupload.png'

import Image from 'next/image'

import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import TextArea from '@/components/InputComponents/TextArea'
import Button from '@/components/Buttons'

export default function EditProfile () {
  return (
    <div>
      <DocHeader
        DocTitle='Edit Profile'
      />
      <div className='mx-8 md:mx-20 mt-16'>
        <p
          className='ml-3 md:ml-6 mb-12 font-SubHeading text-base font-normal'
        >
          <span className='text-gray-500'>Dashboard</span> {'>'} Edit profile
        </p>
        <h1 className='text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black'>Edit profile</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8'>
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
                />
                <TextField
                  label='Account user name'
                  placeholder='TPO name'
                  type='text'
                />
                <TextField
                  label='Website'
                  placeholder='pes.edu'
                  type='text'
                />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8'>
              <div className='col-span-1 md:col-span-3'>
                <TextField
                  label='Email id'
                  placeholder='xyz.@gmail.com'
                  type='text'
                />
              </div>
              <div className='col-span-1 md:col-span-2'>
                <TextField
                  label='Contact'
                  placeholder='9090909090'
                  type='text'
                />
              </div>
            </div>
          </div>
          <div className='mr-0 md:mr-4'>
            <TextField
              label='location'
              placeholder='100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Bengaluru, Karnataka 560085'
              type='text'
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
            />
            <div class='mb-6'>
              <Button
                btnText='Next'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

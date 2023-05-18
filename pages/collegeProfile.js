import student from '../public/students.png'
import photo from '../public/photoupload.png'

import Image from 'next/image'

import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import TextArea from '@/components/InputComponents/TextArea'
import Button from '@/components/Buttons'

export default function CollegeProfile () {
  return (
    <div>
      <DocHeader
        DocTitle='College Profile'
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 xl:gap-6 2xl:gap-12 content-center'>
        <div className='mt-4 py-4 md:py-12 pl-2 md:pl-6 xl:pl-8 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12 2xl:mr-16'>
          <h1 className='text-center md:text-left mb-10 ml-3 md:ml-6 mt-12 text-3xl md:text-4xl font-Heading font-medium text-black'>Complete your profile</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 content-center'>
            <div className='col-span-1 md:col-span-2 order-last md:order-first ml-6'>
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
            <div className='pl-5 m-auto'>
              <Image src={photo} alt='students' />
              <div className='mt-6'>
                <Button
                  btnText='Upload'
                />
              </div>
            </div>
          </div>
          <div className='ml-6'>
            <TextField
              label='location'
              placeholder='100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Bengaluru, Karnataka 560085'
              type='text'
            />
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
            <TextArea
              label='About the universities / colleges'
              placeholder='Your message...'
              rows='4'
            />
            <div class='mb-6'>
              <Button
                btnText='Next'
              />
            </div>
          </div>
        </div>
        <div className='hidden lg:block'>
          <Image className='h-full w-full' src={student} alt='students' />
        </div>
      </div>
    </div>
  )
}

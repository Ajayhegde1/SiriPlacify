import photo from '../public/policy.png'

import Image from 'next/image'

import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import Button from '@/components/Buttons'

export default function placementPolicy () {
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
              />
            </div>
            <div className='mb-3'>
              <TextField
                label='Maximum Number of offers a student can receive'
                placeholder='03'
                type='text'
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <TextField
                label='Minimum CTC of tier 1'
                placeholder='75,0000.00'
                type='text'
              />
              <TextField
                label='Maximum CTC of tier 1'
                placeholder='85,0000.00'
                type='text'
              />
              <TextField
                label='Minimum CTC of tier 2'
                placeholder='75,0000.00'
                type='text'
              />
              <TextField
                label='Maximum CTC of tier 2'
                placeholder='85,0000.00'
                type='text'
              />
              <TextField
                label='Minimum CTC of tier 3'
                placeholder='75,0000.00'
                type='text'
              />
              <TextField
                label='Maximum CTC of tier 3'
                placeholder='85,0000.00'
                type='text'
              />
            </div>
            <div class='mt-6 mb-6'>
              <Button
                btnText='Done'
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

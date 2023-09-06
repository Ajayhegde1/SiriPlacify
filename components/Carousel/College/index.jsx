import photo2 from '../../../public/greenTick.png'

import Image from 'next/image'

export default function College () {
  return (
    <div className='mx-10 md:mx-16 lg:mx-24 xl:mx-28 2xl:mx-36'>
      <h1 className='font-bold underline underline-offset-4 text-lg mb-6 md:text-xl lg:text-2xl'>University</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-16 mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Zero errors and minimized costs</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Automating the process from end-to-end ensures accuracy, eliminating errors, while reducing costs associated with manual handling</p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-16 mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Effortless authentication of student details</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Eliminate manual effort of authenticating student information and ensure reliable and accurate data by allowing the students to apply to only those jobs they are eligible to</p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-16 mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Ease student application tracking</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Easily review and track the status of each student application to the various corporates</p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-16 mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Expert Sessions</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Sessions by experts from various domains to provide a comprehensive understanding of campus placements, career advice and industry insights </p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-16 mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Placement Statistics & Insights</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Real-time placement statistics generated dynamically, offering valuable insights to the universities on personalized dashboard</p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-16 mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Inclusion of placement policy</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Placement policy of the institution is incorporated to ensure fairness, transparency and equal opportunities for all students</p>
        </div>
      </div>
    </div>
  )
}

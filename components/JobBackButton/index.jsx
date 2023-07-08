import Link from 'next/link'
import Image from 'next/image'

import arrow from '../../public/arrow.png'

export default function JobBackButton ({
  companyName,
  jobPositionType,
  jobSector,
  jobTitle
}) {
  return (
    <>
      <Link href='/jobs'>
        <Image
          src={arrow}
          alt='arrow-left'
          className='my-auto h-12 w-12'
        />
      </Link>
      <div className='ml-2 md:ml-6'>
        <p
          className='font-SubHeading text-base text-gray-400 font-bold'
        >
          {jobSector}
        </p>
        <h1 className='mt-1 text-lg md:text-xl font-Heading font-bold text-black'>
          {jobTitle}
        </h1>
        <p
          className='pt-1 font-SubHeading text-base text-gray-400 font-bold'
        >
          {companyName} • {jobPositionType}
        </p>
      </div>
    </>
  )
}

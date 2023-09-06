import photo2 from '../../../public/greenTick.png'

import Image from 'next/image'

export default function Student () {
  return (
    <div className='mx-10 md:mx-16 lg:mx-24 xl:mx-28 2xl:mx-36'>
      <h1 className='font-bold underline underline-offset-4 text-lg mb-6 md:text-xl lg:text-2xl'>Student</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-12 object-cover mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Personalized dashboards</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Personalized dashboards to view all the job offers at the university but apply to only those you are eligible for</p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-12 object-cover mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Track your applications</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Apply to the various companies with a single click. Keep track of all the applications hassle-free</p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-12 object-cover mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Alumni Connect</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Network with the alumni of your interest to gain insights into the strategies for successfully entering companies</p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-12 object-cover mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Expert Sessions</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Sessions by experts from various domains are hosted to help prepare better for the placements and to gain industry insights and career advice</p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-12 object-cover mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>Community Hub</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Form communities with other like-minded individuals to discuss campus placements</p>
        </div>
        <div>
          <Image
            src={photo2}
            alt='photo2'
            className='h-12 w-12 object-cover mb-4'
          />
          <h3 className='text-left text-xl font-Heading font-bold text-green-800 mb-4'>AI Insights</h3>
          <p className='text-left text-base font-SubHeading font-medium text-black'>Insights derived from your skill-set and company requirements to suggest the best-fitting job for you</p>
        </div>
      </div>
    </div>
  )
}

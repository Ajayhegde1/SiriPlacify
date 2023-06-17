import Image from 'next/image'
import landingPage from '../../public/photo1.png'

export default function OpeningSection() {
    return(
        <div className='openingSection'>
          <div className="ml-5 mr-6 md:mr-16 pt-12 grid grid-cols-1 pb-16 lg:grid-cols-3 2xl:grid-cols-2 gap-6 2xl:gap-16" >
            <div className='col-span-1 lg:col-span-2 2xl:col-span-1 my-auto ml-4 md:ml-12 mr-8'>
              <h1 className="mt-2 mb-6 text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-Heading font-medium text-green-800">Campus Placements Redefined</h1>
              <p className='text-base lg:text-lg 2xl:text-xl font-SubHeading font-light text-gray-900 mb-4'>
              An intelligent and automated campus placements management platform
              to connect corporates, universities and students 
              </p>
              <button>
                <a href='#' className="rounded text-lg font-bold bg-green-800 px-4 py-2 text-white">Get Started</a>
              </button>
            </div>
            <div className='hidden lg:block mx-auto mt-12'>
            <Image
              src={landingPage}
              alt='landingPage'
            />
            </div>
          </div>
        </div>
    )
}
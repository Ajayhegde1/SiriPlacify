import Image from 'next/image'
import photo1 from '../../public/chintu.png'
export default function ContactSection () {
  return (
    <div className='mt-6 md:mt-20 mb-6'>
      <div className='mt-20 mx-6 md:mx-12 lg:mx-20 grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='hidden lg:block pl-6'>
          <Image
            src={photo1}
            alt='photo1'
            className='lg:mt-28 xl:mt-36 2xl:mt-44'
          />
        </div>
        <div>
          <h1 className='text-center mt-8 lg:mt-16 xl:mt-24 mb-6 text-2xl lg:text-3xl 2xl:text-5xl font-Heading font-semibolg drop-shadow underline text-green-800'>Contact Us</h1>
          <div className='mx-auto flex flex-col gap-3'>
            <div>
            <label
              className='block font-medium mb-2 text-base font-SubHeading font-medium text-black'
              >Name
            </label>
            <input
              type='text'
              placeholder='Name'
              className='w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4'
              />
              </div>
              <div>

              
            <label
              className='block font-medium mb-2 text-base font-SubHeading font-medium text-black'
            >Designation:
            </label>
            <input
              type='text'
              placeholder='Designation'
              className='w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4'
            />
              </div>
            
              <div>

            <label
              className='block font-medium mb-2 text-base font-SubHeading font-medium text-black'
            >E-mail:
            </label>
            <input
              type='text'
              placeholder='Email'
              className='w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4'
            />
            </div>
            <div>

            <label
              className='block font-medium mb-2 text-base font-SubHeading font-medium text-black'
            >Phone No:
            </label>
            <input
              type='text'
              placeholder='Phone'
              className='w-full h-12 rounded-md border-2 focus:outline-green-800 mb-2 px-4'
            />
            </div>
            <div>

            <label
              className='block font-medium mb-2 text-base font-SubHeading font-medium text-black'
            >Role :
            </label>
            <div className='flex flex-row gap-2'>
              <span className='px-4 py-2 border-2 border-gray-200 px-6 text-sm py-2 rounded-full font-semibold hover:bg-green-800 hover:text-white hover:border-green-800 hover:scale-[105%] transition ease-in-out cursor-pointer ' >College</span>
              <span className='px-4 py-2 border-2 border-gray-200 px-6 text-sm py-2 rounded-full font-semibold hover:bg-green-800 hover:text-white hover:border-green-800 hover:scale-[105%] transition ease-in-out cursor-pointer ' >Company</span>
            </div>
              </div>
          </div>
            <button className=' my-4 w-full text-center hover:shadow-lg   bg-green-800 text-white font-SubHeading font-medium text-base px-4 py-2 rounded-md'>
              Submit
            </button>
        </div>
      </div>
    </div>
  )
}

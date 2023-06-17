import logo from '../../public/logo.png'

import Image from 'next/image'
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons'

export default function FooterSection () {
  return (
    <footer class='footer'>
      <div class='container mx-auto flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-0 items-center justify-between py-4 px-6'>
        <div class='flex items-center'>
          <Image src={logo} alt='logo' />
        </div>
        <div className='flex items-center mb-4 sm:mb-0'>
          <a href='#' className='text-black mr-4 lg:mr-8'>
            <FacebookOutlined style={{ fontSize: '24px' }} />
          </a>
          <a href='#' className='text-black mr-4 lg:mr-8'>
            <TwitterOutlined style={{ fontSize: '24px' }} />
          </a>
          <a href='#' className='text-black'>
            <InstagramOutlined style={{ fontSize: '24px' }} />
          </a>
        </div>
        <div class='font-Heading font-bold flex items-center'>
          <span class='mr-4'>rakshitha_r@placify.io</span>
          <span>+91 9113662127</span>
        </div>
      </div>
    </footer>
  )
}

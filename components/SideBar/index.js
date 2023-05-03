import Link from 'next/link'
import Image from 'next/image'

import logo from "../../public/logo.png"
import grid from "../../public/view-grid.png"

const Sidebar = () => {
    return (
        <div class="s-layout__sidebar">
            <a class="s-sidebar__trigger" href="#0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                </svg>
            </a>
            <nav class="s-sidebar__nav">
                <ul>
                    <li>
                        <a class="s-sidebar__nav-link" href="#0">
                            <Image
                                className='mx-auto mt-5'
                                src={logo}
                            />
                        </a>
                    </li>
                    <li className='mt-10'>
                        <a class="s-sidebar__nav-link" href="#0">
                            <em>
                                <div className='flex'>
                                    <Image
                                        className='mr-4'
                                        src={grid}
                                    />
                                    Dashboard
                                </div>
                            </em>
                        </a>
                    </li>
                    <li>
                        <a class="s-sidebar__nav-link" href="#0">
                            <i class="fa fa-user"></i><em>My Profile</em>
                        </a>
                    </li>
                    <li>
                        <a class="s-sidebar__nav-link" href="#0">
                            <i class="fa fa-camera"></i><em>Camera</em>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar

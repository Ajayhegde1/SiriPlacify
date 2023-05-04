import Image from 'next/image'

import logo from "../../public/logo.png"
import grid from "../../public/view-grid.png"
import jobs from "../../public/jobs.png"
import message from "../../public/message.png"
import pp from "../../public/pp.png"
import error from "../../public/error.png"

const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    activePage
}) => {
    function handleSideBar() {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className='relative'>
            <nav class={`navbar ${sidebarOpen ? 'active' : ''}`}>
                <div class="navbar-container">
                    <div class="navbar-logo-div">
                        <a class="navbar-logo-link" href="#">
                            <Image
                                src={logo}
                                alt="Logo"
                            />
                        </a>
                        <button onClick={() => handleSideBar()} class="navbar-toggler">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <ul class="menu-list">
                        <li class="menu-item">
                            <a class="menu-link" href="#">
                                <Image
                                    src={grid}
                                />
                                <span class="menu-link-text">Dashboard</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="#">
                                <Image
                                    src={jobs}
                                />
                                <span class="menu-link-text">Jobs</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="#">
                                <Image
                                    src={message}
                                />
                                <span class="menu-link-text">Message</span>
                            </a>
                        </li>
                        <li class={`menu-item ${activePage == 4 ? 'current' : ''}`}>
                            <a class="menu-link" href="#">
                                <Image
                                    src={pp}
                                    className={sidebarOpen ? 'ml-3' : 'ml-1'}
                                />
                                <span class="menu-link-text">Placement Policy</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="#">
                                <Image
                                    src={error}
                                />
                                <span class="menu-link-text">Error Correction</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar

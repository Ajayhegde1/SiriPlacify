import Image from 'next/image'
import { useDispatch } from 'react-redux'

import logo from '../../public/logo.png'
import { useSelector } from 'react-redux'
import jobs from '../../public/jobs.png'
import Addjobs from '../../public/addJobsIcons.png'
import pp from '../../public/pp.png'
import editProfile from '../../public/editProfile.png'
import logout from '../../public/logout.png'
import myApplications from '../../public/application.png'
import userImage from '../../public/user.png'

// import message from '../../public/message.png'
// import error from '../../public/error.png'

import { signOut } from '@/redux/Slices/userSlice'

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activePage
}) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  function handleSideBar() {
    setSidebarOpen(!sidebarOpen)
  }

  function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <div className='relative'>
      <nav className={`navbar ${sidebarOpen ? 'active' : ''}`}>
        <div className='navbar-container'>
          <div className='navbar-logo-div'>
            <a className='navbar-logo-link' href='#'>
              <Image
                src={logo}
                alt='Logo'
              />
            </a>
            <button onClick={() => handleSideBar()} className='navbar-toggler'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            </button>
          </div>
          {
            user === null
              ?
              <></>
              :
              user.accType === '0'
                ?
                <ul className='menu-list'>
                  <li className={`menu-item ${activePage == 2 ? 'current' : ''}`}>
                    <a className='menu-link' href='/jobs'>
                      <Image
                        src={jobs}
                        className={sidebarOpen ? 'ml-3' : 'ml-0'}
                        alt='logo for jobs'
                      />
                      <span className='menu-link-text'>Jobs</span>
                    </a>
                  </li>
                  <li className={`menu-item ${activePage == 6 ? 'current' : ''}`}>
                    <a className='menu-link' href='/addJob'>
                      <Image
                        src={Addjobs}
                        className={sidebarOpen ? 'ml-3' : 'ml-0'}
                        alt='logo for jobs'
                      />
                      <span className='menu-link-text'>Add Jobs</span>
                    </a>
                  </li>
                  <li className={`menu-item ${activePage == 9 ? 'current' : ''}`}>
                    <a className='menu-link' href='/userManagement'>
                      <Image
                        src={userImage}
                        className={sidebarOpen ? 'ml-3' : 'ml-1'}
                        alt='logo for placement policy'
                      />
                      <span className='menu-link-text'>User Management</span>
                    </a>
                  </li>
                  <li className={`menu-item ${activePage == 4 ? 'current' : ''}`}>
                    <a className='menu-link' href='/editPlacementPolicy'>
                      <Image
                        src={pp}
                        className={sidebarOpen ? 'ml-3' : 'ml-1'}
                        alt='logo for placement policy'
                      />
                      <span className='menu-link-text'>Placement Policy</span>
                    </a>
                  </li>
                  <li className={`menu-item ${activePage == 7 ? 'current' : ''}`}>
                    <a className='menu-link' href='/editProfile'>
                      <Image
                        src={editProfile}
                        className={sidebarOpen ? 'ml-3' : 'ml-1'}
                        alt='logo for placement policy'
                      />
                      <span className='menu-link-text'>Edit Profile</span>
                    </a>
                  </li>
                  <li
                    className={`menu-item ${activePage == 8 ? 'current' : ''}`}
                    onClick={() => handleSignOut()}
                  >
                    <a className='menu-link'>
                      <Image
                        src={logout}
                        className={sidebarOpen ? 'ml-3' : 'ml-1'}
                        alt='logo for placement policy'
                      />
                      <span className='menu-link-text'>Logout</span>
                    </a>
                  </li>
                </ul>
                :
                <ul className='menu-list'>
                  <li className={`menu-item ${activePage == 2 ? 'current' : ''}`}>
                    <a className='menu-link' href='/jobs'>
                      <Image
                        src={jobs}
                        className={sidebarOpen ? 'ml-3' : 'ml-0'}
                        alt='logo for jobs'
                      />
                      <span className='menu-link-text'>Jobs</span>
                    </a>
                  </li>
                  <li className={`menu-item ${activePage == 6 ? 'current' : ''}`}>
                    <a className='menu-link' href='/myApplications'>
                      <Image
                        src={myApplications}
                        className={sidebarOpen ? 'ml-3' : 'ml-1'}
                        alt='logo for placement policy'
                      />
                      <span className='menu-link-text'>My Applications</span>
                    </a>
                  </li>
                  <li className={`menu-item ${activePage == 7 ? 'current' : ''}`}>
                    <a className='menu-link' href='/editStudentProfile'>
                      <Image
                        src={editProfile}
                        className={sidebarOpen ? 'ml-3' : 'ml-1'}
                        alt='logo for placement policy'
                      />
                      <span className='menu-link-text'>Edit Profile</span>
                    </a>
                  </li>
                  <li
                    className={`menu-item ${activePage == 8 ? 'current' : ''}`}
                    onClick={() => handleSignOut()}
                  >
                    <a className='menu-link'>
                      <Image
                        src={logout}
                        className={sidebarOpen ? 'ml-3' : 'ml-1'}
                        alt='logo for placement policy'
                      />
                      <span className='menu-link-text'>Logout</span>
                    </a>
                  </li>
                </ul>
          }
          {/*             <li className='menu-item'>
              <a className='menu-link' href='#'>
                <Image
                  src={error}
                  alt='logo for error'
                />
                <span className='menu-link-text'>Error Correction</span>
              </a>
            </li> */}
          {/*             <li className='menu-item'>
              <a className='menu-link' href='#'>
                <Image
                  src={message}
                  alt='logo for messages'
                />
                <span className='menu-link-text'>Message</span>
              </a>
            </li> */}
        </div>
      </nav >
    </div >
  )
}

export default Sidebar

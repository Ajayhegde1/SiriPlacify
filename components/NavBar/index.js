import { useRef, useState } from 'react'
import styles from '../../styles/navbar.module.css'
import Image from 'next/image'

// Constants
import { signedOutNavLinks } from '@/constants/navbar'
import logo from '../../public/logo.png'

// Components
import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai'

const Navbar = () => {
  // objects
  const navContainerREF = useRef(null)

  // states
  const [showMenu, setShowMenu] = useState(false)

  const handleToggleMenu = () => {
    if (showMenu) {
      navContainerREF.current.style.right = '-100vw'
    } else {
      navContainerREF.current.style.right = '0'
    }

    setShowMenu(!showMenu)
  }

  return (
    <div className={styles.navbar}>
      <header className={styles.container}>
        <div className={styles.name}>
          <Image className={styles.logo} src={logo} alt='logo' />
        </div>
        <div className={styles.menuIcon}>
          <AiOutlineMenu onClick={handleToggleMenu} />
        </div>
        <nav ref={navContainerREF} className={styles.nav}>
          <div className={styles.closeIconCtnr}>
            <AiFillCloseCircle onClick={handleToggleMenu} />
          </div>
          <div className={styles.navEleContainer}>
              {signedOutNavLinks.map((link, index) => (
                <a
                  onClick={handleToggleMenu}
                  className={styles.navLink}
                  key={index}
                  href={`${link.route}`}
                >
                  {link.name}
                </a>
              ))}
            <a href='/sign-in' className={styles.btn1}>Sign In</a>
            <a className={styles.btn}>Book a Demo</a>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
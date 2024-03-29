import { useState, useEffect } from 'react'
import DocHeader from '../components/DocHeader'

const Custom404 = () => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <DocHeader DocTitle='404 - Page Not Found' />
      {showContent
        ? (
          <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
            <p className='text-lg mt-4'>The page you are looking for does not exist.</p>
          </div>
          )
        : null}
    </div>
  )
}

export default Custom404

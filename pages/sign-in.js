import student from '../public/students.png'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import Button from '@/components/Buttons'

import { signIn } from '@/redux/Slices/userSlice'
import { useRouter } from 'next/router'

export default function CollegeProfile () {
  const dispatch = useDispatch()
  const router = useRouter()

  const user = useSelector((state) => state.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [btnText, setBtnText] = useState('Sign In')

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setIsBtnDisabled(false)
    } else {
      setIsBtnDisabled(true)
    }
  }, [email, password])

  useEffect(() => {
    if (user) {
      router.push('/jobs')
    }
  }, [user])

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(signIn({ email, password }))
  }

  return (
    <div>
      <DocHeader
        DocTitle='Sign In'
      />
      <div className='ml-5 lg:ml-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 xl:gap-6 2xl:gap-12'>
        <div className='hidden lg:block min-h-screen'>
          <Image className='h-full w-full' src={student} alt='students' />
        </div>
        <div className='mt-4 py-4 md:py-12 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12 2xl:mr-16'>
          <h1 className='text-center md:text-left mb-10 mt-12 text-3xl md:text-4xl font-Heading font-medium text-black'>Login</h1>
          <form onSubmit={handleLogin}>
          <TextField
            label='Email ID'
            placeholder='sample@gmail.com'
            type='text'
            value={email}
            onChangeHandler={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label='Password'
            placeholder='********'
            type='password'
            value={password}
            onChangeHandler={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <Button
              type='submit'
              onClickHandler={handleLogin}
              disabled={isBtnDisabled}
              btnText={btnText}
            />
          </div>
        </form>
          <div className='border-2 border-gray-300 shadow-lg rounded-lg mt-6 p-8'>
            <p className='font-bold text-center md:text-left text-sm md:text-base font-Body text-black'>
              New to Placify?
            </p>
            <div className='mt-5 text-center bg-customLightBlue p-5 rounded-lg'>
              <p className='text-blue-400 text-blue font-bold font-heading'>Register for demo </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

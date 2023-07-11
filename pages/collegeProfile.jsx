import student from '../public/students.png'
import photo from '../public/photoupload.png'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import DocHeader from '@/components/DocHeader'
import TextField from '@/components/InputComponents/TextField'
import TextArea from '@/components/InputComponents/TextArea'
import Button from '@/components/Buttons'
import { openNotification, notificationTypes } from '@/utils/notifications'

import { addProfile } from '@/redux/Slices/profile'
import { routes } from '@/constants/routes'
import { getDepartment } from '@/redux/Sagas/requests/features'

export default function CollegeProfile() {
  const dispatch = useDispatch()
  const router = useRouter()
  const animatedComponents = makeAnimated()

  const user = useSelector((state) => state.user)

  const [btnText, setBtnText] = useState('Save')
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [username, setUsername] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  const [emailID, setEmailID] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [noOfGradStudents, setNoOfGradStudents] = useState(0)
  const [departmentList, setDepartmentList] = useState([])
  const [collegeDescription, setCollegeDescription] = useState('')
  const [stream, setStream] = useState([])

  const handleProfile = () => {
    const Data = {
      name: collegeName,
      username: user.username,
      website,
      location,
      emailID: user.email,
      contactNo,
      collegeDescription,
      stream,
      noOfGradStudents
    }
    setBtnText('Saving...')
    dispatch(addProfile(Data))
  }

  function handleSelect(data) {
    setStream(data)
  }

  useEffect(() => {
    getDepartment()
      .then((res) => {
        if (res.data.status === 200) {
          let departments = res.data.data
          departments = departments.map((department) => {
            return {
              value: department.id,
              label: department.depName
            }
          })
          setDepartmentList(departments)
        } else {
          openNotification(
            notificationTypes.ERROR,
            'Error',
            res.data.message
          )
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          'Error',
          err.message
        )
      })
  }, [])

  useEffect(() => {
    if (collegeName.length > 0 && website.length > 0 && location.length > 0 && contactNo.length > 0 && collegeDescription.length > 0) {
      setIsBtnDisabled(false)
    }
  }, [username, collegeName, website, location, emailID, contactNo, collegeDescription])

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND)
    } else if (user !== null) {
      if (user.accType !== '0') {
        router.push(routes.NOTFOUND)
      } else {
        if (user.signUpStatus === '1') {
          router.push(routes.PLACEMENTPROFILE)
        } else if (user.signUpStatus === '2') {
          router.push(routes.TPODASHBOARD)
        }
      }
    }
  }, [user])

  return (
    <div>
      <DocHeader
        DocTitle='College Profile'
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 xl:gap-6 2xl:gap-12 content-center'>
        <div className='mt-4 py-4 md:py-12 pl-2 md:pl-6 xl:pl-8 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12 2xl:mr-16'>
          <h1 className='text-center md:text-left mb-10 ml-3 md:ml-6 mt-12 text-3xl md:text-4xl font-Heading font-medium text-black'>Complete your profile</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 content-center'>
            <div className='col-span-1 md:col-span-2 order-last md:order-first ml-6'>
              <TextField
                label='Name of universities / colleges'
                placeholder='Pes university'
                type='text'
                value={collegeName}
                onChangeHandler={(e) => setCollegeName(e.target.value)}
              />
              <TextField
                label='Account user name'
                placeholder='TPO name'
                type='text'
                value={user === null ? '' : user.username}
                disabled
              />
              <TextField
                label='Website'
                placeholder='pes.edu'
                type='text'
                value={website}
                onChangeHandler={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className='pl-5 m-auto'>
              <Image src={photo} alt='students' />
              <div className='mt-6'>
                <Button
                  btnText='Upload'
                />
              </div>
            </div>
          </div>
          <div className='ml-6'>
            <TextField
              label='location'
              placeholder='100 Feet Ring Road, Banashankari Stage III, Dwaraka Nagar, Bengaluru, Karnataka 560085'
              type='text'
              value={location}
              onChangeHandler={(e) => setLocation(e.target.value)}
            />
            <div className='grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8'>
              <div className='col-span-1 md:col-span-3'>
                <TextField
                  label='Email id'
                  placeholder='xyz.@gmail.com'
                  type='text'
                  value={user === null ? '' : user.email}
                  disabled
                />
              </div>
              <div className='col-span-1 md:col-span-2'>
                <TextField
                  label='Contact'
                  placeholder='9090909090'
                  type='text'
                  value={contactNo}
                  onChangeHandler={(e) => setContactNo(e.target.value)}
                />
              </div>
            </div>
            <TextField
              label='No of Students graduating'
              placeholder='40'
              type='text'
              value={noOfGradStudents}
              onChangeHandler={(e) => setNoOfGradStudents(e.target.value)}
            />
            <div className='mt-3 mb-6'>
              <Select
                options={departmentList}
                placeholder='Select Streams'
                value={stream}
                onChange={handleSelect}
                isSearchable
                components={animatedComponents}
                closeMenuOnSelect={false}
                isMulti
              />
            </div>
            <TextArea
              label='About the universities / colleges'
              placeholder='Your message...'
              rows='4'
              value={collegeDescription}
              onChangeHandler={(e) => setCollegeDescription(e.target.value)}
            />
            <div class='mb-6'>
              <Button
                btnText={btnText}
                onClickHandler={handleProfile}
                disabled={isBtnDisabled}
              />
            </div>
          </div>
        </div>
        <div className='hidden lg:block'>
          <Image className='h-full w-full' src={student} alt='students' />
        </div>
      </div>
    </div>
  )
}

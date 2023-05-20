import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useDispatch,useSelector } from 'react-redux';

import TextField from "@/components/InputComponents/TextField";
import TextArea from "@/components/InputComponents/TextArea";
import DocHeader from '@/components/DocHeader'
import Button from '@/components/Buttons'

import student from '../public/students.png'
import photo from '../public/photoupload.png'

import { addStudentProfile } from '@/redux/Slices/studentSlice';

export default function studentProfile() {
    const dispatch = useDispatch();

    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [btnText, setBtnText] = useState("Add Profile");
    const [username, setUsername] = useState("");
    const [emailID, setEmail] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [studentTenthMarks, setStudentTenthMarks] = useState("");
    const [studentTwelthMarks, setStudentTwelthMarks] = useState("");
    const [studentGraduationMarks, setStudentGraduationMarks] = useState("");
    const [studentID, setStudentID] = useState("");
    const [userDescription, setUserDescription] = useState("");

    useEffect(() => {
        if (username.length > 0 && emailID.length > 0 && contactNo.length > 0 && studentID.length > 0) {
            setIsBtnDisabled(false);
        }
    }, [username, emailID, contactNo, studentID])

    const handleStudentProfile = () => {
        const data = {
            username: username,
            emailID: emailID,
            contactNo: contactNo,
            studentID: studentID,
            studentTenthMarks: studentTenthMarks,
            studentTwelthMarks: studentTwelthMarks,
            studentUGMarks: studentGraduationMarks,
            userDescription: userDescription
        }
        dispatch(addStudentProfile(data))
        setBtnText("Adding Profile...");
        setIsBtnDisabled(true);
    }

    return (
        <div>
            <DocHeader
                DocTitle='Student Profile'
            />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 xl:gap-6 2xl:gap-12 content-center'>
                <div className='mt-4 py-4 md:py-12 pl-2 md:pl-6 xl:pl-8 ml-0 md:ml-4 xl:ml-6 mr-8 md:mr-10 xl:mr-12 2xl:mr-16'>
                    <h1 className='text-center md:text-left mb-10 ml-3 md:ml-6 mt-12 text-3xl md:text-4xl font-Heading font-medium text-black'>Complete your profile</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 content-center'>
                        <div className='col-span-1 md:col-span-2 order-last md:order-first ml-6'>
                            <TextField
                                label='Name'
                                placeholder='ABC XYZ'
                                type='text'
                                value={username}
                                onChangeHandler={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label='Email'
                                placeholder='sample@gmail.com'
                                type='text'
                                value={emailID}
                                onChangeHandler={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label='Contact No'
                                placeholder='9123123123'
                                type='text'
                                value={contactNo}
                                onChangeHandler={(e) => setContactNo(e.target.value)}
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
                        <div className='grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4'>
                            <div className='col-span-1'>
                                <TextField
                                    label='Class X%'
                                    placeholder='93%'
                                    type='text'
                                    value={studentTenthMarks}
                                    onChangeHandler={(e) => setStudentTenthMarks(e.target.value)}
                                />
                            </div>
                            <div className='col-span-1'>
                                <TextField
                                    label='Class XII%'
                                    placeholder='93%'
                                    type='93%'
                                    value={studentTwelthMarks}
                                    onChangeHandler={(e) => setStudentTwelthMarks(e.target.value)}
                                />
                            </div>
                            <div className='col-span-1'>
                                <TextField
                                    label='CGPA'
                                    placeholder='93%'
                                    type='text'
                                    value={studentGraduationMarks}
                                    onChangeHandler={(e) => setStudentGraduationMarks(e.target.value)}
                                />
                            </div>
                            <div className='col-span-1 lg:col-span-2'>
                                <TextField
                                    label='Student ID'
                                    placeholder='ABCUG123'
                                    type='text'
                                    value={studentID}
                                    onChangeHandler={(e) => setStudentID(e.target.value)}
                                />
                            </div>
                        </div>
                        <TextArea
                            label='Describe yourself in 2 lines'
                            placeholder='Your message...'
                            rows='4'
                            value={userDescription}
                            onChangeHandler={(e) => setUserDescription(e.target.value)}
                        />
                        <div class='mb-6'>
                            <Button
                                btnText={btnText}
                                onClickHandler={handleStudentProfile}
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
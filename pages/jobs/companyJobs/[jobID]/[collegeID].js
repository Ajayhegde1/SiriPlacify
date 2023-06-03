import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Link from 'next/link'

import Sidebar from '@/components/SideBar'
import DocHeader from '@/components/DocHeader'
import StatusOfHire from '@/components/StatusOfHire'
import Candidates from '@/components/Candidates'

import { getCandidates } from '@/redux/Sagas/requests/features'

import arrow from '@/public/arrow.png'

export default function College() {
    const router = useRouter()

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [candidates, setCandidates] = useState([])
    const [filteredStudentList, setFilteredStudentList] = useState([])
    const [collegeName, setCollegeName] = useState('')
    const [status, setStatus] = useState(1)

    const { jobID, collegeID } = router.query

    useEffect(() => {
        if (typeof jobID !== 'undefined' && typeof collegeID !== 'undefined') {
            getCandidates(jobID, collegeID)
                .then((res) => {
                    setCollegeName(res.data.collegeName)
                    setCandidates(res.data.data)
                    setFilteredStudentList(res.data.data.filter((student) => student.studentStatus === '0'))
                })
                .catch((err) => {
                    openNotification(
                        notificationTypes.ERROR,
                        'Error'
                    )
                })
        }
    }, [jobID,collegeName,candidates])

    const setApplied = () => {
        setStatus(1)
        const filtered = candidates.filter((student) => student.studentStatus === '0')
        setFilteredStudentList(filtered)
    }

    const setShortlisted = () => {
        setStatus(2)
        const filtered = candidates.filter((student) => student.studentStatus === '1')
        setFilteredStudentList(filtered)
    }

    const setTest = () => {
        setStatus(3)
        const filtered = candidates.filter((student) => student.studentStatus === '2')
        setFilteredStudentList(filtered)
    }

    const setInterview = () => {
        setStatus(4)
        const filtered = candidates.filter((student) => student.studentStatus === '3')
        setFilteredStudentList(filtered)
    }

    const setHired = () => {
        setStatus(5)
        const filtered = candidates.filter((student) => student.studentStatus === '4')
        setFilteredStudentList(filtered)
    }

    return (
        <div className='bg-gray-200 min-h-screen'>
            <DocHeader
                DocTitle='Jobs'
            />
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activePage={2}
            />
            <main class={`dashboard ${sidebarOpen ? 'active' : ''}`}>
                <div className='pt-14 ml-0 md:ml-6 flex flex-col md:flex-row'>
                    <Link href={`/jobs/companyJobs/${jobID}`}>
                        <Image
                            src={arrow}
                            alt='arrow-left'
                            className='my-auto h-12 w-12'
                        />
                    </Link>
                    {
                        collegeName === null
                            ?
                            <>
                            </>
                            :
                            collegeName === ''
                                ?
                                <div>
                                    undefined colleges
                                </div>
                                :
                                <h1 className='ml-2 mt-2 text-lg md:text-2xl font-Heading font-bold text-black'>
                                    {collegeName}
                                </h1>
                    }
                </div>
                <div className='mt-10 ml-3 md:ml-6 bg-white mb-10 mr-10 rounded-xl p-6'>
                    {
                        candidates === null || typeof candidates === 'undefined'
                            ? <div />
                            : candidates.length === 0
                                ? <>
                                </>
                                : <StatusOfHire
                                    students={candidates}
                                    status={status}
                                    setStatus={setStatus}
                                    setApplied={setApplied}
                                    setShortlisted={setShortlisted}
                                    setTest={setTest}
                                    setInterview={setInterview}
                                    setHired={setHired}
                                />
                    }
                    {
                        candidates === null || typeof candidates === 'undefined'
                            ? <div>
                                Loading...
                            </div>
                            : candidates.length === 0
                                ? <div className='mt-6 mb-3 ml-6 font-medium'>
                                    No students have applied yet
                                </div>
                                : <Candidates
                                    students={filteredStudentList}
                                />
                    }
                    </div>
            </main>
        </div>
    )
}
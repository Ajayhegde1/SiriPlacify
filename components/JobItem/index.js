import Image from "next/image";
import Link from 'next/link';

import JobStatus from "../JobStatus";

export default function JobItem({
    job,
    isCurrentJobs = false,
    jobSection=1
}) {
    let jobID = job.uid

    return (
        <>
            <Link href={jobSection === 1 ? `/jobs/currentJobs/${jobID}` : jobSection === 2 ? "/jobs/jobOffers/1" : '#' }>
                <div className="bg-white rounded-xl p-3 md:p-5">
                    <p className="mt-5">
                        <span className="bg-black py-1 px-4 text-white rounded-2xl font-bold">
                            {job.jobSector}
                        </span>
                    </p>
                    <h1 className='overflow-hidden truncate mt-5 text-xl font-Heading font-bold text-black'>
                        {job.jobTitle}
                    </h1>
                    <p className="my-2 text-sm text-medium font-Heading">
                        {job.jobLocation}
                    </p>
                    <p className="overflow-hidden truncate mt-6 mb-4 text-gray-500 text-medium text-base">
                        {job.jobDescription}
                    </p>
                    {
                        isCurrentJobs ?
                            <JobStatus
                                jobStatus="Candidates Applied"
                            />
                            :
                            <></>
                    }
                </div>
            </Link>
        </>
    )
} 
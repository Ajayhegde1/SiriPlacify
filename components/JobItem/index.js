import Image from "next/image";

export default function JobItem({
    job,
    isCurrentJobs = false,
}) {
    return (
        <div className="bg-white rounded-xl p-3 md:p-5">
            <Image
                src={job.companyLogo}
                alt="company name"
                width={50}
                height={50}
            />
            <p className="mt-5">
                <span className="bg-black py-1 px-4 text-white rounded-2xl font-bold">
                    {job.jobType}
                </span>
            </p>
            <h1 className='mt-5 text-xl font-Heading font-bold text-black'>
                {job.jobTitle}
            </h1>
            <p className="my-2 text-sm text-medium font-Heading">
                {job.jobLocation}
            </p>
            <p className="overflow-hidden truncate mt-6 mb-4 text-gray-500 text-medium text-base">
                {job.jobDesc}
            </p>
            {
                isCurrentJobs ?
                    <div className="mt-2">
                        <span className="bg-black py-1 px-2 md:px-4 text-white rounded-2xl font-bold">{job.status}</span>
                    </div>
                    :
                    <></>
            }
        </div>
    )
} 
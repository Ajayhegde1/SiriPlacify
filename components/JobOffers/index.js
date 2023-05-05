import Image from "next/image";

import JobOffersList from "@/testingFiles/JobOffers";

export default function JobOffers() {
    return (
        <div className="mt-10 mr-2 md:mr-6">
            <div className="pb-10 ml-2 md:ml-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {
                    JobOffersList.map((job, index) =>
                        <div key={index} className="bg-white rounded-xl p-3 md:p-5">
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
                        </div>
                    )
                }
            </div>
        </div>
    )
}
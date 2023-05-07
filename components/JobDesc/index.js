export default function JobDesc({
    companyName,
    companyDesc,
    jobTitle,
    jobLocation,
    jobPosition,
    jobSector,
    jobCTC,
    jobDesc,
    jobBond,
    jobCriteria,
    jobSection
}) {
    return (
        <div>
            {
                jobSection === 2 &&
                <div>
                    <h1 className='mt-3 pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
                        About {companyName}
                    </h1>
                    <p className='mt-6 mb-4 text-gray-500 text-medium text-lg mr-8 md:mr-32'>
                        {companyDesc}
                    </p>
                </div>
            }
            <div className={jobSection === 2 ? "mt-20" : "mt-2"}>
                {
                    jobSection === 1
                        ?
                        <h1 className='pb-4 border-b-2 border-gray-300 text-3xl font-bold font-Heading font-bold text-black'>
                            {jobTitle}
                        </h1>
                        :
                        <h1 className='pb-4 border-b-2 border-gray-300 text-lg font-bold font-Heading font-bold text-black'>
                            Job details
                        </h1>
                }
                <div class="mt-4 mr-4 md:mr-20">
                    <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                        <div className='text-gray-700 font-bold font-Heading col-span-1'>Title</div>
                        <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{jobTitle}</div>
                    </div>
                    <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                        <div className='text-gray-700 font-bold font-Heading col-span-1'>Location</div>
                        <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{jobLocation}</div>
                    </div>
                    <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                        <div className='text-gray-700 font-bold font-Heading col-span-1'>Position type</div>
                        <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{jobPosition}</div>
                    </div>
                    <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                        <div className='text-gray-700 font-bold font-Heading col-span-1'>Sector</div>
                        <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{jobSector}</div>
                    </div>
                    <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                        <div className='text-gray-700 font-bold font-Heading col-span-1'>CTC Breakdown</div>
                        <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{jobCTC}</div>
                    </div>
                    <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                        <div className='text-gray-700 font-bold font-Heading col-span-1'>Job description</div>
                        <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{jobDesc}</div>
                    </div>
                    <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                        <div className='text-gray-700 font-bold font-Heading col-span-1'>Bond / Service agreement details if any</div>
                        <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{jobBond}</div>
                    </div>
                    <div class="py-6 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-8 border-b-2 border-gray-200">
                        <div className='text-gray-700 font-bold font-Heading col-span-1'>Criteria</div>
                        <div className='text-gray-500 font-Heading col-span-1 lg:col-span-5'>{jobCriteria}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
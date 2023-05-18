import JobItem from "../JobItem";

export default function CurrentJobs({
    jobs
}) {
    return (
        <>
        {
            jobs === null
            ?
            <div>
                <h1 className="text-center text-2xl font-Heading font-bold text-black">Loading...</h1>
            </div>
            :
            jobs.length === 0
            ?
            <div>
                <h1 className="text-center text-2xl font-Heading font-bold text-black">No Jobs Found</h1>
            </div>
            :
            <div className="mt-10 mr-2 md:mr-6">
                <div className="pb-10 ml-2 md:ml-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {
                        jobs.map((job, index) =>
                            <JobItem
                                job={job}
                                key={index}
                                isCurrentJobs={true}
                                jobSection={1}
                            />
                        )
                    }
                </div>
            </div>
        }
        </>
    )
}
import JobItem from "../JobItem";
import currentJobsConstants from "@/testingFiles/currentJobs";

export default function CurrentJobs() {
    return (
        <div className="mt-10 mr-2 md:mr-6">
            <div className="pb-10 ml-2 md:ml-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {
                    currentJobsConstants.map((job, index) =>
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
    )
}
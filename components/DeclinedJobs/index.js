import declinedJobsConstants from '@/testingFiles/declinedJobs'
import JobItem from '../JobItem'

export default function DeclinedJobs () {
  return (
    <div className='mt-10 mr-2 md:mr-6'>
      <div className='pb-10 ml-2 md:ml-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
        {
                    declinedJobsConstants.map((job, index) =>
                      <JobItem
                        job={job}
                        key={index}
                        jobSection={3}
                      />
                    )
                }
      </div>
    </div>
  )
}

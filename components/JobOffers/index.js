import JobItem from '../JobItem'
export default function JobOffers ({jobs}) {
  return (
    <div className='mt-10 mr-2 md:mr-6'>
      <div className='pb-10 ml-2 md:ml-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
        {
          jobs === null
          ?
          <div>
            Loading...
          </div>
          :
          jobs.length === 0
          ?
          <div>
            No jobs to show.
          </div>
          :
          jobs.map((job, index) =>
          <JobItem
            job={job}
            key={index}
            jobSection={2}
          />
        )              
      }
      </div>
    </div>
  )
}

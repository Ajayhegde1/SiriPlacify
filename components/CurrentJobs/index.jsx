import JobItem from '../JobItem'
import { Spin } from 'antd'

export default function CurrentJobs ({
  jobs
}) {
  return (
    <div className='mt-10 mr-2 md:mr-6'>
      <div className='pb-10 ml-2 md:ml-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {
          jobs === null
            ? <div>
              <h1 className='text-center text-2xl font-Heading font-bold text-black'><Spin size='large' /></h1>
            </div>
            : jobs.length === 0
              ? <div className='pt-10 ml-2 md:ml-6 text-2xl font-Heading font-bold text-gray-500'>
                No current jobs
              </div>
              : jobs.map((job, index) =>
                <JobItem
                  job={job}
                  key={index}
                  isCurrentJobs
                  jobSection={1}
                />
              )
        }
      </div>
    </div>
  )
}
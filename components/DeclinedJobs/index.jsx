import JobItem from '../JobItem'
import { Spin } from 'antd'

export default function DeclinedJobs ({ jobs, jobSection }) {
  return (
    <div className='mt-10 mr-2 md:mr-6'>
      <div className='pb-10 ml-2 md:ml-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
        {
                    jobs === null
                      ? <Spin size='large' />
                      : jobs.length === 0
                        ? <div className='text-2xl font-Heading font-bold text-gray-500'>
                          No declined jobs
                          </div>
                        : jobs.map((job, index) =>
                          <JobItem
                            job={job}
                            key={index}
                            jobSection={jobSection}
                          />
                        )
                }
      </div>
    </div>
  )
}

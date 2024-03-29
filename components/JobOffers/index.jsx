import JobItem from '../JobItem'
import { Spin } from 'antd'

export default function JobOffers ({ jobs }) {
  return (
    <div className='mt-10 mr-2 md:mr-6'>
      <div className='pb-10 ml-2 md:ml-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
        {
          jobs === null
            ? <div>
              <Spin size='large' />
              </div>
            : jobs.length === 0
              ? <div className='text-2xl font-Heading font-bold text-gray-500'>
                No offered jobs
                </div>
              : jobs.map((job, index) =>
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

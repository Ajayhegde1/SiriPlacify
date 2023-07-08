export default function StudentJobSection ({ jobSection, setJobSection, jobs, closedJobs }) {
  const setCurrentJobsSection = () => {
    setJobSection(1)
  }

  const setClosedJobsSection = () => {
    setJobSection(2)
  }

  return (
    <div className='ml-2 md:ml-6 flex flex-col md:flex-row gap-4 md:gap-16 border-b-2 border-gray-300'>
      <div
        onClick={setCurrentJobsSection}
        className={jobSection === 1 ? 'cursor-pointer pb-1 border-b-4 border-green-900' : 'cursor-pointer hover:border-b-4 hover:border-green-900 ease-in duration-300'}
      >
        <p>
          <span className='pb-1 text-lg font-Heading font-semibold text-black pr-1'>
            Current  Job
          </span>
          {
                        jobs === null
                          ? <></>
                          : jobs.length === 0
                            ? <span className='ml-2 p-1 bg-gray-300 rounded-2xl text-green-500 font-medium'>
                              00
                            </span>
                            : <span className='ml-2 py-1 px-2 bg-gray-300 rounded-2xl text-green-500 font-medium'>
                              {jobs.length}
                              </span>
                    }
        </p>
      </div>
      <div
        onClick={setClosedJobsSection}
        className={jobSection === 2 ? 'cursor-pointer pb-1 border-b-4 border-green-900' : 'cursor-pointer hover:border-b-4 hover:border-green-900 ease-in duration-300'}
      >
        <span className='pb-1 text-lg font-Heading font-semibold text-black pr-1'>Closed jobs</span>
        {
                    closedJobs === null
                      ? <>
                        </>
                      : closedJobs.length === 0
                        ? <span className='ml-2 p-1 bg-gray-300 rounded-2xl text-green-500 font-medium'>
                          00
                        </span>
                        : <span className='ml-2 py-1 px-2 bg-gray-300 rounded-2xl text-green-500 font-medium'>
                          {closedJobs.length}
                          </span>
                }
      </div>
    </div>
  )
}

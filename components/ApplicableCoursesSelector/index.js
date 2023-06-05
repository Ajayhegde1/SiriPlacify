export default function ApplicableCourses ({
  jobSection,
  setJobSection
}) {
  const setJobOffersSection = () => {
    setJobSection(2)
  }

  const setDeclinedJobsSection = () => {
    setJobSection(3)
  }

  const setCurrentJobsSection = () => {
    setJobSection(1)
  }

  const setDegree = () => {
    setJobSection(4)
  }

  return (
    <div className='ml-2 md:ml-6 flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 border-b-2 border-gray-300'>
      <div
        onClick={setCurrentJobsSection}
        className={jobSection === 1 ? 'pb-1 border-b-4 border-green-900' : ''}
      >
        <p>
          <span className='pb-1 text-lg font-Heading font-semibold text-black pr-1'>
            B DEC
          </span>
          <span className='ml-2 p-1 bg-gray-300 rounded-2xl text-green-500 font-medium'>
            09
          </span>
        </p>
      </div>
      <div
        onClick={setJobOffersSection}
        className={jobSection === 2 ? 'pb-1 border-b-4 border-green-900' : ''}
      >
        <span className='text-lg font-Heading font-semibold text-black pr-2'>B.TECH</span>
        <span className='p-1 bg-gray-300 rounded-2xl text-green-500 font-medium'>12</span>
      </div>
      <div
        className={jobSection === 3 ? 'pb-1 border-b-4 border-green-900' : ''}
        onClick={setDeclinedJobsSection}
      >
        <span className='text-lg font-Heading font-semibold text-black pr-2'>M.TECH</span>
        <span className='p-1 bg-gray-300 rounded-2xl text-green-500 font-medium'>10</span>
      </div>
      <div
        className={jobSection === 4 ? 'pb-1 border-b-4 border-green-900' : ''}
        onClick={setDegree}
      >
        <span className='text-lg font-Heading font-semibold text-black pr-2'>DEGREE</span>
        <span className='p-1 bg-gray-300 rounded-2xl text-green-500 font-medium'>3</span>
      </div>
    </div>
  )
}

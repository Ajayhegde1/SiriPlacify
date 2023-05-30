export default function StatusOfHire ({
  students,
  status,
  setStatus,
  setApplied,
  setShortlisted,
  setTest,
  setInterview,
  setHired
}) {
  return (
    <div className='overflow-x-auto'>
      <div className='mt-4 ml-2 md:ml-6 flex flex-col lg:flex-row gap-4 lg:gap-16 border-b-2 border-gray-300'>
        <div
          onClick={setApplied}
          className={status === 1 ? 'pb-1 border-b-4 border-green-900' : ''}
        >
          <p>
            <span className='text-lg font-Heading font-semibold text-black pr-3'>
              Applied
            </span>
            <span className='px-2 py-1 bg-gray-100 rounded-2xl text-amber-500 font-bold'>
              {students.filter((student) => student.studentStatus === '0').length}
            </span>
          </p>
        </div>
        <div
          onClick={setShortlisted}
          className={status === 2 ? 'pb-1 border-b-4 border-green-900' : ''}
        >
          <span className='text-lg font-Heading font-semibold text-black pr-3'>Shortlisted</span>
          <span className='px-2 py-1 bg-gray-100 rounded-2xl text-blue-400 font-bold'>
            {students.filter((student) => student.studentStatus === '1').length}
          </span>
        </div>
        <div
          className={status === 3 ? 'pb-1 border-b-4 border-green-900' : ''}
          onClick={setTest}
        >
          <span className='text-lg font-Heading font-semibold text-black pr-3'>Test</span>
          <span className='px-2 py-1 bg-gray-100 rounded-2xl text-blue-600 font-bold'>
            {students.filter((student) => student.studentStatus === '2').length}
          </span>
        </div>
        <div
          className={status === 4 ? 'pb-1 border-b-4 border-green-900' : ''}
          onClick={setInterview}
        >
          <span className='text-lg font-Heading font-semibold text-black pr-3'>Interview</span>
          <span className='px-2 py-1 bg-gray-100 rounded-2xl text-red-400 font-bold'>
            {students.filter((student) => student.studentStatus === '3').length}
          </span>
        </div>
        <div
          className={status === 5 ? 'pb-1 border-b-4 border-green-900' : ''}
          onClick={setHired}
        >
          <span className='text-lg font-Heading font-semibold text-black pr-3'>Hired</span>
          <span className='px-2 py-1 bg-gray-100 rounded-2xl text-green-800 font-medium'>
            {students.filter((student) => student.studentStatus === '4').length}
          </span>
        </div>
      </div>
    </div>
  )
}

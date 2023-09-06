export default function JobStatus ({
  jobStatus
}) {
  return (
    <div className='mt-2'>
      <span className='bg-green-800 py-2 text-sm px-2 md:px-6 text-white rounded font-semibold'>{jobStatus}</span>
    </div>
  )
}

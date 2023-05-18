export default function JobStatus ({
  jobStatus
}) {
  return (
    <div className='mt-2'>
      <span className='bg-black py-1 px-2 md:px-4 text-white rounded-2xl font-bold'>{jobStatus}</span>
    </div>
  )
}

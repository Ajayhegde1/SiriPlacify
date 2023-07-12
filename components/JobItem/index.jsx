import { useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import JobStatus from '../JobStatus';

export default function JobItem({ job, isCurrentJobs = false, jobSection = 1 }) {
  const jobID = job.uid;
  const user = useSelector((state) => state.user);

  const renderJobDetails = () => {
    const { jobSector, companyName, jobTitle, jobLocation, jobDescription } = job;
    const formattedDueDate = moment(job.dueDate).format('DD MMM YYYY');

    switch (user.accType) {
      case '0':
        return (
          <Link href={jobSection === 1 ? `/jobs/currentJobs/${jobID}` : jobSection === 2 ? `/jobs/jobOffers/${jobID}` : jobSection === 3 ? `/jobs/declinedJobs/${jobID}` :  `/jobs/closedJobs/${jobID}`}>
            <div className='h-[380px] bg-white rounded-xl p-3 md:px-5 md:py-3 flex flex-col gap-4'>
              <h1 className='text-right text-base text-black font-medium'>{formattedDueDate}</h1>
              <div className='flex flex-col gap-4'>
                <div>
                  <h1 className='text-2xl font-bold text-black mb-1 md:mb-6'>{job.tierName}</h1>
                  <span className='bg-blue-500 py-1 px-4 text-white rounded-2xl font-bold text-sm mb-4'>{jobSector}</span>
                  <h1 className='mt-2 text-xl font-bold text-green-900 mb-2'>{companyName}</h1>
                  <h1 className='text-2xl font-bold text-black mb-2'>{jobTitle}</h1>
                  <p className='text-sm text-medium text-gray-500 mb-2'>{jobLocation}</p>
                  <p className='text-base text-gray-500 overflow-hidden overflow-ellipsis line-clamp-2'>{jobDescription}</p>
                </div>
                <div className='mt-auto'>
                  {isCurrentJobs && <JobStatus jobStatus='Candidates Applied' />}
                </div>
              </div>
            </div>
          </Link>
        );

      case '1':
        return (
          <Link href={jobSection === 1 ? `/jobs/studentJobs/${jobID}` : jobSection === 2 ? '/jobs/jobOffers/1' : `/jobs/closedJobs/${jobID}`}>
            <div className='h-[380px] bg-white rounded-xl p-3 md:px-5 md:py-3 flex flex-col gap-4'>
              <h1 className='text-right text-base text-black font-medium'>{formattedDueDate}</h1>
              <div className='flex flex-col gap-4'>
                <div>
                  <h1 className='text-2xl font-bold text-black mb-1 md:mb-6'>{job.tierName}</h1>
                  <span className='bg-blue-500 py-1 px-4 text-white rounded-2xl font-bold text-sm mb-4'>{jobSector}</span>
                  <h1 className='mt-2 text-xl font-bold text-green-900 mb-2'>{companyName}</h1>
                  <h1 className='text-2xl font-bold text-black mb-2'>{jobTitle}</h1>
                  <p className='text-sm text-medium text-gray-500 mb-2'>{jobLocation}</p>
                  <p className='text-base text-gray-500 overflow-hidden overflow-ellipsis line-clamp-2'>{jobDescription}</p>
                </div>
                <div className='mt-auto'>
                  {isCurrentJobs && <JobStatus jobStatus='Candidates Applied' />}
                </div>
              </div>
            </div>
          </Link>
        );

      case '2':
        return (
          <Link href={jobSection === 1 ? `/jobs/companyJobs/${jobID}` : `/jobs/closedJobs/${jobID}`}>
            <div className='h-[300px] 2xl:h-[280px] bg-white rounded-xl p-3 md:px-5 md:py-3 flex flex-col gap-4'>
              <h1 className='text-right text-base text-black font-medium'>{formattedDueDate}</h1>
              <div className='flex flex-col gap-4'>
                <div>
                  <span className='bg-yellow-500 py-1 px-4 text-white rounded-2xl font-bold text-sm mb-2'>{jobSector}</span>
                  <h1 className='text-xl font-bold text-black mt-6 mb-2'>{jobTitle}</h1>
                  <p className='text-sm text-medium text-gray-500 mb-2'>{jobLocation}</p>
                  <p className='text-base text-gray-500 overflow-hidden overflow-ellipsis line-clamp-2'>{jobDescription}</p>
                </div>
                <div className='mt-auto'>
                  {isCurrentJobs && <JobStatus jobStatus='Candidates Applied' />}
                </div>
              </div>
            </div>
          </Link>
        );

      default:
        return (
          <div>
            <h1>Not Authorized</h1>
          </div>
        );
    }
  };

  return <>{user === null ? null : renderJobDetails()}</>;
}

import Image from 'next/image';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notificationTypes, openNotification } from '@/utils/notifications';
import { GET, POST } from '@/config/api';
import JobApplicationModal from '@/components/Modal/jobApplicationModal';
import WithdrawApplicationModal from '../Modal/WithdrawApplicationModal';
import { reopenJobs } from '@/redux/Sagas/requests/features';

export default function BasicJobInfo({
  uid,
  logo,
  jobTitle,
  jobLocation,
  jobCategory,
  dueDate,
  jobID,
  isClosedTPO = false,
  isDeclinedJob = false,
  isClosedStudent = false
}) {
  const date = new Date(dueDate);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [message, setMessage] = useState('');
  const [isHired, setIsHired] = useState(false);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user && parseInt(user.accType) === 1) {
      GET(`/checkJobApplication?jobID=${jobID}`, { sessionID: user.sessionId })
        .then((res) => {
          if (res.data.status === 200) {
            setIsApplied(res.data.jobStatus);
            setIsHired(res.data.isHired);
            setMessage(res.data.message);
          } else if (res.data.status >= 423 && res.data.status <= 426) {
            openNotification(notificationTypes.ERROR, 'Error', res.data.message);
          } else if (res.data.status === 500) {
            openNotification(notificationTypes.ERROR, 'Error', 'Error in retrieving Data');
          } else {
            openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
          }
        })
        .catch(() => {
          openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
        });
    }
  }, [user, jobID]);

  const handleAcceptOffer = () => {
    const data = { jobID: uid };
    POST('/acceptJob?status=accept', data, { sessionID: user.sessionId })
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(notificationTypes.SUCCESS, 'Success', 'Job offer accepted successfully');
          router.push('/jobs');
        } else if (res.data.status === 401) {
          openNotification(notificationTypes.ERROR, 'Error', 'Session ID is invalid or not present');
        } else if (res.data.status >= 423 && res.data.status <= 426) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message);
        } else if (res.data.status === 500) {
          openNotification(notificationTypes.ERROR, 'Error', 'Unable to approve job');
        } else {
          openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
        }
      })
      .catch(() => {
        openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
      });
  };

  const handleDeclineOffer = () => {
    const data = { jobID: uid };
    POST('/acceptJob?status=decline', data, { sessionID: user.sessionId })
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(notificationTypes.SUCCESS, 'Success', 'Job offer declined successfully');
          router.push('/jobs');
        } else if (res.data.status === 401) {
          openNotification(notificationTypes.ERROR, 'Error', 'Session ID is invalid or not present');
        } else if (res.data.status >= 423 && res.data.status <= 426) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message);
        } else if (res.data.status === 500) {
          openNotification(notificationTypes.ERROR, 'Error', 'Unable to decline job');
        } else {
          openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
        }
      })
      .catch(() => {
        openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
      });
  };

  const handleReOpenJob = () => {
    const data = { jobID };
    reopenJobs(data)
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(notificationTypes.SUCCESS, 'Success', 'Job offer accepted successfully');
          router.push('/jobs');
        } else if (res.data.status === 401) {
          openNotification(notificationTypes.ERROR, 'Error', 'Session ID is invalid or not present');
        } else if (res.data.status >= 423 && res.data.status <= 426) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message);
        } else if (res.data.status === 500) {
          openNotification(notificationTypes.ERROR, 'Error', 'Unable to approve job');
        } else {
          openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
        }
      })
      .catch(() => {
        openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
      });
  };

  const handleReAcceptJob = () => {
    const data = { jobID };
    POST('/acceptJob?status=accept', data, { sessionID: user.sessionId })
      .then((res) => {
        if (res.data.status === 200) {
          openNotification(notificationTypes.SUCCESS, 'Success', 'Job offer accepted successfully');
          router.push('/jobs');
        } else if (res.data.status === 401) {
          openNotification(notificationTypes.ERROR, 'Error', 'Session ID is invalid or not present');
        } else if (res.data.status >= 423 && res.data.status <= 426) {
          openNotification(notificationTypes.ERROR, 'Error', res.data.message);
        } else if (res.data.status === 500) {
          openNotification(notificationTypes.ERROR, 'Error', 'Unable to approve job');
        } else {
          openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
        }
      })
      .catch(() => {
        openNotification(notificationTypes.ERROR, 'Error', 'Something went wrong, please try again later');
      });
  };

  const renderStudentActions = () => {
    if (!isClosedStudent) {
      if (isApplied) {
        if (message === 'Job application status checked successfully' && new Date().getTime() < date.getTime() && !isHired) {
          return (
            <>
              <div />
              <div
                onClick={() => setShowWithdrawModal(!showModal)}
                className='mt-0 md:mt-20 ml-auto cursor-pointer rounded-lg text-base md:text-lg 2xl:text-xl bg-blue-600 text-white font-bold text-center p-2'
              >
                Withdraw
              </div>
            </>
          );
        }
        if (isApplied === true){
          return (
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='mt-10 md:mt-24 ml-auto'>
                <span className='text-red-600 text-lg font-bold'>{message}</span>
              </div>
              <div className='cursor-not-allowed mt-0 md:mt-20 rounded-lg text-base md:text-lg 2xl:text-xl bg-red-600 hover:bg-red-800 text-white font-bold text-center p-2'>
                Unable to Apply
              </div>
            </div>
          );
        }
        return (
          <div className='hidden md:block' />
        );
      }
      return (
        <div className='mt-6 lg:mt-20 grid grid-cols-2 gap-8'>
          <div />
          <div
            onClick={() => setShowModal(!showModal)}
            className='cursor-pointer rounded-lg text-base md:text-lg 2xl:text-xl bg-blue-600 text-white font-bold text-center p-2'
          >
            Apply Now
          </div>
        </div>
      );
    }
    return null;
  };

  const renderTPOActions = () => {
    if (user && user.accType === '0') {
      if (!isClosedTPO) {
        if (isDeclinedJob) {
          return (
            <div className='mt-6 lg:mt-20 flex'>
              <button
                onClick={handleReAcceptJob}
                className='ml-auto rounded-lg text-base md:text-lg 2xl:text-xl bg-red-500 text-white font-bold text-center p-2'
              >
                Re-Accept Offer
              </button>
            </div>
          );
        }
        return (
          <div className='mt-6 lg:mt-20 grid grid-cols-2 gap-8'>
            <button
              onClick={handleDeclineOffer}
              className='rounded-lg text-base md:text-lg 2xl:text-xl bg-red-500 text-white font-bold text-center p-2'
            >
              X    Decline For Now
            </button>
            <button
              onClick={handleAcceptOffer}
              className='rounded-lg text-base md:text-lg 2xl:text-xl bg-blue-600 text-white font-bold text-center p-2'
            >
              + Accept Offer
            </button>
          </div>
        );
      }
      return (
        <div className='mt-6 lg:mt-20 flex'>
          <button
            onClick={handleReOpenJob}
            className='ml-auto rounded-lg text-base md:text-lg 2xl:text-xl bg-red-500 text-white font-bold text-center p-2'
          >
            Re-Open Job
          </button>
        </div>
      );
    }
    return null;
  };

  const renderCompanyActions = () => {
    if (user && user.accType === '2') {
      if (isClosedTPO){
        return (
          <div className='mt-6 lg:mt-20 flex'>
            <button
              onClick={handleReOpenJob}
              className='ml-auto rounded-lg text-base md:text-lg 2xl:text-xl bg-red-500 text-white font-bold text-center p-2'
            >
              Re-Open Job
            </button>
          </div>
        );
      }
    }
    return null;
  }

  return (
    <div className='mt-6 ml-3 md:ml-6 mr-4 md:mr-16 bg-white p-5 rounded-lg'>
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-2'>
        <div className='col-span-1'>
          <div className='flex flex-col md:flex-row gap-2 md:gap-8'>
            <Image src={logo} alt='apple logo' />
            <div className='mt-3'>
              <h1 className='mt-3 text-2xl xl:text-3xl 2xl:text-4xl font-bold font-Heading font-bold text-black'>{jobTitle}</h1>
              <h1 className='my-2 text-sm text-medium font-Heading'>{jobLocation}</h1>
            </div>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='ml-auto w-40 p-3 bg-rose-100 rounded-2xl text-sm'>
            <p className='text-gray-700 text-center'>DUE DATE - {moment(dueDate).format('DD MMM')}</p>
          </div>
          {user && (
            <>
              {user.accType === '0' && renderTPOActions()}
              {user.accType === '1' && renderStudentActions()}
              {user.accType === '2' && renderCompanyActions()}
            </>
          )}
        </div>
      </div>
      <JobApplicationModal showModal={showModal} setShowModal={setShowModal} jobID={jobID} />
      <WithdrawApplicationModal showModal={showWithdrawModal} setShowModal={setShowWithdrawModal} jobID={jobID} />
    </div>
  );
}

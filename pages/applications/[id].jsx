import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "@/components/SideBar";
import DocHeader from "@/components/DocHeader";
import { getJobs } from "@/redux/Slices/jobSlice";
import arrow from "@/public/arrow.png";
import applied from "@/public/applied.png";
import app from "@/public/app.png";
import short from "@/public/shortlist.png";
import tester from "@/public/tester.png";
import inter from "@/public/inter.png";
import interview from "@/public/interview.png";
import shortlisted from "@/public/shortlisted.png";
import test from "@/public/test.png";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificJobApplication } from "@/redux/Sagas/requests/features";
import { openNotification, notificationTypes } from "@/utils/notifications";
import { getOfferJob } from "@/redux/Slices/offerJobsSlice";
import { getDeclinedJob } from "@/redux/Slices/declinedJobsSlice";
import { getClosedJob } from "@/redux/Slices/closedJobsSlice";
import { getClosedJobForCollege } from "@/redux/Slices/closedJobsCollegeSlice";
export default function JobStatus() {
  const dispatch = useDispatch();
  const router = useRouter();
  const jobs = useSelector((state) => state.jobs);
  console.log(jobs);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobApp, setJobApp] = useState(null);
  const { id } = router.query;

  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (typeof id !== "undefined") {
      getSpecificJobApplication(id).then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          console.log(res.data.data);
          setJobApp(res.data.data);
        } else {
          openNotification(notificationTypes.ERROR, "Error", res.data.message);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (user === null) {
      router.push(routes.NOTFOUND);
      return;
    }

    dispatch(getJobs());

    const dispatchActions = {
      0: [getOfferJob, getClosedJobForCollege, getDeclinedJob],
      1: [getClosedJobForCollege],
      2: [getClosedJob],
    };

    const actionsToDispatch = dispatchActions[user.accType];
    if (actionsToDispatch) {
      actionsToDispatch.forEach((action) => dispatch(action()));
    }
  }, [dispatch, router, user]);
  const textAreaRef = useRef(null);

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <DocHeader DocTitle="My Applications" />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={6}
      />
      <main class={`dashboard ${sidebarOpen ? "active" : ""}`}>
        <div className="pt-14 ml-0 md:ml-6 flex flex-row">
          <Link href="/myApplications">
            <Image src={arrow} alt="arrow-left" className="my-auto h-12 w-12" />
          </Link>
          {jobApp === null ? (
            <div />
          ) : Object.keys(jobApp).length === 0 ? (
            <div>No Data Found</div>
          ) : (
            <div className="ml-2 md:ml-6">
              <p className="font-SubHeading text-base text-gray-400 font-bold">
                {jobApp.jobSector}
              </p>
              <h1 className="mt-1 text-lg md:text-xl font-Heading font-bold text-black">
                {jobApp.jobTitle}
              </h1>
              <p className="pt-1 font-SubHeading text-base text-gray-400 font-bold">
                {jobApp.companyName} • {jobApp.jobPositionType}
              </p>
            </div>
          )}
        </div>
        {jobApp === null ? (
          <></>
        ) : Object.keys(jobApp).length === 0 ? (
          <></>
        ) : (
          <div className="w-9/10 lg:w-4/5 2xl:w-2/3 mt-10 ml-2 md:ml-8 lg:ml-10 mr-2 md:mr-8 lg:mr-12 xl:mr-16 2xl:mr-24">
            {jobApp.jobStatus === "0" ? (
              <Image src={applied} alt="applied" className="h-full w-full" />
            ) : jobApp.jobStatus === "2" ? (
              <Image
                src={shortlisted}
                alt="shortlisted"
                className="h-full w-full"
              />
            ) : jobApp.jobStatus === "1" ? (
              <Image src={test} alt="test" className="h-full w-full" />
            ) : jobApp.jobStatus === "3" ? (
              <Image
                src={interview}
                alt="interview"
                className="h-full w-full"
              />
            ) : (
              <Image
                src={interview}
                alt="interview"
                className="h-full w-full"
              />
            )}
          </div>
        )}
        {jobApp === null ? (
          <></>
        ) : Object.keys(jobApp).length === 0 ? (
          <></>
        ) : (
          <div className="mt-12 pb-10">
            {jobApp.jobStatus === "0" ? (
              <div className="w-9/10 lg:w-4/5 2xl:w-2/3 mt-10 ml-2 md:ml-8 lg:ml-10 mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-[20vw] w-screen">
                  <div>
                    <h1 className="text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black">
                      Successfully Applied
                    </h1>
                    <h1 className="text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-2xl md:text-3xl font-Heading font-bold text-black">
                      Kindly wait for further Instructions!
                    </h1>
                  </div>
                  <div>
                    <Image src={app} alt="applied" className="h-full w-full" />
                  </div>
                </div>
              </div>
            ) : jobApp.jobStatus === "2" ? (
              <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h1 className="text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black">
                    You have been shortlisted
                  </h1>
                  {typeof jobApp.pptData === "undefined" ||
                  jobApp.pptData === null ? (
                    <></>
                  ) : (
                    <>
                      <div className="bg-gray-100 py-8 mx-5">
                        <h1 className="text-center my-6 md:mt-16 text-2xl md:text-3xl font-Heading font-bold text-black">
                          This is the Pre Placement Talk Information
                        </h1>
                        <div className="container mx-1 md:mx-8 lg:mx-auto px-4 max-w-md md:max-w-xl">
                          <h1 className="text-xl md:text-3xl font-bold mb-4">
                            Platform: {jobApp.pptData.platform}
                          </h1>
                          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl p-3 md:p-6 mb-6">
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                              Presentation Details:
                            </h2>
                            <div className="flex flex-col space-y-2">
                              <p className="text-gray-600 text-sm">
                                Date:{" "}
                                {moment(jobApp.pptData.pptDateTime).format(
                                  "DD MMM YYYY"
                                )}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Time:{" "}
                                {moment(jobApp.pptData.pptDateTime).format(
                                  "h:mm A"
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl p-3 md:p-6 ">
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                              Meeting Link:
                            </h2>
                            <p className="text-blue-500 underline cursor-pointer break-all">
                              {jobApp.pptData.url === null
                                ? ""
                                : jobApp.pptData.url}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="hidden lg:block">
                  <Image src={short} alt="applied" className="h-full w-full" />
                </div>
              </div>
            ) : jobApp.jobStatus === "1" ? (
              <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h1 className="ml-[30px] mb-[-50px] md:mt-16 text-2xl md:text-2xl font-Heading font-bold text-black">
                    Copy paste the below Skill Test link in browser to continue
                    to the exam
                  </h1>
                  <h1 className="mt-[-20px] mx-[30px] md:mt-16 text-[10px] md:text-xl font-Heading font-bold text-black">
                    <span className="text-red-500 font-[800]">Note:</span>{" "}
                    Kindly Login / Create an Assert Account if u dont have one
                  </h1>

                  {typeof jobApp.testData === "undefined" ||
                  jobApp.testData === null ? (
                    <>
                      <div className="flex justify-center flex-col ml-[50px]">
                        <h1 className="my-6 md:mt-16 text-2xl md:text-3xl font-Heading font-bold text-black">
                          Technical Round Test Link :{" "}
                        </h1>
                        <div className="flex gap-[10px]">
                          <input
                            className="h-[40px] w-[30vw] px-[20px] rounded-[20px]"
                            ref={textAreaRef}
                            type="text"
                            value={jobApp.assertexamlink}
                            readOnly
                          ></input>
                          <button
                            className=" border-[2px] border-black bg-gray-300 px-[20px]  rounded-[20px]"
                            onClick={copyToClipboard}
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-center flex-col ml-[50px]">
                        <h1 className="my-6 md:mt-16 text-2xl md:text-3xl font-Heading font-bold text-black">
                          Logical Round Test Link :{" "}
                        </h1>
                        <div className="flex gap-[10px]">
                          <input
                            className="h-[40px] w-[30vw] px-[20px]  rounded-[20px]"
                            ref={textAreaRef}
                            type="text"
                            value='https://assertify.me/organization/4/job/29441399-8b2e-4b46-a387-2cb3cb780ae5'
                            readOnly
                          ></input>
                          <button
                            className=" border-[2px] border-black bg-gray-300 px-[20px]  rounded-[20px]"
                            onClick={copyToClipboard}
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-100 py-8 mx-5">
                        <h1 className="text-center mb-6 md:mt-10 text-2xl md:text-3xl font-Heading font-bold text-black">
                          This is the Test Information
                        </h1>
                        <div className="container mx-1 lg:mx-auto px-4 max-w-md md:max-w-xl">
                          <h1 className="text-xl md:text-3xl font-bold mb-4">
                            Platform: {jobApp.testData.platform}
                          </h1>
                          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl p-3 md:p-6 mb-6">
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                              Presentation Details:
                            </h2>
                            <div className="flex flex-col space-y-2">
                              <p className="text-gray-600 text-sm">
                                Date:{" "}
                                {moment(jobApp.testData.pptDateTime).format(
                                  "DD MMM YYYY"
                                )}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Time:{" "}
                                {moment(jobApp.testData.pptDateTime).format(
                                  "h:mm A"
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl p-3 md:p-6 mb-6">
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                              Meeting Link:
                            </h2>
                            <p className="text-blue-500 underline cursor-pointer break-all">
                              {jobApp.testData.url === null
                                ? ""
                                : jobApp.testData.url}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl p-3 md:p-6 ">
                            <h1 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                              Pre-Requistes
                            </h1>
                            <p>{jobApp.testData.prerequistes}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="hidden lg:block">
                  <Image src={tester} alt="applied" className="h-full w-full" />
                </div>
              </div>
            ) : jobApp.jobStatus === "3" ? (
              <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h1 className="text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black">
                    You have been shortlisted for interview round!
                  </h1>
                  {typeof jobApp.interviewData === "undefined" ||
                  jobApp.interviewData === null ? (
                    <></>
                  ) : (
                    <>
                      <div className="bg-gray-100 py-8 mx-5">
                        <h1 className="text-center mb-6 md:mt-10 text-2xl md:text-3xl font-Heading font-bold text-black">
                          This is the Interview Information
                        </h1>
                        <div className="container mx-1 md:mx-8 lg:mx-auto px-4 max-w-md md:max-w-xl">
                          <h1 className="text-xl md:text-3xl font-bold mb-4">
                            Platform: {jobApp.interviewData.platform}
                          </h1>
                          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl p-3 md:p-6 mb-6">
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                              Presentation Details:
                            </h2>
                            <div className="flex flex-col space-y-2">
                              <p className="text-gray-600 text-sm">
                                Date:{" "}
                                {moment(
                                  jobApp.interviewData.pptDateTime
                                ).format("DD MMM YYYY")}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Time:{" "}
                                {moment(
                                  jobApp.interviewData.pptDateTime
                                ).format("h:mm A")}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl p-3 md:p-6 mb-6">
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                              Meeting Link:
                            </h2>
                            <p className="text-blue-500 underline cursor-pointer break-all">
                              {jobApp.interviewData.url === null
                                ? ""
                                : jobApp.interviewData.url}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-2xl p-3 md:p-6 ">
                            <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                              Pre-Requistes
                            </h2>
                            <p className="text-gray-600 text-sm">
                              {jobApp.interviewData.prerequistes}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="hidden lg:block">
                  <Image src={inter} alt="applied" className="h-full w-full" />
                </div>
              </div>
            ) : (
              <div className="w-9/10 lg:w-4/5 2xl:w-2/3 mt-10 ml-2 md:ml-8 lg:ml-10 mr-8 lg:mr-12 xl:mr-16 2xl:mr-24 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h1 className="text-center md:text-left mb-10 ml-2 md:ml-6 mt-6 md:mt-16 text-3xl md:text-4xl font-Heading font-bold text-black">
                    You have been hired!
                  </h1>
                </div>
                <div>
                  <Image src={inter} alt="applied" className="h-full w-full" />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

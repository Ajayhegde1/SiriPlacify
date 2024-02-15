import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";

import logo from "../../public/logo.png";
import jobs from "../../public/jobs.png";
import Addjobs from "../../public/addJobsIcons.png";
import pp from "../../public/pp.png";
import editProfile from "../../public/editProfile.svg";
import logout from "../../public/logout.png";
import myApplications from "../../public/myapplications.svg";
import userImage from "../../public/userManagement.svg";
import dashboard from "../../public/dashboard.png";
import { BellOutlined } from "@ant-design/icons";
import notificationRed from "../../public/notifications.svg";

import { signOut } from "@/redux/Slices/userSlice";
import { getNotifications } from "@/redux/Slices/notificationSlice";

import { useEffect } from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, activePage }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.notifications);

  function handleSideBar() {
    setSidebarOpen(!sidebarOpen);
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <div className="relative z-50">
      <nav className={`navbar ${sidebarOpen ? "active" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-logo-div">
            <a className="navbar-logo-link" href="#">
              <Image src={logo} alt="Logo" />
            </a>
            <button onClick={() => handleSideBar()} className="navbar-toggler">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          {user === null ? (
            <></>
          ) : user.accType === "0" ? (
            <>
              <div className="mt-[60px] mb-[-50px]">
                <h1
                  className={
                    sidebarOpen
                      ? "text-left text-black text-[18px] font-[500] pl-[10px]"
                      : "opacity-0"
                  }
                >
                  Menu
                </h1>
              </div>
              <ul className="menu-list ">
                <Tooltip title="Notifications" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) == 12 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/notifications">
                      <div className={sidebarOpen ? "ml-3" : "m-0"}>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <Image
                            src={notificationRed}
                            alt="notification"
                            className={sidebarOpen ? "mt-1" : "ml-0"}
                          />
                          {notifications !== null &&
                            notifications.length > 0 && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-2px",
                                  right: "0px",
                                  width: "7px",
                                  height: "7px",
                                  backgroundColor: "red",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                        </div>
                      </div>
                      <span className="menu-link-text">Notifications</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="Dashboard" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) == 1 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/dashboard/College">
                      <Image
                        src={dashboard}
                        className={sidebarOpen ? "ml-3" : "ml-0"}
                        alt="logo for jobs"
                      />
                      <span className="menu-link-text">Dashboard</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="Jobs" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) == 2 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/jobs">
                      <Image
                        src={jobs}
                        className={sidebarOpen ? "ml-3" : "ml-0"}
                        alt="logo for jobs"
                      />
                      <span className="menu-link-text">Jobs</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="Add Job" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) === 6 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/addJob">
                      <Image
                        src={Addjobs}
                        className={sidebarOpen ? "ml-3" : "ml-0"}
                        alt="logo for jobs"
                      />
                      <span className="menu-link-text">Add Jobs</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="User Managment" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) === 9 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/studentList">
                      <Image
                        src={userImage}
                        className={sidebarOpen ? "ml-3" : "ml-0"}
                        alt="logo for placement policy"
                      />
                      <span className="menu-link-text">User Management</span>
                    </a>
                  </li>
                </Tooltip>
                <div className="h-[2px] opacity-60 w-[100%] border-[#CECED0] bg-[#CECED0]"></div>
                <Tooltip title="Placement Policy" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) === 4 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/editPlacementPolicy">
                      <Image
                        src={pp}
                        className={sidebarOpen ? "ml-3" : "ml-1"}
                        alt="logo for placement policy"
                      />
                      <span className="menu-link-text">Placement Policy</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="Profile" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) === 7 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/editProfile">
                      <Image
                        src={editProfile}
                        className={sidebarOpen ? "ml-3" : "ml-1"}
                        alt="logo for placement policy"
                      />
                      <span className="menu-link-text">Edit Profile</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="Log Out" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) === 8 ? "current" : ""
                    }`}
                    onClick={() => handleSignOut()}
                  >
                    <a className="menu-link cursor-pointer">
                      <Image
                        src={logout}
                        className={
                          sidebarOpen
                            ? "ml-3 cursor-pointer"
                            : "ml-1 cursor-pointer"
                        }
                        alt="logo for placement policy"
                      />
                      <span className="menu-link-text">Logout</span>
                    </a>
                  </li>
                </Tooltip>
              </ul>
            </>
          ) : user.accType === "1" ? (
            <ul className="menu-list">
              <Tooltip title="Notifications" placement="right">
                <li
                  className={`menu-item ${
                    parseInt(activePage) == 12 ? "current" : ""
                  }`}
                >
                  <a className="menu-link" href="/notifications">
                    <div className={sidebarOpen ? "ml-3" : "m-0"}>
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <Image
                          src={notificationRed}
                          alt="notification"
                          className={sidebarOpen ? "mt-1" : "ml-0"}
                        />
                        {notifications !== null && notifications.length > 0 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-2px",
                              right: "0px",
                              width: "7px",
                              height: "7px",
                              backgroundColor: "red",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <span className="menu-link-text">Notifications</span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title="Jobs" placement="right">
                <li
                  className={`menu-item ${
                    parseInt(activePage) === 2 ? "current" : ""
                  }`}
                >
                  <a className="menu-link" href="/jobs">
                    <Image
                      src={jobs}
                      className={sidebarOpen ? "ml-3" : "ml-0"}
                      alt="logo for jobs"
                    />
                    <span className="menu-link-text">Jobs</span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title="Applications" placement="right">
                <li
                  className={`menu-item ${
                    parseInt(activePage) === 6 ? "current" : ""
                  }`}
                >
                  <a className="menu-link" href="/myApplications">
                    <Image
                      src={myApplications}
                      className={sidebarOpen ? "ml-3" : "ml-1"}
                      alt="logo for placement policy"
                    />
                    <span className="menu-link-text">My Applications</span>
                  </a>
                </li>
              </Tooltip>
              <div className="h-[2px] opacity-60 w-[100%] border-[#CECED0] bg-[#CECED0]"></div>
              <Tooltip title="Placement Policy" placement="right">
                <li
                  className={`menu-item ${
                    parseInt(activePage) === 4 ? "current" : ""
                  }`}
                >
                  <a className="menu-link" href="/editPlacementPolicy">
                    <Image
                      src={pp}
                      className={sidebarOpen ? "ml-3" : "ml-1"}
                      alt="logo for placement policy"
                    />
                    <span className="menu-link-text">Placement Policy</span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title="Profile" placement="right">
                <li
                  className={`menu-item ${
                    parseInt(activePage) === 7 ? "current" : ""
                  }`}
                >
                  <a className="menu-link" href="/editStudentProfile">
                    <Image
                      src={editProfile}
                      className={sidebarOpen ? "ml-3" : "ml-1"}
                      alt="logo for placement policy"
                    />
                    <span className="menu-link-text">Edit Profile</span>
                  </a>
                </li>
              </Tooltip>
              <Tooltip title="Log Out" placement="right">
                <li
                  className={`menu-item ${
                    parseInt(activePage) === 8 ? "current" : ""
                  }`}
                  onClick={() => handleSignOut()}
                >
                  <a className="menu-link cursor-pointer">
                    <Image
                      src={logout}
                      className={
                        sidebarOpen
                          ? "ml-3 cursor-pointer"
                          : "ml-1 cursor-pointer"
                      }
                      alt="logo for placement policy"
                    />
                    <span className="menu-link-text">Logout</span>
                  </a>
                </li>
              </Tooltip>
            </ul>
          ) : (
            <>
              <div className="mt-[60px] mb-[-40px]">
                <h1
                  className={
                    sidebarOpen
                      ? "text-left text-black text-[18px] font-[500] pl-[10px]"
                      : "opacity-0"
                  }
                >
                  Menu
                </h1>
              </div>
              <ul className="menu-list">
                <Tooltip title="Notifications" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) == 12 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/notifications">
                      <div className={sidebarOpen ? "ml-3" : "m-0"}>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <Image
                            src={notificationRed}
                            alt="notification"
                            className={sidebarOpen ? "mt-1" : "ml-0"}
                          />
                          {notifications !== null &&
                            notifications.length > 0 && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-2px",
                                  right: "0px",
                                  width: "7px",
                                  height: "7px",
                                  backgroundColor: "red",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                        </div>
                      </div>
                      <span className="menu-link-text ">Notifications</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="Dashboard" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) == 1 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/dashboard/Company">
                      <Image
                        src={dashboard}
                        className={sidebarOpen ? "ml-3" : "ml-0"}
                        alt="logo for jobs"
                      />
                      <span className="menu-link-text">Dashboard</span>
                    </a>
                  </li>
                </Tooltip>
              </ul>

              <div className="mt-[40px] mb-[-40px]">
                <h1
                  className={
                    sidebarOpen
                      ? "text-left text-black text-[18px] font-[500] pl-[10px]"
                      : "hidden"
                  }
                >
                  Recruitment
                </h1>
              </div>
              <ul className="menu-list">
                <Tooltip title="Jobs" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) === 2 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/jobs">
                      <Image
                        src={jobs}
                        className={sidebarOpen ? "ml-3" : "ml-0"}
                        alt="logo for jobs"
                      />
                      <span className="menu-link-text">Jobs</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="Add Job" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) === 6 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/addJob">
                      <Image
                        src={Addjobs}
                        className={sidebarOpen ? "ml-3" : "ml-0"}
                        alt="logo for jobs"
                      />
                      <span className="menu-link-text">Add Jobs</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="Profile" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) === 7 ? "current" : ""
                    }`}
                  >
                    <a className="menu-link" href="/editCompanyProfile">
                      <Image
                        src={editProfile}
                        className={sidebarOpen ? "ml-3" : "ml-1"}
                        alt="logo for placement policy"
                      />
                      <span className="menu-link-text">Edit Profile</span>
                    </a>
                  </li>
                </Tooltip>
                <Tooltip title="Log Out" placement="right">
                  <li
                    className={`menu-item ${
                      parseInt(activePage) === 8 ? "current" : ""
                    }`}
                    onClick={() => handleSignOut()}
                  >
                    <a className="menu-link cursor-pointer">
                      <Image
                        src={logout}
                        className={
                          sidebarOpen
                            ? "ml-3 cursor-pointer"
                            : "ml-1 cursor-pointer"
                        }
                        alt="logo for placement policy"
                      />
                      <span className="menu-link-text">Logout</span>
                    </a>
                  </li>
                </Tooltip>
              </ul>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

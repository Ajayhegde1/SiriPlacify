import React, { useState } from "react";
import { useSelector } from "react-redux";
import logoImg from "@/public/logo.png";
import logout from "../../public/logout.png";

import cImg from "@/public/c.svg";
import tpImg from "@/public/tp.svg";
import sImg from "@/public/s.svg";
import notfiImg from "@/public/notifs.svg";
import profileImg from "@/public/profile.svg";
import Popover from "@mui/material/Popover";
import editProfile from "../../public/edit.svg";
import Badge from "@mui/material/Badge";
import Sidebar from "@/components/SideBar";
import DocHeader from "@/components/DocHeader";
import FirstHalfCompany from "@/components/Dashboard/FirstHalfCompany";
import PlannedVsActualGraph from "@/components/Dashboard/PlannedVsActualGraph";
import { TopBar } from "@/components/TopBar";
import { useDispatch } from "react-redux";
import Image from "next/image";

export default function Company() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useSelector((state) => state.user);

  var Notifications = useSelector((state) => state.notifications);
  if (Notifications == null) {
    Notifications = 0;
  } else {
    Notifications = Notifications.length;
  }
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="bg-gray-200">
      {/* <TopBar sidebar={sidebarOpen} /> */}
      <section className="w-screen h-[80px] bg-white fixed top-0 flex justify-between pl-[130px] pr-[80px] items-center gap-[30px] z-50">
        <Image
          className={sidebarOpen ? "opacity-0" : "opacity-100"}
          src={logoImg}
        ></Image>
        <div className="flex items-center justify-center gap-[30px]">
          <a className="menu-link" href="/notifications">
            <Badge color="secondary" badgeContent={Notifications}>
              {/* <MailIcon />hi */}

              <Image src={notfiImg}></Image>
            </Badge>
          </a>
          <div>
            <div onClick={handleClick}>
              {" "}
              {user.accType === "0" ? (
                <Image
                  className="h-[5vh] w-[5vh] cursor-pointer"
                  src={tpImg}
                ></Image>
              ) : user.accType === "1" ? (
                <Image
                  className="h-[5vh] w-[5vh] cursor-pointer"
                  src={sImg}
                ></Image>
              ) : (
                <Image
                  className="h-[5vh] w-[5vh] cursor-pointer"
                  src={cImg}
                ></Image>
              )}
              {/* <Image className=" cursor-pointer" src={profileImg}></Image> */}
            </div>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <div className="p-[20px] w-[244px] flex flex-col gap-y-[20px] rounded-[6px]">
                <div className="flex justify-between items-center gap-[8px]">
                  {user.accType === "0" ? (
                    <Image className="h-[5vh] w-[5vh]" src={tpImg}></Image>
                  ) : user.accType === "1" ? (
                    <Image className="h-[5vh] w-[5vh]" src={sImg}></Image>
                  ) : (
                    <Image className="h-[5vh] w-[5vh]" src={cImg}></Image>
                  )}
                  {/* <Image src={profileImg}></Image> */}
                  <div className="text-[16px] font-[600] text-[#3B3B3B]">
                    {user === null ? " " : user.username}
                  </div>
                </div>
                <div className="h-[2px] w-full bg-[#BBBBBB]"></div>
                <div className="flex flex-col gap-y-[16px]">
                  <div className="">
                    <a
                      className="menu-link cursor-pointer flex gap-[12px] items-center"
                      href="/editCompanyProfile"
                    >
                      <Image
                        src={editProfile}
                        className=""
                        alt="logo for placement policy"
                      />
                      <span className="text-[16px] font-[400] text-[#5D5B74]">
                        Edit Profile
                      </span>
                    </a>
                  </div>
                  <div className="flex" onClick={() => handleSignOut()}>
                    <a className="menu-link cursor-pointer flex gap-[12px] items-center">
                      <Image src={logout} alt="logo for placement policy" />
                      <span className="text-[16px] font-[400] text-[#5D5B74]">
                        Logout
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              {/* <Typography sx={{ p: 2 }}>The content of t</Typography> */}
            </Popover>
          </div>
        </div>
      </section>
      <DocHeader DocTitle="Dashboard" />

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={1}
      />
      <main class={`dashboard ${sidebarOpen ? "active" : ""}`}>
        <div className="min-h-screen pt-3 md:py-6 px-4 md:px-6 lg:p-6">
          <div className="pb-2">
            <h1 className="text-center md:text-left pt-4 pb-2 text-xl md:text-4xl font-Heading font-bold text-black">
              Dashboard
            </h1>
            <p className="text-center md:text-left text-base md:text-xl text-gray-500 font-medium font-Heading ml-1">
              Welcome, {user === null ? " " : user.username}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-2 xl:gap-6">
            <FirstHalfCompany />
            <div className="col-span-1 2xl:col-span-3">
              <PlannedVsActualGraph />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

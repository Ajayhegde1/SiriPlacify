import * as React from "react";
import Box from "@mui/material/Box";
import logout from "../../public/logout.png";
import editProfile from "../../public/edit.svg";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Image from "next/image";
import notfiImg from "@/public/notifs.svg";
import logoImg from "@/public/logo.png";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import profileImg from "@/public/profile.svg";
import { signOut } from "@/redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
const shapeStyles = { bgcolor: "primary.main", width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: "50%" };
const rectangle = <Box component="span" sx={shapeStyles} />;
export function TopBar({ sidebar }) {
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
    <section className="w-screen h-[80px] bg-white fixed top-0 flex justify-between pl-[130px] pr-[80px] items-center gap-[30px]">
      <Image
        className={sidebar ? "opacity-0" : "opacity-100"}
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
            <Image className=" cursor-pointer" src={profileImg}></Image>
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
                <Image src={profileImg}></Image>
                <div className="text-[16px] font-[600] text-[#3B3B3B]">
                  {user === null ? " " : user.username}
                </div>
              </div>
              <div className="h-[2px] w-full bg-[#BBBBBB]"></div>
              <div className="flex flex-col gap-y-[16px]">
                <div className="">
                  <a
                    className="menu-link cursor-pointer flex gap-[12px] items-center"
                    href="/editProfile"
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
  );
}

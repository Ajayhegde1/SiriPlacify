import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";

import Sidebar from "@/components/SideBar";
import DocHeader from "@/components/DocHeader";

import {
  getNotifications,
  updateNotification,
} from "@/redux/Slices/notificationSlice";
import { useRouter } from "next/router";
import { routes } from "@/constants/routes";
import { TopBar } from "@/components/TopBar";

export default function Notifications() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Notifications = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user !== null) {
      dispatch(getNotifications());
    } else {
      router.push(routes.NOTFOUND);
    }
  }, [dispatch]);

  const handleMarkNotifications = (id) => {
    dispatch(updateNotification(id));
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <TopBar sidebar={sidebarOpen} />
      <DocHeader DocTitle="Notifications" />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={12}
      />
      <main
        className={`dashboard ${
          sidebarOpen ? "pt-[40px] active" : "pt-[40px]"
        }`}
      >
        <div className="flex flex-col items-center justify-center flex-1 h-full pl-3 md:pl-10 pr-3 md:pr-24 py-10">
          <div className="flex flex-col w-full space-y-4">
            <div className="flex flex-row justify-between items-center w-full">
              <h2 className="text-4xl my-10 font-bold text-gray-900">
                Notifications
              </h2>
            </div>
            <div class="flex flex-col space-y-4">
              {Notifications === null ? (
                <div className="w-full p-4 bg-white rounded-lg shadow-xs">
                  <Spin size="large" />
                </div>
              ) : Notifications.length === 0 ? (
                <div className="w-full p-4 bg-white rounded-lg shadow-xs">
                  No Notifications
                </div>
              ) : (
                Notifications.map((notification) => (
                  <div className="w-full p-4 bg-white rounded-lg shadow-xs">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-col space-y-2 w-2/3">
                        <span className="font-Heading text-base md:text-lg font-bold text-gray-900">
                          {notification.subject}
                        </span>
                        <span className="font-SubHeading text-sm md:text-base font-normal text-gray-500">
                          {notification.body}
                        </span>
                      </div>
                      <div className="text-sm font-normal text-gray-500 ml-auto">
                        {notification.formattedDate}
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          handleMarkNotifications(notification.uid)
                        }
                        className="p-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-sm font-bold text-white flex ml-auto mt-2"
                      >
                        Mark as Read
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

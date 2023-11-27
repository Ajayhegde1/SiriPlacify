import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { openNotification, notificationTypes } from "@/utils/notifications";

import { routes } from "@/constants/routes";
import DocHeader from "@/components/DocHeader";
import Navbar from "@/components/NavBar";
import OpeningSection from "@/components/OpeningSection";
import SecondSection from "@/components/SecondSection";
import ThirdSection from "@/components/ThirdSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Sidebar from "@/components/SideBar";

export default function Home() {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push(routes.HOMEPAGE);
    } else if (user.accType === "0") {
      router.push(routes.TPODASHBOARD);
    } else if (user.accType === "1") {
      router.push(routes.JOBS);
    } else if (user.accType === "2") {
      router.push(routes.COMPANYDASHBOARD);
    } else {
      openNotification(notificationTypes.ERROR, "Error", "Unauthorized User");
    }
  }, [user]);

  return (
    <div>
      <DocHeader DocTitle="Placify.io" />
      <Navbar />
      <div id="Home">
        <OpeningSection />
      </div>

      <div id="About">
        <SecondSection />
      </div>
      <div id="Portfolio">
        <ThirdSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <FooterSection />
    </div>
  );
}

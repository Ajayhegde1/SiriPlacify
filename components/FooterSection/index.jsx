import logo from "../../public/logo.png";

import Image from "next/image";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";

export default function FooterSection() {
  return (
    <footer class="footer">
      <div class="container mx-auto flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-0 items-center justify-between py-4 px-6">
        <div class="flex items-center">
          <Image src={logo} alt="logo" />
        </div>
        <div className="flex items-center mb-4 sm:mb-0">
          <a
            href="https://www.facebook.com/PlacifyPlacements"
            className="text-black mr-4 lg:mr-8"
          >
            <FacebookOutlined style={{ fontSize: "24px" }} />
          </a>
          <a
            href="https://twitter.com//_placify/"
            className="text-black mr-4 lg:mr-8"
          >
            <TwitterOutlined style={{ fontSize: "24px" }} />
          </a>
          <a
            href="https://www.instagram.com/_placify_/"
            className="text-black mr-4 lg:mr-8"
          >
            <InstagramOutlined style={{ fontSize: "24px" }} />
          </a>
          <a href="#contact" className="text-black">
            <MailOutlined style={{ fontSize: "24px" }} />
          </a>
        </div>
        <div class="font-Heading font-bold flex items-center">
          <span class="mr-4">shiva@placify.io</span>
          <span>+91 7204610205</span>
        </div>
      </div>
    </footer>
  );
}

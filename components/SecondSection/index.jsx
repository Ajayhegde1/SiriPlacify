import Image from "next/image";

import photo1 from "../../public/photo2.1.png";
import photo2 from "../../public/photo2.2.png";
import photo3 from "../../public/photo2.3.png";
import photo4 from "../../public/photo2.4.png";

export default function SecondSection() {
  return (
    <div className="">
      <div className="pt-2">
        <h1 className="text-center underline  mt-12 xl:mt-16 2xl:mt-32 xl:mb-16 2xl:mb-24 text-5xl lg:text-6xl 2xl:text-7xl font-Heading font-semibold drop-shadow text-green-800">
          How do we help?
        </h1>
        <div className=" mb-12 xl:mb-24 2xl:mb-36 mt-12 xl:mt-32 2xl:mt-40  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mx-20">
          <div>
            <img
              width="80"
              height="80"
              src="https://img.icons8.com/dotty/80/customer-insight.png"
              alt="customer-insight"
              className="mx-auto drop-shadow scale-[120%] mb-6"
            />
            <h3 className="text-center text-xl font-Heading font-bold text-green-800 mb-4">
              Connecting multiple stakeholders under one platform
            </h3>
            <p className="text-center text-base font-SubHeading font-medium text-black">
              Connecting the corporates, universities and the students under a
              single platform for better communication
            </p>
          </div>
          <div>
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/cotton/64/bar-chart--v3.png"
              alt="bar-chart--v3"
              className="mx-auto drop-shadow scale-[120%]  mb-6"
            />
            <h3 className="text-center text-xl font-Heading font-bold text-green-800 mb-4">
              Enhanced Data Tracking Capabilities
            </h3>
            <p className="text-center text-base font-SubHeading font-medium text-black">
              Tracking of the student applications and placement statistics made
              error-free and simple
            </p>
          </div>
          <div>
            <img
              width="80"
              height="80"
              src="https://img.icons8.com/dotty/80/certificate.png"
              alt="certificate"
              className="mx-auto drop-shadow scale-[110%] mb-6"
            />
            <h3 className="text-center text-xl font-Heading font-bold text-green-800 mb-4">
              Standardized process of recruitment
            </h3>
            <p className="text-center text-base font-SubHeading font-medium text-black">
              Automated, Systematic and Standardized process of recruitments to
              the corporates and universities
            </p>
          </div>
          <div>
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios/50/control-panel--v2.png"
              alt="control-panel--v2"
              className="mx-auto drop-shadow scale-[120%] mb-6"
            />
            <h3 className="text-center text-xl font-Heading font-bold text-green-800 mb-4">
              Insights
            </h3>
            <p className="text-center text-base font-SubHeading font-medium text-black">
              Personalized dashboards for the stakeholders to view the insights
              drawn from the existing data without compromising the security of
              the universities and corporates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

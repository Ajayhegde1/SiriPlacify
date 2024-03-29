import Image from "next/image";
import landingPage from "../../public/photo1.png";

export default function OpeningSection() {
  return (
    <div className="openingSection">
      <div className="ml-5 mr-6 md:mr-16 pt-12 grid grid-cols-1 pb-16 lg:grid-cols-3 2xl:grid-cols-2 gap-6 2xl:gap-16">
        <div className="col-span-1 lg:col-span-2 2xl:col-span-1 my-auto ml-4 md:ml-12 mr-8 flex flex-col gap-4 justify-start w-[40vw]">
          <h1 className="mt-2 mb-6 text-2xl xl:text-6xl  md:text-6xl lg:text-6xl 2xl:text-6xl font-Heading font- text-green-800">
            Campus Placements Simplified
          </h1>
          <p className="text-sm text-base lg:text-lg 2xl:text-xl font-SubHeading font-light text-gray-900 mb-4">
            An intelligent and automated campus placements management platform
            to connect corporates, universities and students
          </p>
          <div className="">
            <a
              href="#contact"
              className="rounded-[50px] font-bold bg-green-800 px-4 py-4 text-white shadow hover:shadow-lg hover:scale-105 transition ease-in-out inline-block md:px-6 md:py-4 md:text-lg"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="hidden lg:block mx-auto mt-12">
          <Image src={landingPage} alt="landingPage" />
        </div>
      </div>
    </div>
  );
}

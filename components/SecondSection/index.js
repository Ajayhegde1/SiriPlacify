import Image from "next/image"

import photo1 from "../../public/photo2.1.png"
import photo2 from "../../public/photo2.2.png"
import photo3 from "../../public/photo2.3.png"
import photo4 from "../../public/photo2.4.png"

export default function SecondSection() {
    return (
        <div className="my-6 md:my-20">
            <h1 className="text-center mt-12 xl:mt-16 2xl:mt-32 mb-12 xl:mb-16 2xl:mb-24 text-5xl lg:text-6xl 2xl:text-7xl font-Heading font-bold text-green-800">How do we help?</h1>
            <div className="mb-12 xl:mb-24 2xl:mb-36 mt-12 xl:mt-32 2xl:mt-40  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mx-20">
                <div>
                    <Image
                        src={photo1}
                        alt="photo1"
                        className="mx-auto h-16 mb-6"
                    />
                    <h3 className="text-center text-xl font-Heading font-bold text-green-800 mb-4">Connecting multiple stakeholders under one platform</h3>
                    <p className="text-center text-base font-SubHeading font-medium text-black">Connecting the corporates, universities and the students under a single platform for better communication</p>
                </div>
                <div>
                    <Image
                        src={photo2}
                        alt="photo2"
                        className="mx-auto h-16 mb-6"
                    />
                    <h3 className="text-center text-xl font-Heading font-bold text-green-800 mb-4">Enhanced Data Tracking Capabilities</h3>
                    <p className="text-center text-base font-SubHeading font-medium text-black">Tracking of the student applications and placement statistics made error-free and simple</p>
                </div>
                <div>
                    <Image
                        src={photo3}
                        alt="photo3"
                        className="mx-auto h-16 mb-6"
                    />
                    <h3 className="text-center text-xl font-Heading font-bold text-green-800 mb-4">Standardized process of recruitment</h3>
                    <p className="text-center text-base font-SubHeading font-medium text-black">Automated, Systematic and Standardized process of recruitments to the corporates and universities</p>
                </div>
                <div>
                    <Image
                        src={photo4}
                        alt="photo4"
                        className="mx-auto h-16 mb-6"
                    />
                    <h3 className="text-center text-xl font-Heading font-bold text-green-800 mb-10">Insights</h3>
                    <p className="text-center text-base font-SubHeading font-medium text-black">Personalized dashboards for the stakeholders to view the insights drawn from the existing data without compromising the security of the universities and corporates</p>
                </div>
            </div>
        </div>
    )
}
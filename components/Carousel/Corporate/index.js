import photo2 from "../../../public/greenTick.png"

import Image from "next/image"

export default function Corporate(){
    return(
        <div className="mx-10 md:mx-16 lg:mx-24 xl:mx-28 2xl:mx-36">
            <h1 className="font-bold underline underline-offset-4 text-lg mb-6 md:text-xl lg:text-2xl" >Corporate</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                    <Image
                        src={photo2}
                        alt="photo2"
                        className="h-12 w-12 mb-4"
                    />
                    <h3 className="text-left text-xl font-Heading font-bold text-green-800 mb-4">Better Outreach</h3>
                    <p className="text-left text-base font-SubHeading font-medium text-black">Reach out to a wider pool of talent across multiple campuses, increasing your brand awareness and diversity to hire the best talent adhering to your needs</p>
                </div>
                <div>
                    <Image
                        src={photo2}
                        alt="photo2"
                        className="h-12 w-12 mb-4"
                    />
                    <h3 className="text-left text-xl font-Heading font-bold text-green-800 mb-4">Standardizing and Streamlining the process</h3>
                    <p className="text-left text-base font-SubHeading font-medium text-black">Follow consistent and transparent procedure for hiring talent from different campuses, reducing bias and errors by receiving authenticated information only</p>
                </div>
                <div>
                    <Image
                        src={photo2}
                        alt="photo2"
                        className="h-12 w-12 mb-4"
                    />
                    <h3 className="text-left text-xl font-Heading font-bold text-green-800 mb-4">Automated process</h3>
                    <p className="text-left text-base font-SubHeading font-medium text-black">Save time and resources by automating the mundane tasks of recruitment like student data tracking, resume screening, offer letter release, document verification, etc</p>
                </div>
                <div>
                    <Image
                        src={photo2}
                        alt="photo2"
                        className="h-12 w-12 mb-4"
                    />
                    <h3 className="text-left text-xl font-Heading font-bold text-green-800 mb-4">Insights</h3>
                    <p className="text-left text-base font-SubHeading font-medium text-black">Get data-driven insights into the performance and potential of candidates from various universities</p>
                </div>
                <div>
                    <Image
                        src={photo2}
                        alt="photo2"
                        className="h-12 w-12 mb-4"
                    />
                    <h3 className="text-left text-xl font-Heading font-bold text-green-800 mb-4">Better Communication with the universities and students</h3>
                    <p className="text-left text-base font-SubHeading font-medium text-black">Communicate with the universities and the students through a single platform, ensuring clarity and responsiveness</p>
                </div>
                <div>
                    <Image
                        src={photo2}
                        alt="photo2"
                        className="h-12 w-12 mb-4"
                    />
                    <h3 className="text-left text-xl font-Heading font-bold text-green-800 mb-4">Student Tracking</h3>
                    <p className="text-left text-base font-SubHeading font-medium text-black">Receive only authenticated and verified student information and track the progress and status of each student throughout the placement process</p>
                </div>
            </div>
        </div>
    )
}
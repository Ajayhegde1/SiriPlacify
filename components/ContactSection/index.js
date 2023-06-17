import Image from "next/image"
import photo1 from "../../public/chintu.png"

export default function ContactSection() {
    return (
        <div className="mt-6 md:mt-20 mb-6">
            <div className="mt-20 mx-6 md:mx-12 lg:mx-20 grid grid-cols-1 lg:grid-cols-2 gap-8"> 
                 <div className="hidden lg:block pl-6">
                    <Image
                        src={photo1}
                        alt="photo1"
                        className="lg:mt-28 xl:mt-36 2xl:mt-44"
                    />
                 </div>
                 <div>
                    <h1 className="text-center mt-8 lg:mt-16 xl:mt-24 mb-6 text-2xl lg:text-3xl 2xl:text-5xl font-Heading font-medium text-green-800">Contact Us</h1>
                    <div className="mx-auto">
                    <label
                        className="block mb-4 text-base font-SubHeading font-medium text-black"
                    >Name </label>
                    <input 
                        type="text"
                        placeholder="Name"
                        className="w-full h-12 rounded-md border-2 border-green-800 mb-4 px-4"
                    />
                    <label
                        className="block mb-4 text-base font-SubHeading font-medium text-black"
                    >Designation: </label>
                    <input 
                        type="text"
                        placeholder="Name"
                        className="w-full h-12 rounded-md border-2 border-green-800 mb-4 px-4"
                    />
                    <label
                        className="block mb-4 text-base font-SubHeading font-medium text-black"
                    >College/Corporate:</label>
                    <input 
                        type="text"
                        placeholder="Name"
                        className="w-full h-12 rounded-md border-2 border-green-800 mb-4 px-4"
                    />
                    <label
                        className="block mb-4 text-base font-SubHeading font-medium text-black"
                    >E-mail: </label>
                    <input 
                        type="text"
                        placeholder="Name"
                        className="w-full h-12 rounded-md border-2 border-green-800 mb-4 px-4"
                    />
                    <label
                        className="block mb-4 text-base font-SubHeading font-medium text-black"
                    >Phone No: </label>
                    <input 
                        type="text"
                        placeholder="Name"
                        className="w-full h-12 rounded-md border-2 border-green-800 mb-4 px-4"
                    />
                    </div>
                    <div>
                        <button className="flex ml-auto bg-green-800 text-white font-SubHeading font-medium text-base px-4 py-2 rounded-md">
                            Submit
                        </button>
                    </div>
                 </div>
            </div>
        </div>
    )
}
import CustomCarousel from "../Carousel";

export default function ThirdSection() {
  return (
    <div className="h-auto">
      <h1 className="text-center pt-0 xl:pt-0 2xl:pt-0 mb-4 xl:mb-8 2xl:mb-10 text-5xl lg:text-6xl 2xl:text-7xl font-Heading font-bold text-green-800 drop-shadow underline">
        Key Takeaways!
      </h1>
      <div></div>

      <CustomCarousel />
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { zeroImg } from "../../public/zeroErrors.svg";
// import { placeStatsImg } from "../../public/placestats.svg";
// import { policyImg } from "../../public/placementpolicy.svg";
// import { expertImg } from "../../public/expert.svg";
// import { easeImg } from "../../public/easeappln.svg";
// import { authImg } from "../../public/auth.svg";
// import { betterImg } from "../../public/betteroutreach.svg";
// // Tab Component
// function Tab({ label, onClick, isActive }) {
//   return (
//     <div
//       className={`cursor-pointer flex-grow px-4 py-[16px] text-center ${
//         isActive
//           ? "bg-[#303030] text-white text-[18px] font-[600] rounded-xl"
//           : "bg-gray-200 text-[18px] font-[600] text-green-800 rounded-xl"
//       } transition-colors duration-300 ease-in-out`}
//       onClick={onClick}
//     >
//       {label}
//     </div>
//   );
// }

// // Tabs Component
// function Tabs({ tabs }) {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };

//   return (
//     <div className="flex flex-col bg-gray-200 rounded-xl overflow-hidden">
//       <div className="flex">
//         {tabs.map((tab, index) => (
//           <Tab
//             key={index}
//             label={tab.label}
//             isActive={activeTab === index}
//             onClick={() => handleTabClick(index)}
//           />
//         ))}
//       </div>
//       <div className="bg-white rounded-b-lg p-4">{tabs[activeTab].content}</div>
//     </div>
//   );
// }

// function Tab1({ label, onClick, isActive }) {
//   return (
//     <div
//       className={`cursor-pointer w-[220px] px-[40px] h-[120px] flex items-center justify-center m-2 rounded-md ${
//         isActive
//           ? "bg-[#363636] text-white font-[600] text-center"
//           : "bg-gray-200 text-green-800 font-[600] text-center"
//       } transition-colors duration-300 ease-in-out`}
//       onClick={onClick}
//     >
//       {label}
//     </div>
//   );
// }

// // Tabs Component
// function Tabs1({ tabs, activeTab, setActiveTab }) {
//   const [autoRotate, setAutoRotate] = useState(true);
//   useEffect(() => {
//     let interval;
//     if (autoRotate) {
//       interval = setInterval(() => {
//         setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
//       }, 2000);
//     }

//     return () => clearInterval(interval);
//   }, [autoRotate, tabs.length, setActiveTab]);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//     setAutoRotate(false); // Stop the automatic rotation
//   };

//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {tabs.map((tab, index) => (
//         <Tab1
//           key={index}
//           label={tab.label}
//           isActive={activeTab === index}
//           onClick={() => handleTabClick(index)}
//         />
//       ))}
//     </div>
//   );
// }

// // Content Component
// function Content({ content }) {
//   return (
//     <div className="w-full flex justify-end">
//       {/* <h2 className="text-xl font-bold mb-4">Content</h2> */}
//       <div>{content}</div>
//     </div>
//   );
// }

// // App Component
// export default function ThirdSection() {
//   const [activeTab, setActiveTab] = useState(null);

//   const tabs1 = [
//     {
//       label: "Zero errors and minimized costs",
//       content: (
//         <div>
//           <div>
//             <Image
//               src={"/_next/static/media/photo1.52fa1e0b.png"}
//               alt="Description of the image"
//               priority={true} // or priority
//               width={100}
//               height={100}
//             />
//           </div>
//           Automating the process from end-to-end ensures accuracy, eliminating
//           errors, while reducing costs associated with manual handling
//         </div>
//       ),
//     },
//     {
//       label: "Effortless authentication of student details",
//       content: "Content of Tab 2",
//     },
//     { label: "Ease student application tracking", content: "Content of Tab 3" },
//     {
//       label: "Expert Sessions",
//       content: (
//         <div className="w-[30vw] ml-[200px] ">
//           <div>
//             <Image
//               src={"/_next/static/media/photo1.52fa1e0b.png"}
//               alt="Description of the image"
//               priority={true} // or priority
//               width={440}
//               height={440}
//             />
//           </div>
//           <div className="text-[18px] font-[500] mt-[36px]">
//             Sessions by experts from various domains to provide a comprehensive
//             understanding of campus placements, career advice and industry
//             insights
//           </div>
//         </div>
//       ),
//     },
//     { label: "Placement Statistics & Insights", content: "Content of Tab 5" },
//     { label: "Inclusion of placement policy", content: "Content of Tab 6" },
//   ];
//   const tabs3 = [
//     { label: "Personalized dashboards", content: "Content of Tab 1" },
//     { label: "Track your applications", content: "Content of Tab 2" },
//     { label: "Alumni Connect", content: "Content of Tab 3" },
//     { label: "Expert Sessions", content: "Content of Tab 4" },
//     { label: "Community Hub", content: "Content of Tab 5" },
//     { label: "AI Insights", content: "Content of Tab 6" },
//   ];
//   const tabs2 = [
//     { label: "Better Outreach", content: "Content of Tab 1" },
//     {
//       label: "Standardizing and Streamlining the process",
//       content: "Content of Tab 2",
//     },
//     { label: "Automated process", content: "Content of Tab 3" },
//     { label: "Insights", content: "Content of Tab 4" },
//     {
//       label: "Better Communication with universities and students",
//       content: "Content of Tab 5",
//     },
//     { label: "Student Tracking", content: "Content of Tab 6" },
//   ];
//   const tabs = [
//     {
//       label: "University",
//       content: (
//         <>
//           {" "}
//           <div className="container mx-auto mt-8 px-4 flex">
//             <Tabs1
//               tabs={tabs1}
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//             {activeTab !== null && (
//               <Content content={tabs1[activeTab].content} />
//             )}
//           </div>
//         </>
//       ),
//     },
//     {
//       label: "Corporate",
//       content: (
//         <>
//           <div className="container mx-auto mt-8 px-4 flex ">
//             <Tabs1
//               tabs={tabs2}
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//             {activeTab !== null && (
//               <Content content={tabs1[activeTab].content} />
//             )}
//           </div>
//         </>
//       ),
//     },
//     {
//       label: "Students",
//       content: (
//         <>
//           <div className="container mx-auto mt-8 px-4 flex">
//             <Tabs1
//               tabs={tabs3}
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//             {activeTab !== null && (
//               <Content content={tabs1[activeTab].content} />
//             )}
//           </div>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="container mx-auto mt-8 px-4">
//       <h1 className="text-center pt-0 xl:pt-0 2xl:pt-0 mb-4 xl:mb-8 2xl:mb-10 text-5xl lg:text-6xl 2xl:text-7xl font-Heading font-bold text-green-800 drop-shadow underline">
//         Key Takeaways!
//       </h1>
//       <div> </div>
//       <Tabs tabs={tabs} />
//     </div>
//   );
// }

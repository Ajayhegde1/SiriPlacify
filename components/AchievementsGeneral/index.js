import Carousel from "react-multi-carousel";
import Image from "next/image";
import CarouselItem from "@/components/CarouselItem";
import moment from "moment";
import "react-multi-carousel/lib/styles.css";

import Achievement from "@/public/achievement.png";
import { useEffect, useState } from "react";
import { getCollegeAchievements } from "@/redux/Sagas/requests/features";
import { notificationTypes, openNotification } from "@/utils/notifications";
import { Spin } from "antd";

export default function AchievementsGeneral() {
  const [achievements, setAchievements] = useState(null);
  const collegeId = 1;

  //     getCollegeAchievements()
  //       .then((res) => {
  //         if (res.data.status === 200) {
  //           setAchievements(res.data.data);
  //           console.log(achievements);
  //         } else {
  //           openNotification(
  //             notificationTypes.ERROR,
  //             "Error",
  //             "Something went wrong"
  //           );
  //         }
  //       })
  //       .catch((err) => {
  //         openNotification(
  //           notificationTypes.ERROR,
  //           "Error",
  //           "Something went wrong"
  //         );
  //       });
  //   }, []);
  useEffect(() => {
    const fetchCollegeAchievements = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/getGeneralCollegeAchievements",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              collegeId: collegeId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === "ok") {
          setAchievements(data.message);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCollegeAchievements();
  }, [collegeId]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // Number of slides to slide at once
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="mt-10 mb-5 p-4">
      <div className="text-left">
        <h2 className="relative text-xl md:text-4xl font-bold mt-1 md:mt-5 mb-4 md:mb-12">
          Our Achievements
          <span className="absolute top-1/2 right-0 w-0 md:w-1/2 xl:w-3/4 h-0.5 bg-black transform -translate-y-1/2"></span>
        </h2>
      </div>
      <Carousel
        swipeable
        draggable
        responsive={responsive}
        ssr // Server-side rendering support
        infinite
        keyBoardControl
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {achievements === null ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : Object.keys(achievements).length === 0 ? (
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-bold">No achievements found</h2>
          </div>
        ) : (
          achievements.map((achievement) => (
            <CarouselItem
              Image={
                <Image className="w-full" src={Achievement} alt="Achievement" />
              }
              Title={achievement.Title}
              category={achievement.Category}
              Para={achievement.Description}
              Date={moment(achievement.date).format("DD MMMM")}
            />
          ))
        )}
      </Carousel>
    </div>
  );
}

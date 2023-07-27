import Carousel from 'react-multi-carousel'
import Image from 'next/image'
import CarouselItem from '@/components/CarouselItem'
import 'react-multi-carousel/lib/styles.css'

import Achievement from '@/public/achievement.png'

export default function AchievementCarousel() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1 // Number of slides to slide at once
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    }

    return (
        <div className='mt-10 mb-5 p-4'>
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
                customTransition='all .5'
                transitionDuration={500}
                containerClass='carousel-container'
                removeArrowOnDeviceType={['tablet', 'mobile']}
                dotListClass='custom-dot-list-style'
                itemClass='carousel-item-padding-40-px'
            >
                <CarouselItem
                    Image={<Image className='w-full' src={Achievement} alt="Adobe" />}
                    Title='Lorem Ipsum'
                    category='Design'
                    Para="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                    Date='5 July'
                />
                <CarouselItem
                    Image={<Image className='w-full' src={Achievement} alt="Adobe" />}
                    Title='Lorem Ipsum'
                    category='Design'
                    Para="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                    Date='5 July'
                />
                <CarouselItem
                    Image={<Image className='w-full' src={Achievement} alt="Adobe" />}
                    Title='Lorem Ipsum'
                    category='Design'
                    Para="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                    Date='5 July'
                />
                <CarouselItem
                    Image={<Image className='w-full' src={Achievement} alt="Adobe" />}
                    Title='Lorem Ipsum'
                    category='Design'
                    Para="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                    Date='5 July'
                />
            </Carousel>
        </div >
    )
}
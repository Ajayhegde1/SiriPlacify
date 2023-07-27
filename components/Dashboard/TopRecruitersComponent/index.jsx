import Carousel from 'react-multi-carousel'
import Image from 'next/image'
import 'react-multi-carousel/lib/styles.css'

import Adobe from '@/public/Adobe.png'
import Amazon from '@/public/Amazon.png'
import LinkedIn from '@/public/LinkedIn.png'
import Discord from '@/public/Discord.png'

export default function TopRecruitersComponent() {
    const responsive = {
        desktop: {
            breakpoint: { max: 1560, min: 1024 },
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
                    Top Recruiters
                    <span className="absolute top-1/2 right-0 w-0 md:w-3/5 xl:w-3/4 2xl:w-4/5 h-0.5 bg-black transform -translate-y-1/2"></span>
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
                itemClass='carousel-item-padding-20-px'
            >
                <Image
                    src={Adobe}
                    alt='Adobe'
                />
                <Image
                    src={Amazon}
                    alt='Amazon'
                />
                <Image
                    src={LinkedIn}
                    alt='LinkedIn'
                />
                <Image
                    src={Discord}
                    alt='Discord'
                />
            </Carousel>
        </div >
    )
}
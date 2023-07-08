import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import Corporate from './Corporate'
import College from './College'
import Student from './Student'

const CustomCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // Number of slides to slide at once
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  }

  return (
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
      {/* Your carousel items */}
      <Corporate />
      <College />
      <Student />
    </Carousel>
  )
}

export default CustomCarousel

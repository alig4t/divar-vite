
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Carousel = (props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
    return (
        <>
            <Swiper
                dir="rtl"
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation, Pagination, Thumbs]}
                className=""
                loop
                thumbs={{ swiper: thumbsSwiper }}
            >
                {props.imgs?.map((item,index) => {

                    return (
                        <SwiperSlide key={index} className='h-auto'>
                            <img className='h-full object-cover' src={item} />
                        </SwiperSlide >
                    )

                })}
                

            </Swiper>

            <Swiper

                watchSlidesProgress
                onSwiper={setThumbsSwiper}
                slidesPerView={5}
                spaceBetween={10}

                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-5"
            >
                {
                    props.imgs?.map((item,index)=>{
                        return (
                            <SwiperSlide key={index} className='h-auto'>
                                <img className='w-full h-full rounded-md cursor-pointer  object-cover' src={item} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

          
            
        </>
    );
}

export default Carousel;

import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Carousel = () => {

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
                <SwiperSlide className='h-auto'>
                    <img className='h-full object-cover' src='https://zyysechlnhcxvjthcubq.supabase.co/storage/v1/object/public/postsimg/9f1e32fe-7fbb-4e2a-a1ce-382a836dbeee.jpg' />
                </SwiperSlide >

                <SwiperSlide className='h-auto'>
                    <img className='h-full object-cover' src='https://zyysechlnhcxvjthcubq.supabase.co/storage/v1/object/public/postsimg/ef22a663-1560-4b35-9046-64e2cb3aaad0.jpg' />
                </SwiperSlide>

                <SwiperSlide className='h-auto'>
                    <img className='h-full object-cover' src='https://zyysechlnhcxvjthcubq.supabase.co/storage/v1/object/public/postsimg/2da291a3-8cbd-429a-87db-10fefe6e9ff4.jpg' />
                </SwiperSlide>

            </Swiper>

            <Swiper

                watchSlidesProgress
                onSwiper={setThumbsSwiper}
                slidesPerView={5}
                spaceBetween={10}

                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-5"
            >
                <SwiperSlide className='h-auto'>
                    <img className='w-full h-full rounded-md cursor-pointer  object-cover' src='https://zyysechlnhcxvjthcubq.supabase.co/storage/v1/object/public/postsimg/9f1e32fe-7fbb-4e2a-a1ce-382a836dbeee.jpg' />
                </SwiperSlide>
                <SwiperSlide className='h-auto'>
                    <img className='w-full h-full rounded-md cursor-pointer object-cover' src='https://zyysechlnhcxvjthcubq.supabase.co/storage/v1/object/public/postsimg/ef22a663-1560-4b35-9046-64e2cb3aaad0.jpg' />
                </SwiperSlide>
                <SwiperSlide className='h-auto'>
                    <img className='w-full h-full rounded-md cursor-pointer object-cover' src='https://zyysechlnhcxvjthcubq.supabase.co/storage/v1/object/public/postsimg/2da291a3-8cbd-429a-87db-10fefe6e9ff4.jpg' />
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default Carousel;
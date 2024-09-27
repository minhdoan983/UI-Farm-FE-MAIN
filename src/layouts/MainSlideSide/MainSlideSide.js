import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import slide_image_1 from '../../assets/1.jpg'
import slide_image_2 from '../../assets/2.jpg'
import slide_image_3 from '../../assets/3.jpg'
import slide_image_4 from '../../assets/4.jpg'
import slide_image_5 from '../../assets/5.jpg'
import slide_image_6 from '../../assets/6.jpg'
import slide_image_7 from '../../assets/7.jpg'
import './MainSlideSide.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function MainSlideSide() {
    return (
        <div className='slide-container'>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={
                    {
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }
                }
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', clickable: true, }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className='swiper_container'
            >
                <SwiperSlide>
                    <img src={slide_image_1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_2} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_3} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_4} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_5} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_6} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_7} />
                </SwiperSlide>

                <div className='slider-controler'>
                    <div className="swiper-button-prev slider-arrow">
                        <ArrowBackIcon sx={{color :"#A0522D"}} />
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ArrowForwardIcon sx={{color :"#A0522D"}}/>
                    </div>
                    <div className='swiper-pagination'>

                    </div>
                </div>
            </Swiper>
        </div>
    )
}

export default MainSlideSide
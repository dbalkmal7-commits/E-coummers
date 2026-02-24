'use client'
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
export default function MySlider(props:{imgList: string[];   slidesPerView?: number}) {
  return<>
            <Swiper
      spaceBetween={0}
      slidesPerView={props.slidesPerView}
      modules={[Autoplay]}
      autoplay={{delay:2000}}
          breakpoints={{
   
  
    
    }}
    >

      {props.imgList.map((img:string, index:number) => (
        <SwiperSlide key={index}>
         <Image
  src={img}
  width={400}
  height={300}
  className="w-full h-[200px] md:h-[300px] object-cover"
  alt={`image-${index}`}
/>

        </SwiperSlide>
      ))}
    </Swiper>
  </>
}

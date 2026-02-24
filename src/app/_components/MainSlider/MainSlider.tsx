'use client';
import React from 'react'
import Image from 'next/image';
import img1 from '../../../../public/image/img1.png'
import img2 from '../../../../public/image/img2.webp'
import img3 from '../../../../public/image/img3.webp'
import img4 from '../../../../public/image/img4.webp'
import MySlider from '@/components/myslider/myslider';

export default function MainSlider() {
  return (
    <div className="container w-[95%] md:w-[80%] mx-auto mt-3">
      <div className="flex flex-col md:flex-row ">
        
        {/* Main Slider */}
        <div className="w-full  md:w-3/4">
          <MySlider imgList={[img1.src,img2.src ,img4.src , img3.src]} />
        </div>

        {/* Side Images */}
        <div className="w-full md:w-1/4 flex md:flex-col ">
          <Image
            src={img2}
            className="h-[150]  object-cover"
            alt="side-1"
          />
          <Image
            src={img3}
            className="h-[150] object-cover"
            alt="side-2"
          />
        </div>

      </div>
    </div>
  )
}

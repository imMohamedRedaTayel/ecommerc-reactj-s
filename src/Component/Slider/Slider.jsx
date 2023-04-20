import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function MySlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return <> 
            <div>
            {/* <h2> Single Item</h2> */}
            <Slider {...settings}>
            <div>
                <img className='w-100' style={ { 'height' : '350px' } } src={ require( '../../images/Slider/slider-image-1.jpeg' ) } alt="" />
            </div>
            <div>
                <img className='w-100' style={ { 'height' : '350px' } } src={ require( '../../images/Slider/slider-image-2.jpeg' ) } alt="" />
            </div>
            <div>
                <img className='w-100' style={ { 'height' : '350px' } } src={ require( '../../images/Slider/slider-image-3.jpeg' ) } alt="" />
            </div>
            <div>
                <img className='w-100' style={ { 'height' : '350px' } } src={ require( '../../images/Slider/slider-2.jpeg' ) } alt="" />
            </div>
            <div>
                <img className='w-100' style={ { 'height' : '350px' } } src={ require( '../../images/Slider/grocery-banner.png' ) } alt="" />
            </div>
            <div>
                <img className='w-100' style={ { 'height' : '350px' } } src={ require( '../../images/Slider/grocery-banner-2.jpeg' ) } alt="" />
            </div>
            </Slider>
        </div>
    </>
}

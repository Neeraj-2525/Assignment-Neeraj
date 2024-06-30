import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css"

export default function SlideShow() {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: false,
        arrows: false,
       };


    return (
            <Slider {...settings} className="customSliderStyles">
                <div className="carousel-slide">
                    <img src="/blueBottle.png"  alt="blue bottle" />
                </div>
                <div className="carousel-slide">
                    <img src="/crystalBottle.png" alt="crystal bottle" />
                </div>
            </Slider>
    );
}


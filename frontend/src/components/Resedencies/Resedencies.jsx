import React from "react";
import "./Resedencies.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import data from "../../utils/slider.json";
import { sliderSettings } from "../../utils/common";

const Resedencies = () => {
  return (
    <section className="r-wrap">
      <div className="innerWidth paddings  r-con">
        <div className="r-head flexColStart  ">
          <span className="orangeText">Best Choices </span>
          <span className="primaryText">Popular Residencies</span>
        </div>
       

       
        <Swiper {...sliderSettings}>
     
        <SliderButton/>
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card">
                <img src={card.image} alt="" />
                <span className="secondaryText">{card.price}</span>
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.detail}</span>
              </div>
            </SwiperSlide>
          ))}
          {/* </div> */}

        </Swiper>
      </div>
    </section>
  );
};

export default Resedencies;

const SliderButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={()=> swiper.slidePrev()}>&lt;</button>
      <button onClick={()=> swiper.slideNext()}>&gt;</button>
    </div>
  );
};

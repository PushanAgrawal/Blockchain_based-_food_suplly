import React from "react";
import "./hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup"
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className=" innerWidth paddings flexCenter hero-container">
        <div className="flexColStart hero-left">
          <div className="hero-tittle">
            <div className="orange-circle"></div>
            <h1>
              Discover <br />
              Most Suitable <br />
              Property
            </h1>
             </div>

            <div className="flexColStart hero-desc">
              <span className="secondaryText"> 
                Find a variety of properties that suit you very easilty
              </span>
              <span className="secondaryText">
                Forget all difficulties in finding a residence for you
              </span>
            </div>
            <div className="flexCenter search-bar">
              <HiLocationMarker color="blue" size={25} />
              <input type="text" />
              <button class="button">Search</button>
            </div>
            <div className="flexCenter stat">
            <div className="flexColCenter stats">
                <span>
<CountUp start={8800} end={9999} duration={4}/>+
                </span>
                <span className="secondaryText">  
                    Premium Product

                </span>
                 
            </div>
        
            <div className="flexColCenter stats">
                <span>
<CountUp start={8800} end={9999} duration={4}/>+
                </span>
                <span className="secondaryText">  
                    Premium Product

                </span>
                 
            </div>
        
            <div className="flexColCenter stats">
                <span>
<CountUp start={8800} end={9999} duration={4}/>+
                </span>
                <span className="secondaryText">  
                    Premium Product

                </span>
                 
            </div>
            </div>
        
         
        </div>

        <div className=" flexCenter hero-right">
          <div className="image-container">
            <img src="./hero-image.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

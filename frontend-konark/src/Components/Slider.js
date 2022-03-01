import React from "react";

//AliceCarousel
import AliceCarousel from "react-alice-carousel";

//Images
import app from "../Images/download_app.jpg";
import cricket from "../Images/cricket.jpg";
import brand from "../Images/brand.jpg";
import HD from "../Images/HD-Entertainment.jpg";

// Import css files
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src={app} onDragStart={handleDragStart} role="presentation" />,
  <img src={cricket} onDragStart={handleDragStart} role="presentation" />,
  <img src={brand} onDragStart={handleDragStart} role="presentation" />,
  <img src={HD} onDragStart={handleDragStart} role="presentation" />,
];
export const SliderJs = () => {
  return (
    <div className="hero-slider">
      <AliceCarousel
        autoPlay={true}
        autoPlayInterval={2300}
        infinite={true}
        keyboardNavigation={true}
        disableButtonsControls={true}
        mouseTracking
        items={items}
      />
    </div>
  );
};

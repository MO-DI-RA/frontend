import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Banner1 from "../asset/Banner1.png";
import Banner2 from "../asset/Banner2.png";
import Banner3 from "../asset/Banner3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const imageData = [
  { url: Banner1, alt: "Banner1" },
  { url: Banner2, alt: "Banner2" },
  { url: Banner3, alt: "Banner3" },
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleChange(index) {
    setCurrentIndex(index);
  }

  const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <img src={image.url} alt={image.alt} />
    </div>
  ));

  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      interval={2000}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
      selectedItem={currentIndex}
      onChange={handleChange}
    >
      {renderSlides}
    </Carousel>
  );
}

export default Banner;

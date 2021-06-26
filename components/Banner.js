import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import javlibData from "../config/javlibData.json";
import BannerItem from "./BannerItem";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-10 lg:h-48 bg-gradient-to-t from-gray-900 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        centerMode={true}
        centerSlidePercentage={58}
        stopOnHover={true}
      >
        {javlibData
          .sort(() => 0.5 - Math.random())
          .slice(javlibData, 10)
          .map((collection) => (
            <div className=" cursor-pointer">
              <BannerItem
                id={collection.id}
                code={collection.code}
                image={collection.image}
                name={collection.name}
                title={collection.title}
                keywords={collection.keywords}
                publisher={collection.publisher}
                series={collection.series}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default Banner;

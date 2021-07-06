import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import javlibData from "../config/javlibData.json";
import BannerItem from "./BannerItem";

function MobileBanner({ number }) {
  return (
    <div className="h-screen">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {javlibData
          .sort(() => Math.random() - Math.random())
          .slice(0, 10 || number)
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

export default MobileBanner;

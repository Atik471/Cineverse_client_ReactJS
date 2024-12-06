import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import "./styles/Slider.css";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
// import { useContext } from "react";
// import {LocationContext} from "../providers/LocationProvider";

const Banner = () => {
  const location = useLocation();
//   const {clientDomain} = useContext(LocationContext);

//   console.log(location.pathname)

  return (
    <div>
      <Navbar></Navbar>

      {location.pathname == `/` && (
        <Swiper
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
          <div className="relative w-full h-[650px] bg-[url('./src/assets/matrix_banner.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-white">
              <h1 className="text-4xl font-bold">Matrix</h1>
            </div>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="relative w-full h-[650px] bg-[url('./src/assets/oppenheimer_banner.jpeg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-white">
              <h1 className="text-4xl font-bold">Matrix</h1>
            </div>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="relative w-full h-[650px] bg-[url('./src/assets/venom_banner.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-white">
              <h1 className="text-4xl font-bold">Matrix</h1>
            </div>
          </div>
          </SwiperSlide>
        </Swiper>
      )}
      
      {(location.pathname !== `/`) &&
      (
        <div className="relative w-full h-[400px] bg-[url('./src/assets/account_banner.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-white">
              <h1 className="text-4xl font-bold">Matrix</h1>
            </div>
          </div>
      )}
    </div>
  );
};

export default Banner;

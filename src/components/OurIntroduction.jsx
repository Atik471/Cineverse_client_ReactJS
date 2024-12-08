import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeProvider";

const OurIntroduction = () => {
  const [fontColor, setFontColor] = useState('')
  const [bgColor, setBgColor] = useState('')
  const { theme, setTheme } = useContext(ThemeContext);

   useEffect(() => {
    if (theme === 'light') {
      setFontColor('black');
      setBgColor('white');
    } else {
      setFontColor('white');
      setBgColor('black');
    }
   }, [theme])
  
  return (
    <div className={`lg:py-16 py-8 ${theme === 'light' && 'lg:my-[16rem] my-[8rem]'} bg-black`} 
    >
      <div className="container mx-auto px-6 lg:px-[8%] flex flex-col lg:flex-row-reverse items-center lg:gap-12 gap-5">
        <div className="flex justify-center lg:justify-start w-full lg:w-1/2">
          <div className="relative grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
            <img
              src="/assets/intro_1.jpg"
              alt=""
              className="w-full lg:w-full shadow-lg rounded-md "
            />
            <img
              src="/assets/intro_2.jpg"
              alt=""
              className="w-32 sm:w-40 lg:w-[90%] translate-y-8 justify-self-center shadow-lg rounded-md  lg:flex hidden"
            />
            <img
              src="/assets/intro_3.jpg"
              alt=""
              className="absolute -bottom-12 left-1/3 w-28 sm:w-36 lg:w-60 shadow-lg rounded-md lg:flex hidden"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <p className="text-primary font-semibold mb-4">Our Introduction</p>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-${fontColor} mb-6`}>
            Best pick for hassle-free{" "}
            <span className="text-primary">streaming</span> experience.
          </h2>
          <p className="text-white">
            Welcome to <span className="text-primary font-bold">Cineverse</span>, your ultimate destination for endless
            entertainment. With a vast library of movies and TV shows from all
            genres, we offer an immersive streaming experience tailored just for
            you. Whether you&apos;re into the latest blockbusters, classic
            films, or binge-worthy series, our platform has something for every
            movie lover. Enjoy smooth, high-quality streaming anytime, anywhere,
            and discover your next favorite show. Join us today and dive into a
            world of entertainment!
          </p>
          <button className="bg-transparent text-white border-2 border-primary px-2 md:px-4 py-1 md:py-2 my-6 rounded-md md:rounded-lg hover:bg-primary font-bold hover:scale-110 transition-all duration-500 text-sm md:text-base">
              <Link to={"/contact-us"}>Contact Us</Link>
            </button>
        </div>
      </div>
    </div>
  );
};

export default OurIntroduction;

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const BestPick = () => {
  const [fontColor, setFontColor] = useState('')
  const [bgColor, setBgColor] = useState('')
  const [imgBg, setImgBg] = useState('')
  const { theme, setTheme } = useContext(ThemeContext);

   useEffect(() => {
    if (theme == 'light') {
      setFontColor('black');
      setBgColor('white');
      setImgBg('transparent');
    } else {
      setFontColor('white');
      setBgColor('black');
      setImgBg('orange')
    }
   }, [theme])
  
    return (
        <div className="py-[4rem] mx-auto"  style={{ backgroundColor: bgColor, color: fontColor }}>
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center md:gap-16 gap-8">
        <div className="flex justify-center lg:justify-start w-full lg:w-1/2">
          <img
              src="/assets/BestPicks.jpg"
              alt=""
              className="w-full shadow-lg rounded-md"
            />
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold  mb-6"
          style={{ color: fontColor }}>
            Best pick for hassle-free <span className="text-primary">streaming</span> experience.
          </h2>
          <ul className="space-y-8">
            <li className="flex items-center  md:gap-4 gap-5">
              <div className="flex items-center justify-center w-20 h-20 md:w-16 md:h-16">
              <img src="/assets/access.png" alt="" style={{ backgroundColor: imgBg }} className="p-1"/>
              </div>
              
              <div style={{ color: fontColor }}>
                <h4 className="text-lg font-semibold">Access while traveling</h4>
                <p className="text-sm">
                  Keep access to your entertainment content while roaming the world. Pick from thousands.
                </p>
              </div>
            </li>
            <li className="flex items-center md:gap-4 gap-5">
              <div className="flex items-center justify-center w-20 h-20 md:w-16 md:h-16">
                <img src="/assets/stream.png" alt="" style={{ backgroundColor: imgBg }} className="p-1"/>
              </div>
              <div style={{ color: fontColor }}>
                <h4 className="text-lg font-semibold ">Stream with no interruptions</h4>
                <p className="text-sm">
                  Pause for snacks, not buffering. Stream smoothly with our lightning-fast protocol network.
                </p>
              </div>
            </li>
            <li className="flex items-center  md:gap-4 gap-5">
              <div className="flex items-center justify-center w-16 h-16">
                <img src="/assets/secure.png" alt=""  style={{ backgroundColor: imgBg }} className="p-1"/>
              </div>
              <div style={{ color: fontColor }}>
                <h4 className="text-lg font-semibold">Stay secure at all times</h4>
                <p className=" text-sm">
                  Securely access and enjoy your favorite content, even on public Wi-Fi.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    );
};

export default BestPick;
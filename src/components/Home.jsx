import BestPick from "./BestPick";
import Featured from "./Featured";
import OurIntroduction from "./OurIntroduction";
import { ThemeContext } from "../providers/ThemeProvider";
import { useContext, useEffect, useState } from "react";

const Home = () => {
    const [bgColor, setBgColor] = useState('')
    const { theme, setTheme } = useContext(ThemeContext);

     useEffect(() => {
      if (theme == 'light') {
        setBgColor('white');
      } else {
        setBgColor('#334155');
      }
      console.log(theme)
     }, [theme])

     console.log(theme)
     

  return (
    <div style={{ backgroundColor: bgColor }}>

        <Featured></Featured>
        <BestPick></BestPick>
        <OurIntroduction></OurIntroduction>

    </div>
  );
};

export default Home;

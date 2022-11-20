import React from "react";
import GlobalStyles from "./style/GlobleStyle";
import { ThemeProvider } from "styled-components";
import { dark } from "./style/Theme";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useRef } from "react";
import Home from "./component/Home";
import 'locomotive-scroll/dist/locomotive-scroll.css'
import { AnimatePresence } from "framer-motion";
import About from "./component/About";
import Shop from "./component/Shop";
import ScrollTriggerProxy from "./style/ScrollTriggerProxy";
import Banner from "./component/Banner";
import NewArrival from "./component/NewArrival";
import Footer from "./component/Footer";
import Loader from "./component/Loader";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {

  const containerRef = useRef(null);

  const [loaded , setLoaded] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setLoaded(true)
    },2000)
  },[])

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            // ... all available Locomotive Scroll instance options
            smartphone:{
              smooth : true,
            },
            tablet :{
              smooth : true
            }
          }}
          watch={
            [
              //..all the dependencies you want to watch to update the scroll.
              //  Basicaly, you would want to watch page/location changes
              //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
            ]
          }
          containerRef={containerRef}
        >
          <AnimatePresence>
          {loaded ? null : <Loader/>}
          </AnimatePresence>
          <ScrollTriggerProxy/>
          <AnimatePresence>
          <main className="App" data-scroll-container ref={containerRef}>
            <Home/>
            <About/>
            <Shop/>
            <Banner/>
            <NewArrival/>
            <Footer/>
          </main>
          </AnimatePresence>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
};

export default App;

// to use gsap with locomotive scroll you need to use scroller proxy given by gsap
import { useEffect} from 'react'
import gsap  from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLocomotiveScroll } from 'react-locomotive-scroll'



const ScrollTriggerProxy = () => {

    //first let get instance of locomotive scroll

    const { scroll } = useLocomotiveScroll();
    //Register scroll trigger plugins

    gsap.registerPlugin(ScrollTrigger)

    useEffect(() => {
      if (scroll) {
        const element = scroll?.el; // locomotive scolling element, in this project its is  App (main)

        scroll.on('scroll',ScrollTrigger.update); // on scroll of Locomotive update scroll trigger

        //lets use scroller proxy
        ScrollTrigger.scrollerProxy(element, {
            scrollTop(value) {
              return arguments.length ? scroll.scrollTo(value, {duration: 0, disableLerp: true}) : scroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
              return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            // LocomotiveScroll handles things completely differently on mobile devices -
            // it doesn't even transform the container at all! So to get the correct behavior
            // and avoid jitters, we should pin things with position: fixed on mobile. We sense
            // it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: element.style.transform ? "transform" : "fixed"
          });
      }

      return () => {
        ScrollTrigger.addEventListener('refresh', () => scroll?.update())
        ScrollTrigger.refresh();
      }
    }, [scroll])


  return null;
};

export default ScrollTriggerProxy;
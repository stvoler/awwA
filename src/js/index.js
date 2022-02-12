import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from './cursor';
import {preloader} from './preloader';
import LocomotiveScroll from 'locomotive-scroll';
import Menu from './menu';

gsap.registerPlugin(ScrollTrigger);

const menuEl = document.querySelector('[data-scroll-container]');

preloader('.item').then(() => {
    const scroll = new LocomotiveScroll({el: menuEl, smooth: true});
    const cursor = new Cursor(document.querySelector('.cursor'));
    new Menu(menuEl);

    const target = document.querySelector('.item.active');
    const items = document.querySelector('.items');
    const menu = document.querySelector('.menu');

    gsap.registerPlugin(ScrollTrigger);

    scroll.on("scroll", ScrollTrigger.update);
    
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    ScrollTrigger.defaults({
      toggleActions: "restart pause resume pause",
      scroller: "[data-scroll-container]"
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".item.active",
        repeat: true,
        pin: ".items",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    tl.fromTo("header .border", {width: 1}, {delay: 2.7, duration: 4.5, width: 'calc(100vw - 80px)', ease: "[0.74,0.2,1,-0.22]"})
    tl.fromTo(".item .border", {borderColor: '#000', scale: 1}, {delay: 2.7, duration: 4.5, borderColor: '#fff', scale: 1, ease: "[0.74,0.2,1,-0.22]"})
    tl.fromTo(".block-1 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.4, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl.fromTo(".block-1 .text", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 2.5, transform: 'translateY(-560px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl.to(".menu", {duration: 3, translateY: '-300px'}, 0).to("#trigger", {duration: 4, translateX: '30vw'}, 0)
    tl.fromTo("header .line-1", {filter: 'opacity(0.5)', right: 0}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '50%', ease: "[0.74,0.2,1,-0.22]"})
  
    // .to(".item .text", {duration: 4, transform: 'translateY(0px) scaleY(0)'}, 0).to(".item .text", { duration: 2, transform: 'translateY(0px) scaleY(4.5)'}, 0)
    // .fromTo("header", {background: "linear-gradient(to bottom, rgba(229,229,229,0) 0%,rgba(0,0,0,0) 100%)"}, {background: "linear-gradient(to bottom, rgba(229,229,229,0.65) 0%,rgba(0,0,0,0) 100%)"})

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items2 .item.active",
        repeat: true,
        pin: ".items2",
        start: "0 0",
        scrub: 2,
        end: "+=350%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    
    tl2.fromTo(".block-2 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo(".block-2 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo(".block-2 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-900px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo("header .line-1", {filter: 'opacity(0.5)', right: '50%'}, {delay: 1.7, duration: 2.5, filter: 'opacity(1)', right: '33%', ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo("header .line-2", {filter: 'opacity(0.5)', right: '40px'}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '66%', ease: "[0.74,0.2,1,-0.22]"})
    // tl2.fromTo("header .line-3", {filter: 'opacity(0)', right: 0}, {delay: 0.7, duration: 0.5, filter: 'opacity(0)', right: 0, ease: "[0.74,0.2,1,-0.22]"}, 0)

    let tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items3 .item.active",
        repeat: true,
        pin: ".items3",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    tl3.fromTo(".block-3 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo(".block-3 .text", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo("header .line-1", {filter: 'opacity(0.5)', right: '33%'}, {delay: 1.7, duration: 2.5, filter: 'opacity(1)', right: '25%', ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo("header .line-2", {filter: 'opacity(0.5)', right: '66%'}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '50%', ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo("header .line-3", {filter: 'opacity(0.5)', right: 0}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '75%', ease: "[0.74,0.2,1,-0.22]"})

    let tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items4 .item.active",
        repeat: true,
        pin: ".items4",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    tl4.fromTo(".block-4 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl4.fromTo(".block-4 .text", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    
    tl4.fromTo("header .line-1", {filter: 'opacity(0.5)', right: '25%'}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '25%', ease: "[0.74,0.2,1,-0.22]"}, 0)
    tl4.fromTo("header .line-2", {filter: 'opacity(0.5)', right: '50%'}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '50%', ease: "[0.74,0.2,1,-0.22]"}, 0)
    tl4.fromTo("header .line-3", {filter: 'opacity(0.5)', right: '75%'}, {delay: 0.7, duration: 0.5, filter: 'opacity(1)', right: '75%', ease: "[0.74,0.2,1,-0.22]"}, 0)

    let tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items5 .item.active",
        repeat: true,
        pin: ".items5",
        start: "0 0",
        scrub: 1,
        end: "+=100%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    
    tl5.fromTo("header .line-1", {filter: 'opacity(0)', right: '25%'}, {delay: 0.7, duration: 2.5, filter: 'opacity(0)', right: 0, ease: "[0.74,0.2,1,-0.22]"}, 0)
    tl5.fromTo("header .line-2", {filter: 'opacity(0)', right: '50%'}, {delay: 0.7, duration: 2.5, filter: 'opacity(0)', right: 0, ease: "[0.74,0.2,1,-0.22]"}, 0)
    tl5.fromTo("header .line-3", {filter: 'opacity(0)', right: '75%'}, {delay: 0.7, duration: 2.5, filter: 'opacity(0)', right: 0, ease: "[0.74,0.2,1,-0.22]"}, 0)

    tl5.fromTo("header .border", {height: 'calc(100vh - 80px)', top: '40px', bottom: 'auto'}, {delay: 2.7, duration: 4.5, height: '20vh', top: '60%', ease: "[0.74,0.2,1,-0.22]"})

    tl5.fromTo(".block-5 .title", {transform: 'translateY(0px) scaleY(3)', lineHeight: 0.8}, {delay: 0.3, duration: 3, transform: 'translateY(50px) scaleY(1)', lineHeight: 1.2, ease: "[0.74,0.2,1,-0.22]"})
    tl5.fromTo(".block-5 .text", {transform: 'translateY(50px) scale(0.4)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(0px) scale(1)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})

    function aClass(){
      items.classList.add("active");
    }

    function rClass(){
      items.classList.remove("active");
    }

    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    ScrollTrigger.refresh();

});



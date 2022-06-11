// import * as THREE from 'three';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Cursor from './cursor';
import {preloader} from './preloader';
import LocomotiveScroll from 'locomotive-scroll';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const menuEl = document.querySelector('[data-scroll-container]');

// new ResizeObserver(() => scroll.update()).observe(document.querySelector("[data-scroll-container]"))

preloader('.item').then(() => {
    const scroll = new LocomotiveScroll({el: menuEl, smooth: true, lerp: 0.1});
    const cursor = new Cursor(document.querySelector('.cursor'));
    const target = document.querySelector('.item.active');
    const items = document.querySelector('section');
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

    const settings = {
      size: 150,
      angle: 0,
      scale: 0,
      iterations: 10,
      speed: 0.3,
      offset: 0,
      slices: 12
    };

    let canvasWidth, canvasheight;
    let canvas = document.querySelector('#ctx');
    let context = canvas.getContext('2d');
    let bufferCanvas = document.createElement('canvas');
    let bufferContext = bufferCanvas.getContext('2d');
    
    window.addEventListener('resize', resize);
    resize();
    function resize() {
      canvasWidth = bufferCanvas.width = canvas.width = window.innerWidth;
      canvasheight = bufferCanvas.height = canvas.height = window.innerHeight;
      bufferContext.translate(canvasWidth * 0.5, canvasheight);
      bufferContext.strokeStyle = '#c3c3c3';
    }
    
    function draw() {
      requestAnimationFrame(draw);
      let points = [];
      bufferContext.save();
      bufferContext.setTransform(1, 0, 0, 1, 0, 0);
      bufferContext.clearRect(0, 0, canvasWidth, canvasheight);
      bufferContext.restore();
      bufferContext.beginPath();
      bufferContext.moveTo(0, 0);
      bufferContext.lineTo(0, -settings.size * settings.scale);
      bufferContext.stroke();
      drawShape({x: 0, y: -settings.size * settings.scale, angle: -Math.PI * 0.5, size: settings.size});
      for (var i = 0; i < settings.iterations; i++) {
        for (var j = points.length - 1; j >= 0; j--) {
          drawShape(points.pop());
        }
      }
      function drawShape(point) {
        drawBranch(point, 1); // Branch right
        drawBranch(point, -1); // Branch left
      }
      function drawBranch(point, direction) {
        let angle = point.angle + (settings.angle * direction + settings.offset);
        let size = point.size * settings.scale;
        let x = point.x + Math.cos(angle) * size;
        let y = point.y + Math.sin(angle) * size;
        bufferContext.beginPath();
        bufferContext.moveTo(point.x, point.y);
        bufferContext.lineTo(x, y);
        bufferContext.stroke();
        points.unshift({x: x, y: y, angle: angle, size: size});
      }
      let side1 = canvasWidth * 0.5;
      let side2 = canvasheight * 0.5;
      let radius = Math.sqrt(side1 * side1 + side2 * side2);
      bufferContext.globalCompositeOperation = 'destination-in';
      bufferContext.fillStyle = '#c3c3c3';
      bufferContext.beginPath();
      bufferContext.arc(0, 0, radius, -(Math.PI * 0.5 + (Math.PI / settings.slices)), -(Math.PI * 0.5 - (Math.PI / settings.slices)));
      bufferContext.lineTo(0, 0);
      bufferContext.closePath();
      bufferContext.fill();
      bufferContext.globalCompositeOperation = 'source-over';
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvasWidth, canvasheight);
      context.translate(canvasWidth * 0.5, canvasheight * 0.5);
      for (var i = 0; i < settings.slices; i++) {
        context.rotate(Math.PI * 2 / settings.slices);
        context.drawImage(bufferCanvas, -canvasWidth * 0.5, -canvasheight);
      }
    }  
    draw();
    
    const music = document.querySelector(".music");

    gsap.set(settings, {offset: 0})
    gsap.set(settings, {scale: 0})
    gsap.set(settings, {angle: 0})

    let tl0 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items0",
        repeat: true,
        pin: ".items0",
        start: "0 0",
        scrub: 1.8,
        end: "+=171%",
        id: "#b0",
        // markers: true,
        // onEnter: () => {
        //   music.play()
        // }
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    tl0.set("header .line-1, header .line-2, header .line-3", {opacity: 0, transform: 'translateX(0px)'})
    tl0.fromTo(music, {playbackRate: 0.99, volume: 0.63}, {duration: 0.4, playbackRate: 1, volume: 0.63})
    tl0.fromTo("#circles", {filter: "blur(0px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl0.fromTo(".block-0 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1}, {delay: 0.3, duration: 12, opacity: 0.8, transform: 'translateY(-180px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl0.fromTo(".block-0 .text", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.1, duration: 12, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.6, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    tl0.to("#circles", {duration: 1.9, filter: "blur(2px)"})
    tl0.to(music, {playbackRate: 0.09, volume: 0.45})
    // tl0.to(".menu", {duration: 3, translateY: '-300px'}, 0)
    .to("#trigger", {duration: 4, translateX: '30vw'}, 0)
    .addLabel("b0", ">")
    
    let tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items1",
        repeat: true,
        pin: ".items1",
        start: "0 0",
        scrub: 1.8,
        end: "+=171%",
        id: "#b1",
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    tl1.set("header .line-1, header .line-2, header .line-3", {opacity: 0, transform: 'translateX(0px)'})
    tl1.fromTo(music, {playbackRate: 0.99, volume: 0.63}, {duration: 0.4, playbackRate: 1, volume: 0.63})
    tl1.fromTo("#circles", {filter: "blur(0px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl1.fromTo("header .border", {width: '1px'}, {delay: 4.8, duration: 4.5, width: 'calc(100vw - 80px)', ease: "[0.74,0.2,1,-0.22]"})
    tl1.fromTo(".item .border", {borderColor: '#000'}, {delay: 2.7, duration: 4.5, borderColor: '#fff', ease: "[0.74,0.2,1,-0.22]"})
    tl1.fromTo(".block-1 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1}, {delay: 0.3, duration: 12, opacity: 0.8, transform: 'translateY(-180px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl1.fromTo(".block-1 .text", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 12, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.6, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    tl1.to("#circles", {duration: 1.9, filter: "blur(2px)"})
    tl1.to(music, {playbackRate: 0.09, volume: 0.45})
    tl1.fromTo("header .line-1", {opacity: 0, transform: 'translateX(0px)'}, {delay: 0.5, duration: 0.5, opacity: 0.72, transform: 'translateX(-50vw)', ease: "[0.74,0.2,1,-0.22]"})
    tl1.fromTo("header .line-3", {opacity: 0, transform: 'translateX(0px)'}, {delay: 0.7, duration: 0.5, opacity: 0, transform: 'translateX(0px)', ease: "[0.74,0.2,1,-0.22]"})
    // tl1.fromTo(settings, {offset: 0}, {duration: 4, offset: 0}, 0)
    // tl1.fromTo(settings, {scale: 0.001}, {duration: 4, scale: 0.63}, 0)
    .addLabel("b1", ">")
  
    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items2",
        repeat: true,
        pin: ".items2",
        start: "0 0",
        scrub: 1.8,
        end: "+=171%",
        id: "#b2",
        // markers: true,
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    .addLabel("b2", 0)
    tl2.fromTo("#circles", {filter: "blur(2px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl2.fromTo(music, {playbackRate: 0.09, volume: 0.45}, {duration: 0.2, playbackRate: 1, volume: 0.63})
    tl2.fromTo("header .border", {padding: '0'}, {duration: 4.5, padding: '0'})
    tl2.fromTo(".block-2 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1}, {delay: 0.3, duration: 12, opacity: 0.8, transform: 'translateY(-180px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, ">1.8")
    tl2.fromTo(".block-2 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 10, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.6, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    tl2.fromTo(".block-2 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 10, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.6, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    tl2.to("#circles", {duration: 1.9, filter: "blur(2px)"})
    tl2.to(music, {playbackRate: 0.09, volume: 0.45})
    tl2.fromTo("header .line-1", {opacity: 0.4, transform: 'translateX(-50vw)'}, {delay: 1.7, duration: 2.5, opacity: 0.72, transform: 'translateX(-66vw)', ease: "[0.74,0.2,1,-0.22]"}, "-=2")
    tl2.fromTo("header .line-2", {opacity: 0, transform: 'translateX(0px)'}, {delay: 0.7, duration: 0.5, opacity: 0.72, transform: 'translateX(-34vw)', ease: "[0.74,0.2,1,-0.22]"}, "-=2")
    tl2.fromTo("header .line-3", {opacity: 0, transform: 'translateX(0px)'}, {delay: 0.7, duration: 0.5, opacity: 0, transform: 'translateX(0px)', ease: "[0.74,0.2,1,-0.22]"}, "-=2")
    // tl2.fromTo(settings, {offset: 0}, {duration: 4, offset: 0}, 0)
    // tl2.fromTo(settings, {scale: 0.63}, {duration: 4, scale: 0.63}, 0)

    let tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items3",
        repeat: true,
        pin: ".items3",
        start: "0 0",
        scrub: 1.8,
        end: "+=171%",
        id: "#b3",
        // markers: true,
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    .addLabel("b3", 0)
    tl3.fromTo("#circles", {filter: "blur(2px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl3.fromTo(music, {playbackRate: 0.09, volume: 0.45}, {duration: 0.2, playbackRate: 1, volume: 0.63})
    tl3.fromTo("header .border", {padding: '0'}, {duration: 4.5, padding: '0'})
    tl3.fromTo(".block-3 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1}, {delay: 0.3, duration: 12, opacity: 0.8, transform: 'translateY(-180px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, ">1.8")
    tl3.fromTo(".block-3 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 10, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.6, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    tl3.fromTo(".block-3 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 10, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.6, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    tl3.fromTo(".block-3 .text-3", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 10, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.6, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    tl3.to("#circles", {duration: 1.9, filter: "blur(2px)"})
    tl3.to(music, {playbackRate: 0.09, volume: 0.45})
    tl3.fromTo("header .line-1", {opacity: 0.4, transform: 'translateX(-66vw)'}, {delay: 1.7, duration: 2.5, opacity: 0.72, transform: 'translateX(-74vw)', ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo("header .line-2", {opacity: 0.4, transform: 'translateX(-34vw)'}, {delay: 0.7, duration: 0.5, opacity: 0.72, transform: 'translateX(-50vw)', ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo("header .line-3", {opacity: 0.4, transform: 'translateX(0px)'}, {delay: 0.7, duration: 0.5, opacity: 0.72, transform: 'translateX(-26vw)', ease: "[0.74,0.2,1,-0.22]"})
    // tl3.fromTo(settings, {offset: 0}, {duration: 4, offset: 0}, 0)
    // tl3.fromTo(settings, {scale: 0.63}, {duration: 4, scale: 0.71}, 0)

    let tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items4",
        repeat: true,
        pin: ".items4",
        start: "0 0",
        scrub: 1.8,
        end: "+=171%",
        id: "#b4",
        // markers: true,
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    .addLabel("b4", 0)
    // tl4.fromTo(settings, {angle: 1.3}, {delay: 0.1, duration: 8, angle: 1.5}, 0)
    tl4.fromTo("#circles", {filter: "blur(2px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl4.fromTo(music, {playbackRate: 0.09, volume: 0.45}, {duration: 0.2, playbackRate: 1, volume: 0.63})
    tl4.fromTo("header .border", {padding: '0'}, {duration: 4.5, padding: '0', ease: "[0.74,0.2,1,-0.22]"})
    tl4.fromTo(".block-4 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1}, {delay: 0.3, duration: 12, opacity: 0.8, transform: 'translateY(-180px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, ">1.8")
    tl4.fromTo(".block-4 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 10, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.6, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    tl4.fromTo(".block-4 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 10, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.6, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    tl4.fromTo(".block-4 .text-3, .block-4 .text-4", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 10, opacity: 0, transform: 'translateY(0px) scaleY(4)', lineHeight: 0.5, ease: "[0.74,0.2,1,-0.22]"}, ">-=8") 
    tl4.to("#circles", {duration: 1.9, filter: "blur(2px)"})
    tl4.to(music, {playbackRate: 0.09, volume: 0.45})
    tl4.fromTo("header .line-1", {opacity: 0.72, transform: 'translateX(-74vw)'}, {delay: 0.7, duration: 0.9, opacity: 0, transform: 'translateX(0px)', ease: "[0.74,0.2,1,-0.22]"}, "-=1.7")
    tl4.fromTo("header .line-2", {opacity: 0.72, transform: 'translateX(-50vw)'}, {delay: 0.7, duration: 0.9, opacity: 0, transform: 'translateX(0px)', ease: "[0.74,0.2,1,-0.22]"}, "<-=0.2")
    tl4.fromTo("header .line-3", {opacity: 0.72, transform: 'translateX(-26vw)'}, {delay: 0.7, duration: 0.9, opacity: 0, transform: 'translateX(0px)', ease: "[0.74,0.2,1,-0.22]"}, "<-=0.1")
    // tl4.fromTo(settings, {offset: 0}, {duration: 4, offset: 0}, 0)
    // tl4.fromTo(settings, {scale: 0.68}, {duration: 4, scale: 0.54}, 0)

    let tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items5",
        repeat: true,
        pin: ".items5",
        start: "0 0",
        scrub: 1.8,
        end: "+=171%",
        id: "#b5",
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    .addLabel("b5", 0)
    tl5.set("header .line-1, header .line-2, header .line-3", {opacity: 0, transform: 'translateX(0px)'})
    tl5.fromTo("#circles", {filter: "blur(2px)"}, {duration: 1.9, filter: "blur(0px)"})
    tl5.fromTo(music, {playbackRate: 0.09, volume: 0.45}, {duration: 0.2, playbackRate: 1, volume: 0.63})
    tl5.fromTo("header .border", {height: 'calc(100vh - 80px)', transform: 'translateY(40px)'}, {delay: 1.8, duration: 3.5, height: '20vh', transform: 'translateY(72vh)', ease: "[0.74,0.2,1,-0.22]"})
    tl5.fromTo(".block-5 .title", {transform: 'translateY(1000px) scaleY(2)', lineHeight: 0.8}, {delay: 0.3, duration: 12, transform: 'translateY(80px) scaleY(1)', lineHeight: 1, ease: "[0.74,0.2,1,-0.22]"}, "1.8")
    tl5.fromTo(".block-5 .text", {transform: 'translateY(50px) scale(0.4)', lineHeight: 1.2}, {delay: 0.2, duration: 10, transform: 'translateY(0px) scale(1)', lineHeight: 1, ease: "[0.74,0.2,1,-0.22]"}, ">-=8")
    // tl5.fromTo(settings, {offset: 0}, {delay: 0.11, duration: 4, offset: 0}, 0)
    // tl5.fromTo(settings, {scale: 0.54}, {delay: 0.11, duration: 4, scale: 0.45}, 0)
    // tl5.set(settings, {offset: 0, scale: 0, angle: 0})

    let tlTree = gsap.timeline({
      scrollTrigger: {
        start: "top center",
        end: "120%",
        scrub: 1.8,
      }
    });
    tlTree.set("#circles", {filter: "blur(0px)"})
    tlTree.set(settings, {offset: 0, scale: 0, angle: 0})
    tlTree.set(music, {playbackRate: 1, volume: 0.63})
    tlTree.to(settings, {angle: 0, scale: 0, duration: 1.8}, "b0+=0.01")
    tlTree.to(settings, {scale: 0.53, duration: 0.1}, "b1+=0.01")
    .addLabel("tree1", 0)
    tlTree.to(settings, {angle: 0.72, scale: 0.58, duration: 1.8}, ">")
    tlTree.to(settings, {angle: 0.4, scale: 0.5, duration: 1.8}, "b2+=0.01")
    .addLabel("tree2", 0)
    tlTree.to(settings, {angle: 0.63, scale: 0.63, duration: 1.8}, "b3+=0.01")
    .addLabel("tree3", 0)
    tlTree.to(settings, {angle: 0.3, scale: 0.6, iterations: 3, duration: 1.8}, "b4+=0.01")
    .addLabel("tree4", 0)
    tlTree.to(settings, {angle: 0.5, iterations: 2, duration: 1.8}, "b5+=0.01")

    // const btns = document.querySelectorAll('.menu a');
    // btns.forEach(function(btn) {
    //   btn.addEventListener('click', function(e){
    //     // var st = timeline.scrollTrigger;
    //     // var pos = st.start + (st.end - st.start) * (timeline.labels['section'] / timeline.duration());
    //     // gsap.to(window, {scrollTo: pos, overwrite: true, duration: 1});
    //     // gsap.to( window, {duration: 1, scrollTo: 2000} );
    //     tlTree.to( settings, {angle: 0.1, scale: 0.72, duration: 1} );
    //   });
    // })

    const menuItem1 = document.querySelector('.menu-item-1');
    const menuItem2 = document.querySelector('.menu-item-2');
    const menuItem3 = document.querySelector('.menu-item-3');
    const menuItem4 = document.querySelector('.menu-item-4');

    gsap.utils.toArray("nav a").forEach(function(a) {
      a.addEventListener("click", function(e) {
        e.preventDefault();
        const id = e.target.getAttribute("href"),
              trigger = ScrollTrigger.getById(id);
        gsap.to(window, {
          duration: 1,
          scrollTo: trigger ? trigger.start : id,
        });
      });
    });

    menuItem1.addEventListener("click", () => {
      tl0.timeScale(50.0).play(0, true)
      console.log('1');
    })

    menuItem2.addEventListener("click", () => {
      // tl0.timeScale(60.0).play(0, true)
      tl1.timeScale(50.0).play(0, true)
      tlTree.play("b1+=0.01")
      // tlTree.pause("b1+=0.1")
      console.log('2');
    })

    menuItem3.addEventListener("click", () => {
      // tl0.timeScale(70.0).play(0, true)
      // tl1.timeScale(60.0).play(0, true)
      tl2.timeScale(50.0).play(0, true)
      tlTree.play("b2+=0.01")
      console.log('3');
    })

    menuItem4.addEventListener("click", () => {
      // tl0.timeScale(80.0).play(0, true)
      // tl1.timeScale(70.0).play(0, true)
      // tl2.timeScale(60.0).play(0, true)
      tl3.timeScale(50.0).play(0, true)
      tlTree.play("b3+=0.01")
      console.log('4');
    })



    function aClass(){items.classList.add("active")}
    function rClass(){
      items.classList.remove("active");
    }
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();


    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    let renderers = {
    'circlesTrigger': (function() {
      let circles = [];
      let initialized = false;
      let height = 0;
      let width = 0;
      let init = function(config) {
        let count = config.count;
        width = config.width;
        height = config.height;
        let circleMaxWidth = (width*0.66) >> 0;
        let circlesEl = document.querySelector('#circles');
        for(var i = 0; i < count; i++ ){
          let node = document.createElement('div');
          node.style.width = node.style.height = (i/count*circleMaxWidth) + 'px';
          node.classList.add('circle');
          circles.push(node);
          circlesEl.appendChild(node);
        }
        initialized = true;
      };
      let max = 256;
      let renderFrame = function(frequencyData) {
        for(var i = 0; i < circles.length; i++) {
          let circle = circles[i];
          circle.style.cssText = '-webkit-transform:scale('+((frequencyData[i]/max))+')';
        }
      };
      return {
        init: init,
        isInitialized: function() {
          return initialized;
        },
        renderFrame: renderFrame
      }
    })()
  };
  function Visualization(config) {
    let audio,
      analyser,
      source,
      audioCtx,
      frequencyData,
      running = false,
      renderer = config.renderer,
      width = config.width || 360,
      height = config.height || 360;

    let init = function() {
      audio = document.querySelector(".music");
      audioCtx = new AudioContext();
      analyser = audioCtx.createAnalyser();
      source =  audioCtx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 64;
      frequencyData = new Uint8Array(analyser.frequencyBinCount);
      renderer.init({
        count: analyser.frequencyBinCount,
        width: width,
        height: height
      });
    };
    this.start = function() {
      running = true;
      audio.play();
      renderFrame();
    };
    this.stop = function() {
      running = false;
      audio.pause();
    };
    this.setRenderer = function(r) {
      if (!r.isInitialized()) {
        r.init({
          count: analyser.frequencyBinCount,
          width: width,
          height: height
        });
      } 
      renderer = r;
    };
    this.isPlaying = function() {
      return running;
    }
    let renderFrame = function() {
      analyser.getByteFrequencyData(frequencyData);
      renderer.renderFrame(frequencyData);
      if (running) {
        requestAnimationFrame(renderFrame);
      }
    };
    init();
  };
  let vis = document.querySelector('.initiator');
  let v = null;
  vis.onclick = (function() {
    return function() {
      let el = this;
      let id = el.parentNode.id;
      if (!v) {
        v = new Visualization({renderer: renderers[id] });
      }
      v.setRenderer(renderers[id]);
      if (v.isPlaying()) {
        v.stop();
        el.style.backgroundColor = '#cbff33';
      }else {
        v.start();
        el.style.backgroundColor = 'rgba(232,237,218,0.9)';
      }
    };
  })();
});













// console.clear();

// const renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
// const w = document.querySelector('.w');
// renderer.setSize(window.innerWidth, window.innerHeight);
// w.appendChild(renderer.domElement);

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//   80, window.innerWidth / window.innerHeight, 1, 1000
// );
// // camera.position.z = 540;
// camera.position.z = 7; /* for dino */
// camera.position.y = 1.5;

// let light = new THREE.DirectionalLight(0xefefff, 1.8);
// light.position.set(1, 1, 1).normalize();
// scene.add(light);

// window.addEventListener("resize", function () {
//   let width = window.innerWidth;
//   let height = window.innerHeight;
//   renderer.setSize(width, height);
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
// });

// const loader = new GLTFLoader();
// let mixer;
// let model;
// loader.load(
//   // "glass_circles_copy.gltf",
//   "dinosaur.glb",
//   function (gltf) {
//     gltf.scene.traverse(function (node) {
//       if (node instanceof THREE.Mesh) {
//         node.castShadow = true;
//         node.material.side = THREE.DoubleSide;
//       }
//     });

//     model = gltf.scene;
//     scene.add(model);

//     mixer = new THREE.AnimationMixer(model);
//     const action = mixer.clipAction(gltf.animations[0]);
//     action.play();
//     createAnimation(mixer, action, gltf.animations[0]);
//   }
// );

// const clock = new THREE.Clock();
// function render() {
//   requestAnimationFrame(render);
//   const delta = clock.getDelta();
//   if (mixer != null) mixer.update(delta);
//   // if (model) model.rotation.y += 0.0025;

//   renderer.render(scene, camera);
// }

// render();

// function createAnimation(mixer, action, clip) {
//   let proxy = {
//     get time() {
//       return mixer.time;
//     },
//     set time(value) {
//       action.paused = false;
//       mixer.setTime(value);
//       action.paused = true;
//     }
//   };

//   let scrollingTL = gsap.timeline({
//     scrollTrigger: {
//       // trigger: renderer.domElement,
//       start: "top center",
//       end: "bottom center",
//       scrub: 1,
//       onUpdate: function () {
//         camera.updateProjectionMatrix();
//       }
//     }
//   });

//   scrollingTL.to(proxy, {
//     time: clip.duration,
//     repeat: 0
//   });
// }

// // init();
// // animate();

// // function init() {
// //   gsap.to('.w', {
// //     scrollTrigger: {
// //       trigger: renderer.domElement,
// //       start: "top center",
// //       end: "bottom top",
// //       scrub: true,
// //       toggleActions: "restart pause resume pause"
// //     },
// //     y: Math.PI
// //   });
// //   gsap.to('.w', {duration: 3, translateY: '-300px'}, 0)
// // }

// // function animate() {
// //   requestAnimationFrame(animate);
// //   renderer.render(scene, camera);
// // }


// function onMouseMove(e) {
//   const x = e.clientX
//   const y = e.clientY

//   gsap.to(scene.rotation, {
//     y: gsap.utils.mapRange(0, window.innerWidth, 1, -1, x),
//     x: gsap.utils.mapRange(0, window.innerHeight, 1, -1, y),
//   })
// }
// window.addEventListener('mousemove', onMouseMove)
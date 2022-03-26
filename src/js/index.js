import * as THREE from 'three';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from './cursor';
import {preloader} from './preloader';
import LocomotiveScroll from 'locomotive-scroll';
/* for menu cursor gifs
  import Menu from './menu';
*/

gsap.registerPlugin(ScrollTrigger);

const menuEl = document.querySelector('[data-scroll-container]');

preloader('.item').then(() => {
    const scroll = new LocomotiveScroll({el: menuEl, smooth: true});
    const cursor = new Cursor(document.querySelector('.cursor'));
    /* for menu cursor gifs
    new Menu(menuEl);
    */

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
        trigger: ".item1",
        repeat: true,
        pin: ".items1",
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
    tl.fromTo("header .line-1", {opacity: 0.5, right: 0}, {delay: 0.7, duration: 0.5, opacity: 1, right: '50%', ease: "[0.74,0.2,1,-0.22]"})
    tl.fromTo("header .line-3", {opacity: 0.5, right: 0}, {delay: 0.7, duration: 0.5, opacity: 1, right: 0, ease: "[0.74,0.2,1,-0.22]"})
  
    // .to(".item .text", {duration: 4, transform: 'translateY(0px) scaleY(0)'}, 0).to(".item .text", { duration: 2, transform: 'translateY(0px) scaleY(4.5)'}, 0)
    // .fromTo("header", {background: "linear-gradient(to bottom, rgba(229,229,229,0) 0%,rgba(0,0,0,0) 100%)"}, {background: "linear-gradient(to bottom, rgba(229,229,229,0.65) 0%,rgba(0,0,0,0) 100%)"})

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items2",
        repeat: true,
        pin: ".items2",
        start: "0 0",
        scrub: 2,
        end: "+=400%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    
    tl2.fromTo(".block-2 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-400px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "1.8")
    tl2.fromTo(".block-2 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo(".block-2 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-900px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.2")
    tl2.fromTo("header .line-1", {opacity: 0.5, right: '50%'}, {delay: 1.7, duration: 2.5, opacity: 1, right: '33%', ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo("header .line-2", {opacity: 0.5, right: 0}, {delay: 0.7, duration: 0.5, opacity: 1, right: '66%', ease: "[0.74,0.2,1,-0.22]"})
    tl2.fromTo("header .line-3", {opacity: 0.5, right: 0}, {delay: 0.7, duration: 0.5, opacity: 1, right: 0, ease: "[0.74,0.2,1,-0.22]"})

    let tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items3",
        repeat: true,
        pin: ".items3",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    tl3.fromTo(".block-3 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "1.8")
    tl3.fromTo(".block-3 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo(".block-3 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.2")
    tl3.fromTo(".block-3 .text-3", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.35")
    tl3.fromTo("header .line-1", {opacity: 0.5, right: '33%'}, {delay: 1.7, duration: 2.5, opacity: 1, right: '25%', ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo("header .line-2", {opacity: 0.5, right: '66%'}, {delay: 0.7, duration: 0.5, opacity: 1, right: '50%', ease: "[0.74,0.2,1,-0.22]"})
    tl3.fromTo("header .line-3", {opacity: 0.5, right: 0}, {delay: 0.7, duration: 0.5, opacity: 1, right: '75%', ease: "[0.74,0.2,1,-0.22]"})

    let tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items4",
        repeat: true,
        pin: ".items4",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })

    tl4.fromTo(".block-4 .title", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.3, duration: 3, transform: 'translateY(-300px) scaleY(4.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "1.8")
    tl4.fromTo(".block-4 .text-1", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})
    tl4.fromTo(".block-4 .text-2", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.2")
    tl4.fromTo(".block-4 .text-3, .block-4 .text-3", {transform: 'translateY(0px) scaleY(1)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(-500px) scaleY(3.5)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"}, "<+=0.35") 
    tl4.fromTo("header .line-1", {opacity: 0.5, right: '25%'}, {delay: 1.7, duration: 0.9, opacity: 1, right: '0%', ease: "[0.74,0.2,1,-0.22]"}, 2.8)
    tl4.fromTo("header .line-2", {opacity: 0.5, right: '50%'}, {delay: 0.7, duration: 0.9, opacity: 1, right: '0%', ease: "[0.74,0.2,1,-0.22]"}, "<+=0.2")
    tl4.fromTo("header .line-3", {opacity: 0.5, right: '75%'}, {delay: 0.7, duration: 0.9, opacity: 1, right: '0%', ease: "[0.74,0.2,1,-0.22]"}, "<+=0.35")

    let tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".items5",
        repeat: true,
        pin: ".items5",
        start: "0 0",
        scrub: 2,
        end: "+=270%"
      },
      onComplete: aClass,
      onUpdate: rClass
    })
    
    tl5.fromTo("header .line-1", {opacity: 0.5, right: 0}, {delay: 0.7, duration: 1.5, opacity: 0.5, right: 0, ease: "[0.74,0.2,1,-0.22]"})
    tl5.fromTo("header .line-2", {opacity: 0.5, right: 0}, {delay: 0.7, duration: 0.5, opacity: 0.5, right: 0, ease: "[0.74,0.2,1,-0.22]"})
    tl5.fromTo("header .line-3", {opacity: 0.5, right: 0}, {delay: 0.7, duration: 0.5, opacity: 0.5, right: 0, ease: "[0.74,0.2,1,-0.22]"})
    tl5.fromTo("header .border", {height: 'calc(100vh - 80px)', top: '40px', bottom: 'auto'}, {delay: 2.7, duration: 4.5, height: '20vh', top: '60%', ease: "[0.74,0.2,1,-0.22]"})
    tl5.fromTo(".block-5 .title", {transform: 'translateY(0px) scaleY(3)', lineHeight: 0.8}, {delay: 0.3, duration: 3, transform: 'translateY(50px) scaleY(1)', lineHeight: 1.2, ease: "[0.74,0.2,1,-0.22]"}, "1.8")
    tl5.fromTo(".block-5 .text", {transform: 'translateY(50px) scale(0.4)', lineHeight: 1.2}, {delay: 0.2, duration: 2.5, transform: 'translateY(0px) scale(1)', lineHeight: 0.8, ease: "[0.74,0.2,1,-0.22]"})

    // class Tree {

    //   constructor() {
    //       this.body = document.querySelectorAll("body")[0]
    //       this.canvas = document.querySelector('#ctx')
    //       this.Drange = document.querySelector('.tree-degr')
    //       this.ctx = this.canvas.getContext('2d')
    //       this.ctx.lineWidth = 1
    //       this.ctx.strokeStyle = 'white'
          
    //       this.degrBase = 1
    //       this.degr = this.degrBase
    
    //       this.set_default()
    //       this.handleRange()
    //   }
    
    //   set_default() {
    //       this.length = 133 // первоначальная длинна лнии
    //       this.step_value = 10 // кол-во шагов (рисования)
          
    //       this.baseX = 500 // дефолтная ширина
    //       this.baseY = 600 // дефолтная высота (в самом низу)
          
    //       // координаты столба дерева
    //       this.lineX = 500
    //       this.lineY = 416
    //   }
    
    //   handleRange() {
    //       // this.Drange.addEventListener('click', (e)=>{
    //       //   this.rangeFunc(Number(e.target.value))
    //       // }, false)
    //       this.body.addEventListener('wheel', (e)=>{
    //         this.rangeFunc(Number(this.Drange.value));
    //       }, false)
    //   }
    
    //   rangeFunc(value) {
    //       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    //       this.degrBase = value
    //       this.degr = value
    //       this.set_default()
    //       this.makeTree()      
    //   }
    
    //   makeTree() {
    //       // отрисовываем столб дерева
    //       this.ctx.beginPath()                     // clear field
    //       this.ctx.moveTo(this.baseX, this.baseY); // передвигаем перо
    //       this.ctx.lineTo(this.lineX, this.lineY); // рисуем линию
    
    //       this.createBranch(this.step_value, true, this.degr, this.length, this.lineX, this.lineY)
    
    //       this.set_default()
    //       this.ctx.moveTo(this.lineX, this.lineY); // передвигаем перо
    //       this.degr = this.degrBase
    
    //       this.createBranch(this.step_value, false, this.degr, this.length, this.lineX, this.lineY)
    
    //       this.ctx.stroke()
    //       this.ctx.closePath()
    //   }
    
    //   createBranch(stepValue = 10, sideBool = true, degr = 45, length, lineX, lineY) {
    //       let direction = sideBool ? 'right' : 'left'
    
    //       if(stepValue > 0) {
    //           // processing
    //           let result = this.count_angle(degr, length, lineX, lineY, direction)
    //           this.ctx.moveTo(lineX, lineY)
    //           this.ctx.lineTo(result.lineX, result.lineY)
    
    //           length = length / 1.6
      
    //           stepValue--
    //           this.createBranch(stepValue, sideBool, (degr - Number(this.degrBase)), length, result.lineX, result.lineY)
    //           this.createBranch(stepValue, sideBool, (degr + Number(this.degrBase)), length, result.lineX, result.lineY)
    //       }
    //   }
    
    //   count_angle(degr, length, lineX, lineY, side) {
    //       degr = Number(degr)
    
    //       if(degr <= 0) degr = 360 + degr
    
    //       if(degr > 0 && degr < 90) {
    //           let result = this.do_1_section_new(lineX, lineY, length, degr, side)
    //           lineX = result.lineX
    //           lineY = result.lineY
    //       }
    //       if(degr > 90 && degr < 180) {
    //           let result = this.do_2_section_new(lineX, lineY, length, degr, side)
    //           lineX = result.lineX
    //           lineY = result.lineY
    //       }
    //       if(degr > 180 && degr < 270) {
    //           let result = this.do_3_section_new(lineX, lineY, length, degr, side)
    //           lineX = result.lineX
    //           lineY = result.lineY
    //       }
    //       if(degr > 270 && degr < 360) {
    //           let result = this.do_4_section_new(lineX, lineY, length, degr, side)
    //           lineX = result.lineX
    //           lineY = result.lineY
    //       }
    
    //       if(degr == 90)  lineY -= length
    
    //       if(degr == 180) {
    //           if(side == "right") {
    //               lineX -= length
    //           }
    //           if(side == "left") {
    //               lineX += length
    //           }
    //       }
    //       if(degr == 270) lineY += length
    
    //       if(degr == 360) {
    //           if(side == "right") {
    //               lineX += length
    //           }
    //           if(side == "left") {
    //               lineX -= length
    //           }
    //       }
    
    //       return {
    //           "lineY": lineY,
    //           "lineX": lineX
    //       }
    //   }
    
    //   do_1_section_new(lineX, lineY, length, degr, side) {
    //       let radian = degr * Math.PI / 180
    //       let sin = Math.sin(radian)
    //       let cos = Math.cos(radian)
    //       let yLength = length * sin
    //       let xLength = length * cos
    //       if(side == "right") {
    //           lineX += xLength
    //           lineY -= yLength
    //       }
    //       if(side == "left") {
    //           lineX -= xLength
    //           lineY -= yLength
    //       }
    //       return {
    //           "lineY": lineY,
    //           "lineX": lineX
    //       }
    //   }
    
    //   do_2_section_new(lineX, lineY, length, degr, side) {
    //       degr = degr - 90
    //       let radian = degr * Math.PI / 180
    //       let sin = Math.sin(radian)
    //       let cos = Math.cos(radian)
    //       let xLength = length * sin
    //       let yLength = length * cos
    //       if(side == "right") {
    //           lineX -= xLength
    //           lineY -= yLength
    //       }
    //       if(side== "left") {
    //           lineX += xLength
    //           lineY -= yLength
    //       }
    //       return {
    //           "lineY": lineY,
    //           "lineX": lineX
    //       }
    //   }
    
    //   do_3_section_new(lineX, lineY, length, degr, side) {
    //       degr = degr - 180
    //       let radian = degr * Math.PI / 180
    //       let sin = Math.sin(radian)
    //       let cos = Math.cos(radian)
    //       let xLength = length * sin
    //       let yLength = length * cos
    //       if(side == "right") {
    //           lineX -= xLength
    //           lineY += yLength
    //       }
    //       if(side == "left") {
    //           lineX += xLength
    //           lineY += yLength
    //       }
    //       return {
    //           "lineY": lineY,
    //           "lineX": lineX
    //       }
    //   }
    
    //   do_4_section_new(lineX, lineY, length, degr, side) {
    //       degr = degr - 270
    //       let radian = degr * Math.PI / 180
    //       let sin = Math.sin(radian)
    //       let cos = Math.cos(radian)
    //       let xLength = length * sin
    //       let yLength = length * cos
    //       if(side == "right") {
    //           lineX += xLength
    //           lineY += yLength
    //       }
    //       if(side == "left") {
    //           lineX -= xLength
    //           lineY += yLength
    //       }
    //       return {
    //           "lineY": lineY,
    //           "lineX": lineX
    //       }
    //   }
  
     
    // }
    
    // const Tree_ex = new Tree()
    //     Tree_ex.makeTree()




    const settings = {
      size: 150,
      angle: 0.4,
      scale: 0.67,
      iterations: 10,
      animate: false,
      speed: 0.3,
      offset: 0,
      slices: 13
    };

    var w = document.querySelector('.canvas');
    
    var width, height;
    var canvas = document.querySelector('#ctx');
    var context = canvas.getContext('2d');
    
    var bufferCanvas = document.createElement('canvas');
    var bufferContext = bufferCanvas.getContext('2d');
    // document.body.insertBefore(bufferCanvas, w);
    
    window.addEventListener('resize', resize);
    resize();
    
    function resize() {
        width = bufferCanvas.width = canvas.width = window.innerWidth;
        height = bufferCanvas.height = canvas.height = window.innerHeight;
        
        bufferContext.translate(width * 0.5, height);
        bufferContext.strokeStyle = '#c3c3c3';
    }
    
    function draw() {
        requestAnimationFrame(draw);
    
        if (settings.animate) {
          settings.angle += 0.02 * settings.speed;
          // angle += settings.angle;
          
      
         
        }
          
        var points = [];
    
        // Clear canvas
        bufferContext.save();
        bufferContext.setTransform(1, 0, 0, 1, 0, 0);
        bufferContext.clearRect(0, 0, width, height);
        bufferContext.restore();
    
        // Draw stem
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
            var angle = point.angle + (settings.angle * direction + settings.offset);
            var obj = {angle:0};
            var size = point.size * settings.scale;
            var x = point.x + Math.cos(angle) * size;
            var y = point.y + Math.sin(angle) * size;
    
            bufferContext.beginPath();
            bufferContext.moveTo(point.x, point.y);
            bufferContext.lineTo(x, y);
            bufferContext.stroke();
    
            points.unshift({x: x, y: y, angle: angle, size: size});

            
        }
    
        var side1 = width * 0.5;
        var side2 = height * 0.5;
        var radius = Math.sqrt(side1 * side1 + side2 * side2);
      
        bufferContext.globalCompositeOperation = 'destination-in';
        bufferContext.fillStyle = 'red';
        bufferContext.beginPath();
      
        // Nice variation
        // bufferContext.arc(0, 0, radius, -(Math.PI * 0.8 + (Math.PI / settings.slices)), -(Math.PI * 0.5 - (Math.PI / settings.slices)));
        bufferContext.arc(0, 0, radius, -(Math.PI * 0.5 + (Math.PI / settings.slices)), -(Math.PI * 0.5 - (Math.PI / settings.slices)));
        bufferContext.lineTo(0, 0);
        bufferContext.closePath();
        bufferContext.fill();
        bufferContext.globalCompositeOperation = 'source-over';
    
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, width, height);
        context.translate(width * 0.5, height * 0.5);
        
        for (var i = 0; i < settings.slices; i++) {
            context.rotate(Math.PI * 2 / settings.slices);
            context.drawImage(bufferCanvas, -width * 0.5, -height);
        }
    
        
        
        
    }
    
    draw();
    

    let tlTree = gsap.timeline({
      scrollTrigger: {
        start: "top center",
        end: "bottom center",
        scrub: 2,
      }
    });
    tlTree.fromTo(settings, {angle: 0}, {delay: 0.1, duration: 3.4, angle: 1.14, onUpdate:drawCanvas})
    // tlTree.to(obj, 1, {angle:45, ease: "[0.74,0.2,1,-0.22]", onUpdate:drawCanvas});
    function drawCanvas() {
      console.log("angle:" + settings.angle);
    }



    


    function aClass(){
      items.classList.add("active");
    }

    function rClass(){
      items.classList.remove("active");
    }

    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    ScrollTrigger.refresh();

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
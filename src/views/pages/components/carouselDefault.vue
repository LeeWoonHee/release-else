<template>
  <section class="carousel">

    <!-- container   -->
    <div id="container"></div>

    <!--    <div class="scroll">-->
    <!--      스크롤을 올려주세요-->
    <!--    </div>-->

  </section>
</template>

<script>

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let geometry,
    intersects,
    mouse,
    SELECTED,
    camera,
    scene,
    raycaster,
    renderer,
    controls,
    container,
    portfolioItem = [],
    obj           = [],
    light,
    loader,
    lastPersent,
    planeGeometry,
    planeMaterial,
    floor,
    scrollPercent,
    gapX,
    gapY,
    box,
    clock,
    material;

export default {
  name      : "Room",
  props     : {
    portfolios: {
      type   : Array,
      default: null,
    },
  },
  watch     : {
    portfolios: {
      deep     : true,
      immediate: true,
      handler(val) {
        this.localPortfolios = val;
      },
    },
  },
  data      : () => ({
    localPortfolios: null,
    load           : false
  }),
  methods   : {
    init() {
      mouse = new THREE.Vector2();
      scene = new THREE.Scene();
      raycaster = new THREE.Raycaster();
      renderer = new THREE.WebGLRenderer(
          {
            antialias: true,
            alpha    : true
          }
      );
      geometry = new THREE.BoxGeometry(30, 20, .5);

      //container
      container = document.getElementById('container');

      container.appendChild(renderer.domElement);

      //intersects
      intersects = raycaster.intersectObjects(scene.children);

      //camera
      camera = new THREE.PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          20,
          10000
      );
      camera.position.set(40, 10.5, -27 );

      //renderer
      renderer.setSize(window.innerWidth, window.innerHeight);


      //controls
      controls = new OrbitControls(camera, renderer.domElement)
      // controls.enableZoom = false;
      // controls.enableDamping = true;
      // controls.dampingFactor = .2;
      // controls.enableRotate = false
      controls.target.set(0, 20, 0)
      controls.update()
      // controls.minDistance = -100;
      // controls.maxDistance = 200;

      //scene
      scene.background = null
      // scene.fog = new THREE.FogExp2(0x000000, .006)
      // scene.fog = new THREE.Fog(0x000000, -100, 500)

      //texture
      loader = new THREE.TextureLoader();
      loader.crossOrigin = '';
      //mesh
      for (let x = 0; x < 16; x++) {
        material = new THREE.MeshBasicMaterial( {map:loader.load(require(`@/assets/images/blogImage1.png`))} );
        box = new THREE.Mesh(geometry, material);
        scene.add(box);
        obj.push(box);
        obj[x].rotation.y = -0.25*x


      }

      //mesh position
      obj[0].position.set(15, 0, 0);
      obj[1].position.set(0, 0, 20);
      obj[2].position.set(-15, 0, 40);
      obj[3].position.set(-30, 0, 60);
      obj[4].position.set(-40, 0, 80);
      obj[5].position.set(-55, 0, 100);
      obj[6].position.set(-70, 0, 120);
      obj[7].position.set(-85, 0, 140);
      obj[8].position.set(-100, 0, 160);

      // 꺽임
      obj[9].position.set(-115, 0, 140);
      obj[10].position.set(-130, 0, 120);
      obj[11].position.set(-145, 0, 120);
      obj[12].position.set(-160, 0, 100);
      obj[13].position.set(-175, 0, 80);
      obj[14].position.set(-190, 0, 60);
      obj[15].position.set(-205, 0, 40);

      //clock
      clock = new THREE.Clock()
      gsap.registerPlugin(ScrollTrigger);
      locoScroll.on("scroll", ScrollTrigger.update);
      // for (let i = 0; i < scene.children.length; i++) {
      //   scene.children[i].type === 'PointLight' ? null : scene.children[i].geometry.type === 'BoxGeometry' ? portfolioItem.push(scene.children[i]) : null
      // }

      // container.addEventListener('mousemove', this.onDocumentMouseMove, false);
      // container.addEventListener('click', this.onDocumentMouseDown, false);
    },
    // onDocumentMouseMove(event) {
    //   intersects = raycaster.intersectObjects(portfolioItem);
    //   gapX = event.clientX - event.offsetX;
    //   gapY = event.clientY - event.offsetY;
    //   event.preventDefault();
    //   raycaster.setFromCamera(mouse, camera);
    //   intersects = raycaster.intersectObjects(scene.children);
    //
    //   this.$gsap.to(mouse, 0.5, {
    //     x: (event.clientX / window.innerWidth) * 2 - 1,
    //     y: -(event.clientY / window.innerHeight) * 2 + 1,
    //   })
    //
    //   if (intersects.length > 0) {
    //     if (SELECTED = intersects[0].object.geometry.type === 'BoxGeometry') {
    //
    //       SELECTED = intersects[0].object
    //       this.$gsap.to(SELECTED.rotation, {
    //         x: -mouse.y * 0.3,
    //         y: mouse.x * (Math.PI / 6),
    //       })
    //       this.$gsap.to(SELECTED.scale, {
    //         x       : 1.15,
    //         y       : 1.15,
    //         duration: .5,
    //       });
    //       container.style.cursor = 'pointer';
    //     }
    //   }
    //   else {
    //     for (let i = 0; i < scene.children.length; i++) {
    //       this.$gsap.to(scene.children[i].scale, {
    //         x       : 1,
    //         y       : 1,
    //         duration: .5,
    //       });
    //       container.style.cursor = 'auto';
    //     }
    //   }
    // },
    //클릭 이벤트
    // onDocumentMouseDown(event) {
    //   intersects = raycaster.intersectObjects(portfolioItem);
    //   event.preventDefault();
    //   //클릭 됐을때
    //   if (intersects.length > 0) {
    //     window.location.href = intersects[0].object.userData.URL;
    //   }
    // },
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    },
    render() {
      this.$emit('loading', true)
    },
    animate() {
      const t = clock.getElapsedTime()
      requestAnimationFrame(this.animate);
      renderer.render(scene, camera);

      // box.geometry.vertices.map(v => {
      //   const waveX1 = .1
      //   const waveX2 = 3 * Math.sin(v.x * 3 + t * 2)
      //   const waveY1 = 5
      //   v.z = (waveX1 + waveX2 + waveY1)
      // })

      this.initGsap();
      box.geometry.verticesNeedUpdate = true
      this.$scrollTrigger.refresh()


    },
    initGsap() {
      return this.$gsap.timeline({
        scrollTrigger: {
          scroller           : "#wrapper",
          trigger            : "section.carousel",
          invalidateOnRefresh: true,
          preventOverlaps    : true,
          fastScrollEnd      : true,
          pin                : true,
          scrub              : 7,
          start              : "top",
          end                : "bottom",
          toggleActions      : 'restart none reverse none',
        }
      })
          .fromTo(camera.position, {
                x: 0,
                y: -20,
                z: 70,
              },
              {
                duration: 15,
                x       : 10,
                y       : -30,
                z       : 50,
              }, 'a')
          // .to(camera.position, {
          //   duration: 15,
          //   x       : 40,
          //   y       : -30,
          //   z       : 50,
          // })
          // .to(camera.position, {
          //   duration: 15,
          //   x       : 80,
          //   y       : -30,
          //   z       : 50,
          // })
          // .to(camera.position, {
          //   duration: 15,
          //   x       : 120,
          //   y       : -30,
          //   z       : 50,
          // })
          // .to(camera.position, {
          //   duration: 15,
          //   x       : 76,
          //   y       : -30,
          //   z       : 100,
          // })
          // .to(camera.position, {
          //   duration: 15,
          //   x       : 65,
          //   y       : -30,
          //   z       : 0,
          // })
          .fromTo('.carousel', {
                zIndex : 2,
                opacity: 1,
                filter : 'blur(0px)'
              },
              {
                zIndex  : 1,
                duration: 8,
                opacity : 0,
                filter  : 'blur(10px)'
              }, '-=2');

    },
    setGsap() {
      let media = this.$gsap.matchMedia()
      media.add('(min-width: 1025px)', () => {
        if (this.timeline) {
          this.timeline.kill()
          this.timeline = null
        }
        this.timeline = this.initGsap()
        return () => {
          if (this.timeline) {
            this.timeline.kill()
            this.timeline = null
          }
        }
      })
      //     .add('(max-width: 1024px)', () => {
      //   if (this.timeline) {
      //     this.timeline.kill()
      //     this.timeline = null
      //   }
      //   this.timeline = this.initMGsap()
      //   return () => {
      //     if (this.timeline) {
      //       this.timeline.kill()
      //       this.timeline = null
      //     }
      //   }
      // })
      this.$scrollTrigger.refresh()
    },
  },
  mounted() {

    this.$nextTick(() => {
      this.init();
      this.setGsap();
    })

    window.addEventListener('resize', this.onWindowResize);


  },
  beforeDestroy() {
    cancelAnimationFrame(this.animate);
    window.removeEventListener('resize', this.onWindowResize);
    // container.removeEventListener('mousemove', this.onDocumentMouseMove, false);
  },
};
</script>

<style scoped lang="scss">

.carousel::v-deep {
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: #000;

  .title {
    position: absolute;
    width: 100%;
    right: 0;
    bottom: 0;
    color: #fff;
    font-size: 5.729vw; //110px
    font-weight: 700;
    line-height: 5.729vw; //110px
    z-index: 3;
  }

  #container {
    position: relative;
    height: 100%;
    width: 100%;
    background: transparent;
    z-index: 2;
  }

  .scroll {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    bottom: 18%;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
<template>
  <section class="carousel">

    <!-- container   -->
    <div class="card-model"></div>


    <!--    <div id="container"></div>-->


    <!--    <div class="scroll">-->
    <!--      스크롤을 올려주세요-->
    <!--    </div>-->
    <!--    <div-->
    <!--        class="fixed top-0 left-0 text-white"-->
    <!--        style="z-index: 10000000;"-->
    <!--    >-->
    <!--      <div>-->
    <!--        카메라-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        x : {{ x }}-->
    <!--        <div @click="() => setCamera(-.01, null, null)">-0.01</div>-->
    <!--        <div @click="() => setCamera(.01, null, null)">+0.01</div>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        y : {{ y }}-->
    <!--        <div @click="() => setCamera(null, -.01, null )">-0.01</div>-->
    <!--        <div @click="() => setCamera(null, .01, null )">+0.01</div>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        z : {{ z }}-->
    <!--        <div @click="() => setCamera(null, null, -.01)">-0.01</div>-->
    <!--        <div @click="() => setCamera(null, null, .01)">+0.01</div>-->
    <!--      </div>-->
    <!--    </div>-->
  </section>
</template>


<script>


import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Circ } from "gsap"

let container,
    camera,
    scene,
    renderer,
    material,
    mesh,
    box,
    pivot,
    geometry,
    carousel,
    loader,
    font,
    group,
    cube,
    fog,
    obj = [],
    clock,
    light,
    currentTimeLine,
    controls,
    aimTimeLine;

export default {
  name: "Carousel",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.$nextTick( () => {
      this.init();
      this.setGsap();
    } )
  },
  beforeDestroy() {
    this.timeline.kill()
  },
  methods: {
    // setCamera( x, y, z ) {
    //   console.log( 'hi' )
    //   camera.rotation.x += ( x || 0 )
    //   camera.rotation.y += ( y || 0 )
    //   camera.rotation.z += ( z || 0 )
    // },
    goTo( index ) {
      const scrollLength = window.innerHeight * ( window.innerHeight / document.body.offsetHeight )
      if(index < 9){
        window.locoScroll.scrollTo( scrollLength * ( ( index + 1   ) / 21 ) )
      }else {
        window.locoScroll.scrollTo( scrollLength * ( ( index ) / 15 ) )
        if(index ===14){
          window.locoScroll.scrollTo( scrollLength)
        }
      }

    },
    init() {
      container = document.querySelector( ".carousel" );
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 1000 );
      renderer = new THREE.WebGLRenderer( {
        antialias: true,
        alpha: true
      } );
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );
      //fog
      scene.background = new THREE.Color( 0x000000 );
      scene.fog = new THREE.FogExp2( 0x000000, .006 )

      loader = new THREE.TextureLoader();
      loader.crossOrigin = '';

      geometry = new THREE.BoxGeometry( 30, 20, .2 );

      for( let x = 0; x < 15; x++ ) {
        material = new THREE.MeshBasicMaterial( { map: loader.load( require( `@/assets/images/pages/home/releas_${ x + 1 }.png` ) ) } );
        // material = new THREE.MeshBasicMaterial({ map: loader.load( require(`${this.items[x].image}` )) });
        box = new THREE.Mesh( geometry, material );
        scene.add( box );
        obj.push( box );
        // if(x< 9){
        // Math.PI / 2,

        // obj[ x ].rotation.y = ( Math.PI / 2 ) * ( x / 16 )
        // obj[ x ].position.x = x * -64
        // obj[ x ].position.z = x * 64
        // if( x < 9 ) {

        if( x < 9 ) {
          obj[ x ].position.z = 20 * x
          obj[ x ].rotation.y = -0.25 * x
          obj[ x ].position.x = x * -15
        } else {
          obj[ x ].position.z = obj[ 8 ].position.z
          obj[ x ].rotation.y = obj[ 8 ].rotation.y - 0.17 * ( x - 8 )
          obj[ x ].position.x = x * ( -8 - x )
        }

        //   // obj[ x ].position.z = 20 * x
        //   obj[ x ].rotation.y = (Math.PI / 32)
        //   obj[ x ].position.x = x * -15
        // } else {
        //   // obj[ x ].position.z = obj[ 8 ].position.z
        //   obj[ x ].rotation.y = obj[ 8 ].rotation.y - 0.17 * ( x - 8 )
        //   obj[ x ].position.x = x * -16
        // }

        // }else{
        // obj[x].rotation.y =
        // }
      }

      // obj[ 0 ].rotation.y = 0.1
      // obj[1].position.set(0, 0, 20);
      // obj[2].position.set(-15, 0, 40);
      // obj[3].position.set(-30, 0, 60);
      // obj[4].position.set(-40, 0, 80);
      // obj[5].position.set(-55, 0, 100);
      // obj[6].position.set(-70, 0, 120);
      // obj[7].position.set(-85, 0, 140);
      // obj[8].position.set(-100, 0, 160);
      //
      // // 꺽임
      // obj[9].position.set(-115, 0, 140);
      // obj[10].position.set(-130, 0, 120);
      // obj[11].position.set(-145, 0, 120);
      // obj[12].position.set(-160, 0, 100);
      // obj[13].position.set(-175, 0, 80);
      // obj[14].position.set(-190, 0, 60);
      // obj[15].position.set(-205, 0, 40);

      // obj[ 0 ].position.set( -30, 0, 0 );
      // obj[ 1 ].position.set( -45, 0, 20 );
      // obj[ 2 ].position.set( -60, 0, 40 );
      // obj[ 3 ].position.set( -70, 0, 60 );
      // obj[ 4 ].position.set( -85, 0, 80 );
      // obj[ 5 ].position.set( -100, 0, 100 );
      // obj[ 6 ].position.set( -115, 0, 130 );
      // obj[ 7 ].position.set( -130, 0, 150 );
      // obj[ 8 ].position.set( -145, 0, 170 );

      // 꺽임
      // obj[ 9 ].position.set( -160, 0, 150 );
      // obj[ 10 ].position.set( -175, 0, 130 );
      // obj[ 11 ].position.set( -180, 0, 130 );
      // obj[ 12 ].position.set( -195, 0, 110 );
      // obj[ 13 ].position.set( -210, 0, 90 );
      // obj[ 14 ].position.set( -225, 0, 70 );
      // obj[ 15 ].position.set( -240, 0, 50 );
      // obj.position.set ()
      //camera
      camera.position.set( -5, 10.5, -30 );
      // camera.lookAt( 0, 0, 0 )
      // camera.position.set(10,10.5,-20);
      clock = new THREE.Clock()
      this.animate();

      //controls
      controls = new OrbitControls( camera, renderer.domElement );

      // controls.target.set(20,10.5,-27)
      controls.update()

    },
    render() {
      this.$emit( 'loading', true )
    },
    animate() {
      const t = clock.getElapsedTime()

      box.geometry.vertices.map( v => {
        const waveX1 = .1
        const waveX2 = 3 * Math.sin( v.x * 1.5 + t / 2 )
        const waveY1 = 2
        v.z = ( waveX1 + waveX2 + waveY1 )
      } )
      box.geometry.verticesNeedUpdate = true
      // this.x = camera.rotation.x
      // this.y = camera.rotation.y
      // this.z = camera.rotation.z
      renderer.render( scene, camera );
      this.render();
      requestAnimationFrame( this.animate );
      window.addEventListener( "resize", this.resize )

    },
    resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    },
    initGsap() {

      return this.$gsap.timeline( {
        scrollTrigger: {
          scroller: "#wrapper",
          trigger: "main.home",
          pin: true,
          scrub: 6,
          toggleActions: 'restart none reverse none',
        }
      } )
          .to( camera.position, {
            z: 100,
            x: -50,
            ease: 'none',
            duration: 2,
          } )
          .fromTo( '.main-desc', {
            yPercent: 0,
          }, {
            yPercent: -500,
            duration: 1,
          }, '-=1' )
          .fromTo( '.desc-a', {
            yPercent: 400,
          }, {
            yPercent: 0,
            duration: .9
          }, '-=0.9' )
          .to( camera.position, {
            x: -150,
            z: 120,
            duration: 2,
            ease: Circ.easeOut
          } )
          .to( '.desc-a', {
            yPercent: -500,
            duration: .9,
          }, '-=1.9' )
          .fromTo( '.desc-b', {
            yPercent: 300,
          }, {
            yPercent: 0,
            duration: .9
          }, '-=2' )
          .to( '.desc-b', {
            yPercent: -300,
            duration: .9,
          }, '-=0.9' )
          .fromTo( '.desc-c', {
            yPercent: 300,
          }, {
            yPercent: 0,
            duration: 2
          }, '-=1.9' )
          .to( camera.position, {
            x: -200,
            duration: 2,
          } )
          .to( '.desc-c', {
            yPercent: -200,
            duration: 2,
          }, '-=0.9' )
          .fromTo( '.desc-d', {
            yPercent: 200,
          }, {
            yPercent: 0,
            duration: .9
          }, '-=1.9' )
          .to( '.desc-d', {
            yPercent: -200,
            duration: .9,
          }, '-=.9' )
          .fromTo( '.desc-e', {
            yPercent: 250
          }, {
            duration: .9,
            yPercent: 0
          }, '-=0.9' )

    },
    initMGsap() {

      return this.$gsap.timeline( {

        scrollTrigger: {
          scroller: "#wrapper",
          trigger: "main.home",
          fastScrollEnd: true,
          pin: true,
          scrub: 6,
          toggleActions: 'restart none reverse none',
        }
      } )
          .to( camera.position, {
            z: 100,
            x: -50,
            ease: 'none',
            duration: 2,
          } )
          .fromTo( '.main-desc', {
            yPercent: 0,
          }, {
            yPercent: -500,
            duration: 1,
          }, '-=1' )
          .fromTo( '.desc-a', {
            yPercent: 400,
          }, {
            yPercent: 0,
            duration: .9
          }, '-=0.9' )
          .to( camera.position, {
            x: -150,
            z: 120,
            duration: 2,
            ease: Circ.easeOut
          } )
          .to( '.desc-a', {
            yPercent: -500,
            duration: .9,
          }, '-=1.9' )
          .fromTo( '.desc-b', {
            yPercent: 300,
          }, {
            yPercent: 0,
            duration: .9
          }, '-=2' )
          .to( '.desc-b', {
            yPercent: -400,
            duration: .9,
          }, '-=0.9' )
          .fromTo( '.desc-c', {
            yPercent: 300,
          }, {
            yPercent: 0,
            duration: 2
          }, '-=1.9' )
          .to( camera.position, {
            x: -200,
            duration: 2,
          } )
          .to( '.desc-c', {
            yPercent: -400,
            duration: 2,
          }, '-=0.9' )
          .fromTo( '.desc-d', {
            yPercent: 300,
          }, {
            yPercent: -10,
            duration: 1
          }, '-=1.9' )
          .to( '.desc-d', {
            yPercent: -400,
            duration: 1,
          }, '-=.9' )
          .fromTo( '.desc-e', {
            yPercent: 500
          }, {
            duration: .9,
            yPercent: -10
          }, '-=0.9' )
          .to(camera.position, {
            x : -240,
            duration: 1
          }, '-=1')
      // .fromTo( camera.position, {
      //       x: 76,
      //       y: 0,
      //       z: 70,
      //     },
      //     {
      //       duration: 15,
      //       x: 10,
      //       y: -30,
      //       z: 60,
      //     }, 'a' )
      // .to( camera.position, {
      //   duration: 15,
      //   x: 60,
      //   y: -30,
      //   z: 60,
      // } )
      // .to( camera.position, {
      //   duration: 15,
      //   x: 90,
      //   y: -30,
      //   z: 60,
      // } )
      // .to( camera.position, {
      //   duration: 15,
      //   x: 130,
      //   y: -30,
      //   z: 60,
      // } )
      // .to( camera.position, {
      //   duration: 15,
      //   x: 76,
      //   y: -30,
      //   z: 200,
      // } )
      // .to( camera.position, {
      //   duration: 15,
      //   x: 65,
      //   y: -30,
      //   z: 0,
      // } )
      // .fromTo( '.carousel', {
      //       zIndex: 2,
      //       opacity: 1,
      //       filter: 'blur(0px)'
      //     },
      //     {
      //       zIndex: 1,
      //       duration: 8,
      //       opacity: 0,
      //       filter: 'blur(10px)'
      //     }, '-=2' );
    },
    setGsap() {
      let media = this.$gsap.matchMedia()
      media.add( '(min-width: 1025px)', () => {
        if( this.timeline ) {
          this.timeline.kill()
          this.timeline = null
        }
        this.timeline = this.initGsap()
        return () => {
          if( this.timeline ) {
            this.timeline.kill()
            this.timeline = null
          }
        }
      } )
          .add( '(max-width: 1024px)', () => {
            camera.position.set( -5, 10.5, -50 )
            if( this.timeline ) {
              this.timeline.kill()
              this.timeline = null
            }
            this.timeline = this.initMGsap()
            return () => {
              if( this.timeline ) {
                this.timeline.kill()
                this.timeline = null
              }
            }
          } )
      this.$scrollTrigger.refresh()
    },
  },
}


</script>
<style
    scoped
    lang="scss"
>


.carousel::v-deep {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;


  .card-model {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }


  //
  //#container {
  //  position: relative;
  //  height: 100%;
  //  width: 100%;
  //  background: transparent;
  //  z-index: 2;
  //}


  //.scroll {
  //  position: absolute;
  //  width: 100%;
  //  height: 100%;
  //  bottom: 5%;
  //  left: 50%;
  //  transform: translateX(-50%);
  //  padding-top: 50px;
  //  font-size: 1.113vw;
  //  mix-blend-mode: difference;
  //  color: #fff;
  //  font-weight: 500;
  //  z-index: 1;
  //  display: flex;
  //  flex-wrap: wrap;
  //  justify-content: center;
  //  align-content: flex-end;
  //  align-items: flex-end;
  //
  //  .scroll-downs {
  //    width: 34px;
  //    height: 55px;
  //  }
  //
  //  .mousey {
  //    width: 3px;
  //    padding: 5px 12px;
  //    height: 35px;
  //    border: 2px solid #fff;
  //    border-radius: 25px;
  //    opacity: 0.75;
  //    box-sizing: content-box;
  //  }
  //
  //  .scroller {
  //    width: 3px;
  //    height: 10px;
  //    border-radius: 25%;
  //    background-color: #fff;
  //    animation-name: scroll;
  //    animation-duration: 2.2s;
  //    animation-timing-function: cubic-bezier(.15, .41, .69, .94);
  //    animation-iteration-count: infinite;
  //  }
  //}


  @keyframes scroll {
    0% {
      opacity: 0;
    }
    10% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(15px);
      opacity: 0;
    }
  }
}
</style>


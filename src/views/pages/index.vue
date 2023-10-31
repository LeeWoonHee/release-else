<template>
  <main
      v-if="load"
      class="home"
  >
    <text-contents
        class="text-contents"
        :items="items"
        @go="go"
    />
    <carousel
        ref="carousel"
        class="carousel"
        :items="items"
    />
  </main>
</template>

<script>
import * as THREE from "three";
import carousel from "@/views/pages/components/carousel.vue";
import TextContents from "@/views/pages/components/TextContents.vue";

export default {
  name: "index",
  components: {
    carousel,
    TextContents
  },
  data: () => ( {
    load: false,
    items: [
      {
        image: require( "@/assets/images/pages/home/releas_1.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_2.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_3.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_4.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_5.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_6.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_7.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_8.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_9.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_10.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_11.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_12.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_13.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_14.png" )
      },
      {
        image: require( "@/assets/images/pages/home/releas_15.png" )
      }
    ]
  } ),
  methods: {
    go( index ) {
      this.$refs[ 'carousel' ].goTo( index )
    }
  },
  mounted() {
    this.load = true
    this.$emit( 'router-mounted' )
  },
}
</script>

<style
    scoped
    lang="scss"
>
.home::v-deep {
  width: 100%;
  //position: relative;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #000;
  overflow: hidden;

  .carousel {
    z-index: 999;
    background: rgba(0, 0, 0, 0);
    position: relative;
  }

  .text-contents {
    psoition: absolute;
    z-index: 10000;
    background: rgba(0, 0, 0, 0);
  }

}

</style>
<template>
  <div
      ref="impress-wrapper"
      class="impress-wrapper"
      @keyup.right.space="impressNextStep"
      @keyup.left="impressPrevStep"
      @wheel="wheel"
  >
    <impress-viewport
        @keyup.right.space="impressNextStep"
        @keyup.left="impressPrevStep"
        ref="impress"
        :steps="steps" :config="config"
    ></impress-viewport>
  </div>
</template>

<script>
import ObjectImageCard from '../components/Cards/ObjectImageCard'
import {EventBus} from '../../EventBus'

export default {
  name: 'index',
  components: {
    ObjectImageCard
  },
  methods: {
    wheel (event) {
      if (event.deltaX < 0 || event.deltaY > 0) {
        this.$refs.impress.nextStep()
      } else if (event.deltaX > 0 || event.deltaY < 0) {
        this.$refs.impress.prevStep()
      }
    },
    impressPrevStep () {
      this.$refs.impress.prevStep()
    },
    impressNextStep () {
      this.$refs.impress.nextStep()
    }
  },
  data: () => ({
    config: {
      width: 1000, // required
      height: 600, // required
      transitionDuration: 1200, //default 1000
      // transitionTimingFunction: 'linear',
      // transitionTimingFunction: 'ease',
      transitionTimingFunction: 'ease-in-out',
      // transitionTimingFunction: 'cubic-bezier(0.56,-0.48, 0.45, 1.37)',
      // transitionTimingFunction: 'cubic-bezier(0.56,-0.48, 0.47, 0.73)',
      perspective: 1000, // default 1000

      /* in fullscreen, only first viewport instance work, others are meaningless
       * 若全屏模式，则只有第一个viewport的实例可以正常工作，大概...
       * 全屏的话，第一个实例会占满窗口，就像impress.js的例子一样，他实例也没有意义 */
      fullscreen: true // default true
    },
    steps: [
      {
        scale: 2,
        x: 0
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        component: ObjectImageCard,
        props: {
          image: 'test'
        },
        transitionDuration: 1000
      },
      {
        x: 450,
        y: 0,
        rotateY: -60,
        rotateZ: 40,
        scale: 1,
        component: ObjectImageCard,
        props: {
          image: 'test'
        },
        transitionDuration: 1000
      },
      {
        x: 1350,
        y: 0,
        rotateY: -120,
        rotateZ: 80,
        scale: 1,
        component: ObjectImageCard,
        props: {
          image: 'test'
        },
        transitionDuration: 1000
      },
      {
        x: 2000,
        y: 0,
        rotateY: -180,
        rotateZ: 160,
        scale: 1,
        component: ObjectImageCard,
        props: {
          image: 'test'
        },
        transitionDuration: 1000
      },
      {
        x: 2700,
        y: 0,
        rotateY: -240,
        rotateZ: 200,
        scale: 1,
        component: ObjectImageCard,
        props: {
          image: 'test'
        },
        transitionDuration: 1000
      }
    ]
  }),
  mounted () {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.impressNextStep()
      } else if (e.key === 'ArrowLeft') {
        this.impressPrevStep()
      }
    })
    this.$nextTick(() => {
      if (this.$refs['impress-wrapper']) {
        console.log(this.$refs['impress-wrapper'])
        this.$refs['impress-wrapper'].focus()
      }
    })
  }
}
</script>

<style scoped lang="scss">
.impress-wrapper::v-deep {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  background: radial-gradient(129.1% 117.53% at 49.47% 49.26%, #DE0101 0%, #580000 100%);

  .impress-step {
    max-width: 500px;
    text-align: center;
    cursor: pointer;
    color: #1b1b1b;
    font-weight: bold;
    font-style: normal;
    text-shadow: none;
    opacity: 0;
  }

  .impress-viewport.overview .impress-step:not(.active) {
    opacity: 0;
  }

  .impress-step.active {
    cursor: auto;
    opacity: 1;
  }
}
</style>

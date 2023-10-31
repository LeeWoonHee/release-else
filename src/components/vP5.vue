<template>
  <div ref="cv"></div>
</template>

<script>
import P5 from 'p5'
import {DrawBranches} from '../modules/p5/p5DrawBranches'

export default {
  name: 'vP5',
  props: {
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data: () => ({
    p5: null,
    drawBranches: null
  }),
  mounted () {
    this.$refs['cv'].setAttribute('id', this.$options._scopeId)
    const sketch = (p) => {
      p.setup = () => {
        // p.noLoop()
        p.createCanvas(this.width || this.$refs['cv'].getBoundingClientRect().width, this.height || this.$refs['cv'].getBoundingClientRect().height)
        this.drawBranches = new DrawBranches(p)
        this.$emit('onReady', p)
      }

      p.draw = () => {
        this.drawBranches.draw()
      }
    }
    this.p5 = new P5(sketch, this.$options._scopeId)
  }
}
</script>

<style scoped>

</style>

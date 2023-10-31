import {Noise} from '@/modules/p5/perlin'
import P5 from 'p5'

export default {DrawBranches}

let branches = []

export class DrawBranches {
  sketch = (p5) => {
    p5.setup = () => {
      p5.noLoop()
      p5.createCanvas(this.width || this.$refs['cv'].getBoundingClientRect().width, this.height || this.$refs['cv'].getBoundingClientRect().height)
      this.drawBranches = new DrawBranches(p)
      this.$emit('onReady', p)
    }

    if (options && options.scroll && window.locoScroll) {
      window.locoScroll.on('scroll', (...arg) => {
        p5.draw()
      })
    } else {
      p5.draw = () => {
        this.drawBranches.draw()
      }
    }
  }

  constructor (p5, {scroll = true} = {}) {
    this.noise = new Noise()
    this.p5 = p5
    this.p5.strokeCap(this.p5.SQUARE)
    // this.noise.seed(p5.random(100))
    this.branches = setDrawBranches(this.p5, this.noise)

    if (scroll && window.locoScroll) {
      window.locoScroll.on('scroll', (...arg) => {
        this.draw()
      })
    }
  }

  draw () {
    console.log('yes')
    drawBranches(this.p5, this.branches)
  }
}

function createBranches (p5i, amount, noise) {
  // Refresh color & blend mode
  p5i.blendMode(p5i.BLEND)
  p5i.colorMode(p5i.RGB)

  branches = []
  for (let i = 0; i < amount; i++) {
    const x = p5i.width / 2
    const y = p5i.height / 2
    branches.push(new Branch(x, y, p5i, noise))
  }

  return branches
}

class Branch {
  constructor (x, y, p5, noise) {
    this.noise = noise
    this.x = x
    this.y = y
    this.p5 = p5
    this.width = p5.width
    this.height = p5.height
    this.prevx = x
    this.prevy = y
    this.visible = true
    this.color = this.p5.color(this.p5.random(110, 110 + 50), 70, 100, 100)
    this.speed = {
      x: this.p5.random(-7, 7),
      y: this.p5.random(-7, 7)
    }
  }

  walls () {
    this.prevx = this.x
    this.prevy = this.y
    if (this.x < 0 || this.x > this.width || this.y < 0 || this.y > this.height) {
      this.visible = false
    }
  }

  draw () {
    this.p5.line(this.prevx, this.prevy, this.x, this.y)
  }

  moveStraight () {
    this.x += this.speed.x * 5
    this.y += this.speed.y * 5
  }

  moveRandom () {
    this.speed.x += this.p5.random(-10, 10)
    this.speed.y += this.p5.random(-10, 10)
    this.x += this.speed.x
    this.y += this.speed.y
  }

  moveNoise () {
    this.speed.x += this.noise.simplex3(this.x * 0.001, this.y * 0.001, this.p5.millis() * .5) * 2
    this.speed.y += this.noise.simplex3(this.y * 0.001, this.x * 0.001, this.p5.millis() * .5) * 2
    this.x += this.speed.x
    this.y += this.speed.y
  }
}

function setDrawBranches (p5, noise) {
  p5.clear()
  p5.background(0)
  const branches = createBranches(p5, 3000, noise)
  p5.colorMode(p5.HSB)
  p5.blendMode(p5.SCREEN)
  // p5.blendMode(p5.MULTIPLY)
  p5.strokeWeight(1)

  return branches
}

function drawBranches (p5, branches) {
  p5.stroke((p5.millis() * 0.3) % 360, 100, 50)
  branches.filter(branch => branch.visible).forEach(branch => {
    branch.moveNoise()
    branch.draw()
    branch.walls()
  })
}

function setup (p5) {
  p5.strokeCap(P5.SQUARE)
  // document.querySelector('canvas').addEventListener('click', windowResized)
  // if (window['goToStep' + step.value]) {
  //   window['goToStep' + step.value]()
  // }
}

function windowResized (p5) {
  p5.seed(random(100))
}

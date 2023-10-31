<template>
  <div ref="app" id="app" :class="vueAppClasses" @keypress="keypress">
    <router-view
        @router-mounted="load"
        @setAppClasses="setAppClasses"/>
  </div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'
import { EventBus } from './EventBus'
import _ from 'lodash'

export default {
  data      : () => ({
    vueAppClasses: [],
  }),
  watch     : {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val)
    }
  },
  methods   : {
    load() {
      this.toggleClassInBody(themeConfig.theme)
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${ vh }px`)
      document.documentElement.style.setProperty('--vh-raw', `${ vh }`)
    },
    keypress(e) {
      EventBus.$emit('keypress', e)
    },
    toggleClassInBody(className) {
      if (className === 'dark') {
        if (document.body.className.match('theme-semi-dark')) {
          document.body.classList.remove('theme-semi-dark')
        }
        document.body.classList.add('theme-dark')
      }
      else if (className === 'semi-dark') {
        if (document.body.className.match('theme-dark')) {
          document.body.classList.remove('theme-dark')
        }
        document.body.classList.add('theme-semi-dark')
      }
      else {
        if (document.body.className.match('theme-dark')) {
          document.body.classList.remove('theme-dark')
        }
        if (document.body.className.match('theme-semi-dark')) {
          document.body.classList.remove('theme-semi-dark')
        }
      }
    },
    setAppClasses(classesStr) {
      this.vueAppClasses.push(classesStr)
    },
    handleWindowResize() {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)

      // Set --vh property
      document.documentElement.style.setProperty('--vh', `${ window.innerHeight * 0.01 }px`)
      document.documentElement.style.setProperty('--vh-raw', `${ window.innerHeight * 0.01 }`)
    },
    handleScroll() {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY)
    },
  },
  mounted() {
    this.load();
  },
  async created() {
    const dir = this.$vs.rtl ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)

    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)
  },
}

</script>

<template>
  <div id="wrapper" class="content-wrapper" :class="[layoutTypeClass, navbarClasses, {'no-scroll': isAppPage}]">
    <router-view
        :key="$route.fullPath"
        @router-mounted="$emit('router-mounted')"
    />
  </div>
</template>


<script>
import themeConfig from '@/../themeConfig.js'
import LocomotiveScroll from "locomotive-scroll";
import { EventBus } from "@/EventBus";
import _ from "lodash";

export default {
  name      : 'Main',
  data() {
    return {
      disableCustomizer: themeConfig.disableCustomizer,
      disableThemeTour : themeConfig.disableThemeTour,
      dynamicWatchers  : {},
      hideScrollToTop  : false,
      isNavbarDark     : false,
      navbarColor      : themeConfig.navbarColor || '#fff',
      navbarType       : themeConfig.navbarType || 'floating',
      routerTransition : themeConfig.routerTransition || 'none',
      routeTitle       : this.$route.meta.pageTitle,
      locoScroll       : null,
    }
  },
  mounted() {
    this.initLocoScroll();
  },
  watch   : {
    '$route'() {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark(val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff'
      this.updateNavbarColor(color)
    },
    '$store.state.mainLayoutType'(val) {
      this.setNavMenuVisibility(val)
      this.disableThemeTour = true
    }
  },
  computed: {
    scroller() {
      return document.getElementById('wrapper')
    },
    bodyOverlay() { return this.$store.state.bodyOverlay },
    contentAreaClass() {
      if (this.mainLayoutType === 'vertical') {
        if (this.verticalNavMenuWidth === 'default') {
          return 'content-area-reduced'
        }
        else if (this.verticalNavMenuWidth === 'reduced') {
          return 'content-area-lg'
        }
        else {
          return 'content-area-full'
        }
      }
      else {
        return 'content-area-full'
      }
    },
    isAppPage() {
      return this.$route.meta.no_scroll
    },
    isThemeDark() { return this.$store.state.theme === 'dark' },
    layoutTypeClass() { return `main-${ this.mainLayoutType }` },
    mainLayoutType() { return this.$store.state.mainLayoutType },
    navbarClasses() {
      return {
        'navbar-hidden'  : this.navbarType === 'hidden',
        'navbar-sticky'  : this.navbarType === 'sticky',
        'navbar-static'  : this.navbarType === 'static',
        'navbar-floating': this.navbarType === 'floating'
      }
    },
    verticalNavMenuWidth() { return this.$store.state.verticalNavMenuWidth },
    windowWidth() { return this.$store.state.windowWidth }
  },
  methods : {
    initLocoScroll() {
      if (window.locoScroll) {
        window.locoScroll.destroy()
        window.locoScroll = null
      }
      else {
        // this.scroller.setAttribute('data-scroll-speed', '0.5')
        // this.scroller.setAttribute('data-scroll', '')
      }
      window.locoScroll = this.locoScroll = new LocomotiveScroll({
                                                                   el          : this.scroller,
                                                                   inertia     : 0.8,
                                                                   smooth      : true,
                                                                   mobile      : {
                                                                     breakpoint: 0,
                                                                     smooth    : true,
                                                                     inertia   : 2
                                                                   },
                                                                   tablet      : {
                                                                     breakpoint: 0,
                                                                     smooth    : true,
                                                                     inertia   : 2
                                                                   },
                                                                   getDirection: true
                                                                 })

      this.$scrollTrigger.scrollerProxy(this.scroller, {
        scrollTop: (value) => {
          return arguments.length ?
              this.locoScroll.scrollTo(value, 0, 0) :
              this.locoScroll.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
          return {
            left  : 0,
            top   : 0,
            width : window.innerWidth,
            height: window.innerHeight
          }
        },
        pinType: this.scroller.style.transform ? 'transform' : 'fixed'
      })

      EventBus.$on('scrollTo', (obj) => {
        if (obj) {
          this.locoScroll.scrollTo(obj)
        }
        else {
          this.locoScroll.scrollTo(this.scroller)
        }
        this.$scrollTrigger.update()
      })

      this.locoScroll.on('scroll', this.scrollLoco)

      this.$scrollTrigger.addEventListener('refresh', this.scrollTriggerRefreshed)
      this.$scrollTrigger.refresh()
    },
    scrollTriggerRefreshed() {
      this.$scrollTrigger.sort()
      this.locoScroll.update()
    },
    scrollLoco(...args) {
      this.updateY(...args)
      this.$scrollTrigger.update(...args)
    },
    changeRouteTitle(title) {
      this.routeTitle = title
    },
    updateNavbar(val) {
      if (val === 'static') {
        this.updateNavbarColor(this.isThemeDark ? '#10163a' : '#fff')
      }
      this.navbarType = val
    },
    updateY: _.throttle(function (arg) {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', arg.scroll.y)
    }, 300),
    updateNavbarColor(val) {
      this.navbarColor = val
      if (val === '#fff') {
        this.isNavbarDark = false
      }
      else {
        this.isNavbarDark = true
      }
    },
    updateRouterTransition(val) {
      this.routerTransition = val
    },
    setNavMenuVisibility(layoutType) {
      if ((layoutType === 'horizontal' && this.windowWidth >= 1200) || (layoutType === 'vertical' && this.windowWidth < 1200)) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')
      }
      else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
      }
    },
    toggleHideScrollToTop(val) {
      this.hideScrollToTop = val
    }
  },
  created() {
    const color = this.navbarColor === '#fff' && this.isThemeDark ? '#10163a' : this.navbarColor
    this.updateNavbarColor(color)
    this.setNavMenuVisibility(this.$store.state.mainLayoutType)

    // Dynamic Watchers for tour
    // Reason: Once tour is disabled it is not required to enable it.
    // So, watcher is required for just disabling it.
    this.dynamicWatchers.windowWidth = this.$watch('$store.state.windowWidth', (val) => {
      if (val < 1200) {
        this.disableThemeTour = true
        this.dynamicWatchers.windowWidth()
      }
    })

    this.dynamicWatchers.verticalNavMenuWidth = this.$watch('$store.state.verticalNavMenuWidth', () => {
      this.disableThemeTour = true
      this.dynamicWatchers.verticalNavMenuWidth()
    })

    this.dynamicWatchers.rtl = this.$watch('$vs.rtl', () => {
      this.disableThemeTour = true
      this.dynamicWatchers.rtl()
    })
  },
  beforeDestroy() {
    Object.keys(this.dynamicWatchers).map(i => {
      this.dynamicWatchers[i]()
      delete this.dynamicWatchers[i]
    })
  },
  destroyed() {
    this.$scrollTrigger.removeEventListener('refresh', this.scrollTriggerRefreshed)
  }
}

</script>


<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="content-wrapper" :class="[layoutTypeClass, navbarClasses, footerClasses, {'no-scroll': isAppPage}]">
    <!--    <the-customizer-->
    <!--        v-if="!disableCustomizer"-->
    <!--        :footerType="footerType"-->
    <!--        :hideScrollToTop="hideScrollToTop"-->
    <!--        :navbarType="navbarType"-->
    <!--        :navbarColor="navbarColor"-->
    <!--        :routerTransition="routerTransition"-->
    <!--        @toggleHideScrollToTop="toggleHideScrollToTop"-->
    <!--        @updateFooter="updateFooter"-->
    <!--        @updateNavbar="updateNavbar"-->
    <!--        @updateNavbarColor="updateNavbarColor"-->
    <!--        @updateRouterTransition="updateRouterTransition"/>-->
    <back-to-top bottom="5%" :right="$store.state.windowWidth < 1280 ? '0' : '5%'" visibleoffset="500"
                 v-if="!hideScrollToTop">
      <vs-button style="border-radius: 0;" icon-pack="feather" icon="icon-arrow-up" class="btn-back-to-top"
                 color="#316BEB"/>
    </back-to-top>
    <the-nav/>
    <transition :name="routerTransition" mode="out-in">
      <router-view @changeRouteTitle="changeRouteTitle"
                   @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)"
                   @update_nav_menu="(fn) => fn(navMenuItems)"/>
    </transition>
    <the-footer shortcut/>
  </div>
</template>


<script>
import BackToTop from 'vue-backtotop'
import TheCustomizer from '@/layouts/components/customizer/TheCustomizer.vue'
import TheFooter from '@/layouts/components/TheFooter.vue'
import themeConfig from '@/../themeConfig.js'
import TheNav from '../../views/components/TheNav'

const VxTour = () => import('@/components/VxTour.vue')

export default {
  components: {
    BackToTop,
    TheCustomizer,
    TheFooter,
    TheNav,
    VxTour
  },
  data () {
    return {
      disableCustomizer: themeConfig.disableCustomizer,
      disableThemeTour: themeConfig.disableThemeTour,
      dynamicWatchers: {},
      footerType: themeConfig.footerType || 'static',
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || '#fff',
      navbarType: themeConfig.navbarType || 'floating',
      routerTransition: themeConfig.routerTransition || 'none',
      routeTitle: this.$route.meta.pageTitle
    }
  },
  watch: {
    '$route' () {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark (val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff'
      this.updateNavbarColor(color)
    },
    '$store.state.mainLayoutType' (val) {
      this.setNavMenuVisibility(val)
      this.disableThemeTour = true
    }
  },
  computed: {
    bodyOverlay () { return this.$store.state.bodyOverlay },
    contentAreaClass () {
      if (this.mainLayoutType === 'vertical') {
        if (this.verticalNavMenuWidth === 'default') return 'content-area-reduced'
        else if (this.verticalNavMenuWidth === 'reduced') return 'content-area-lg'
        else return 'content-area-full'
      } else return 'content-area-full'
    },
    footerClasses () {
      return {
        'footer-hidden': this.footerType === 'hidden',
        'footer-sticky': this.footerType === 'sticky',
        'footer-static': this.footerType === 'static'
      }
    },
    isAppPage () {
      return this.$route.meta.no_scroll
    },
    isThemeDark () { return this.$store.state.theme === 'dark' },
    layoutTypeClass () { return `main-${this.mainLayoutType}` },
    mainLayoutType () { return this.$store.state.mainLayoutType },
    navbarClasses () {
      return {
        'navbar-hidden': this.navbarType === 'hidden',
        'navbar-sticky': this.navbarType === 'sticky',
        'navbar-static': this.navbarType === 'static',
        'navbar-floating': this.navbarType === 'floating'
      }
    },
    verticalNavMenuWidth () { return this.$store.state.verticalNavMenuWidth },
    windowWidth () { return this.$store.state.windowWidth }
  },
  methods: {
    changeRouteTitle (title) {
      this.routeTitle = title
    },
    updateNavbar (val) {
      if (val === 'static') this.updateNavbarColor(this.isThemeDark ? '#10163a' : '#fff')
      this.navbarType = val
    },
    updateNavbarColor (val) {
      this.navbarColor = val
      if (val === '#fff') this.isNavbarDark = false
      else this.isNavbarDark = true
    },
    updateFooter (val) {
      this.footerType = val
    },
    updateRouterTransition (val) {
      this.routerTransition = val
    },
    setNavMenuVisibility (layoutType) {
      if ((layoutType === 'horizontal' && this.windowWidth >= 1200) || (layoutType === 'vertical' && this.windowWidth < 1200)) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')
      } else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
      }
    },
    toggleHideScrollToTop (val) {
      this.hideScrollToTop = val
    }
  },
  created () {
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
  beforeDestroy () {
    Object.keys(this.dynamicWatchers).map(i => {
      this.dynamicWatchers[i]()
      delete this.dynamicWatchers[i]
    })
  }
}

</script>


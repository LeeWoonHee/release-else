<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <footer class="" :class="classes">
    <div class="w-full h-auto blex-bottom">
      <img width="100%"
           :src="$store.state.windowWidth > 1280 ? require('@/assets/images/footers/Skyline.svg') : $store.state.windowWidth > 768 ? require('@/assets/images/footers/Skyline-tablet.svg') : require('@/assets/images/footers/Skyline-mobile.svg')"
           alt="">
    </div>
    <div v-if="!shortcut" class="w-full bg-main lg:p-10 blex-between items-center lg:items-start">
      <div class="lg:pl-5 lg:py-0 md:py-10 blex items-center w-full lg:w-auto">
        <div class="md:py-0 py-10">
          <a class="px-5" target="_blank" href="https://bluepoint.ac/">
            <img src="~@/assets/images/footers/bluepoint.svg" alt="">
          </a>
        </div>
        <a class="md:py-0 py-8 footer-logo" href="https://www.startupschool.blue/">
          <logo class="px-5"/>
        </a>
      </div>
      <div class="flex lg:w-auto w-full lg:p-0 md:p-10 blex">
        <div class="md:w-1/2 w-full text-white px-5 md:mb-0 mb-5">
          <div class="w-full font-bold md:p-0 pb-3">
            블루포인트파트너스
          </div>
          <div class="py-3 whitespace-pre">
            <div class="font-normal">대전광역시 유성구 어은로 58번길 58, 3층(어은동)</div>
            <div class="font-normal">서울특별시 강남구 역삼로 172 MARU 360, 4층</div>
          </div>
          <div class="font-normal">
            steve@bluepoint.ac
          </div>
        </div>
        <div class="md:w-1/2 w-full text-white px-5 md:mb-0 mb-5">
          <div class="w-full font-bold md:p-0 py-3">
            대전 청년창업사관학교
          </div>
          <div class="py-3 font-normal">
            대전광역시 유성구 유성대로1689번길 70<br>
            KT대덕2연구센터 연구1동 1층
          </div>
          <div class="font-normal">
            042-862-9937~8 / 042-863-9939
          </div>
        </div>
      </div>
    </div>
    <div
        class="py-6 md:px-10 px-5 footer-policy text-3xs blex-left w-full"
        :class="shortcut ? 'bg-white text-main' : 'bg-main text-white'"
    >
      <div @click="policy = policies.term" class="md:px-10 px-0 cursor-pointer">이용약관</div>
      <div @click="policy = policies.privacy" class="px-5 cursor-pointer">개인정보처리방침</div>
    </div>
    <vs-popup :active.sync="policyPopup" :title="policy.title">
      <div v-html="policy.content"></div>
    </vs-popup>
  </footer>
</template>

<script>
import Logo from '@/components/logo/Logo'
import {EventBus} from '@/EventBus'

export default {
  name: 'the-footer',
  components: {
    Logo
  },
  props: {
    classes: {
      type: String
    },
    shortcut: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    policy: {
      title: null,
      content: null
    },
    policies: {}
  }),
  computed: {
    policyPopup: {
      set (val) {
        if (!val) {
          this.policy = {
            title: null,
            content: null
          }
        }
      },
      get () {
        return !!this.policy.content
      }
    }
  },
  methods: {
    fetch () {
      this.$http.get('/projects')
          .then((res) => {
            const {
              privacy,
              term
            } = res.data
            this.policies = {
              term: {
                title: '이용약관',
                content: term
              },
              privacy: {
                title: '개인정보처리방침',
                content: privacy
              }
            }
          })
    }
  },
  created () {
    EventBus.$on('popup:privacy', () => {
      this.policy = this.policies.privacy
    })
    EventBus.$on('popup:term', () => {
      this.policy = this.policies.term
    })
    this.fetch()
  },
  beforeDestroy () {
  }
}
</script>

<style scoped lang="scss">
footer::v-deep {
  .flip-wrapper {
    .flip-front {
      svg {
        path {
          fill: #fff !important;
        }
      }
    }
  }

  .footer-policy {
    border-top: 1px solid rgba(255, 255, 255, 0.7);
  }
}

</style>

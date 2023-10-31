<template>
  <header ref="header">
    <nav>
      <router-link
          to="/"
          tag="div"
          class="blex justify-start lg:justify-center lg:pl-0 pl-8"
      >
      </router-link>
      <div
          @click="openMenu"
          :class="{'clicked': isOpenMenu}"
          class="menu box"
      >
        <span></span>
      </div>
    </nav>


    <transition
        name="fade"
        mode="out-in"
    >
      <div
          v-if="isOpenMenu"
          class="gnb"
      >
        <div
            class="w-9/10 lg:w-4/5 blex-between items-end"
        >
          <ul class="blex w-full lg:w-1/2 lg:justify-start justify-end lg:order-1 order-2 pt-24 lg:pt-0">
            <!--            <li>-->
            <!--              <a-->
            <!--                  href="/"-->
            <!--                  target="_blank"-->
            <!--                  :class="{'clicked': isOpenMenu }"-->
            <!--                  class="sns-list"-->
            <!--              >-->
            <!--                INSTAGRAM-->
            <!--              </a>-->
            <!--            </li>-->
            <!--            <li>-->
            <!--              <a-->
            <!--                  href="/"-->
            <!--                  target="_blank"-->
            <!--                  :class="{'clicked': isOpenMenu}"-->
            <!--                  class="sns-list"-->
            <!--              >-->
            <!--                FACEBOOK-->
            <!--              </a>-->
            <!--            </li>-->
            <li>
              <a
                  href="https://www.behance.net/else_red"
                  target="_blank"
                  :class="{'clicked': isOpenMenu}"
                  class="sns-list"
              >
                BEHANCE
              </a>
            </li>
            <li
                :class="{'clicked': isOpenMenu}"
                class="rights"
            >
              ⓒ Else. All rights reserved.
            </li>
          </ul>
          <ul class="w-full lg:w-1/2 blex-right lg:order-2 order-1">

            <router-link
                :class="{'clicked': isOpenMenu }"
                exact-active-class="state-clicked"
                :to="'/'"
                tag="li"
                class="list"
                @click.native="$router.push('/').then(()=>{$router.go()})"
            >

              <kinesis-container>
                <kinesis-element
                    :strength=" $store.state.windowWidth > 1024 ? 20 : 0"
                    tag="div"
                    type="depth"
                >
                  HOME
                </kinesis-element>
              </kinesis-container>
            </router-link>

            <router-link
                :class="{'clicked': isOpenMenu}"
                active-class="state-clicked"
                :to="'/teams'"
                tag="li"
                class="list"
                @click.native="$router.push('/teams').then(()=>{$router.go()})"
            >
              <kinesis-container>
                <kinesis-element
                    :strength="$store.state.windowWidth > 1024 ? 20 : 0"
                    tag="div"
                    type="depth"
                >
                  OUR TEAM
                </kinesis-element>
              </kinesis-container>
            </router-link>
            <router-link
                :class="{'clicked': isOpenMenu}"
                active-class="state-clicked"
                :to="'/portfolios'"
                tag="li"
                class="list"
                @click.native="$router.push('/portfolios').then(()=>{$router.go()})"
            >
              <kinesis-container>
                <kinesis-element
                    :strength="$store.state.windowWidth > 1024 ? 20 : 0"
                    tag="div"
                    type="depth"
                >
                  PORTFOLIOS
                </kinesis-element>
              </kinesis-container>
            </router-link>
            <router-link
                :class="{'clicked': isOpenMenu}"
                active-class="state-clicked"
                :to="'/contacts'"
                tag="li"
                class="list"
                @click.native="$router.push('/contacts').then(()=>{$router.go()})"
            >
              <kinesis-container>
                <kinesis-element
                    :strength="$store.state.windowWidth > 1024 ? 20 : 0"
                    tag="div"
                    type="depth"
                >
                  CONTACT
                </kinesis-element>
              </kinesis-container>
            </router-link>
          </ul>
        </div>
      </div>
    </transition>


  </header>
</template>

<script>
export default {
  name: 'TheNav',
  data: () => ({
    isOpenMenu: false,
  }),

  methods: {
    openMenu() {
      this.isOpenMenu = !this.isOpenMenu;
      if (this.isOpenMenu) {
        window.locoScroll.stop();
      }
      else {
        window.locoScroll.start();
      }
    },
    handleNav() {
      window.locoScroll.on('scroll', (instance) => {
        document.documentElement.setAttribute('data-direction', instance.direction)
        if (instance.direction === 'down') {
          this.$refs['header'].classList.add('scrolled');
        }
        else {
          this.$refs['header'].classList.remove('scrolled');
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.handleNav();
      }, 200);
    });
  },
}
</script>

<style
    scoped
    lang="scss"
>
header::v-deep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  transform: translate3d(0, 0, 0);
  transition: all .3s linear;
  background-color: transparent;
  z-index: 100000;

  &.scrolled {
    transform: translate3d(0, -100%, 0) !important;
    transition: all .3s linear;
  }


  nav {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    min-height: 80px;
    z-index: 2;

    .menu {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 30px;
      margin: 25px;

      &:hover {
        cursor: pointer;
      }

      span {
        margin: 0 auto;
        position: relative;
        top: 12px;
        width: 30px;
        height: 6px;
        background-color: #fff;
        display: block;

        &:before,
        &:after {
          position: absolute;
          content: '';
          width: 30px;
          height: 6px;
          background-color: #fff;
          display: block;
        }

        &:before {
          margin-top: -12px;
        }

        &:after {
          margin-top: 12px;
        }
      }

    }

    /* example 5 */
    .box {
      span {
        -webkit-transition-duration: 0s;
        transition-duration: 0s;
        -webkit-transition-delay: 0;
        transition-delay: 0;
      }

      &.clicked {

        span {
          background-color: rgba(0, 0, 0, 0.0);
          -webkit-transition-delay: 0;
          transition-delay: 0;

          &:before {
            -webkit-transition-property: margin, -webkit-transform;
            transition-property: margin, transform;
            -webkit-transition-duration: 0.2s;
            transition-duration: 0.2s;
            -webkit-transition-delay: 0.2s, 0s;
            transition-delay: 0.2s, 0s;
          }

          &:after {
            -webkit-transition-property: margin, -webkit-transform;
            transition-property: margin, transform;
            -webkit-transition-duration: 0.2s;
            transition-duration: 0.2s;
            -webkit-transition-delay: 0.2s, 0s;
            transition-delay: 0.2s, 0s;
          }

        }
      }

    }

    .box {
      &.clicked {
        span:before {
          margin-top: 0;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          -webkit-transition-delay: 0s, 0.2s;
          transition-delay: 0s, 0.2s;
        }
      }
    }


    .box {
      &.clicked {
        span:after {
          margin-top: 0;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          -webkit-transition-delay: 0s, 0.2s;
          transition-delay: 0s, 0.2s;
        }
      }
    }
  }

  .gnb {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    background-color: rgba(0, 0, 0, .95);
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    overflow: hidden;

    .sns-list {
      color: #fff;
      font-size: 1.250vw; //24px;
      font-weight: 600;
      margin-right: 24px;

      @media screen and (max-width: 1024px) {
        font-size: 16px;
        margin-right: 0;
        margin-left: 12px;
      }

      &.clicked {
        animation: appear 0.5s linear forwards;
      }
    }

    .rights {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      color: #fff;

      @media screen and (max-width: 1024px) {
        justify-content: flex-end;
      }


      &.clicked {
        animation: appear 0.5s linear forwards;
      }
    }

    .list {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      align-content: center;
      color: #fff;
      font-size: 6.771vw; //130px;
      font-weight: 700;
      transition: all .2s;
      @media screen and (max-width: 1024px) {
        font-size: 30px;
        margin-bottom: 24px;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%) translateX(300%);
        margin-left: 10px;
        width: 30px;
        height: 15px;
        opacity: 0;
        background-color: #B20000;
        @media screen and(max-width: 1024px) {
          width: 12px;
          height: 10px;
        }
      }

      &:hover {
        cursor: pointer;
        transition: all .2s;

        &::after {
          transform: translateY(-50%) translateX(130%);
          background-color: #B20000;
          opacity: 1;
          transition: all .2s;
        }


      }

      &.clicked {
        animation: appear 0.5s linear forwards;

      }

      &.state-clicked {
        animation: appear 0.5s linear forwards;

        &::after {
          transform: translateY(-50%) translateX(130%);
          background-color: #B20000;
          opacity: 1;
          transition: all .2s;
        }
      }
    }
  }

  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

}
</style>

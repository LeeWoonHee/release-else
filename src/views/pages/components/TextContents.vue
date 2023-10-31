<template>
  <div class="text-layout">

    <div class="w-full blex-between px-4 lg:px-12 pt-4 lg:pt-10">
      <div class="text-white text-lg lg:text-xl">
        RELEASE ELSE
      </div>
      <div class="text-white text-lg lg:text-xl">
        (2023)
      </div>
    </div>


    <!-- release else info   -->
    <div class="release-info">
      <div class="w-full lg:w-1/2 blex-y-between h-10/12 lg:h-2/3">
        <!--description    -->
        <div class="blex-left w-full overflow-hidden description-wrapper">
          <div class="main-desc desc font-ralewary ">
            You are cordially invited to attend the first chapter of Else's networking event 'Release'
          </div>
          <div class="desc-a desc">
            'Release' celebrates the establishment of Else in a form of a networking event, held at 'People the
            Terrace'.
          </div>
          <div class="desc-b desc">
            It is our great pleasure to invite friends, clients, and professionals from diverse areas
          </div>
          <div class="desc-c desc">
            including finance, consulting, fashion, F&B, etc. to join us for the beginning of a very long journey to
            come.
          </div>
          <div class="desc-d desc">
            Please come and enjoy the selection of food and beverages which will be provided throughout the event,
          </div>
          <div class="desc-e desc">
            as well as a special raffle at the end of the night.
          </div>
        </div>


        <!--  party info    -->
        <div class="w-full blex-left text-white party-info">
          <div class="w-full blex-left font-semi-bold text-sm lg:text-xl">
            PARTY INFO
          </div>
          <div
              class="w-full lg:w-9/10 blex-left items-start mb-2 lg:mb-4 lg:mb-40 pl-0 lg:pl-4 pt-2 lg:pt-4 flex-no-wrap"
          >
            <div class="blex-left w-1/3">
              <div class="info-title">
                HOST
              </div>
              <div class="blex-left w-full text-xs-x lg:text-sm">
                LEO & HANS
              </div>
            </div>
            <div class="blex-left w-2/5 lg:w-1/3">
              <div class="info-title">
                DATE
              </div>
              <div class="blex-left w-full text-xs-x lg:text-sm">
                2023. 4. 7, 07 : 00 PM ~<br>
                2023. 4. 7, 12 : 00 PM
              </div>
            </div>
            <div class="blex-left w-1/3">
              <div class="info-title">
                LOCATION
              </div>
              <div class="blex-left w-full text-xs-x lg:text-sm">
                서울 강남구 도산대로81길 13, <br class="hidden lg:block">
                청담동 118-19
              </div>
            </div>
          </div>
          <div class="w-full lg:w-9/10 blex-left mb-4 lg:mb-40 pl-0 lg:pl-4 pt-0 lg:pt-4 flex-no-wrap">
            <div class="blex-left w-1/3">
              <div class="info-title">
                ENTRY FEE
              </div>
              <div class="blex-left w-full text-xs-x lg:text-sm">
                50,000원
              </div>
            </div>
            <div class="blex-left w-2/5 lg:w-1/3">
              <div class="info-title">
                DRESS CODED
              </div>
              <div class="blex-left w-full text-xs-x lg:text-sm">
                POINT COLOR : RED
              </div>
            </div>
            <div class="blex-left w-1/3">
              <div class="info-title">
                MOBILE
              </div>
              <div class="blex-left w-full text-xs-x lg:text-sm">
                010. 6313. 9303
              </div>
            </div>
          </div>
          <div class="w-full blex-left text-white text-xs text-3xs pl-0 lg:pl-4">
            * ‘RELEASE ELSE’ 초대장이 없을 시, 입장이 불가능합니다.
          </div>
        </div>
      </div>
    </div>

    <div class="blex-left w-full absolute bottom-0 flex-no-wrap whitespace-no-wrap overflow-y-hidden">
      <div
          v-for="(item, index) in localItems"
          class="item"
          @click="$emit('go', index)"
      >
        <img
            :src="item.image"
            alt="image"
            class="w-full"
        >
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "TextContents",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    items: {
      deep: true,
      immediate: true,
      handler( val ) {
        this.localItems = val
      },
    }
  },
  data: () => ( {
    localItems: null
  } ),
}
</script>

<style
    scoped
    lang="scss"
>
.text-layout::v-deep {
  position: absolute;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  z-index: 1;

  .release-info {
    width: 90%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    padding-top: 100px;

    @media screen and (max-width: 1024px) {
      width: 100%;
      padding: 0 16px;
    }

    .description-wrapper {
      overflow: hidden;
      height:50%;
      position:relative;
      //height:500px;
      @media screen and (max-width: 1280px){
        //height:20%;
        //margin-top:25%;
        //width:80%;
      }
    }

    .main-desc {
    }

    .desc {
      width: 100%;
      color: #fff;
      font-family: 'Raleway', sans-serif;
      font-size: 50px;
      line-height: 50px;
      font-weight: 400;
      position:absolute;
      //display: none;

      @media screen and (max-width: 1024px) {
        line-height: 26px;
        font-size: 24px;
        padding-top: 35px;
      }
    }


    .info-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      font-family: 'Raleway', 'SUIT';
      font-size: 16px;
      font-weight: 500;

      @media screen and (max-width: 1024px) {
        font-size: 12px;
      }
    }
  }

  .item {
    min-width: 130px;
    height: 90px;
    margin: 0 0 20px 20px;

    @media screen and (max-width: 1024px) {
      min-width: 70px;
      height: 48px;
      margin: 0 0 10px 10px;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
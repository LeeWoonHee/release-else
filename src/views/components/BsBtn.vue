<template>
  <div class="bs-btn blex justify-start text-base lg:text-xl cursor-pointer" @click="(e) => $emit('click', e)">
    <span class="blex font-normal learn">
      {{ text }}
      <div class="right-arrow blex ml-3">
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BsBtn',
  props: ['text']
}
</script>
<style scoped lang="scss">
div.bs-btn::v-deep {
  width: 200px;
  height: 50px;
  padding: 10px 18px;
  background-color: #44C19A;
  position: relative;

  .learn {
    color: #fff;

    .right-arrow {
      background-image: url(~@/assets/images/icon/rightArrowWhite.svg);
      width: 24px;
      height: 24px;
    }
  }

  &:hover {
    background-color: #F7F9FA;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #44C19A;
      bottom: 0;
      left: 0;
      animation: leftToRight .3s linear forwards;
    }

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 48px;
      background-color: #F7F9FA;
      top: 0;
      right: 0;
      animation: rightToLeft .3s linear forwards;
    }

    .learn {
      color: #44C19A;

      .right-arrow {
        background-image: url(~@/assets/images/icon/rightArrowGreen.svg);
        width: 24px;
        height: 24px;
        transform: translateX(40px);
        transition: all .3s;
      }
    }
  }

  @keyframes leftToRight {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }

  @keyframes rightToLeft {
    0% {
      width: 100%;
    }

    100% {
      width: 0;
    }
  }
}
</style>

<template>
  <vs-button class="ta-button" :color="color" @click="(e) => $emit('click', e)">
    <div class="text-white w-full relative">
      <slot></slot>
      <div v-if="text" class="append-text">
        {{ text }}
      </div>
    </div>
  </vs-button>
</template>

<script>
export default {
  name: 'TaButton',
  props: {
    text: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style scoped lang="scss">
.ta-button::v-deep {
  * {
    font-family: SpoqaHanSans;
  }

  border-radius: 0;
  min-width: 220px;
  text-align: right;

  .append-text {
    position: absolute;
    opacity: 0;
    bottom: 0;
    right: 0;
    font-size: 16px;
    line-height: 0;
    transition: all .1s linear;
    transform: translateY(5px);
  }

  &:hover {
    .append-text {
      opacity: 1;
      overflow-y: visible;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 1280px) {
    min-width: auto;
  }
}
</style>

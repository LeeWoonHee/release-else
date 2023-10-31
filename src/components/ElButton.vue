<template>
  <div
      @click="$emit('click')"
      class="el-btn-wrapper">
    <div class="btn-title">
      {{ title }}
    </div>
    <div class="blex">
      <img src="@/assets/images/icon/redRightArrow.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name : "ElButton",
  props: {
    title: {
      type   : String,
      default: null
    }
  },
}
</script>

<style scoped lang="scss">
.el-btn-wrapper::v-deep {
  background-color: #000;
  width: 290px;
  height: 60px;
  border: 1px solid #B20000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  padding: 12px 20px;

  &:hover {
    cursor: pointer;
  }


  .btn-title {
    color: #B20000;
    font-size: 24px;
    font-weight: 700;
    margin-right: 12px;
  }

}
</style>
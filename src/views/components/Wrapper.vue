<template>
  <div class="blex">
    <slot #default :user="user"></slot>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: {
    name: {
      type: String,
      default: 'asd'
    }
  },
  data: () => ({
    user: {
      id: '1',
      name: '한종열'
    }
  })
}
</script>

<style scoped>

</style>

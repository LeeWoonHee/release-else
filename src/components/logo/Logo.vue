<template>
  <div class="logo flex flex-wrap items-end cursor-pointer" @click="$router.push('/')">
    <dae class="mr-1"/>
    <jun class="mr-1"/>
    <chung class="mr-1"/>
    <chang class="mr-1"/>
    <sa/>
  </div>
</template>

<script>
import Dae from './Dae'
import Jun from './Jun'
import Chung from './Chung'
import Chang from './Chang'
import Sa from './Sa'

export default {
  name: 'Logo',
  components: {
    Dae,
    Jun,
    Chung,
    Chang,
    Sa
  }
}
</script>

<style scoped>

</style>

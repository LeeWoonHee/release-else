<template>
  <viewer
      :initialValue="value"
      height="500px"
  />
</template>

<script>
import {Viewer} from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

export default {
  name: 'TViewer',
  props: {
    value: {
      type: String
    }
  },
  watch: {
    // value: {
    //   immediate: true,
    //   handler (val) {
    //     if (val) {
    //     }
    //   }
    // }
  },
  components: {
    viewer: Viewer
  },
  methods: {},
  computed: {},
  data: () => ({}),
  created () {
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>

<template>
  <editor
      ref="toastuiEditor"
      :options="options"
      minHeight="400px"
      initialEditType="wysiwyg"
      @change="getHTML"
  />
</template>

<script>
import {Editor} from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/i18n/ko-kr'
import _ from 'lodash'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

export default {
  name: 'TEditor',
  props: {
    value: {
      type: String
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        if (val) {
          this.localValue = val
          this.$refs.toastuiEditor.invoke('setHTML', val, true)
        }
      }
    },
    localValue (val) {
      this.$emit('input', val)
    }
  },
  components: {
    Editor,
    colorSyntax
  },
  methods: {
    getHTML () {
      this.localValue = this.$refs.toastuiEditor.invoke('getHTML')
    }
  },
  computed: {
    options () {
      return {
        minHeight: '400px',
        language: 'ko-KR',
        useCommandShortcut: false,
        usageStatistics: false,
        hideModeSwitch: true,
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
          ['scrollSync']
        ],
        linkAttributes: {
          target: '_blank'
        },
        plugins: [colorSyntax],
        theme: this.theme
      }
    },
    theme () {
      return this.$store.state.theme === 'dark' ? 'dark' : null
    }
  },
  data: () => ({
    localValue: ''
  }),
  created () {
    this.getHTML = _.debounce(this.getHTML, 500)
  },
  mounted () {
    if (this.value) {
      this.$refs.toastuiEditor.invoke('setHTML', this.value, true)
    }
  }
}
</script>

<style scoped>

</style>

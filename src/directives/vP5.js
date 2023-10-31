export default {
  install: (Vue, options) => {
    Vue.directive('pm5', (el) => {
      console.log(el)
    })
  }
}

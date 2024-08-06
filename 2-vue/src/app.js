import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.esm.browser.js'

new Vue({
  el: '#app',
  data: {
    query: '',
  },
  methods: {
    onSubmit(e) {
      console.log('onSubmit()', e)
    },
  },
})

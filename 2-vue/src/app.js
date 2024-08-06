import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.esm.browser.js'
import SearchModel from './models/SearchModel.js'

new Vue({
  el: '#app',
  data: {
    query: '',
    searchResults: [],
    hasSearched: false,
  },
  methods: {
    search(query) {
      SearchModel.list(query).then(data => {
        this.hasSearched = true
        this.searchResults = data
      })
    },
    onSubmit(query) {
      this.search(query)
    },
    onReset() {
      this.query = ''
      this.$refs.input.focus()
    },
  },
  watch: {
    query(newValue) {
      if (!newValue) {
        console.log('query()')
      }
    },
  },
})

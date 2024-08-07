import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.esm.browser.js'
import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'

new Vue({
  el: '#app',
  data: {
    query: '',
    searchResults: [],
    hasSearched: false,
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    keywords: [],
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeywords()
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
      this.hasSearched = false
    },
    onChange(tabName) {
      this.selectedTab = tabName
      if (tabName === '추천 검색어') {
      }
    },
    onClickKeyword(keyword) {
      console.log('onClickKeyword()', keyword)
      this.search(keyword)
    },
    fetchKeywords() {
      KeywordModel.list().then(data => {
        this.keywords = data
      })
    },
  },
  watch: {
    query(newValue) {
      if (!newValue) {
        this.hasSearched = false
      }
    },
  },
})

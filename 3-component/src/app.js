import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.esm.browser.js'
import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

new Vue({
  el: '#app',
  data: {
    query: '',
    searchResults: [],
    hasSearched: false,
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    keywords: [],
    histories: [],
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
    onSubmit() {
      this.search(this.query)
      HistoryModel.add(this.query)
    },
    onReset() {
      this.query = ''
      this.$refs.input.focus()
      this.hasSearched = false
      this.selectedTab = '추천 검색어'
    },
    onChange(tabName) {
      this.selectedTab = tabName
      if (tabName === '추천 검색어') this.fetchKeywords()
      if (tabName === '최근 검색어') this.fetchHistories()
    },
    onRemove(target, keyword) {
      const isRemove = target.classList.contains('btn-remove')
      if (isRemove) {
        HistoryModel.remove(keyword)
        this.fetchHistories()
      }
    },
    onClickKeyword(keyword) {
      this.search(keyword)
      this.query = keyword
    },
    onClickHistory(target, keyword) {
      const isNotRemove = !target.classList.contains('btn-remove')
      if (isNotRemove) {
        this.search(keyword)
        this.query = keyword
      }
    },
    fetchKeywords() {
      KeywordModel.list().then(data => {
        this.keywords = data
      })
    },
    fetchHistories() {
      HistoryModel.list().then(data => {
        this.histories = data
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

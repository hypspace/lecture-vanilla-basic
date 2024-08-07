import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.esm.browser.js'
import FormComponent from './components/FormComponent.js'
import ResultComponent from './components/ResultComponent.js'
import ListComponent from './components/ListComponent.js'
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
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    list: ListComponent,
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchLists(this.selectedTab)
  },
  methods: {
    search(query) {
      SearchModel.list(query).then(data => {
        this.hasSearched = true
        this.searchResults = data
      })
    },
    handleSubmitForm(query) {
      this.query = query
      this.search(this.query)
      HistoryModel.add(this.query)
    },
    handleResetForm(input) {
      this.query = ''
      input.focus()
      this.hasSearched = false
      this.selectedTab = '추천 검색어'
    },
    onChange(tabName) {
      this.selectedTab = tabName
      this.fetchLists(this.selectedTab)
    },
    handleRemove(target, keyword) {
      const isRemove = target.classList.contains('btn-remove')
      if (isRemove) {
        HistoryModel.remove(keyword)
        this.fetchLists(this.selectedTab)
      }
    },
    handleClickList(target, keyword) {
      const isRemove = target.classList.contains('btn-remove')
      if (isRemove) return
      this.query = keyword
      this.search(keyword)
    },
    fetchLists(tabName) {
      if (tabName === '추천 검색어') {
        KeywordModel.list().then(data => {
          this.keywords = data
        })
      }
      if (tabName === '최근 검색어') {
        HistoryModel.list().then(data => {
          this.histories = data
        })
      }
    },
  },
})

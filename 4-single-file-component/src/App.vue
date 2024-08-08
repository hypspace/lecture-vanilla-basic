<template>
  <div id="app">
    <header>
      <h2 class="container">입력</h2>
    </header>

    <div class="container">
      <FormComponent
        v-bind:value="query"
        v-on:@submit="handleSubmitForm"
        v-on:@reset="handleResetForm"
      />
      <div class="content">
        <ResultComponent
          v-if="hasSearched"
          v-bind:data="searchResults"
          v-bind:query="query"
        />
        <TabComponent
          v-else
          v-bind:tabs="tabs"
          v-bind:selected-tab="selectedTab"
          v-on:@change="handleChange"
        />

        <ListComponent
          v-if="selectedTab === tabs[0] && !hasSearched"
          v-bind:data="keywords"
          v-bind:tab="selectedTab"
          v-on:@click="handleClickList"
          type="keyword"
        />
        <ListComponent
          v-if="selectedTab === tabs[1] && !hasSearched"
          v-bind:data="histories"
          v-bind:tab="selectedTab"
          v-on:@click="handleClickList"
          v-on:@remove="handleRemove"
          type="history"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormComponent from './components/FormComponent.vue'
import ResultComponent from './components/ResultComponent.vue'
import TabComponent from './components/TabComponent.vue'
import ListComponent from './components/ListComponent.vue'
import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

export default {
  name: 'App',
  components: {
    FormComponent,
    ResultComponent,
    TabComponent,
    ListComponent,
  },
  data() {
    return {
      query: '',
      searchResults: [],
      hasSearched: false,
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '',
      keywords: [],
      histories: [],
    }
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
    handleChange(tabName) {
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
}
</script>

<style></style>

import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'

const tag = '[MainController]'

export default {
  init() {
    FormView.setup(document.querySelector('form'))
      .on('submit', e => e.preventDefault())
      .on('@submit', e => this.handleSubmitForm(e.detail.input))
      .on('@reset', () => this.handleResetForm())

    ResultView.setup(document.querySelector('#search-result'))
    TabView.setup(document.querySelector('#tabs')) //
      .on('@change', e => this.handleChangeTab(e.detail.tabName))
    KeywordView.setup(document.querySelector('#search-keyword')) //
      .on('@click', e => this.handleClickKeyword(e.detail.keyword))
    HistoryView.setup(document.querySelector('#search-history')) //
      .on('@click', e => this.handleClickHistory(e.detail.keyword))
      .on('@remove', e => this.handleRemoveHistory(e.detail.keyword))

    this.selectedTab = '추천 검색어'
    this.renderView()
  },

  renderView() {
    TabView.setActiveTab(this.selectedTab)

    if (this.selectedTab === '추천 검색어') {
      this.fetchSearchKeyword()
      HistoryView.hide()
    }
    if (this.selectedTab === '최근 검색어') {
      this.fetchSearchHistory()
      KeywordView.hide()
    }
  },

  search(query) {
    FormView.setValue(query)
    HistoryModel.add(query)
    SearchModel.list(query) //
      .then(res => this.handleSearchResult(res))
  },

  handleSearchResult(data) {
    TabView.hide()
    KeywordView.hide()
    ResultView.render(data)
  },

  handleSubmitForm(input) {
    this.search(input)
  },

  handleResetForm() {
    ResultView.hide()
    this.renderView()
  },

  handleChangeTab(tabName) {
    this.selectedTab = tabName
    this.renderView()
  },

  handleClickKeyword(keyword) {
    this.search(keyword)
  },

  handleClickHistory(keyword) {
    this.search(keyword)
  },

  handleRemoveHistory(keyword) {
    HistoryModel.remove(keyword)
    this.fetchSearchHistory()
  },

  fetchSearchKeyword() {
    KeywordModel.list().then(res => KeywordView.render(res))
  },

  fetchSearchHistory() {
    HistoryModel.list().then(res => HistoryView.render(res))
  },
}

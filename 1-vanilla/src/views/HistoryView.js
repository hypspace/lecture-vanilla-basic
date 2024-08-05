import View from './View.js'

const tag = '[HistoryView]'

const HistoryView = Object.create(View)

HistoryView.NO_RESULT = '최근 검색어가 없습니다'

HistoryView.setup = function (el) {
  this.init(el)

  return this
}

HistoryView.render = function (data = []) {
  this.el.innerHTML = data.length ? this.displayHistory(data) : this.NO_RESULT
  this.show()
}

HistoryView.displayHistory = function (data) {
  return (
    data.reduce((html, item, idx) => {
      html += this.createHTMLString(item, idx)
      return html
    }, '<ul class="list">') + '</ul>'
  )
}

HistoryView.createHTMLString = function (item, idx) {
  return `<li data-keyword="${item.keyword}">
      <span class="number">${idx + 1}</span>
      ${item.keyword}
    </li>`
}

export default HistoryView

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
  this.bindEvents()
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

HistoryView.createHTMLString = function (item) {
  return `<li data-keyword="${item.keyword}">
      ${item.keyword}
      <span class="date">${item.date}</span>
      <button class="btn-remove"></button>
    </li>`
}

HistoryView.onClickHistory = function (keyword) {
  this.emit('@remove', { keyword })
}

HistoryView.bindEvents = function () {
  this.el.addEventListener('click', e => {
    if (e.target.className === 'btn-remove') {
      this.onClickHistory(e.target.parentNode.dataset.keyword)
    }
  })
}

export default HistoryView

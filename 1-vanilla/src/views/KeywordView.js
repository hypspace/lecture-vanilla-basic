import View from './View.js'

const tag = '[KeywordView]'

const KeywordView = Object.create(View)

KeywordView.NO_RESULT = '추천 검색어가 없습니다'

KeywordView.setup = function (el) {
  this.init(el)
}

KeywordView.render = function (data = []) {
  this.el.innerHTML = data.length ? this.displayKeywords(data) : this.NO_RESULT
  this.show()
}

KeywordView.displayKeywords = function (data) {
  return (
    data.reduce((html, item, idx) => {
      html += this.createHTMLString(item, idx)
      return html
    }, '<ul class="list">') + '</ul>'
  )
}

KeywordView.createHTMLString = function (item, idx) {
  return `<li>
      <span class="number">${idx + 1}</span>
      ${item.keyword}
    </li>`
}

export default KeywordView

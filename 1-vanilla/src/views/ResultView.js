import View from './View.js'

const tag = '[ResultView]'

const ResultView = Object.create(View)

ResultView.NO_RESULT = '검색 결과가 없습니다'

ResultView.setup = function (el) {
  this.init(el)
}

ResultView.render = function (data = []) {
  this.el.innerHTML = data.length ? this.displayResults(data) : this.NO_RESULT
  this.show()
}

ResultView.displayResults = function (data) {
  return (
    data.reduce((html, item) => {
      html += this.createHTMLString(item)
      return html
    }, '<ul>') + '</ul>'
  )
}

ResultView.createHTMLString = function (item) {
  return `<li>
    <img src="${item.image}" alt="${item.name}"/>
    <p>${item.name}</p>
  </li>`
}

export default ResultView

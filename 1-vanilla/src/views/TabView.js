import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create(View)

TabView.setup = function (el) {
  this.el = el

  this.bindEvents()
  return this
}

TabView.setActiveTab = function (tabName = '') {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.textContent === tabName
      ? li.classList.add('active')
      : li.classList.remove('active')
  })
  this.show()
}

TabView.onClickTab = function (tabName) {
  this.setActiveTab(tabName)
  this.emit('@change', { tabName })
}

TabView.bindEvents = function () {
  this.el.addEventListener('click', e => this.onClickTab(e.target.textContent))
}

export default TabView

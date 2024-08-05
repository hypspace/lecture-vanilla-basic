import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create(View)

TabView.setup = function (el) {
  this.el = el
}

TabView.setActiveTab = function (tabName = '') {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.textContent === tabName
      ? li.classList.add('active')
      : li.classList.remove('active')
  })
}

export default TabView

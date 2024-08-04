import View from './View.js'

const tag = '[FormView]'

const FormView = Object.create(View)

FormView.setup = function (el) {
  this.init(el)
  this.inputEl = this.el.querySelector('[type="text"]')
  this.resetEl = this.el.querySelector('[type="reset"]')

  this.bindEvents()
  this.showResetBtn()
}

FormView.onKeyup = function (e) {
  this.showResetBtn(e.target.value)
}

FormView.showResetBtn = function (show = false) {
  this.resetEl.style.display = show ? '' : 'none'
}

FormView.bindEvents = function () {
  this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
}

export default FormView

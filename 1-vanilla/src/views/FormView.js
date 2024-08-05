import View from './View.js'

const tag = '[FormView]'

const FormView = Object.create(View)

FormView.setup = function (el) {
  this.init(el)
  this.inputEl = this.el.querySelector('[type="text"]')
  this.resetEl = this.el.querySelector('[type="reset"]')

  this.bindEvents()
  this.showResetBtn()
  return this
}

FormView.onClick = function () {
  this.showResetBtn(false)
  this.emit('@reset')
}

FormView.onKeyup = function (e) {
  this.showResetBtn(e.target.value)
  if (e.key === 'Enter' && !e.target.value.length) return
  if (!e.target.value.length) this.emit('@reset')
  if (e.key === 'Enter') this.emit('@submit', { input: e.target.value })
}

FormView.showResetBtn = function (show = false) {
  this.resetEl.style.display = show ? '' : 'none'
}

FormView.bindEvents = function () {
  this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
  this.resetEl.addEventListener('click', () => this.onClick())
}

FormView.setValue = function (value = '') {
  this.inputEl.value = value
  FormView.showResetBtn(this.inputEl.value.length)
}

export default FormView

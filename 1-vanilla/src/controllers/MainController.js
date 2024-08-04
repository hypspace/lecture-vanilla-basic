import FormView from '../views/FormView.js'

const tag = '[MainController]'

export default {
  init() {
    FormView.setup(document.querySelector('form'))
      .on('submit', e => e.preventDefault())
      .on('@submit', e => this.handleSubmitForm(e.detail.input))
  },

  handleSubmitForm(input) {
    console.log(tag, 'handleSubmitForm()', input)
  },
}

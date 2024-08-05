import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'

import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]'

export default {
  init() {
    FormView.setup(document.querySelector('form'))
      .on('submit', e => e.preventDefault())
      .on('@submit', e => this.handleSubmitForm(e.detail.input))
      .on('@reset', () => this.handleClickReset())

    ResultView.setup(document.querySelector('#search-result'))
  },

  search(query) {
    SearchModel.list(query) //
      .then(res => {
        console.log(tag, 'search()', res)
        ResultView.render(res)
      })
  },

  handleSubmitForm(input) {
    console.log(tag, 'handleSubmitForm()', input)
    this.search(input)
  },

  handleClickReset() {
    console.log(tag, 'handleClickReset()')
  },
}

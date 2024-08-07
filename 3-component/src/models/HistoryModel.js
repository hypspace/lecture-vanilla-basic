import { formatDate } from '../utils/date.js'

export default {
  data: [
    { keyword: '검색기록2', date: '07.03' },
    { keyword: '검색기록1', date: '07.02' },
    { keyword: '검색기록0', date: '07.01' },
  ],

  list() {
    return Promise.resolve(this.data)
  },

  add(keyword = '') {
    keyword = keyword.trim()

    if (!keyword) return
    if (this.data.some(item => item.keyword === keyword)) {
      this.remove(keyword)
    }

    const date = formatDate()
    this.data = [{ keyword, date }, ...this.data]
  },

  remove(keyword) {
    this.data = this.data.filter(item => item.keyword !== keyword)
  },
}

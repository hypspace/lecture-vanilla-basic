export default {
  data: [
    { keyword: '이탈리아' },
    { keyword: '밀라노' },
    { keyword: '피자' },
    { keyword: '두오모성당' },
  ],

  list() {
    return new Promise(res => setTimeout(() => res(this.data), 250))
  },
}

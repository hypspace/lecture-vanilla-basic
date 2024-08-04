const data = [
  {
    id: 1,
    name: '유기농 샐러드',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: '수제 햄버거',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
]

export default {
  list() {
    return new Promise(res => setTimeout(() => res(data), 250))
  },
}

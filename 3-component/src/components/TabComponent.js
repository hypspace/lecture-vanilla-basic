export default {
  template: '#tabs',
  props: ['tabs', 'selectedTab'],
  methods: {
    onChange(tab) {
      this.$emit('@change', tab)
    },
  },
}

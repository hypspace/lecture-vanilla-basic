export default {
  template: '#list',
  props: ['data', 'type', 'tab'],
  methods: {
    onClick(target, keyword) {
      this.$emit('@click', target, keyword)
    },
    onRemove(target, keyword) {
      this.$emit('@remove', target, keyword)
    },
  },
}

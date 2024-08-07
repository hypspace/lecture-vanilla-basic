export default {
  template: '#search-form',
  props: ['value'],
  data() {
    return {
      inputValue: this.value,
    }
  },
  methods: {
    onSubmit() {
      this.$emit('@submit', this.inputValue.trim(''))
    },
    onReset() {
      this.$emit('@reset', this.$refs.input)
    },
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue
    },
    inputValue(newValue) {
      if (!newValue) {
        this.$emit('@reset', this.$refs.input)
      }
    },
  },
}

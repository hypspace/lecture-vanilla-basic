<template>
  <form v-on:submit.prevent="onSubmit">
    <input
      type="text"
      placeholder="검색어를 입력하세요"
      v-model="inputValue"
      ref="input"
      autofocus
    />
    <button
      type="reset"
      class="btn-reset"
      v-show="inputValue"
      v-on:click="onReset"
    ></button>
  </form>
</template>

<script>
export default {
  name: 'FormComponent',
  props: {
    value: String,
  },
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
</script>

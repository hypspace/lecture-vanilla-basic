<template>
  <ul id="tabs" class="tabs">
    <li
      v-for="tab in tabs"
      v-bind:class="{ active: tab === selectedTab }"
      v-on:click="onChange(tab)"
    >
      {{ tab }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TabComponent',
  props: {
    tabs: Array,
    selectedTab: String,
  },
  methods: {
    onChange(tab) {
      this.$emit('@change', tab)
    },
  },
}
</script>

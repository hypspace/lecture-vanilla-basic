<template>
  <div v-if="data.length">
    <ul class="list">
      <li
        v-for="(item, idx) in data"
        v-on:click="e => onClick(e.target, item.keyword)"
      >
        <span class="number" v-if="type === 'keyword'">{{ idx + 1 }}</span>
        {{ item.keyword }}
        <span class="date" v-if="type === 'history'">{{ item.date }}</span>
        <button
          class="btn-remove"
          v-on:click="e => onRemove(e.target, item.keyword)"
          v-if="type === 'history'"
        ></button>
      </li>
    </ul>
  </div>
  <div v-else>{{ tab }}가 없습니다</div>
</template>

<script>
export default {
  name: 'ListComponent',
  props: {
    data: {
      type: Array,
      required: true,
    },
    type: String,
    tab: String,
  },
  methods: {
    onClick(target, keyword) {
      this.$emit('@click', target, keyword)
    },
    onRemove(target, keyword) {
      this.$emit('@remove', target, keyword)
    },
  },
}
</script>

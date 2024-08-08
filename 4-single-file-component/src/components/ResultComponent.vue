<template>
  <div id="search-result">
    <div v-if="data.length">
      <ul>
        <li v-for="item in data">
          <img v-bind:src="item.image" v-bind:alt="item.name" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <div v-else>{{ query }} 검색 결과가 없습니다</div>
  </div>
</template>

<script>
export default {
  name: 'ResultComponent',
  props: {
    data: {
      type: Array,
      required: true,
    },
    query: String,
  },
}
</script>

<template>
  <div class="app">
    APP
    <img :src="require('../assets/images/test.jpg')" >
  </div>
</template>

<script>
  import cloneDeep from 'lodash/cloneDeep';
  export default {
    methods: {
      cloneDeep
    }
  }
</script>

<style scoped lang="less">
  .app {
    color: red;
  }
</style>
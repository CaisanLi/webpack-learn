<template>
  <div class="app">
    APP2
    {{ d }}
    <img :src="require('../assets/images/test.jpg')" >
    <ButtonCom></ButtonCom>
  </div>
</template>

<script>
  import cloneDeep from 'lodash/cloneDeep';
  import ButtonCom from './button.vue';
  export default {
    components: {
      ButtonCom
    },
    data() {
      return {
        count: 1
      }
    },
    methods: {
      cloneDeep,
      // 获取公共路径
      getPublicPath() {
        // 报了 登录超时 就说明正确了
        fetch('/uaa/backend/sys/api/open/v1/file/publicFilePrefix').then(res => res.json()).then(res => {
          console.log('res：', res)
        }).catch(err => {
          console.log('err：', err)
        })
      }
    },
    mounted() {
      this.getPublicPath()
    }
  }
</script>

<style scoped lang="less">
  .app {
    color: #333;
  }
</style>
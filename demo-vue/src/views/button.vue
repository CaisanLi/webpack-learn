<template>
  <div>
    <button @click="count++">{{ count }}</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    }
  }
</script>
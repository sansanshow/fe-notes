<template>
  <section>
    <p>1111</p>
    <p>当前时间：{{date}}</p>
  </section>
</template>
<script>
import '@/utils/initJsBridge'
export default {
  data() {
    return {
      date: new Date().toString(),
    };
  },
  created() {
    this.$bridge.registerHandler("refreshPage",function() {
      alert(1222);
    })
  },
}
</script>
<style lang="less">

</style>


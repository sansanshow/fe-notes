<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        nuxt-demo
      </h1>
      <div class="links">
        <mt-button type="primary" size="large" @click="goto(1)">登录页</mt-button>
        <mt-button type="primary" size="large" @click="goto(2)">列表页</mt-button>
        <mt-button type="primary" size="large" @click="goto(3)">test页</mt-button>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  data () {
    return {

    }
  },
  methods:  {
    goto (type) {
      switch (type) {
        case 1:
          this.$router.push({path: '/home/register'});
          break
        case 2: 
          this.$router.push({path: '/blog'});
          break;
        case 2: 
          this.$router.push({path: '/test'});
          break;
        default: 
          this.$router.push({path: '/home/register'});
          break;

      }
    }
  }
}
</script>

<style>

</style>

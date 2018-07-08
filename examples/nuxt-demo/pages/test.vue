<template>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li :key="item" v-for="item in list">{{ item }}</li>
      </ul>
    </mt-loadmore>
</template>

<script>

export default {
  layout: 'common',
  data() {
    return {
      list: [1, 2, 3, 4, 5],
      allLoaded: false,
      title: 'Test title demo'
    }
  },
  methods: {
    loadTop() {
      console.log('----loadTop');
    },
    loadBottom() {
      console.log('----loadBottom');
    }
  },
  asyncData(ctx) {
    console.log('--2isClient', ctx.isClient, '--isServer', ctx.isServer)
  },
  fetch() {

  },
  head() {
    return {
      title: this.title,
      meta : [
        { hid: 'description', name: 'description', content: 'My custom Test meta description' }
      ]
    }
  }

}
</script>

<style>
</style>

<template>
  <section>
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-datetime-picker
      ref="picker"
      type="time"
      v-model="pickerValue">
    </mt-datetime-picker>
    <mt-button type="default" @click="openPicker">点击弹出DatePicker</mt-button>
    <section class="main">
      这是一个示例222eee
    </section>
    <mt-cell title="标题文字" icon="more" value="带 icon"></mt-cell>
    <mt-cell title="标题文字" is-link>
      <span class="demo-cell" style="color: green">这里是元素</span>
    </mt-cell>
    <mt-cell title="标题文字" icon="more" value="带 icon"></mt-cell>
  </section>
</template>
<script>
export default {
  data() {
    return {
      pickerValue: ''
    }
  },
  methods: {
    openPicker() {
      this.$http.post('/web/demo').then(res => {
        console.log('success--/web/demo');
        console.log(res);
      }).catch(() => {
        console.warn('fail--/web/demo');
      })
      this.$refs.picker.open();
    }
  },
  created() {

  }
}
</script>
<style>
.main {
  height: 100px;
  font-size: 24px;
}
.demo-cell {
  font-size: 56px; 
}
</style>



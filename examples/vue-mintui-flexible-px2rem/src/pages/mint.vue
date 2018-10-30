<template>
  <section class="mint">
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
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
      这是一个示例1
      <!-- 这是一个示例1<br/> -->
      <!-- 这是一个示例1<br/>
      这是一个示例1<br/> -->
    </section>
    <mt-cell title="标题文字" icon="more" value="带 icon"></mt-cell>
    <mt-cell is-link>
      <p class="single-line">Mint-ui是饿了么团队推出的一个基于Vue.js移动端组</p>
    </mt-cell>
    <mt-cell title="标题文字" is-link>
      <span class="demo-cell" style="color: green">这里是元素</span>
    </mt-cell>
    <mt-cell v-for="(i, id) in arr" :key="id" title="标题文字" icon="more" value="带 icon" is-link>{{ id }}</mt-cell>
  </section>
</template>
<script>
export default {
  data() {
    return {
      pickerValue: '',
      arr: new Array(20)
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
.mint {
  padding-top: 100px;/*no*/
}
.main {
  height: 120px; 
  font-size: 24px;
  line-height: 1;
}
.demo-cell {
  font-size: 32px;
  line-height: 1;
}
.single-line {
  word-wrap: none;
  line-height: 48px; /*no*/
  height: 48px; /*no*/
  width: 100%;
  font-size: 32px; /*px*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>



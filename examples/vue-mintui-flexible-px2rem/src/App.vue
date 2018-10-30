<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view class="mbank-wrap"/>
    <div class="footer">
      我是有底线的
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  max-width: 540px; /*no*/
  margin: 0 auto;
  min-width: 320px;/*no*/
  min-height: 100%;
  position: relative;
}
* {
  margin: 0;
  padding: 0;
}
.mbank-wrap {
  min-height: 100%;
  box-sizing: border-box;
  padding-bottom: 24px;/*no*/
}
.mint-header {
  /* background-color: aqua; */
}
.footer {
  height: 24px;/*no*/
  margin-top: -24px;/*no*/
  border-bottom: 1px solid #ccc;
  background: transparent;
  text-align: center;
  position: absolute;
  bottom: 0;
  width:100%;
}

/*html{height:100%;}
body{min-height:100%;margin:0;padding:0;position:relative;}

header{background-color: #ffe4c4;}
main{padding-bottom:100px;background-color: #bdb76b;} *//* main的padding-bottom值要等于或大于footer的height值 */
/* footer{position:absolute;bottom:0;width:100%;height:100px;background-color: #ffc0cb;} */
</style>

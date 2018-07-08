<!-- 默认布局：带有返回按钮的布局 -->
<template>
  <div class="container">
    <nuxt class="page-content"/>
    <section class="copyright-footer">
       copyright by<span class="js-bank-name">孟州农商银行</span><span class="js-tech-provider"><a href="tel:96616">客服电话: 96616</a></span>
    </section>
  </div>
</template>

<style>
.container {
  height: 100%;
}
.page-content {
  padding-top: 40px;
  /* margin-top: -40px; */
  min-height: 100%;
  padding-bottom: 37px;
}
.copyright-footer {
  box-sizing: border-box;
  padding: 12px 0;
  font-size: 13px;
  line-height: 13px;
  margin-top: -37px;
  color: #ccc;
  text-align: center;
}
</style>

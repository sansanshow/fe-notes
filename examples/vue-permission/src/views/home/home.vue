<template>
<el-container class="layout-main">
    <el-header class="ly-header" height="100px">Header</el-header>
    <el-container>
        <el-aside width="200px" class="ly-aside">Aside</el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style lang="scss" scoped>
.layout-main {
    min-height: 100%;
    .ly-header {
        background: #fff;
        height: 100px;
        color: #666;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .ly-aside {
        background: #F4F5F5;
        color: #333;
        min-height: calc(100% - 100px);
    }
}
</style>

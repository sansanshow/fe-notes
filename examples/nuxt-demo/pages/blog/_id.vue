<template>
    <div>
        <h3> detail {{id}} </h3>
    </div>
</template>
<script>
export default {
    data () {
        return {
            id: ''
        }
    },
    created() {
        console.log(this.$route.query) // /foo?user=1，则有 $route.query.user == 1
        console.log(this.$route.params.id) // 动态片段和全匹配片段，如果没有路由参数，就是一个空对象
        this.id = this.$route.params.id
    }
}
</script>
<style scoped>
h3{
    color: red;
}
</style>



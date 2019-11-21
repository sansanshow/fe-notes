<template>
<section>
    <h1>index</h1>
</section>
</template>
<script>
export default {
    name: 'Index',
    data () {
        return {

        }
    },
    created () {
        this.$http.get('/user/login').then((res) => {
            console.log(res)
        })
    }
}
</script>

<template>
<div id="app" onclick="">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
#app{
    height: 100%;
}
</style>

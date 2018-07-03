<template>
    <section>
        <ul>
            <li v-for="item in list" :key="item"><nuxt-link :to="`/blog/${item}`"><p>{{ item }}</p></nuxt-link></li>
        </ul>
    </section>
</template>
<script>
export default {
    data() {
        return {
            list: [1, 2, 3, 4, 5]
        }
    },
    methods: {

    }
}
</script>


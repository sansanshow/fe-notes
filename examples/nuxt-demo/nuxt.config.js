module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** plugins
  */
  plugins: [
    '~plugins/mint-ui',
    // '~plugins/axios',
  ],
  /*
  ** css
  */
  css: [{src: '~assets/main.less', lang: 'less'}],
  /*
  ** config router
  */
  router: {
    // 在每页渲染前运行 middleware/user-agent.js 中间件的逻辑
    middleware: 'user-agent'
  },
  /*
  ** Build configuration
  */
  build: {
    // analyze: {
    //   analyzerMode: 'static'
    // },
    loaders: [

    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // Set less-loader
        const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader') 
        vueLoader.options.loaders.less = 'vue-style-loader!css-loader!less-loader'
      }
    }
  }
}
